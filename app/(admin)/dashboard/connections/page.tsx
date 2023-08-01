'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Pagination, Table } from 'components'
import { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { toast } from 'services'

dayjs.extend(localizedFormat)

export default function Page() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [list, setList] = useState<
    Database['public']['Tables']['connections']['Row'][]
  >([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const supabase = createClientComponentClient<Database>()

  const getList = async (page: number = 1) => {
    setIsLoading(true)
    const { data, count, error } = await supabase
      .from('connections')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * 20, page * 20 - 1)
    setIsLoading(false)
    if (error) {
      toast.error(error.message)
      console.error(error)
      setList([])
      setPage(1)
      setTotal(0)
    } else {
      setList(page === 1 ? data : [...list, ...data])
      setTotal(count!)
      setPage(page)
    }
  }

  useEffect(() => {
    getList()
  }, [])
  return (
    <>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold md:text-4xl">연결된 유저</h2>
        <div>총 {total}명</div>
        <div className="flex items-center gap-3">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tw-input"
          />
        </div>
        <Table
          list={list}
          loading={isLoading}
          columns={
            <tr>
              <th>슬랙</th>
              <th>노션</th>
              <th>디스코드</th>
              <th>텔레그램</th>
              <th>잔디</th>
              <th>가입일</th>
            </tr>
          }
          renderItem={(item, key) => (
            <Fragment key={key}>
              <tr>
                <td rowSpan={2}>{item.slack_webhook_url}</td>
                <td>{item.notion_token}</td>
                <td rowSpan={2}>{item.discord_webhook_url}</td>
                <td rowSpan={2}>{item.telegram_chatting_id}</td>
                <td rowSpan={2}>{item.jandi_webhook_url}</td>
                <td rowSpan={2}>
                  {dayjs(item.created_at).locale('ko').format('L LT')}
                </td>
              </tr>
              <tr>
                <td>{item.notion_database_id}</td>
              </tr>
            </Fragment>
          )}
        />
        <Pagination
          page={page}
          size={20}
          onChange={(page) => getList(page)}
          total={total}
        />
      </div>
    </>
  )
}

'use client'

import { Input, Pagination } from 'components'
import { useState } from 'react'
import type { FC } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { backdrop } from 'services'
import Link from 'next/link'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useForm } from 'react-hook-form'

dayjs.extend(relativeTime)

export interface Props {
  list: Database['public']['Tables']['histories']['Row'][]
  total: number | null
}
interface State {
  search: string
}

const Products: FC<Props> = (props) => {
  const { register, handleSubmit } = useForm<State>()
  const [list, setList] = useState<
    Database['public']['Tables']['histories']['Row'][]
  >(props.list || [])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(props.total || 0)
  const supabase = createClientComponentClient<Database>()

  const get = async (page: number = 1) => {
    backdrop(true)
    const { data, count } = await supabase
      .from('histories')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)
      .limit(10)
    backdrop(false)

    setPage(page)
    setList(data || [])
    setTotal(count || 0)
  }

  const onSearch = async (form: State) => {
    if (!form.search) {
      get()
      return
    }
    backdrop(true)
    const { data, error, count } = await supabase
      .from('histories')
      .select('*')
      .ilike('name', `%${form.search}%`)
      .order('created_at', { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)
      .limit(10)
    backdrop(false)

    setPage(1)
    setList(data || [])
    setTotal(count || 0)
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="https://kidow.notion.site/93dbf7ddc40640ab98675faf728e28b5?v=4e63ecae497844098f406f2a9ab5cb7e&pvs=4"
          target="_blank"
          className="font-semibold hover:underline"
        >
          기존 전송 내역 보기 →
        </Link>
        <form onSubmit={handleSubmit(onSearch)}>
          <Input placeholder="검색 (Enter)" register={register('search')} />
        </form>
      </div>
      <ul className="space-y-6">
        {list.map((item) => (
          <li key={item.id}>
            <Link
              className="flex gap-4"
              href={`/product/${item.id}`}
              target="_blank"
            >
              <img
                src={item.icon_url}
                alt="logo"
                className="h-12 w-12 rounded md:h-20 md:w-20"
              />
              <div className="space-y-0.5 md:space-y-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="break-keep text-neutral-400">{item.title}</p>
                <ul className="flex flex-wrap items-center gap-2 pt-1">
                  {item.tags.map((tag, key) => (
                    <li
                      key={key}
                      className="rounded-full border border-neutral-700 px-1.5 py-0.5 text-xs text-neutral-400"
                    >
                      {tag}
                    </li>
                  ))}
                  <li className="text-xs text-neutral-500">
                    {dayjs(item.created_at).locale('ko').fromNow()}
                  </li>
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Pagination
          page={page}
          onChange={(page) => get(page)}
          total={total}
          size={10}
        />
      </div>
    </>
  )
}

export default Products
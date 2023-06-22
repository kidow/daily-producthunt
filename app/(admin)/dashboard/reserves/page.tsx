'use client'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Button, Card, IconButton, Preview, Table } from 'components'
import { toast, request, backdrop, isURL } from 'services'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Modal } from 'containers'
import {
  PaperAirplaneIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

dayjs.extend(localizedFormat)

interface State {
  url: string
  name: string
  iconUrl: string
  coverUrl: string
  title: string
  intro: string
  core: string
  platform: string
  pricing: string
}

export default function Page() {
  const { register, handleSubmit, watch, setValue } = useForm<State>({
    defaultValues: {
      url: 'https://google.com',
      name: '이름',
      iconUrl:
        'https://ph-files.imgix.net/018c7fa4-9fb2-4094-a471-68b27efaef12.gif',
      coverUrl: 'https://i.imgur.com/reSQtNL.png',
      title: '타이틀',
      intro: '한 줄 소개',
      core: '핵심 기능',
      platform: '지원 플랫폼',
      pricing: '가격 정책'
    }
  })
  const [tags, setTags] = useState<string[]>(['Tag 1'])
  const [reserveList, setReserveList] = useState<
    Database['public']['Tables']['reserves']['Row'][]
  >([])
  const [isAddTagOpen, setIsAddTagOpen] = useState(false)
  const [tagList, setTagList] = useState<
    Database['public']['Tables']['tags']['Row'][]
  >([])
  const supabase = createClientComponentClient<Database>()

  const getList = async () => {
    const { data } = await supabase
      .from('reserves')
      .select('*')
      .order('created_at', { ascending: true })
    setReserveList(data || [])
  }

  const getTags = async () => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })
    if (error) toast.error(error.message)
    setTagList(data || [])
  }

  const onSubmit = async (data: State) => {
    backdrop(true)
    const { error } = await supabase.from('reserves').insert({
      url: data.url,
      name: data.name,
      icon_url: data.iconUrl,
      cover_url: data.coverUrl,
      title: data.title,
      intro: data.intro,
      core: data.core,
      platform: data.platform,
      pricing: data.pricing,
      tags
    })
    backdrop(false)
    if (error) {
      toast.error('메시지 예약 에러')
      console.error(error)
      return
    }
    Object.keys(watch()).forEach((key: any) => setValue(key, ''))
    setTags([''])
    getList()
  }

  const removeReserve = async (id: number) => {
    if (!window.confirm('삭제하시겠습니까?')) return
    backdrop(true)
    const { error } = await supabase.from('reserves').delete().eq('id', id)
    backdrop(false)
    if (error) {
      toast.error('실패했습니다.')
      console.error(error)
      return
    }
    getList()
  }

  const sendMessage = async (id: number) => {
    if (!window.confirm('전송하시겠습니까?')) return
    backdrop(true)
    const { success, message, data } = await request<{
      success: true
      message?: string
      data: any
    }>('/api/send-message', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ id })
    })
    console.log('data', data)
    backdrop(false)
    if (success) {
      toast.success('전송되었습니다.')
    } else {
      toast.error(message || '실패했습니다.')
    }
  }

  useEffect(() => {
    getList()
    getTags()
    window.onbeforeunload = () => 'asd'
    return () => {
      window.onbeforeunload = null
    }
  }, [])
  return (
    <>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold md:text-4xl">메시지 예약</h2>
        <Card title="예약 리스트">
          <Table
            list={reserveList}
            size="sm"
            columns={
              <tr>
                <th>이름</th>
                <th className="min-w-[90px]">아이콘</th>
                <th className="min-w-[180px]">커버</th>
                <th>액션</th>
                <th>태그</th>
                <th>타이틀</th>
                <th>한 줄 소개</th>
                <th>핵심 기능</th>
                <th>지원 플랫폼</th>
                <th>가격 정책</th>
                <th>생성일</th>
              </tr>
            }
            renderItem={(item, key) => (
              <tr key={key}>
                <td>
                  <Link
                    href={item.url}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                </td>
                <td>
                  <img
                    src={item.icon_url}
                    alt=""
                    className="h-[88px] w-[88px] rounded-lg"
                  />
                </td>
                <td>
                  <img src={item.cover_url} alt="" className="rounded" />
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <IconButton onClick={() => sendMessage(item.id)}>
                      <PaperAirplaneIcon />
                    </IconButton>
                    <IconButton onClick={() => removeReserve(item.id)}>
                      <TrashIcon />
                    </IconButton>
                  </div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl bg-neutral-700 px-3 py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{item.title}</td>
                <td>{item.intro}</td>
                <td>{item.core}</td>
                <td>{item.platform}</td>
                <td>{item.pricing}</td>
                <td>{dayjs(item.created_at).locale('ko').format('L LT')}</td>
              </tr>
            )}
          />
        </Card>
        <Card title="템플릿">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Preview.Slack
              title={watch('title')}
              core={watch('core')}
              url={watch('url')}
              platform={watch('platform')}
              pricing={watch('pricing')}
              name={watch('name')}
              intro={watch('intro')}
              iconUrl={watch('iconUrl')}
              coverUrl={watch('coverUrl')}
              tags={tags}
            />
            <Preview.Discord
              title={watch('title')}
              core={watch('core')}
              url={watch('url')}
              platform={watch('platform')}
              pricing={watch('pricing')}
              name={watch('name')}
              intro={watch('intro')}
              iconUrl={watch('iconUrl')}
              coverUrl={watch('coverUrl')}
              tags={tags}
            />
          </div>
        </Card>
        <Card title="메시지">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <input
              className="tw-input col-span-2"
              placeholder="URL"
              required
              type="url"
              {...register('url', { required: true })}
            />
            <input
              className="tw-input"
              placeholder="이름"
              required
              {...register('name', { required: true })}
            />
            <input
              className="tw-input col-span-3"
              placeholder="Icon URL"
              required
              type="url"
              {...register('iconUrl', { required: true })}
            />
            <input
              className="tw-input col-span-3"
              placeholder="Cover URL"
              required
              type="url"
              {...register('coverUrl', { required: true })}
            />
            <div className="col-span-3 flex flex-wrap items-center gap-4">
              {tags.map((tag, i) => (
                <div key={i} className="group relative">
                  <input
                    value={tag}
                    className="tw-input"
                    placeholder={`Tag ${i + 1}`}
                    readOnly
                  />
                  {!!tagList.length && (
                    <div className="absolute left-0 top-12 z-10 hidden w-full bg-black group-focus-within:block">
                      <ul className="flex max-h-96 flex-wrap gap-1.5 overflow-auto overscroll-contain p-2">
                        {tagList.map((item, key) => (
                          <li
                            key={key}
                            onMouseEnter={() =>
                              setTags([
                                ...tags.slice(0, i),
                                item.name,
                                ...tags.slice(i + 1)
                              ])
                            }
                            className="cursor-pointer rounded-xl border border-neutral-700 px-2 py-1 text-xs hover:border-neutral-600 hover:text-white"
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              <IconButton onClick={() => setTags([...tags, ''])}>
                <PlusIcon />
              </IconButton>
              <Button
                onClick={() => setIsAddTagOpen(true)}
                text="태그 관리"
                type="button"
              />
            </div>
            <input
              className="tw-input col-span-3"
              placeholder="타이틀"
              required
              {...register('title', { required: true })}
            />
            <input
              className="tw-input col-span-3"
              placeholder="한 줄 소개"
              required
              {...register('intro', { required: true })}
            />
            <input
              className="tw-input col-span-3"
              placeholder="핵심 기능"
              required
              {...register('core', { required: true })}
            />
            <input
              className="tw-input col-span-3"
              placeholder="지원 플랫폼"
              required
              {...register('platform', { required: true })}
            />
            <input
              className="tw-input col-span-3"
              placeholder="가격 정책"
              required
              {...register('pricing', { required: true })}
            />
            <div className="flex gap-2">
              <Button
                text="예약"
                disabled={
                  !isURL(watch('url')) ||
                  Object.values(watch()).some((value) => !value) ||
                  tags.some((v) => !v)
                }
              />
              <Button
                type="button"
                text="비우기"
                onClick={() => {
                  Object.keys(watch()).forEach((key: any) => setValue(key, ''))
                  setTags([''])
                }}
              />
            </div>
          </form>
        </Card>
      </div>
      {isAddTagOpen && (
        <Modal.AddTag
          isOpen={isAddTagOpen}
          onClose={() => setIsAddTagOpen(false)}
          onComplete={getTags}
        />
      )}
    </>
  )
}

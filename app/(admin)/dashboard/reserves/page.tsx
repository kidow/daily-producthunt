'use client'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Button, Card, Preview } from 'components'
import { toast } from 'services'
import { useForm } from 'react-hook-form'

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
  const { register, handleSubmit, reset, watch } = useForm<State>({
    defaultValues: {
      url: 'https://google.com',
      name: '구글',
      iconUrl:
        'https://ph-files.imgix.net/018c7fa4-9fb2-4094-a471-68b27efaef12.gif',
      coverUrl: 'https://i.imgur.com/reSQtNL.png',
      title: 'Google',
      intro: '전 세계 최대 검색엔진',
      core: '핵심 기능',
      platform: '웹 전용',
      pricing: '무료'
    }
  })
  const [tags, setTags] = useState(['Tag 1'])
  const {
    url,
    name,
    title,
    iconUrl,
    coverUrl,
    core,
    platform,
    pricing,
    intro
  }: State = {
    url: watch('url'),
    name: watch('name'),
    iconUrl: watch('iconUrl'),
    coverUrl: watch('coverUrl'),
    title: watch('title'),
    intro: watch('intro'),
    core: watch('core'),
    platform: watch('platform'),
    pricing: watch('pricing')
  }
  const supabase = createClientComponentClient<Database>()

  const getList = async () => {
    const { data } = await supabase
      .from('reserves')
      .select('*')
      .order('created_at', { ascending: true })
    console.log('data', data)
  }

  const getTags = async () => {
    const { error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })
    if (error) toast.error(error.message)
  }

  const onSubmit = async (data: State) => {
    console.log('data', data)
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
    <div className="space-y-8">
      <h2 className="text-2xl font-bold md:text-4xl">메시지 예약</h2>
      <Card title="예약 리스트">asd</Card>
      <Card title="템플릿">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Preview.Slack
            title={title}
            core={core}
            url={url}
            platform={platform}
            pricing={pricing}
            name={name}
            intro={intro}
            iconUrl={iconUrl}
            coverUrl={coverUrl}
            tags={tags}
          />
          <div>discord</div>
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
            <Button text="예약" />
            <Button type="button" text="비우기" onClick={() => reset()} />
          </div>
        </form>
      </Card>
    </div>
  )
}

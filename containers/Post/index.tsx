'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import mediumZoom from 'medium-zoom'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { cn, useObjectState } from 'services'

type Post = Table.History & { likes: string[] }
interface Props extends Post {
  ip: string | null
}
interface State {
  likes: string[]
  isAnimated: boolean
  isLoading: boolean
}

export default function Post({
  cover_url,
  icon_url,
  ip,
  url,
  name,
  title,
  intro,
  core,
  platform,
  pricing,
  tags,
  ...props
}: Props): JSX.Element {
  const [{ isLoading, likes, isAnimated }, setState] = useObjectState<State>({
    isLoading: false,
    likes: props.likes || [],
    isAnimated: false
  })
  const supabase = createClientComponentClient<Database>()
  const params = useParams()

  async function handleLike() {
    if (!ip) {
      window.location.reload()
      return
    }

    if (isLoading) return
    setState({ isLoading: true })
    if (likes.indexOf(ip) === -1) {
      const { error } = await supabase
        .from('likes')
        .insert({
          product_id: params.id as string,
          ip_address: ip
        })
        .select(`*`)
      if (error) {
        console.error(error)
        return
      }
      setState({ isAnimated: true })
    } else {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('ip_address', ip)
      if (error) {
        console.error(error)
        return
      }
    }

    const { data } = await supabase
      .from('likes')
      .select(`*`)
      .eq('product_id', params.id)
    setState({
      isLoading: false,
      likes: data?.map((item) => item.ip_address) || []
    })
  }

  function addRefParameterToURL(url: string) {
    const refParameter = 'ref=daily_producthunt'

    if (url.includes('?')) {
      return `${url}&${refParameter}`
    } else {
      return `${url}?${refParameter}`
    }
  }

  const isLiked: boolean = useMemo(
    () => likes.indexOf(ip || '') !== -1,
    [likes, ip]
  )

  useEffect(() => {
    mediumZoom('[data-zoomable]', { background: 'rgba(0,0,0,0.5)' })
  }, [])
  return (
    <>
      <img
        src={cover_url}
        data-zoomable
        alt="cover image"
        width={864}
        height={510}
        className="mb-4 w-full rounded md:mb-10"
      />

      <section className="mb-4 flex flex-col gap-4 md:m-10 md:flex-row md:gap-5">
        <div className="sm:space-y-4 flex sm:block items-center justify-between">
          <img
            src={icon_url}
            height={50}
            width={50}
            alt="logo"
            className="rounded md:h-20 md:w-20"
          />
          <button
            onClick={handleLike}
            className={cn(
              'inline-flex relative rounded-full border w-20 py-2 justify-end items-center gap-2',
              isLiked ? 'border-red-500' : 'border-neutral-700'
            )}
          >
            <div
              className={cn(
                "w-[50px] absolute left-0 top-1/2 -translate-y-1/2 h-[50px] bg-[url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png')] bg-no-repeat bg-[length:2900%]",
                { 'animate-heart-burst': isAnimated },
                isLiked ? 'bg-right' : 'bg-left'
              )}
              onAnimationEnd={() => setState({ isAnimated: false })}
            />
            <div className={cn('w-[50px]', { 'text-red-500': isLiked })}>
              {likes.length}
            </div>
          </button>
        </div>
        <div className="space-y-2 flex-1">
          <h1>
            <Link
              href={addRefParameterToURL(url)}
              target="_blank"
              className="text-2xl font-semibold text-blue-500 hover:underline"
            >
              {name}
            </Link>
          </h1>
          <p className="text-lg">{title}</p>
          <ul className="space-y-4 text-neutral-200">
            <li className="break-keep">
              <label className="text-sm text-neutral-500">한 줄 소개</label>
              <p>{intro}</p>
            </li>
            <li className="break-keep">
              <label className="text-sm text-neutral-500">핵심 기능</label>
              <p>{core}</p>
            </li>
            <li className="break-keep">
              <label className="text-sm text-neutral-500">지원 플랫폼</label>
              <p>{platform}</p>
            </li>
            <li className="break-keep">
              <label className="text-sm text-neutral-500">가격 정책</label>
              <p>{pricing}</p>
            </li>
          </ul>
          <ul className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, key) => (
              <li
                key={key}
                className="rounded-full border border-neutral-700 bg-opacity-70 px-2 py-1 text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

'use client'

import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

export interface Props {
  url: string
  date?: string
  name: string
  title: string
  intro: string
  core: string
  platform: string
  pricing: string
  iconUrl: string
  coverUrl: string
  tags: string[]
}
interface State {}

const DiscordPreview: FC<Props> = ({
  url,
  date = '오늘 오후 4:02',
  name,
  title,
  intro,
  core,
  platform,
  pricing,
  iconUrl,
  coverUrl,
  tags
}) => {
  return (
    <div className="flex gap-4">
      <img src="/logo.png" alt="" className="h-10 w-10 rounded-full" />
      <div>
        <h3 className="mb-0.5">
          <span>일간 ProductHunt</span>
          <span className="ml-1 rounded-[0.1875rem] bg-[#5865f2] px-1 py-px text-2xs">
            봇
          </span>
          <span className="ml-2 text-xs font-medium text-slate-500">
            {date}
          </span>
        </h3>
        <article className="rounded border-l-4 border-stone-950 bg-stone-900 pb-4 pl-3 pr-4 pt-2">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="mt-2">
                <Link
                  href={url}
                  target="_blank"
                  className="font-semibold text-[#00a8fc] hover:underline"
                >
                  {name} - {title}
                </Link>
              </div>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>{intro}</li>
                <li>{core}</li>
                <li>{platform}</li>
                <li>{pricing}</li>
              </ul>
              <div className="text-sm">{tags.join(', ')}</div>
            </div>
            {!!iconUrl && <img src={iconUrl} alt="Logo" className="h-20 w-20 rounded" />}
          </div>
          <div className="mt-4">
            {!!coverUrl && <img src={coverUrl} alt="Cover image" className="rounded" />}
          </div>
        </article>
      </div>
    </div>
  )
}

export default memo(DiscordPreview)

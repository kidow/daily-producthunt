'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'
import { isURL } from 'services'

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

const SlackPreview: FC<Props> = ({
  date = '2:37 AM',
  url,
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
    <div className="flex gap-2">
      <img src="/logo.png" alt="" className="h-9 w-9 rounded" />
      <div className="flex-1">
        <div className="flex items-center gap-[5px]">
          <span className="text-[15px] font-bold">일간 ProductHunt</span>
          <span className="rounded-sm bg-neutral-700 px-[3px] py-px text-2xs text-neutral-300">
            앱
          </span>
          <span className="text-xs text-neutral-400">{date}</span>
        </div>
        <div>
          <Link
            href={url}
            target="_blank"
            className={classnames('cursor-pointer hover:underline', {
              'text-[#1d9bd1]': isURL(url)
            })}
          >
            {name} - {title}
          </Link>
        </div>
        <div className="my-2 flex items-start">
          <ul className="flex-1 list-inside list-disc">
            <li>{intro}</li>
            <li>{core}</li>
            <li>{platform}</li>
            <li>{pricing}</li>
          </ul>
          {!!iconUrl && (
            <img
              src={iconUrl}
              alt=""
              className="h-[88px] w-[88px] rounded-lg"
            />
          )}
        </div>
        <ul className="flex flex-wrap gap-1">
          {tags.map((tag, key) => (
            <li
              key={key}
              className="rounded-sm border border-neutral-700 px-[3px] py-0.5 text-xs text-[#e8912d]"
            >
              {tag}
            </li>
          ))}
        </ul>
        {!!coverUrl && <img src={coverUrl} alt="" className="mt-2 rounded" />}
      </div>
    </div>
  )
}

export default memo(SlackPreview)

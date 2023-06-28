import { memo } from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface Props {
  id: string
  iconUrl: string
  name: string
  title: string
  tags: string[]
  createdAt: string
}
interface State {}

const Product: FC<Props> = ({ id, iconUrl, name, title, tags, createdAt }) => {
  return (
    <li>
      <Link className="flex gap-4" href={`/product/${id}`}>
        <img
          src={iconUrl}
          alt="logo"
          className="h-12 w-12 rounded md:h-20 md:w-20"
        />
        <div className="space-y-0.5 md:space-y-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="break-keep text-neutral-400">{title}</p>
          <ul className="flex flex-wrap items-center gap-2 pt-1">
            {tags.map((tag, key) => (
              <li
                key={key}
                className="rounded-full border border-neutral-700 px-1.5 py-0.5 text-xs text-neutral-400"
              >
                {tag}
              </li>
            ))}
            <li className="text-xs text-neutral-500">
              {dayjs(createdAt).locale('ko').fromNow()}
            </li>
          </ul>
        </div>
      </Link>
    </li>
  )
}

export default memo(Product)

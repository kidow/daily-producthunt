'use client'

import classnames from 'classnames'
import { useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  tagList: Tag[]
}

export default function Tag({ value, onChange, tagList }: Props): JSX.Element {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <button
      ref={ref}
      type="button"
      className={classnames(
        'ring-primary group relative h-[42px] w-52 rounded border border-neutral-700 px-3 text-left duration-150 focus:outline-none focus:ring-black',
        {
          'before:pointer-events-none before:absolute before:left-3 before:top-2 before:text-neutral-400 before:content-["태그"]':
            !value
        }
      )}
    >
      <span>{value}</span>
      <div className="absolute left-0 top-12 z-10 hidden w-full bg-black group-focus-within:block">
        <ul className="flex max-h-96 flex-wrap gap-1.5 overflow-auto overscroll-contain p-2">
          {tagList.map((item, key) => (
            <li
              key={key}
              onClick={() => {
                ;(document.activeElement as HTMLElement).blur()
                onChange(item.name)
              }}
              className="cursor-pointer rounded-xl border border-neutral-700 px-2 py-1 text-xs hover:border-neutral-600 hover:text-white"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </button>
  )
}

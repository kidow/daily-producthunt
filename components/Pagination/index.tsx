'use client'

import type { FC } from 'react'
import { usePagination } from 'services'
import classnames from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

export interface Props {
  page: number
  total: number
  size: number
  onChange: (page: number) => void
}

const Pagination: FC<Props> = ({ page, total, size, onChange }) => {
  const range = usePagination({ page, total, size })
  if (page === 0 || !range) return null

  if (range.length < 2) {
    return (
      <ul className="inline-flex divide-x divide-neutral-300 rounded-md border border-neutral-300 bg-white text-sm font-medium dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800">
        <li className="inline-flex cursor-not-allowed items-center p-2 text-neutral-300">
          <ChevronLeftIcon className="h-5 w-5" />
        </li>
        <li className="inline-flex cursor-pointer items-center px-3 py-2">1</li>
        <li className="inline-flex cursor-not-allowed items-center p-2 text-neutral-300">
          <ChevronRightIcon className="h-5 w-5" />
        </li>
      </ul>
    )
  }

  return (
    <ul className="inline-flex select-none divide-x divide-neutral-300 rounded-md border border-neutral-300 bg-white text-sm font-medium dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800">
      <li
        className={classnames(
          'inline-flex select-none items-center p-2',
          page === 1
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/30'
        )}
        onClick={() => {
          if (page === 1) return
          onChange(page - 1)
        }}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </li>
      {range.map((pageNumber, key) => {
        if (pageNumber === '...') {
          return (
            <li key={key} className="inline-flex items-center p-2">
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={classnames(
              'inline-flex cursor-pointer select-none items-center px-3 py-2',
              pageNumber === page
                ? 'bg-blue-100 dark:bg-blue-500'
                : 'hover:bg-blue-50 dark:hover:bg-blue-500/30'
            )}
            key={key}
            onClick={() => {
              if (pageNumber === page) return
              onChange(pageNumber)
            }}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={classnames(
          'inline-flex select-none items-center p-2',
          total < page * size
            ? 'cursor-not-allowed'
            : 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-500/30'
        )}
        onClick={() => {
          if (total < page * size) return
          onChange(page + 1)
        }}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </li>
    </ul>
  )
}

export default Pagination

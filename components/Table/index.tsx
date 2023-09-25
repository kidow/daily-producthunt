'use client'

import classnames from 'classnames'
import { Spinner } from 'components'
import type { ReactNode } from 'react'

export interface Props<T> {
  list: T[]
  columns: ReactNode
  renderItem: (item: T, index: number) => ReactNode
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

function Table<T>({
  columns,
  list,
  renderItem,
  loading,
  size = 'lg'
}: Props<T>) {
  return (
    <div
      className={classnames(
        'relative',
        loading ? 'cursor-progress overflow-hidden' : 'overflow-auto'
      )}
    >
      {loading && (
        <Spinner className="absolute left-1/2 top-1/2 z-[12] h-6 w-6 text-neutral-200" />
      )}
      <table
        className={classnames(
          'tw-table w-full border-collapse whitespace-nowrap text-center text-xs text-neutral-500 dark:text-neutral-50',
          {
            'pointer-events-none select-none opacity-60': loading,
            'tw-table-lg': size === 'lg',
            'tw-table-md': size === 'md',
            'tw-table-sm': size === 'sm',
            'tw-table-xs': size === 'xs'
          }
        )}
      >
        <thead className="sticky top-0 bg-neutral-100 tracking-wider dark:bg-neutral-700">
          {columns}
        </thead>
        <tbody>
          {!!list.length ? (
            list.map((item: T, key) => renderItem(item, key))
          ) : (
            <tr>
              <td
                colSpan={99}
                className="text-neutral-400 dark:text-neutral-500"
              >
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table

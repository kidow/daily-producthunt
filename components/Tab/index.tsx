'use client'

import { memo } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'

export interface Props {
  value: string
  name: string
  onClick: (value: string) => void
}
interface State {}

const Tab: FC<Props> = ({ name, value, onClick }) => {
  return (
    <li
      onClick={() => onClick(name)}
      className={classnames(
        'cursor-pointer rounded-t-md border border-neutral-700 px-4 py-2 text-sm font-medium duration-150',
        value === name ? 'bg-neutral-800 text-primary' : 'text-neutral-400'
      )}
    >
      {name}
    </li>
  )
}

export default memo(Tab)

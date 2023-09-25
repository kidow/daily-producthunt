'use client'

import classnames from 'classnames'
import type { Argument } from 'classnames'
import { cloneElement, useMemo } from 'react'
import type { FC, MouseEventHandler, ReactElement } from 'react'

export interface Props extends ReactProps {
  className?: Argument
  onClick?: MouseEventHandler<HTMLButtonElement>
}
interface State {}

const IconButton: FC<Props> = ({ children, className, onClick }) => {
  const clone = useMemo(
    () =>
      cloneElement(children as ReactElement, {
        className: 'text-neutral-400 h-4 w-4'
      }),
    [children]
  )
  return (
    <button
      className={classnames(
        'group flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-800 p-2 hover:border-neutral-600 hover:bg-neutral-800 hover:brightness-105 active:brightness-90 disabled:cursor-not-allowed',
        className
      )}
      type="button"
      onClick={onClick}
    >
      {clone}
    </button>
  )
}

export default IconButton

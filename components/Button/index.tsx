'use client'

import { memo } from 'react'
import type { FC, MouseEventHandler } from 'react'
import classnames from 'classnames'
import type { Argument } from 'classnames'

export interface Props {
  text?: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: Argument
}
interface State {}

const Button: FC<Props> = ({ text, type = 'submit', onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(
        'rounded-md border border-transparent bg-primary px-3.5 py-2 font-medium duration-150 focus:outline-none disabled:cursor-not-allowed',
        className
      )}
    >
      {text}
    </button>
  )
}

export default memo(Button)

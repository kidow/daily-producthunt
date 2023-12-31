'use client'

import { memo } from 'react'
import type { FC, MouseEventHandler } from 'react'
import { cn } from 'services'

export interface Props {
  text?: string
  type?: 'button' | 'reset' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
}
interface State {}

const Button: FC<Props> = ({
  text,
  type = 'submit',
  onClick,
  className,
  disabled
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'rounded-md border border-transparent bg-primary px-3.5 py-2 font-medium duration-150 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-500',
        className
      )}
    >
      {text}
    </button>
  )
}

export default memo(Button)

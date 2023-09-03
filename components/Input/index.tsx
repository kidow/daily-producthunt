'use client'

import { useId } from 'react'
import type { FC, HTMLInputTypeAttribute, ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import classnames from 'classnames'
import type { Argument } from 'classnames'

export interface Props {
  register: UseFormRegisterReturn
  suffix?: ReactNode
  required?: boolean
  type?: HTMLInputTypeAttribute
  placeholder?: string
  fullWidth?: boolean
  float?: boolean
  className?: Argument
}
interface State {}

const Input: FC<Props> = ({
  required,
  type,
  suffix,
  register,
  placeholder,
  fullWidth,
  float,
  className
}) => {
  const id = useId()
  return (
    <div
      className={classnames('inline-block', { 'w-full': fullWidth }, className)}
    >
      <div
        className={classnames(
          'rounded border border-neutral-700 px-3 py-2 ring-primary duration-150 focus-within:ring focus:border-primary',
          { 'w-full': fullWidth, relative: !!placeholder }
        )}
      >
        <input
          {...register}
          className={classnames('w-full bg-transparent focus:outline-none', {
            'peer placeholder-transparent': !!placeholder && float
          })}
          id={id}
          type={type}
          required={required}
          autoComplete="off"
          placeholder={placeholder}
          spellCheck={false}
        />
        <label className="pointer-events-none absolute -top-6 left-0 max-w-[calc(100%-24px)] cursor-text select-none truncate text-sm text-slate-600 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-6 peer-focus:left-0 peer-focus:max-w-full peer-focus:cursor-default peer-focus:text-sm peer-focus:text-slate-400">
          {placeholder}
        </label>
        {suffix}
      </div>
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  float: true
}

export default Input

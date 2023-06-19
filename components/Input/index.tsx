'use client'

import { memo } from 'react'
import type { FC, InputHTMLAttributes } from 'react'
import classnames from 'classnames'
import type { Argument } from 'classnames'

export interface Props<T extends HTMLInputElement = HTMLInputElement> {
  value?: InputHTMLAttributes<T>['value']
  onChange?: InputHTMLAttributes<T>['onChange']
  type?: InputHTMLAttributes<T>['type']
  placeholder?: string
  readOnly?: boolean
  disabled?: boolean
  autoFocus?: boolean
  autoComplete?: string
  required?: boolean
  className?: Argument
}
interface State {}

const Input: FC<Props> = ({
  value,
  onChange,
  type,
  placeholder,
  readOnly,
  disabled,
  autoComplete,
  autoFocus,
  required,
  className
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      required={required}
      className={classnames(
        'rounded border border-neutral-700 bg-transparent px-3 py-2 ring-primary duration-150 focus:outline-none focus:ring disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-400',
        className
      )}
    />
  )
}

export default memo(Input)

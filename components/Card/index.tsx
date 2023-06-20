'use client'

import type { FC } from 'react'

export interface Props extends ReactProps {
  title: string
}
interface State {}

const Card: FC<Props> = ({ title, children }) => {
  return (
    <div className="relative rounded border border-neutral-600 px-6 py-7">
      <div className="absolute -top-3 left-4 bg-neutral-900 px-2 text-lg font-medium">
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Card

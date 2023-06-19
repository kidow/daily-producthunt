'use client'

import { Spinner } from 'components'
import { useState, useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom'
import { EventListener } from 'services'

export interface Props {}
interface State {}

const Backdrop: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const listener = useCallback(
    ({ detail }: any) => {
      setIsOpen(detail)
      if (detail) document.body.style.overflow = 'hidden'
      else document.body.removeAttribute('style')
    },
    [isOpen]
  )

  useEffect(() => {
    EventListener.add('backdrop', listener)
    return () => EventListener.remove('backdrop', listener)
  }, [])
  if (!isOpen) return null
  return createPortal(
    <div role="progressbar">
      <div className="fixed inset-0 z-40 cursor-progress bg-black opacity-30" />
      <span className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 cursor-progress">
        <Spinner className="h-10 w-10" />
      </span>
    </div>,
    document.body
  )
}

export default Backdrop

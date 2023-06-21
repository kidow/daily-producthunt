'use client'

import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import { EventListener } from 'services'
import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid'
import { createPortal } from 'react-dom'

export interface Props {}
interface State {}

const Toast: FC<Props> = () => {
  const [list, setList] = useState<NToast.Item[]>([])

  const listener = useCallback(
    ({ detail }: any) =>
      setList(() => [
        ...list,
        {
          id: Math.random().toString().slice(2),
          message: detail?.message,
          type: detail?.type
        }
      ]),
    [list]
  )

  useEffect(() => {
    EventListener.once('toast', listener)
  }, [listener])

  if (!list.length) return null
  return createPortal(
    <div role="alertdialog">
      <ul className="fixed right-4 top-4 z-50 space-y-4">
        {list.map((item, key) => (
          <li
            key={key}
            onClick={() =>
              setList((list) => [...list.slice(0, key), ...list.slice(key + 1)])
            }
            className="relative w-80 animate-toast-open cursor-pointer select-none rounded-lg border border-neutral-700 bg-neutral-800 p-4"
            role="alert"
          >
            <button className="absolute right-2 top-2">
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="flex items-start gap-3">
              {item.type === 'success' && (
                <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
              )}
              {item.type === 'info' && (
                <InformationCircleIcon className="h-6 w-6 text-sky-500" />
              )}
              {item.type === 'warn' && (
                <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
              )}
              {item.type === 'error' && (
                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
              )}
              <p className="flex-1 break-keep pr-4 text-neutral-300">
                {item.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  )
}

export default Toast

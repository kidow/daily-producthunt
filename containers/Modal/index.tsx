'use client'

import { useEffect } from 'react'
import type { FC } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'
import { createPortal } from 'react-dom'

import AddTagModal from './AddTag'

interface Props extends ModalProps, ReactProps {}

const Modal: FC<Props> = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  title,
  description,
  padding = true,
  footer
}) => {
  const onEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      window.removeEventListener('keydown', onEscape)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [isOpen])
  if (!isOpen) return null
  return createPortal(
    <div
      className="fixed inset-0 z-30 overflow-y-auto"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-screen items-center justify-center p-0 text-center md:block">
        <div
          className="fixed inset-0 bg-black/30 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />
        <span
          className="hidden h-screen align-middle md:inline-block"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={classnames(
            'my-8 inline-block w-full transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all',
            maxWidth
          )}
        >
          <header className="border-t-4 border-primary bg-neutral-800">
            <div className="flex items-center border-b border-neutral-700 px-4 py-3">
              <div className="flex-1">
                <h1 className="text-xl font-semibold">{title}</h1>
                {!!description && (
                  <p className="mt-1 text-sm text-neutral-400">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-neutral-900"
              >
                <XMarkIcon className="h-5 w-5 text-neutral-100" />
              </button>
            </div>
          </header>
          <div
            className={classnames('bg-neutral-800', {
              'px-7 py-6': padding,
              'rounded-b-lg': !footer
            })}
          >
            {children}
          </div>
          {footer && (
            <footer className="rounded-b-lg border-t border-neutral-700 bg-neutral-800 px-7 py-4">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Object.assign(Modal, {
  AddTag: AddTagModal
})

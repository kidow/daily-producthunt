'use client'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Post } from 'containers'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect } from 'react'
import { useObjectState } from 'services'

interface Props {
  params: {
    id: string
  }
}
interface State {
  data: (Table.History & { likes: string[] }) | null
  ip: string | null
}

export default function Page({ params }: Props): JSX.Element {
  const { back } = useRouter()
  const [{ data, ip }, setState] = useObjectState<State>({
    data: null,
    ip: null
  })

  const get = async () => {
    const res = await fetch(`/api/post?id=${params.id}`)
    const { data, ip } = await res.json()
    if (!data) return
    setState({
      data: {
        ...data,
        likes: data?.likes?.map((item: Table.Like) => item.ip_address) || []
      },
      ip
    })
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <Transition show>
      <Dialog onClose={back} className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-200"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-100"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full scale-100 transform overflow-hidden rounded-2xl bg-neutral-900 p-4 text-left align-middle opacity-100 shadow-xl transition-all max-w-4xl">
                {data ? (
                  <Post ip={ip} {...data} />
                ) : (
                  <>
                    <div className="h-[517px] animate-pulse rounded bg-neutral-800 md:mb-10" />
                    <div className="flex gap-4 md:m-10 md:gap-5">
                      <div className="h-12 w-12 animate-pulse rounded bg-neutral-800 md:h-20 md:w-20" />
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <button className="hidden fixed top-4 right-8 h-10 w-10 rounded-xl bg-neutral-100 md:inline-flex items-center justify-center">
            <XMarkIcon className="h-6 w-6 text-neutral-900" />
          </button>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

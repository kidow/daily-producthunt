'use client'

import { Dialog, Transition } from '@headlessui/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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
}

export default function Page({ params }: Props): JSX.Element {
  const { back } = useRouter()
  const supabase = createClientComponentClient<Database>()
  const [{ data }, setState] = useObjectState<State>({ data: null })

  const get = async () => {
    const { data } = await supabase
      .from('histories')
      .select(
        `
        *,
        likes (*)
    `
      )
      .eq('id', params.id)
      .single()
    if (!data) return
    setState({
      data: { ...data, likes: data.likes.map((item) => item.ip_address) || [] }
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
                {data ? <Post ip={null} {...data} /> : <></>}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

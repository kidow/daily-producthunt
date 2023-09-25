'use client'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from 'components'
import { Modal } from 'containers'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import type { FC, FormEvent } from 'react'
import { backdrop, toast } from 'services'

export interface Props extends ModalProps {
  onComplete?: () => void
}

const AddTagModal: FC<Props> = ({ isOpen, onClose, onComplete }) => {
  const [list, setList] = useState<
    Database['public']['Tables']['tags']['Row'][]
  >([])
  const [name, setName] = useState<string>('')
  const supabase = createClientComponentClient<Database>()

  const get = async () => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })

    if (error) toast.error(error.message)
    else setList(data)
  }

  const add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    backdrop.open()
    await supabase.from('tags').insert({ name })
    backdrop.close()
    setName('')
    get()
    if (onComplete) onComplete()
  }

  const remove = async (id: number) => {
    if (!window.confirm('삭제하겠습니까?')) return
    backdrop.open()
    await supabase.from('tags').delete().eq('id', id)
    backdrop.close()
    get()
  }

  const searchList: Database['public']['Tables']['tags']['Row'][] =
    useMemo(() => {
      if (!name) return list
      return new Fuse(list, { keys: ['name'] })
        .search(name)
        .map(({ item }) => item)
    }, [name, list])

  useEffect(() => {
    get()
  }, [])
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="태그 관리"
      maxWidth="max-w-6xl"
    >
      <form onSubmit={add} className="flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          className="tw-input"
          autoFocus
        />
        <div className="min-w-[67px]">
          <Button disabled={!name} text="추가" />
        </div>
      </form>

      <ul className="mt-4 flex flex-wrap gap-3">
        {searchList.map((item) => (
          <li
            key={item.id}
            className="group inline-flex gap-2 rounded-xl border border-neutral-700 px-3 py-2 text-sm"
          >
            <span>{item.name}</span>
            <button
              onClick={() => remove(item.id)}
              className="hidden group-hover:inline-block"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export default AddTagModal

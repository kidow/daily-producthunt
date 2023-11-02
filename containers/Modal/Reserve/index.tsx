'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, IconButton, Input, Tag } from 'components'
import { Modal } from 'containers'
import { type FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { backdrop, toast } from 'services'

export interface Props extends ModalProps {
  onComplete: () => void
  id: number
  tagList: Table.Tag[]
}
interface State {
  url: string
  name: string
  iconUrl: string
  coverUrl: string
  title: string
  intro: string
  core: string
  platform: string
  pricing: string
}

const ReserveModal: FC<Props> = ({
  isOpen,
  onClose,
  onComplete,
  id,
  tagList
}) => {
  const { register, handleSubmit, setValue } = useForm<State>()
  const [tags, setTags] = useState<string[]>([''])
  const supabase = createClientComponentClient<Database>()

  const get = async () => {
    const { data } = await supabase
      .from('reserves')
      .select('*')
      .eq('id', id)
      .single()

    if (!data) return
    setValue('url', data.url)
    setValue('name', data.name)
    setValue('iconUrl', data.icon_url)
    setValue('coverUrl', data.cover_url)
    setValue('title', data.title)
    setValue('intro', data.intro)
    setValue('core', data.core)
    setValue('platform', data.platform)
    setValue('pricing', data.pricing)
    setTags(data.tags)
  }

  const update = async (form: State) => {
    backdrop.open()
    const { error } = await supabase
      .from('reserves')
      .update({
        url: form.url,
        name: form.name,
        icon_url: form.iconUrl,
        cover_url: form.coverUrl,
        title: form.title,
        intro: form.intro,
        core: form.core,
        platform: form.platform,
        pricing: form.pricing,
        tags
      })
      .eq('id', id)
    backdrop.close()
    if (error) {
      console.error(error)
    } else {
      toast.success('수정되었습니다.')
      onClose()
      onComplete()
    }
  }

  useEffect(() => {
    if (id) get()
  }, [id])
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="수정" maxWidth="max-w-6xl">
      <form
        onSubmit={handleSubmit(update)}
        className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3"
      >
        <Input
          className="col-span-2"
          placeholder="URL"
          required
          type="url"
          register={register('url', { required: true })}
        />
        <Input
          placeholder="이름"
          required
          register={register('name', { required: true })}
        />
        <Input
          className="col-span-3"
          placeholder="Icon URL"
          required
          type="url"
          register={register('iconUrl', { required: true })}
        />
        <Input
          className="col-span-3"
          placeholder="Cover URL"
          required
          type="url"
          register={register('coverUrl', { required: true })}
        />
        <div className="col-span-3 flex flex-wrap items-center gap-4">
          {tags.map((tag, i) => (
            <Tag
              key={i}
              tagList={tagList}
              value={tag}
              onChange={(name) =>
                setTags([...tags.slice(0, i), name, ...tags.slice(i + 1)])
              }
            />
          ))}
          <IconButton onClick={() => setTags([...tags, ''])}>
            <PlusIcon />
          </IconButton>
        </div>
        <Input
          className="col-span-3"
          placeholder="타이틀"
          required
          register={register('title', { required: true })}
        />
        <Input
          className="col-span-3"
          placeholder="한 줄 소개"
          required
          register={register('intro', { required: true })}
        />
        <Input
          className="col-span-3"
          placeholder="핵심 기능"
          required
          register={register('core', { required: true })}
        />
        <Input
          className="col-span-3"
          placeholder="지원 플랫폼"
          required
          register={register('platform', { required: true })}
        />
        <Input
          className="col-span-3"
          placeholder="가격 정책"
          required
          register={register('pricing', { required: true })}
        />
        <div className="col-span-1">
          <Button text="수정" type="submit" />
        </div>
      </form>
    </Modal>
  )
}

export default ReserveModal

'use client'

import { useState } from 'react'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Modal } from 'containers'
import { Button, Tab } from 'components'
import { backdrop } from 'services'

export interface Props extends ModalProps {}
interface State {}

const TestModal: FC<Props> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('Slack')
  const { handleSubmit, register } = useForm<{
    slackToken: string
    slackChannelId: string
  }>({})

  const slackTest = async (data: {
    slackToken: string
    slackChannelId: string
  }) => {
    backdrop(true)
    const res = await fetch('/api/test/slack', {
      method: 'POST',
      cache: 'no-store',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    })
    const { success, result } = await res.json()
    console.log('result', result)
    backdrop(false)
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="전송 테스트"
      maxWidth="max-w-2xl"
    >
      <ul className="flex gap-2 border-b border-neutral-700 px-6">
        {['Slack', 'Notion', 'Discord', 'Telegram'].map((name, key) => (
          <Tab
            key={key}
            name={name}
            onClick={(value) => setTab(value)}
            value={tab}
          />
        ))}
      </ul>
      {tab === 'Slack' && (
        <form onSubmit={handleSubmit(slackTest)} className="mt-4 space-y-4">
          <input
            className="tw-input w-full"
            required
            autoComplete="off"
            placeholder="xoxb-"
            {...register('slackToken', { required: true })}
          />
          <input
            className="tw-input w-full"
            required
            autoComplete="off"
            placeholder="D"
            {...register('slackChannelId', { required: true })}
          />
          <div className="flex justify-end">
            <Button text="전송" />
          </div>
        </form>
      )}
    </Modal>
  )
}

export default TestModal

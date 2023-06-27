'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export default function Page() {
  const [url, setUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !/^https?:\/\/(?:canary|ptb)?\.?discord(?:app)?\.com\/api\/webhooks\/\d{17,19}\/[\w-]{68,72}$/.test(
        url
      )
    ) {
      alert('올바른 웹훅 URL이 아닙니다.')
      return
    }
    setIsLoading(true)
    const res = await fetch('/api/webhook/discord', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ webhookUrl: url }),
      cache: 'no-cache'
    })
    const { success, message } = await res.json()
    setIsLoading(false)
    if (success) {
      alert(message || '완료되었습니다!')
    } else {
      alert(
        message ||
          '죄송합니다. 에러가 발생했습니다. 계속 발생한다면 https://a22k.short.gy/VniaWA 에서 문의바랍니다.'
      )
    }
  }
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-4">
          <form
            onSubmit={onSubmit}
            className="flex items-center rounded-md border border-primary ring-primary/50 duration-150 focus-within:ring"
          >
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
              className="w-96 bg-transparent px-3 py-2 focus:outline-none"
              autoFocus
            />
            <button className="bg-primary px-3 py-2" disabled={isLoading}>
              {isLoading ? '등록 중...' : '등록'}
            </button>
          </form>
          <div className="text-center">디스코드 웹훅 URL을 붙여넣기하세요.</div>
        </div>
      </div>
    </div>
  )
}

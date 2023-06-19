'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Page() {
  const [url, setUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSucceed, setIsSucceed] = useState<boolean>(false)
  const supabase = createClientComponentClient<Database>()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setIsSucceed(false)
    if (
      !/^https?:\/\/(?:canary|ptb)?\.?discord(?:app)?\.com\/api\/webhooks\/\d{17,19}\/[\w-]{68,72}$/.test(
        url
      )
    ) {
      alert('올바른 웹훅 URL이 아닙니다.')
      setIsLoading(false)
      return
    }
    const { data } = await supabase
      .from('connections')
      .select('discord_webhook_url')
      .eq('discord_webhook_url', url)
      .single()
    if (data) {
      alert('이미 등록되어 있습니다.')
      setIsLoading(false)
      return
    }

    const { error } = await supabase
      .from('subscribers')
      .insert({ discord_webhook_url: url })
    if (error) {
      alert(
        '죄송합니다. 에러가 발생했습니다. 계속 발생한다면 https://a22k.short.gy/VniaWA 에서 문의바랍니다.'
      )
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    setIsSucceed(true)
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
              name="url"
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
              className="w-96 bg-transparent px-3 py-2 focus:outline-none"
            />
            <button className="bg-primary px-3 py-2" disabled={isLoading}>
              {isLoading ? '등록 중...' : '등록'}
            </button>
          </form>
          <div className="text-center">
            디스코드 웹훅 URL을 붙여넣기하세요. {isSucceed && '완료!'}
          </div>
        </div>
      </div>
    </div>
  )
}

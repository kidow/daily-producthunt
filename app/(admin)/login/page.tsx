'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from 'components'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { backdrop, toast } from 'services'

export default function Page() {
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false)
  const supabase = createClientComponentClient<Database>()
  const { push } = useRouter()

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email !== process.env.ADMIN_EMAIL) return
    backdrop(true)
    if (isOtpSent) {
      const { error } = await supabase.auth.verifyOtp({
        type: 'magiclink',
        token: code,
        email
      })
      backdrop(false)
      if (error) {
        toast.error('verifyOtp 에러')
        console.error(error)
        return
      }
      push('/dashboard')
    } else {
      const { error } = await supabase.auth.signInWithOtp({ email })
      backdrop(false)
      if (error) {
        toast.error('signInWithOtp 에러')
        console.error(error)
        return
      }
      setIsOtpSent(true)
    }
  }
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <form onSubmit={onLogin} className="w-80 space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="block w-full"
            placeholder="이메일"
            autoFocus
          />
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="block w-full"
            placeholder="6자리 코드"
          />
          <button className="block w-full rounded bg-primary px-3 py-2">
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}

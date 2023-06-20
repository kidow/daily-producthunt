'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { backdrop, toast } from 'services'
import { useForm } from 'react-hook-form'

interface State {
  email: string
  code: string
}

export default function Page() {
  const { register, handleSubmit } = useForm<State>({
    defaultValues: {
      email: '',
      code: ''
    }
  })
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false)
  const supabase = createClientComponentClient<Database>()
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const onLogin = async ({ email, code }: State) => {
    if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) return
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
      const redirectUrl = searchParams.get('redirectUrl')
      push(redirectUrl || '/dashboard')
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
        <form onSubmit={handleSubmit(onLogin)} className="w-80 space-y-4">
          <input
            type="email"
            required
            className="tw-input block w-full"
            placeholder="이메일"
            autoFocus
            disabled={isOtpSent}
            {...register('email', { required: true })}
          />
          {isOtpSent && (
            <input
              className="tw-input block w-full"
              placeholder="6자리 코드"
              {...register('code')}
            />
          )}
          <button className="block w-full rounded bg-primary px-3 py-2">
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}

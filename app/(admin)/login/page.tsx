'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from 'components'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { backdrop, toast, useUsermaven } from 'services'

interface State {
  email: string
  password: string
}

export default function Page() {
  const { register, handleSubmit } = useForm<State>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const supabase = createClientComponentClient<Database>()
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const usermaven = useUsermaven()

  const onSubmit = async (form: State) => {
    if (form.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) return
    backdrop.open()
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    backdrop.close()
    if (error) {
      toast.error('로그인 에러')
      console.error(error)
      return
    }
    usermaven.track('signed_up', { method: 'email' })
    push('/dashboard')
  }

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      const redirectUrl = searchParams.get('redirectUrl')
      if (session?.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        push(redirectUrl || '/dashboard')
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <form className="space-y-8 block" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Email"
            type="email"
            required
            autoFocus
            register={register('email', { required: true })}
          />
          <div>
            <Input
              placeholder="Password"
              type="password"
              required
              register={register('password', { required: true })}
            />
          </div>
          <button className="rounded bg-primary px-3 block py-2">로그인</button>
        </form>
      </div>
    </div>
  )
}

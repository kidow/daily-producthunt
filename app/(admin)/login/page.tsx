'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const supabase = createClientComponentClient<Database>()
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login` }
    })
  }

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      const redirectUrl = searchParams.get('redirectUrl')
      if (session?.user.email?.startsWith('wcgo2ling@')) {
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
        <button onClick={googleLogin} className="rounded bg-primary px-3 py-2">
          로그인
        </button>
      </div>
    </div>
  )
}

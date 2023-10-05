'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const supabase = createClientComponentClient<Database>()
  const { push } = useRouter()

  const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: '/login' }
    })
  }

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) push('/dashboard')
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

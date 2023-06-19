'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, type FormEvent } from 'react'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const supabase = createClientComponentClient<Database>()

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={onLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          required
        />
        <button>로그인</button>
      </form>
    </div>
  )
}

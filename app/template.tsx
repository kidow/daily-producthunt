'use client'

import { UsermavenClient, usermavenClient } from '@usermaven/sdk-js'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const usermaven: UsermavenClient = usermavenClient({
      key: process.env.NEXT_PUBLIC_USERMAVEN_API_KEY,
      tracking_host: 'https://events.usermaven.com'
    })

    usermaven.track('pageview')
  }, [pathname, searchParams])
  return <>{children}</>
}

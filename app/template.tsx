'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useUsermaven } from 'services'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const usermaven = useUsermaven()

  useEffect(() => {
    usermaven.track('pageview')
  }, [pathname, searchParams])
  return <>{children}</>
}

'use client'

import { UsermavenClient, usermavenClient } from '@usermaven/sdk-js'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface Props extends ReactProps {}

function Usermaven({ children }: Props): JSX.Element {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const usermaven: UsermavenClient = usermavenClient({
      key: 'UMKhByWwEs',
      tracking_host: 'https://events.usermaven.com'
    })

    usermaven.track('pageview')
  }, [pathname, searchParams])
  return <>{children}</>
}

export default Usermaven

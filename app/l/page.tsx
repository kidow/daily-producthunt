'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const url = searchParams.get('url')

  useEffect(() => {
    if (url) {
      replace(url + '/?utm_source=daily_productunht')
    }
  }, [])
  return <>링크 이동 중...</>
}

'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (id) {
      replace(`/product/${id}` + '?utm_source=daily_producthunt')
    }
  }, [])
  return <>링크 이동 중...</>
}

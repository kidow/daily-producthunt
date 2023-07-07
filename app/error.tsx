'use client'

import { Header } from 'containers'
import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Header />
      <div className="text-center">
        <div>에러가 발생했습니다.</div>
        <div>
          없어진 페이지일 수도 있으니 문제가 반복된다면 다른 경로를 이용해
          주세요.
        </div>
      </div>
    </>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '전송 내역 관리',
  robots: 'noindex, nofollow'
}

export default function Layout({ children }: ReactProps) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인',
  robots: 'noindex, nofollow'
}

export default function Layout({ children }: ReactProps) {
  return <>{children}</>
}

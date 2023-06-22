import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '메시지 예약',
  robots: 'noindex, nofollow'
}

export default function Layout({ children }: ReactProps) {
  return <>{children}</>
}

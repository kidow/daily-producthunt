import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '잔디 웹훅 연결'
}

export default function Layout({ children }: ReactProps) {
  return <>{children}</>
}

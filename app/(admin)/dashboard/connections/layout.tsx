import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '연결된 유저'
}

export default function Layout({ children }: ReactProps) {
  return <>{children}</>
}

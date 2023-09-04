import type { Metadata } from 'next'
import Navigation from './navigation'

export const metadata: Metadata = {
  title: '대시보드',
  robots: 'noindex, nofollow'
}

export default function Layout({ children }: ReactProps) {
  return (
    <main className="relative flex">
      <Navigation />
      <div className="h-screen flex-1 overflow-auto p-4 md:p-8">{children}</div>
    </main>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  
  title: '일간 ProductHunt'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <>
      <header className="mx-auto flex h-20 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-circle.png" alt="logo" className="h-10 w-10" />
          <span className="hidden text-xl font-semibold md:inline-block">
            일간 ProductHunt
          </span>
        </Link>
        <nav className="font-medium">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="https://slashpage.com/daily-producthunt/g36nj8v2wkjz825ykq9z"
                target="_blank"
                className="hover:underline"
              >
                소개
              </Link>
            </li>
            <li>
              <Link
                href="https://slashpage.com/daily-producthunt/g36nj8v2wkjz825ykq9z"
                target="_blank"
                className="hover:underline"
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="https://slashpage.com/daily-producthunt/1n8pw9x2zwx57mg7yrqv"
                target="_blank"
                className="hover:underline"
              >
                커뮤니티
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="pb-16 pt-4">{children}</main>
    </>
  )
}

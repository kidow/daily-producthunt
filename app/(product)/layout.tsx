import { Header } from 'containers'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface Props extends ReactProps {
  modal: ReactNode
}

export default function RootLayout({ children, modal }: Props) {
  return (
    <>
      <Header />
      <main className="pb-16 pt-4">{children}</main>
      <footer className="mx-auto mt-10 flex max-w-4xl items-center gap-4 px-4 pb-16 text-sm text-neutral-500">
        <Link
          href="https://slashpage.com/daily-producthunt/1dwy5rvmjgqq72p46zn9"
          target="_blank"
        >
          이용약관
        </Link>
        <Link
          href="https://slashpage.com/daily-producthunt/d7916x82r844524kpyg3"
          target="_blank"
        >
          개인정보처리방침
        </Link>
      </footer>
      {modal}
    </>
  )
}

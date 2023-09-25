'use client'

import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useMemo, useState } from 'react'
import type { FC } from 'react'
import { cn } from 'services'

export interface Props {}
interface State {}

const Navigation: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const list: Array<{ href: string; name: string }> = useMemo(
    () => [
      { href: '/dashboard', name: '홈' },
      { href: '/dashboard/connections', name: '연결 목록' },
      { href: '/dashboard/reserves', name: '메시지 예약' },
      { href: '/dashboard/histories', name: '전송 내역' }
    ],
    []
  )
  return (
    <>
      <aside
        className={cn(
          'fixed left-0 top-0 z-10 h-screen w-72 border-r border-neutral-700 transition duration-150 md:static',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <nav className="h-full bg-black p-4">
          <ul>
            {list.map((item, key) => (
              <li key={key}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-4 py-1.5 font-semibold duration-150 hover:bg-neutral-800',
                    { 'text-primary': pathname === item.href }
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-5 top-5 md:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
    </>
  )
}

export default memo(Navigation)

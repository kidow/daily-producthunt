'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useMemo } from 'react'
import type { FC } from 'react'
import classnames from 'classnames'

export interface Props {}
interface State {}

const Navigation: FC<Props> = () => {
  const pathname = usePathname()

  const list: Array<{ href: string; name: string }> = useMemo(
    () => [
      { href: '/dashboard/connections', name: '연결 목록' },
      { href: '/dashboard/reserves', name: '메시지 예약' }
    ],
    []
  )
  return (
    <nav className="h-full bg-black p-4">
      <ul>
        {list.map((item, key) => (
          <li key={key}>
            <Link
              href={item.href}
              className={classnames(
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
  )
}

export default memo(Navigation)

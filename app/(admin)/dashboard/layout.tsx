import { Bars3Icon } from '@heroicons/react/24/solid'
import { Navigation } from 'containers'

export const metadata = {
  title: '대시보드'
}

export default function Layout({ children }: ReactProps) {
  return (
    <main className="relative flex">
      <aside className="hidden h-screen w-72 border-r border-neutral-700 md:block">
        <Navigation />
      </aside>
      <div className="h-screen flex-1 overflow-auto p-4 md:p-8">{children}</div>
      <button className="md:hidden">
        <Bars3Icon className="absolute right-5 top-5 h-6 w-6" />
      </button>
    </main>
  )
}

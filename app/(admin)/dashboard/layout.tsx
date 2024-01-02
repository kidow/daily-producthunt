import Navigation from './navigation'

export default function Layout({ children }: ReactProps) {
  return (
    <main className="relative flex">
      <Navigation />
      <div className="h-screen flex-1 overflow-auto p-4 md:p-8">{children}</div>
    </main>
  )
}

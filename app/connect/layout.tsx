export default function Layout({ children }: ReactProps) {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}

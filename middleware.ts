import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectUrl', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/post')) {
    const origin = req.headers.get('origin')
    res.headers.set(
      'Access-Control-Allow-Origin',
      origin || process.env.NEXT_PUBLIC_BASE_URL
    )
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/post']
}

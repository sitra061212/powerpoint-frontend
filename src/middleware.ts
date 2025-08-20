import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  console.log(`🔐 Middleware triggered for: ${pathname}`)

  const sessionCookie = getSessionCookie(request)
  console.log('Session cookie:', sessionCookie)

  if (!sessionCookie) {
    console.warn('❌ No session cookie found')
    return redirectToLogin(request, pathname + search)
  }

  console.log('✅ Session cookie found — redirecting allowed')
  return NextResponse.next()
}

function redirectToLogin(request: NextRequest, from: string) {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', from)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/home', '/presentations/:path*', '/templates/:path*'],
}

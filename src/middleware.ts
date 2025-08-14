import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') ?? ''

  const sessionResponse = await fetch(
    'http://localhost:5000/api/auth/get-session',
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  )

  let session: unknown = null
  if (sessionResponse.ok) {
    try {
      const body = await sessionResponse.json()
      session = body?.data ?? null
    } catch {
      session = null
    }
  }

  if (!session) {
    const loginUrl = new URL('/login', request.url)
    const currentPath = request.nextUrl.pathname + request.nextUrl.search
    loginUrl.searchParams.set('from', currentPath)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/presentations/:path*',
    '/templates/:path*',
    '/dashboard',
  ],
}

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') ?? ''

  const sessionResponse = await fetch(
    'http://localhost:5000/api/auth/get-session',
    {
      headers: {
        Cookie: cookieHeader,
      },
    }
  )

  let session: unknown = null
  if (sessionResponse.ok) {
    try {
      const body = await sessionResponse.json()
      session = body?.data ?? null
    } catch {
      session = null
    }
  }

  if (!session) {
    const loginUrl = new URL('/login', request.url)
    const currentPath = request.nextUrl.pathname + request.nextUrl.search
    loginUrl.searchParams.set('from', currentPath)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/presentations/:path*',
    '/templates/:path*',
    '/dashboard',
  ],
}




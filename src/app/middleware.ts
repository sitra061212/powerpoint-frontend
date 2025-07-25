import { betterFetch } from '@better-fetch/fetch'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieHeader = (await cookies()).toString()

  const { data: session } = await betterFetch(
    'http://localhost:5000/api/auth/get-session',
    {
      credentials: 'include',
      headers: {
        Cookie: cookieHeader,
      },
    }
  )

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard'], // Apply middleware to specific routes
}

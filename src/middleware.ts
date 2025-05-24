import { verifyToken } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/auth/signin']

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // Check login status
    let isLoggedIn = false
    try {
        const token = req.cookies.get('token')?.value

        if (token) {
            verifyToken(token)
            isLoggedIn = true
        }
    } catch {
        isLoggedIn = false
    }

    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

    if (!isLoggedIn && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    if (isLoggedIn && isPublicPath) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

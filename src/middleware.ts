import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    const token = request.cookies.get("token")?.value || ''

    //TODO IN THIS REDIRECT CHECK THE PATH WHERE WE ARE TRYING TO REDIRECT OUR USER

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/me', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/verifyemail'
    ]
}
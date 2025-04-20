import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// List of public paths that don't require authentication
const publicPaths = ['/login', '/register','/about','/contact'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is public
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    // Get the authentication state from cookies
    const isAuthenticated = request.cookies.get('auth')?.value === 'true';

    // If not authenticated and trying to access protected route, redirect to login
    if (!isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}; 
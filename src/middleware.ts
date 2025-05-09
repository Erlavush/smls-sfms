// Action: Modify src/middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { JWT } from "next-auth/jwt";

// Export the default middleware function configured with withAuth
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    // This inner function runs ONLY if the user is authenticated (token exists).
    function middleware(req) {
        const token = req.nextauth.token as JWT & { role?: string }; // Token is guaranteed here
        const { pathname } = req.nextUrl;

        // --- Redirect authenticated users from homepage ---
        if (pathname === '/') {
            const userRole = token.role;
            const targetUrl = userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
            console.log(`Authenticated user on '/', redirecting to ${targetUrl}`);
            return NextResponse.redirect(new URL(targetUrl, req.url));
        }

        // --- Role-Based Access Control for /admin ---
        if (pathname.startsWith('/admin')) {
            if (token?.role !== 'ADMIN') {
                console.warn(`Unauthorized access attempt to ${pathname} by user role: ${token?.role}`);
                 return NextResponse.redirect(new URL('/dashboard', req.url));
            }
             return NextResponse.next();
        }

        // --- General Authenticated Access ---
        // For any other authenticated route covered by the matcher (like /dashboard, /profile)
        // allow the request to proceed.
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        pages: {
            signIn: "/login",
        },
    }
);

// --- Route Matching ---
// *** UPDATED MATCHER ***
// Exclude API, static files, images, favicon, AND public auth pages.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes including /api/auth)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (the login page itself)
         * - forgot-password (password reset request page)
         * - reset-password (password reset page)
         * The negative lookahead `(?!...)` correctly excludes these.
         * The pattern `.*` after the lookahead WILL match the root path '/'.
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login|forgot-password|reset-password).*)',

        // Keep explicit protected paths if you prefer strictness, though the pattern covers them.
        '/dashboard/:path*',
        '/profile/:path*',
        '/documents/:path*',
        '/admin/:path*',
    ],
};
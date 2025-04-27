// src/middleware.ts
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

        // --- NEW: Redirect authenticated users from homepage ---
        // If the user is authenticated (which they are if this function runs)
        // and they are trying to access the root path ('/'), redirect them.
        if (pathname === '/') {
            const userRole = token.role; // Get role from token
            // Determine target dashboard based on role
            const targetUrl = userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard';
            console.log(`Authenticated user on '/', redirecting to ${targetUrl}`);
            // Redirect to the appropriate dashboard
            return NextResponse.redirect(new URL(targetUrl, req.url));
        }
        // --- END NEW ---

        // --- Role-Based Access Control for /admin ---
        // If user is trying to access an admin route
        if (pathname.startsWith('/admin')) {
            // Check if the user has the ADMIN role
            if (token?.role !== 'ADMIN') {
                // If not admin, redirect them to the faculty dashboard
                console.warn(`Unauthorized access attempt to ${pathname} by user role: ${token?.role}`);
                 return NextResponse.redirect(new URL('/dashboard', req.url));
            }
            // If user is ADMIN and accessing /admin, allow the request
             return NextResponse.next();
        }

        // --- General Authenticated Access ---
        // For any other authenticated route covered by the matcher (like /dashboard, /profile)
        // allow the request to proceed.
        return NextResponse.next();
    },
    {
        callbacks: {
            // This callback ensures the middleware function above runs ONLY if a valid token exists.
            authorized: ({ token }) => !!token
        },
        pages: {
            // Redirect users to /login if they need to sign in (UNCHANGED)
            signIn: "/login",
        },
    }
);

// --- Route Matching ---
// Ensure this middleware runs on the homepage ('/') for authenticated users,
// as well as the protected routes. Exclude API, static files, images, favicon, and the login page itself.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes including /api/auth)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (the login page itself)
         * The negative lookahead `(?!...)` correctly excludes these.
         * The pattern `.*` after the lookahead WILL match the root path '/'.
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',

        // Explicitly adding '/' is not strictly necessary due to the pattern above,
        // but doesn't hurt for clarity if preferred.
        // '/',

        // Keep explicit protected paths if you prefer strictness, though the pattern covers them.
        '/dashboard/:path*',
        '/profile/:path*',
        '/documents/:path*',
        '/admin/:path*',
    ],
};
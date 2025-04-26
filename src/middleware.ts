// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { JWT } from "next-auth/jwt"; // Import JWT type if needed

// Export the default middleware function configured with withAuth
export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        // This function runs ONLY if the user is authenticated (token exists)
        // console.log("Token in middleware:", req.nextauth.token); // Log token for debugging

        const token = req.nextauth.token as JWT & { role?: string }; // Cast token to access custom properties
        const { pathname } = req.nextUrl; // Get the requested path

        // --- Role-Based Access Control ---
        // If user is trying to access an admin route
        if (pathname.startsWith('/admin')) {
            // Check if the user has the ADMIN role
            if (token?.role !== 'ADMIN') {
                // If not admin, redirect them (e.g., to faculty dashboard or an unauthorized page)
                console.warn(`Unauthorized access attempt to ${pathname} by user role: ${token?.role}`);
                 // Redirect non-admins away from /admin routes
                 // Option 1: Redirect to faculty dashboard
                 return NextResponse.redirect(new URL('/dashboard', req.url));
                 // Option 2: Redirect to a specific 'unauthorized' page (if you create one)
                 // return NextResponse.redirect(new URL('/unauthorized', req.url));
            }
            // If user is ADMIN and accessing /admin, allow the request
             return NextResponse.next(); // Continue processing the request
        }

        // --- General Authenticated Access ---
        // For any other authenticated route (like /dashboard, /profile, /documents)
        // If the user is authenticated (which they are if this function runs),
        // allow the request to proceed.
        // You could add checks here if FACULTY role is explicitly required for /dashboard etc.
        // if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile') /*...*/) {
        //    if (token?.role !== 'FACULTY' && token?.role !== 'ADMIN') { // Example check
        //        return NextResponse.redirect(new URL('/unauthorized', req.url));
        //    }
        // }

        // Allow the request to proceed for authenticated users on non-admin routes covered by the matcher
        return NextResponse.next();
    },
    {
        callbacks: {
            // This callback determines IF the middleware function above runs.
            // It runs if the token exists (user is logged in).
            authorized: ({ token }) => !!token // !! converts truthy/falsy value to boolean
        },
        pages: {
            // Use the same signIn page as defined in your authOptions
            signIn: "/login",
            // You could add an error page if needed
            // error: "/auth/error",
        },
    }
);

// --- Route Matching ---
// Specifies which paths this middleware should run on.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes including /api/auth)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (the login page itself)
         * - / (the public homepage, if desired - remove if homepage needs auth)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
        // Explicitly include top-level protected routes if needed and not covered above
        '/dashboard/:path*', // Match /dashboard and any sub-paths
        '/profile/:path*',   // Match /profile and any sub-paths
        '/documents/:path*', // Match /documents and any sub-paths
        '/admin/:path*',     // Match /admin and any sub-paths
    ],
};
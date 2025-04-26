// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma'; // Import the singleton Prisma Client instance

export const authOptions: NextAuthOptions = {
    // Configure Prisma Adapter
    adapter: PrismaAdapter(prisma),

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials?.password) {
                    console.error('Credentials missing');
                    return null; // Indicate failure: credentials not provided
                }

                try {
                    // Find the user in the database using the imported prisma instance
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user) {
                        console.error('No user found with email:', credentials.email);
                        // Optionally: throw new Error("No user found."); // Can provide feedback
                        return null; // User not found
                    }

                    // Validate the password using bcrypt.compare
                    const isValidPassword = await bcrypt.compare(
                        credentials.password, // Plain password from login form
                        user.password         // Hashed password from database
                    );

                    if (!isValidPassword) {
                        console.error('Invalid password for user:', credentials.email);
                        // Optionally: throw new Error("Invalid password."); // Can provide feedback
                        return null; // Password doesn't match
                    }

                    console.log('User authorized:', user.email);
                    // Return user object if credentials are valid
                    // This object must satisfy NextAuth's User type (at least 'id')
                    // Using 'as any' here simplifies typing for now.
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role, // Include the role
                    } as any;

                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null; // Return null on any unexpected error during authorization
                }
            }
        })
        // ...add more providers here (e.g., Google, GitHub)
    ],

    // Define how session is managed
    session: {
        strategy: "jwt", // Use JSON Web Tokens for session management
    },

    // Callbacks are asynchronous functions you can use to control what happens
    callbacks: {
        // Add user id and role to the JWT payload
        async jwt({ token, user }) {
            if (user) {
                // The 'user' object here comes from the 'authorize' function or DB lookup
                token.id = user.id;
                // Need type assertion because 'role' isn't part of default JWT token type
                token.role = (user as any).role;
            }
            return token;
        },
        // Add user id and role to the session object available client-side
        async session({ session, token }) {
            if (token && session.user) {
                 // Need type assertion to add custom properties to default Session['user']
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },

    // Specify pages for login, error handling, etc.
    pages: {
        signIn: '/login', // Redirect users to /login if they need to sign in
        // error: '/auth/error', // Optional: Custom error page
    },

    // Secret for signing tokens (required) - loaded from .env.local
    secret: process.env.NEXTAUTH_SECRET,

    // Enable debug messages in development for easier troubleshooting
    debug: process.env.NODE_ENV === 'development',
};

// Export the NextAuth handler for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Instantiate Prisma Client (ensure it's only done once ideally)
// You might move this to a separate lib file later for better organization
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    // Configure Prisma Adapter
    adapter: PrismaAdapter(prisma),

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials?.password) {
                    console.error('Credentials missing');
                    return null; // Indicate failure
                }

                // Find the user in the database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    console.error('No user found with email:', credentials.email);
                    // Optionally: throw new Error("No user found."); // Can provide feedback to user
                    return null; // User not found
                }

                // Validate the password
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isValidPassword) {
                    console.error('Invalid password for user:', credentials.email);
                     // Optionally: throw new Error("Invalid password."); // Can provide feedback
                    return null; // Password doesn't match
                }

                console.log('User authorized:', user.email);
                // Return user object if credentials are valid
                // Only return necessary fields, NEVER the password hash
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role, // Include the role!
                };
            }
        })
        // ...add more providers here if needed (e.g., Google, GitHub)
    ],

    // Define how session is managed
    session: {
        strategy: "jwt", // Use JSON Web Tokens for session management
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    callbacks: {
        // Add user id and role to the JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // Important: Cast 'user.role' which comes from authorize() or db
                // Needs type assertion if authorize doesn't perfectly match Session User type
                token.role = (user as any).role;
            }
            return token;
        },
        // Add user id and role to the session object
        async session({ session, token }) {
            if (token && session.user) {
                 // Needs type assertion to add custom properties
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
        // signOut: '/auth/signout', // Optional: Custom sign out page
    },

    // Secret for signing tokens (required for production)
    // Ensure this is set in your .env.local file
    secret: process.env.NEXTAUTH_SECRET,

    // Enable debug messages in development
    debug: process.env.NODE_ENV === 'development',
};

// Export the handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
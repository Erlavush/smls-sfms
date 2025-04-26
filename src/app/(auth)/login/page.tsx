// src/app/(auth)/login/page.tsx
'use client'; // Mark this as a Client Component

import React, { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react'; // We'll use this to trigger login
import { useRouter } from 'next/navigation'; // To redirect after login

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // To display login errors
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        setError(null); // Clear previous errors
        setIsLoading(true);

        try {
            // Attempt to sign in using the 'credentials' provider
            const result = await signIn('credentials', {
                redirect: false, // Prevent NextAuth from automatically redirecting
                email: email,
                password: password,
            });

            setIsLoading(false);

            if (result?.error) {
                // Handle errors (e.g., wrong password, user not found)
                console.error("Sign In Error:", result.error);
                setError("Invalid email or password. Please try again."); // Generic error message
            } else if (result?.ok) {
                // Sign in successful
                console.log("Sign in successful!");
                // Redirect to the faculty dashboard (or based on role later)
                router.push('/dashboard'); // Or use router.replace('/dashboard')
                // Force refresh page state after redirect to ensure layout updates etc.
                router.refresh();
            } else {
                 setError("An unknown error occurred during login.");
            }

        } catch (error) {
            setIsLoading(false);
            console.error("Login submission failed:", error);
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100"> {/* Light gray background for contrast */}
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"> {/* White login card */}
                <h1 className="mb-6 text-center text-3xl font-semibold text-[#003153]"> {/* SMLS Blue Heading */}
                    SMLS-SFMS Login
                </h1>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-center text-red-700">
                            {error}
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#003153] focus:outline-none focus:ring-1 focus:ring-[#003153]" // Focus ring with SMLS blue
                            placeholder="your.email@example.com"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-[#003153] focus:outline-none focus:ring-1 focus:ring-[#003153]" // Focus ring with SMLS blue
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        {/* Optional: Add "Forgot Password?" link here */}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full rounded-md px-4 py-2 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003153] focus:ring-offset-2 ${
                                isLoading
                                    ? 'cursor-not-allowed bg-gray-400'
                                    : 'bg-[#003153] hover:bg-[#002742]' // SMLS Blue background, slightly darker on hover
                            }`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
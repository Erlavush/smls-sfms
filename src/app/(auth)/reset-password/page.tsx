// src/app/(auth)/reset-password/page.tsx

'use client';

import React, { useState, FormEvent, useEffect, Suspense, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
// Import necessary icons
import { KeyIcon, LockClosedIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// Import the server action
import { performPasswordReset } from '@/lib/actions/authActions';

// Wrap the main component logic in a separate component to use Suspense
function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPending, startTransition] = useTransition(); // Use useTransition
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing password reset token. Please request a new link.");
            // Optionally redirect after a delay if token is missing
            // setTimeout(() => router.push('/forgot-password'), 3000);
        }
    }, [token, router]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Basic client-side validation
        if (!token) {
            setError("Invalid or missing password reset token.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const formData = new FormData(event.currentTarget);
        // Ensure the token from URL is included if not already in a hidden field
        if (!formData.has('token') && token) {
            formData.set('token', token);
        }

        startTransition(async () => {
            const response = await performPasswordReset(formData);

            if (response.success) {
                setSuccessMessage(response.message);
                setPassword(''); // Clear fields on success
                setConfirmPassword('');
                // Redirect to login after a short delay
                setTimeout(() => router.push('/login'), 3000);
            } else {
                setError(response.message || "An unexpected error occurred.");
            }
        });
    };

    return (
        // Use a similar background and layout
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-8 font-poppins">
            <div className="w-full max-w-md">
                {/* Gradient border effect */}
                <div className="rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 p-1 shadow-2xl">
                    {/* Inner white card */}
                    <div className="rounded-[22px] bg-white p-8 sm:p-10">
                        <h1 className="pb-2 text-center text-3xl font-bold text-gray-800">
                            Reset Password
                        </h1>
                        <p className="pb-6 text-center text-sm text-gray-500">
                            Enter your new password below.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Success Message */}
                            {successMessage && (
                                <div className="rounded border border-green-300 bg-green-50 p-3 text-center text-sm font-medium text-green-700 flex items-center gap-2" role="alert">
                                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0"/>
                                    {successMessage}
                                    <Link href="/login" className="font-bold underline ml-auto">Login Now</Link>
                                </div>
                            )}
                            {/* Error Message */}
                            {error && (
                                <div className="rounded border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700 flex items-center gap-2" role="alert">
                                     <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0"/>
                                    {error}
                                </div>
                            )}

                            {/* Hidden Token Field (Good practice) */}
                            <input type="hidden" name="token" value={token || ''} />

                            {/* New Password Input */}
                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-600">New Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        id="password" name="password" type="password" placeholder="Enter new password (min. 8 chars)" required
                                        disabled={isPending || !!successMessage || !token} // Disable if loading, success, or no token
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pl-10 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-600">Confirm New Password</label>
                                <div className="relative">
                                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm new password" required
                                        disabled={isPending || !!successMessage || !token} // Disable if loading, success, or no token
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pl-10 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                                        minLength={8}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending || !!successMessage || !token} // Disable if loading, success, or no token
                                className="mt-6 w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition duration-300 ease-in-out hover:from-sky-600 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
                                {isPending ? 'RESETTING...' : 'Reset Password'}
                            </button>
                        </form>

                        {/* Back to Login Link (Conditional) */}
                        {!successMessage && (
                            <div className="mt-6 text-center text-sm">
                                <Link href="/login" className="inline-flex items-center gap-1 font-medium text-sky-600 hover:text-sky-700 hover:underline">
                                    <ArrowLeftIcon className="h-4 w-4"/>
                                    Back to Login
                                </Link>
                            </div>
                        )}

                    </div> {/* End Inner Card */}
                </div> {/* End Gradient Border */}
            </div> {/* End Form Container */}
        </div> // End Main Container
    );
}

// Export the page component wrapped in Suspense
export default function ResetPasswordPage() {
    // You might want a more informative fallback for a better user experience
    const fallbackContent = (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-8 font-poppins">
             <div className="text-gray-600">Loading reset page...</div>
        </div>
    );

    return (
        <Suspense fallback={fallbackContent}>
            <ResetPasswordForm />
        </Suspense>
    );
}
// This is the CORRECT code for: src/app/(auth)/forgot-password/page.tsx

'use client';

import React, { useState, FormEvent, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EnvelopeIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
// Import the server action
import { requestPasswordReset } from '@/lib/actions/authActions';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const response = await requestPasswordReset(formData);

            if (response.success) {
                setSuccessMessage(response.message);
                setEmail(''); // Clear email field on success
            } else {
                setError(response.message || "An unexpected error occurred.");
            }
        });
    };

    return (
        // Use a similar background and layout as the login page
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-8 font-poppins">

            <div className="w-full max-w-md">
                 {/* Gradient border effect */}
                 <div className="rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 p-1 shadow-2xl">
                     {/* Inner white card */}
                    <div className="rounded-[22px] bg-white p-8 sm:p-10">

                        {/* *** THIS IS THE CORRECT HEADING FOR FORGOT-PASSWORD *** */}
                        <h1 className="pb-2 text-center text-3xl font-bold text-gray-800">
                            Forgot Password?
                        </h1>
                        <p className="pb-6 text-center text-sm text-gray-500">
                            Enter your email to receive reset instructions.
                        </p>
                        {/* *** END CORRECT HEADING *** */}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Success Message */}
                            {successMessage && (
                                <div className="rounded border border-green-300 bg-green-50 p-3 text-center text-sm font-medium text-green-700 flex items-center gap-2" role="alert">
                                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0"/>
                                    {successMessage}
                                </div>
                            )}
                            {/* Error Message */}
                            {error && (
                                <div className="rounded border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700 flex items-center gap-2" role="alert">
                                     <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0"/>
                                    {error}
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-600">Email Address</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </span>
                                    <input
                                        id="email" name="email" type="email" placeholder="you@example.com" required
                                        disabled={isPending || !!successMessage}
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pl-10 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending || !!successMessage}
                                className="mt-6 w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition duration-300 ease-in-out hover:from-sky-600 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
                                {isPending ? 'SENDING...' : 'Send Reset Instructions'}
                            </button>
                        </form>

                        {/* Back to Login Link */}
                       <div className="mt-6 text-center text-sm">
                            <Link href="/login" className="inline-flex items-center gap-1 font-medium text-sky-600 hover:text-sky-700 hover:underline">
                                <ArrowLeftIcon className="h-4 w-4"/>
                                Back to Login
                            </Link>
                       </div>

                    </div> {/* End Inner Card */}
                </div> {/* End Gradient Border */}
            </div> {/* End Form Container */}

        </div> // End Main Container
    );
}
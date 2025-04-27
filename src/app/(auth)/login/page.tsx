'use client';
import React, { useState, FormEvent } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Ensure next/image is imported

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Handler for credential-based form submission (remains the same)
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // ... (submission logic remains the same)
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                setIsLoading(false);
                setError("Invalid email or password. Please try again.");
                console.error("SignIn Error:", result.error);
            } else if (result?.ok) {
                const session = await getSession();
                const userRole = (session?.user as any)?.role;
                console.log("Login successful, Role:", userRole);
                router.push(userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard');
            } else {
                setIsLoading(false);
                setError("Login failed due to an unknown error. Please try again.");
                console.error("SignIn Unknown State:", result);
            }
        } catch (err) {
            setIsLoading(false);
            setError("An unexpected error occurred. Please check your connection and try again.");
            console.error("Login Catch Error:", err);
        }
    };

    // Placeholder handler for Google Sign-In button (remains the same)
    const handleGoogleSignIn = () => {
       alert("Google Sign-In is not configured yet.");
    }

    return (
        // Main container: Apply gradient background
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-8 font-poppins">

            {/* Wrapper for the three-column layout on larger screens */}
            <div className="flex w-full max-w-6xl items-center justify-center lg:justify-between">

                 {/* Left Column (SPC Logo): Hidden on screens smaller than 'lg' */}
                 <div className="hidden lg:flex lg:w-1/4 items-center justify-center p-4">
                     <Image
                        src="/spc-logo.png"
                        alt="San Pedro College Logo"
                        width={250}
                        height={300}
                        className="object-contain"
                    />
                 </div>

                 {/* Center Column (Login Form Card) */}
                 <div className="w-full max-w-md lg:w-1/2 lg:max-w-md lg:px-8 flex justify-center">
                     {/* Container for the card */}
                     <div className="w-full">
                         {/* Gradient border effect - Using softer blues */}
                         <div className="rounded-3xl bg-gradient-to-r from-sky-400 to-blue-500 p-1 shadow-2xl"> {/* Changed gradient, increased shadow */}
                             {/* Inner white card - Kept white for contrast */}
                            <div className="rounded-[22px] bg-white p-8 sm:p-10">

                                <h1 className="cursor-default pb-6 text-center text-4xl font-bold text-gray-800"> {/* Slightly lighter text */}
                                    Log in
                                </h1>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {error && (
                                        <div className="rounded border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-600">Email</label> {/* Lighter label */}
                                        <input
                                            id="email" name="email" type="email" placeholder="Email" required disabled={isLoading}
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" // Adjusted text color
                                        />
                                    </div>
                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-600">Password</label> {/* Lighter label */}
                                        <input
                                            id="password" name="password" type="password" placeholder="Password" required disabled={isLoading}
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" // Adjusted text color
                                        />
                                    </div>
                                    {/* Forget Password Link - Adjusted color */}
                                    <div className="text-right">
                                        <Link href="#" className="text-sm text-sky-600 hover:text-sky-700 hover:underline"> Forget your password? </Link>
                                    </div>
                                    {/* Submit Button - Matching softer gradient */}
                                    <button
                                        type="submit" disabled={isLoading}
                                        className="mt-6 w-full rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition duration-300 ease-in-out hover:from-sky-600 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"> {/* Changed gradient and hover */}
                                        {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                                    </button>
                                </form>
                                {/* Sign Up - Adjusted color */}
                               <div className="mt-5 text-center text-sm">
                                    <span className="text-gray-500">Don't have an account?{' '}</span> {/* Lighter text */}
                                    <Link href="#" className="font-semibold text-sky-600 hover:text-sky-700 hover:underline"> Sign Up </Link>
                               </div>
                                {/* Separator - Adjusted color */}
                               <div className="my-6 flex items-center">
                                    <hr className="flex-grow border-t border-gray-300" /> {/* Slightly darker line */}
                                    <span className="px-2 text-xs font-medium text-gray-500 uppercase">OR CONTINUE WITH</span> {/* Darker text */}
                                    <hr className="flex-grow border-t border-gray-300" />
                               </div>
                                {/* Google Button - Kept neutral */}
                               <div className="flex justify-center">
                                    <button
                                        onClick={handleGoogleSignIn} disabled={isLoading} title="Sign in with Google"
                                        className="m-1 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 disabled:opacity-60">
                                        <Image src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/" alt="Google" width={22} height={22} />
                                    </button>
                               </div>
                                {/* Terms - Adjusted color and link color */}
                                <div className="mt-6 text-center text-xs text-gray-500"> {/* Lighter text */}
                                    <p> By signing in, you agree to our{' '} <Link className="font-medium text-sky-600 hover:underline" href="#">Terms</Link> {' '}and{' '} <Link className="font-medium text-sky-600 hover:underline" href="#">Privacy Policy</Link>. </p>
                                </div>
                            </div> {/* End Inner Card */}
                        </div> {/* End Gradient Border */}
                    </div> {/* End Form Container */}
                 </div> {/* End Center Column */}

                 {/* Right Column (SMLS Logo): Hidden on screens smaller than 'lg' */}
                 <div className="hidden lg:flex lg:w-1/4 items-center justify-center p-4 relative">
                     {/* ... optional background ... */}
                     <div className="relative z-10">
                        <Image
                            src="/smls-logo.png"
                            alt="School of Medical Laboratory Science Logo"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                     </div>
                 </div>

             </div> {/* End Three-column Wrapper */}

        </div> // End Main Container
    );
}
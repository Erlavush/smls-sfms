// src/components/ui/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        // Changed background to a light sky blue, adjusted border and text colors
        <footer className="bg-sky-50 border-t border-sky-100 mt-auto backdrop-blur-sm"> {/* Added backdrop-blur for a subtle effect if needed */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5"> {/* Slightly increased padding */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-sky-700"> {/* Adjusted text color */}
                    {/* Left Side */}
                    <p>
                        © {currentYear} San Pedro College - SMLS. All rights reserved.
                    </p>

                    {/* Right Side (Optional Links) */}
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                        <Link href="#" className="text-sky-600 hover:text-sky-800 hover:underline transition-colors duration-200"> {/* Adjusted link colors */}
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sky-600 hover:text-sky-800 hover:underline transition-colors duration-200"> {/* Adjusted link colors */}
                            Terms of Service
                        </Link>
                        {/* Add more links if needed */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
// src/components/ui/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-spc-blue-darker border-t border-spc-blue-light/20 mt-auto"> {/* UPDATED CLASSES */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white"> {/* UPDATED CLASSES */}
                    {/* Left Side */}
                    <p>
                        © {currentYear} San Pedro College - SMLS. All rights reserved.
                    </p>

                    {/* Right Side (Optional Links) */}
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                        <Link
                            href="#"
                            className="text-white hover:text-spc-blue-DEFAULT hover:underline transition-colors duration-200"
                            > {/* UPDATED CLASSES */}
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="text-white hover:text-spc-blue-DEFAULT hover:underline transition-colors duration-200"> {/* UPDATED CLASSES */}
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
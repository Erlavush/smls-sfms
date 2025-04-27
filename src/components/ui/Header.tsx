// src/components/ui/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import {
    ArrowLeftStartOnRectangleIcon,
    UserCircleIcon,
    HomeIcon,
    DocumentTextIcon,
    CheckBadgeIcon,
    UsersIcon,
    TableCellsIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const userRole = (user as any)?.role;

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    // Define links based on role
    const facultyLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
        { href: '/profile', label: 'My Profile', icon: UserCircleIcon },
        { href: '/documents', label: 'My Documents', icon: DocumentTextIcon },
    ];

    const adminLinks = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
        { href: '/admin/approvals', label: 'Approvals', icon: CheckBadgeIcon },
        // Add future admin links here
    ];

    const navLinks = userRole === 'ADMIN' ? adminLinks : facultyLinks;

    if (status === 'loading' || status === 'unauthenticated') {
        return null;
    }

    const userName = user?.name ?? user?.email ?? 'User';
    const userInitials = userName?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';

    return (
        // Applied gradient background, removed border, adjusted shadow
        <header className="bg-gradient-to-r from-[#003153] to-[#004a7c] text-white shadow-lg sticky top-0 z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Side: Logo and Title */}
                    <div className="flex items-center">
                        <Link href={userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} className="flex-shrink-0 flex items-center gap-3">
                            {/* SMLS logo - ensure it looks okay on dark bg or add padding/bg if needed */}
                            <Image
                                src="/smls-logo.png"
                                alt="SMLS Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto" // Might need bg-white p-0.5 rounded-full if logo blends in
                            />
                            {/* Title text now white */}
                            <span className="font-semibold text-xl text-white hidden sm:inline">
                                SMLS-SFMS
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                // Adjusted link styling for dark background
                                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/20 hover:text-white transition-colors duration-150"
                            >
                                {/* Icon color adjusted */}
                                <link.icon className="h-4 w-4 text-gray-300" />
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: User Info & Logout */}
                    <div className="flex items-center">
                        <div className="ml-4 flex items-center md:ml-6 gap-3">

                            {/* User Info with Initials/Icon */}
                            <div className="flex items-center gap-2 cursor-default" title={userName}>
                                {/* Initials circle styling adjusted for dark bg */}
                                <span className="relative inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-sky-200 text-xs font-semibold ring-1 ring-white/30">
                                    {userInitials}
                                </span>
                                {/* Name text adjusted */}
                                <span className="text-sm font-medium text-gray-100 hidden lg:inline">
                                    {userName}
                                </span>
                            </div>

                            {/* Logout Button - Styling adjusted for dark bg */}
                            <button
                                onClick={handleSignOut}
                                type="button"
                                className="relative flex-shrink-0 rounded-md p-1.5 text-gray-300 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003153] transition-colors duration-150"
                                title="Sign Out"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Sign Out</span>
                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
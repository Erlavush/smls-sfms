// src/components/ui/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
    BellIcon,
} from '@heroicons/react/24/outline';
// Import the server action
import { getMyNotifications } from '../../lib/actions/notificationActions';
// *** Import the NotificationPanel component ***
import NotificationPanel from './NotificationPanel'; // Adjust path if needed

export default function Header() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const userRole = (user as any)?.role;

    // State for Notifications
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState<boolean>(true);
    const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);

    // Fetch Notifications Count
    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoadingNotifications(true);
            getMyNotifications()
                .then(response => {
                    if (response.success && response.unreadCount !== undefined) {
                        setUnreadCount(response.unreadCount);
                    } else {
                        console.error("Failed to fetch notification count:", response.error);
                        setUnreadCount(0);
                    }
                })
                .catch(error => {
                    console.error("Error calling getMyNotifications:", error);
                    setUnreadCount(0);
                })
                .finally(() => {
                    setIsLoadingNotifications(false);
                });
        } else {
            setUnreadCount(0);
            setIsLoadingNotifications(false);
        }
    }, [status]);

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
        { href: '/admin/faculty', label: 'Faculty', icon: UsersIcon },
        { href: '/admin/matrix', label: 'Matrix', icon: TableCellsIcon },
        { href: '/admin/specializations', label: 'Specializations', icon: UsersIcon },
    ];
    const navLinks = userRole === 'ADMIN' ? adminLinks : facultyLinks;

    if (status === 'loading') { return null; }
    if (status === 'unauthenticated') { return null; }

    const userName = user?.name ?? user?.email ?? 'User';
    const userInitials = userName?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';

    // Toggle Notification Panel
    const togglePanel = () => {
        setShowNotificationPanel(prev => !prev);
    };

    // Function to close the panel (passed to the panel component)
    const closePanel = () => {
        setShowNotificationPanel(false);
    };

    // Function to update the count (passed to the panel component)
    const updateCount = (newCount: number) => {
        setUnreadCount(newCount);
    }

    return (
        <header className="bg-gradient-to-r from-[#003153] to-[#004a7c] text-white shadow-lg sticky top-0 z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Side: Logo and Title */}
                    {/* ... (remains the same) ... */}
                     <div className="flex items-center">
                        <Link href={userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} className="flex-shrink-0 flex items-center gap-3">
                            <Image src="/smls-logo.png" alt="SMLS Logo" width={40} height={40} className="h-10 w-auto" />
                            <span className="font-semibold text-xl text-white hidden sm:inline"> SMLS-SFMS </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    {/* ... (remains the same) ... */}
                    <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/20 hover:text-white transition-colors duration-150" >
                                <link.icon className="h-4 w-4 text-gray-300" /> {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: User Info, Notifications & Logout */}
                    <div className="flex items-center">
                        <div className="ml-4 flex items-center md:ml-6 gap-3">

                            {/* Notification Bell */}
                            <div className="relative">
                                <button
                                    onClick={togglePanel}
                                    type="button"
                                    className="relative flex-shrink-0 rounded-full p-1.5 text-gray-300 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003153] transition-colors duration-150"
                                    title="Notifications"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-5 w-5" aria-hidden="true" />
                                    {!isLoadingNotifications && unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-white">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* *** Render NotificationPanel instead of Placeholder *** */}
                                {showNotificationPanel && (
                                    <NotificationPanel
                                        onClose={closePanel}
                                        onUpdateCount={updateCount}
                                    />
                                )}
                                {/* *** End NotificationPanel *** */}
                            </div>

                            {/* User Info with Initials/Icon */}
                            {/* ... (remains the same) ... */}
                            <div className="flex items-center gap-2 cursor-default" title={userName}>
                                <span className="relative inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-sky-200 text-xs font-semibold ring-1 ring-white/30"> {userInitials} </span>
                                <span className="text-sm font-medium text-gray-100 hidden lg:inline"> {userName} </span>
                            </div>

                            {/* Logout Button */}
                            {/* ... (remains the same) ... */}
                             <button onClick={handleSignOut} type="button" className="relative flex-shrink-0 rounded-md p-1.5 text-gray-300 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#003153] transition-colors duration-150" title="Sign Out" > <span className="absolute -inset-1.5" /> <span className="sr-only">Sign Out</span> <ArrowLeftStartOnRectangleIcon className="h-5 w-5" aria-hidden="true" /> </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
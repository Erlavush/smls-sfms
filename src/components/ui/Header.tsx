// src/components/ui/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    BellIcon,
    BookOpenIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import NotificationPanel from './NotificationPanel';
import { getMyNotifications } from '../../lib/actions/notificationActions';

interface NavLinkItem {
    href: string;
    label: string;
    icon: React.ElementType;
    tooltip: string;
}

interface NavLinkWithTooltipProps {
    link: NavLinkItem;
    onClick?: () => void;
    isMobile?: boolean;
}

const NavLinkWithTooltip: React.FC<NavLinkWithTooltipProps> = ({ link, onClick, isMobile = false }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    let tooltipTimeoutId: NodeJS.Timeout | null = null;
    const TOOLTIP_DELAY = 600;

    const handleMouseEnter = () => {
        if (isMobile) return;
        tooltipTimeoutId = setTimeout(() => {
            setShowTooltip(true);
        }, TOOLTIP_DELAY);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        if (tooltipTimeoutId) {
            clearTimeout(tooltipTimeoutId);
            tooltipTimeoutId = null;
        }
        setShowTooltip(false);
    };

    useEffect(() => {
        return () => {
            if (tooltipTimeoutId) {
                clearTimeout(tooltipTimeoutId);
            }
        };
    }, [tooltipTimeoutId]);

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={link.href}
                onClick={onClick}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 font-medium 
                            ${isMobile ? 'text-base text-white hover:bg-spc-blue-light/70'
                                       : 'text-sm text-sky-100 hover:bg-spc-blue-darker/50 hover:text-white'} 
                            transition-all duration-200 transform hover:scale-105`}
            >
                <link.icon className={`h-${isMobile ? '5' : '4'} w-${isMobile ? '5' : '4'} ${isMobile ? 'text-sky-200' : 'text-sky-300'}`} />
                {link.label}
            </Link>
            
            {!isMobile && showTooltip && (
                <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50
                               px-2.5 py-1.5 bg-spc-blue-darker text-white text-xs rounded-md shadow-xl 
                               pointer-events-none transition-opacity duration-150 ease-in-out"
                    style={{ opacity: showTooltip ? 1 : 0, minWidth: 'max-content' }}
                >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                                  border-x-4 border-x-transparent 
                                  border-b-4 border-b-spc-blue-darker"></div>
                    {link.tooltip}
                </div>
            )}
        </div>
    );
};

export default function Header() {
    const { data: session, status } = useSession();
    const user = session?.user;
    const userRole = (user as any)?.role;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState<boolean>(true);
    const [showNotificationPanel, setShowNotificationPanel] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    const notificationButtonRef = useRef<HTMLButtonElement>(null);
    const notificationPanelRef = useRef<HTMLDivElement>(null);
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
    const mobileMenuPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (status === 'authenticated') {
            setIsLoadingNotifications(true);
            getMyNotifications()
                .then(r => setUnreadCount(r.success && r.unreadCount !== undefined ? r.unreadCount : 0))
                .catch(() => setUnreadCount(0))
                .finally(() => setIsLoadingNotifications(false));
        } else {
            setUnreadCount(0);
            setIsLoadingNotifications(false);
        }
    }, [status]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target as Node) &&
                notificationButtonRef.current && !notificationButtonRef.current.contains(event.target as Node)) {
                setShowNotificationPanel(false);
            }
            if (mobileMenuPanelRef.current && !mobileMenuPanelRef.current.contains(event.target as Node) &&
                mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => await signOut({ callbackUrl: '/login' });

    const facultyLinks: NavLinkItem[] = [
        { href: '/dashboard', label: 'Dashboard', icon: HomeIcon, tooltip: "View your main dashboard" },
        { href: '/profile', label: 'My Profile', icon: UserCircleIcon, tooltip: "Manage your profile and CV" },
        { href: '/documents', label: 'My Documents', icon: DocumentTextIcon, tooltip: "Access your uploaded documents" },
    ];
    const adminLinks: NavLinkItem[] = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon, tooltip: "Admin overview and stats" },
        { href: '/admin/approvals', label: 'Approvals', icon: CheckBadgeIcon, tooltip: "Manage pending submissions" },
        { href: '/admin/faculty', label: 'Faculty', icon: UsersIcon, tooltip: "View and manage faculty users" },
        { href: '/admin/matrix', label: 'Matrix', icon: TableCellsIcon, tooltip: "View faculty specialization matrix" },
        { href: '/admin/specializations', label: 'Specializations', icon: UsersIcon, tooltip: "Manage system specializations" },
        { href: '/admin/courses', label: 'Courses', icon: BookOpenIcon, tooltip: "Manage academic courses" },
    ];
    const navLinks = userRole === 'ADMIN' ? adminLinks : facultyLinks;

    if (status === 'loading') return null;
    if (status === 'unauthenticated') return null;

    const userName = user?.name ?? user?.email ?? 'User';
    const userInitials = userName?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?';

    const toggleNotificationPanel = () => setShowNotificationPanel(p => !p);
    const closeNotificationPanel = () => setShowNotificationPanel(false);
    const updateNotificationCount = (newCount: number) => setUnreadCount(newCount);
    const toggleMobileMenu = () => setIsMobileMenuOpen(p => !p);

    return (
        <header className={`text-white sticky top-0 z-50 transition-colors duration-300 ease-in-out 
                           ${scrolled ? 'bg-spc-blue-main shadow-xl' // Solid color when scrolled
                                     : 'bg-spc-blue-light shadow-md'}`}> {/* Lighter solid color or your gradient when not scrolled */}
                                     {/* Option: Use gradient when not scrolled: 'bg-gradient-to-r from-spc-blue-main to-spc-blue-light shadow-md' */}
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href={userRole === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}
                            className="flex-shrink-0 flex items-center gap-2.5 group"
                        >
                            <div className="p-0.5 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110">
                                <Image src="/smls-logo.png" alt="SMLS Logo" width={36} height={36} className="h-9 w-9" />
                            </div>
                            <span className="font-semibold text-lg text-white hidden sm:inline group-hover:text-sky-100 transition-colors duration-300">
                                SMLS-SFMS
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-1.5">
                        {navLinks.map((linkItem) => (
                            <NavLinkWithTooltip key={linkItem.href} link={linkItem} />
                        ))}
                    </div>

                    <div className="flex items-center">
                        <div className="ml-3 flex items-center md:ml-4 gap-2.5">
                            <div className="relative">
                                <button
                                    ref={notificationButtonRef}
                                    onClick={toggleNotificationPanel}
                                    type="button"
                                    className="relative flex-shrink-0 rounded-full p-1.5 text-sky-100 hover:bg-spc-blue-darker/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spc-blue-main transition-all duration-200 transform hover:scale-110"
                                    title="Notifications"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-5 w-5" aria-hidden="true" />
                                    {!isLoadingNotifications && unreadCount > 0 && (
                                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-1 ring-white animate-pulse">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>
                                {showNotificationPanel && (
                                    <div ref={notificationPanelRef} className="absolute right-0 mt-2.5 z-50 animate-fade-in">
                                        <NotificationPanel
                                            onClose={closeNotificationPanel}
                                            onUpdateCount={updateNotificationCount}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="hidden md:flex items-center gap-2 cursor-default group" title={userName}>
                                <span className="relative inline-flex items-center justify-center h-8 w-8 rounded-full bg-spc-blue-darker/30 text-sky-200 text-xs font-semibold ring-1 ring-white/20 group-hover:ring-white/50 group-hover:bg-spc-blue-darker/60 transition-all duration-200">
                                    {userInitials}
                                </span>
                                <span className="text-sm font-medium text-sky-100 hidden lg:inline group-hover:text-white transition-colors duration-200">
                                    {userName}
                                </span>
                            </div>

                            {/* Corrected Logout Button - visible on md+ */}
                            <button
                                onClick={handleSignOut}
                                type="button"
                                className="hidden md:flex flex-shrink-0 items-center justify-center rounded-md p-1.5 text-sky-100 hover:bg-spc-blue-darker/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spc-blue-main transition-all duration-200 transform hover:scale-110"
                                title="Sign Out"
                            >
                                <span className="sr-only">Sign Out</span>
                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                            </button>

                            <div className="md:hidden">
                                <button
                                    ref={mobileMenuButtonRef}
                                    onClick={toggleMobileMenu}
                                    type="button"
                                    className="relative inline-flex items-center justify-center rounded-md p-1.5 text-sky-100 hover:bg-spc-blue-darker/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                                    aria-controls="mobile-menu"
                                    aria-expanded={isMobileMenuOpen}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMobileMenuOpen ? (
                                        <XMarkIcon className="block h-6 w-6 transition-transform duration-300 ease-in-out transform group-hover:rotate-90" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                ref={mobileMenuPanelRef}
                className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}
                id="mobile-menu"
            >
                <div className="space-y-1 px-2 pb-3 pt-2 bg-spc-blue-darker/80 backdrop-blur-sm shadow-inner rounded-b-md">
                    {navLinks.map((linkItem, index) => (
                        <div
                            key={linkItem.href}
                            style={{
                                transition: `opacity 300ms ease-out ${index * 70 + (isMobileMenuOpen ? 100 : 0)}ms, transform 300ms ease-out ${index * 70 + (isMobileMenuOpen ? 100 : 0)}ms`,
                                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                                opacity: isMobileMenuOpen ? 1 : 0,
                            }}
                        >
                            <NavLinkWithTooltip
                                link={linkItem}
                                isMobile={true}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        </div>
                    ))}
                     <div
                        style={{
                            transition: `opacity 300ms ease-out ${navLinks.length * 70 + (isMobileMenuOpen ? 100 : 0)}ms, transform 300ms ease-out ${navLinks.length * 70 + (isMobileMenuOpen ? 100 : 0)}ms`,
                            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                            opacity: isMobileMenuOpen ? 1 : 0,
                        }}
                    >
                        <button
                            onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-white hover:bg-spc-blue-light/70 transition-all duration-200"
                        >
                            <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-sky-200" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
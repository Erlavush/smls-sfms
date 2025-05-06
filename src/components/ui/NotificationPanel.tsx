// src/components/ui/NotificationPanel.tsx
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { BellAlertIcon, CheckCircleIcon, XCircleIcon, InboxIcon } from '@heroicons/react/24/outline';
import type { Notification } from '@/generated/prisma';
import {
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from '@/lib/actions/notificationActions';

interface NotificationPanelProps {
    onClose: () => void; // Function to close the panel
    onUpdateCount: (newCount: number) => void; // Function to update count in header
}

// Helper to format time difference (simple version)
function timeAgo(date: Date | string): string {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}


export default function NotificationPanel({ onClose, onUpdateCount }: NotificationPanelProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition(); // For mark as read actions

    const fetchNotifications = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getMyNotifications();
            if (response.success && response.notifications) {
                setNotifications(response.notifications);
                // Update count in header immediately after fetching
                onUpdateCount(response.unreadCount ?? 0);
            } else {
                setError(response.error || 'Failed to load notifications.');
                setNotifications([]);
                 onUpdateCount(0);
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            setNotifications([]);
             onUpdateCount(0);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch notifications when the panel mounts
    useEffect(() => {
        fetchNotifications();
        // Optional: Set up polling or WebSocket connection for real-time updates
        // return () => { /* cleanup polling/WebSocket */ };
    }, []); // Run only once on mount

    const handleMarkOneRead = (notificationId: string) => {
        startTransition(async () => {
            const result = await markNotificationAsRead(notificationId);
            if (result.success) {
                // Refresh the list to show updated read status and count
                fetchNotifications();
            } else {
                // Handle error (e.g., show a temporary message)
                console.error("Failed to mark notification as read:", result.error);
            }
        });
    };

    const handleMarkAllRead = () => {
        startTransition(async () => {
            const result = await markAllNotificationsAsRead();
            if (result.success) {
                // Refresh the list
                fetchNotifications();
            } else {
                // Handle error
                console.error("Failed to mark all notifications as read:", result.error);
            }
        });
    };

    return (
        // Panel container - positioned absolutely by the Header component
        <div className="absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 flex flex-col max-h-[70vh]">
            {/* Panel Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    <BellAlertIcon className="h-5 w-5 text-indigo-600" />
                    Notifications
                </h3>
                <button
                    onClick={handleMarkAllRead}
                    disabled={isPending || notifications.filter(n => !n.isRead).length === 0}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                    title="Mark all as read"
                >
                    Mark all read
                </button>
            </div>

            {/* Notification List Area (Scrollable) */}
            <div className="flex-grow overflow-y-auto">
                {isLoading ? (
                    <p className="p-4 text-sm text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="p-4 text-sm text-center text-red-600">{error}</p>
                ) : notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        <InboxIcon className="h-10 w-10 mx-auto text-gray-300 mb-2"/>
                        <p className="text-sm">No notifications yet.</p>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id}
                                className={`px-4 py-3 group transition-colors duration-150 ${
                                    notification.isRead ? 'bg-white' : 'bg-indigo-50 hover:bg-indigo-100'
                                }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        {/* Message Content */}
                                        <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                                            {notification.message}
                                        </p>
                                        {/* Time Ago */}
                                        <p className={`mt-1 text-xs ${notification.isRead ? 'text-gray-400' : 'text-indigo-500'}`}>
                                            {timeAgo(notification.createdAt)}
                                        </p>
                                        {/* Optional Link */}
                                        {notification.link && (
                                            <Link href={notification.link} onClick={onClose} className="mt-1 text-xs font-semibold text-blue-600 hover:underline block">
                                                View Details
                                            </Link>
                                        )}
                                    </div>
                                    {/* Mark as Read Button (only if unread) */}
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => handleMarkOneRead(notification.id)}
                                            disabled={isPending}
                                            className="mt-1 p-1 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Mark as read"
                                        >
                                            <CheckCircleIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Panel Footer (Optional) */}
            {/* <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-center flex-shrink-0">
                <Link href="/notifications" onClick={onClose} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                    View all notifications
                </Link>
            </div> */}
        </div>
    );
}
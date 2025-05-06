// src/lib/actions/notificationActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../app/api/auth/[...nextauth]/route';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import type { Notification } from '../../generated/prisma/client';

// --- Get Notifications for Current User ---
interface GetNotificationsResponse {
    success: boolean;
    notifications?: Notification[];
    unreadCount?: number; // Optionally return the count directly
    error?: string;
}

export async function getMyNotifications(): Promise<GetNotificationsResponse> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc', // Show newest first
            },
            take: 20, // Limit the number of notifications fetched initially
        });

        // Calculate unread count separately or from the fetched list
        const unreadCount = await prisma.notification.count({
            where: {
                userId: userId,
                isRead: false,
            },
        });

        return { success: true, notifications: notifications, unreadCount: unreadCount };

    } catch (error: any) {
        console.error("Error fetching notifications:", error);
        return { success: false, error: 'Failed to fetch notifications.' };
    }
}

// --- Mark a Single Notification as Read ---
interface MarkReadResponse {
    success: boolean;
    error?: string;
}

export async function markNotificationAsRead(notificationId: string): Promise<MarkReadResponse> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }
    if (!notificationId) {
        return { success: false, error: 'Notification ID is required.' };
    }

    try {
        // IMPORTANT: Update only if the notification belongs to the current user
        const result = await prisma.notification.updateMany({
            where: {
                id: notificationId,
                userId: userId, // Ensure user owns the notification
                isRead: false,   // Only update if it's currently unread
            },
            data: {
                isRead: true,
            },
        });

        if (result.count === 0) {
            // This could mean the notification didn't exist, wasn't owned by the user,
            // or was already read. We don't treat this as a hard error usually.
            console.log(`Notification ${notificationId} not updated (possibly already read or not found/owned).`);
        } else {
             console.log(`Marked notification ${notificationId} as read for user ${userId}.`);
             // Revalidate paths that might display the unread count or notification list
             // Revalidating the header path might be tricky, might need client-side update instead
             // revalidatePath('/'); // Example - adjust as needed
        }

        return { success: true };

    } catch (error: any) {
        console.error(`Error marking notification ${notificationId} as read:`, error);
        return { success: false, error: 'Failed to mark notification as read.' };
    }
}


// --- Mark All Notifications as Read ---
export async function markAllNotificationsAsRead(): Promise<MarkReadResponse> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    try {
        const result = await prisma.notification.updateMany({
            where: {
                userId: userId,
                isRead: false, // Only target unread notifications
            },
            data: {
                isRead: true,
            },
        });

        console.log(`Marked ${result.count} notifications as read for user ${userId}.`);
        // Revalidate paths if needed
        // revalidatePath('/'); // Example

        return { success: true };

    } catch (error: any) {
        console.error(`Error marking all notifications as read for user ${userId}:`, error);
        return { success: false, error: 'Failed to mark all notifications as read.' };
    }
}
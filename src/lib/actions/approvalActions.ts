// src/lib/actions/approvalActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { ItemType } from '@/types'; // Import ItemType
import { Role } from '@/generated/prisma'; // Import Role enum

// --- Helper: Get Prisma Model Delegate ---
// This helps avoid large switch statements by dynamically accessing the correct model
function getPrismaModel(tx: any, itemType: ItemType) {
    const modelMap: Record<ItemType, any> = {
        academicQualification: tx.academicQualification,
        professionalLicense: tx.professionalLicense,
        workExperience: tx.workExperience,
        professionalAffiliation: tx.professionalAffiliation,
        awardRecognition: tx.awardRecognition,
        professionalDevelopment: tx.professionalDevelopment,
        communityInvolvement: tx.communityInvolvement,
        publication: tx.publication,
        conferencePresentation: tx.conferencePresentation,
    };
    const model = modelMap[itemType];
    if (!model) {
        throw new Error(`Invalid item type provided: ${itemType}`);
    }
    return model;
}

// --- Action: Get Pending Submissions ---
export async function getPendingSubmissions() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== 'ADMIN') {
        return { success: false, error: 'Unauthorized', pendingItems: [] };
    }

    try {
        const itemTypes: ItemType[] = [
            'academicQualification', 'professionalLicense', 'workExperience',
            'professionalAffiliation', 'awardRecognition', 'professionalDevelopment',
            'communityInvolvement', 'publication', 'conferencePresentation'
        ];

        let allPendingItems: any[] = [];

        for (const itemType of itemTypes) {
            const modelKey = itemType; // Prisma client uses camelCase keys directly
            const model = (prisma as any)[modelKey]; // Access model dynamically

            if (model && typeof model.findMany === 'function') {
                const pending = await model.findMany({
                    where: { status: 'PENDING' },
                    include: {
                        user: { // Include user details
                            select: { id: true, name: true, email: true }
                        }
                    },
                    orderBy: { createdAt: 'asc' } // Oldest first
                });

                // Add itemType to each item for identification on the frontend
                allPendingItems = allPendingItems.concat(pending.map((item: any) => ({ ...item, itemType })));
            } else {
                console.warn(`Model or findMany not found for itemType: ${itemType}`);
            }
        }

        return { success: true, pendingItems: allPendingItems };

    } catch (error: any) {
        console.error("Error fetching pending submissions:", error);
        return { success: false, error: 'Failed to fetch pending items.', pendingItems: [] };
    }
}


// --- Action: Approve Submission ---
export async function approveSubmission(itemId: string, itemType: ItemType) {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== 'ADMIN') {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const model = getPrismaModel(tx, itemType);
            const updatedItem = await model.update({
                where: { id: itemId },
                data: {
                    status: 'APPROVED',
                    rejectionReason: null, // Clear rejection reason on approval
                },
                // Include userId to potentially revalidate faculty profile
                select: { userId: true }
            });
            return updatedItem;
        });

        revalidatePath('/admin/approvals');
        // Optionally revalidate specific faculty profile if needed later
        if (result?.userId) {
            revalidatePath(`/profile`); // Revalidate the general profile page for simplicity
            // Consider more specific revalidation if performance becomes an issue:
            // revalidatePath(`/admin/faculty/${result.userId}`);
        }


        console.log(`Approved ${itemType} with ID: ${itemId}`);
        return { success: true };

    } catch (error: any) {
        console.error(`Error approving ${itemType} (${itemId}):`, error);
        return { success: false, error: `Failed to approve item. ${error.message}` };
    }
}

// --- Action: Reject Submission ---
export async function rejectSubmission(itemId: string, itemType: ItemType, reason: string) {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== 'ADMIN') {
        return { success: false, error: 'Unauthorized' };
    }
    if (!reason || reason.trim() === '') {
        return { success: false, error: 'Rejection reason cannot be empty.' };
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const model = getPrismaModel(tx, itemType);
            const updatedItem = await model.update({
                where: { id: itemId },
                data: {
                    status: 'REJECTED',
                    rejectionReason: reason.trim(),
                },
                 // Include userId to potentially revalidate faculty profile
                 select: { userId: true }
            });
             return updatedItem;
        });

        revalidatePath('/admin/approvals');
        // Optionally revalidate specific faculty profile
        if (result?.userId) {
            revalidatePath(`/profile`); // Revalidate the general profile page
        }

        console.log(`Rejected ${itemType} with ID: ${itemId}`);
        return { success: true };

    } catch (error: any) {
        console.error(`Error rejecting ${itemType} (${itemId}):`, error);
        return { success: false, error: `Failed to reject item. ${error.message}` };
    }
}
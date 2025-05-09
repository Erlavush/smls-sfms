'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../app/api/auth/[...nextauth]/route';
import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import type { ItemType } from '../../types';
import { Role, ApprovalStatus, type Prisma } from '../../generated/prisma/client';

// Helper: Get Prisma Model Delegate
function getPrismaModel(tx: Prisma.TransactionClient, itemType: ItemType) {
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

// Helper to get item title/name for notification message
function getItemDisplayTitleForNotification(item: any, itemType: ItemType): string {
    // Use optional chaining and nullish coalescing for safety
    switch (itemType) {
        case 'academicQualification': return item?.degree ?? `Qualification`;
        case 'professionalLicense': return item?.examination ?? `License`;
        case 'workExperience': return item?.position ?? `Work Experience`;
        case 'professionalAffiliation': return item?.organization ?? `Affiliation`;
        case 'awardRecognition': return item?.awardName ?? `Award/Recognition`;
        case 'professionalDevelopment': return item?.title ?? `Development`;
        case 'communityInvolvement': return item?.engagementTitle ?? `Involvement`;
        case 'publication': return item?.researchTitle ?? `Publication`;
        case 'conferencePresentation': return item?.paperTitle ?? `Presentation`;
        default: return `Item (${itemType})`;
    }
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
            const modelKey = itemType;
            const model = (prisma as any)[modelKey];

            if (model && typeof model.findMany === 'function') {
                const pending = await model.findMany({
                    where: { status: 'PENDING' },
                    include: {
                        user: { select: { id: true, name: true, email: true } }
                    },
                    orderBy: { createdAt: 'asc' }
                });
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
    const adminName = session?.user?.name ?? session?.user?.email ?? 'Administrator';

    if (userRole !== 'ADMIN') {
        return { success: false, error: 'Unauthorized' };
    }

    try {
        let facultyUserId: string | null = null;

        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const model = getPrismaModel(tx, itemType);

            // Step 1: Update the item status
            const updatedItemMeta = await model.update({
                where: { id: itemId },
                data: {
                    status: ApprovalStatus.APPROVED,
                    rejectionReason: null,
                },
                // *** Select only the userId needed for revalidation/notification target ***
                select: {
                    userId: true,
                 }
            });

            if (!updatedItemMeta || !updatedItemMeta.userId) {
                // If update failed or didn't return userId, throw error to rollback
                throw new Error(`Failed to update item ${itemId} or retrieve userId.`);
            }
            facultyUserId = updatedItemMeta.userId;

            // Step 2: Fetch minimal data needed for the notification title *after* update
            // Select only the field most likely to contain the title/name
            let selectForTitle: any = { id: true }; // Always select id for safety
            switch (itemType) {
                case 'academicQualification': selectForTitle.degree = true; break;
                case 'professionalLicense': selectForTitle.examination = true; break;
                case 'workExperience': selectForTitle.position = true; break;
                case 'professionalAffiliation': selectForTitle.organization = true; break;
                case 'awardRecognition': selectForTitle.awardName = true; break;
                case 'professionalDevelopment': selectForTitle.title = true; break;
                case 'communityInvolvement': selectForTitle.engagementTitle = true; break;
                case 'publication': selectForTitle.researchTitle = true; break;
                case 'conferencePresentation': selectForTitle.paperTitle = true; break;
            }

            const itemDetailsForNotification = await model.findUnique({
                where: { id: itemId },
                select: selectForTitle,
            });

            const itemTitle = itemDetailsForNotification
                ? getItemDisplayTitleForNotification(itemDetailsForNotification, itemType)
                : `Item (${itemType})`; // Fallback title

            // Step 3: Create Notification for Faculty
            const message = `Your submission "${itemTitle}" has been approved by ${adminName}.`;
            console.log(`Creating approval notification for user ${facultyUserId}: "${message}"`);
            await tx.notification.create({
                data: {
                    userId: facultyUserId!, // facultyUserId is guaranteed to be non-null here
                    message: message,
                    link: '/profile'
                }
            });
        }); // End Transaction

        // Revalidate paths after successful transaction
        revalidatePath('/admin/approvals');
        if (facultyUserId) {
            revalidatePath(`/profile`);
        }

        console.log(`Approved ${itemType} with ID: ${itemId}`);
        return { success: true };

    } catch (error: any) {
        console.error(`Error approving ${itemType} (${itemId}):`, error);
        // Provide a more generic error message to the frontend
        return { success: false, error: `Failed to approve item. Please check server logs.` };
    }
}

// --- Action: Reject Submission ---
export async function rejectSubmission(itemId: string, itemType: ItemType, reason: string) {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const adminName = session?.user?.name ?? session?.user?.email ?? 'Administrator';

    if (userRole !== 'ADMIN') { return { success: false, error: 'Unauthorized' }; }
    if (!reason || reason.trim() === '') { return { success: false, error: 'Rejection reason cannot be empty.' }; }

    try {
        let facultyUserId: string | null = null;

        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const model = getPrismaModel(tx, itemType);

            // Step 1: Update the item status and reason
            const updatedItemMeta = await model.update({
                where: { id: itemId },
                data: {
                    status: ApprovalStatus.REJECTED,
                    rejectionReason: reason.trim(),
                },
                 // *** Select only the userId needed for revalidation/notification target ***
                 select: {
                    userId: true,
                 }
            });

            if (!updatedItemMeta || !updatedItemMeta.userId) {
                 throw new Error(`Failed to update item ${itemId} or retrieve userId.`);
            }
            facultyUserId = updatedItemMeta.userId;

            // Step 2: Fetch minimal data needed for the notification title *after* update
            let selectForTitle: any = { id: true };
             switch (itemType) {
                case 'academicQualification': selectForTitle.degree = true; break;
                case 'professionalLicense': selectForTitle.examination = true; break;
                case 'workExperience': selectForTitle.position = true; break;
                case 'professionalAffiliation': selectForTitle.organization = true; break;
                case 'awardRecognition': selectForTitle.awardName = true; break;
                case 'professionalDevelopment': selectForTitle.title = true; break;
                case 'communityInvolvement': selectForTitle.engagementTitle = true; break;
                case 'publication': selectForTitle.researchTitle = true; break;
                case 'conferencePresentation': selectForTitle.paperTitle = true; break;
            }
            const itemDetailsForNotification = await model.findUnique({
                where: { id: itemId },
                select: selectForTitle,
            });
            const itemTitle = itemDetailsForNotification
                ? getItemDisplayTitleForNotification(itemDetailsForNotification, itemType)
                : `Item (${itemType})`; // Fallback title


            // Step 3: Create Notification for Faculty
            const message = `Your submission "${itemTitle}" was rejected by ${adminName}. Reason: ${reason.trim()}`;
            console.log(`Creating rejection notification for user ${facultyUserId}: "${message}"`);
            await tx.notification.create({
                data: {
                    userId: facultyUserId!, // facultyUserId is guaranteed to be non-null here
                    message: message,
                    link: '/profile'
                }
            });
        }); // End Transaction

        // Revalidate paths after successful transaction
        revalidatePath('/admin/approvals');
        if (facultyUserId) {
            revalidatePath(`/profile`);
        }

        console.log(`Rejected ${itemType} with ID: ${itemId}`);
        return { success: true };

    } catch (error: any) {
        console.error(`Error rejecting ${itemType} (${itemId}):`, error);
        return { success: false, error: `Failed to reject item. Please check server logs.` };
    }
}
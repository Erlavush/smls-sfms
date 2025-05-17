// src/lib/userActions.ts
"use server";

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import prisma from './prisma';
import {
    Role,
    User as PrismaUser,
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation,
    ApprovalStatus, SocialMediaLink, Specialization 
} from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import type { UserProfilePageData, ProfileUser, CategoryKey } from '@/types';

// --- Helper Functions ---

async function ensureUploadDirExists(subDir: string, userId: string): Promise<string> {
    const userDirPath = path.join(process.cwd(), 'public', 'uploads', subDir, userId);
    try {
        await fs.mkdir(userDirPath, { recursive: true });
        return userDirPath;
    } catch (error) {
        console.error(`Error creating upload directory (${userDirPath}):`, error);
        throw new Error(`Could not create upload directory for ${subDir}.`);
    }
}

async function safeDeleteFile(filePath: string | null | undefined) {
    if (!filePath || !filePath.startsWith('/uploads/')) {
        return;
    }
    try {
        const localFilePath = path.join(process.cwd(), 'public', filePath);
        await fs.unlink(localFilePath);
        console.log(`Successfully deleted file: ${localFilePath}`);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.warn(`File not found during deletion attempt: ${filePath}`);
        } else {
            console.error(`Error deleting file ${filePath}:`, error.message);
        }
    }
}

async function uploadFile(file: File, userId: string, subDir: string): Promise<string> {
    try {
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File size exceeds limit (${(file.size / (1024*1024)).toFixed(2)}MB) for ${file.name}. Max is 5MB.`);
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error(`Invalid file type (${file.type}) for ${file.name}. Allowed: PDF, PNG, JPG.`);
        }

        const uploadDir = await ensureUploadDirExists(subDir, userId);
        const fileExtension = path.extname(file.name);
        const uniqueFilename = `${uuidv4()}${fileExtension}`;
        const localFilePath = path.join(uploadDir, uniqueFilename);
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(localFilePath, fileBuffer);
        const relativeUrl = `/uploads/${subDir}/${userId}/${uniqueFilename}`;
        console.log(`File uploaded successfully: ${relativeUrl}`);
        return relativeUrl;
    } catch (uploadError: any) {
        console.error(`Error uploading file (${file.name}) to subdir (${subDir}):`, uploadError);
        throw new Error(`Failed to upload file ${file.name}: ${uploadError.message}`);
    }
}

function parseJsonData<T>(jsonString: string | null, arrayName: string): T[] {
    if (!jsonString) return [];
    try {
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3}Z)?$/;
        const simpleDateRegex = /^\d{4}-\d{2}-\d{2}$/;

        const parsedWithDates = JSON.parse(jsonString, (key, value) => {
            if (typeof value === 'string') {
                if (isoDateRegex.test(value) || simpleDateRegex.test(value)) { 
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) return date; 
                }
            }
            return value;
        });
        if (!Array.isArray(parsedWithDates)) throw new Error(`${arrayName} data is not an array.`);
        return parsedWithDates;
    } catch (e: any) {
        console.error(`Error parsing ${arrayName} JSON:`, e.message, "String:", jsonString);
        throw new Error(`Invalid ${arrayName} data format. ${e.message}`);
    }
}

function areDatesEqual(d1: Date | string | null | undefined, d2: Date | string | null | undefined): boolean {
    if (d1 === null && d2 === null) return true;
    if (d1 === undefined && d2 === undefined) return true;
    if (!d1 || !d2) return false;
    try {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        if (isNaN(date1.getTime()) && isNaN(date2.getTime())) return true;
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return false;
        return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
    } catch (e) {
        return false; 
    }
}

function getItemDisplayTitle(item: any, sectionKey: string): string {
    const idSuffix = item?.id ? ` (ID: ${String(item.id).substring(0, 6)}...)` : '';
    switch (sectionKey) {
        case 'academicQualifications': return (item?.degree || 'Qualification') + idSuffix;
        case 'professionalLicenses': return (item?.examination || 'License') + idSuffix;
        case 'workExperiences': return (item?.position || 'Work Exp.') + idSuffix;
        case 'professionalAffiliations': return (item?.organization || 'Affiliation') + idSuffix;
        case 'awardsRecognitions': return (item?.awardName || 'Award') + idSuffix;
        case 'professionalDevelopments': return (item?.title || 'Development') + idSuffix;
        case 'communityInvolvements': return (item?.engagementTitle || 'Involvement') + idSuffix;
        case 'publications': return (item?.researchTitle || 'Publication') + idSuffix;
        case 'conferencePresentations': return (item?.paperTitle || 'Presentation') + idSuffix;
        default: return 'Item' + idSuffix;
    }
}

interface UpdateProfileResponse { success: boolean; error?: string; }

export async function updateMyProfile(formData: FormData): Promise<UpdateProfileResponse> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const userName = session?.user?.name ?? session?.user?.email ?? `User ${userId}`;

    if (!userId) { return { success: false, error: 'Not authenticated' }; }
    console.log(`\n--- Starting updateMyProfile for user: ${userId} (${userName}) ---`);

    const uploadDirs: Record<CategoryKey, string> = {
        academicQualifications: 'qualifications',
        professionalLicenses: 'licenses',
        workExperiences: 'workexp',
        professionalAffiliations: 'affiliations',
        awardsRecognitions: 'awards',
        professionalDevelopments: 'profdev',
        communityInvolvements: 'community',
        publications: 'publications',
        conferencePresentations: 'presentations',
    };
    const urlFieldNames: Record<CategoryKey, keyof any> = {
        academicQualifications: 'diplomaFileUrl',
        professionalLicenses: 'licenseFileUrl',
        workExperiences: 'proofUrl',
        professionalAffiliations: 'membershipProofUrl',
        awardsRecognitions: 'certificateUrl',
        professionalDevelopments: 'certificateFileUrl',
        communityInvolvements: 'proofUrl',
        publications: 'pdfUrl',
        conferencePresentations: 'proofUrl',
    };
    const requiredFieldsMap: Record<CategoryKey, string[]> = {
        academicQualifications: ['degree', 'institution', 'program', 'yearCompleted'],
        professionalLicenses: ['examination', 'licenseNumber', 'monthYear', 'expiration'],
        workExperiences: ['institution', 'position', 'inclusiveYears'],
        professionalAffiliations: ['organization', 'inclusiveYears'],
        awardsRecognitions: ['awardName', 'awardingBody', 'yearReceived'],
        professionalDevelopments: ['title', 'organizer', 'dateLocation'],
        communityInvolvements: ['engagementTitle', 'role', 'locationDate'],
        publications: ['researchTitle', 'journal', 'datePublished'],
        conferencePresentations: ['paperTitle', 'eventName', 'dateLocation'],
    };
    const dateFields: Record<CategoryKey, string[]> = {
        professionalLicenses: ['expiration'],
        publications: ['datePublished'],
        academicQualifications: [], workExperiences: [], professionalAffiliations: [],
        awardsRecognitions: [], professionalDevelopments: [], communityInvolvements: [],
        conferencePresentations: [],
    };

    let filesToDeleteOnError: string[] = [];
    let filesToDeleteOnSuccess: string[] = [];
    let newProfileImageUrl: string | undefined;
    let incomingCvCategoryData: Record<string, any[]> = {}; 

    try {
        const profileImageFile = formData.get('user_profileImageFile') as File | null;
        if (profileImageFile) {
            newProfileImageUrl = await uploadFile(profileImageFile, userId, 'profile-images');
            filesToDeleteOnError.push(newProfileImageUrl); 
            const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { profileImageUrl: true } });
            if (currentUser?.profileImageUrl) filesToDeleteOnSuccess.push(currentUser.profileImageUrl); 
        }

        const cvCategoryKeys = Object.keys(uploadDirs) as CategoryKey[];
        for (const key of cvCategoryKeys) {
            const jsonKey = `${key}_json`;
            if (formData.has(jsonKey)) {
                incomingCvCategoryData[key] = parseJsonData<any>(formData.get(jsonKey) as string | null, key); 
            }
        }
    } catch (error: any) {
        console.error("Pre-transaction error:", error.message);
        await Promise.all(filesToDeleteOnError.map(safeDeleteFile)); 
        return { success: false, error: `Preparation error: ${error.message}` };
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            console.log("Starting database transaction...");
            if (newProfileImageUrl) {
                await tx.user.update({ where: { id: userId }, data: { profileImageUrl: newProfileImageUrl } });
            }
            const userDetailsJsonString = formData.get('user_details_json') as string | null;
            if (userDetailsJsonString) {
                const parsedUserDetails = JSON.parse(userDetailsJsonString);
                const userDetailsToUpdate: Partial<PrismaUser> = {};
                const allowedUserFields: (keyof PrismaUser)[] = ['name', 'dateOfBirth', 'civilStatus', 'nationality', 'contactNumber', 'address', 'employeeId', 'bio'];
                allowedUserFields.forEach(key => {
                    if (parsedUserDetails.hasOwnProperty(key)) {
                        if (key === 'dateOfBirth' && parsedUserDetails[key]) {
                            const dob = new Date(parsedUserDetails[key]);
                            (userDetailsToUpdate as any)[key] = isNaN(dob.getTime()) ? null : dob;
                        } else {
                            (userDetailsToUpdate as any)[key] = parsedUserDetails[key] === '' ? null : parsedUserDetails[key];
                        }
                    }
                });
                if (Object.keys(userDetailsToUpdate).length > 0) {
                    await tx.user.update({ where: { id: userId }, data: userDetailsToUpdate });
                }
            }
            const socialMediaLinksJsonString = formData.get('socialMediaLinks_json') as string | null;
            if (socialMediaLinksJsonString) {
                const incomingSocialLinks = JSON.parse(socialMediaLinksJsonString) as Array<Partial<SocialMediaLink> & { _isNew?: boolean; id?: string }>;
                const currentDbSocialLinks = await tx.socialMediaLink.findMany({ where: { userId: userId } });
                const currentDbLinkIds = new Set(currentDbSocialLinks.map(link => link.id));
                const incomingClientIds = new Set(incomingSocialLinks.filter(link => link.id && !link.id.startsWith('temp-')).map(link => link.id!));
                const linksToDeleteIds = Array.from(currentDbLinkIds).filter(id => !incomingClientIds.has(id));

                if (linksToDeleteIds.length > 0) {
                    await tx.socialMediaLink.deleteMany({ where: { id: { in: linksToDeleteIds }, userId: userId } });
                }
                for (const link of incomingSocialLinks) {
                    const { _isNew, id: clientId, userId: linkUserIdIgnored, createdAt, updatedAt, ...dataToSave } = link;
                    const linkPayload = { ...dataToSave, platform: dataToSave.platform || '', url: dataToSave.url || '', userId: userId };
                    if (!linkPayload.platform || !linkPayload.url) continue;
                    if (_isNew || (clientId && clientId.startsWith('temp-'))) {
                        await tx.socialMediaLink.create({ data: linkPayload as any });
                    } else if (clientId) {
                        await tx.socialMediaLink.update({ where: { id: clientId, userId: userId }, data: linkPayload as any });
                    }
                }
            }

            const adminUsers = await tx.user.findMany({ where: { role: Role.ADMIN }, select: { id: true } });
            const adminIds = adminUsers.map(admin => admin.id);
            const cvCategoryKeys = Object.keys(uploadDirs) as CategoryKey[];

            for (const sectionKey of cvCategoryKeys) {
                const incomingItemsForCategory = incomingCvCategoryData[sectionKey] as Array<any & { id: string; _isNew?: boolean; _selectedFile?: File | null; _isDeleted?: boolean }> | undefined;
                
                if (incomingItemsForCategory === undefined) {
                    // If no JSON data was sent for this category, it means the client made no changes (add, edit, or delete)
                    // to this category. Therefore, we skip processing it and leave the DB items for this category untouched.
                    console.log(`No data submitted for category: ${sectionKey}. DB items for this category will remain untouched.`);
                    continue;
                }
                console.log(`Processing category: ${sectionKey} with ${incomingItemsForCategory.length} incoming items.`);

                let modelNameForPrisma: string;
                switch (sectionKey) {
                    case 'academicQualifications': modelNameForPrisma = 'academicQualification'; break;
                    case 'professionalLicenses': modelNameForPrisma = 'professionalLicense'; break;
                    case 'workExperiences': modelNameForPrisma = 'workExperience'; break;
                    case 'professionalAffiliations': modelNameForPrisma = 'professionalAffiliation'; break;
                    case 'awardsRecognitions': modelNameForPrisma = 'awardRecognition'; break;
                    case 'professionalDevelopments': modelNameForPrisma = 'professionalDevelopment'; break;
                    case 'communityInvolvements': modelNameForPrisma = 'communityInvolvement'; break;
                    case 'publications': modelNameForPrisma = 'publication'; break;
                    case 'conferencePresentations': modelNameForPrisma = 'conferencePresentation'; break;
                    default:
                        console.warn(`[TX] Unknown sectionKey for Prisma model mapping: ${sectionKey}.`);
                        continue;
                }
                
                const prismaModelClient = (tx as any)[modelNameForPrisma];
                if (!prismaModelClient) {
                    console.warn(`[TX] Prisma model client not found for ${modelNameForPrisma}.`);
                    continue;
                }

                const urlFieldName = urlFieldNames[sectionKey] as string;
                const subDir = uploadDirs[sectionKey];
                const requiredFields = requiredFieldsMap[sectionKey] || [];
                const sectionDateFields = dateFields[sectionKey] || [];

                // Process incoming items: Create, Update, or Delete
                for (const incomingItem of incomingItemsForCategory) {
                    const fileKey = `${sectionKey}_file_${incomingItem.id}`; 
                    const file = formData.get(fileKey) as File | null;
                    let uploadedFileUrl: string | null | undefined = undefined;

                    if (file) {
                        console.log(`[${sectionKey}] File found for item ${incomingItem.id}, uploading...`);
                        const tempUploadedUrl = await uploadFile(file, userId, subDir);
                        filesToDeleteOnError.push(tempUploadedUrl);
                        uploadedFileUrl = tempUploadedUrl;
                    }

                    // Destructure, including the _isDeleted flag
                    const { 
                        _isNew, 
                        id: itemIdFromClient, 
                        _selectedFile, 
                        userId: ignoredUserId, 
                        createdAt: ignoredCreatedAt, 
                        updatedAt: ignoredUpdatedAt, 
                        status: ignoredStatus, 
                        rejectionReason: ignoredRejectionReason,
                        _isDeleted, // Capture the delete flag
                        ...dataToProcess 
                    } = incomingItem;
                    
                    // Handle explicit deletions first
                    if (_isDeleted && itemIdFromClient && !itemIdFromClient.startsWith('temp-')) {
                        console.log(`[${sectionKey}] Deleting item ${itemIdFromClient} as per client request.`);
                        const itemToDelete = await prismaModelClient.findUnique({ where: { id: itemIdFromClient }});
                        if (itemToDelete && urlFieldName && (itemToDelete as any)[urlFieldName]) {
                            filesToDeleteOnSuccess.push((itemToDelete as any)[urlFieldName]);
                        }
                        await prismaModelClient.delete({ where: { id: itemIdFromClient } });
                        continue; // Move to next incoming item after deletion
                    }
                    
                    // If it's marked for deletion but is a new item not yet in DB (e.g., added and then removed before save), just skip it.
                    if (_isDeleted && (_isNew || (itemIdFromClient && itemIdFromClient.startsWith('temp-')))) {
                        console.log(`[${sectionKey}] Skipping deletion of unsaved new item ${itemIdFromClient}.`);
                        if (uploadedFileUrl) { // If a file was uploaded for this transient item, mark it for deletion
                            filesToDeleteOnError = filesToDeleteOnError.filter(f => f !== uploadedFileUrl); // Remove from error list
                            filesToDeleteOnSuccess.push(uploadedFileUrl); // Add to success list for cleanup
                        }
                        continue;
                    }


                    // Prepare data for Prisma (Create or Update)
                    const finalDataForPrisma: any = { ...dataToProcess, userId: userId }; 
                    Object.keys(finalDataForPrisma).forEach(key => { 
                        if (['yearCompleted', 'yearReceived'].includes(key) && typeof finalDataForPrisma[key] === 'string') { const num = parseInt(finalDataForPrisma[key], 10); finalDataForPrisma[key] = isNaN(num) ? null : num; }
                        if (typeof finalDataForPrisma[key] === 'string' && finalDataForPrisma[key].trim() === '' && !requiredFields.includes(key)) { finalDataForPrisma[key] = null; }
                        if (sectionDateFields.includes(key)) { if (finalDataForPrisma[key] && !(finalDataForPrisma[key] instanceof Date)) { try { const d = new Date(finalDataForPrisma[key]); finalDataForPrisma[key] = !isNaN(d.getTime()) ? d : null; } catch { finalDataForPrisma[key] = null; } } else if (finalDataForPrisma[key] instanceof Date && isNaN(finalDataForPrisma[key].getTime())) { finalDataForPrisma[key] = null; } }
                    });

                    let notifyAdmin = false;
                    // Check if item exists in DB. Use itemIdFromClient for this check.
                    const existingDbItem = await prismaModelClient.findUnique({ where: { id: itemIdFromClient } });

                    if (_isNew || !existingDbItem) { // Create new item
                        console.log(`[${sectionKey}] Creating new item (Client ID: ${itemIdFromClient}).`);
                        for (const field of requiredFields) { if (finalDataForPrisma[field] === null || finalDataForPrisma[field] === undefined || String(finalDataForPrisma[field]).trim() === '') throw new Error(`Missing required field "${field}" for new ${sectionKey}.`); }
                        
                        const createPayload: any = { ...finalDataForPrisma };
                        // If _isNew and itemIdFromClient is a temp UUID, let Prisma generate its own CUID.
                        // If itemIdFromClient is a full UUID (client generated for new), Prisma will try to use it.
                        if (_isNew && itemIdFromClient && itemIdFromClient.startsWith('temp-')) {
                            delete createPayload.id; // Let Prisma generate the ID
                        } else if (_isNew && itemIdFromClient) {
                            createPayload.id = itemIdFromClient; // Client wants to use this ID for a new item
                        }

                        createPayload.status = ApprovalStatus.PENDING;
                        createPayload.rejectionReason = null;
                        if (urlFieldName) createPayload[urlFieldName] = uploadedFileUrl ?? null; // Use new file or null
                        
                        await prismaModelClient.create({ data: createPayload });
                        notifyAdmin = true;
                    } else { // Update existing item (item is not _isNew and existingDbItem was found)
                        const updatePayload: any = {}; 
                        let needsDbUpdate = false; let significantChange = false;
                        const currentFileUrlOnDb = urlFieldName ? (existingDbItem as any)[urlFieldName] : undefined;

                        if (uploadedFileUrl !== undefined) { // A new file was uploaded for this item
                            (updatePayload as any)[urlFieldName] = uploadedFileUrl;
                            if (currentFileUrlOnDb) filesToDeleteOnSuccess.push(currentFileUrlOnDb);
                            significantChange = true; needsDbUpdate = true;
                        }
                        
                        Object.keys(finalDataForPrisma).forEach(key => { 
                            if (key !== 'userId' && key !== 'id' && key !== urlFieldName) { 
                                const clientVal = finalDataForPrisma[key];
                                const dbVal = (existingDbItem as any)[key];
                                const fieldHasChanged = sectionDateFields.includes(key) ? !areDatesEqual(clientVal, dbVal) : clientVal !== dbVal;
                                if (fieldHasChanged) {
                                    updatePayload[key] = clientVal; needsDbUpdate = true;
                                    const keyFieldsForStatusReset = [...requiredFields, 'degree', 'program', 'examination', 'title', 'awardName', 'researchTitle', 'paperTitle', 'position'];
                                    if (keyFieldsForStatusReset.includes(key)) significantChange = true;
                                }
                            }
                        });
                        
                        // Status update logic
                        if (significantChange && existingDbItem.status !== ApprovalStatus.PENDING) {
                            updatePayload.status = ApprovalStatus.PENDING; updatePayload.rejectionReason = null;
                            notifyAdmin = true; // needsDbUpdate is implied true if significantChange is true
                        } else if (existingDbItem.status === ApprovalStatus.REJECTED && needsDbUpdate && !significantChange) {
                            // If item was rejected and ANY field (even non-significant) is changed, resubmit for PENDING
                            updatePayload.status = ApprovalStatus.PENDING; updatePayload.rejectionReason = null;
                            notifyAdmin = true;
                        }
                        // If status not already set by above logic, preserve it if other updates are happening
                        else if (needsDbUpdate && !updatePayload.status) { 
                             updatePayload.status = existingDbItem.status; 
                             updatePayload.rejectionReason = existingDbItem.rejectionReason;
                        }

                        if (needsDbUpdate) {
                            console.log(`[${sectionKey}] Updating item ${itemIdFromClient}. Payload:`, JSON.stringify(updatePayload, null, 2));
                            await prismaModelClient.update({ where: { id: itemIdFromClient }, data: updatePayload });
                        } else {
                            console.log(`[${sectionKey}] No database update needed for item ${itemIdFromClient}.`);
                        }
                    }

                    // Notification logic
                    if (notifyAdmin && adminIds.length > 0) {
                        const itemTitle = getItemDisplayTitle(incomingItem, sectionKey);
                        const message = `${userName} submitted "${itemTitle}" (${sectionKey.replace(/([A-Z])/g, ' $1').trim()}) for approval.`;
                        await tx.notification.createMany({
                            data: adminIds.map(adminId => ({ userId: adminId, message: message, link: '/admin/approvals' }))
                        });
                    }
                    
                    // If file was successfully processed and part of DB op, remove from error deletion list
                    if (uploadedFileUrl) {
                        filesToDeleteOnError = filesToDeleteOnError.filter(f => f !== uploadedFileUrl);
                    }
                }
            }
            return { success: true };
        });

        if (result.success && filesToDeleteOnSuccess.length > 0) {
            const uniqueFilesToDelete = [...new Set(filesToDeleteOnSuccess.filter(f => f))];
            console.log("Post-transaction: Attempting to delete old/replaced files:", uniqueFilesToDelete);
            await Promise.all(uniqueFilesToDelete.map(safeDeleteFile)); 
        }
        if (result.success) {
            revalidatePath('/profile');
            revalidatePath('/admin/approvals');
            revalidatePath('/documents');
        }
        console.log(`--- Finished updateMyProfile for user: ${userId} ---`);
        return { success: result.success };

    } catch (error: any) {
        console.error("Error in updateMyProfile transaction or file ops:", error); 
        await Promise.all(filesToDeleteOnError.map(safeDeleteFile)); 
        return { success: false, error: error.message || 'Update profile error.' }; 
    }
}

export async function getMyProfileData(): Promise<UserProfilePageData | { error: string }> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
        return { error: 'Not authenticated' };
    }

    try {
        console.log(`getMyProfileData: Fetching profile data for user ${userId}`);
        const userWithRelations = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                academicQualifications: { orderBy: { yearCompleted: 'desc' } },
                professionalLicenses: { orderBy: { createdAt: 'desc' } },
                workExperiences: { orderBy: { createdAt: 'desc' } },
                professionalAffiliations: { orderBy: { createdAt: 'desc' } },
                awardsRecognitions: { orderBy: { yearReceived: 'desc' } },
                professionalDevelopments: { orderBy: { createdAt: 'desc' } },
                communityInvolvements: { orderBy: { createdAt: 'desc' } },
                publications: { orderBy: { datePublished: 'desc' } },
                conferencePresentations: { orderBy: { createdAt: 'desc' } },
                socialMediaLinks: { orderBy: { platform: 'asc' } },
            }
        });

        if (!userWithRelations) {
            return { error: 'User not found' };
        }

        const {
            password, 
            academicQualifications: aq,
            professionalLicenses: pl,
            workExperiences: we,
            professionalAffiliations: pa,
            awardsRecognitions: ar,
            professionalDevelopments: pd,
            communityInvolvements: ci,
            publications: pub,
            conferencePresentations: cp,
            socialMediaLinks: sml, 
            ...userCoreFields 
        } = userWithRelations;

        const profileUser: ProfileUser = {
            ...userCoreFields, 
            socialMediaLinks: sml || [], 
        };

        return {
            user: profileUser,
            academicQualifications: aq || [],
            professionalLicenses: pl || [],
            workExperiences: we || [],
            professionalAffiliations: pa || [],
            awardsRecognitions: ar || [],
            professionalDevelopments: pd || [],
            communityInvolvements: ci || [],
            publications: pub || [],
            conferencePresentations: cp || [],
        };

    } catch (e: any) {
        console.error(`getMyProfileData Error for user ${userId}:`, e); 
        return { error: `Failed to fetch profile data: ${e.message}` }; 
    }
}
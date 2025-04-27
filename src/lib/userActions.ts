// src/lib/userActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import type {
    User, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation,
    ApprovalStatus // Import ApprovalStatus
 } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// --- Incoming Data Types ---
// Add status and rejectionReason where applicable
type IncomingAcademicQualification = Omit<AcademicQualification, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; yearCompleted: number | null; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingProfessionalLicense = Omit<ProfessionalLicense, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; expiration: string | null; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingWorkExperience = Omit<WorkExperience, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingProfessionalAffiliation = Omit<ProfessionalAffiliation, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingAwardRecognition = Omit<AwardRecognition, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; yearReceived: number | null; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingProfessionalDevelopment = Omit<ProfessionalDevelopment, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingCommunityInvolvement = Omit<CommunityInvolvement, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingPublication = Omit<Publication, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; datePublished: string | null; status: ApprovalStatus; rejectionReason?: string | null; };
type IncomingConferencePresentation = Omit<ConferencePresentation, 'createdAt' | 'updatedAt' | 'userId'> & { _isNew?: boolean; id: string; status: ApprovalStatus; rejectionReason?: string | null; };


// --- Helper Functions (ensureUploadDirExists, safeDeleteFile, uploadFile) ---
async function ensureUploadDirExists(subDir: string, userId: string): Promise<string> {
    const userDirPath = path.join(process.cwd(), 'public', 'uploads', subDir, userId);
    try {
        await fs.mkdir(userDirPath, { recursive: true });
        // console.log(`Ensured directory exists: ${userDirPath}`); // Keep commented unless debugging
        return userDirPath;
    } catch (error) {
        console.error(`Error creating upload directory (${subDir}):`, error);
        throw new Error(`Could not create upload directory for ${subDir}.`);
    }
}
async function safeDeleteFile(filePath: string | null | undefined) {
    if (!filePath || !filePath.startsWith('/uploads/')) {
        // console.log(`Skipping deletion for invalid or non-local path: ${filePath}`);
        return; // Skip invalid or non-local paths
    }
    try {
        const localFilePath = path.join(process.cwd(), 'public', filePath);
        await fs.unlink(localFilePath);
        console.log(`Successfully deleted file: ${localFilePath}`);
    } catch (error: any) {
        // Log error if file not found (ENOENT) or other issues, but don't throw
        if (error.code === 'ENOENT') {
            console.warn(`File not found during deletion attempt: ${filePath}`);
        } else {
            console.error(`Error deleting file ${filePath}:`, error.message);
        }
    }
}
async function uploadFile(file: File, userId: string, subDir: string): Promise<string> { // Returns the relative URL path
    try {
        // Basic validation within upload function as well
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        if (file.size > MAX_FILE_SIZE) { throw new Error(`File size exceeds limit (${file.name}).`); }
        if (!ALLOWED_TYPES.includes(file.type)) { throw new Error(`Invalid file type (${file.name}).`); }

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
        console.error(`Error uploading file (${file.name}):`, uploadError);
        // Re-throw a more specific error or the original one
        throw new Error(`Failed to upload file ${file.name}: ${uploadError.message}`);
    }
}

// --- Get Profile Data Action ---
interface GetUserProfileDataResponse {
    user: { id: string; name: string | null; email: string | null; role: string | null; } | null;
    academicQualifications: AcademicQualification[];
    professionalLicenses: ProfessionalLicense[];
    workExperiences: WorkExperience[];
    professionalAffiliations: ProfessionalAffiliation[];
    awardsRecognitions: AwardRecognition[];
    professionalDevelopments: ProfessionalDevelopment[];
    communityInvolvements: CommunityInvolvement[];
    publications: Publication[];
    conferencePresentations: ConferencePresentation[];
    error?: string;
}
export async function getMyProfileData(): Promise<GetUserProfileDataResponse> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const defaultResponse: Omit<GetUserProfileDataResponse, 'user' | 'error'> = { academicQualifications: [], professionalLicenses: [], workExperiences: [], professionalAffiliations: [], awardsRecognitions: [], professionalDevelopments: [], communityInvolvements: [], publications: [], conferencePresentations: [], };
    if (!userId) { return { user: null, ...defaultResponse, error: 'Not authenticated' }; }
    try {
        const userWithProfile = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                academicQualifications: { orderBy: { yearCompleted: 'desc' } },
                professionalLicenses: { orderBy: { expiration: 'desc' } },
                workExperiences: { orderBy: { createdAt: 'desc' } }, // Consider ordering by years if needed
                professionalAffiliations: { orderBy: { createdAt: 'desc' } },
                awardsRecognitions: { orderBy: { yearReceived: 'desc' } },
                professionalDevelopments: { orderBy: { createdAt: 'desc' } },
                communityInvolvements: { orderBy: { createdAt: 'desc' } },
                publications: { orderBy: { datePublished: 'desc' } },
                conferencePresentations: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!userWithProfile) { return { user: null, ...defaultResponse, error: 'User not found' }; }
        // Ensure all arrays are returned, even if null from Prisma
        return {
             user: { id: userWithProfile.id, name: userWithProfile.name, email: userWithProfile.email, role: userWithProfile.role },
             academicQualifications: userWithProfile.academicQualifications ?? [],
             professionalLicenses: userWithProfile.professionalLicenses ?? [],
             workExperiences: userWithProfile.workExperiences ?? [],
             professionalAffiliations: userWithProfile.professionalAffiliations ?? [],
             awardsRecognitions: userWithProfile.awardsRecognitions ?? [],
             professionalDevelopments: userWithProfile.professionalDevelopments ?? [],
             communityInvolvements: userWithProfile.communityInvolvements ?? [],
             publications: userWithProfile.publications ?? [],
             conferencePresentations: userWithProfile.conferencePresentations ?? [],
        };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return { user: null, ...defaultResponse, error: 'Failed to fetch profile data' };
    }
}


// --- Update Profile Action ---
interface UpdateProfileResponse { success: boolean; error?: string; }

// --- ADDED: Interface for selected item data ---
interface SelectedItem {
    id: string;
    status: ApprovalStatus;
    [key: string]: any; // Allow dynamic access to URL field
}
// --- END ADDED ---

export async function updateMyProfile(formData: FormData): Promise<UpdateProfileResponse> {
    'use server';
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) { return { success: false, error: 'Not authenticated' }; }
    console.log(`updateMyProfile called for user: ${userId}`);

    function parseJsonData<T>(jsonString: string | null, arrayName: string): T[] {
        if (!jsonString) return [];
        try {
            const parsed = JSON.parse(jsonString);
            if (!Array.isArray(parsed)) throw new Error(`${arrayName} data is not an array`);
            return parsed;
        } catch (e: any) {
            console.error(`Error parsing ${arrayName} json:`, e);
            throw new Error(`Invalid ${arrayName} data format received.`); // Re-throw to fail transaction
        }
    }

    const uploadDirs: Record<string, string> = { academicQualifications: 'qualifications', professionalLicenses: 'licenses', workExperiences: 'workexp', professionalAffiliations: 'affiliations', awardsRecognitions: 'awards', professionalDevelopments: 'profdev', communityInvolvements: 'community', publications: 'publications', conferencePresentations: 'presentations' };
    // --- ADJUSTED: Use string type for URL field names ---
    const urlFieldNames: Record<string, string> = { academicQualifications: 'diplomaFileUrl', professionalLicenses: 'licenseFileUrl', workExperiences: 'proofUrl', professionalAffiliations: 'membershipProofUrl', awardsRecognitions: 'certificateUrl', professionalDevelopments: 'certificateFileUrl', communityInvolvements: 'proofUrl', publications: 'pdfUrl', conferencePresentations: 'proofUrl' };
    // --- END ADJUSTED ---
    const requiredFieldsMap: Record<string, string[]> = { academicQualifications: ['degree', 'institution', 'program', 'yearCompleted'], professionalLicenses: ['examination', 'monthYear', 'licenseNumber', 'expiration'], workExperiences: ['institution', 'position', 'inclusiveYears'], professionalAffiliations: ['organization', 'inclusiveYears'], awardsRecognitions: ['awardName', 'awardingBody', 'yearReceived'], professionalDevelopments: ['title', 'organizer', 'dateLocation'], communityInvolvements: ['engagementTitle', 'role', 'locationDate'], publications: ['researchTitle', 'journal', 'datePublished'], conferencePresentations: ['paperTitle', 'eventName', 'dateLocation'] };

    let filesToDelete: (string | null | undefined)[] = [];
    let incomingData: Record<string, any[]> = {}; // Store parsed data

    try {
        // --- Extract and Parse JSON Data for ALL Sections ---
        incomingData.academicQualifications = parseJsonData<IncomingAcademicQualification>(formData.get('academicQualifications_json') as string | null, 'Academic Qualifications');
        incomingData.professionalLicenses = parseJsonData<IncomingProfessionalLicense>(formData.get('professionalLicenses_json') as string | null, 'Professional Licenses');
        incomingData.workExperiences = parseJsonData<IncomingWorkExperience>(formData.get('workExperiences_json') as string | null, 'Work Experience');
        incomingData.professionalAffiliations = parseJsonData<IncomingProfessionalAffiliation>(formData.get('professionalAffiliations_json') as string | null, 'Professional Affiliations');
        incomingData.awardsRecognitions = parseJsonData<IncomingAwardRecognition>(formData.get('awardsRecognitions_json') as string | null, 'Awards/Recognitions');
        incomingData.professionalDevelopments = parseJsonData<IncomingProfessionalDevelopment>(formData.get('professionalDevelopments_json') as string | null, 'Professional Development');
        incomingData.communityInvolvements = parseJsonData<IncomingCommunityInvolvement>(formData.get('communityInvolvements_json') as string | null, 'Community Involvement');
        incomingData.publications = parseJsonData<IncomingPublication>(formData.get('publications_json') as string | null, 'Publications');
        incomingData.conferencePresentations = parseJsonData<IncomingConferencePresentation>(formData.get('conferencePresentations_json') as string | null, 'Conference Presentations');

    } catch (error: any) {
        return { success: false, error: error.message }; // Return error if parsing fails
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            // --- ADJUSTED: Generic type TPrisma now includes status ---
            async function processSection<TIncoming extends { id: string; _isNew?: boolean; status?: ApprovalStatus }, TPrisma extends { id: string; status: ApprovalStatus }>(
                sectionKey: keyof typeof uploadDirs,
                prismaModel: any // Prisma model delegate (e.g., tx.academicQualification)
            ) {
                const data = incomingData[sectionKey] as TIncoming[];
                if (!data) { console.warn(`No data found for section ${sectionKey}. Skipping.`); return; }
                console.log(`Processing section: ${sectionKey}`);

                const urlFieldName = urlFieldNames[sectionKey]; // Now correctly typed as string | undefined
                const subDir = uploadDirs[sectionKey];
                const requiredFields = requiredFieldsMap[sectionKey] || [];

                // --- ADJUSTED: Select definition and Map typing ---
                const selectFields: { id: true; status: true; [key: string]: true } = { id: true, status: true };
                if (urlFieldName) {
                    selectFields[urlFieldName] = true; // Add URL field to select if it exists
                }
                const currentItems: SelectedItem[] = await prismaModel.findMany({
                    where: { userId: userId },
                    select: selectFields
                });
                const currentItemMap = new Map<string, SelectedItem>(currentItems.map(item => [item.id, item]));
                // --- END ADJUSTED ---

                const incomingIds = new Set(data.map(item => item.id));
                const idsToDeleteInternal: string[] = [];

                // 2. Identify & Schedule Deletions
                for (const currentItem of currentItems) {
                    if (!incomingIds.has(currentItem.id)) {
                        idsToDeleteInternal.push(currentItem.id);
                        // --- ADJUSTED: Check urlFieldName exists before access ---
                        if (urlFieldName && currentItem[urlFieldName]) {
                             filesToDelete.push(currentItem[urlFieldName]);
                        }
                        // --- END ADJUSTED ---
                    }
                }
                // 3. Perform Deletions
                if (idsToDeleteInternal.length > 0) { console.log(`Deleting ${sectionKey} records:`, idsToDeleteInternal); await prismaModel.deleteMany({ where: { id: { in: idsToDeleteInternal }, userId: userId } }); }

                // 4. Process Creates and Updates
                for (const incomingItem of data) {
                    const fileKey = `${sectionKey}_file_${incomingItem.id}`;
                    const file = formData.get(fileKey) as File | null;
                    let uploadedFileUrl: string | null | undefined = undefined;
                    let fileChanged = false; // Track if the file itself was changed

                    if (file) {
                        console.log(`File found for ${sectionKey} item ${incomingItem.id}: ${file.name}`);
                        uploadedFileUrl = await uploadFile(file, userId, subDir);
                        fileChanged = true; // A new file was uploaded
                    }

                    // Destructure, remove temp fields, prepare data
                    const { _isNew, id, status, rejectionReason, ...dataForPrisma } = incomingItem as any;
                    Object.keys(dataForPrisma).forEach(key => { // Date/Number/Null parsing...
                        const value = dataForPrisma[key];
                        if (['expiration', 'datePublished'].includes(key) && typeof value === 'string') { try { const parsedDate = new Date(value); dataForPrisma[key] = !isNaN(parsedDate.getTime()) ? parsedDate : null; } catch { dataForPrisma[key] = null; } }
                        if (['yearCompleted', 'yearReceived'].includes(key) && typeof value === 'string') { const num = parseInt(value, 10); dataForPrisma[key] = isNaN(num) ? null : num; }
                        if (typeof value === 'string' && value.trim() === '' && !requiredFields.includes(key)) { dataForPrisma[key] = null; }
                    });
                    dataForPrisma.userId = userId;
                    // --- ADJUSTED: Check urlFieldName exists before assignment ---
                    if (urlFieldName && uploadedFileUrl !== undefined) {
                        dataForPrisma[urlFieldName] = uploadedFileUrl;
                    }
                    // --- END ADJUSTED ---

                    if (_isNew) {
                        console.log(`Attempting create for ${sectionKey} - ID: ${id}`);
                        for (const field of requiredFields) { if (dataForPrisma[field] === null || dataForPrisma[field] === undefined || dataForPrisma[field] === '') { throw new Error(`Missing required field "${field}" for new ${sectionKey}.`); } }
                        // New items automatically get PENDING status from schema default
                        dataForPrisma.status = 'PENDING'; // Explicitly set for clarity if needed
                        dataForPrisma.rejectionReason = null;
                        await prismaModel.create({ data: dataForPrisma });
                        console.log(`Created ${sectionKey} item.`);
                    } else {
                        const currentItem = currentItemMap.get(id); // currentItem is now Typed as SelectedItem | undefined
                        if (!currentItem) { console.warn(`${sectionKey} Update: ID ${id} not found. Skipping.`); continue; }

                        const updateData: Partial<any> = {};
                        let needsDbUpdate = false;
                        let significantChange = false; // Track if key data fields changed

                        // Compare fields to detect changes
                        Object.keys(dataForPrisma).forEach(key => {
                            if (key !== 'userId' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'status' && key !== 'rejectionReason') {
                                const incomingValue = dataForPrisma[key];
                                const currentValue = currentItem[key]; // Access directly
                                let fieldChanged = false;
                                if (incomingValue instanceof Date) { fieldChanged = !(currentValue instanceof Date) || incomingValue.getTime() !== (currentValue as Date)?.getTime(); }
                                else { fieldChanged = incomingValue !== currentValue; }

                                if (fieldChanged) {
                                    updateData[key] = incomingValue;
                                    needsDbUpdate = true;
                                    // Define which fields trigger a status reset (adjust as needed)
                                    const keyFields = ['degree', 'institution', 'program', 'yearCompleted', 'examination', 'licenseNumber', 'expiration', 'title', 'organizer', 'dateLocation', 'researchTitle', 'journal', 'datePublished', 'paperTitle', 'eventName'];
                                    // --- ADJUSTED: Check urlFieldName exists before comparing ---
                                    if (keyFields.includes(key) || (urlFieldName && key === urlFieldName)) {
                                        significantChange = true;
                                    }
                                    // --- END ADJUSTED ---
                                }
                            }
                        });

                        // --- Approval Status Logic (Uses currentItem.status correctly now) ---
                        const currentStatus = currentItem.status; // Directly access typed status
                        if (significantChange || fileChanged) {
                             // If significant data or the file changed, reset to PENDING
                            if (currentStatus !== 'PENDING') {
                                updateData.status = 'PENDING';
                                updateData.rejectionReason = null; // Clear rejection reason on resubmission
                                needsDbUpdate = true;
                                console.log(`Significant change detected for ${sectionKey} ID: ${id}. Resetting status to PENDING.`);
                            }
                        } else if (currentStatus === 'REJECTED' && needsDbUpdate) {
                            // If only minor edits on a REJECTED item, keep it PENDING for re-review
                            updateData.status = 'PENDING';
                            updateData.rejectionReason = null;
                            needsDbUpdate = true;
                             console.log(`Minor edit on REJECTED ${sectionKey} ID: ${id}. Setting status to PENDING.`);
                        }
                        // No status change needed if only minor edits on PENDING or APPROVED (unless significantChange/fileChanged handled above)

                        if (needsDbUpdate) {
                            console.log(`Updating ${sectionKey} ID: ${id} with data:`, updateData);
                            // --- ADJUSTED: Check urlFieldName exists before comparison/deletion scheduling ---
                            if (urlFieldName && updateData[urlFieldName] !== currentItem[urlFieldName] && currentItem[urlFieldName]) {
                                console.log(`Marking old file for deletion (update): ${currentItem[urlFieldName]}`);
                                filesToDelete.push(currentItem[urlFieldName]);
                            }
                            // --- END ADJUSTED ---
                            await prismaModel.update({ where: { id: id, userId: userId }, data: updateData });
                        }
                    }
                }
            } // end processSection

            // --- Process ALL Sections ---
            await processSection('academicQualifications', tx.academicQualification);
            await processSection('professionalLicenses', tx.professionalLicense);
            await processSection('workExperiences', tx.workExperience);
            await processSection('professionalAffiliations', tx.professionalAffiliation);
            await processSection('awardsRecognitions', tx.awardRecognition);
            await processSection('professionalDevelopments', tx.professionalDevelopment);
            await processSection('communityInvolvements', tx.communityInvolvement);
            await processSection('publications', tx.publication);
            await processSection('conferencePresentations', tx.conferencePresentation);

            return { success: true }; // Transaction successful
        }); // End transaction

        // --- Perform File Deletions (Outside Transaction) ---
        if (result.success && filesToDelete.length > 0) {
            const uniqueFilesToDelete = [...new Set(filesToDelete.filter(f => f))]; // Ensure uniqueness and filter nulls
            console.log("Attempting file deletions post-transaction:", uniqueFilesToDelete);
            await Promise.all(uniqueFilesToDelete.map(fileUrl => safeDeleteFile(fileUrl)));
        }

        // Revalidate Path
        if (result.success) {
            revalidatePath('/profile'); // Revalidate faculty profile
            revalidatePath('/admin/approvals'); // Revalidate admin approvals page
            console.log("Profile and Admin Approvals revalidated.");
        }

        return { success: result.success };

    } catch (error: any) {
        console.error("Error in updateMyProfile transaction or file deletion:", error);
        // NOTE: Files uploaded *before* the transaction failed might be orphaned.
        // Implementing cleanup for this is complex and often handled by background jobs.
        return { success: false, error: error.message || 'Failed to update profile data' };
    }
}
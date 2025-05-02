// src/lib/userActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import type {
    User, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation,
    ApprovalStatus
 } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// --- Incoming Data Types ---
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
    try { await fs.mkdir(userDirPath, { recursive: true }); return userDirPath; }
    catch (error) { console.error(`Error creating upload directory (${subDir}):`, error); throw new Error(`Could not create upload directory for ${subDir}.`); }
}
async function safeDeleteFile(filePath: string | null | undefined) {
    if (!filePath || !filePath.startsWith('/uploads/')) { return; }
    try { const localFilePath = path.join(process.cwd(), 'public', filePath); await fs.unlink(localFilePath); console.log(`Successfully deleted file: ${localFilePath}`); }
    catch (error: any) { if (error.code === 'ENOENT') { console.warn(`File not found during deletion attempt: ${filePath}`); } else { console.error(`Error deleting file ${filePath}:`, error.message); } }
}
async function uploadFile(file: File, userId: string, subDir: string): Promise<string> {
    try {
        const MAX_FILE_SIZE = 5 * 1024 * 1024; const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        if (file.size > MAX_FILE_SIZE) { throw new Error(`File size exceeds limit (${file.name}).`); }
        if (!ALLOWED_TYPES.includes(file.type)) { throw new Error(`Invalid file type (${file.name}).`); }
        const uploadDir = await ensureUploadDirExists(subDir, userId); const fileExtension = path.extname(file.name); const uniqueFilename = `${uuidv4()}${fileExtension}`; const localFilePath = path.join(uploadDir, uniqueFilename); const fileBuffer = Buffer.from(await file.arrayBuffer()); await fs.writeFile(localFilePath, fileBuffer); const relativeUrl = `/uploads/${subDir}/${userId}/${uniqueFilename}`; console.log(`File uploaded successfully: ${relativeUrl}`); return relativeUrl;
    } catch (uploadError: any) { console.error(`Error uploading file (${file.name}):`, uploadError); throw new Error(`Failed to upload file ${file.name}: ${uploadError.message}`); }
}

// --- Get Profile Data Action ---
interface GetUserProfileDataResponse { user: { id: string; name: string | null; email: string | null; role: string | null; } | null; academicQualifications: AcademicQualification[]; professionalLicenses: ProfessionalLicense[]; workExperiences: WorkExperience[]; professionalAffiliations: ProfessionalAffiliation[]; awardsRecognitions: AwardRecognition[]; professionalDevelopments: ProfessionalDevelopment[]; communityInvolvements: CommunityInvolvement[]; publications: Publication[]; conferencePresentations: ConferencePresentation[]; error?: string; }
export async function getMyProfileData(): Promise<GetUserProfileDataResponse> {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    const defaultResponse: Omit<GetUserProfileDataResponse, 'user' | 'error'> = { academicQualifications: [], professionalLicenses: [], workExperiences: [], professionalAffiliations: [], awardsRecognitions: [], professionalDevelopments: [], communityInvolvements: [], publications: [], conferencePresentations: [], };
    if (!userId) { return { user: null, ...defaultResponse, error: 'Not authenticated' }; }
    try {
        const userWithProfile = await prisma.user.findUnique({
            where: { id: userId },
            include: { academicQualifications: { orderBy: { yearCompleted: 'desc' } }, professionalLicenses: { orderBy: { expiration: 'desc' } }, workExperiences: { orderBy: { createdAt: 'desc' } }, professionalAffiliations: { orderBy: { createdAt: 'desc' } }, awardsRecognitions: { orderBy: { yearReceived: 'desc' } }, professionalDevelopments: { orderBy: { createdAt: 'desc' } }, communityInvolvements: { orderBy: { createdAt: 'desc' } }, publications: { orderBy: { datePublished: 'desc' } }, conferencePresentations: { orderBy: { createdAt: 'desc' } }, },
        });
        if (!userWithProfile) { return { user: null, ...defaultResponse, error: 'User not found' }; }
        return { user: { id: userWithProfile.id, name: userWithProfile.name, email: userWithProfile.email, role: userWithProfile.role }, academicQualifications: userWithProfile.academicQualifications ?? [], professionalLicenses: userWithProfile.professionalLicenses ?? [], workExperiences: userWithProfile.workExperiences ?? [], professionalAffiliations: userWithProfile.professionalAffiliations ?? [], awardsRecognitions: userWithProfile.awardsRecognitions ?? [], professionalDevelopments: userWithProfile.professionalDevelopments ?? [], communityInvolvements: userWithProfile.communityInvolvements ?? [], publications: userWithProfile.publications ?? [], conferencePresentations: userWithProfile.conferencePresentations ?? [], };
    } catch (error) { console.error("Error fetching profile data:", error); return { user: null, ...defaultResponse, error: 'Failed to fetch profile data' }; }
}


// --- Update Profile Action ---
interface UpdateProfileResponse { success: boolean; error?: string; }

interface SelectedItem {
    id: string;
    status: ApprovalStatus;
    [key: string]: any;
}

function areDatesEqual(d1: Date | string | null | undefined, d2: Date | string | null | undefined): boolean {
    if (d1 === d2) return true;
    if (!d1 || !d2) return false;
    try {
        const date1 = new Date(d1); const date2 = new Date(d2);
        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return false;
        return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
    } catch (e) { return false; }
}

export async function updateMyProfile(formData: FormData): Promise<UpdateProfileResponse> {
    'use server';
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) { return { success: false, error: 'Not authenticated' }; }
    console.log(`--- Starting updateMyProfile for user: ${userId} ---`); // Added start log

    function parseJsonData<T>(jsonString: string | null, arrayName: string): T[] {
        if (!jsonString) return [];
        try {
            const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;
            const parsedWithDates = JSON.parse(jsonString, (key, value) => {
                if (typeof value === 'string' && isoDateRegex.test(value)) {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) { return date; }
                }
                return value;
            });
            if (!Array.isArray(parsedWithDates)) throw new Error(`${arrayName} data is not an array`);
            return parsedWithDates;
        } catch (e: any) {
            console.error(`Error parsing ${arrayName} json:`, e);
            throw new Error(`Invalid ${arrayName} data format received.`);
        }
    }

    const uploadDirs: Record<string, string> = { academicQualifications: 'qualifications', professionalLicenses: 'licenses', workExperiences: 'workexp', professionalAffiliations: 'affiliations', awardsRecognitions: 'awards', professionalDevelopments: 'profdev', communityInvolvements: 'community', publications: 'publications', conferencePresentations: 'presentations' };
    const urlFieldNames: Record<string, string> = { academicQualifications: 'diplomaFileUrl', professionalLicenses: 'licenseFileUrl', workExperiences: 'proofUrl', professionalAffiliations: 'membershipProofUrl', awardsRecognitions: 'certificateUrl', professionalDevelopments: 'certificateFileUrl', communityInvolvements: 'proofUrl', publications: 'pdfUrl', conferencePresentations: 'proofUrl' };
    const requiredFieldsMap: Record<string, string[]> = { academicQualifications: ['degree', 'institution', 'program', 'yearCompleted'], professionalLicenses: ['examination', 'monthYear', 'licenseNumber', 'expiration'], workExperiences: ['institution', 'position', 'inclusiveYears'], professionalAffiliations: ['organization', 'inclusiveYears'], awardsRecognitions: ['awardName', 'awardingBody', 'yearReceived'], professionalDevelopments: ['title', 'organizer', 'dateLocation'], communityInvolvements: ['engagementTitle', 'role', 'locationDate'], publications: ['researchTitle', 'journal', 'datePublished'], conferencePresentations: ['paperTitle', 'eventName', 'dateLocation'] };
    const dateFields: Record<string, string[]> = { professionalLicenses: ['expiration'], publications: ['datePublished'], };

    let filesToDelete: (string | null | undefined)[] = [];
    let incomingData: Record<string, any[]> = {};

    try {
        console.log("Parsing incoming form data..."); // Log parsing start
        incomingData.academicQualifications = parseJsonData<IncomingAcademicQualification>(formData.get('academicQualifications_json') as string | null, 'Academic Qualifications');
        incomingData.professionalLicenses = parseJsonData<IncomingProfessionalLicense>(formData.get('professionalLicenses_json') as string | null, 'Professional Licenses');
        incomingData.workExperiences = parseJsonData<IncomingWorkExperience>(formData.get('workExperiences_json') as string | null, 'Work Experience');
        incomingData.professionalAffiliations = parseJsonData<IncomingProfessionalAffiliation>(formData.get('professionalAffiliations_json') as string | null, 'Professional Affiliations');
        incomingData.awardsRecognitions = parseJsonData<IncomingAwardRecognition>(formData.get('awardsRecognitions_json') as string | null, 'Awards/Recognitions');
        incomingData.professionalDevelopments = parseJsonData<IncomingProfessionalDevelopment>(formData.get('professionalDevelopments_json') as string | null, 'Professional Development');
        incomingData.communityInvolvements = parseJsonData<IncomingCommunityInvolvement>(formData.get('communityInvolvements_json') as string | null, 'Community Involvement');
        incomingData.publications = parseJsonData<IncomingPublication>(formData.get('publications_json') as string | null, 'Publications');
        incomingData.conferencePresentations = parseJsonData<IncomingConferencePresentation>(formData.get('conferencePresentations_json') as string | null, 'Conference Presentations');
        console.log("Finished parsing form data."); // Log parsing end
    } catch (error: any) { return { success: false, error: error.message }; }

    try {
        console.log("Starting database transaction..."); // Log transaction start
        const result = await prisma.$transaction(async (tx) => {
            async function processSection<TIncoming extends { id: string; _isNew?: boolean; status?: ApprovalStatus }, TPrisma extends { id: string; status: ApprovalStatus }>(
                sectionKey: keyof typeof uploadDirs,
                prismaModel: any
            ) {
                const data = incomingData[sectionKey] as TIncoming[];
                if (!data) { console.warn(`No data found for section ${sectionKey}. Skipping.`); return; }
                console.log(`Processing section: ${sectionKey}`);

                const urlFieldName = urlFieldNames[sectionKey];
                const subDir = uploadDirs[sectionKey];
                const requiredFields = requiredFieldsMap[sectionKey] || [];
                const sectionDateFields = dateFields[sectionKey] || [];

                const selectFields: { id: true; status: true; [key: string]: true } = { id: true, status: true };
                if (urlFieldName) { selectFields[urlFieldName] = true; }
                // Fetch ALL fields from DB for comparison
                const currentItems = await prismaModel.findMany({ where: { userId: userId } });
                const currentItemMap = new Map<string, any>(currentItems.map((item: { id: string }) => [item.id, item]));
                const incomingIds = new Set(data.map(item => item.id));
                const idsToDeleteInternal: string[] = [];

                for (const currentItem of currentItems) {
                    if (!incomingIds.has(currentItem.id)) {
                        idsToDeleteInternal.push(currentItem.id);
                        if (urlFieldName && currentItem[urlFieldName]) { filesToDelete.push(currentItem[urlFieldName]); }
                    }
                }
                if (idsToDeleteInternal.length > 0) { console.log(`Deleting ${sectionKey} records:`, idsToDeleteInternal); await prismaModel.deleteMany({ where: { id: { in: idsToDeleteInternal }, userId: userId } }); }

                for (const incomingItem of data) {
                    const fileKey = `${sectionKey}_file_${incomingItem.id}`;
                    const file = formData.get(fileKey) as File | null;
                    let uploadedFileUrl: string | null | undefined = undefined;
                    let fileChanged = false;

                    if (file) { uploadedFileUrl = await uploadFile(file, userId, subDir); fileChanged = true; }

                    const { _isNew, id, status, rejectionReason, ...dataForPrisma } = incomingItem as any;
                    Object.keys(dataForPrisma).forEach(key => {
                        if (['yearCompleted', 'yearReceived'].includes(key) && typeof dataForPrisma[key] === 'string') { const num = parseInt(dataForPrisma[key], 10); dataForPrisma[key] = isNaN(num) ? null : num; }
                        if (typeof dataForPrisma[key] === 'string' && dataForPrisma[key].trim() === '' && !requiredFields.includes(key)) { dataForPrisma[key] = null; }
                        if (sectionDateFields.includes(key)) { if (!(dataForPrisma[key] instanceof Date) && dataForPrisma[key] !== null) { try { const parsedDate = new Date(dataForPrisma[key]); dataForPrisma[key] = !isNaN(parsedDate.getTime()) ? parsedDate : null; } catch { dataForPrisma[key] = null; } } else if (dataForPrisma[key] instanceof Date && isNaN(dataForPrisma[key].getTime())) { dataForPrisma[key] = null; } }
                    });
                    dataForPrisma.userId = userId;
                    if (urlFieldName && uploadedFileUrl !== undefined) { dataForPrisma[urlFieldName] = uploadedFileUrl; }

                    if (_isNew) {
                        console.log(`Attempting create for ${sectionKey} - ID: ${id}`);
                        for (const field of requiredFields) { if (dataForPrisma[field] === null || dataForPrisma[field] === undefined || dataForPrisma[field] === '') { throw new Error(`Missing required field "${field}" for new ${sectionKey}.`); } }
                        dataForPrisma.status = 'PENDING'; dataForPrisma.rejectionReason = null;
                        await prismaModel.create({ data: dataForPrisma });
                        console.log(`Created ${sectionKey} item.`);
                    } else {
                        const currentItem = currentItemMap.get(id);
                        if (!currentItem) { console.warn(`${sectionKey} Update: ID ${id} not found. Skipping.`); continue; }

                        const updateData: Partial<any> = {};
                        let needsDbUpdate = false;
                        let significantChange = false;

                        // --- Comparison Loop with Logging ---
                        console.log(`\n--- Comparing item ${id} in section ${sectionKey} ---`); // Log item start
                        Object.keys(dataForPrisma).forEach(key => {
                            if (key !== 'userId' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'status' && key !== 'rejectionReason') {
                                const incomingValue = dataForPrisma[key];
                                const currentValue = currentItem[key];
                                let fieldChanged = false;

                                if (sectionDateFields.includes(key)) {
                                    fieldChanged = !areDatesEqual(incomingValue, currentValue);
                                } else {
                                    fieldChanged = incomingValue !== currentValue;
                                }

                                // *** ADDED: Detailed Logging ***
                                if (fieldChanged) {
                                    console.log(`[${sectionKey} - ${id}] Field "${key}" CHANGED:`);
                                    console.log(`  Incoming (${typeof incomingValue}):`, incomingValue);
                                    console.log(`  Current  (${typeof currentValue}):`, currentValue);
                                    updateData[key] = incomingValue;
                                    needsDbUpdate = true;
                                    const keyFields = ['degree', 'institution', 'program', 'yearCompleted', 'examination', 'licenseNumber', 'expiration', 'title', 'organizer', 'dateLocation', 'researchTitle', 'journal', 'datePublished', 'paperTitle', 'eventName'];
                                    if (keyFields.includes(key) || (urlFieldName && key === urlFieldName)) {
                                        significantChange = true;
                                    }
                                } else {
                                     // Optional: Log fields that didn't change for debugging completeness
                                     // console.log(`[${sectionKey} - ${id}] Field "${key}" UNCHANGED.`);
                                }
                                // *** END ADDED LOGGING ***
                            }
                        });
                        console.log(`--- Finished comparing item ${id}. Needs DB update: ${needsDbUpdate}, Significant change: ${significantChange} ---`); // Log item end
                        // --- End Comparison Loop ---

                        const currentStatus = currentItem.status;
                        if (significantChange || fileChanged) {
                            if (currentStatus !== 'PENDING') {
                                updateData.status = 'PENDING'; updateData.rejectionReason = null; needsDbUpdate = true;
                                console.log(`Significant change detected for ${sectionKey} ID: ${id}. Resetting status to PENDING.`);
                            }
                        } else if (currentStatus === 'REJECTED' && needsDbUpdate) {
                            updateData.status = 'PENDING'; updateData.rejectionReason = null; needsDbUpdate = true;
                             console.log(`Minor edit on REJECTED ${sectionKey} ID: ${id}. Setting status to PENDING.`);
                        }

                        if (needsDbUpdate) {
                            console.log(`Updating ${sectionKey} ID: ${id} with data:`, updateData);
                            if (urlFieldName && updateData[urlFieldName] !== currentItem[urlFieldName] && currentItem[urlFieldName]) {
                                filesToDelete.push(currentItem[urlFieldName]);
                            }
                            await prismaModel.update({ where: { id: id, userId: userId }, data: updateData });
                        }
                    }
                }
            } // end processSection

            // Process ALL sections
            await processSection('academicQualifications', tx.academicQualification);
            await processSection('professionalLicenses', tx.professionalLicense);
            await processSection('workExperiences', tx.workExperience);
            await processSection('professionalAffiliations', tx.professionalAffiliation);
            await processSection('awardsRecognitions', tx.awardRecognition);
            await processSection('professionalDevelopments', tx.professionalDevelopment);
            await processSection('communityInvolvements', tx.communityInvolvement);
            await processSection('publications', tx.publication);
            await processSection('conferencePresentations', tx.conferencePresentation);

            return { success: true };
        }); // End transaction
        console.log("Database transaction finished."); // Log transaction end

        if (result.success && filesToDelete.length > 0) {
            const uniqueFilesToDelete = [...new Set(filesToDelete.filter(f => f))];
            console.log("Attempting file deletions post-transaction:", uniqueFilesToDelete);
            await Promise.all(uniqueFilesToDelete.map(fileUrl => safeDeleteFile(fileUrl)));
        }

        if (result.success) {
            revalidatePath('/profile'); revalidatePath('/admin/approvals');
            console.log("Profile and Admin Approvals revalidated.");
        }

        console.log(`--- Finished updateMyProfile for user: ${userId} ---`); // Added end log
        return { success: result.success };

    } catch (error: any) {
        console.error("Error in updateMyProfile transaction or file deletion:", error);
        return { success: false, error: error.message || 'Failed to update profile data' };
    }
}
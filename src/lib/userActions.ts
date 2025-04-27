// src/lib/userActions.ts
'use server'; // Mark this file as containing Server Actions

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import type {
    User, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
 } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises'; // Import Node.js file system promises API
import path from 'path';     // Import Node.js path module
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

// Type received from the frontend JSON string (doesn't include File objects)
type IncomingAcademicQualification = Omit<AcademicQualification, '_selectedFile'> & {
    _isNew?: boolean;
    // ID might be the temporary UUID for new items
};

// --- Helper Function to ensure upload directory exists ---
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

// --- Helper Function for safe file deletion ---
async function safeDeleteFile(filePath: string | null | undefined) {
    if (!filePath || !filePath.startsWith('/uploads/')) {
        // console.log(`Skipping deletion for invalid or non-local path: ${filePath}`);
        return;
    }
    try {
        const localFilePath = path.join(process.cwd(), 'public', filePath);
        await fs.unlink(localFilePath);
        console.log(`Successfully deleted file: ${localFilePath}`);
    } catch (error: any) {
        // Log error if file not found (ENOENT) or other issues, but don't throw
        if (error.code === 'ENOENT') {
            console.warn(`File not found, skipping delete: ${filePath}`);
        } else {
            console.error(`Error deleting file ${filePath}:`, error.message);
        }
    }
}


// --- Get Profile Data Action ---
interface GetUserProfileDataResponse {
    user: { // Keep basic user info separate if preferred
        id: string;
        name: string | null;
        email: string | null;
        role: string | null;
    } | null;
    // Include arrays for ALL CV sections
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

    // Default empty state
    const defaultResponse: Omit<GetUserProfileDataResponse, 'user' | 'error'> = {
        academicQualifications: [],
        professionalLicenses: [],
        workExperiences: [],
        professionalAffiliations: [],
        awardsRecognitions: [],
        professionalDevelopments: [],
        communityInvolvements: [],
        publications: [],
        conferencePresentations: [],
    };

    if (!userId) {
        return { user: null, ...defaultResponse, error: 'Not authenticated' };
    }

    try {
        const userWithProfile = await prisma.user.findUnique({
            where: { id: userId },
            include: { // Include ALL relations
                academicQualifications: { orderBy: { yearCompleted: 'desc' } },
                professionalLicenses: { orderBy: { expiration: 'desc' } }, // Example ordering
                workExperiences: { orderBy: { createdAt: 'desc' } }, // Order by creation for now
                professionalAffiliations: { orderBy: { createdAt: 'desc' } },
                awardsRecognitions: { orderBy: { yearReceived: 'desc' } },
                professionalDevelopments: { orderBy: { createdAt: 'desc' } }, // Need better date field later maybe
                communityInvolvements: { orderBy: { createdAt: 'desc' } },
                publications: { orderBy: { datePublished: 'desc' } },
                conferencePresentations: { orderBy: { createdAt: 'desc' } },
            },
        });

        if (!userWithProfile) {
            return { user: null, ...defaultResponse, error: 'User not found in database' };
        }

        // Return the structured data
        return {
             user: {
                 id: userWithProfile.id,
                 name: userWithProfile.name,
                 email: userWithProfile.email,
                 role: userWithProfile.role,
             },
             // Return fetched data, defaulting to empty array if relation is null/undefined somehow
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


// --- Add Qualification Action (Can be potentially removed later if updateMyProfile handles everything) ---
interface AddQualificationResponse {
    success: boolean;
    qualification?: AcademicQualification; // Return the created qualification on success
    error?: string;
}

// Accepts FormData for file uploads
export async function addMyQualification(
    formData: FormData
): Promise<AddQualificationResponse> {
    // 1. Get session and user ID
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    // 2. Extract data from FormData
    const degree = formData.get('degree') as string | null;
    const institution = formData.get('institution') as string | null;
    const program = formData.get('program') as string | null;
    const yearCompletedStr = formData.get('yearCompleted') as string | null;
    const diplomaFile = formData.get('diplomaFile') as File | null; // Get the file

    // 3. Basic Validation
    if (!degree || !institution || !program || !yearCompletedStr) {
        return { success: false, error: 'Missing required text fields' };
    }
    const yearCompleted = parseInt(yearCompletedStr, 10);
    if (isNaN(yearCompleted) || yearCompleted < 1900 || yearCompleted > new Date().getFullYear() + 5) {
        return { success: false, error: 'Invalid year completed' };
    }
     // Add file validation if needed (size, type - ideally do some on client too)
     const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB example limit
     const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
     if (diplomaFile && diplomaFile.size > MAX_FILE_SIZE) {
         return { success: false, error: `File size exceeds limit of ${MAX_FILE_SIZE / 1024 / 1024}MB.` };
     }
     if (diplomaFile && !ALLOWED_TYPES.includes(diplomaFile.type)) {
         return { success: false, error: 'Invalid file type. Allowed: PDF, PNG, JPG.' };
     }


    let fileUrl: string | undefined = undefined; // Initialize file path/URL

    try {
        // 4. Handle File Upload (if provided)
        if (diplomaFile && diplomaFile.size > 0) {
            console.log("Diploma file found:", diplomaFile.name, diplomaFile.size);
            const uploadDir = await ensureUploadDirExists('qualifications', userId); // Pass subdirectory
            const fileExtension = path.extname(diplomaFile.name);
            const uniqueFilename = `${uuidv4()}${fileExtension}`;
            const filePath = path.join(uploadDir, uniqueFilename);
            const fileBuffer = Buffer.from(await diplomaFile.arrayBuffer());
            await fs.writeFile(filePath, fileBuffer);
            console.log(`File saved locally to: ${filePath}`);
            fileUrl = `/uploads/qualifications/${userId}/${uniqueFilename}`;
            console.log(`Storing relative path: ${fileUrl}`);

        } else {
            console.log("No diploma file provided or file is empty.");
        }

        // 5. Create qualification in database
        const newQualification = await prisma.academicQualification.create({
            data: {
                degree, institution, program, yearCompleted, userId,
                diplomaFileUrl: fileUrl,
            },
        });

        // 6. Revalidate the profile page cache
        revalidatePath('/profile');
        console.log("Revalidated /profile path");


        return { success: true, qualification: newQualification };

    } catch (error) {
        console.error("Error adding academic qualification:", error);
         // TODO: Optionally delete the locally uploaded file if DB operation fails
        await safeDeleteFile(fileUrl); // Attempt to delete if DB fails after upload
        return { success: false, error: 'Failed to add qualification' };
    }
}


// --- Delete Qualification Action (Can be potentially removed later) ---
interface DeleteQualificationResponse {
    success: boolean;
    error?: string;
}

export async function deleteMyQualification(
    qualificationId: string // ID of the qualification to delete
): Promise<DeleteQualificationResponse> {
    // 1. Get session and user ID
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) { return { success: false, error: 'Not authenticated' }; }
    if (!qualificationId) { return { success: false, error: 'Qualification ID is required' }; }

    try {
        // 2. Find the qualification to ensure it belongs to the user AND get file path
        const qualification = await prisma.academicQualification.findUnique({
            where: { id: qualificationId, userId: userId }
        });

        if (!qualification) {
            console.warn(`Qualification ${qualificationId} not found or user ${userId} does not own it.`);
             return { success: false, error: 'Qualification not found or you do not have permission.' };
        }
        const filePathToDelete = qualification.diplomaFileUrl; // Get the stored path/URL

        // 3. Delete the qualification record from the database
        await prisma.academicQualification.delete({
            where: { id: qualificationId }
        });
         console.log(`Deleted qualification record ${qualificationId} for user ${userId}`);

        // 4. Delete the associated file from local storage (if path exists)
        await safeDeleteFile(filePathToDelete); // Use helper

        // 5. Revalidate the profile page cache
        revalidatePath('/profile');
        console.log("Revalidated /profile path after deletion");

        return { success: true };

    } catch (error) {
        console.error("Error deleting academic qualification:", error);
        return { success: false, error: 'Failed to delete qualification' };
    }
}


// --- Update Profile Action (Accepts FormData) ---
interface UpdateProfileResponse {
    success: boolean;
    error?: string;
}

export async function updateMyProfile(
    formData: FormData // <-- Accept FormData
): Promise<UpdateProfileResponse> {
    'use server';

    // 1. Authentication & Authorization
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;
    if (!userId) { return { success: false, error: 'Not authenticated' }; }
    console.log(`updateMyProfile called for user: ${userId}`);

    // 2. Extract and Parse Data from FormData
    const qualificationsJson = formData.get('academicQualifications_json') as string | null;
    let incomingQualifications: IncomingAcademicQualification[] = [];

    if (qualificationsJson) {
        try {
            incomingQualifications = JSON.parse(qualificationsJson);
            if (!Array.isArray(incomingQualifications)) { throw new Error("Parsed academic qualifications is not an array."); }
        } catch (e: any) {
            console.error("Error parsing academicQualifications_json:", e);
            return { success: false, error: "Invalid data format received." };
        }
    } else {
        console.log("No academic qualifications JSON data provided in form data.");
        // If ONLY this section is handled, this might be an error. If multiple sections, maybe okay.
    }

    // TODO: Extract other sections (e.g., professionalLicenses_json) similarly

    // --- Temporary storage for file operations outside transaction ---
    let filesToDelete: (string | null | undefined)[] = [];
    let createdFileUrls: { tempId: string, url: string }[] = []; // Store temp ID and final URL

    try {
        const result = await prisma.$transaction(async (tx) => {
            // --- Process Academic Qualifications ---
            const currentQualifications = await tx.academicQualification.findMany({
                where: { userId: userId },
                select: { id: true, diplomaFileUrl: true }
            });
            const currentQualificationIds = new Set(currentQualifications.map(q => q.id));
            const currentQualificationMap = new Map(currentQualifications.map(q => [q.id, q]));

            const incomingQualificationIds = new Set(incomingQualifications.filter(q => !q._isNew).map(q => q.id));
            const qualificationIdsToDeleteInternal: string[] = []; // IDs to delete in DB

            // Identify items to delete (DB records)
            for (const currentQual of currentQualifications) {
                if (!incomingQualificationIds.has(currentQual.id)) {
                    qualificationIdsToDeleteInternal.push(currentQual.id);
                    filesToDelete.push(currentQual.diplomaFileUrl); // Add file path to delete list (for later)
                }
            }

            // Perform Deletions (DB only within transaction)
            if (qualificationIdsToDeleteInternal.length > 0) {
                console.log("Deleting qualification records:", qualificationIdsToDeleteInternal);
                await tx.academicQualification.deleteMany({
                    where: { id: { in: qualificationIdsToDeleteInternal }, userId: userId }
                });
            }

            // Perform Creations/Updates
            for (const incomingQual of incomingQualifications) {
                if (incomingQual._isNew) {
                    // --- Create New Item ---
                    if (!incomingQual.degree || !incomingQual.institution || !incomingQual.program || !incomingQual.yearCompleted) {
                         throw new Error(`Missing required fields for new qualification: ${JSON.stringify(incomingQual)}`);
                    }

                    // --- Handle File Upload ---
                    let newFileUrl: string | null = null;
                    const fileKey = `academicQualification_file_${incomingQual.id}`; // Key used in frontend
                    const file = formData.get(fileKey) as File | null;

                    if (file) {
                        console.log(`Processing file for new item ${incomingQual.id}: ${file.name}`);
                        // Perform actual file saving NOW (before DB create)
                        try {
                            const uploadDir = await ensureUploadDirExists('qualifications', userId);
                            const fileExtension = path.extname(file.name);
                            const uniqueFilename = `${uuidv4()}${fileExtension}`;
                            const filePath = path.join(uploadDir, uniqueFilename);
                            const fileBuffer = Buffer.from(await file.arrayBuffer());
                            await fs.writeFile(filePath, fileBuffer); // Save the file
                            newFileUrl = `/uploads/qualifications/${userId}/${uniqueFilename}`; // Relative URL path
                            console.log(`File saved for ${incomingQual.id}: ${newFileUrl}`);
                        } catch (uploadError: any) {
                            console.error(`Error uploading file for new qualification ${incomingQual.id}:`, uploadError);
                            throw new Error(`Failed to upload file for qualification: ${incomingQual.degree}`);
                        }
                    }

                    // Create record in DB
                    await tx.academicQualification.create({
                        data: {
                            degree: incomingQual.degree,
                            institution: incomingQual.institution,
                            program: incomingQual.program,
                            yearCompleted: incomingQual.yearCompleted,
                            diplomaFileUrl: newFileUrl, // Use the saved URL
                            userId: userId,
                        }
                    });
                     console.log(`Created qualification: ${incomingQual.degree}`);

                } else {
                    // --- Update Existing Item (Placeholder) ---
                     if (currentQualificationIds.has(incomingQual.id)) {
                         // TODO: Implement update logic here
                         console.log(`Item ${incomingQual.id} exists. Update logic needed.`);
                     } else {
                         console.warn(`Incoming existing qualification ID ${incomingQual.id} not found in DB. Skipping.`);
                     }
                }
            }

            // --- TODO: Process other sections similarly ---

            return { success: true }; // Return success from transaction block
        }); // End transaction

        // --- Perform File Deletions (Outside Transaction, after success) ---
        if (result.success && filesToDelete.length > 0) {
            console.log("Attempting to delete files for removed records:", filesToDelete);
            for (const fileUrl of filesToDelete) {
                await safeDeleteFile(fileUrl); // Use helper function
            }
        }

        // Revalidate Path if successful
        if (result.success) {
            revalidatePath('/profile');
            console.log("Profile revalidated successfully.");
        }

        return { success: result.success };

    } catch (error: any) {
        console.error("Error updating profile:", error);
        // If an error occurred during file upload or DB operation within the transaction,
        // the transaction should have rolled back. We might still have uploaded files
        // from *before* the failing operation. Implementing cleanup for partial uploads
        // during transaction failure is complex and might require tracking uploads before DB ops.
        // For now, log the error and return failure.
        return { success: false, error: error.message || 'Failed to update profile data' };
    }
}
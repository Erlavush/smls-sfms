// src/lib/userActions.ts
'use server'; // Mark this file as containing Server Actions

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust path if needed
import prisma from '@/lib/prisma';
// Import types from the correct generated location
import type {
    User, // Keep User if needed
    AcademicQualification,
    ProfessionalLicense,
    WorkExperience,
    ProfessionalAffiliation,
    AwardRecognition,
    ProfessionalDevelopment,
    CommunityInvolvement,
    Publication,
    ConferencePresentation
 } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises'; // Import Node.js file system promises API
import path from 'path';     // Import Node.js path module
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

// --- Helper Function to ensure upload directory exists ---
async function ensureUploadDirExists(subDir: string, userId: string): Promise<string> {
    // Create a user-specific directory path within public/uploads/<subDir>
    const userDirPath = path.join(process.cwd(), 'public', 'uploads', subDir, userId);
    try {
        await fs.mkdir(userDirPath, { recursive: true }); // Create directory if it doesn't exist
        console.log(`Ensured directory exists: ${userDirPath}`);
        return userDirPath;
    } catch (error) {
        console.error(`Error creating upload directory (${subDir}):`, error);
        throw new Error(`Could not create upload directory for ${subDir}.`); // Re-throw error
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


// --- Add Qualification Action ---
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

            // Ensure user's upload directory exists
            const uploadDir = await ensureUploadDirExists('qualifications', userId); // Pass subdirectory

            // Generate a unique filename
            const fileExtension = path.extname(diplomaFile.name);
            const uniqueFilename = `${uuidv4()}${fileExtension}`;
            const filePath = path.join(uploadDir, uniqueFilename);

            // Convert file buffer for saving
            const fileBuffer = Buffer.from(await diplomaFile.arrayBuffer());

            // Save the file locally
            await fs.writeFile(filePath, fileBuffer);
            console.log(`File saved locally to: ${filePath}`);

            // Store the RELATIVE path for accessing via URL later
            // IMPORTANT: Use forward slashes for URL paths
            fileUrl = `/uploads/qualifications/${userId}/${uniqueFilename}`;
            console.log(`Storing relative path: ${fileUrl}`);

        } else {
            console.log("No diploma file provided or file is empty.");
        }

        // 5. Create qualification in database
        const newQualification = await prisma.academicQualification.create({
            data: {
                degree,
                institution,
                program,
                yearCompleted,
                userId, // Link to the logged-in user
                diplomaFileUrl: fileUrl, // Save the relative path or null/undefined
            },
        });

        // 6. Revalidate the profile page cache
        revalidatePath('/profile');
        console.log("Revalidated /profile path");


        return { success: true, qualification: newQualification };

    } catch (error) {
        console.error("Error adding academic qualification:", error);
         // TODO: Optionally delete the locally uploaded file if DB operation fails
        return { success: false, error: 'Failed to add qualification' };
    }
}


// --- Delete Qualification Action ---

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

    if (!userId) {
        return { success: false, error: 'Not authenticated' };
    }

    if (!qualificationId) {
        return { success: false, error: 'Qualification ID is required' };
    }

    try {
        // 2. Find the qualification to ensure it belongs to the user AND get file path
        // Use prisma instance imported at the top
        const qualification = await prisma.academicQualification.findUnique({
            where: {
                id: qualificationId,
                userId: userId // Ensure user owns this record directly in the query
            },
        });

        // Check if qualification exists (and belongs to user implicitly due to where clause)
        if (!qualification) {
            console.warn(`Qualification ${qualificationId} not found or user ${userId} does not own it.`);
             return { success: false, error: 'Qualification not found or you do not have permission.' };
        }

        const filePathToDelete = qualification.diplomaFileUrl; // Get the stored path/URL

        // 3. Delete the qualification record from the database
        // Use prisma instance imported at the top
        await prisma.academicQualification.delete({
            where: {
                id: qualificationId,
                // Optional: userId check again if needed, but covered by findUnique above
            },
        });
         console.log(`Deleted qualification record ${qualificationId} for user ${userId}`);

        // 4. Delete the associated file from local storage (if path exists)
        if (filePathToDelete) {
             try {
                // Construct the full local path from the relative URL path stored
                if (filePathToDelete.startsWith('/uploads/')) {
                     const localFilePath = path.join(process.cwd(), 'public', filePathToDelete);
                     // Check if file exists before trying to delete
                     try {
                         await fs.access(localFilePath); // Check existence
                         await fs.unlink(localFilePath); // Delete the file
                         console.log(`Deleted associated file: ${localFilePath}`);
                     } catch (accessError: any) {
                          console.warn(`File not found or inaccessible, skipping delete: ${localFilePath} - Error: ${accessError.message}`);
                     }
                } else {
                     console.warn(`Skipping file deletion for non-local path pattern: ${filePathToDelete}`);
                }
             } catch (fileError: any) {
                // Log error if file deletion fails, but don't fail the overall action
                console.error(`Error deleting file ${filePathToDelete}:`, fileError.message);
             }
        }

        // 5. Revalidate the profile page cache
        revalidatePath('/profile');
        console.log("Revalidated /profile path after deletion");

        return { success: true };

    } catch (error) {
        console.error("Error deleting academic qualification:", error);
        return { success: false, error: 'Failed to delete qualification' };
    }
}

// --- Placeholder for Update Profile Action (handles save changes) ---
// export async function updateMyProfile(changes: /* Define a complex type for changes */) {
//    'use server';
//    // 1. Get User ID
//    // 2. Use prisma.$transaction to perform multiple creates, updates, deletes
//    // 3. Handle file uploads/deletions within transaction if possible or carefully sequence
//    // 4. Revalidate paths
//    // 5. Return success/error
// }
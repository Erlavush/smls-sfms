// src/lib/adminActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { ItemType } from '@/types'; // Import ItemType
import { Role, // Import Role enum
         // Import Prisma types for the return value definition
         User, AcademicQualification, ProfessionalLicense, WorkExperience,
         ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
         CommunityInvolvement, Publication, ConferencePresentation
       } from '@/generated/prisma';
import bcrypt from 'bcrypt'; // <-- Import bcrypt
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

// --- Action: Get All Faculty Users ---
// NEW ACTION ADDED HERE
export async function getAllFaculty() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== 'ADMIN') {
        return { success: false, error: 'Unauthorized', faculty: [] };
    }

    try {
        const facultyUsers = await prisma.user.findMany({
            where: {
                role: Role.FACULTY, // Use the Role enum
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true, // Include creation date for potential sorting/display
            },
            orderBy: {
                name: 'asc', // Order alphabetically by name
            },
        });

        return { success: true, faculty: facultyUsers };

    } catch (error: any) {
        console.error("Error fetching faculty list:", error);
        return { success: false, error: 'Failed to fetch faculty list.', faculty: [] };
    }
}
// --- END NEW ACTION ---

// --- *** NEW ACTION: Get Faculty Profile By ID *** ---
interface FacultyProfileData {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        role: Role | null; // Use Role enum
        createdAt: Date; // Include createdAt for context
    };
    academicQualifications: AcademicQualification[];
    professionalLicenses: ProfessionalLicense[];
    workExperiences: WorkExperience[];
    professionalAffiliations: ProfessionalAffiliation[];
    awardsRecognitions: AwardRecognition[];
    professionalDevelopments: ProfessionalDevelopment[];
    communityInvolvements: CommunityInvolvement[];
    publications: Publication[];
    conferencePresentations: ConferencePresentation[];
}

interface GetFacultyProfileResponse {
    success: boolean;
    facultyProfile?: FacultyProfileData;
    error?: string;
}

export async function getFacultyProfileById(facultyId: string): Promise<GetFacultyProfileResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization Check: Ensure the caller is an Admin
    if (userRole !== Role.ADMIN) { // Use Role enum
        console.warn(`Unauthorized attempt to fetch faculty profile by non-admin. User role: ${userRole}`);
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Input Validation: Ensure facultyId is provided
    if (!facultyId || typeof facultyId !== 'string') {
        console.error('getFacultyProfileById called without a valid facultyId.');
        return { success: false, error: 'Invalid Faculty ID provided.' };
    }

    console.log(`Admin fetching profile for faculty ID: ${facultyId}`);

    try {
        // 3. Database Query: Fetch the user and all related profile data
        const facultyUser = await prisma.user.findUnique({
            where: {
                id: facultyId,
                // Optional: Ensure we only fetch users with the FACULTY role
                // role: Role.FACULTY,
            },
            include: {
                // Include all the relations, similar to getMyProfileData
                academicQualifications: { orderBy: { yearCompleted: 'desc' } },
                professionalLicenses: { orderBy: { expiration: 'desc' } },
                workExperiences: { orderBy: { createdAt: 'desc' } }, // Consider ordering by inclusiveYears if possible/needed
                professionalAffiliations: { orderBy: { createdAt: 'desc' } },
                awardsRecognitions: { orderBy: { yearReceived: 'desc' } },
                professionalDevelopments: { orderBy: { createdAt: 'desc' } }, // Consider ordering by dateLocation if possible/needed
                communityInvolvements: { orderBy: { createdAt: 'desc' } }, // Consider ordering by locationDate if possible/needed
                publications: { orderBy: { datePublished: 'desc' } },
                conferencePresentations: { orderBy: { createdAt: 'desc' } }, // Consider ordering by dateLocation if possible/needed
            },
        });

        // 4. Handle Not Found
        if (!facultyUser) {
            console.warn(`Faculty profile not found for ID: ${facultyId}`);
            return { success: false, error: 'Faculty member not found.' };
        }

        // Optional: Check if the found user is actually faculty, if strictness is needed
        // if (facultyUser.role !== Role.FACULTY) {
        //     console.warn(`User found with ID ${facultyId}, but is not a FACULTY member (Role: ${facultyUser.role}).`);
        //     return { success: false, error: 'Specified user is not a faculty member.' };
        // }

        // 5. Structure and Return Success Response
        const profileData: FacultyProfileData = {
            user: {
                id: facultyUser.id,
                name: facultyUser.name,
                email: facultyUser.email,
                role: facultyUser.role,
                createdAt: facultyUser.createdAt,
            },
            // Use nullish coalescing to ensure arrays are always returned
            academicQualifications: facultyUser.academicQualifications ?? [],
            professionalLicenses: facultyUser.professionalLicenses ?? [],
            workExperiences: facultyUser.workExperiences ?? [],
            professionalAffiliations: facultyUser.professionalAffiliations ?? [],
            awardsRecognitions: facultyUser.awardsRecognitions ?? [],
            professionalDevelopments: facultyUser.professionalDevelopments ?? [],
            communityInvolvements: facultyUser.communityInvolvements ?? [],
            publications: facultyUser.publications ?? [],
            conferencePresentations: facultyUser.conferencePresentations ?? [],
        };

        console.log(`Successfully fetched profile for faculty: ${facultyUser.email}`);
        return { success: true, facultyProfile: profileData };

    } catch (error: any) {
        // 6. Handle Errors
        console.error(`Error fetching faculty profile for ID ${facultyId}:`, error);
        return { success: false, error: `Failed to fetch faculty profile. ${error.message}` };
    }
}
// --- *** END NEW ACTION *** ---

// --- *** NEW ACTION: Create Faculty User *** ---
interface CreateFacultyResponse {
    success: boolean;
    error?: string;
    user?: { id: string; email: string | null }; // Return basic info of created user
}

export async function createFacultyUser(formData: FormData): Promise<CreateFacultyResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization Check
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Extract Data from FormData
    const name = formData.get('name') as string | null; // Name is optional initially
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;

    // 3. Basic Input Validation
    if (!email || typeof email !== 'string') {
        return { success: false, error: 'Email is required and must be a string.' };
    }
    if (!password || typeof password !== 'string') {
        return { success: false, error: 'Password is required and must be a string.' };
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
        return { success: false, error: 'Invalid email format.' };
    }
    // Basic password length check (adjust as needed)
    if (password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long.' };
    }
    // Optional: Validate name if provided
    if (name && typeof name !== 'string') {
         return { success: false, error: 'Name must be a string if provided.' };
    }


    try {
        // 4. Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return { success: false, error: 'Email address is already in use.' };
        }

        // 5. Hash the password
        const saltRounds = 10; // Standard practice
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 6. Create User in Database
        const newUser = await prisma.user.create({
            data: {
                name: name?.trim() || null, // Store trimmed name or null
                email: email.toLowerCase().trim(), // Store lowercase, trimmed email
                password: hashedPassword,
                role: Role.FACULTY, // Assign the FACULTY role
                // emailVerified: null, // Set if you implement email verification later
            },
            select: { // Only select necessary fields to return
                id: true,
                email: true,
            }
        });

        console.log(`Admin created new faculty user: ${newUser.email} (ID: ${newUser.id})`);

        // 7. Revalidate Path to update the faculty list page
        revalidatePath('/admin/faculty');

        // 8. Return Success Response
        return { success: true, user: newUser };

    } catch (error: any) {
        // 9. Handle Errors (e.g., database connection issues)
        console.error("Error creating faculty user:", error);
        // Avoid exposing detailed database errors to the client
        if (error.code === 'P2002') { // Prisma unique constraint violation code
             return { success: false, error: 'Email address is already in use.' };
        }
        return { success: false, error: `Failed to create faculty user. ${error.message}` };
    }
}
// --- *** END NEW ACTION *** ---

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
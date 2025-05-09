// src/lib/actions/facultyActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Role, // Import Role enum
         // Import Prisma types for the return value definition
         User, AcademicQualification, ProfessionalLicense, WorkExperience,
         ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment, Specialization,
         CommunityInvolvement, Publication, ConferencePresentation,
         Course // <-- ADD THIS LINE
       } from '@/generated/prisma';
import bcrypt from 'bcrypt';

// Define Match Strength Type
type CourseMatchStrength = 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';

// --- Action: Get All Faculty Users ---
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

// --- Get Faculty Profile By ID ---
interface FacultyProfileData {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        role: Role | null; // Use Role enum
        createdAt: Date; // Include createdAt for context
        // Add the specializations array here
        specializations: Specialization[]; // Keep this raw data
    };
    potentialCourses: (Course & {
        requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
        matchStrength: CourseMatchStrength; // <-- ADD THIS
    })[];
    suggestedTeachingAreas: string[]; // Array of specialization names
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

    console.log(`Admin fetching profile (including specializations for suggestions) for faculty ID: ${facultyId}`);

    try {
        // 3. Database Query: Fetch the user and all related profile data
        const facultyUser = await prisma.user.findUnique({
            where: {
                id: facultyId,
                // Optional: Ensure we only fetch users with the FACULTY role
                // role: Role.FACULTY,
            },
            include: {
                // --- Ensure specializations is included ---
                specializations: { // Fetch linked specializations
                    orderBy: { name: 'asc' } // Order them alphabetically
                },
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

        // --- *** NEW: Fetch all courses and their required specializations *** ---
        const allCourses = await prisma.course.findMany({
            include: {
                requiredSpecializations: { select: { id: true, name: true } } // Fetch names of required specializations
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

        // --- *** MODIFY Structuring the Response *** ---
        // Extract specialization names for the suggestions
        const specializationNames = (facultyUser.specializations ?? []).map(spec => spec.name);
        const facultySpecializationIds = new Set((facultyUser.specializations ?? []).map(spec => spec.id));

        // --- *** NEW: Determine potential courses AND THEIR MATCH STRENGTH for the faculty member *** ---
        const potentialCoursesList: (Course & {
            requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
            matchStrength: CourseMatchStrength;
        })[] = [];

        if (facultySpecializationIds.size > 0 || allCourses.some(c => !c.requiredSpecializations || c.requiredSpecializations.length === 0)) { // Consider courses with no required specs
            allCourses.forEach(course => {
                let matchStrength: CourseMatchStrength = 'NO_MATCH'; // Default
                let facultyHasAtLeastOneRequiredSpec = false;
                let facultyHasAllRequiredSpecs = true; // Assume true until a missing one is found

                if (!course.requiredSpecializations || course.requiredSpecializations.length === 0) {
                    // If a course has NO required specializations, any faculty is technically a "full match" for teaching it based on specialization criteria alone.
                    // Or, you might decide such courses aren't "suggested" based on specialization. For now, let's call it a full match.
                    matchStrength = 'FULL_MATCH';
                    potentialCoursesList.push({ ...course, matchStrength });
                    return; // Move to next course
                }

                // Check against the course's required specializations
                for (const reqSpec of course.requiredSpecializations) {
                    if (facultySpecializationIds.has(reqSpec.id)) {
                        facultyHasAtLeastOneRequiredSpec = true;
                        // Keep checking for 'facultyHasAllRequiredSpecs'
                    } else {
                        facultyHasAllRequiredSpecs = false; // Found a required spec the faculty doesn't have
                    }
                }

                if (facultyHasAllRequiredSpecs) {
                    matchStrength = 'FULL_MATCH';
                } else if (facultyHasAtLeastOneRequiredSpec) {
                    matchStrength = 'PARTIAL_MATCH';
                }
                // Else, it remains 'NO_MATCH' (faculty has none of the required specs)

                // Only add to potential list if there's at least a partial match
                if (matchStrength === 'FULL_MATCH' || matchStrength === 'PARTIAL_MATCH') {
                    potentialCoursesList.push({ ...course, matchStrength });
                }
            });
        }

        // 5. Structure and Return Success Response
        const profileData: FacultyProfileData = {
            user: {
                id: facultyUser.id,
                name: facultyUser.name,
                email: facultyUser.email,
                role: facultyUser.role,
                createdAt: facultyUser.createdAt,
                specializations: facultyUser.specializations ?? [], // Keep original data if needed elsewhere
            },
            suggestedTeachingAreas: specializationNames,
            potentialCourses: potentialCoursesList.sort((a, b) => a.name.localeCompare(b.name)), // <-- ADD/MODIFY THIS LINE
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
        // --- *** END MODIFICATION *** ---

        console.log(`Successfully fetched profile for faculty: ${facultyUser.email}, Suggested Areas: ${specializationNames.join(', ')}`);
        return { success: true, facultyProfile: profileData };

    } catch (error: any) {
        // 6. Handle Errors
        console.error(`Error fetching faculty profile for ID ${facultyId}:`, error);
        return { success: false, error: `Failed to fetch faculty profile. ${error.message}` };
    }
}

// --- Create Faculty User ---
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

// --- Delete Faculty User ---
interface DeleteUserResponse {
    success: boolean;
    error?: string;
}

export async function deleteFacultyUser(facultyId: string): Promise<DeleteUserResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const currentUserId = (session?.user as any)?.id; // Get current admin's ID

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Validation
    if (!facultyId || typeof facultyId !== 'string') {
        return { success: false, error: 'Faculty ID is missing or invalid.' };
    }

    // 3. Prevent Self-Deletion
    if (facultyId === currentUserId) {
        return { success: false, error: 'Administrators cannot delete their own account.' };
    }

    console.log(`Admin (ID: ${currentUserId}) attempting to delete faculty user ID: ${facultyId}`);

    try {
        // 4. Verify the user exists and is indeed a Faculty member (optional but good practice)
        const userToDelete = await prisma.user.findUnique({
            where: { id: facultyId },
            select: { role: true, email: true } // Select only needed fields for check
        });

        if (!userToDelete) {
            // User already deleted or never existed
            console.warn(`Attempted to delete non-existent user ID: ${facultyId}. Assuming success.`);
            revalidatePath('/admin/faculty'); // Revalidate list anyway
            return { success: true };
        }

        // Optional: Strict check to prevent deleting non-faculty users via this action
        // if (userToDelete.role !== Role.FACULTY) {
        //     return { success: false, error: 'Specified user is not a faculty member.' };
        // }

        // 5. Delete the User
        // Prisma's `onDelete: Cascade` in the schema for relations on the User model
        // (like AcademicQualification, ProfessionalLicense, etc.) will automatically
        // delete all associated CV records when the user is deleted.
        // The many-to-many link with Specialization will also be removed.
        await prisma.user.delete({
            where: { id: facultyId },
        });

        console.log(`Successfully deleted user ID: ${facultyId} (Email: ${userToDelete.email})`);

        // 6. Revalidate the faculty list path
        revalidatePath('/admin/faculty');

        // 7. Return Success
        return { success: true };

    } catch (error: any) {
        console.error(`Error deleting user ${facultyId}:`, error);
        if (error.code === 'P2025') { // Record to delete not found (already handled above, but good fallback)
            console.warn(`Record not found during deletion attempt for user ID: ${facultyId}. Assuming success.`);
            revalidatePath('/admin/faculty');
            return { success: true };
        }
        // Avoid exposing detailed errors
        return { success: false, error: 'Failed to delete faculty user.' };
    }
}

// --- Link Specialization to Faculty ---
interface LinkResponse {
    success: boolean;
    error?: string;
}

export async function linkSpecializationToFaculty(facultyId: string, specializationId: string): Promise<LinkResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Validation
    if (!facultyId || !specializationId) {
        return { success: false, error: 'Faculty ID and Specialization ID are required.' };
    }

    console.log(`Admin linking Specialization ${specializationId} to Faculty ${facultyId}`);

    try {
        // 3. Database Update using connect
        await prisma.user.update({
            where: { id: facultyId },
            data: {
                specializations: {
                    connect: { // Use 'connect' for many-to-many
                        id: specializationId
                    }
                }
            },
        });

        console.log(`Successfully linked Specialization ${specializationId} to Faculty ${facultyId}`);

        // 4. Revalidate relevant paths (faculty profile page)
        revalidatePath(`/admin/faculty/${facultyId}`);
        revalidatePath('/admin/matrix'); // Matrix data might change

        return { success: true };

    } catch (error: any) {
        console.error(`Error linking specialization ${specializationId} to faculty ${facultyId}:`, error);
        // Handle specific errors like record not found if needed
        if (error.code === 'P2025') { // Record to update not found
             return { success: false, error: 'Faculty member or Specialization not found.' };
        }
        if (error.code === 'P2016') { // Relation violation (might happen if already connected)
             console.warn(`Attempted to link already linked specialization ${specializationId} to faculty ${facultyId}. Assuming success.`);
             return { success: true }; // Treat as success if already linked
        }
        return { success: false, error: `Failed to link specialization. ${error.message}` };
    }
}

// --- Unlink Specialization from Faculty ---
export async function unlinkSpecializationFromFaculty(facultyId: string, specializationId: string): Promise<LinkResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Validation
    if (!facultyId || !specializationId) {
        return { success: false, error: 'Faculty ID and Specialization ID are required.' };
    }

    console.log(`Admin unlinking Specialization ${specializationId} from Faculty ${facultyId}`);

    try {
        // 3. Database Update using disconnect
        await prisma.user.update({
            where: { id: facultyId },
            data: {
                specializations: {
                    disconnect: { // Use 'disconnect' for many-to-many
                        id: specializationId
                    }
                }
            },
        });

        console.log(`Successfully unlinked Specialization ${specializationId} from Faculty ${facultyId}`);

        // 4. Revalidate relevant paths
        revalidatePath(`/admin/faculty/${facultyId}`);
        revalidatePath('/admin/matrix');

        return { success: true };

    } catch (error: any) {
        console.error(`Error unlinking specialization ${specializationId} from faculty ${facultyId}:`, error);
         if (error.code === 'P2025') { // Record to update not found or relation doesn't exist
             console.warn(`Attempted to unlink non-existent link between specialization ${specializationId} and faculty ${facultyId}. Assuming success.`);
             return { success: true }; // Treat as success if already unlinked or records don't exist
         }
        return { success: false, error: `Failed to unlink specialization. ${error.message}` };
    }
}
// --- *** NEW ACTION: Update Faculty Name *** ---
interface UpdateFacultyNameResponse {
    success: boolean;
    user?: { id: string; name: string | null }; // Return updated basic info
    error?: string;
}

export async function updateFacultyName(formData: FormData): Promise<UpdateFacultyNameResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Extract Data
    const facultyId = formData.get('facultyId') as string | null;
    const newName = formData.get('name') as string | null;

    // 3. Validation
    if (!facultyId || typeof facultyId !== 'string') {
        return { success: false, error: 'Faculty ID is missing or invalid.' };
    }
    // Name can be empty string or null, but should be treated as null if empty
    const trimmedName = newName?.trim() || null;
     if (trimmedName && trimmedName.length > 255) { // Example length limit
         return { success: false, error: 'Name is too long.' };
     }

    console.log(`Admin attempting to update name for faculty ID: ${facultyId} to "${trimmedName}"`);

    try {
        // 4. Update in Database
        const updatedUser = await prisma.user.update({
            where: { id: facultyId },
            data: {
                name: trimmedName, // Update the name field
            },
            select: { // Select fields to return
                id: true,
                name: true,
            }
        });

        console.log(`Successfully updated name for user ID: ${updatedUser.id}`);

        // 5. Revalidate Paths
        revalidatePath(`/admin/faculty`); // Update the list view
        revalidatePath(`/admin/faculty/${facultyId}`); // Update the detail view

        // 6. Return Success
        return { success: true, user: updatedUser };

    } catch (error: any) {
        console.error(`Error updating name for faculty ${facultyId}:`, error);
        if (error.code === 'P2025') { // Record to update not found
            return { success: false, error: 'Faculty member not found.' };
        }
        return { success: false, error: 'Failed to update faculty name.' };
    }
}
// --- *** END Update Faculty Name ACTION *** ---
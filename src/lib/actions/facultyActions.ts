// src/lib/actions/facultyActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {
    Role,
    User, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment, Specialization,
    CommunityInvolvement, Publication, ConferencePresentation,
    Course,
    SocialMediaLink
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
                role: Role.FACULTY,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return { success: true, faculty: facultyUsers };

    } catch (error: any) {
        console.error("Error fetching faculty list:", error);
        return { success: false, error: 'Failed to fetch faculty list.', faculty: [] };
    }
}

// --- Get Faculty Profile By ID ---
// Updated interface to include new User fields
interface FacultyProfileData {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        role: Role | null;
        createdAt: Date;
        specializations: Specialization[];
        profileImageUrl: string | null;
        dateOfBirth: Date | null;
        civilStatus: string | null;
        nationality: string | null;
        contactNumber: string | null;
        address: string | null;
        employeeId: string | null;
        bio: string | null;
        socialMediaLinks: SocialMediaLink[];
    };
    potentialCourses: (Course & {
        requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
        matchStrength: CourseMatchStrength;
    })[];
    suggestedTeachingAreas: string[];
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

    if (userRole !== Role.ADMIN) {
        console.warn(`Unauthorized attempt to fetch faculty profile by non-admin. User role: ${userRole}`);
        return { success: false, error: 'Unauthorized' };
    }

    if (!facultyId || typeof facultyId !== 'string') {
        console.error('getFacultyProfileById called without a valid facultyId.');
        return { success: false, error: 'Invalid Faculty ID provided.' };
    }

    console.log(`Admin fetching profile (including specializations and new personal info) for faculty ID: ${facultyId}`);

    try {
        const facultyUser = await prisma.user.findUnique({
            where: {
                id: facultyId,
            },
            include: {
                specializations: { orderBy: { name: 'asc' } },
                academicQualifications: { orderBy: { yearCompleted: 'desc' } },
                professionalLicenses: { orderBy: { expiration: 'desc' } },
                workExperiences: { orderBy: { createdAt: 'desc' } },
                professionalAffiliations: { orderBy: { createdAt: 'desc' } },
                awardsRecognitions: { orderBy: { yearReceived: 'desc' } },
                professionalDevelopments: { orderBy: { createdAt: 'desc' } },
                communityInvolvements: { orderBy: { createdAt: 'desc' } },
                publications: { orderBy: { datePublished: 'desc' } },
                conferencePresentations: { orderBy: { createdAt: 'desc' } },
                socialMediaLinks: { orderBy: { platform: 'asc' } },
            },
        });

        const allCourses = await prisma.course.findMany({
            include: {
                requiredSpecializations: { select: { id: true, name: true } }
            },
        });

        if (!facultyUser) {
            console.warn(`Faculty profile not found for ID: ${facultyId}`);
            return { success: false, error: 'Faculty member not found.' };
        }

        const specializationNames = (facultyUser.specializations ?? []).map(spec => spec.name);
        const facultySpecializationIds = new Set((facultyUser.specializations ?? []).map(spec => spec.id));

        const potentialCoursesList: (Course & {
            requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
            matchStrength: CourseMatchStrength;
        })[] = [];

        if (facultySpecializationIds.size > 0 || allCourses.some(c => !c.requiredSpecializations || c.requiredSpecializations.length === 0)) {
            allCourses.forEach(course => {
                let matchStrength: CourseMatchStrength = 'NO_MATCH';
                let facultyHasAtLeastOneRequiredSpec = false;
                let facultyHasAllRequiredSpecs = true;

                if (!course.requiredSpecializations || course.requiredSpecializations.length === 0) {
                    matchStrength = 'FULL_MATCH';
                    potentialCoursesList.push({ ...course, matchStrength });
                    return;
                }

                for (const reqSpec of course.requiredSpecializations) {
                    if (facultySpecializationIds.has(reqSpec.id)) {
                        facultyHasAtLeastOneRequiredSpec = true;
                    } else {
                        facultyHasAllRequiredSpecs = false;
                    }
                }

                if (facultyHasAllRequiredSpecs) {
                    matchStrength = 'FULL_MATCH';
                } else if (facultyHasAtLeastOneRequiredSpec) {
                    matchStrength = 'PARTIAL_MATCH';
                }

                if (matchStrength === 'FULL_MATCH' || matchStrength === 'PARTIAL_MATCH') {
                    potentialCoursesList.push({ ...course, matchStrength });
                }
            });
        }

        const profileData: FacultyProfileData = {
            user: {
                id: facultyUser.id,
                name: facultyUser.name,
                email: facultyUser.email,
                role: facultyUser.role,
                createdAt: facultyUser.createdAt,
                specializations: facultyUser.specializations ?? [],
                profileImageUrl: facultyUser.profileImageUrl,
                dateOfBirth: facultyUser.dateOfBirth,
                civilStatus: facultyUser.civilStatus,
                nationality: facultyUser.nationality,
                contactNumber: facultyUser.contactNumber,
                address: facultyUser.address,
                employeeId: facultyUser.employeeId,
                bio: facultyUser.bio,
                socialMediaLinks: facultyUser.socialMediaLinks ?? [],
            },
            suggestedTeachingAreas: specializationNames,
            potentialCourses: potentialCoursesList.sort((a, b) => a.name.localeCompare(b.name)),
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

        console.log(`Successfully fetched profile for faculty: ${facultyUser.email}, Suggested Areas: ${specializationNames.join(', ')}`);
        return { success: true, facultyProfile: profileData };

    } catch (error: any) {
        console.error(`Error fetching faculty profile for ID ${facultyId}:`, error);
        return { success: false, error: `Failed to fetch faculty profile. ${error.message}` };
    }
}

// --- Create Faculty User ---
interface CreateFacultyResponse {
    success: boolean;
    error?: string;
    user?: { id: string; email: string | null };
}

export async function createFacultyUser(formData: FormData): Promise<CreateFacultyResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;

    if (!email || typeof email !== 'string') {
        return { success: false, error: 'Email is required and must be a string.' };
    }
    if (!password || typeof password !== 'string') {
        return { success: false, error: 'Password is required and must be a string.' };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return { success: false, error: 'Invalid email format.' };
    }
    if (password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long.' };
    }
    if (name && typeof name !== 'string') {
         return { success: false, error: 'Name must be a string if provided.' };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return { success: false, error: 'Email address is already in use.' };
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                name: name?.trim() || null,
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                role: Role.FACULTY,
                // Initially, new personal fields will be null
                profileImageUrl: null,
                dateOfBirth: null,
                civilStatus: null,
                nationality: null,
                contactNumber: null,
                address: null,
            },
            select: {
                id: true,
                email: true,
            }
        });

        console.log(`Admin created new faculty user: ${newUser.email} (ID: ${newUser.id})`);
        revalidatePath('/admin/faculty');
        return { success: true, user: newUser };

    } catch (error: any) {
        console.error("Error creating faculty user:", error);
        if (error.code === 'P2002') {
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
    const currentUserId = (session?.user as any)?.id;

    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }
    if (!facultyId || typeof facultyId !== 'string') {
        return { success: false, error: 'Faculty ID is missing or invalid.' };
    }
    if (facultyId === currentUserId) {
        return { success: false, error: 'Administrators cannot delete their own account.' };
    }

    console.log(`Admin (ID: ${currentUserId}) attempting to delete faculty user ID: ${facultyId}`);

    try {
        const userToDelete = await prisma.user.findUnique({
            where: { id: facultyId },
            select: { role: true, email: true }
        });

        if (!userToDelete) {
            console.warn(`Attempted to delete non-existent user ID: ${facultyId}. Assuming success.`);
            revalidatePath('/admin/faculty');
            return { success: true };
        }

        await prisma.user.delete({
            where: { id: facultyId },
        });

        console.log(`Successfully deleted user ID: ${facultyId} (Email: ${userToDelete.email})`);
        revalidatePath('/admin/faculty');
        return { success: true };

    } catch (error: any) {
        console.error(`Error deleting user ${facultyId}:`, error);
        if (error.code === 'P2025') {
            console.warn(`Record not found during deletion attempt for user ID: ${facultyId}. Assuming success.`);
            revalidatePath('/admin/faculty');
            return { success: true };
        }
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

    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }
    if (!facultyId || !specializationId) {
        return { success: false, error: 'Faculty ID and Specialization ID are required.' };
    }

    console.log(`Admin linking Specialization ${specializationId} to Faculty ${facultyId}`);

    try {
        await prisma.user.update({
            where: { id: facultyId },
            data: {
                specializations: {
                    connect: {
                        id: specializationId
                    }
                }
            },
        });

        console.log(`Successfully linked Specialization ${specializationId} to Faculty ${facultyId}`);
        revalidatePath(`/admin/faculty/${facultyId}`);
        revalidatePath('/admin/matrix');
        return { success: true };

    } catch (error: any) {
        console.error(`Error linking specialization ${specializationId} to faculty ${facultyId}:`, error);
        if (error.code === 'P2025') {
             return { success: false, error: 'Faculty member or Specialization not found.' };
        }
        if (error.code === 'P2016') {
             console.warn(`Attempted to link already linked specialization ${specializationId} to faculty ${facultyId}. Assuming success.`);
             return { success: true };
        }
        return { success: false, error: `Failed to link specialization. ${error.message}` };
    }
}

// --- Unlink Specialization from Faculty ---
export async function unlinkSpecializationFromFaculty(facultyId: string, specializationId: string): Promise<LinkResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }
    if (!facultyId || !specializationId) {
        return { success: false, error: 'Faculty ID and Specialization ID are required.' };
    }

    console.log(`Admin unlinking Specialization ${specializationId} from Faculty ${facultyId}`);

    try {
        await prisma.user.update({
            where: { id: facultyId },
            data: {
                specializations: {
                    disconnect: {
                        id: specializationId
                    }
                }
            },
        });

        console.log(`Successfully unlinked Specialization ${specializationId} from Faculty ${facultyId}`);
        revalidatePath(`/admin/faculty/${facultyId}`);
        revalidatePath('/admin/matrix');
        return { success: true };

    } catch (error: any) {
        console.error(`Error unlinking specialization ${specializationId} from faculty ${facultyId}:`, error);
         if (error.code === 'P2025') {
             console.warn(`Attempted to unlink non-existent link between specialization ${specializationId} and faculty ${facultyId}. Assuming success.`);
             return { success: true };
         }
        return { success: false, error: `Failed to unlink specialization. ${error.message}` };
    }
}

// --- Update Faculty Name ---
interface UpdateFacultyNameResponse {
    success: boolean;
    user?: { id: string; name: string | null };
    error?: string;
}

export async function updateFacultyName(formData: FormData): Promise<UpdateFacultyNameResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    const facultyId = formData.get('facultyId') as string | null;
    const newName = formData.get('name') as string | null;

    if (!facultyId || typeof facultyId !== 'string') {
        return { success: false, error: 'Faculty ID is missing or invalid.' };
    }
    const trimmedName = newName?.trim() || null;
     if (trimmedName && trimmedName.length > 255) {
         return { success: false, error: 'Name is too long.' };
     }

    console.log(`Admin attempting to update name for faculty ID: ${facultyId} to "${trimmedName}"`);

    try {
        const updatedUser = await prisma.user.update({
            where: { id: facultyId },
            data: {
                name: trimmedName,
            },
            select: {
                id: true,
                name: true,
            }
        });

        console.log(`Successfully updated name for user ID: ${updatedUser.id}`);
        revalidatePath(`/admin/faculty`);
        revalidatePath(`/admin/faculty/${facultyId}`);
        return { success: true, user: updatedUser };

    } catch (error: any) {
        console.error(`Error updating name for faculty ${facultyId}:`, error);
        if (error.code === 'P2025') {
            return { success: false, error: 'Faculty member not found.' };
        }
        return { success: false, error: 'Failed to update faculty name.' };
    }
}
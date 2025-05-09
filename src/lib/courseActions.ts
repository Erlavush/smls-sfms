// src/lib/actions/courseActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Role, type Course, type Specialization } from '@/generated/prisma'; // Import Role, Course, Specialization types
import { z } from 'zod'; // For input validation

// --- Zod Schema for Course Validation ---
const CourseSchema = z.object({
  name: z.string().min(1, { message: "Course name is required." }).max(191),
  code: z.string().max(50).optional().nullable(), // Optional, but if provided, max 50 chars
  description: z.string().optional().nullable(),
  // Array of specialization IDs (strings)
  specializationIds: z.array(z.string().cuid({ message: "Invalid specialization ID." })).optional(),
});


// --- Response Types ---
interface CourseResponse {
    success: boolean;
    course?: Course & { requiredSpecializations?: Pick<Specialization, 'id' | 'name'>[] }; // Include basic spec info
    error?: string;
}

interface CoursesResponse {
    success: boolean;
    courses?: (Course & { requiredSpecializations?: Pick<Specialization, 'id' | 'name'>[] })[];
    error?: string;
}

interface SimpleSuccessResponse {
    success: boolean;
    error?: string;
}


// --- Action: Create Course ---
export async function createCourse(formData: FormData): Promise<CourseResponse> {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    const rawFormData = {
        name: formData.get('name'),
        code: formData.get('code') || null, // Handle empty string as null
        description: formData.get('description') || null,
        // specializationIds might come as a comma-separated string or multiple entries
        // For simplicity, assume frontend sends it as JSON stringified array if complex, or handle multiple form entries
        // Let's assume it's sent as a JSON string for now for easier handling of array
        specializationIds: JSON.parse(formData.get('specializationIds') as string || '[]') as string[],
    };

    const validationResult = CourseSchema.safeParse(rawFormData);
    if (!validationResult.success) {
        console.error("Create course validation error:", validationResult.error.flatten());
        return { success: false, error: validationResult.error.errors.map(e => e.message).join(', ') };
    }
    const { name, code, description, specializationIds } = validationResult.data;

    try {
        // Check for existing course name or code (if code is provided and meant to be unique)
        const existingByName = await prisma.course.findUnique({ where: { name } });
        if (existingByName) return { success: false, error: `Course with name "${name}" already exists.` };
        if (code) {
            const existingByCode = await prisma.course.findUnique({ where: { code } });
            if (existingByCode) return { success: false, error: `Course with code "${code}" already exists.` };
        }

        const newCourse = await prisma.course.create({
            data: {
                name,
                code,
                description,
                requiredSpecializations: specializationIds && specializationIds.length > 0
                    ? { connect: specializationIds.map(id => ({ id })) }
                    : undefined,
            },
            include: { requiredSpecializations: { select: { id: true, name: true } } }
        });
        revalidatePath('/admin/courses'); // Revalidate the courses list page
        return { success: true, course: newCourse };
    } catch (error: any) {
        console.error("Error creating course:", error);
        return { success: false, error: `Failed to create course. ${error.message}` };
    }
}

// --- Action: Get All Courses ---
export async function getCourses(): Promise<CoursesResponse> {
    // No admin check here as faculty might need to see course lists in future?
    // Or add admin check if strictly admin-only view for now.
    // For now, let's assume public or at least authenticated view.
    // const session = await getServerSession(authOptions);
    // if (!session) return { success: false, error: 'Unauthorized' };

    try {
        const courses = await prisma.course.findMany({
            orderBy: { name: 'asc' },
            include: {
                requiredSpecializations: {
                    select: { id: true, name: true }, // Select only id and name
                    orderBy: { name: 'asc' }
                }
            }
        });
        return { success: true, courses };
    } catch (error: any) {
        console.error("Error fetching courses:", error);
        return { success: false, error: 'Failed to fetch courses.' };
    }
}

// --- Action: Get Course By ID (Example, might not be needed if edit form fetches all) ---
export async function getCourseById(id: string): Promise<CourseResponse> {
     const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }
    if (!id) return { success: false, error: "Course ID is required." };

    try {
        const course = await prisma.course.findUnique({
            where: { id },
            include: { requiredSpecializations: { select: { id: true, name: true }, orderBy: {name: 'asc'} } }
        });
        if (!course) return { success: false, error: 'Course not found.' };
        return { success: true, course };
    } catch (error: any) {
        console.error(`Error fetching course ${id}:`, error);
        return { success: false, error: 'Failed to fetch course.' };
    }
}


// --- Action: Update Course ---
export async function updateCourse(courseId: string, formData: FormData): Promise<CourseResponse> {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    if (!courseId) return { success: false, error: "Course ID is required for update." };

    const rawFormData = {
        name: formData.get('name'),
        code: formData.get('code') || null,
        description: formData.get('description') || null,
        specializationIds: JSON.parse(formData.get('specializationIds') as string || '[]') as string[],
    };

    const validationResult = CourseSchema.safeParse(rawFormData);
    if (!validationResult.success) {
        console.error("Update course validation error:", validationResult.error.flatten());
        return { success: false, error: validationResult.error.errors.map(e => e.message).join(', ') };
    }
    const { name, code, description, specializationIds } = validationResult.data;

    try {
        // Check for existing course name or code (excluding current course)
        const existingByName = await prisma.course.findFirst({ where: { name, id: { not: courseId } } });
        if (existingByName) return { success: false, error: `Another course with name "${name}" already exists.` };
        if (code) {
            const existingByCode = await prisma.course.findFirst({ where: { code, id: { not: courseId } } });
            if (existingByCode) return { success: false, error: `Another course with code "${code}" already exists.` };
        }

        const updatedCourse = await prisma.course.update({
            where: { id: courseId },
            data: {
                name,
                code,
                description,
                // 'set' will replace all existing links with the new set of specialization IDs
                requiredSpecializations: specializationIds && specializationIds.length > 0
                    ? { set: specializationIds.map(id => ({ id })) }
                    : { set: [] }, // If empty array passed, disconnect all
            },
            include: { requiredSpecializations: { select: { id: true, name: true } } }
        });
        revalidatePath('/admin/courses');
        revalidatePath('/admin/faculty'); // Faculty detail pages might show potential courses
        return { success: true, course: updatedCourse };
    } catch (error: any) {
        console.error(`Error updating course ${courseId}:`, error);
        if (error.code === 'P2025') return { success: false, error: "Course not found for update." };
        return { success: false, error: `Failed to update course. ${error.message}` };
    }
}

// --- Action: Delete Course ---
export async function deleteCourse(courseId: string): Promise<SimpleSuccessResponse> {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    if (!courseId) return { success: false, error: "Course ID is required for deletion." };

    try {
        // Prisma will automatically handle disconnecting relations in the join table.
        await prisma.course.delete({
            where: { id: courseId },
        });
        revalidatePath('/admin/courses');
        revalidatePath('/admin/faculty');
        return { success: true };
    } catch (error: any) {
        console.error(`Error deleting course ${courseId}:`, error);
        if (error.code === 'P2025') return { success: false, error: "Course not found for deletion." };
        return { success: false, error: 'Failed to delete course.' };
    }
}
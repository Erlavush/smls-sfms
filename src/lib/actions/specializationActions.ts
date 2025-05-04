// src/lib/actions/specializationActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Role, Specialization } from '@/generated/prisma'; // Import Role enum and Specialization type

// --- Create Specialization ---
interface CreateSpecializationResponse {
    success: boolean;
    specialization?: Specialization; // Return the created specialization
    error?: string;
}

export async function createSpecialization(formData: FormData): Promise<CreateSpecializationResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization Check
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Extract Data
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null; // Optional

    // 3. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return { success: false, error: 'Specialization name is required.' };
    }
    if (description && typeof description !== 'string') {
        // Should not happen with standard form data, but good practice
        return { success: false, error: 'Description must be a string if provided.' };
    }

    const trimmedName = name.trim();
    const trimmedDescription = description?.trim() || null; // Store null if empty/whitespace

    console.log(`Admin attempting to create specialization: "${trimmedName}"`);

    try {
        // --- MODIFIED DUPLICATE CHECK ---
        // 4. Fetch potential matches based on name (case-sensitive by default in SQLite via Prisma)
        // We fetch any specialization to compare names manually later.
        const potentialMatches = await prisma.specialization.findMany({
            where: {
                 // We can't use mode: 'insensitive' with SQLite directly here.
                 // A simple 'equals' might miss case variations.
                 // Fetching based on a broader filter or just fetching all and filtering in code
                 // might be necessary if strict case-insensitivity is required before creation.
                 // For simplicity now, let's check for an exact match first.
                 // A better approach might be to fetch all and filter below.
                 name: trimmedName // Check exact match first
            }
         });

        // If an exact match exists, error out immediately
        if (potentialMatches.length > 0) {
             console.warn(`Specialization with the exact name "${trimmedName}" already exists.`);
             return { success: false, error: `Specialization "${trimmedName}" already exists.` };
        }

        // Optional: If you need strict case-insensitive check *before* creating,
        // you might need to fetch all specializations and check in code.
        // This can be inefficient for many specializations.
        /*
        const allSpecs = await prisma.specialization.findMany({ select: { name: true } });
        const existingSpec = allSpecs.find(spec => spec.name.toLowerCase() === trimmedName.toLowerCase());
        if (existingSpec) {
             console.warn(`Specialization with name "${trimmedName}" (case-insensitive) already exists.`);
            return { success: false, error: `Specialization "${trimmedName}" already exists.` };
        }
        */
        // For now, we rely on the database's unique constraint (which IS case-sensitive in SQLite)
        // and the exact match check above.

        // 5. Create in Database
        const newSpecialization = await prisma.specialization.create({
            data: {
                name: trimmedName,
                description: trimmedDescription,
            },
        });
        // --- END MODIFIED DUPLICATE CHECK ---

        console.log(`Successfully created specialization: ${newSpecialization.name} (ID: ${newSpecialization.id})`);

        // 6. Revalidate the path for the specializations list page
        revalidatePath('/admin/specializations');

        // 7. Return Success
        return { success: true, specialization: newSpecialization };

    } catch (error: any) {
        console.error("Error creating specialization:", error);
         // Catch unique constraint violation (case-sensitive in SQLite)
         if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
             // Catch unique constraint violation specifically on 'name'
             return { success: false, error: `Specialization "${trimmedName}" already exists.` };
         }
        return { success: false, error: `Failed to create specialization. ${error.message}` };
    }
}

// --- Get All Specializations ---
interface GetSpecializationsResponse {
    success: boolean;
    specializations?: Specialization[]; // Array of Specialization records
    error?: string;
}

export async function getSpecializations(): Promise<GetSpecializationsResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // Authorization: Ensure only admins can fetch this list
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    console.log("Admin fetching list of all specializations...");

    try {
        const specializations = await prisma.specialization.findMany({
            orderBy: {
                name: 'asc', // Order alphabetically by name
            },
        });

        console.log(`Found ${specializations.length} specializations.`);
        return { success: true, specializations: specializations };

    } catch (error: any) {
        console.error("Error fetching specializations:", error);
        return { success: false, error: `Failed to fetch specializations. ${error.message}` };
    }
}

// --- Update Specialization ---
interface UpdateSpecializationResponse {
    success: boolean;
    specialization?: Specialization;
    error?: string;
}

export async function updateSpecialization(formData: FormData): Promise<UpdateSpecializationResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Extract Data
    const id = formData.get('id') as string | null;
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;

    // 3. Validation
    if (!id || typeof id !== 'string') {
        return { success: false, error: 'Specialization ID is missing or invalid.' };
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return { success: false, error: 'Specialization name is required.' };
    }
    const trimmedName = name.trim();
    const trimmedDescription = description?.trim() || null;

    console.log(`Admin attempting to update specialization ID: ${id} to Name: "${trimmedName}"`);

    try {
        // 4. Check for Duplicate Name (excluding the current item being edited)
        const existingSpec = await prisma.specialization.findFirst({
            where: {
                name: trimmedName,
                id: { not: id } // Exclude the record we are currently editing
            }
        });

        if (existingSpec) {
            return { success: false, error: `Another specialization with the name "${trimmedName}" already exists.` };
        }

        // 5. Update in Database
        const updatedSpecialization = await prisma.specialization.update({
            where: { id: id },
            data: {
                name: trimmedName,
                description: trimmedDescription,
            },
        });

        console.log(`Successfully updated specialization: ${updatedSpecialization.name} (ID: ${updatedSpecialization.id})`);

        // 6. Revalidate Paths
        revalidatePath('/admin/specializations');
        revalidatePath('/admin/matrix'); // Matrix uses specialization names
        // Revalidate all faculty pages might be too broad, but safer if names are displayed there
        // Consider revalidating specific faculty if performance is an issue later
        revalidatePath('/admin/faculty');


        // 7. Return Success
        return { success: true, specialization: updatedSpecialization };

    } catch (error: any) {
        console.error(`Error updating specialization ${id}:`, error);
        if (error.code === 'P2025') { // Record to update not found
            return { success: false, error: 'Specialization not found.' };
        }
         if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
             // Should be caught by the check above, but as a fallback
             return { success: false, error: `Another specialization with the name "${trimmedName}" already exists.` };
         }
        return { success: false, error: `Failed to update specialization. ${error.message}` };
    }
}

// --- Delete Specialization ---
interface DeleteSpecializationResponse {
    success: boolean;
    error?: string;
}

export async function deleteSpecialization(id: string): Promise<DeleteSpecializationResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    // 2. Validation
    if (!id || typeof id !== 'string') {
        return { success: false, error: 'Specialization ID is missing or invalid.' };
    }

    console.log(`Admin attempting to delete specialization ID: ${id}`);

    try {
        // 3. Delete from Database
        // Prisma will automatically handle disconnecting the relation from Users
        // based on the schema definition for the many-to-many relation.
        await prisma.specialization.delete({
            where: { id: id },
        });

        console.log(`Successfully deleted specialization ID: ${id}`);

        // 4. Revalidate Paths
        revalidatePath('/admin/specializations');
        revalidatePath('/admin/matrix');
        revalidatePath('/admin/faculty'); // Faculty profiles might no longer show this spec


        // 5. Return Success
        return { success: true };

    } catch (error: any) {
        console.error(`Error deleting specialization ${id}:`, error);
        if (error.code === 'P2025') { // Record to delete not found
            // It's already gone, consider it a success from the user's perspective
            console.warn(`Attempted to delete non-existent specialization ID: ${id}. Assuming success.`);
            revalidatePath('/admin/specializations'); // Still revalidate
             revalidatePath('/admin/matrix');
             revalidatePath('/admin/faculty');
            return { success: true };
        }
        return { success: false, error: `Failed to delete specialization. ${error.message}` };
    }
}
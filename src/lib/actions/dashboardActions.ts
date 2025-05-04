// src/lib/actions/dashboardActions.ts
'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Role } from '@/generated/prisma'; // Import Role enum
// Import the centralized types, including the renamed response type for the matrix
import type { GetMatrixDataResponse, FacultyLinkedSpecialization } from '@/types';

// --- Get Faculty Specialization Data (Uses Links) ---
// This action now fetches explicitly linked specializations for the matrix display.
export async function getFacultySpecializationData(): Promise<GetMatrixDataResponse> { // <-- Use the renamed type here
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization Check
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    console.log("Fetching linked specialization data for matrix...");

    try {
        // 2. Fetch all Faculty Users and include their linked Specializations
        const facultyUsers = await prisma.user.findMany({
            where: {
                role: Role.FACULTY,
            },
            include: {
                // Only include the specializations relation now
                specializations: {
                    select: { // Select only the name (and maybe ID if needed later)
                        // id: true,
                        name: true
                    },
                    orderBy: {
                        name: 'asc' // Keep the linked specializations sorted
                    }
                }
                // REMOVE includes for other CV items (academicQualifications, etc.)
                // as they are no longer needed for this specific action.
            },
            orderBy: {
                name: 'asc', // Order faculty alphabetically
            }
        });

        console.log(`Found ${facultyUsers.length} faculty users for matrix.`);

        // 3. Process data into the desired structure
        const specializationData: FacultyLinkedSpecialization[] = facultyUsers.map(user => {
            // Extract just the names from the linked specializations
            // Ensure names are sorted alphabetically for consistent display
            const linkedNames = user.specializations.map(spec => spec.name).sort((a, b) => a.localeCompare(b));

            return {
                userId: user.id,
                name: user.name,
                email: user.email,
                linkedSpecializationNames: linkedNames, // Assign the array of names
            };
        });

        console.log("Successfully processed linked specialization data.");
        return { success: true, data: specializationData };

    } catch (error: any) {
        console.error("Error fetching linked specialization data:", error);
        return { success: false, error: `Failed to get linked specialization data. ${error.message}` };
    }
}

// --- Get Admin Dashboard Stats ---
interface AdminDashboardStats {
    totalFaculty: number;
    pendingApprovals: number;
}

interface GetAdminDashboardStatsResponse {
    success: boolean;
    stats?: AdminDashboardStats;
    error?: string;
}

export async function getAdminDashboardStats(): Promise<GetAdminDashboardStatsResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    console.log("Fetching admin dashboard stats...");

    try {
        // 2. Count Faculty Users
        const facultyCount = await prisma.user.count({
            where: { role: Role.FACULTY },
        });

        // 3. Count Pending Submissions (Iterate through relevant models)
        let pendingCount = 0;
        const modelsToCheck: (keyof typeof prisma)[] = [
            'academicQualification', 'professionalLicense', 'workExperience',
            'professionalAffiliation', 'awardRecognition', 'professionalDevelopment',
            'communityInvolvement', 'publication', 'conferencePresentation'
        ];

        for (const modelName of modelsToCheck) {
            // Type assertion needed as prisma client type doesn't directly support indexed access with string keys well
            const model = prisma[modelName] as any;
            if (model && typeof model.count === 'function') {
                const count = await model.count({
                    where: { status: 'PENDING' },
                });
                pendingCount += count;
            } else {
                 console.warn(`Model or count function not found for: ${String(modelName)} while calculating pending stats.`);
            }
        }

        console.log(`Dashboard Stats - Faculty: ${facultyCount}, Pending: ${pendingCount}`);

        // 4. Return Stats
        return {
            success: true,
            stats: {
                totalFaculty: facultyCount,
                pendingApprovals: pendingCount,
            },
        };

    } catch (error: any) {
        console.error("Error fetching admin dashboard stats:", error);
        return { success: false, error: 'Failed to fetch dashboard statistics.' };
    }
}
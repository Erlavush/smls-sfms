// Action: Modify src/lib/actions/dashboardActions.ts

'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Role } from '@/generated/prisma'; // Import Role enum
// Import the centralized types, including the renamed response type for the matrix
import type { GetMatrixDataResponse, FacultyLinkedSpecialization } from '@/types'; // Ensure GetMatrixDataResponse is imported

// --- Get Faculty Specialization Data (Uses Links) ---
// This action now fetches explicitly linked specializations for the matrix display
// AND fetches all defined specialization names for consistent headers.
export async function getFacultySpecializationData(): Promise<GetMatrixDataResponse> { // <-- Use the renamed type here
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization Check
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    console.log("Fetching linked specialization data and all specialization names for matrix...");

    try {
        // 2. Fetch all Faculty Users and include their linked Specializations
        const facultyUsersPromise = prisma.user.findMany({
            where: {
                role: Role.FACULTY,
            },
            include: {
                specializations: {
                    select: { name: true },
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });

        // *** ADDED: Fetch all defined specialization names ***
        const allSpecializationsPromise = prisma.specialization.findMany({
            select: { name: true },
            orderBy: { name: 'asc' }
        });
        // *** END ADDED ***

        // 3. Execute queries concurrently
        const [facultyUsers, allDbSpecializations] = await Promise.all([
            facultyUsersPromise,
            allSpecializationsPromise
        ]);

        const allSpecializationNames = allDbSpecializations.map(spec => spec.name);

        console.log(`Found ${facultyUsers.length} faculty users and ${allSpecializationNames.length} total specializations.`);

        // 4. Process faculty data into the desired structure
        const specializationData: FacultyLinkedSpecialization[] = facultyUsers.map(user => {
            const linkedNames = user.specializations.map(spec => spec.name).sort((a, b) => a.localeCompare(b));
            return {
                userId: user.id,
                name: user.name,
                email: user.email,
                linkedSpecializationNames: linkedNames,
            };
        });

        console.log("Successfully processed linked specialization data.");
        // *** MODIFIED: Return both faculty data and all specialization names ***
        return {
            success: true,
            data: specializationData,
            allSpecializationNames: allSpecializationNames // Include the list here
        };
        // *** END MODIFICATION ***

    } catch (error: any) {
        console.error("Error fetching matrix data:", error);
        // *** MODIFIED: Ensure error response structure matches interface ***
        return {
            success: false,
            error: `Failed to get matrix data. ${error.message}`,
            data: undefined, // Explicitly set to undefined on error
            allSpecializationNames: undefined // Explicitly set to undefined on error
        };
        // *** END MODIFICATION ***
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

// --- *** NEW: Generate Matrix CSV Data *** ---
interface GenerateMatrixCsvResponse {
    success: boolean;
    csvData?: string;
    error?: string;
}

// Helper function to safely quote CSV fields if needed
function escapeCsvField(field: string | null | undefined): string {
    const str = String(field ?? ''); // Convert null/undefined to empty string
    // Quote if it contains comma, double quote, or newline
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        // Escape existing double quotes by doubling them, then wrap in double quotes
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str; // Return as is if no special characters
}


export async function generateMatrixCsv(): Promise<GenerateMatrixCsvResponse> {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    // 1. Authorization
    if (userRole !== Role.ADMIN) {
        return { success: false, error: 'Unauthorized' };
    }

    console.log("Generating CSV data for specialization matrix...");

    try {
        // 2. Fetch necessary data (reuse or adapt logic from getFacultySpecializationData)
        // Fetch all faculty with their linked specializations
        const facultyUsers = await prisma.user.findMany({
            where: { role: Role.FACULTY },
            include: {
                specializations: {
                    select: { name: true }, // Only need names
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' }
        });

        // Fetch all unique specialization names to build headers consistently
        const allDbSpecializations = await prisma.specialization.findMany({
            select: { name: true },
            orderBy: { name: 'asc' }
        });
        const allSpecializationNames = allDbSpecializations.map(spec => spec.name);

        // 3. Build CSV Header
        const header = [
            "Faculty Name",
            "Email",
            ...allSpecializationNames.map(escapeCsvField) // Escape header names too
        ].join(',');

        // 4. Build CSV Data Rows
        const dataRows = facultyUsers.map(user => {
            const linkedSpecsSet = new Set(user.specializations.map(spec => spec.name));
            const row = [
                escapeCsvField(user.name),
                escapeCsvField(user.email),
                // For each known specialization, mark 'X' if the user has it linked
                ...allSpecializationNames.map(specName =>
                    linkedSpecsSet.has(specName) ? '"X"' : '""' // Use "X" or empty quoted string
                )
            ];
            return row.join(',');
        });

        // 5. Combine Header and Rows
        const csvData = [header, ...dataRows].join('\n');

        console.log("Successfully generated CSV data.");
        return { success: true, csvData: csvData };

    } catch (error: any) {
        console.error("Error generating matrix CSV data:", error);
        return { success: false, error: `Failed to generate CSV data. ${error.message}` };
    }
}
// --- *** END: Generate Matrix CSV Data *** ---
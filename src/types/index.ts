// Action: Modify src/types/index.ts

import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation,
    ApprovalStatus, Specialization // <-- Import the enum & Specialization
} from '@/generated/prisma';
import type { Role as PrismaRole } from '@/generated/prisma'; // Import Role if needed elsewhere
import prisma from '@/lib/prisma';
// Common temporary properties used during editing state
export type TempCommon = {
    _isNew?: boolean; // Flag to indicate if the item was added locally
    id: string;      // Needs ID (can be temporary UUID for new items or real ID for existing)
};

// Specific temporary types for each section
// Add status and rejectionReason, keep _selectedFile
export type TempAcademicQualification = AcademicQualification & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempProfessionalDevelopment = ProfessionalDevelopment & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempProfessionalLicense = ProfessionalLicense & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempWorkExperience = WorkExperience & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempProfessionalAffiliation = ProfessionalAffiliation & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempAwardRecognition = AwardRecognition & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempCommunityInvolvement = CommunityInvolvement & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempPublication = Publication & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempConferencePresentation = ConferencePresentation & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };


// Union type representing any possible item within the editableData state arrays
export type EditableItem =
    | TempAcademicQualification
    | TempProfessionalLicense
    | TempWorkExperience
    | TempProfessionalAffiliation
    | TempAwardRecognition
    | TempProfessionalDevelopment
    | TempCommunityInvolvement
    | TempPublication
    | TempConferencePresentation;

// Type mapping for item types used in admin actions
export type ItemType =
    | 'academicQualification'
    | 'professionalLicense'
    | 'workExperience'
    | 'professionalAffiliation'
    | 'awardRecognition'
    | 'professionalDevelopment'
    | 'communityInvolvement'
    | 'publication'
    | 'conferencePresentation';

// --- Define Evidence Source ---
export interface EvidenceSource {
    source: string; // e.g., "Academic Qualification - Degree"
    evidence: string; // The actual text where the keyword was found
}

// --- Define Faculty Specialization Detail (Used by old keyword scanning, might be obsolete) ---
export interface FacultySpecializationDetail {
    userId: string;
    name: string | null;
    email: string | null;
    // Use the EvidenceSource interface defined above
    specializationDetails: {
        [specializationKeyword: string]: EvidenceSource[];
    };
}

// --- Define Admin Actions Response Type (For old keyword scanning, might be obsolete) ---
export interface GetSpecializationResponse {
    success: boolean;
    data?: FacultySpecializationDetail[]; // Use the centralized type
    error?: string;
}

// --- Type for data returned by the REVISED getFacultySpecializationData action ---
export interface FacultyLinkedSpecialization {
    userId: string;
    name: string | null;
    email: string | null;
    linkedSpecializationNames: string[]; // Array of names of linked specializations
}

// --- Renamed Response type for the REVISED getFacultySpecializationData action ---
export interface GetMatrixDataResponse { // Renamed from GetSpecializationResponse
    success: boolean;
    data?: FacultyLinkedSpecialization[]; // Use the new linked specialization type
    // *** ADDED THIS LINE ***
    allSpecializationNames?: string[]; // Add list of all specialization names
    error?: string;
}

// Helper function to map Prisma model names to ItemType strings
// (Useful for admin actions if needed, but Prisma client uses camelCase keys directly)
export function getModelKeyFromItemType(itemType: ItemType): keyof typeof prisma {
    const map: Record<ItemType, keyof typeof prisma> = {
        academicQualification: 'academicQualification',
        professionalLicense: 'professionalLicense',
        workExperience: 'workExperience',
        professionalAffiliation: 'professionalAffiliation',
        awardRecognition: 'awardRecognition',
        professionalDevelopment: 'professionalDevelopment',
        communityInvolvement: 'communityInvolvement',
        publication: 'publication',
        conferencePresentation: 'conferencePresentation',
    };
    return map[itemType];
}

// --- Keep the response type for the action that gets ALL specializations ---
export interface GetSpecializationsResponse { // This is for getSpecializations()
    success: boolean;
    specializations?: Specialization[]; // Uses the Prisma Specialization type
    error?: string;
}
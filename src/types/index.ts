// src/types/index.ts
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation,
    ApprovalStatus // <-- Import the enum
} from '@/generated/prisma';
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
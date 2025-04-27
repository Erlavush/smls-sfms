// src/types/index.ts
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
} from '@/generated/prisma'; // Adjust path if your generated client is elsewhere

// Common temporary properties used during editing state
export type TempCommon = {
    _isNew?: boolean; // Flag to indicate if the item was added locally
    id: string;      // Needs ID (can be temporary UUID for new items or real ID for existing)
};

// Specific temporary types for each section
// Add _selectedFile property to ALL types that now handle file uploads locally
export type TempAcademicQualification = AcademicQualification & TempCommon & { _selectedFile?: File | null; };
export type TempProfessionalDevelopment = ProfessionalDevelopment & TempCommon & { _selectedFile?: File | null; };
export type TempProfessionalLicense = ProfessionalLicense & TempCommon & { _selectedFile?: File | null; };
export type TempWorkExperience = WorkExperience & TempCommon & { _selectedFile?: File | null; };
export type TempProfessionalAffiliation = ProfessionalAffiliation & TempCommon & { _selectedFile?: File | null; };
export type TempAwardRecognition = AwardRecognition & TempCommon & { _selectedFile?: File | null; };
export type TempCommunityInvolvement = CommunityInvolvement & TempCommon & { _selectedFile?: File | null; };
export type TempPublication = Publication & TempCommon & { _selectedFile?: File | null; };
export type TempConferencePresentation = ConferencePresentation & TempCommon & { _selectedFile?: File | null; };

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

// You can add other shared application-wide types here as needed
// e.g., export type AdminViewFaculty = { ... };
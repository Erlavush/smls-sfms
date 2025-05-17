// src/types/index.ts
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation,
    SocialMediaLink,
    ApprovalStatus, Specialization, Course // Added Course
} from '@/generated/prisma'; // Assuming this is the correct path to your Prisma-generated types
import type { Role as PrismaRole } from '@/generated/prisma';
import prisma from '@/lib/prisma'; // Assuming prisma client is available for model key mapping

// Common temporary properties used during editing state
export type TempCommon = {
    _isNew?: boolean; // Flag to indicate if the item was added locally
    id: string;      // Needs ID (can be temporary UUID for new items or real ID for existing)
};

// Specific temporary types for each section
// Ensure these include all fields from Prisma types + TempCommon + _selectedFile + status + rejectionReason
export type TempAcademicQualification = AcademicQualification & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempProfessionalDevelopment = ProfessionalDevelopment & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempProfessionalLicense = ProfessionalLicense & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempWorkExperience = WorkExperience & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempProfessionalAffiliation = ProfessionalAffiliation & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempAwardRecognition = AwardRecognition & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempCommunityInvolvement = CommunityInvolvement & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempPublication = Publication & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempConferencePresentation = ConferencePresentation & TempCommon & { _selectedFile?: File | null; status: ApprovalStatus; rejectionReason?: string | null; };
export type TempSocialMediaLink = SocialMediaLink & TempCommon & { _isNew?: boolean; };


// Union type representing any possible item within the editableData state arrays for CV sections
export type EditableCvItem =
    | TempAcademicQualification
    | TempProfessionalLicense
    | TempWorkExperience
    | TempProfessionalAffiliation
    | TempAwardRecognition
    | TempProfessionalDevelopment
    | TempCommunityInvolvement
    | TempPublication
    | TempConferencePresentation;

// Type mapping for item types used in admin actions and profile page logic
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

// Key type for CV categories, derived from the ItemType for consistency
// This will be used for categoryMetadata and managing CV sections.
export type CategoryKey =
    | 'academicQualifications'
    | 'professionalLicenses'
    | 'workExperiences'
    | 'professionalAffiliations'
    | 'awardsRecognitions'
    | 'professionalDevelopments'
    | 'communityInvolvements'
    | 'publications'
    | 'conferencePresentations';


// --- Define Evidence Source (Used by old keyword scanning, might be obsolete but kept from context) ---
export interface EvidenceSource {
    source: string;
    evidence: string;
}

// --- Define Faculty Specialization Detail (Used by old keyword scanning, might be obsolete but kept from context) ---
export interface FacultySpecializationDetail {
    userId: string;
    name: string | null;
    email: string | null;
    specializationDetails: {
        [specializationKeyword: string]: EvidenceSource[];
    };
}

// --- Define Admin Actions Response Type (For old keyword scanning, might be obsolete but kept from context) ---
export interface GetSpecializationResponse { // This name might be confusing if it's for the matrix
    success: boolean;
    data?: FacultySpecializationDetail[];
    error?: string;
}

// --- Type for data returned by the REVISED getFacultySpecializationData action for the matrix ---
export interface FacultyLinkedSpecialization {
    userId: string;
    name: string | null;
    email: string | null;
    linkedSpecializationNames: string[];
}

// --- Response type for the REVISED getFacultySpecializationData action (Matrix Data) ---
export interface GetMatrixDataResponse {
    success: boolean;
    data?: FacultyLinkedSpecialization[];
    allSpecializationNames?: string[];
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

// --- Response type for the action that gets ALL specializations (Prisma Specialization type) ---
export interface GetAllSpecializationsResponse { // Renamed for clarity
    success: boolean;
    specializations?: Specialization[];
    error?: string;
}

// Type for User object within ProfileData, including socialMediaLinks
// This should align with what getMyProfileData and getFacultyProfileById return for the 'user' field.
export interface ProfileUser extends Omit<import('@/generated/prisma').User, 'password' | 'emailVerified' | 'notifications' | 'passwordResetTokens' | 'specializations' | 'academicQualifications' | 'professionalLicenses' | 'workExperiences' | 'professionalAffiliations' | 'awardsRecognitions' | 'professionalDevelopments' | 'communityInvolvements' | 'publications' | 'conferencePresentations'> {
    socialMediaLinks: SocialMediaLink[]; // Explicitly include this
    // Add other fields if they are directly on the user object and needed, e.g., specializations if fetched directly with user
}

// Type for the overall profile data structure fetched by getMyProfileData
export interface UserProfilePageData {
    user: ProfileUser | null; // Use the more specific ProfileUser type
    academicQualifications: AcademicQualification[];
    professionalLicenses: ProfessionalLicense[];
    workExperiences: WorkExperience[];
    professionalAffiliations: ProfessionalAffiliation[];
    awardsRecognitions: AwardRecognition[];
    professionalDevelopments: ProfessionalDevelopment[];
    communityInvolvements: CommunityInvolvement[];
    publications: Publication[];
    conferencePresentations: ConferencePresentation[];
    // socialMediaLinks are part of the user object now
    error?: string; // For actions returning this structure with a potential error
}

// Type for editable data on the profile page, mirroring UserProfilePageData but with Temp types
export type EditableProfilePageData = {
    user?: Partial<ProfileUser> | null; // User details can be partially updated
    academicQualifications?: TempAcademicQualification[];
    professionalLicenses?: TempProfessionalLicense[];
    workExperiences?: TempWorkExperience[];
    professionalAffiliations?: TempProfessionalAffiliation[];
    awardsRecognitions?: TempAwardRecognition[];
    professionalDevelopments?: TempProfessionalDevelopment[];
    communityInvolvements?: TempCommunityInvolvement[];
    publications?: TempPublication[];
    conferencePresentations?: TempConferencePresentation[];
    socialMediaLinks?: TempSocialMediaLink[]; // Social media links are also editable
};
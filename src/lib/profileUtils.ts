// src/lib/profileUtils.ts
import {
    AcademicCapIcon,
    BriefcaseIcon,
    IdentificationIcon,
    StarIcon,
    SparklesIcon,
    UsersIcon,
    DocumentTextIcon,
    PresentationChartBarIcon,
} from '@heroicons/react/24/outline';
import type { CategoryKey } from '@/types'; // Import CategoryKey

// Import all your Display and Form component types if you want stricter typing here,
// or use React.ElementType for now.
// For simplicity, we'll use React.ElementType for icons.
// The actual component mapping can be done within CvSection.tsx or a similar component.

interface CategoryMeta {
    title: string;
    icon: React.ElementType; // For Heroicons
    // We can add component references here later if needed,
    // but for now, CvSection.tsx will handle dynamic component loading.
    // displayComponent: React.FC<any>;
    // formComponent: React.FC<any>;
}

export const categoryMetadata: Record<CategoryKey, CategoryMeta> = {
    academicQualifications: {
        title: 'Academic Qualifications',
        icon: AcademicCapIcon,
    },
    professionalLicenses: {
        title: 'Professional Licenses',
        icon: IdentificationIcon,
    },
    workExperiences: {
        title: 'Work Experience',
        icon: BriefcaseIcon,
    },
    professionalAffiliations: {
        title: 'Professional Affiliations',
        icon: UsersIcon, // Can be differentiated later if needed
    },
    awardsRecognitions: {
        title: 'Awards & Recognitions',
        icon: StarIcon,
    },
    professionalDevelopments: {
        title: 'Professional Development',
        icon: SparklesIcon,
    },
    communityInvolvements: {
        title: 'Community Involvement',
        icon: UsersIcon, // Can be differentiated later if needed
    },
    publications: {
        title: 'Publications',
        icon: DocumentTextIcon,
    },
    conferencePresentations: {
        title: 'Conference Presentations',
        icon: PresentationChartBarIcon,
    },
    // Add other categories here if they exist and are managed similarly
};

// Helper function to format date (can be moved here or kept in components if only used there)
export const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try {
        return new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        console.error("Error formatting date:", date, e);
        return 'Invalid Date';
    }
};

export const formatDateForInput = (date: string | Date | null | undefined): string => {
    if (!date) return '';
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return ''; // Check for invalid date
        return d.toISOString().split('T')[0];
    } catch (e) {
        console.error("Error formatting date for input:", date, e);
        return '';
    }
};

// You can add other profile-related utility functions here as needed.
// For example, validation helpers, default item structures, etc.

export const defaultTempSocialMediaLink = (userId: string): import('@/types').TempSocialMediaLink => ({
    id: `temp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // More unique temp ID
    platform: '',
    url: '',
    userId: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    _isNew: true,
});
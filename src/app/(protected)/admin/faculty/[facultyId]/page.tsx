// src/app/(protected)/admin/faculty/[facultyId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Link from 'next/link';
import { getFacultyProfileById } from '@/lib/adminActions'; // Import the server action
import type {
    User, Role, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
} from '@/generated/prisma'; // Import types

// Import Display Components
import AcademicQualificationDisplay from '@/components/profile/AcademicQualificationDisplay';
import ProfessionalDevelopmentDisplay from '@/components/profile/ProfessionalDevelopmentDisplay';
import ProfessionalLicenseDisplay from '@/components/profile/ProfessionalLicenseDisplay';
import WorkExperienceDisplay from '@/components/profile/WorkExperienceDisplay';
import ProfessionalAffiliationDisplay from '@/components/profile/ProfessionalAffiliationDisplay';
import AwardRecognitionDisplay from '@/components/profile/AwardRecognitionDisplay';
import CommunityInvolvementDisplay from '@/components/profile/CommunityInvolvementDisplay';
import PublicationDisplay from '@/components/profile/PublicationDisplay';
import ConferencePresentationDisplay from '@/components/profile/ConferencePresentationDisplay';

// Import Icons
import {
    ArrowLeftIcon, UserCircleIcon, EnvelopeIcon, CalendarDaysIcon, ExclamationTriangleIcon,
    AcademicCapIcon, BriefcaseIcon, IdentificationIcon, StarIcon, SparklesIcon, UsersIcon,
    DocumentTextIcon, PresentationChartBarIcon
} from '@heroicons/react/24/outline';

// Define the structure of the fetched profile data (matching the server action return)
interface FacultyProfileData {
    user: { id: string; name: string | null; email: string | null; role: Role | null; createdAt: Date; };
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

// Define metadata for rendering sections dynamically
const sectionMetadata = {
    academicQualifications: { title: 'Academic Qualifications', icon: AcademicCapIcon, component: AcademicQualificationDisplay },
    professionalLicenses: { title: 'Professional Licenses', icon: IdentificationIcon, component: ProfessionalLicenseDisplay },
    workExperiences: { title: 'Work Experience', icon: BriefcaseIcon, component: WorkExperienceDisplay },
    professionalAffiliations: { title: 'Professional Affiliations', icon: UsersIcon, component: ProfessionalAffiliationDisplay },
    awardsRecognitions: { title: 'Awards & Recognitions', icon: StarIcon, component: AwardRecognitionDisplay },
    professionalDevelopments: { title: 'Professional Development', icon: SparklesIcon, component: ProfessionalDevelopmentDisplay },
    communityInvolvements: { title: 'Community Involvement', icon: UsersIcon, component: CommunityInvolvementDisplay }, // Reusing UsersIcon
    publications: { title: 'Publications', icon: DocumentTextIcon, component: PublicationDisplay },
    conferencePresentations: { title: 'Conference Presentations', icon: PresentationChartBarIcon, component: ConferencePresentationDisplay },
} as const; // Use 'as const' for stricter typing

type SectionKey = keyof typeof sectionMetadata;

// Helper to format date
const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return 'Invalid Date'; }
};

export default function AdminFacultyProfilePage() {
    const params = useParams();
    const router = useRouter(); // For potential navigation actions
    const facultyId = params?.facultyId as string | undefined; // Get ID from URL

    const [facultyProfile, setFacultyProfile] = useState<FacultyProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (facultyId) {
            setIsLoading(true);
            setError(null);
            console.log(`Fetching profile for facultyId: ${facultyId}`);
            getFacultyProfileById(facultyId)
                .then(response => {
                    if (response.success && response.facultyProfile) {
                        setFacultyProfile(response.facultyProfile);
                        console.log("Profile data fetched:", response.facultyProfile);
                    } else {
                        setError(response.error || 'Failed to load faculty profile.');
                        setFacultyProfile(null);
                        console.error("Error fetching profile:", response.error);
                    }
                })
                .catch(err => {
                    console.error("Unexpected error fetching profile:", err);
                    setError('An unexpected error occurred.');
                    setFacultyProfile(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            // Handle case where facultyId is missing (shouldn't normally happen with correct routing)
            setError('Faculty ID not found in URL.');
            setIsLoading(false);
        }
    }, [facultyId]); // Re-run effect if facultyId changes

    // --- Render Loading State ---
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                 <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading faculty profile...</span>
                </div>
            </div>
        );
    }

    // --- Render Error State ---
    if (error) {
        return (
            <div className="p-6 bg-red-50 min-h-screen">
                 <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow border border-red-200">
                     <div className="flex items-center gap-3 text-red-700 mb-4">
                        <ExclamationTriangleIcon className="h-6 w-6" />
                        <h2 className="text-xl font-semibold">Error Loading Profile</h2>
                     </div>
                    <p className="text-red-600 mb-6">{error}</p>
                    <Link href="/admin/faculty" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Faculty List
                    </Link>
                 </div>
            </div>
        );
    }

    // --- Render Profile Data ---
    if (!facultyProfile) {
        // This case should ideally be covered by error state, but good as a fallback
        return <div className="p-6">No profile data available.</div>;
    }

    const { user, ...sections } = facultyProfile;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Back Link */}
            <div className="mb-4">
                <Link href="/admin/faculty" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Faculty List
                </Link>
            </div>

            {/* Faculty Header Info */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <UserCircleIcon className="h-16 w-16 text-gray-400 flex-shrink-0" />
                    <div className="flex-grow">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {user.name || 'Unnamed Faculty'}
                        </h1>
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5">
                                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                                {user.email || 'No Email'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                                Joined: {formatDate(user.createdAt)}
                            </span>
                             <span className="flex items-center gap-1.5 font-medium">
                                {/* Display Role - adjust icon/color if needed */}
                                Role: {user.role || 'N/A'}
                            </span>
                        </div>
                    </div>
                    {/* Placeholder for potential Admin actions like 'Edit Faculty', 'Reset Password' */}
                    {/* <div className="flex-shrink-0"> <button className="...">Actions</button> </div> */}
                </div>
            </div>

            {/* Dynamic Sections Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(Object.keys(sectionMetadata) as SectionKey[]).map(sectionKey => {
                    const sectionData = sections[sectionKey];
                    // Only render the section if there's data for it
                    if (!sectionData || sectionData.length === 0) {
                        return null; // Skip rendering empty sections
                    }

                    const meta = sectionMetadata[sectionKey];
                    const SectionIcon = meta.icon;
                    const DisplayComponent = meta.component;

                    return (
                        <div key={sectionKey} className="flex flex-col rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                            {/* Section Header */}
                            <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50">
                                <SectionIcon className="h-5 w-5 text-gray-500" />
                                <h2 className="text-base font-semibold text-gray-700">
                                    {meta.title}
                                </h2>
                            </div>

                            {/* Section Body - List of Items */}
                            <div className="flex-grow p-4 space-y-4">
                                {sectionData.map((item: any) => ( // Use 'any' for simplicity here, or create a union type
                                    <div key={item.id} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                        {/* Render the specific display component for the item */}
                                        <DisplayComponent item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
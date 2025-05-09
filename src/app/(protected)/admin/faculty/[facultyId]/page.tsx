    'use client';

import React, { useState, useEffect, useTransition, useCallback, useRef, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// Import necessary actions
import {
    getFacultyProfileById,
    linkSpecializationToFaculty,
    unlinkSpecializationFromFaculty,
    deleteFacultyUser,
    updateFacultyName
} from '@/lib/actions/facultyActions';
import { getSpecializations } from '@/lib/actions/specializationActions';
import type {
    User, Role, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation, Specialization,
    Course // <-- Import Course type
} from '@/generated/prisma/client';

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
    DocumentTextIcon, PresentationChartBarIcon,
    TagIcon,
    LightBulbIcon, // <-- Ensure this is imported
    BookOpenIcon, // <-- Added for Potential Courses
    CheckIcon, // Added CheckIcon
    CheckCircleIcon, // <-- ADD THIS
    TrashIcon, XMarkIcon,
    PencilIcon
} from '@heroicons/react/24/outline';

// Define Match Strength Type
type CourseMatchStrength = 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';

// Updated structure for faculty profile data
interface FacultyProfileData {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        role: Role | null;
        createdAt: Date;
        specializations: Specialization[]; // Keep raw data
    };
    // This array now holds the names derived from user.specializations
    potentialCourses: (Course & {
        requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
        matchStrength: CourseMatchStrength; // <-- ADD THIS
    })[];
    suggestedTeachingAreas: string[];
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

// Metadata for CV sections
const sectionMetadata = {
    academicQualifications: { title: 'Academic Qualifications', icon: AcademicCapIcon, component: AcademicQualificationDisplay },
    professionalLicenses: { title: 'Professional Licenses', icon: IdentificationIcon, component: ProfessionalLicenseDisplay },
    workExperiences: { title: 'Work Experience', icon: BriefcaseIcon, component: WorkExperienceDisplay },
    professionalAffiliations: { title: 'Professional Affiliations', icon: UsersIcon, component: ProfessionalAffiliationDisplay },
    awardsRecognitions: { title: 'Awards & Recognitions', icon: StarIcon, component: AwardRecognitionDisplay },
    professionalDevelopments: { title: 'Professional Development', icon: SparklesIcon, component: ProfessionalDevelopmentDisplay },
    communityInvolvements: { title: 'Community Involvement', icon: UsersIcon, component: CommunityInvolvementDisplay },
    publications: { title: 'Publications', icon: DocumentTextIcon, component: PublicationDisplay },
    conferencePresentations: { title: 'Conference Presentations', icon: PresentationChartBarIcon, component: ConferencePresentationDisplay },
} as const;

type SectionKey = keyof typeof sectionMetadata;

// Helper to format date
const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return 'Invalid Date'; }
};

export default function AdminFacultyProfilePage() {
    const params = useParams();
    const router = useRouter();
    const facultyId = params?.facultyId as string | undefined;

    // State
    const [facultyProfile, setFacultyProfile] = useState<FacultyProfileData | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [allSpecializations, setAllSpecializations] = useState<Specialization[]>([]);
    const [isLoadingSpecs, setIsLoadingSpecs] = useState(true);
    const [specsError, setSpecsError] = useState<string | null>(null);
    const [isLinkingPending, startLinkTransition] = useTransition();
    const [linkError, setLinkError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, startDeleteTransition] = useTransition();
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
    const [isUpdatingName, startNameUpdateTransition] = useTransition();
    const [editNameError, setEditNameError] = useState<string | null>(null);
    const editNameFormRef = useRef<HTMLFormElement>(null);

    // --- Modal Handlers (Delete, Edit Name) ---
    const openDeleteModal = () => { setDeleteError(null); setIsDeleteModalOpen(true); };
    const closeDeleteModal = () => { if (isDeleting) return; setIsDeleteModalOpen(false); setDeleteError(null); };
    const handleDeleteConfirm = () => { /* ... (implementation remains the same) ... */
        if (!facultyId || isDeleting) return;
        setDeleteError(null);
        startDeleteTransition(async () => {
            const result = await deleteFacultyUser(facultyId);
            if (result.success) {
                console.log("Faculty deleted successfully, redirecting...");
                closeDeleteModal();
                router.push('/admin/faculty');
            } else {
                setDeleteError(result.error || 'Failed to delete faculty member.');
            }
        });
     };
    const openEditNameModal = () => { setEditNameError(null); setIsEditNameModalOpen(true); };
    const closeEditNameModal = () => { if (isUpdatingName) return; setIsEditNameModalOpen(false); setEditNameError(null); };
    const handleNameUpdateSubmit = (event: FormEvent<HTMLFormElement>) => { /* ... (implementation remains the same) ... */
        event.preventDefault();
        if (!facultyId || isUpdatingName) return;
        setEditNameError(null);
        const formData = new FormData(event.currentTarget);
        formData.append('facultyId', facultyId);
        startNameUpdateTransition(async () => {
            const result = await updateFacultyName(formData);
            if (result.success) {
                closeEditNameModal();
                await fetchProfile(); // Re-fetch profile
            } else {
                setEditNameError(result.error || 'Failed to update name.');
            }
        });
     };

    // --- Fetch Faculty Profile Data ---
    const fetchProfile = useCallback(async () => {
        // ... (implementation remains the same) ...
        if (!facultyId) {
            setProfileError('Faculty ID not found in URL.');
            setIsLoadingProfile(false);
            return;
        }
        setIsLoadingProfile(true);
        setProfileError(null);
        console.log(`Fetching profile for facultyId: ${facultyId}`);
        try {
            const response = await getFacultyProfileById(facultyId);
            if (response.success && response.facultyProfile) {
                setFacultyProfile(response.facultyProfile);
                console.log("Profile data fetched:", response.facultyProfile);
            } else {
                setProfileError(response.error || 'Failed to load faculty profile.');
                setFacultyProfile(null);
                console.error("Error fetching profile:", response.error);
            }
        } catch (err) {
            console.error("Unexpected error fetching profile:", err);
            setProfileError('An unexpected error occurred while fetching the profile.');
            setFacultyProfile(null);
        } finally {
            setIsLoadingProfile(false);
        }
    }, [facultyId]);

    // --- Fetch All Available Specializations ---
    const fetchAllSpecializations = useCallback(async () => {
        // ... (implementation remains the same) ...
        setIsLoadingSpecs(true);
        setSpecsError(null);
        try {
            const response = await getSpecializations();
            if (response.success && response.specializations) {
                setAllSpecializations(response.specializations);
            } else {
                setSpecsError(response.error || 'Failed to load specializations list.');
                setAllSpecializations([]);
            }
        } catch (err) {
            setSpecsError('An unexpected error occurred while fetching specializations.');
            setAllSpecializations([]);
        } finally {
            setIsLoadingSpecs(false);
        }
    }, []);

    // --- Initial Data Fetch ---
    useEffect(() => {
        fetchProfile();
        fetchAllSpecializations();
    }, [fetchProfile, fetchAllSpecializations]);

    // --- Handler for Specialization Checkbox Change ---
    const handleSpecializationChange = (specializationId: string, isChecked: boolean) => {
        // ... (implementation remains the same) ...
        if (!facultyId || isLinkingPending) return;
        setLinkError(null);
        startLinkTransition(async () => {
            let result: { success: boolean; error?: string };
            if (isChecked) {
                result = await linkSpecializationToFaculty(facultyId, specializationId);
            } else {
                result = await unlinkSpecializationFromFaculty(facultyId, specializationId);
            }
            if (!result.success) {
                setLinkError(result.error || `Failed to ${isChecked ? 'link' : 'unlink'} specialization.`);
            } else {
                await fetchProfile(); // Refetch profile data
            }
        });
    };

    // --- Combined Loading/Error States ---
    const isLoading = isLoadingProfile || isLoadingSpecs;
    const error = profileError || specsError;

    // --- Render Loading State ---
    if (isLoading) { /* ... (loading JSX remains the same) ... */
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
    if (error) { /* ... (error JSX remains the same) ... */
        return (
            <div className="p-6 bg-red-50 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow border border-red-200">
                    <div className="flex items-center gap-3 text-red-700 mb-4">
                       <ExclamationTriangleIcon className="h-6 w-6" />
                       <h2 className="text-xl font-semibold">Error Loading Profile</h2>
                    </div>
                   <p className="text-red-600 mb-6">{error}</p>
                   <Link
                       href="/admin/faculty"
                       className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                       legacyBehavior>
                       <ArrowLeftIcon className="h-4 w-4" />
                       Back to Faculty List
                   </Link>
                </div>
            </div>
        );
    }

    // --- Render Profile Data ---
    if (!facultyProfile) {
        return <div className="p-6">No profile data available.</div>;
    }

    const linkedSpecIds = new Set(facultyProfile.user.specializations.map(spec => spec.id));
    const { user, suggestedTeachingAreas, potentialCourses, ...cvSections } = facultyProfile; // Destructure potentialCourses

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Back Link */}
            <div className="mb-4">
                <Link
                    href="/admin/faculty"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    legacyBehavior>
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Faculty List
                </Link>
            </div>
            {/* Faculty Header Info */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow border border-gray-200">
                {/* ... (header content remains the same, including edit/delete buttons) ... */}
                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <UserCircleIcon className="h-16 w-16 text-gray-400 flex-shrink-0" />
                    <div className="flex-grow">
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <span>{user.name || 'Unnamed Faculty'}</span>
                            <button onClick={openEditNameModal} disabled={isUpdatingName || isDeleting} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50" title="Edit Name" > <PencilIcon className="h-4 w-4" /> </button>
                        </h1>
                        <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1.5"> <EnvelopeIcon className="h-4 w-4 text-gray-400" /> {user.email || 'No Email'} </span>
                            <span className="flex items-center gap-1.5"> <CalendarDaysIcon className="h-4 w-4 text-gray-400" /> Joined: {formatDate(user.createdAt)} </span>
                            <span className="flex items-center gap-1.5 font-medium"> Role: {user.role || 'N/A'} </span>
                        </div>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0">
                        <button onClick={openDeleteModal} disabled={isDeleting} className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60" > <TrashIcon className="h-4 w-4" /> Delete Faculty </button>
                    </div>
                </div>
            </div>
            {/* Link Error Display */}
            {linkError && ( /* ... (error display remains the same) ... */
               (<div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded relative flex items-center gap-2" role="alert">
                   <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                   <span className="block sm:inline">{linkError}</span>
               </div>)
            )}
            {/* Specializations Management Card */}
            <div className="mb-8 rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                 {/* ... (specialization management content remains the same) ... */}
                 <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50"> <TagIcon className="h-5 w-5 text-gray-500" /> <h2 className="text-base font-semibold text-gray-700"> Manage Assigned Specializations </h2> </div>
                 <div className="p-4 sm:p-6">
                    {allSpecializations.length === 0 && !isLoadingSpecs ? ( <p className="text-sm text-gray-500 italic">No specializations have been defined yet. <Link href="/admin/specializations" className='text-blue-600 hover:underline'>Manage Specializations</Link></p> ) : isLoadingSpecs ? ( <p className="text-sm text-gray-500 italic">Loading available specializations...</p> ) : (
                        <fieldset disabled={isLinkingPending}>
                            <legend className="sr-only">Specializations</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                                {allSpecializations.map((spec) => (
                                    <div key={spec.id} className="relative flex items-start">
                                        <div className="flex h-6 items-center"> <input id={`spec-${spec.id}`} name="specializations" type="checkbox" checked={linkedSpecIds.has(spec.id)} onChange={(e) => handleSpecializationChange(spec.id, e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-70" /> </div>
                                        <div className="ml-3 text-sm leading-6"> <label htmlFor={`spec-${spec.id}`} className="font-medium text-gray-900"> {spec.name} </label> {spec.description && ( <p className="text-xs text-gray-500">{spec.description}</p> )} </div>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    )}
                </div>
            </div>
            {/* --- *** NEW: Suggested Teaching Areas Card *** --- */}
            <div className="mb-8 rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                {/* Enhanced header for this card */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-indigo-50">
                    <LightBulbIcon className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-base font-semibold text-indigo-800">
                        Expertise / Suggested Teaching Areas
                    </h2>
                </div>
                <div className="p-4 sm:p-6">
                    {suggestedTeachingAreas.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No specializations linked to suggest teaching areas.</p>
                    ) : (
                        <ul className="space-y-2"> {/* Changed from list-disc for cleaner look with icons */}
                            {suggestedTeachingAreas.map((area, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm text-gray-800">
                                    <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>{area}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                     {/* More direct note for admins */}
                     <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
                        These areas are derived from the faculty's linked specializations. Consider them when planning teaching assignments or other responsibilities.
                     </p>
                </div>
            </div>
            {/* --- *** END: Suggested Teaching Areas Card *** --- */}
            {/* --- *** NEW: Potential Courses Card *** --- */}
            <div className="mb-8 rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-green-50"> {/* Different color for distinction */}
                    <BookOpenIcon className="h-5 w-5 text-green-600" />
                    <h2 className="text-base font-semibold text-green-800">
                        Potential Courses to Teach
                    </h2>
                </div>
                <div className="p-4 sm:p-6">
                    {facultyProfile.potentialCourses && facultyProfile.potentialCourses.length > 0 ? (
                        <ul className="space-y-3">
                            {facultyProfile.potentialCourses.map((course) => (
                                <li key={course.id} className="pb-3 mb-3 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">
                                                {course.name} {course.code && <span className="text-xs text-gray-500">({course.code})</span>}
                                            </p>
                                            {course.description && (
                                                <p className="mt-0.5 text-xs text-gray-600">{course.description}</p>
                                            )}
                                            {course.requiredSpecializations && course.requiredSpecializations.length > 0 && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    <span className="font-medium">Matches expertise in:</span>{' '}
                                                    {course.requiredSpecializations
                                                        .filter(reqSpec => facultyProfile.user.specializations.some(facultySpec => facultySpec.id === reqSpec.id))
                                                        .map(spec => spec.name)
                                                        .join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        {/* --- NEW: Match Strength Indicator --- */}
                                        <div className="ml-4 flex-shrink-0">
                                            {course.matchStrength === 'FULL_MATCH' && (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800" title="Faculty meets all required specializations for this course.">
                                                    <CheckCircleIcon className="h-4 w-4 mr-1 text-green-600" />
                                                    Full Match
                                                </span>
                                            )}
                                            {course.matchStrength === 'PARTIAL_MATCH' && (
                                                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800" title="Faculty meets some required specializations for this course.">
                                                    <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-yellow-600" /> {/* Or InformationCircleIcon */}
                                                    Partial Match
                                                </span>
                                            )}
                                            {/* We are not expecting 'NO_MATCH' here as the backend filters them out, but good for completeness if logic changes */}
                                            {/* {course.matchStrength === 'NO_MATCH' && (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                                    No Match
                                                </span>
                                            )} */}
                                        </div>
                                        {/* --- END: Match Strength Indicator --- */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 italic">
                            No specific course suggestions based on current specializations, or no courses defined that match this faculty's expertise.
                        </p>
                    )}
                    <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
                        Note: Suggestions are based on faculty having at least one of the specializations required by a course.
                        Review course details and faculty's full profile for comprehensive assessment.
                    </p>
                </div>
            </div>
            {/* --- *** END: Potential Courses Card *** --- */}
            {/* Dynamic CV Sections Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(Object.keys(sectionMetadata) as SectionKey[]).map(sectionKey => {
                    // ... (CV section rendering logic remains the same) ...
                    const sectionData = cvSections[sectionKey];
                    if (!sectionData || sectionData.length === 0) { return null; }
                    const meta = sectionMetadata[sectionKey];
                    const SectionIcon = meta.icon;
                    const DisplayComponent = meta.component;
                    return (
                        <div key={sectionKey} className="flex flex-col rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                            <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50"> <SectionIcon className="h-5 w-5 text-gray-500" /> <h2 className="text-base font-semibold text-gray-700"> {meta.title} </h2> </div>
                            <div className="flex-grow p-4 space-y-4">
                                {sectionData.map((item: any) => (
                                    <div key={item.id} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                        <DisplayComponent item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* --- Edit Name Modal --- */}
            {isEditNameModalOpen && facultyProfile?.user && ( /* ... (modal JSX remains the same) ... */
                 (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4" aria-labelledby="edit-name-modal-title" role="dialog" aria-modal="true"> <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"> <form ref={editNameFormRef} onSubmit={handleNameUpdateSubmit}> <div className="flex justify-between items-center p-4 border-b border-gray-200"> <h2 className="text-lg font-semibold text-gray-800" id="edit-name-modal-title">Edit Faculty Name</h2> <button type="button" onClick={closeEditNameModal} disabled={isUpdatingName} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal"> <XMarkIcon className="h-5 w-5" /> </button> </div> <div className="p-5 space-y-4"> <div> <label htmlFor="faculty-name-edit" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label> <input type="text" id="faculty-name-edit" name="name" defaultValue={facultyProfile.user.name || ''} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-70" placeholder="Enter faculty name" disabled={isUpdatingName} /> </div> {editNameError && ( <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert"> <ExclamationTriangleIcon className="h-4 w-4" /> {editNameError} </div> )} </div> <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50"> <button type="button" onClick={closeEditNameModal} disabled={isUpdatingName} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"> Cancel </button> <button type="submit" disabled={isUpdatingName} className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60" > {isUpdatingName ? 'Saving...' : 'Save Name'} </button> </div> </form> </div> </div>)
            )}
            {/* --- Delete Confirmation Modal --- */}
            {isDeleteModalOpen && facultyProfile?.user && ( /* ... (modal JSX remains the same) ... */
                 (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4" aria-labelledby="delete-faculty-modal-title" role="dialog" aria-modal="true"> <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"> <div className="flex justify-between items-center p-4 border-b border-gray-200"> <h2 className="text-lg font-semibold text-red-700 flex items-center gap-2" id="delete-faculty-modal-title"> <ExclamationTriangleIcon className="h-5 w-5 text-red-600"/> Confirm Deletion </h2> <button onClick={closeDeleteModal} disabled={isDeleting} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal"> <XMarkIcon className="h-5 w-5" /> </button> </div> <div className="p-5"> <p className="text-sm text-gray-700 mb-3"> Are you sure you want to permanently delete the faculty member: <br /> <strong className="text-gray-900">{facultyProfile.user.name || facultyProfile.user.email}?</strong> </p> <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100"> This action cannot be undone. All associated profile data (qualifications, licenses, experience, etc.) will also be permanently deleted. </p> {deleteError && ( <div className="mt-3 bg-red-100 border border-red-300 text-red-800 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert"> <ExclamationTriangleIcon className="h-4 w-4" /> {deleteError} </div> )} </div> <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50"> <button type="button" onClick={closeDeleteModal} disabled={isDeleting} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"> Cancel </button> <button type="button" onClick={handleDeleteConfirm} disabled={isDeleting} className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60" > {isDeleting ? 'Deleting...' : 'Confirm Delete'} </button> </div> </div> </div>)
            )}
        </div>
    );
}
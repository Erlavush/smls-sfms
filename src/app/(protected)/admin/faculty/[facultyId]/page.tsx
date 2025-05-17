// src/app/(protected)/admin/faculty/[facultyId]/page.tsx
'use client';

import React, { useState, useEffect, useTransition, useCallback, useRef, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Added for profile image
import { CakeIcon } from '@heroicons/react/24/solid';
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
    Course, SocialMediaLink // Added SocialMediaLink
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
    ArrowLeftIcon, UserCircleIcon as ProfileAvatarIcon, EnvelopeIcon, CalendarDaysIcon, ExclamationTriangleIcon,
    AcademicCapIcon, BriefcaseIcon, IdentificationIcon, StarIcon, SparklesIcon, UsersIcon,
    DocumentTextIcon, PresentationChartBarIcon,
    TagIcon, LightBulbIcon, BookOpenIcon, CheckIcon, CheckCircleIcon,
    TrashIcon, XMarkIcon, PencilIcon, PhoneIcon, MapPinIcon,
    UserIcon as EmployeeIdIcon, ChatBubbleBottomCenterTextIcon, LinkIcon,
    BuildingLibraryIcon // Added for consistency if used in display components
} from '@heroicons/react/24/outline';

// Define Match Strength Type
type CourseMatchStrength = 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';

// Updated structure for faculty profile data (ensure this matches the return type of getFacultyProfileById)
interface FacultyProfileData {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        role: Role | null;
        createdAt: Date;
        specializations: Specialization[];
        profileImageUrl: string | null;
        dateOfBirth: Date | null;
        civilStatus: string | null;
        nationality: string | null;
        contactNumber: string | null;
        address: string | null;
        employeeId: string | null;
        bio: string | null;
        socialMediaLinks: SocialMediaLink[];
    };
    potentialCourses: (Course & {
        requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
        matchStrength: CourseMatchStrength;
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
    catch (e) { console.error("Error formatting date:", e); return 'Invalid Date'; }
};

// Standardized styling classes (can be moved to a shared constants file)
const profileLabelClass = "block text-xs font-medium text-gray-500 mb-0.5";
const basePageActionButtonClasses = "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out disabled:opacity-70";


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

    const fetchProfile = useCallback(async () => {
        if (!facultyId) {
            setProfileError('Faculty ID not found in URL.'); setIsLoadingProfile(false); return;
        }
        setIsLoadingProfile(true); setProfileError(null);
        try {
            const response = await getFacultyProfileById(facultyId);
            if (response.success && response.facultyProfile) {
                setFacultyProfile(response.facultyProfile);
            } else {
                setProfileError(response.error || 'Failed to load faculty profile.'); setFacultyProfile(null);
            }
        } catch (err) {
            setProfileError('An unexpected error occurred.'); setFacultyProfile(null);
        } finally {
            setIsLoadingProfile(false);
        }
    }, [facultyId]);

    const fetchAllSpecializations = useCallback(async () => {
        setIsLoadingSpecs(true); setSpecsError(null);
        try {
            const response = await getSpecializations(); // This action should be for admins
            if (response.success && response.specializations) {
                setAllSpecializations(response.specializations);
            } else {
                setSpecsError(response.error || 'Failed to load specializations list.'); setAllSpecializations([]);
            }
        } catch (err) {
            setSpecsError('An unexpected error occurred.'); setAllSpecializations([]);
        } finally {
            setIsLoadingSpecs(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
        fetchAllSpecializations();
    }, [fetchProfile, fetchAllSpecializations]);

    const handleSpecializationChange = (specializationId: string, isChecked: boolean) => {
        if (!facultyId || isLinkingPending) return;
        setLinkError(null);
        startLinkTransition(async () => {
            const result = isChecked ? await linkSpecializationToFaculty(facultyId, specializationId) : await unlinkSpecializationFromFaculty(facultyId, specializationId);
            if (!result.success) {
                setLinkError(result.error || `Failed to ${isChecked ? 'link' : 'unlink'} specialization.`);
            } else {
                await fetchProfile(); // Refetch profile data
            }
        });
    };

    const openEditNameModal = () => { setEditNameError(null); setIsEditNameModalOpen(true); };
    const closeEditNameModal = () => { if (isUpdatingName) return; setIsEditNameModalOpen(false); setEditNameError(null); };
    const handleNameUpdateSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!facultyId || isUpdatingName || !editNameFormRef.current) return;
        setEditNameError(null);
        const formData = new FormData(editNameFormRef.current);
        formData.append('facultyId', facultyId); // Ensure facultyId is part of the form data for the action
        startNameUpdateTransition(async () => {
            const result = await updateFacultyName(formData);
            if (result.success) {
                closeEditNameModal();
                await fetchProfile();
            } else {
                setEditNameError(result.error || 'Failed to update name.');
            }
        });
    };

    const openDeleteModal = () => { setDeleteError(null); setIsDeleteModalOpen(true); };
    const closeDeleteModal = () => { if (isDeleting) return; setIsDeleteModalOpen(false); setDeleteError(null); };
    const handleDeleteConfirm = () => {
        if (!facultyId || isDeleting) return;
        setDeleteError(null);
        startDeleteTransition(async () => {
            const result = await deleteFacultyUser(facultyId);
            if (result.success) {
                closeDeleteModal();
                router.push('/admin/faculty');
            } else {
                setDeleteError(result.error || 'Failed to delete faculty member.');
            }
        });
    };

    const isLoading = isLoadingProfile || isLoadingSpecs;
    const combinedError = profileError || specsError;

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

    if (combinedError) {
        return (
            <div className="p-6 bg-red-50 min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow border border-red-200 text-center">
                    <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Profile</h2>
                    <p className="text-red-600 mb-6">{combinedError}</p>
                    <Link href="/admin/faculty" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Faculty List
                    </Link>
                </div>
            </div>
        );
    }

    if (!facultyProfile || !facultyProfile.user) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
                <p className="text-gray-600">Faculty profile data not found.</p>
                <Link href="/admin/faculty" className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Faculty List
                </Link>
            </div>
        );
    }

    const { user, suggestedTeachingAreas, potentialCourses, ...cvSections } = facultyProfile;
    const userInitials = user.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || user.email?.charAt(0).toUpperCase() || '?';
    const linkedSpecIds = new Set(user.specializations.map(spec => spec.id));

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            <div className="mb-4">
                <Link href="/admin/faculty" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Faculty List
                </Link>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
                {/* Left Profile Card */}
                <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6 md:mb-0 md:sticky md:top-20 md:self-start">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="flex flex-col items-center p-6 bg-spc-blue-main">
                            <div className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full overflow-hidden bg-gray-300 ring-4 ring-white shadow-lg">
                                {user.profileImageUrl ? (
                                    <Image src={user.profileImageUrl} alt={`${user.name || 'Faculty'}'s profile`} layout="fill" objectFit="cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; const parent = (e.target as HTMLElement).parentElement; if (parent) { parent.innerHTML = `<div class="flex items-center justify-center h-full w-full bg-spc-blue-darker text-white text-5xl font-semibold">${userInitials}</div>`;}}} />
                                ) : (
                                    <div className="flex items-center justify-center h-full w-full bg-spc-blue-darker text-white text-5xl font-semibold">{userInitials}</div>
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-white text-center">{user.name ?? 'N/A'}</h2>
                            <p className="text-sm text-white opacity-80">{user.role}</p>
                        </div>
                        <div className="p-5 space-y-3 text-sm">
                            <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><EnvelopeIcon className="h-4 w-4"/>Email</label><p className="text-gray-900 break-all">{user.email ?? 'N/A'}</p></div>
                            {user.contactNumber && <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><PhoneIcon className="h-4 w-4"/>Contact</label><p className="text-gray-900">{user.contactNumber}</p></div>}
                            {user.employeeId && <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><EmployeeIdIcon className="h-4 w-4"/>Employee ID</label><p className="text-gray-900">{user.employeeId}</p></div>}
                            {user.dateOfBirth && <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><CakeIcon className="h-4 w-4"/>Born</label><p className="text-gray-900">{formatDate(user.dateOfBirth)}</p></div>}
                            {user.civilStatus && <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><IdentificationIcon className="h-4 w-4"/>Civil Status</label><p className="text-gray-900">{user.civilStatus}</p></div>}
                            {user.nationality && <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><IdentificationIcon className="h-4 w-4"/>Nationality</label><p className="text-gray-900">{user.nationality}</p></div>}
                            {user.address && <div><label className={`${profileLabelClass} flex items-start gap-1.5`}><MapPinIcon className="h-4 w-4 mt-0.5"/>Address</label><p className="text-gray-900 whitespace-pre-wrap">{user.address}</p></div>}
                            {(user.bio || user.socialMediaLinks?.length > 0) && <div className="pt-1.5 mt-1.5 border-t border-gray-100"></div>}
                            {user.bio && <div><label className={`${profileLabelClass} flex items-center gap-1.5`}><ChatBubbleBottomCenterTextIcon className="h-4 w-4"/>Bio</label><p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p></div>}
                            {user.socialMediaLinks && user.socialMediaLinks.length > 0 && (
                                <div className="pt-1.5 mt-1.5 border-t border-gray-100 space-y-1">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5"><LinkIcon className="h-4 w-4"/>Social Links</h3>
                                    {user.socialMediaLinks.map(link => (
                                        <a key={link.id} href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-spc-blue-main hover:text-spc-blue-darker hover:underline break-all text-xs">
                                            <LinkIcon className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                                            <span className="font-medium">{link.platform}:</span>
                                            <span className="truncate">{link.url}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2.5">
                            <button onClick={openEditNameModal} disabled={isUpdatingName || isDeleting} className={`${basePageActionButtonClasses} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 w-full`}> <PencilIcon className="h-4 w-4 mr-1.5" /> Edit Name </button>
                            <button onClick={openDeleteModal} disabled={isDeleting} className={`${basePageActionButtonClasses} bg-red-600 hover:bg-red-700 focus:ring-red-500 w-full`}> <TrashIcon className="h-4 w-4 mr-1.5" /> Delete Faculty </button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 space-y-6">
                    {linkError && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded relative flex items-center gap-2" role="alert">
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                            <span className="block sm:inline">{linkError}</span>
                        </div>
                    )}
                    {/* Specializations Management Card */}
                    <div className="rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gray-50"> <TagIcon className="h-5 w-5 text-gray-500" /> <h2 className="text-base font-semibold text-gray-700"> Manage Assigned Specializations </h2> </div>
                        <div className="p-4 sm:p-6">
                            {allSpecializations.length === 0 && !isLoadingSpecs ? ( <p className="text-sm text-gray-500 italic">No specializations defined. <Link href="/admin/specializations" className='text-blue-600 hover:underline'>Manage Specializations</Link></p> ) : isLoadingSpecs ? ( <p className="text-sm text-gray-500 italic">Loading...</p> ) : (
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

                    {/* Suggested Teaching Areas Card */}
                    <div className="rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-indigo-50">
                            <LightBulbIcon className="h-5 w-5 text-indigo-600" />
                            <h2 className="text-base font-semibold text-indigo-800">Expertise / Suggested Teaching Areas</h2>
                        </div>
                        <div className="p-4 sm:p-6">
                            {suggestedTeachingAreas.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No specializations linked.</p>
                            ) : (
                                <ul className="space-y-1.5">
                                    {suggestedTeachingAreas.map((area, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-gray-800">
                                            <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" /><span>{area}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Potential Courses to Teach Card */}
                    <div className="rounded-lg bg-white shadow border border-gray-200 overflow-hidden">
                        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-green-50">
                            <BookOpenIcon className="h-5 w-5 text-green-600" />
                            <h2 className="text-base font-semibold text-green-800">Potential Courses to Teach</h2>
                        </div>
                        <div className="p-4 sm:p-6">
                            {potentialCourses.length > 0 ? (
                                <ul className="space-y-3">
                                    {potentialCourses.map((course) => (
                                        <li key={course.id} className="pb-3 mb-3 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{course.name} {course.code && <span className="text-xs text-gray-500">({course.code})</span>}</p>
                                                    {course.description && (<p className="mt-0.5 text-xs text-gray-600">{course.description}</p>)}
                                                    {course.requiredSpecializations && course.requiredSpecializations.length > 0 && (
                                                        <p className="mt-1 text-xs text-gray-500"><span className="font-medium">Requires:</span> {course.requiredSpecializations.map(spec => spec.name).join(', ')}</p>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    {course.matchStrength === 'FULL_MATCH' && (<span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800"><CheckCircleIcon className="h-4 w-4 mr-1 text-green-600" /> Full Match</span>)}
                                                    {course.matchStrength === 'PARTIAL_MATCH' && (<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800"><ExclamationTriangleIcon className="h-4 w-4 mr-1 text-yellow-600" /> Partial Match</span>)}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<p className="text-sm text-gray-500 italic">No course suggestions based on current specializations.</p>)}
                        </div>
                    </div>

                    {/* Dynamic CV Sections Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {(Object.keys(sectionMetadata) as SectionKey[]).map(sectionKey => {
                            const sectionData = (cvSections as any)[sectionKey];
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
                                                <DisplayComponent item={item} isEditing={false} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Edit Name Modal */}
            {isEditNameModalOpen && facultyProfile?.user && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4" aria-labelledby="edit-name-modal-title" role="dialog" aria-modal="true"> <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"> <form ref={editNameFormRef} onSubmit={handleNameUpdateSubmit}> <div className="flex justify-between items-center p-4 border-b border-gray-200"> <h2 className="text-lg font-semibold text-gray-800" id="edit-name-modal-title">Edit Faculty Name</h2> <button type="button" onClick={closeEditNameModal} disabled={isUpdatingName} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal"> <XMarkIcon className="h-5 w-5" /> </button> </div> <div className="p-5 space-y-4"> <div> <label htmlFor="faculty-name-edit" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label> <input type="text" id="faculty-name-edit" name="name" defaultValue={facultyProfile.user.name || ''} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-70" placeholder="Enter faculty name" disabled={isUpdatingName} /> </div> {editNameError && ( <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert"> <ExclamationTriangleIcon className="h-4 w-4" /> {editNameError} </div> )} </div> <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50"> <button type="button" onClick={closeEditNameModal} disabled={isUpdatingName} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"> Cancel </button> <button type="submit" disabled={isUpdatingName} className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60" > {isUpdatingName ? 'Saving...' : 'Save Name'} </button> </div> </form> </div> </div>
            )}
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && facultyProfile?.user && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4" aria-labelledby="delete-faculty-modal-title" role="dialog" aria-modal="true"> <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all"> <div className="flex justify-between items-center p-4 border-b border-gray-200"> <h2 className="text-lg font-semibold text-red-700 flex items-center gap-2" id="delete-faculty-modal-title"> <ExclamationTriangleIcon className="h-5 w-5 text-red-600"/> Confirm Deletion </h2> <button onClick={closeDeleteModal} disabled={isDeleting} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal"> <XMarkIcon className="h-5 w-5" /> </button> </div> <div className="p-5"> <p className="text-sm text-gray-700 mb-3"> Are you sure you want to permanently delete the faculty member: <br /> <strong className="text-gray-900">{facultyProfile.user.name || facultyProfile.user.email}?</strong> </p> <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100"> This action cannot be undone. All associated profile data (qualifications, licenses, experience, etc.) will also be permanently deleted. </p> {deleteError && ( <div className="mt-3 bg-red-100 border border-red-300 text-red-800 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert"> <ExclamationTriangleIcon className="h-4 w-4" /> {deleteError} </div> )} </div> <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50"> <button type="button" onClick={closeDeleteModal} disabled={isDeleting} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"> Cancel </button> <button type="button" onClick={handleDeleteConfirm} disabled={isDeleting} className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60" > {isDeleting ? 'Deleting...' : 'Confirm Delete'} </button> </div> </div> </div>
            )}
        </div>
    );
}
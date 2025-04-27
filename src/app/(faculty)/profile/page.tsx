'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { getMyProfileData } from '@/lib/userActions';
import type {
    User, // Make sure User type is imported if needed, or adjust ProfileData interface
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
} from '@/generated/prisma'; // Assuming prisma client types are here
import {
    PlusIcon, PencilSquareIcon, XCircleIcon, CheckCircleIcon, AcademicCapIcon, BriefcaseIcon, // Added more icons
    IdentificationIcon, StarIcon, SparklesIcon, UsersIcon, DocumentTextIcon, PresentationChartBarIcon, TrashIcon
} from '@heroicons/react/24/outline';


// Type for the complete fetched profile data structure
interface ProfileData {
    user: { id: string; name: string | null; email: string | null; role: string | null; } | null;
    academicQualifications: AcademicQualification[];
    professionalLicenses: ProfessionalLicense[];
    workExperiences: WorkExperience[];
    professionalAffiliations: ProfessionalAffiliation[];
    awardsRecognitions: AwardRecognition[];
    professionalDevelopments: ProfessionalDevelopment[];
    communityInvolvements: CommunityInvolvement[];
    publications: Publication[];
    conferencePresentations: ConferencePresentation[];
    error?: string;
}

// Define all possible categories and their corresponding data keys and titles/icons
// Define icons for each category
const categoryMetadata = {
    academicQualifications: { title: 'Academic Qualifications', icon: AcademicCapIcon },
    professionalLicenses: { title: 'Professional Licenses', icon: IdentificationIcon },
    workExperiences: { title: 'Work Experience', icon: BriefcaseIcon },
    professionalAffiliations: { title: 'Professional Affiliations', icon: UsersIcon }, // Example icon
    awardsRecognitions: { title: 'Awards & Recognitions', icon: StarIcon }, // Example icon
    professionalDevelopments: { title: 'Professional Development', icon: SparklesIcon }, // Example icon
    communityInvolvements: { title: 'Community Involvement', icon: UsersIcon }, // Reusing example icon
    publications: { title: 'Publications', icon: DocumentTextIcon }, // Example icon
    conferencePresentations: { title: 'Conference Presentations', icon: PresentationChartBarIcon }, // Example icon
} as const;

type CategoryKey = keyof typeof categoryMetadata;
// Type for data structure during editing (might be needed later)
type EditableProfileData = Omit<ProfileData, 'user' | 'error'>;

// Helper to format date strings or return N/A
const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try {
        // Attempt to format assuming it's a valid date string or Date object
        return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        console.error("Error formatting date:", date, e); // Log error
        return 'Invalid Date';
    }
};

export default function ProfilePage() {
    const { status: sessionStatus } = useSession();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageError, setPageError] = useState<string | null>(null);

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [editError, setEditError] = useState<string | null>(null);
    const [editSuccess, setEditSuccess] = useState<string | null>(null);
    const [editableData, setEditableData] = useState<EditableProfileData | null>(null); // Keep for later edit implementation

    // Visible Categories State
    const [visibleCategories, setVisibleCategories] = useState<Set<CategoryKey>>(new Set());
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // --- Fetch data ---
    const fetchProfileData = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true);
        setPageError(null); setEditError(null); setEditSuccess(null);
        try {
            const data = await getMyProfileData();
            if (data.error) {
                setPageError(data.error); setProfileData(null); setVisibleCategories(new Set());
            } else {
                setProfileData(data);
                // Initialize visible categories based on fetched data THAT HAS ITEMS
                const initialVisible = new Set<CategoryKey>();
                (Object.keys(categoryMetadata) as CategoryKey[]).forEach(key => {
                    // Check if the key exists in data and the array has length > 0
                    if (data[key] && Array.isArray(data[key]) && data[key].length > 0) {
                        initialVisible.add(key);
                    }
                });
                setVisibleCategories(initialVisible);
                setIsEditing(false); setEditableData(null); // Reset edit state on fetch
            }
        } catch (err) {
            console.error("Failed to fetch profile data:", err);
            setPageError("An unexpected error occurred while fetching data.");
            setProfileData(null); setVisibleCategories(new Set());
        } finally {
            if (showLoading) setIsLoading(false);
        }
    }, []);

    // --- Initial Fetch and Session Handling ---
    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            // Fetch only if authenticated and data hasn't been loaded or explicitly requested
            if (!profileData && isLoading) {
                fetchProfileData();
            } else if (profileData && isLoading) {
                // If data exists but still loading, stop loading
                setIsLoading(false);
            }
        } else if (sessionStatus === 'unauthenticated') {
            setIsLoading(false); setPageError("Access Denied. Please sign in."); setProfileData(null); setVisibleCategories(new Set());
        } else { // Session status is 'loading'
            setIsLoading(true); // Keep loading true while session loads
        }
    }, [sessionStatus, profileData, isLoading, fetchProfileData]);

    // --- Edit Mode Controls (Placeholders for functionality) ---
    const handleEditToggle = () => {
        if (isEditing) { handleCancelEdit(); }
        else {
            if (!profileData || !profileData.user) { // Ensure data exists before copying
                setPageError("Cannot enter edit mode: Profile data is missing.");
                return;
            }
            setIsEditing(true); setEditError(null); setEditSuccess(null);
            // Deep copy data into editable state
            const dataToEdit: EditableProfileData = {
                academicQualifications: JSON.parse(JSON.stringify(profileData.academicQualifications)),
                professionalLicenses: JSON.parse(JSON.stringify(profileData.professionalLicenses)),
                workExperiences: JSON.parse(JSON.stringify(profileData.workExperiences)),
                professionalAffiliations: JSON.parse(JSON.stringify(profileData.professionalAffiliations)),
                awardsRecognitions: JSON.parse(JSON.stringify(profileData.awardsRecognitions)),
                professionalDevelopments: JSON.parse(JSON.stringify(profileData.professionalDevelopments)),
                communityInvolvements: JSON.parse(JSON.stringify(profileData.communityInvolvements)),
                publications: JSON.parse(JSON.stringify(profileData.publications)),
                conferencePresentations: JSON.parse(JSON.stringify(profileData.conferencePresentations)),
            };
            setEditableData(dataToEdit);
            // Ensure all categories with items are visible when editing starts
            const categoriesToMakeVisible = new Set(visibleCategories);
            (Object.keys(dataToEdit) as CategoryKey[]).forEach(key => {
                if (dataToEdit[key]?.length > 0) { categoriesToMakeVisible.add(key); }
            });
            setVisibleCategories(categoriesToMakeVisible);
        }
    };
    const handleCancelEdit = () => { setIsEditing(false); setEditableData(null); setEditError(null); setEditSuccess(null); }; // Reset editable state
    const handleSaveChanges = () => { alert("Save Changes logic not implemented."); /* Add save logic later */ };
    const handleAddCategory = (categoryKey: CategoryKey) => { setVisibleCategories(prev => new Set(prev).add(categoryKey)); setShowCategoryDropdown(false); };
    const handleDeleteItem = (category: CategoryKey, id: string) => { alert(`Delete item ${id} from ${category} - logic not implemented.`); };
    const handleAddItem = (category: CategoryKey) => { alert(`Add item to ${category} - logic not implemented.`); };


    // --- Render Logic ---
    // 1. Handle Loading State
    if (isLoading || sessionStatus === 'loading') {
        return <div className="p-6 animate-pulse">Loading profile...</div>;
    }

    // 2. Handle Error / Unauthenticated / Missing Data States
    //    THIS IS THE CORRECTED GUARD CLAUSE
    if (pageError || sessionStatus === 'unauthenticated' || !profileData || !profileData.user) {
        return <div className="p-6 text-red-600">Error: {pageError || "Could not load profile data or access denied."}</div>;
    }

    // 3. Data is loaded and user exists, proceed with rendering
    //    We can now safely access profileData and profileData.user
    const displayData = profileData; // Use profileData for display (read-only view)
    const availableToAdd = (Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* --- Header --- */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Edit/Cancel/Save Buttons */}
                    <button onClick={handleEditToggle} disabled={isPending} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 ${isEditing ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600'}`}>
                        {isEditing ? <><XCircleIcon className="h-4 w-4" /> Cancel</> : <><PencilSquareIcon className="h-4 w-4" /> Edit Profile</>}
                    </button>
                    {isEditing && (<button onClick={handleSaveChanges} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70"> {isPending ? ('Saving...') : (<><CheckCircleIcon className="h-4 w-4" /> Save Changes</>)} </button>)}
                    {/* Add Section Dropdown */}
                    <div className="relative">
                        <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} disabled={isPending} className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70" aria-haspopup="true" aria-expanded={showCategoryDropdown}> <PlusIcon className="h-4 w-4" /> Add Section </button>
                        {showCategoryDropdown && (<div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu"> <div className="py-1" role="none"> {availableToAdd.length > 0 ? (availableToAdd.map(key => (<button key={key} onClick={() => handleAddCategory(key)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> {categoryMetadata[key].title} </button>))) : (<p className="px-4 py-2 text-sm text-gray-500">All sections added.</p>)} </div> </div>)}
                    </div>
                </div>
            </div>
            {/* --- Success/Error Messages --- */}
            {editSuccess && <div className="mb-4 rounded-md bg-green-50 p-4 text-sm font-medium text-green-800">{editSuccess}</div>}
            {editError && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm font-medium text-red-800">{editError}</div>}

            {/* --- Basic Info Section --- */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">Basic Information</h2>
                {/* SAFE TO ACCESS displayData.user here because of the check above */}
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                    <div><span className="font-medium text-gray-500">Name:</span> {displayData.user?.name ?? 'N/A'}</div>
                    <div><span className="font-medium text-gray-500">Email:</span> {displayData.user?.email ?? 'N/A'}</div>
                    <div><span className="font-medium text-gray-500">Role:</span> {displayData.user?.role ?? 'N/A'}</div>
                </div>
            </div>

            {/* --- Dynamic Sections Area --- */}
            {visibleCategories.size === 0 && !isLoading && (<div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-center text-gray-500"> No profile sections added yet. Click "Add Section" above to get started. </div>)}
            {/* --- Grid container for the cards --- */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* Map over VISIBLE categories */}
                {Array.from(visibleCategories).map(categoryKey => {
                    const categoryMeta = categoryMetadata[categoryKey];
                    // Get data for the current category from the fetched profileData
                    const categoryData = displayData[categoryKey] ?? []; // Use fetched data
                    const CategoryIcon = categoryMeta.icon;

                    return (
                        <div key={categoryKey} className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <CategoryIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                    <h2 className="text-lg font-semibold text-gray-700">{categoryMeta.title}</h2>
                                </div>
                                {/* Show Add button only in edit mode */}
                                {isEditing && (<button onClick={() => handleAddItem(categoryKey)} className="rounded bg-indigo-50 p-1 text-indigo-600 hover:bg-indigo-100" title={`Add ${categoryMeta.title}`}> <PlusIcon className="h-4 w-4" /> </button>)}
                            </div>
                            {/* Card Body - Display fetched data */}
                            <div className="flex-grow p-4 text-sm text-gray-700">
                                {categoryData.length === 0 ? (
                                    <p className="italic text-gray-400">No items recorded for this section.</p>
                                ) : (
                                    <ul className="space-y-4"> {/* Increased spacing between items */}
                                        {/* Map over the actual data for this category */}
                                        {categoryData.map((item: any, index: number) => ( // Use 'any' for now, or create a union type
                                            <li key={item.id || index} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 relative group"> {/* Added relative/group for delete button positioning */}

                                                {/* === RENDER DATA BASED ON CATEGORY === */}
                                                {/* Academic Qualifications */}
                                                {categoryKey === 'academicQualifications' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.degree || 'N/A'}</p>
                                                        <p className="text-gray-600">{item.institution || 'N/A'}{item.program ? ` - ${item.program}` : ''}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Completed: {item.yearCompleted || 'N/A'}</p>
                                                        {item.diplomaFileUrl && <a href={item.diplomaFileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">View Document</a>}
                                                    </>
                                                )}
                                                {/* Professional Licenses */}
                                                {categoryKey === 'professionalLicenses' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.examination || 'N/A'}</p>
                                                        <p className="text-gray-600">Number: {item.licenseNumber || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Issued: {item.monthYear || 'N/A'} | Expires: {formatDate(item.expiration)}</p>
                                                    </>
                                                )}
                                                {/* Work Experience */}
                                                {categoryKey === 'workExperiences' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.position || 'N/A'}</p>
                                                        <p className="text-gray-600">{item.institution || 'N/A'}</p>
                                                        {item.natureOfWork && <p className="text-xs text-gray-500 italic mt-1">{item.natureOfWork}</p>}
                                                        <p className="text-xs text-gray-500 mt-1">Years: {item.inclusiveYears || 'N/A'}</p>
                                                    </>
                                                )}
                                                {/* Professional Affiliations */}
                                                {categoryKey === 'professionalAffiliations' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.organization || 'N/A'}</p>
                                                        {item.position && <p className="text-gray-600">Position: {item.position}</p>}
                                                        <p className="text-xs text-gray-500 mt-1">Years: {item.inclusiveYears || 'N/A'}</p>
                                                    </>
                                                )}
                                                {/* Awards & Recognitions */}
                                                {categoryKey === 'awardsRecognitions' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.awardName || 'N/A'}</p>
                                                        <p className="text-gray-600">Awarded by: {item.awardingBody || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Year: {item.yearReceived || 'N/A'}</p>
                                                    </>
                                                )}
                                                {/* Professional Development */}
                                                {categoryKey === 'professionalDevelopments' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.title || 'N/A'}</p>
                                                        <p className="text-gray-600">Organizer: {item.organizer || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Date/Location: {item.dateLocation || 'N/A'}</p>
                                                        {item.certificateFileUrl && <a href={item.certificateFileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">View Certificate</a>}
                                                    </>
                                                )}
                                                {/* Community Involvement */}
                                                {categoryKey === 'communityInvolvements' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.engagementTitle || 'N/A'}</p>
                                                        <p className="text-gray-600">Role: {item.role || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Date/Location: {item.locationDate || 'N/A'}</p>
                                                    </>
                                                )}
                                                {/* Publications */}
                                                {categoryKey === 'publications' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.researchTitle || 'N/A'}</p>
                                                        <p className="text-gray-600">Journal: {item.journal || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Published: {formatDate(item.datePublished)}</p>
                                                        {/* Add link/DOI later if needed */}
                                                    </>
                                                )}
                                                {/* Conference Presentations */}
                                                {categoryKey === 'conferencePresentations' && (
                                                    <>
                                                        <p className="font-semibold text-gray-800">{item.paperTitle || 'N/A'}</p>
                                                        <p className="text-gray-600">Event: {item.eventName || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500 mt-1">Date/Location: {item.dateLocation || 'N/A'}</p>
                                                    </>
                                                )}

                                                {/* Delete Button - Show only in edit mode */}
                                                {isEditing && (
                                                    <button
                                                        onClick={() => handleDeleteItem(categoryKey, item.id)}
                                                        className="absolute top-1 right-1 p-0.5 rounded bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition-opacity"
                                                        title={`Delete this ${categoryMeta.title} item`}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
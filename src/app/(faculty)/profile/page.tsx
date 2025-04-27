// src/app/(faculty)/profile/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useTransition, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
// Import the server actions
import { getMyProfileData, updateMyProfile } from '@/lib/userActions';
import type {
    User, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
} from '@/generated/prisma';
import {
    PlusIcon, PencilSquareIcon, XCircleIcon, CheckCircleIcon, AcademicCapIcon, BriefcaseIcon,
    IdentificationIcon, StarIcon, SparklesIcon, UsersIcon, DocumentTextIcon, PresentationChartBarIcon, TrashIcon, PencilIcon, PaperClipIcon
} from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

// Interface for the complete fetched profile data structure
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
const categoryMetadata = {
    academicQualifications: { title: 'Academic Qualifications', icon: AcademicCapIcon },
    professionalLicenses: { title: 'Professional Licenses', icon: IdentificationIcon },
    workExperiences: { title: 'Work Experience', icon: BriefcaseIcon },
    professionalAffiliations: { title: 'Professional Affiliations', icon: UsersIcon },
    awardsRecognitions: { title: 'Awards & Recognitions', icon: StarIcon },
    professionalDevelopments: { title: 'Professional Development', icon: SparklesIcon },
    communityInvolvements: { title: 'Community Involvement', icon: UsersIcon },
    publications: { title: 'Publications', icon: DocumentTextIcon },
    conferencePresentations: { title: 'Conference Presentations', icon: PresentationChartBarIcon },
} as const;

type CategoryKey = keyof typeof categoryMetadata;
// Type for the editable data structure (includes all lists)
type EditableProfileData = Omit<ProfileData, 'user' | 'error'>;

// Helper to format date strings or return N/A
const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try {
        return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        console.error("Error formatting date:", date, e);
        return 'Invalid Date';
    }
};

// Add type for the temporary item structure with file
type TempAcademicQualification = AcademicQualification & {
    _isNew?: boolean;
    _selectedFile?: File | null; // Temporary holder for the selected file object
};

// Union type for items within the editable data state
type EditableItem = TempAcademicQualification | ProfessionalLicense | WorkExperience | any; // Use 'any' or specific Temp types


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
    // State to hold the data being edited
    const [editableData, setEditableData] = useState<EditableProfileData | null>(null);

    // Visible Categories State
    const [visibleCategories, setVisibleCategories] = useState<Set<CategoryKey>>(new Set());
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // --- Fetch data ---
    const fetchProfileData = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true);
        setPageError(null); setEditError(null); setEditSuccess(null); // Reset messages on fetch
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
                // Reset edit state ONLY if we are NOT currently editing
                // This prevents resetting edits if a background refresh happens
                if (!isEditing) {
                    setEditableData(null);
                }
            }
        } catch (err) {
            console.error("Failed to fetch profile data:", err);
            setPageError("An unexpected error occurred while fetching data.");
            setProfileData(null); setVisibleCategories(new Set());
        } finally {
            if (showLoading) setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing]); // Add isEditing dependency to prevent resetting state during edits

    // --- Initial Fetch and Session Handling ---
    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            if (!profileData && isLoading) {
                fetchProfileData();
            } else if (profileData && isLoading) {
                setIsLoading(false);
            }
        } else if (sessionStatus === 'unauthenticated') {
            setIsLoading(false); setPageError("Access Denied. Please sign in."); setProfileData(null); setVisibleCategories(new Set());
        } else { // Session status is 'loading'
            setIsLoading(true);
        }
    }, [sessionStatus, profileData, isLoading, fetchProfileData]);

    // --- Edit Mode Controls ---
    const handleEditToggle = () => {
        if (isEditing) { handleCancelEdit(); }
        else {
            if (!profileData || !profileData.user) {
                setPageError("Cannot enter edit mode: Profile data is missing.");
                return;
            }
            setIsEditing(true); setEditError(null); setEditSuccess(null);
            const dataToEdit: EditableProfileData = {
                academicQualifications: structuredClone(profileData.academicQualifications),
                professionalLicenses: structuredClone(profileData.professionalLicenses),
                workExperiences: structuredClone(profileData.workExperiences),
                professionalAffiliations: structuredClone(profileData.professionalAffiliations),
                awardsRecognitions: structuredClone(profileData.awardsRecognitions),
                professionalDevelopments: structuredClone(profileData.professionalDevelopments),
                communityInvolvements: structuredClone(profileData.communityInvolvements),
                publications: structuredClone(profileData.publications),
                conferencePresentations: structuredClone(profileData.conferencePresentations),
            };
            setEditableData(dataToEdit);
            const categoriesToMakeVisible = new Set(visibleCategories);
            (Object.keys(dataToEdit) as CategoryKey[]).forEach(key => {
                if (dataToEdit[key]?.length > 0) { categoriesToMakeVisible.add(key); }
            });
            setVisibleCategories(categoriesToMakeVisible);
        }
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditableData(null);
        setEditError(null);
        setEditSuccess(null);
        // Optionally refetch or just rely on profileData state
    };

    // --- Save Changes Handler (Using FormData) ---
    const handleSaveChanges = () => {
        if (!editableData) {
            setEditError("No changes to save.");
            return;
        }
        setEditError(null); setEditSuccess(null);

        startTransition(async () => {
            try {
                // Create FormData
                const formData = new FormData();

                // Append Academic Qualifications (JSON + Files)
                const academicQualificationsData = editableData.academicQualifications as TempAcademicQualification[];
                formData.append('academicQualifications_json', JSON.stringify(
                    academicQualificationsData.map(item => {
                        const { _selectedFile, ...rest } = item; // Exclude File object from JSON
                        return rest;
                    })
                ));
                academicQualificationsData.forEach((item) => {
                    if (item._isNew && item._selectedFile) {
                        formData.append(`academicQualification_file_${item.id}`, item._selectedFile);
                    }
                });

                // TODO: Append other sections similarly when they become editable

                // Call the server action with FormData
                const result = await updateMyProfile(formData); // Action needs update to accept FormData

                if (result.success) {
                    setEditSuccess("Profile updated successfully!");
                    setIsEditing(false);
                    setEditableData(null);
                    await fetchProfileData(false); // Refetch data silently
                } else {
                    setEditError(result.error || "Failed to save changes. Please try again.");
                    // Keep editing mode active
                }
            } catch (err: any) {
                console.error("Save changes error:", err);
                setEditError(err.message || "An unexpected error occurred during save.");
                // Keep editing mode active
            }
        });
    };

    const handleAddCategory = (categoryKey: CategoryKey) => {
        setVisibleCategories(prev => new Set(prev).add(categoryKey));
        setShowCategoryDropdown(false);
    };

    // --- Local Delete Handler ---
    const handleDeleteItemLocally = (category: CategoryKey, id: string) => {
        if (!editableData) return;
        setEditableData(prevData => {
             if (!prevData) return null;
             const updatedEditableData = { ...prevData };
             updatedEditableData[category] = (updatedEditableData[category] as any[]).filter(item => item.id !== id);
             return updatedEditableData;
        });
    };

    // --- Local Add Handler ---
    const handleAddItemLocally = (category: CategoryKey) => {
        if (!editableData || !profileData?.user?.id) return;
        const newEditableData = { ...editableData };
        const newItemId = uuidv4();
        let placeholderItem: EditableItem;
        switch (category) {
            case 'academicQualifications':
                placeholderItem = {
                    id: newItemId, degree: '', institution: '', program: '', yearCompleted: new Date().getFullYear(), diplomaFileUrl: null,
                    userId: profileData.user.id, createdAt: new Date(), updatedAt: new Date(), _isNew: true, _selectedFile: null
                } as TempAcademicQualification;
                break;
            default: console.error(`Add handler not implemented for category: ${category}`); return;
        }
        if (!Array.isArray(newEditableData[category])) { newEditableData[category] = []; }
        (newEditableData[category] as EditableItem[]) = [placeholderItem, ...(newEditableData[category] as EditableItem[])];
        setEditableData(newEditableData);
    };

    // --- Input Change Handler ---
    const handleInputChange = (
        category: CategoryKey,
        itemId: string,
        fieldName: keyof AcademicQualification | string,
        value: string | number
    ) => {
        if (category !== 'academicQualifications') { console.warn(`Input change handler not implemented for category: ${category}`); return; }
        if (!editableData) return;
        setEditableData(prevData => {
            if (!prevData) return null;
            const updatedCategoryData = structuredClone(prevData.academicQualifications) as TempAcademicQualification[];
            const itemIndex = updatedCategoryData.findIndex(item => item.id === itemId);
            if (itemIndex === -1) { console.warn(`Item ${itemId} not found`); return prevData; }
            updatedCategoryData[itemIndex] = { ...updatedCategoryData[itemIndex], [fieldName]: value, updatedAt: new Date() };
            return { ...prevData, academicQualifications: updatedCategoryData };
        });
    };

    // --- File Change Handler ---
    const handleFileChange = (
        category: CategoryKey,
        itemId: string,
        file: File | null | undefined
    ) => {
        if (category !== 'academicQualifications') { console.warn(`File change handler not implemented for category: ${category}`); return; }
        if (!editableData) return;
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        if (file && file.size > MAX_FILE_SIZE) { alert(`File size exceeds limit.`); return; }
        if (file && !ALLOWED_TYPES.includes(file.type)) { alert('Invalid file type.'); return; }
        setEditableData(prevData => {
            if (!prevData) return null;
            const updatedCategoryData = structuredClone(prevData.academicQualifications) as TempAcademicQualification[];
            const itemIndex = updatedCategoryData.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prevData;
            updatedCategoryData[itemIndex] = { ...updatedCategoryData[itemIndex], _selectedFile: file ?? null, updatedAt: new Date() };
            return { ...prevData, academicQualifications: updatedCategoryData };
        });
    };

    // --- Render Logic ---
    if (isLoading || sessionStatus === 'loading') {
        return <div className="p-6 animate-pulse">Loading profile...</div>;
    }
    if (pageError || sessionStatus === 'unauthenticated' || !profileData || !profileData.user) {
         return <div className="p-6 text-red-600">Error: {pageError || "Could not load profile data or access denied."}</div>;
    }

    // Determine data source for rendering
    const dataToDisplay = isEditing ? editableData : profileData;
    const finalData = (isEditing && dataToDisplay) ? dataToDisplay : profileData;

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
                    {isEditing && (<button onClick={handleSaveChanges} disabled={isPending} className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70">
                        {isPending ? ('Saving...') : (<><CheckCircleIcon className="h-4 w-4" /> Save Changes</>)}
                     </button>)}
                    {/* Add Section Dropdown */}
                    <div className="relative">
                         <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} disabled={isPending} className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70" aria-haspopup="true" aria-expanded={showCategoryDropdown}> <PlusIcon className="h-4 w-4" /> Add Section </button>
                         {showCategoryDropdown && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                                <div className="py-1" role="none">
                                    {(Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key)).length > 0 ? (
                                        (Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key)).map(key => (
                                            <button key={key} onClick={() => handleAddCategory(key)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                {categoryMetadata[key].title}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="px-4 py-2 text-sm text-gray-500">All sections added.</p>
                                    )}
                                </div>
                            </div>
                         )}
                    </div>
                </div>
            </div>
            {/* --- Success/Error Messages --- */}
            {editSuccess && <div className="mb-4 rounded-md bg-green-50 p-4 text-sm font-medium text-green-800">{editSuccess}</div>}
            {editError && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm font-medium text-red-800">{editError}</div>}
            {pageError && !editError && <div className="mb-4 rounded-md bg-red-50 p-4 text-sm font-medium text-red-800">{pageError}</div>}

            {/* --- Basic Info Section --- */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-700">Basic Information</h2>
                <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                    <div><span className="font-medium text-gray-500">Name:</span> {profileData.user.name ?? 'N/A'}</div>
                    <div><span className="font-medium text-gray-500">Email:</span> {profileData.user.email ?? 'N/A'}</div>
                    <div><span className="font-medium text-gray-500">Role:</span> {profileData.user.role ?? 'N/A'}</div>
                </div>
            </div>

            {/* --- Dynamic Sections Area --- */}
            {visibleCategories.size === 0 && !isLoading && (
                 <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-6 text-center text-gray-500"> No profile sections added yet. Click "Add Section" above to get started. </div>
            )}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {/* Map over VISIBLE categories */}
                {Array.from(visibleCategories).map(categoryKey => {
                    const categoryMeta = categoryMetadata[categoryKey];
                    const categoryData = (finalData?.[categoryKey] ?? []) as any[]; // Use 'any' for map iteration
                    const CategoryIcon = categoryMeta.icon;
                    const isNewItem = (item: any): boolean => !!item._isNew;

                    return (
                        <div key={categoryKey} className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
                                <div className="flex items-center gap-2"> <CategoryIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" /> <h2 className="text-lg font-semibold text-gray-700">{categoryMeta.title}</h2> </div>
                                {isEditing && ( <button onClick={() => handleAddItemLocally(categoryKey)} className="rounded bg-indigo-50 p-1 text-indigo-600 hover:bg-indigo-100" title={`Add ${categoryMeta.title}`} disabled={categoryKey !== 'academicQualifications' /* Only enable Add for handled category */}> <PlusIcon className="h-4 w-4" /> </button> )}
                            </div>
                            {/* Card Body */}
                            <div className="flex-grow p-4 text-sm text-gray-700">
                                {categoryData.length === 0 ? ( <p className="italic text-gray-400">No items recorded.</p> ) : (
                                    <ul className="space-y-4">
                                        {categoryData.map((item: EditableItem, index: number) => ( // Use union type or any
                                            <li key={item.id || index} className={`border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 relative group ${isNewItem(item) ? 'bg-green-50 p-3 rounded border border-dashed border-green-300' : ''}`}>

                                                {/* --- RENDER FORM OR DISPLAY --- */}
                                                {isEditing && isNewItem(item) && categoryKey === 'academicQualifications' ? (
                                                    // --- NEW ITEM FORM (AcademicQualification) ---
                                                    <div className="space-y-3">
                                                        <p className="text-xs font-semibold text-green-700">New Qualification</p>
                                                        {/* Inputs */}
                                                        <div> <label htmlFor={`degree-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Degree*</label> <input type="text" id={`degree-${item.id}`} name="degree" value={item.degree || ''} onChange={(e) => handleInputChange(categoryKey, item.id, 'degree', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70" placeholder="e.g., Bachelor of Science" required disabled={isPending} /> </div>
                                                        <div> <label htmlFor={`institution-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Institution*</label> <input type="text" id={`institution-${item.id}`} name="institution" value={item.institution || ''} onChange={(e) => handleInputChange(categoryKey, item.id, 'institution', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70" placeholder="e.g., San Pedro College" required disabled={isPending} /> </div>
                                                        <div> <label htmlFor={`program-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Program/Major*</label> <input type="text" id={`program-${item.id}`} name="program" value={item.program || ''} onChange={(e) => handleInputChange(categoryKey, item.id, 'program', e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70" placeholder="e.g., Medical Laboratory Science" required disabled={isPending} /> </div>
                                                        <div> <label htmlFor={`yearCompleted-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Year Completed*</label> <input type="number" id={`yearCompleted-${item.id}`} name="yearCompleted" value={item.yearCompleted || ''} onChange={(e) => handleInputChange(categoryKey, item.id, 'yearCompleted', parseInt(e.target.value, 10) || '')} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70" placeholder="YYYY" required min="1900" max={new Date().getFullYear() + 5} disabled={isPending} /> </div>
                                                        {/* File Input */}
                                                        <div> <label htmlFor={`diplomaFile-${item.id}`} className="block text-xs font-medium text-gray-600 mb-1">Upload Diploma/Transcript (Optional)</label> <input type="file" id={`diplomaFile-${item.id}`} name="diplomaFile" onChange={(e) => handleFileChange(categoryKey, item.id, e.target.files?.[0])} className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70" accept=".pdf,.png,.jpg,.jpeg" disabled={isPending} />
                                                            {item._selectedFile && ( <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600"> <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> <span>{item._selectedFile.name}</span> <button type="button" onClick={() => handleFileChange(categoryKey, item.id, null)} className="ml-1 text-red-500 hover:text-red-700" title="Remove file" disabled={isPending}>×</button> </div> )}
                                                            <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, PNG, JPG.</p>
                                                         </div>
                                                    </div>
                                                ) : (
                                                    // --- DISPLAY EXISTING ITEM ---
                                                    <>
                                                        {/* Display logic for Academic Qualifications */}
                                                        {categoryKey === 'academicQualifications' && (
                                                            <>
                                                                <p className="font-semibold text-gray-800">{item.degree || 'N/A'}</p>
                                                                <p className="text-gray-600">{item.institution || 'N/A'}{item.program ? ` - ${item.program}` : ''}</p>
                                                                <p className="text-xs text-gray-500 mt-1">Completed: {item.yearCompleted || 'N/A'}</p>
                                                                {item.diplomaFileUrl && <a href={item.diplomaFileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">View Document</a>}
                                                            </>
                                                        )}
                                                        {/* Display logic for Professional Licenses */}
                                                        {categoryKey === 'professionalLicenses' && (
                                                             <>
                                                                <p className="font-semibold text-gray-800">{item.examination || 'N/A'}</p>
                                                                <p className="text-gray-600">Number: {item.licenseNumber || 'N/A'}</p>
                                                                <p className="text-xs text-gray-500 mt-1">Issued: {item.monthYear || 'N/A'} | Expires: {formatDate(item.expiration)}</p>
                                                             </>
                                                        )}
                                                        {/* Display logic for other categories */}
                                                        {categoryKey === 'workExperiences' && ( <p className="text-xs italic text-gray-400">[Work Experience Display]</p> )}
                                                        {categoryKey === 'professionalAffiliations' && ( <p className="text-xs italic text-gray-400">[Affiliations Display]</p> )}
                                                        {categoryKey === 'awardsRecognitions' && ( <p className="text-xs italic text-gray-400">[Awards Display]</p> )}
                                                        {categoryKey === 'professionalDevelopments' && ( <p className="text-xs italic text-gray-400">[Prof. Dev. Display]</p> )}
                                                        {categoryKey === 'communityInvolvements' && ( <p className="text-xs italic text-gray-400">[Community Display]</p> )}
                                                        {categoryKey === 'publications' && ( <p className="text-xs italic text-gray-400">[Publications Display]</p> )}
                                                        {categoryKey === 'conferencePresentations' && ( <p className="text-xs italic text-gray-400">[Presentations Display]</p> )}
                                                    </>
                                                )}

                                                {/* Action Buttons */}
                                                {isEditing && (
                                                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {/* Edit Button */}
                                                        {!isNewItem(item) && (
                                                            <button onClick={() => alert(`Edit item ${item.id} - not implemented yet`)} className="p-0.5 rounded bg-blue-50 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1" title={`Edit this ${categoryMeta.title} item`} disabled={isPending || categoryKey !== 'academicQualifications'}>
                                                                <PencilIcon className="h-4 w-4" /> <span className="sr-only">Edit</span>
                                                            </button>
                                                        )}
                                                        {/* Delete Button */}
                                                        <button onClick={() => handleDeleteItemLocally(categoryKey, item.id)} className="p-0.5 rounded bg-red-50 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1" title={`Delete this ${categoryMeta.title} item`} disabled={isPending || categoryKey !== 'academicQualifications'}>
                                                            <TrashIcon className="h-4 w-4" /> <span className="sr-only">Delete</span>
                                                        </button>
                                                    </div>
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
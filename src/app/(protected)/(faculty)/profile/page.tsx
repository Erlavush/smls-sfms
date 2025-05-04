// src/app/(protected)/(faculty)/profile/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { getMyProfileData, updateMyProfile } from '@/lib/userActions';
import type {
    User, AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation, ApprovalStatus
} from '@/generated/prisma';
import type {
    EditableItem, TempAcademicQualification, TempProfessionalDevelopment,
    TempProfessionalLicense, TempWorkExperience, TempProfessionalAffiliation,
    TempAwardRecognition, TempCommunityInvolvement, TempPublication, TempConferencePresentation
} from '@/types';
import {
    PlusIcon, PencilSquareIcon, XCircleIcon, CheckCircleIcon, AcademicCapIcon, BriefcaseIcon,
    IdentificationIcon, StarIcon, SparklesIcon, UsersIcon, DocumentTextIcon, PresentationChartBarIcon, TrashIcon, PencilIcon, PaperClipIcon,
    CheckIcon, XMarkIcon, InformationCircleIcon
} from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

// --- Import Display/Form components ---
import AcademicQualificationDisplay from '@/components/profile/AcademicQualificationDisplay';
import AcademicQualificationForm from '@/components/profile/AcademicQualificationForm';
import ProfessionalDevelopmentDisplay from '@/components/profile/ProfessionalDevelopmentDisplay';
import ProfessionalDevelopmentForm from '@/components/profile/ProfessionalDevelopmentForm';
import ProfessionalLicenseDisplay from '@/components/profile/ProfessionalLicenseDisplay';
import ProfessionalLicenseForm from '@/components/profile/ProfessionalLicenseForm';
import WorkExperienceDisplay from '@/components/profile/WorkExperienceDisplay';
import WorkExperienceForm from '@/components/profile/WorkExperienceForm';
import ProfessionalAffiliationDisplay from '@/components/profile/ProfessionalAffiliationDisplay';
import ProfessionalAffiliationForm from '@/components/profile/ProfessionalAffiliationForm';
import AwardRecognitionDisplay from '@/components/profile/AwardRecognitionDisplay';
import AwardRecognitionForm from '@/components/profile/AwardRecognitionForm';
import CommunityInvolvementDisplay from '@/components/profile/CommunityInvolvementDisplay';
import CommunityInvolvementForm from '@/components/profile/CommunityInvolvementForm';
import PublicationDisplay from '@/components/profile/PublicationDisplay';
import PublicationForm from '@/components/profile/PublicationForm';
import ConferencePresentationDisplay from '@/components/profile/ConferencePresentationDisplay';
import ConferencePresentationForm from '@/components/profile/ConferencePresentationForm';
// StatusDisplay is now used internally by the *Display components

// --- Interfaces & Metadata ---
interface ProfileData { user: { id: string; name: string | null; email: string | null; role: string | null; } | null; academicQualifications: AcademicQualification[]; professionalLicenses: ProfessionalLicense[]; workExperiences: WorkExperience[]; professionalAffiliations: ProfessionalAffiliation[]; awardsRecognitions: AwardRecognition[]; professionalDevelopments: ProfessionalDevelopment[]; communityInvolvements: CommunityInvolvement[]; publications: Publication[]; conferencePresentations: ConferencePresentation[]; error?: string; }
const categoryMetadata = { academicQualifications: { title: 'Academic Qualifications', icon: AcademicCapIcon }, professionalLicenses: { title: 'Professional Licenses', icon: IdentificationIcon }, workExperiences: { title: 'Work Experience', icon: BriefcaseIcon }, professionalAffiliations: { title: 'Professional Affiliations', icon: UsersIcon }, awardsRecognitions: { title: 'Awards & Recognitions', icon: StarIcon }, professionalDevelopments: { title: 'Professional Development', icon: SparklesIcon }, communityInvolvements: { title: 'Community Involvement', icon: UsersIcon }, publications: { title: 'Publications', icon: DocumentTextIcon }, conferencePresentations: { title: 'Conference Presentations', icon: PresentationChartBarIcon }, } as const;
type CategoryKey = keyof typeof categoryMetadata;
type EditableProfileData = Omit<ProfileData, 'user' | 'error'>;

// --- Helper Functions ---
const formatDate = (date: string | Date | null | undefined): string => { if (!date) return 'N/A'; try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { console.error("Error formatting date:", date, e); return 'Invalid Date'; } };
const formatDateForInput = (date: string | Date | null | undefined): string => { if (!date) return ''; try { const d = new Date(date); if (isNaN(d.getTime())) return ''; return d.toISOString().split('T')[0]; } catch (e) { console.error("Error formatting date for input:", date, e); return ''; } };

// --- Main Component ---
export default function ProfilePage() {
    // --- State Hooks ---
    const { status: sessionStatus } = useSession();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageError, setPageError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [editError, setEditError] = useState<string | null>(null);
    const [editSuccess, setEditSuccess] = useState<string | null>(null);
    const [editableData, setEditableData] = useState<EditableProfileData | null>(null);
    const [visibleCategories, setVisibleCategories] = useState<Set<CategoryKey>>(new Set());
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [originalItemData, setOriginalItemData] = useState<EditableItem | null>(null);

    // --- Data Fetching ---
    const fetchProfileData = useCallback(async (showLoading = true) => { if (showLoading) setIsLoading(true); setPageError(null); setEditError(null); setEditSuccess(null); try { const data = await getMyProfileData(); if (data.error) { setPageError(data.error); setProfileData(null); setVisibleCategories(new Set()); } else { setProfileData(data); const initialVisible = new Set<CategoryKey>(); (Object.keys(categoryMetadata) as CategoryKey[]).forEach(key => { if (data[key] && Array.isArray(data[key]) && data[key].length > 0) { initialVisible.add(key); } }); setVisibleCategories(initialVisible); setIsEditing(false); setEditableData(null); setEditingItemId(null); setOriginalItemData(null); } } catch (err) { console.error("Failed fetch:", err); setPageError("Unexpected fetch error."); setProfileData(null); setVisibleCategories(new Set()); } finally { if (showLoading) setIsLoading(false); } }, []);
    useEffect(() => { if (sessionStatus === 'authenticated') { if (!profileData && isLoading) { fetchProfileData(); } else if (profileData && isLoading) { setIsLoading(false); } } else if (sessionStatus === 'unauthenticated') { setIsLoading(false); setPageError("Access Denied."); setProfileData(null); setVisibleCategories(new Set()); } else { setIsLoading(true); } }, [sessionStatus, profileData, isLoading, fetchProfileData]);

    // --- Edit Mode Toggles ---
    const handleEditToggle = () => { if (isEditing) { handleCancelEdit(); } else { if (!profileData || !profileData.user) { setPageError("Cannot enter edit mode."); return; } setIsEditing(true); setEditError(null); setEditSuccess(null); const dataToEdit: EditableProfileData = { academicQualifications: structuredClone(profileData.academicQualifications), professionalLicenses: structuredClone(profileData.professionalLicenses), workExperiences: structuredClone(profileData.workExperiences), professionalAffiliations: structuredClone(profileData.professionalAffiliations), awardsRecognitions: structuredClone(profileData.awardsRecognitions), professionalDevelopments: structuredClone(profileData.professionalDevelopments), communityInvolvements: structuredClone(profileData.communityInvolvements), publications: structuredClone(profileData.publications), conferencePresentations: structuredClone(profileData.conferencePresentations), }; setEditableData(dataToEdit); const categoriesToMakeVisible = new Set(visibleCategories); (Object.keys(dataToEdit) as CategoryKey[]).forEach(key => { if (dataToEdit[key]?.length > 0) { categoriesToMakeVisible.add(key); } }); setVisibleCategories(categoriesToMakeVisible); setEditingItemId(null); setOriginalItemData(null); } };
    const handleCancelEdit = () => { setIsEditing(false); setEditableData(null); setEditingItemId(null); setOriginalItemData(null); setEditError(null); setEditSuccess(null); };

    // --- Save Changes ---
    const handleSaveChanges = () => {
        if (!editableData) {
            setEditError("No changes to save.");
            return;
        }
        if (editingItemId !== null) {
            setEditError("Please save or cancel the current item edit before saving all changes.");
            return;
        }
        setEditError(null);
        setEditSuccess(null);

        startTransition(async () => {
            try {
                const formData = new FormData();
                const categoriesWithFiles: CategoryKey[] = [
                    'academicQualifications', 'professionalDevelopments', 'professionalLicenses',
                    'workExperiences', 'professionalAffiliations', 'awardsRecognitions',
                    'communityInvolvements', 'publications', 'conferencePresentations'
                ];

                // Iterate through each category in editableData
                (Object.keys(categoryMetadata) as CategoryKey[]).forEach(categoryKey => {
                    const categoryData = editableData[categoryKey] as EditableItem[] | undefined;
                    
                    if (categoryData) {
                        // 1. First prepare and append the JSON data (excluding file objects)
                        const dataToSend = categoryData.map(item => {
                            const { _selectedFile, ...rest } = item as any;
                            const finalRest = { ...rest };
                            if (item._isNew) {
                                finalRest._isNew = true;
                            }
                            // Clean up dates and handle special fields for JSON
                            const cleanedRest: { [key: string]: any } = {};
                            for (const key in finalRest) {
                                const value = finalRest[key];
                                if (value instanceof Date) {
                                    cleanedRest[key] = !isNaN(value.getTime()) ? value.toISOString() : null;
                                } else {
                                    cleanedRest[key] = value;
                                }
                            }
                            return cleanedRest;
                        });
                        formData.append(`${categoryKey}_json`, JSON.stringify(dataToSend));

                        // 2. Then handle file attachments if this category supports them
                        if (categoriesWithFiles.includes(categoryKey)) {
                            categoryData.forEach(item => {
                                if (item && '_selectedFile' in item && item._selectedFile instanceof File) {
                                    const fileKey = `${categoryKey}_file_${item.id}`;
                                    formData.append(fileKey, item._selectedFile);
                                    console.log(`[Frontend] Appending file to FormData: Key=${fileKey}, File=${item._selectedFile.name}`);
                                }
                            });
                        }
                    }
                });

                // Log FormData contents before sending
                console.log("[Frontend] FormData prepared. Keys:");
                for (const pair of formData.entries()) {
                    console.log(`- ${pair[0]}: ${pair[1] instanceof File ? pair[1].name : 'JSON data'}`);
                }

                // Call the server action
                const result = await updateMyProfile(formData);

                if (result.success) {
                    setEditSuccess("Profile updated successfully!");
                    setIsEditing(false);
                    setEditableData(null);
                    setEditingItemId(null);
                    setOriginalItemData(null);
                    // Refetch data to show updated status and info
                    await fetchProfileData(false); // Fetch without showing main loading spinner
                } else {
                    setEditError(result.error || "Failed to save profile changes.");
                }
            } catch (err: any) {
                console.error("Save error:", err);
                setEditError(err.message || "An unexpected error occurred while saving.");
            }
        });
    };

    // --- Category/Item Local Edit Handlers ---
    const handleAddCategory = (categoryKey: CategoryKey) => { setVisibleCategories(prev => new Set(prev).add(categoryKey)); setShowCategoryDropdown(false); };
    const handleDeleteItemLocally = (category: CategoryKey, id: string) => { if (!editableData) return; setEditableData(prevData => { if (!prevData || !Array.isArray(prevData[category])) return prevData; const updatedEditableData = { ...prevData }; updatedEditableData[category] = (updatedEditableData[category] as any[]).filter(item => item.id !== id); return updatedEditableData; }); if (editingItemId === id) { setEditingItemId(null); setOriginalItemData(null); } };
    const handleAddItemLocally = (category: CategoryKey) => { if (!editableData || !profileData?.user?.id) return; const newEditableData = { ...editableData }; const newItemId = uuidv4(); let placeholderItem: EditableItem; const now = new Date(); const currentUserId = profileData.user.id; const nextYear = new Date(now); nextYear.setFullYear(nextYear.getFullYear() + 1); const defaultStatus: ApprovalStatus = 'PENDING'; switch (category) { case 'academicQualifications': placeholderItem = { id: newItemId, degree: '', institution: '', program: '', yearCompleted: now.getFullYear(), diplomaFileUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempAcademicQualification; break; case 'professionalLicenses': placeholderItem = { id: newItemId, examination: '', monthYear: '', licenseNumber: '', expiration: nextYear, licenseFileUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempProfessionalLicense; break; case 'workExperiences': placeholderItem = { id: newItemId, institution: '', position: '', natureOfWork: null, inclusiveYears: '', proofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempWorkExperience; break; case 'professionalAffiliations': placeholderItem = { id: newItemId, organization: '', position: null, inclusiveYears: '', membershipProofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempProfessionalAffiliation; break; case 'awardsRecognitions': placeholderItem = { id: newItemId, awardName: '', awardingBody: '', yearReceived: now.getFullYear(), certificateUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempAwardRecognition; break; case 'professionalDevelopments': placeholderItem = { id: newItemId, title: '', organizer: '', dateLocation: '', certificateFileUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempProfessionalDevelopment; break; case 'communityInvolvements': placeholderItem = { id: newItemId, engagementTitle: '', role: '', locationDate: '', proofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempCommunityInvolvement; break; case 'publications': placeholderItem = { id: newItemId, researchTitle: '', journal: '', datePublished: now, doiLink: null, pdfUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempPublication; break; case 'conferencePresentations': placeholderItem = { id: newItemId, paperTitle: '', eventName: '', dateLocation: '', proofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempConferencePresentation; break; default: console.error(`Add handler not implemented for: ${category}`); return; } if (!Array.isArray(newEditableData[category])) { newEditableData[category] = []; } (newEditableData[category] as EditableItem[]) = [placeholderItem, ...(newEditableData[category] as EditableItem[])]; setEditableData(newEditableData); handleStartEditingItem(category, newItemId); };
    const handleInputChange = (category: CategoryKey, itemId: string, fieldName: string, value: string | number | Date | null) => { if (!editableData) return; setEditableData(prevData => { if (!prevData || !prevData[category]) return prevData; const updatedCategoryData = structuredClone(prevData[category]) as any[]; const itemIndex = updatedCategoryData.findIndex(item => item.id === itemId); if (itemIndex === -1) { console.warn(`Item ${itemId} not found in ${category}`); return prevData; } const numericFields = ['yearCompleted', 'yearReceived']; let finalValue = value; if (typeof value === 'string' && value.trim() === '') { const requiredFields: { [key: string]: string[] } = { professionalLicenses: ['examination', 'licenseNumber', 'monthYear', 'expiration'], academicQualifications: ['degree', 'institution', 'program', 'yearCompleted'], /* ... other required fields ... */ }; if (!requiredFields[category]?.includes(fieldName)) { finalValue = null; } } else if (numericFields.includes(fieldName)) { finalValue = typeof value === 'string' ? parseInt(value, 10) : value; if (isNaN(finalValue as number)) finalValue = null; } updatedCategoryData[itemIndex] = { ...updatedCategoryData[itemIndex], [fieldName]: finalValue, updatedAt: new Date() }; return { ...prevData, [category]: updatedCategoryData }; }); };
    const handleFileChange = (category: CategoryKey, itemId: string, file: File | null | undefined) => {
        console.log(`[handleFileChange] Category: ${category}, ItemID: ${itemId}, File:`, file); // Log input
        const categoriesWithFiles: CategoryKey[] = [
            'academicQualifications', 'professionalDevelopments', 'professionalLicenses',
            'workExperiences', 'professionalAffiliations', 'awardsRecognitions',
            'communityInvolvements', 'publications', 'conferencePresentations'
        ];
        if (!categoriesWithFiles.includes(category)) {
            console.warn(`File change not supported for: ${category}`);
            return;
        }
        if (!editableData || !editableData[category]) {
            console.warn(`Cannot handle file change: Category ${category} not found`);
            return;
        }

        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

        if (file && file.size > MAX_FILE_SIZE) {
            alert(`File size exceeds limit.`);
            return;
        }
        if (file && !ALLOWED_TYPES.includes(file.type)) {
            alert('Invalid file type.');
            return;
        }

        setEditableData(prevData => {
            if (!prevData) return null;
            const updatedCategoryData = structuredClone(prevData[category]) as EditableItem[];
            const itemIndex = updatedCategoryData.findIndex(item => item.id === itemId);
            if (itemIndex === -1) {
                console.warn(`[handleFileChange] Item ${itemId} not found in ${category}`);
                return prevData;
            }
            const currentItem = updatedCategoryData[itemIndex];

            // Ensure the item structure supports _selectedFile before assigning
            if (currentItem && typeof currentItem === 'object') {
                // Directly update the property
                updatedCategoryData[itemIndex] = {
                    ...currentItem,
                    _selectedFile: file ?? null, // Set the file or null
                    updatedAt: new Date()
                };
                console.log(`[handleFileChange] Updated item ${itemId} state with file:`, file?.name ?? 'null');
            } else {
                console.warn(`[handleFileChange] Item ${itemId} structure issue.`);
            }

            const newState = { ...prevData, [category]: updatedCategoryData };
            console.log("[handleFileChange] New editableData state (relevant item):", updatedCategoryData[itemIndex]);
            return newState;
        });
    };
    const handleStartEditingItem = (category: CategoryKey, itemId: string) => { if (!editableData || !editableData[category]) return; const itemToEdit = (editableData[category] as EditableItem[]).find(item => item.id === itemId); if (itemToEdit) { setOriginalItemData(structuredClone(itemToEdit)); setEditingItemId(itemId); setEditError(null); } else { console.error("Item not found:", itemId); } };
    const handleCancelItemEdit = (category: CategoryKey, itemId: string) => { if (!editableData || !originalItemData || originalItemData.id !== itemId || !editableData[category]) { setEditingItemId(null); setOriginalItemData(null); return; }; setEditableData(prevData => { if (!prevData) return null; const updatedCategoryData = structuredClone(prevData[category]) as EditableItem[]; const itemIndex = updatedCategoryData.findIndex(item => item.id === itemId); if (itemIndex !== -1) { updatedCategoryData[itemIndex] = originalItemData; } return { ...prevData, [category]: updatedCategoryData }; }); setEditingItemId(null); setOriginalItemData(null); };
    const handleSaveEditedItem = (itemId: string) => { setEditingItemId(null); setOriginalItemData(null); };

    // --- Render Loading/Error States ---
    if (isLoading || sessionStatus === 'loading') { return <div className="p-6 animate-pulse text-center text-gray-500">Loading profile data...</div>; }
    if (pageError || sessionStatus === 'unauthenticated' || !profileData || !profileData.user) { return <div className="p-6 text-center text-red-600 bg-red-50 border border-red-200 rounded-md">Error: {pageError || "Could not load profile data or access denied."}</div>; }

    // --- Determine data source ---
    const dataToDisplay = isEditing ? editableData : profileData;
    const finalData = (isEditing && dataToDisplay) ? dataToDisplay : profileData;
    const isNewItem = (item: any): boolean => !!item._isNew;

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* === Page Header & Actions === */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h1>
                 <div className="flex items-center gap-2 flex-wrap">
                     {/* Edit/Cancel Button */}
                     <button
                         onClick={handleEditToggle}
                         disabled={isPending}
                         className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 ${ isEditing ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600' }`}>
                         {isEditing ? ( <><XCircleIcon className="h-4 w-4" /> Cancel</> ) : ( <><PencilSquareIcon className="h-4 w-4" /> Edit Profile</> )}
                     </button>
                      {/* Save Changes Button */}
                     {isEditing && (
                         <button
                             onClick={handleSaveChanges}
                             disabled={isPending || editingItemId !== null}
                             className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed" >
                             {isPending ? ( <> <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> Saving... </> ) : ( <><CheckCircleIcon className="h-4 w-4" /> Save Changes</> )}
                         </button>
                     )}
                     {/* Add Section Button */}
                     <div className="relative">
                         <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} disabled={isPending || isEditing} className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed" aria-haspopup="true" aria-expanded={showCategoryDropdown} >
                             <PlusIcon className="h-4 w-4" /> Add Section
                         </button>
                         {showCategoryDropdown && ( <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu"> <div className="py-1" role="none"> {(Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key)).length > 0 ? ((Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key)).map(key => ( <button key={key} onClick={() => handleAddCategory(key)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" role="menuitem" > {categoryMetadata[key].title} </button> ))) : ( <p className="px-4 py-2 text-sm text-gray-500">All sections added.</p> )} </div> </div> )}
                     </div>
                 </div>
                 {/* Inline Edit Warning */}
                 {isEditing && editingItemId !== null && ( <p className="mt-2 text-xs text-yellow-700 bg-yellow-50 p-2 rounded border border-yellow-200 w-full flex items-center gap-1"> <InformationCircleIcon className='h-4 w-4 flex-shrink-0'/> Finish editing the current item (<CheckIcon className='inline h-3 w-3 text-blue-600'/> <XMarkIcon className='inline h-3 w-3 text-gray-600'/>) before saving all profile changes. </p> )}
            </div>

            {/* === Status Messages === */}
            {editSuccess && <div className="mb-4 rounded-md bg-green-100 p-3 text-sm font-medium text-green-700 border border-green-200">{editSuccess}</div>}
            {editError && <div className="mb-4 rounded-md bg-red-100 p-3 text-sm font-medium text-red-700 border border-red-200">{editError}</div>}
            {pageError && !editError && <div className="mb-4 rounded-md bg-red-100 p-3 text-sm font-medium text-red-700 border border-red-200">{pageError}</div>}

            {/* === Basic Information Card === */}
            <div className="mb-8 rounded-2xl bg-white shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl">
                 <div className="flex items-center gap-5 p-6 sm:p-7 bg-gradient-to-r from-sky-600 to-cyan-500 text-white">
                    <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex-shrink-0">
                        <InformationCircleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h2 className="font-extrabold text-lg sm:text-xl flex-grow tracking-tight text-shadow-sm">Basic Information</h2>
                 </div>
                 <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-3 text-sm sm:grid-cols-2 md:grid-cols-3">
                        <div><span className="font-medium text-gray-500">Name:</span> {profileData.user.name ?? 'N/A'}</div>
                        <div><span className="font-medium text-gray-500">Email:</span> {profileData.user.email ?? 'N/A'}</div>
                        <div><span className="font-medium text-gray-500">Role:</span> {profileData.user.role ?? 'N/A'}</div>
                    </div>
                 </div>
            </div>

            {/* === Dynamic CV Sections Grid === */}
            {visibleCategories.size === 0 && !isLoading && (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-8 text-center text-gray-500">
                    <p className="mb-2">No profile sections added yet.</p>
                    <p className="text-sm">Click "Add Section" above to get started.</p>
                 </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {Array.from(visibleCategories).map(categoryKey => {
                    const categoryMeta = categoryMetadata[categoryKey];
                    const categoryData = (finalData?.[categoryKey] ?? []) as any[];
                    const CategoryIcon = categoryMeta.icon;
                    const isCategoryEditable = true;

                    return (
                        // ** CARD STYLING FROM TEMPLATE **
                        <div
                            key={categoryKey}
                            className="flex flex-col rounded-2xl bg-white shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Card Header (Gradient, Icon, Title) */}
                            <div className="flex items-center gap-5 p-6 sm:p-7 bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                                <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex-shrink-0">
                                    <CategoryIcon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                                </div>
                                <h2 className="font-extrabold text-lg sm:text-xl flex-grow tracking-tight text-shadow-sm">
                                    {categoryMeta.title}
                                </h2>
                                {/* Add Button (+) */}
                                {isEditing && (
                                    <button
                                        onClick={() => handleAddItemLocally(categoryKey)}
                                        className="ml-auto flex-shrink-0 rounded-full bg-white/25 p-1.5 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                                        title={`Add ${categoryMeta.title}`}
                                        disabled={editingItemId !== null || !isCategoryEditable || isPending}
                                    >
                                        <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                )}
                            </div>

                            {/* Card Body */}
                            <div className="flex-grow p-6 sm:p-8">
                                {categoryData.length === 0 ? (
                                    <p className="italic text-gray-400 text-center py-4">No items recorded.</p>
                                ) : (
                                    <ul className="space-y-6">
                                        {categoryData.map((item: EditableItem, index: number) => (
                                            <li key={item.id || index} className={`relative group ${
                                                isEditing && item.id === editingItemId ? 'bg-blue-50 p-4 rounded-md border border-dashed border-blue-300 shadow-inner -m-4'
                                                : isNewItem(item) ? 'bg-green-50 p-4 rounded-md border border-dashed border-green-300 shadow-inner -m-4'
                                                : 'pb-6 border-b border-gray-100 last:border-b-0 last:pb-0'
                                            }`}>
                                                {/* === RENDER FORM OR DISPLAY === */}
                                                {isEditing && isCategoryEditable && (isNewItem(item) || item.id === editingItemId) ? (
                                                    <>
                                                        {categoryKey === 'academicQualifications' && ( <AcademicQualificationForm item={item as TempAcademicQualification} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'professionalDevelopments' && ( <ProfessionalDevelopmentForm item={item as TempProfessionalDevelopment} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'professionalLicenses' && ( <ProfessionalLicenseForm item={item as TempProfessionalLicense} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'workExperiences' && ( <WorkExperienceForm item={item as TempWorkExperience} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'professionalAffiliations' && ( <ProfessionalAffiliationForm item={item as TempProfessionalAffiliation} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'awardsRecognitions' && ( <AwardRecognitionForm item={item as TempAwardRecognition} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'communityInvolvements' && ( <CommunityInvolvementForm item={item as TempCommunityInvolvement} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'publications' && ( <PublicationForm item={item as TempPublication} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}
                                                        {categoryKey === 'conferencePresentations' && ( <ConferencePresentationForm item={item as TempConferencePresentation} isPending={isPending} handleInputChange={handleInputChange.bind(null, categoryKey)} handleFileChange={handleFileChange.bind(null, categoryKey)} /> )}

                                                        {/* Item specific Save/Cancel Buttons */}
                                                        {!isNewItem(item) && item.id === editingItemId && (
                                                            <div className='flex justify-end gap-2 mt-3'>
                                                                <button onClick={() => handleCancelItemEdit(categoryKey, item.id)} disabled={isPending} className='inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400'> <XMarkIcon className='h-3 w-3'/> Cancel </button>
                                                                <button onClick={() => handleSaveEditedItem(item.id)} disabled={isPending} className='inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'> <CheckIcon className='h-3 w-3'/> Save Item </button>
                                                            </div>
                                                        )}
                                                        {/* Remove button for NEW items */}
                                                         {isNewItem(item) && (
                                                            <div className="text-right mt-2">
                                                                <button onClick={() => handleDeleteItemLocally(categoryKey, item.id)} className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 disabled:opacity-50" disabled={isPending} title="Remove this new item"> <TrashIcon className="h-3 w-3" /> Remove </button>
                                                            </div>
                                                         )}
                                                    </>
                                                ) : (
                                                    // --- RENDER DISPLAY (Pass item) ---
                                                    <>
                                                        {categoryKey === 'academicQualifications' && ( <AcademicQualificationDisplay item={item as AcademicQualification} /> )}
                                                        {categoryKey === 'professionalDevelopments' && ( <ProfessionalDevelopmentDisplay item={item as ProfessionalDevelopment} /> )}
                                                        {categoryKey === 'professionalLicenses' && ( <ProfessionalLicenseDisplay item={item as ProfessionalLicense} /> )}
                                                        {categoryKey === 'workExperiences' && ( <WorkExperienceDisplay item={item as WorkExperience} /> )}
                                                        {categoryKey === 'professionalAffiliations' && ( <ProfessionalAffiliationDisplay item={item as ProfessionalAffiliation} /> )}
                                                        {categoryKey === 'awardsRecognitions' && ( <AwardRecognitionDisplay item={item as AwardRecognition} /> )}
                                                        {categoryKey === 'communityInvolvements' && ( <CommunityInvolvementDisplay item={item as CommunityInvolvement} /> )}
                                                        {categoryKey === 'publications' && ( <PublicationDisplay item={item as Publication} /> )}
                                                        {categoryKey === 'conferencePresentations' && ( <ConferencePresentationDisplay item={item as ConferencePresentation} /> )}
                                                    </>
                                                )}

                                                {/* Action Buttons (Edit/Delete) for EXISTING items in EDIT mode */}
                                                {isEditing && item.id !== editingItemId && !isNewItem(item) && (
                                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        {isCategoryEditable && (
                                                            <button onClick={() => handleStartEditingItem(categoryKey, item.id)} className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1" title={`Edit`} disabled={isPending || editingItemId !== null} > <PencilIcon className="h-3.5 w-3.5" /> </button>
                                                        )}
                                                        <button onClick={() => handleDeleteItemLocally(categoryKey, item.id)} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-400 focus:ring-offset-1" title={`Delete`} disabled={isPending || editingItemId !== null} > <TrashIcon className="h-3.5 w-3.5" /> </button>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div> {/* End Card Body */}
                        </div> // End Card Styling
                    );
                })}
            </div> {/* End Grid */}
        </div> // End Page Container
    );
}
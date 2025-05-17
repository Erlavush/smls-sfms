// src/hooks/useProfileDataManagement.ts
'use client';

import { useState, useEffect, useCallback, useTransition, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { getMyProfileData, updateMyProfile } from '@/lib/userActions';
import type {
    UserProfilePageData,
    EditableProfilePageData,
    ProfileUser,
    TempSocialMediaLink,
    EditableCvItem,
    CategoryKey,
    TempCommon,
    TempAcademicQualification,
    TempProfessionalLicense,
    TempWorkExperience,
    TempProfessionalAffiliation,
    TempAwardRecognition,
    TempProfessionalDevelopment,
    TempCommunityInvolvement,
    TempPublication,
    TempConferencePresentation,
} from '@/types';
import type { ApprovalStatus } from '@/generated/prisma';
import { defaultTempSocialMediaLink, categoryMetadata } from '@/lib/profileUtils';

interface UseProfileDataManagementReturn extends EditableProfilePageData {
    profileData: UserProfilePageData | null;
    isLoading: boolean;
    pageError: string | null;
    editError: string | null;
    editSuccess: string | null;
    isEditingPage: boolean;
    editingItemId: string | null;
    isSaving: boolean;
    changedItemIds: Set<string>;

    fetchProfileData: (showLoadingIndicator?: boolean) => Promise<void>;
    handleEditToggle: () => void;
    handleSaveChanges: () => Promise<void>;

    handleUserDetailChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleUserDateChange: (name: 'dateOfBirth', value: string) => void;

    selectedProfileImageFile: File | null;
    profileImagePreview: string | null;
    handleProfileImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;

    handleAddSocialMediaLink: () => void;
    handleSocialMediaLinkChange: (index: number, field: keyof Pick<TempSocialMediaLink, 'platform' | 'url'>, value: string) => void;
    handleDeleteSocialMediaLink: (index: number) => void;

    handleAddItemLocally: (categoryKey: CategoryKey) => void;
    handleDeleteItemLocally: (categoryKey: CategoryKey, itemId: string) => void;
    handleStartEditingCvItem: (categoryKey: CategoryKey, itemId: string) => void;
    handleCancelCvItemEdit: (categoryKey: CategoryKey, itemId: string) => void;
    handleSaveCvItemEdit: (itemId: string) => void;
    handleCvItemInputChange: (categoryKey: CategoryKey, itemId: string, fieldName: string, value: any) => void;
    handleCvItemFileChange: (categoryKey: CategoryKey, itemId: string, file: File | null | undefined) => void;

    visibleCategories: Set<CategoryKey>;
    setVisibleCategories: React.Dispatch<React.SetStateAction<Set<CategoryKey>>>;
    showCategoryDropdown: boolean;
    setShowCategoryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddCategoryToView: (categoryKey: CategoryKey) => void;
}

export function useProfileDataManagement(): UseProfileDataManagementReturn {
    const { data: session, status: sessionStatus } = useSession();
    const currentUserId = (session?.user as any)?.id;

    const [profileData, setProfileData] = useState<UserProfilePageData | null>(null);
    const [editableData, setEditableData] = useState<EditableProfilePageData | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start true for initial load
    const [pageError, setPageError] = useState<string | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const [editSuccess, setEditSuccess] = useState<string | null>(null);
    const [isEditingPage, setIsEditingPage] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [originalCvItemData, setOriginalCvItemData] = useState<EditableCvItem | null>(null);
    const [changedItemIds, setChangedItemIds] = useState<Set<string>>(new Set());
    const [isSaving, startSaveTransition] = useTransition();

    const [selectedProfileImageFile, setSelectedProfileImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

    const [visibleCategories, setVisibleCategories] = useState<Set<CategoryKey>>(new Set());
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const initializeEditableData = useCallback((data: UserProfilePageData) => {
        console.log("initializeEditableData: Called. data.user exists?", !!data.user);
        if (!data.user) {
            setEditableData(null);
            return;
        }
        const clonedUser: Partial<ProfileUser> = structuredClone(data.user);
        const clonedSocialLinks: TempSocialMediaLink[] = (data.user.socialMediaLinks || []).map(link => ({
            ...structuredClone(link),
            id: link.id || `temp-${uuidv4()}`,
            _isNew: false
        }));

        setEditableData({
            user: clonedUser,
            socialMediaLinks: clonedSocialLinks,
            academicQualifications: data.academicQualifications.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            professionalLicenses: data.professionalLicenses.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            workExperiences: data.workExperiences.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            professionalAffiliations: data.professionalAffiliations.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            awardsRecognitions: data.awardsRecognitions.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            professionalDevelopments: data.professionalDevelopments.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            communityInvolvements: data.communityInvolvements.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            publications: data.publications.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
            conferencePresentations: data.conferencePresentations.map(item => ({ ...structuredClone(item), _isNew: false, _selectedFile: null })),
        });
        console.log("initializeEditableData: Finished successfully.");
    }, []);

    const fetchProfileData = useCallback(async (showLoadingIndicator = true) => {
        if (showLoadingIndicator) {
            setIsLoading(true);
            console.log("fetchProfileData: Called. showLoadingIndicator = true. setIsLoading(true).");
        } else {
            console.log("fetchProfileData: Called. showLoadingIndicator = false. Not setting isLoading to true here.");
        }
        setPageError(null); setEditError(null); setEditSuccess(null);

        try {
            const fetchedDataResult = await getMyProfileData();
            console.log("fetchProfileData: getMyProfileData result =", fetchedDataResult);

            if ('error' in fetchedDataResult) {
                setPageError(fetchedDataResult.error || "User data not found.");
                setProfileData(null); setEditableData(null); setVisibleCategories(new Set());
            } else if (!fetchedDataResult.user) {
                setPageError("User data not found in fetched profile.");
                setProfileData(null); setEditableData(null); setVisibleCategories(new Set());
            } else {
                setProfileData(fetchedDataResult);
                initializeEditableData(fetchedDataResult);

                const initialVisible = new Set<CategoryKey>();
                const allCategoryKeys = Object.keys(categoryMetadata) as CategoryKey[];
                allCategoryKeys.forEach(key => {
                    const categoryItems = fetchedDataResult[key] as EditableCvItem[] | undefined;
                    if (categoryItems && categoryItems.length > 0) {
                        initialVisible.add(key);
                    }
                });
                setVisibleCategories(initialVisible);
                setIsEditingPage(false);
                setEditingItemId(null); setOriginalCvItemData(null);
                setChangedItemIds(new Set());
                setSelectedProfileImageFile(null); setProfileImagePreview(null);
            }
        } catch (err: any) {
            setPageError(`Unexpected error fetching profile: ${err.message}`);
            setProfileData(null); setEditableData(null); setVisibleCategories(new Set());
        } finally {
            // ALWAYS set isLoading to false after the fetch attempt
            setIsLoading(false);
            console.log("fetchProfileData: FINALLY block. isLoading ALWAYS set to false.");
        }
    }, [initializeEditableData]);

    const handleDeleteItemLocally = useCallback((categoryKey: CategoryKey, itemId: string) => {
        setEditableData(prev => {
            if (!prev || !(prev[categoryKey] as EditableCvItem[] | undefined)) return prev;
            return { ...prev, [categoryKey]: (prev[categoryKey] as EditableCvItem[]).filter(item => item.id !== itemId) };
        });
        if (editingItemId === itemId) { setEditingItemId(null); setOriginalCvItemData(null); }
        setChangedItemIds(prev => { const newSet = new Set(prev); newSet.delete(itemId); return newSet; });
    }, [editingItemId]);

    const handleCancelCvItemEdit = useCallback((categoryKey: CategoryKey, itemId: string) => {
        if (originalCvItemData && originalCvItemData.id === itemId) {
            setEditableData(prev => {
                if (!prev || !(prev[categoryKey] as EditableCvItem[] | undefined)) return prev;
                const items = prev[categoryKey] as EditableCvItem[];
                const itemIndex = items.findIndex(item => item.id === itemId);
                if (itemIndex !== -1) {
                    const updatedItems = [...items];
                    updatedItems[itemIndex] = originalCvItemData;
                    return { ...prev, [categoryKey]: updatedItems };
                }
                return prev;
            });
            setChangedItemIds(prev => {
                const newSet = new Set(prev);
                if (!(originalCvItemData as TempCommon)._isNew) newSet.delete(itemId);
                return newSet;
            });
        } else if ((editableData?.[categoryKey] as EditableCvItem[] | undefined)?.find(i => i.id === itemId && (i as TempCommon)._isNew)) {
            handleDeleteItemLocally(categoryKey, itemId);
        }
        setEditingItemId(null);
        setOriginalCvItemData(null);
    }, [originalCvItemData, editableData, handleDeleteItemLocally]);


    useEffect(() => {
        console.log("ProfilePage useEffect: Triggered. sessionStatus =", sessionStatus, "currentUserId =", currentUserId, "profileData exists?", !!profileData);

        if (sessionStatus === 'authenticated' && currentUserId) {
            // Fetch data only once when authenticated and user ID is available,
            // and profileData hasn't been loaded yet.
            if (!profileData) { // This implies it's the first load or data was cleared
                console.log("ProfilePage useEffect: Authenticated, no profileData. Calling fetchProfileData.");
                fetchProfileData(true); // showLoadingIndicator true by default, isLoading will be set to true inside.
            } else {
                // Data already loaded, ensure isLoading is false if it's not already.
                // This might happen if the component re-renders for other reasons after data is loaded.
                if (isLoading) setIsLoading(false);
                console.log("ProfilePage useEffect: Authenticated and profileData exists. Ensuring isLoading is false.");
            }
        } else if (sessionStatus === 'unauthenticated') {
            console.log("ProfilePage useEffect: Unauthenticated. Clearing data and setting error.");
            setIsLoading(false);
            setPageError("Access Denied. Please log in.");
            setProfileData(null);
            setEditableData(null);
            setVisibleCategories(new Set());
        } else if (sessionStatus === 'loading') {
            console.log("ProfilePage useEffect: Session is loading. Setting isLoading to true.");
            setIsLoading(true); // Page is loading because session is loading
        }
    }, [sessionStatus, currentUserId, fetchProfileData, profileData, isLoading]); // Added isLoading to dependencies


    const handleEditToggle = useCallback(() => {
        if (isEditingPage) {
            setIsEditingPage(false);
            setEditError(null); setEditSuccess(null);
            setChangedItemIds(new Set());
            setSelectedProfileImageFile(null); setProfileImagePreview(null);
            if (profileData) initializeEditableData(profileData);
            if (editingItemId && originalCvItemData) {
                let categoryOfEditingItem: CategoryKey | null = null;
                const cvCategoryKeys = Object.keys(categoryMetadata) as CategoryKey[];
                for (const catKey of cvCategoryKeys) {
                    if (editableData && (editableData as any)[catKey]?.find((i: EditableCvItem) => i.id === editingItemId)) {
                        categoryOfEditingItem = catKey;
                        break;
                    }
                }
                if (categoryOfEditingItem) {
                    handleCancelCvItemEdit(categoryOfEditingItem, editingItemId);
                }
            }
            setEditingItemId(null); setOriginalCvItemData(null);
        } else {
            if (!profileData || !profileData.user) {
                setPageError("Cannot enter edit mode: Profile data missing."); return;
            }
            setIsEditingPage(true);
            setEditError(null); setEditSuccess(null);
            setSelectedProfileImageFile(null); setProfileImagePreview(null);
            if (profileData) initializeEditableData(profileData);

            const categoriesToMakeVisible = new Set(visibleCategories);
            const allCategoryKeys = Object.keys(categoryMetadata) as CategoryKey[];
            allCategoryKeys.forEach(key => {
                const categoryItems = profileData[key] as EditableCvItem[] | undefined;
                if (categoryItems && categoryItems.length > 0) {
                    categoriesToMakeVisible.add(key);
                }
            });
            setVisibleCategories(categoriesToMakeVisible);
            setEditingItemId(null); setOriginalCvItemData(null);
            setChangedItemIds(new Set());
        }
    }, [isEditingPage, profileData, initializeEditableData, editingItemId, originalCvItemData, visibleCategories, editableData, handleCancelCvItemEdit]);

    const handleUserDetailChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditableData(prev => {
            if (!prev || !prev.user) return prev;
            return { ...prev, user: { ...prev.user, [name]: value.trim() === '' && !['name', 'email'].includes(name) ? null : value } };
        });
        setChangedItemIds(prev => new Set(prev).add('user_details'));
    }, []);

    const handleUserDateChange = useCallback((name: 'dateOfBirth', value: string) => {
        setEditableData(prev => {
            if (!prev || !prev.user) return prev;
            return { ...prev, user: { ...prev.user, [name]: value ? new Date(value + "T00:00:00Z") : null } };
        });
        setChangedItemIds(prev => new Set(prev).add('user_details'));
    }, []);

    const handleProfileImageSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const MAX_FILE_SIZE = 2 * 1024 * 1024;
            const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
            if (file.size > MAX_FILE_SIZE) { alert('Image size exceeds 2MB.'); event.target.value = ''; return; }
            if (!ALLOWED_TYPES.includes(file.type)) { alert('Invalid image type (PNG, JPG, JPEG only).'); event.target.value = ''; return; }
            setSelectedProfileImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setProfileImagePreview(reader.result as string);
            reader.readAsDataURL(file);
            setChangedItemIds(prev => new Set(prev).add('user_profileImage'));
        }
    }, []);

    const handleAddSocialMediaLink = useCallback(() => {
        if (!currentUserId) return;
        setEditableData(prev => {
            if (!prev) return prev;
            const newLink = defaultTempSocialMediaLink(currentUserId);
            return { ...prev, socialMediaLinks: [...(prev.socialMediaLinks || []), newLink] };
        });
        setChangedItemIds(prev => new Set(prev).add('user_socialMediaLinks'));
    }, [currentUserId]);

    const handleSocialMediaLinkChange = useCallback((index: number, field: keyof Pick<TempSocialMediaLink, 'platform' | 'url'>, value: string) => {
        setEditableData(prev => {
            if (!prev || !prev.socialMediaLinks || !prev.socialMediaLinks[index]) return prev;
            const updatedLinks = prev.socialMediaLinks.map((link, i) => i === index ? { ...link, [field]: value } : link);
            return { ...prev, socialMediaLinks: updatedLinks };
        });
        setChangedItemIds(prev => new Set(prev).add('user_socialMediaLinks'));
    }, []);

    const handleDeleteSocialMediaLink = useCallback((index: number) => {
        setEditableData(prev => {
            if (!prev || !prev.socialMediaLinks) return prev;
            return { ...prev, socialMediaLinks: prev.socialMediaLinks.filter((_, i) => i !== index) };
        });
        setChangedItemIds(prev => new Set(prev).add('user_socialMediaLinks'));
    }, []);

    const handleAddItemLocally = useCallback((categoryKey: CategoryKey) => {
        if (!editableData || !currentUserId) return;
        const newItemId = uuidv4();
        let placeholderItem: EditableCvItem;
        const now = new Date();
        const defaultStatus: ApprovalStatus = 'PENDING';

        switch (categoryKey) {
            case 'academicQualifications': placeholderItem = { id: newItemId, degree: '', institution: '', program: '', yearCompleted: now.getFullYear(), diplomaFileUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempAcademicQualification; break;
            case 'professionalLicenses': placeholderItem = { id: newItemId, examination: '', licenseNumber: '', monthYear: '', expiration: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()), licenseFileUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempProfessionalLicense; break;
            case 'workExperiences': placeholderItem = { id: newItemId, institution: '', position: '', natureOfWork: null, inclusiveYears: '', proofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempWorkExperience; break;
            case 'professionalAffiliations': placeholderItem = { id: newItemId, organization: '', position: null, inclusiveYears: '', membershipProofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempProfessionalAffiliation; break;
            case 'awardsRecognitions': placeholderItem = { id: newItemId, awardName: '', awardingBody: '', yearReceived: now.getFullYear(), certificateUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempAwardRecognition; break;
            case 'professionalDevelopments': placeholderItem = { id: newItemId, title: '', organizer: '', dateLocation: '', certificateFileUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempProfessionalDevelopment; break;
            case 'communityInvolvements': placeholderItem = { id: newItemId, engagementTitle: '', role: '', locationDate: '', proofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempCommunityInvolvement; break;
            case 'publications': placeholderItem = { id: newItemId, researchTitle: '', journal: '', datePublished: now, doiLink: null, pdfUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempPublication; break;
            case 'conferencePresentations': placeholderItem = { id: newItemId, paperTitle: '', eventName: '', dateLocation: '', proofUrl: null, userId: currentUserId, createdAt: now, updatedAt: now, status: defaultStatus, rejectionReason: null, _isNew: true, _selectedFile: null } as TempConferencePresentation; break;
            default:
                const exhaustiveCheck: never = categoryKey; // Ensures all cases are handled
                console.error(`Add handler not implemented for category: ${exhaustiveCheck}`); return;
        }

        setEditableData(prev => {
            if (!prev) return null;
            const currentCategoryItems = (prev[categoryKey] as EditableCvItem[] | undefined) || [];
            return { ...prev, [categoryKey]: [placeholderItem, ...currentCategoryItems] };
        });
        setEditingItemId(newItemId);
        setOriginalCvItemData(null);
        setChangedItemIds(prev => new Set(prev).add(newItemId));
    }, [editableData, currentUserId]);


    const handleStartEditingCvItem = useCallback((categoryKey: CategoryKey, itemId: string) => {
        if (!editableData || !(editableData[categoryKey] as EditableCvItem[] | undefined)) return;
        const itemToEdit = (editableData[categoryKey] as EditableCvItem[]).find(item => item.id === itemId);
        if (itemToEdit) {
            setOriginalCvItemData(structuredClone(itemToEdit));
            setEditingItemId(itemId);
            setEditError(null);
        }
    }, [editableData]);

    const handleSaveCvItemEdit = useCallback((itemId: string) => {
        setEditingItemId(null);
        setOriginalCvItemData(null);
    }, []);

    const handleCvItemInputChange = useCallback((categoryKey: CategoryKey, itemId: string, fieldName: string, value: any) => {
        setEditableData(prev => {
            if (!prev || !(prev[categoryKey] as EditableCvItem[] | undefined)) return prev;
            const items = prev[categoryKey] as EditableCvItem[];
            const itemIndex = items.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prev;

            const updatedItems = [...items];
            const updatedItem = { ...updatedItems[itemIndex], [fieldName]: value, updatedAt: new Date() };

            if (['yearCompleted', 'yearReceived'].includes(fieldName)) {
                const numVal = parseInt(value, 10);
                (updatedItem as any)[fieldName] = isNaN(numVal) ? null : numVal;
            } else if (typeof value === 'string' && value.trim() === '' && !['degree', 'examination', 'position', 'title', 'awardName', 'researchTitle', 'paperTitle', 'institution', 'program', 'licenseNumber', 'monthYear', 'inclusiveYears', 'organization', 'organizer', 'dateLocation', 'engagementTitle', 'role', 'journal' ].includes(fieldName)) {
                 (updatedItem as any)[fieldName] = null;
            }

            updatedItems[itemIndex] = updatedItem;
            return { ...prev, [categoryKey]: updatedItems };
        });
        setChangedItemIds(prev => new Set(prev).add(itemId));
    }, []);

    const handleCvItemFileChange = useCallback((categoryKey: CategoryKey, itemId:string, file: File | null | undefined) => {
        setEditableData(prev => {
            if (!prev || !(prev[categoryKey] as EditableCvItem[] | undefined)) return prev;
            const items = prev[categoryKey] as EditableCvItem[];
            const itemIndex = items.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return prev;

            const updatedItems = [...items];
            (updatedItems[itemIndex] as any)._selectedFile = file ?? null;
            (updatedItems[itemIndex] as any).updatedAt = new Date();
            return { ...prev, [categoryKey]: updatedItems };
        });
        setChangedItemIds(prev => new Set(prev).add(itemId));
    }, []);

    const handleAddCategoryToView = useCallback((categoryKey: CategoryKey) => {
        setVisibleCategories(prev => new Set(prev).add(categoryKey));
        setShowCategoryDropdown(false);
    }, []);

    const handleSaveChanges = useCallback(async () => {
        if (!editableData || !currentUserId) {
            setEditError("No data to save or user not identified.");
            return;
        }
        if (editingItemId !== null) {
            setEditError("Please save or cancel the current item edit before saving all changes.");
            return;
        }
        setEditError(null); setEditSuccess(null);

        startSaveTransition(async () => {
            const formData = new FormData();
            let actualChangesMade = false;

            if (selectedProfileImageFile) {
                formData.append('user_profileImageFile', selectedProfileImageFile);
                actualChangesMade = true;
            }

            if (changedItemIds.has('user_details') || selectedProfileImageFile) {
                if (editableData.user) {
                    const userPayload = { ...editableData.user };
                    delete (userPayload as any).socialMediaLinks;
                    delete (userPayload as any).profileImageUrl;
                    formData.append('user_details_json', JSON.stringify(userPayload));
                    actualChangesMade = true;
                }
            }

            if (changedItemIds.has('user_socialMediaLinks') && editableData.socialMediaLinks) {
                 const socialLinksData = editableData.socialMediaLinks.map(link => {
                    const { _isNew, ...rest } = link;
                    return { ...rest, _isNew: !!_isNew, id: link.id.startsWith('temp-') ? undefined : link.id };
                });
                formData.append('socialMediaLinks_json', JSON.stringify(socialLinksData));
                actualChangesMade = true;
            }

            const cvCategoryKeys = Object.keys(categoryMetadata) as CategoryKey[];
            cvCategoryKeys.forEach(categoryKey => {
                const categoryData = editableData[categoryKey] as EditableCvItem[] | undefined;
                const originalCategoryData = profileData?.[categoryKey] as EditableCvItem[] | undefined;
                if (!categoryData) return;

                const itemsToSend: Partial<EditableCvItem & { _isDeleted?: boolean }>[] = [];
                const currentEditableIds = new Set(categoryData.map(item => item.id));

                categoryData.forEach(item => {
                    if ((item as TempCommon)._isNew || changedItemIds.has(item.id)) {
                        itemsToSend.push(item);
                        actualChangesMade = true;
                    }
                });

                originalCategoryData?.forEach(origItem => {
                    if (!currentEditableIds.has(origItem.id)) {
                        itemsToSend.push({ id: origItem.id, _isDeleted: true } as any);
                        actualChangesMade = true;
                    }
                });

                if (itemsToSend.length > 0) {
                    const dataForJson = itemsToSend.map(item => {
                        const { _selectedFile, ...rest } = item as any;
                        const finalRest: any = { ...rest };
                        if ((item as TempCommon)._isNew) finalRest._isNew = true;
                        if ((item as any)._isDeleted) finalRest._isDeleted = true;
                        Object.keys(finalRest).forEach(key => {
                            if (finalRest[key] instanceof Date) {
                                finalRest[key] = (finalRest[key] as Date).toISOString();
                            }
                        });
                        return finalRest;
                    });
                    formData.append(`${categoryKey}_json`, JSON.stringify(dataForJson));

                    itemsToSend.forEach(item => {
                        if (item && '_selectedFile' in item && (item as any)._selectedFile instanceof File) {
                            formData.append(`${categoryKey}_file_${item.id}`, (item as any)._selectedFile);
                        }
                    });
                }
            });

            if (!actualChangesMade) {
                setEditSuccess("No changes detected to save.");
                setIsEditingPage(false);
                setSelectedProfileImageFile(null); setProfileImagePreview(null);
                return;
            }

            try {
                const result = await updateMyProfile(formData);
                if (result.success) {
                    setEditSuccess("Profile updated successfully!");
                    setIsEditingPage(false);
                    await fetchProfileData(false); // Call with false to avoid redundant setIsLoading(true)
                } else {
                    setEditError(result.error || "Failed to save profile changes.");
                }
            } catch (err: any) {
                setEditError(err.message || "An unexpected error occurred during save.");
            }
        });
    }, [editableData, currentUserId, editingItemId, selectedProfileImageFile, changedItemIds, profileData, fetchProfileData]);

    return {
        profileData,
        user: editableData?.user ?? null,
        academicQualifications: editableData?.academicQualifications ?? [],
        professionalLicenses: editableData?.professionalLicenses ?? [],
        workExperiences: editableData?.workExperiences ?? [],
        professionalAffiliations: editableData?.professionalAffiliations ?? [],
        awardsRecognitions: editableData?.awardsRecognitions ?? [],
        professionalDevelopments: editableData?.professionalDevelopments ?? [],
        communityInvolvements: editableData?.communityInvolvements ?? [],
        publications: editableData?.publications ?? [],
        conferencePresentations: editableData?.conferencePresentations ?? [],
        socialMediaLinks: editableData?.socialMediaLinks ?? [],
        isLoading,
        pageError,
        editError,
        editSuccess,
        isEditingPage,
        editingItemId,
        isSaving,
        changedItemIds,
        fetchProfileData,
        handleEditToggle,
        handleSaveChanges,
        handleUserDetailChange,
        handleUserDateChange,
        selectedProfileImageFile,
        profileImagePreview,
        handleProfileImageSelect,
        handleAddSocialMediaLink,
        handleSocialMediaLinkChange,
        handleDeleteSocialMediaLink,
        handleAddItemLocally,
        handleDeleteItemLocally,
        handleStartEditingCvItem,
        handleCancelCvItemEdit,
        handleSaveCvItemEdit,
        handleCvItemInputChange,
        handleCvItemFileChange,
        visibleCategories,
        setVisibleCategories,
        showCategoryDropdown,
        setShowCategoryDropdown,
        handleAddCategoryToView,
    };
}
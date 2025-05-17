// src/app/(protected)/(faculty)/profile/page.tsx
'use client';

import React from 'react'; // Ensure React is imported if not already via other means
import { useProfileDataManagement } from '@/hooks/useProfileDataManagement';
import UserProfileInfoCard from '@/components/profile/UserProfileInfoCard';
import CvSection from '@/components/profile/CvSection';
import { categoryMetadata } from '@/lib/profileUtils';
import type { CategoryKey, EditableCvItem, ProfileUser, TempSocialMediaLink } from '@/types';
import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
    const {
        profileData,
        user, // This comes from editableData.user, which is derived from profileData.user
        academicQualifications,
        professionalLicenses,
        workExperiences,
        professionalAffiliations,
        awardsRecognitions,
        professionalDevelopments,
        communityInvolvements,
        publications,
        conferencePresentations,
        socialMediaLinks, // This comes from editableData.socialMediaLinks
        isLoading,
        pageError,
        editError,
        editSuccess,
        isEditingPage,
        editingItemId,
        isSaving,
        changedItemIds,
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
        showCategoryDropdown,
        setShowCategoryDropdown,
        handleAddCategoryToView,
    } = useProfileDataManagement();

    // For clarity, let's refer to the direct data from the hook for these checks
    const rawProfileData = profileData; 

    console.log(
        "ProfilePage RENDER: isLoading:", isLoading, 
        "pageError:", pageError, 
        "rawProfileData exists:", !!rawProfileData, 
        "rawProfileData.user exists:", !!rawProfileData?.user
    );

    if (isLoading && !rawProfileData) {
        console.log("ProfilePage RENDER: Showing initial loading screen.");
        return (
            <div className="p-6 animate-pulse text-center text-gray-500 min-h-screen flex items-center justify-center bg-spc-blue-lighter">
                Loading profile data...
            </div>
        );
    }

    if (pageError && !rawProfileData) {
        console.log("ProfilePage RENDER: Showing pageError because rawProfileData is null.");
        return (
            <div className="p-6 text-center text-red-600 bg-red-50 border border-red-200 rounded-md min-h-screen flex flex-col items-center justify-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error Loading Profile</h2>
                <p>{pageError}</p>
            </div>
        );
    }

    // This is the condition that likely shows your "Could not load" message
    if (!rawProfileData || !rawProfileData.user) {
         console.log("ProfilePage RENDER: Showing 'Could not load profile data' screen.");
         // Log the state that led to this condition
         console.log({
            isLoading_at_CouldNotLoad: isLoading, 
            pageError_at_CouldNotLoad: pageError, 
            rawProfileData_is_null: rawProfileData === null,
            rawProfileData_user_is_null: rawProfileData ? rawProfileData.user === null : 'N/A (rawProfileData is null)'
        });
         return (
            <div className="p-6 text-center text-gray-500 min-h-screen flex items-center justify-center bg-spc-blue-lighter">
                Could not load profile data. Please try again later or contact support.
                {pageError && <p className="text-red-500 mt-2 text-xs">Details: {pageError}</p>}
            </div>
        );
    }

    // If we reach here, rawProfileData and rawProfileData.user are valid
    const cvSectionsData = {
        academicQualifications, professionalLicenses, workExperiences,
        professionalAffiliations, awardsRecognitions, professionalDevelopments,
        communityInvolvements, publications, conferencePresentations,
    };

    // The 'user' and 'socialMediaLinks' destructured from useProfileDataManagement
    // are typically from 'editableData'. For display consistency before editing,
    // it's often better to use the direct 'rawProfileData.user' and 'rawProfileData.user.socialMediaLinks'.
    // However, UserProfileInfoCard expects 'user' and 'socialMediaLinks' from the hook's return.
    // Let's ensure userForCard uses the most reliable source.
    const userForCard = rawProfileData.user; // Use directly from the fetched profile data
    const socialMediaLinksForCard = rawProfileData.user.socialMediaLinks || [];


    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            {editSuccess && <div className="mb-4 rounded-md bg-green-100 p-3 text-sm font-medium text-green-700 border border-green-200">{editSuccess}</div>}
            {editError && <div className="mb-4 rounded-md bg-red-100 p-3 text-sm font-medium text-red-700 border border-red-200">{editError}</div>}
            {pageError && rawProfileData && <div className="mb-4 rounded-md bg-red-100 p-3 text-sm font-medium text-red-700 border border-red-200">{pageError}</div>} {/* Show pageError even if profileData loaded but then an error occurred */}

            {isEditingPage && editingItemId !== null && (
                 <p className="mb-4 text-xs text-yellow-700 bg-yellow-50 p-2 rounded border border-yellow-200 w-full flex items-center gap-1">
                    <InformationCircleIcon className='h-4 w-4 flex-shrink-0'/>
                    Finish editing the current CV item before saving all profile changes.
                 </p>
            )}

            <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
                <UserProfileInfoCard
                    user={userForCard} // This should now be reliable
                    isEditingPage={isEditingPage}
                    isPending={isSaving}
                    editingAnyCvItem={editingItemId !== null}
                    onUserDetailChange={handleUserDetailChange}
                    onUserDateChange={handleUserDateChange}
                    socialMediaLinks={socialMediaLinksForCard} // This also uses rawProfileData
                    onAddSocialMediaLink={handleAddSocialMediaLink}
                    onSocialMediaLinkChange={handleSocialMediaLinkChange}
                    onDeleteSocialMediaLink={handleDeleteSocialMediaLink}
                    profileImagePreview={profileImagePreview}
                    selectedProfileImageFile={selectedProfileImageFile}
                    onProfileImageSelect={handleProfileImageSelect}
                    onEditToggle={handleEditToggle}
                    onSaveChanges={handleSaveChanges}
                    showCategoryDropdown={showCategoryDropdown}
                    setShowCategoryDropdown={setShowCategoryDropdown}
                    visibleCategories={visibleCategories}
                    onAddCategory={handleAddCategoryToView}
                />

                <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
                    <div className="mb-6 text-center md:text-left">
                         <h2 className="text-xl sm:text-2xl font-semibold text-spc-blue-darker flex items-center justify-center md:justify-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-spc-blue-darker">
                                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707V15a.75.75 0 0 0 .5.707A9.735 9.735 0 0 0 6 16.265a9.735 9.735 0 0 0 3.25-.555.75.75 0 0 0 .5-.707V5.24a.75.75 0 0 0-.5-.707Zm0 0V15.57a.75.75 0 0 0 .5.707c.836.343 1.724.52 2.625.523H18a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-3.625c.055 0 .109.003.164.008a9.735 9.735 0 0 1 2.625.52V15h-3.625A9.707 9.707 0 0 1 12 15.57V4.533Z" />
                            </svg>
                            Curriculum Vitae Details
                        </h2>
                    </div>

                    {visibleCategories.size === 0 && !isLoading && !isEditingPage && (
                        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center text-gray-500 shadow">
                            <p className="mb-2 text-lg font-medium">Your professional profile is looking a bit empty!</p>
                            <p className="text-sm">Click "Edit Profile" then "Add CV Section" to start building your digital CV.</p>
                        </div>
                    )}
                    {visibleCategories.size === 0 && isEditingPage && (
                         <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center text-gray-500 shadow">
                            <p className="mb-2 text-lg font-medium">Add your first CV section!</p>
                            <p className="text-sm">Use the "Add CV Section" button in the profile panel to begin.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {Array.from(visibleCategories).map(categoryKey => {
                            const categoryMeta = categoryMetadata[categoryKey];
                            // Use rawProfileData for displaying CV items directly if not editing,
                            // or editableData (which is already destructured like academicQualifications) when editing.
                            // For simplicity, we assume the CvSection component can handle either
                            // the raw Prisma types or the Temp types from editableData.
                            // The current setup uses destructured editableData (e.g., `academicQualifications`).
                            const items = (cvSectionsData[categoryKey as keyof typeof cvSectionsData] as EditableCvItem[] | undefined) || [];

                            return (
                                <CvSection
                                    key={categoryKey}
                                    categoryKey={categoryKey}
                                    title={categoryMeta.title}
                                    Icon={categoryMeta.icon}
                                    items={items}
                                    isEditingPage={isEditingPage}
                                    editingItemId={editingItemId}
                                    isPending={isSaving}
                                    changedItemIds={changedItemIds}
                                    onAddItem={() => handleAddItemLocally(categoryKey)}
                                    onStartEditItem={(itemId) => handleStartEditingCvItem(categoryKey, itemId)}
                                    onCancelEditItem={(itemId) => handleCancelCvItemEdit(categoryKey, itemId)}
                                    onSaveItemEdit={(itemId) => handleSaveCvItemEdit(itemId)}
                                    onDeleteItem={(itemId) => handleDeleteItemLocally(categoryKey, itemId)}
                                    onItemInputChange={(itemId, fieldName, value) => handleCvItemInputChange(categoryKey, itemId, fieldName as string, value)}
                                    onItemFileChange={(itemId, file) => handleCvItemFileChange(categoryKey, itemId, file)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
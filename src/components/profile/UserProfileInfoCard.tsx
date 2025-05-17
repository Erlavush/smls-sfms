// src/components/profile/UserProfileInfoCard.tsx
'use client';
import React, { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import {
    PencilSquareIcon, XCircleIcon, CheckCircleIcon, PlusIcon, UserCircleIcon as ProfileAvatarIcon,
    CakeIcon, PhoneIcon, MapPinIcon, EnvelopeIcon, LinkIcon, UserIcon as EmployeeIdIcon,
    ChatBubbleBottomCenterTextIcon, IdentificationIcon, PencilIcon, TrashIcon
} from '@heroicons/react/24/outline';
import type { ProfileUser, TempSocialMediaLink, CategoryKey } from '@/types';
import { formatDate, formatDateForInput, defaultTempSocialMediaLink } from '@/lib/profileUtils'; // Import utilities
import { categoryMetadata } from '@/lib/profileUtils'; // For the "Add CV Section" dropdown

// Props definition
interface UserProfileInfoCardProps {
    user: Partial<ProfileUser> | null; // Can be partial during editing
    isEditingPage: boolean;
    isPending: boolean; // Global pending state
    editingAnyCvItem: boolean; // True if any CV item (not user details) is being edited

    // Handlers for user details
    onUserDetailChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onUserDateChange: (name: 'dateOfBirth', value: string) => void;

    // Handlers for social media links
    socialMediaLinks: TempSocialMediaLink[];
    onAddSocialMediaLink: () => void;
    onSocialMediaLinkChange: (index: number, field: keyof Pick<TempSocialMediaLink, 'platform' | 'url'>, value: string) => void;
    onDeleteSocialMediaLink: (index: number) => void;

    // Handlers for profile image
    profileImagePreview: string | null;
    selectedProfileImageFile: File | null; // To know if a new file is staged
    onProfileImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;

    // Main page action handlers
    onEditToggle: () => void; // Toggles the entire page's edit mode
    onSaveChanges: () => void; // Saves all changes on the page

    // CV Section Management (passed down for the dropdown)
    showCategoryDropdown: boolean;
    setShowCategoryDropdown: (show: boolean) => void;
    visibleCategories: Set<CategoryKey>;
    onAddCategory: (categoryKey: CategoryKey) => void;
}

// Styling constants (can be moved to a shared file)
const profileInputClass = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-spc-blue-main focus:ring-1 focus:ring-spc-blue-main text-sm disabled:opacity-70 bg-white py-2 px-3";
const profileLabelClass = "block text-xs font-medium text-gray-500 mb-1";
const basePageActionButtonClasses = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spc-blue-lighter disabled:opacity-70 w-full sm:w-auto transition-all duration-150 ease-in-out transform hover:scale-105";
const editProfileButtonClasses = "bg-spc-blue-main hover:bg-spc-blue-darker focus:ring-spc-blue-main";
const cancelEditModeButtonClasses = "bg-slate-600 hover:bg-slate-700 focus:ring-slate-500";
const saveChangesButtonClasses = "bg-green-600 hover:bg-green-700 focus:ring-green-500";
const addSectionButtonClasses = "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";

export default function UserProfileInfoCard({
    user,
    isEditingPage,
    isPending,
    editingAnyCvItem,
    onUserDetailChange,
    onUserDateChange,
    socialMediaLinks,
    onAddSocialMediaLink,
    onSocialMediaLinkChange,
    onDeleteSocialMediaLink,
    profileImagePreview,
    selectedProfileImageFile,
    onProfileImageSelect,
    onEditToggle,
    onSaveChanges,
    showCategoryDropdown,
    setShowCategoryDropdown,
    visibleCategories,
    onAddCategory,
}: UserProfileInfoCardProps) {
    if (!user) {
        return (
            <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6 md:mb-0">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 text-center text-gray-500">
                    User data not available.
                </div>
            </div>
        );
    }

    const [imageLoadError, setImageLoadError] = useState(false);

    useEffect(() => {
        setImageLoadError(false);
    }, [user?.profileImageUrl, profileImagePreview]);

    const userInitials = user.name?.trim() ? user.name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
                       : (user.email?.trim() ? user.email.trim().charAt(0).toUpperCase() : '?');

    const renderSocialMediaLinks = () => {
        if (!socialMediaLinks || socialMediaLinks.length === 0) {
            return <p className="text-xs text-gray-500 italic">No social/professional links added.</p>;
        }
        return (
            <div className="space-y-2">
                {socialMediaLinks.map(link => (
                    <a
                        key={link.id} 
                        href={link.url && link.url.startsWith('http') ? link.url : `https://${link.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-spc-blue-main hover:text-spc-blue-darker hover:underline break-all"
                    >
                        <LinkIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">{link.platform || '[No Platform]'}:</span>
                        <span className="truncate">{link.url || '[No URL]'}</span>
                    </a>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mb-6 md:mb-0 md:sticky md:top-20 md:self-start">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200/80 overflow-hidden">
                {/* Profile Image and Name Section */}
                <div className="flex flex-col items-center p-6 bg-spc-blue-main">
                    {/* Profile Image Container - This is the key relative parent */}
                    
                    {/* Container for the image and the overlapping button. This is the positioning parent. */}
                    <div className="relative group"> 
                        {/* The actual circular image container, which clips the image */}
                        <div className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-full bg-spc-blue-darker ring-4 ring-white/50 shadow-lg overflow-hidden"> {/* Added relative here */}
                        {profileImagePreview ? (
                            <Image src={profileImagePreview} alt="Profile preview" layout="fill" objectFit="cover" />
                        ) : user.profileImageUrl && !imageLoadError ? (
                            <Image
                                src={user.profileImageUrl}
                                alt={`${user.name || 'Faculty'}'s profile`}
                                layout="fill"
                                objectFit="cover"
                                onError={() => setImageLoadError(true)}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full w-full text-white text-5xl font-semibold">{userInitials}</div>
                        )}

                        {/* Edit Profile Image Button - Positioned absolutely relative to the outer 'group' div */}
                        </div> {/* End of the circular image container */}
                        {isEditingPage && (
                            <label
                                htmlFor="profileImageUpload"
                                className="absolute bottom-0 right-0
                                           transform translate-x-1 translate-y-0
                                           cursor-pointer p-2 bg-white rounded-full shadow-xl
                                           hover:bg-gray-100 transition-all duration-200 ease-in-out
                                           ring-2 ring-spc-blue-main hover:ring-spc-blue-light z-10"
                                title="Change profile picture"
                            >
                                <PencilIcon className="h-5 w-5 text-spc-blue-main"/>
                                <input
                                    type="file"
                                    id="profileImageUpload"
                                    name="profileImageUpload"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={onProfileImageSelect}
                                    disabled={isPending}
                                />
                            </label>
                        )}
                    </div>
                    {isEditingPage ? (
                        <input
                            type="text"
                            name="name"
                            value={user.name ?? ''}
                            onChange={onUserDetailChange}
                            className="mt-5 text-xl font-bold text-white text-center bg-transparent border-b-2 border-white/30 focus:border-white focus:ring-0 placeholder-gray-300 w-full py-1"
                            placeholder="Full Name"
                            disabled={isPending}
                        />
                    ) : (
                        <h2 className="mt-5 text-xl font-bold text-white text-center relative group">
                            {user.name ?? 'N/A'}
                            <span className="absolute bottom-[-4px] left-1/4 right-1/4 h-0.5 bg-white/30 group-hover:bg-white/50 transition-colors duration-300"></span>
                        </h2>
                    )}
                    <p className="text-sm text-spc-blue-lighter opacity-90 mt-1">{user.role}</p>
                </div>

                {/* User Details Section */}
                <div className="p-5 space-y-3.5 text-sm">
                    <div>
                        <label className={`${profileLabelClass} flex items-center gap-1.5`}><EnvelopeIcon className="h-4 w-4"/>Email Address</label>
                        <p className="text-gray-900 break-all">{user.email ?? 'N/A'}</p>
                    </div>
                    <div>
                        <label htmlFor="contactNumber" className={`${profileLabelClass} flex items-center gap-1.5`}><PhoneIcon className="h-4 w-4"/>Contact Number</label>
                        {isEditingPage ? ( <input type="tel" id="contactNumber" name="contactNumber" value={user.contactNumber ?? ''} onChange={onUserDetailChange} className={profileInputClass} placeholder="e.g., 09123456789" disabled={isPending}/> ) : ( <p className="text-gray-900">{user.contactNumber ?? 'N/A'}</p> )}
                    </div>
                    <div>
                        <label htmlFor="employeeId" className={`${profileLabelClass} flex items-center gap-1.5`}><EmployeeIdIcon className="h-4 w-4"/>Employee ID</label>
                        {isEditingPage ? ( <input type="text" id="employeeId" name="employeeId" value={user.employeeId ?? ''} onChange={onUserDetailChange} className={profileInputClass} placeholder="Faculty Employee ID" disabled={isPending}/> ) : ( <p className="text-gray-900">{user.employeeId ?? 'N/A'}</p> )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-gray-100"></div>

                    <div>
                        <label htmlFor="dateOfBirth" className={`${profileLabelClass} flex items-center gap-1.5`}><CakeIcon className="h-4 w-4"/>Date of Birth</label>
                        {isEditingPage ? ( <input type="date" id="dateOfBirth" name="dateOfBirth" value={formatDateForInput(user.dateOfBirth)} onChange={(e) => onUserDateChange('dateOfBirth', e.target.value)} className={profileInputClass} disabled={isPending}/> ) : ( <p className="text-gray-900">{user.dateOfBirth ? formatDate(user.dateOfBirth) : 'N/A'}</p> )}
                    </div>
                    <div>
                        <label htmlFor="civilStatus" className={`${profileLabelClass} flex items-center gap-1.5`}><IdentificationIcon className="h-4 w-4"/>Civil Status</label>
                        {isEditingPage ? (
                            <select name="civilStatus" id="civilStatus" value={user.civilStatus ?? ''} onChange={onUserDetailChange} className={profileInputClass} disabled={isPending}>
                                <option value="">Select...</option><option value="Single">Single</option><option value="Married">Married</option><option value="Widowed">Widowed</option><option value="Separated">Separated</option><option value="Divorced">Divorced</option>
                            </select>
                        ) : ( <p className="text-gray-900">{user.civilStatus ?? 'N/A'}</p> )}
                    </div>
                    <div>
                        <label htmlFor="nationality" className={`${profileLabelClass} flex items-center gap-1.5`}><IdentificationIcon className="h-4 w-4"/>Nationality</label>
                        {isEditingPage ? ( <input type="text" id="nationality" name="nationality" value={user.nationality ?? ''} onChange={onUserDetailChange} className={profileInputClass} placeholder="e.g., Filipino" disabled={isPending}/> ) : ( <p className="text-gray-900">{user.nationality ?? 'N/A'}</p> )}
                    </div>
                    <div>
                        <label htmlFor="address" className={`${profileLabelClass} flex items-start gap-1.5`}><MapPinIcon className="h-4 w-4 mt-0.5"/>Address</label>
                        {isEditingPage ? ( <textarea id="address" name="address" rows={3} value={user.address ?? ''} onChange={onUserDetailChange} className={profileInputClass} placeholder="Full Address" disabled={isPending}></textarea> ) : ( <p className="text-gray-900 whitespace-pre-wrap">{user.address ?? 'N/A'}</p> )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-gray-100"></div>

                    <div>
                        <label htmlFor="bio" className={`${profileLabelClass} flex items-center gap-1.5`}><ChatBubbleBottomCenterTextIcon className="h-4 w-4"/>About Me / Bio</label>
                        {isEditingPage ? ( <textarea id="bio" name="bio" rows={4} value={user.bio ?? ''} onChange={onUserDetailChange} className={profileInputClass} placeholder="Tell us a bit about yourself..." disabled={isPending}/> ) : ( <p className="text-gray-700 whitespace-pre-wrap">{user.bio || <span className="italic text-gray-400">No bio provided.</span>}</p> )}
                    </div>

                    {/* Social Media Links Section */}
                    {(socialMediaLinks.length > 0 || isEditingPage) && (
                        <>
                            <div className="pt-2 mt-2 border-t border-gray-100"></div>
                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                                    <LinkIcon className="h-4 w-4"/>Social & Professional Links
                                </h3>
                                {isEditingPage ? (
                                    <>
                                        {socialMediaLinks.length > 0 ? (
                                            socialMediaLinks.map((link, index) => (
                                                <div key={link.id} className="space-y-1.5 p-2.5 border border-dashed border-gray-300 rounded-md bg-gray-50/50 relative">
                                                    <div>
                                                        <label htmlFor={`platform-${link.id}`} className={profileLabelClass}>Platform</label>
                                                        <input type="text" id={`platform-${link.id}`} placeholder="e.g., LinkedIn, GitHub" value={link.platform} onChange={(e) => onSocialMediaLinkChange(index, 'platform', e.target.value)} className={profileInputClass} disabled={isPending}/>
                                                    </div>
                                                    <div>
                                                        <label htmlFor={`url-${link.id}`} className={profileLabelClass}>URL</label>
                                                        <input type="url" id={`url-${link.id}`} placeholder="https://linkedin.com/in/yourprofile" value={link.url} onChange={(e) => onSocialMediaLinkChange(index, 'url', e.target.value)} className={profileInputClass} disabled={isPending}/>
                                                    </div>
                                                    <button type="button" onClick={() => onDeleteSocialMediaLink(index)} className="absolute top-1.5 right-1.5 p-0.5 rounded-full text-red-500 hover:bg-red-100 disabled:opacity-50" title="Delete this link" disabled={isPending}>
                                                        <XCircleIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400 italic p-2">No links added yet. Click "Add Link" to start.</p>
                                        )}
                                        <button type="button" onClick={onAddSocialMediaLink} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50" disabled={isPending}>
                                            <PlusIcon className="h-3.5 w-3.5" /> Add Social Link
                                        </button>
                                    </>
                                ) : (
                                    renderSocialMediaLinks()
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Action Buttons Section */}
                <div className="p-4 border-t border-gray-200 bg-gray-50/70 space-y-3">
                    <button onClick={onEditToggle} disabled={isPending} className={`${basePageActionButtonClasses} ${isEditingPage ? cancelEditModeButtonClasses : editProfileButtonClasses}`}>
                        {isEditingPage ? ( <><XCircleIcon className="h-5 w-5 mr-1.5" /> Cancel Edit</> ) : ( <><PencilSquareIcon className="h-5 w-5 mr-1.5" /> Edit Profile</> )}
                    </button>
                    {isEditingPage && (
                        <button onClick={onSaveChanges} disabled={isPending || editingAnyCvItem} className={`${basePageActionButtonClasses} ${saveChangesButtonClasses}`}>
                            {isPending ? 'Saving...' : <><CheckCircleIcon className="h-5 w-5 mr-1.5" /> Save All Changes</>}
                        </button>
                    )}
                    <div className="relative pt-1">
                        <button
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            disabled={isPending || !isEditingPage}
                            className={`${basePageActionButtonClasses} ${addSectionButtonClasses} ${!isEditingPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-haspopup="true"
                            aria-expanded={showCategoryDropdown}
                        >
                            <PlusIcon className="h-5 w-5 mr-1.5" /> Add CV Section
                        </button>
                        {showCategoryDropdown && isEditingPage && (
                            <div className="absolute bottom-full left-0 mb-2 w-full origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                <div className="py-1" role="none">
                                    {(Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key)).length > 0 ? (
                                        (Object.keys(categoryMetadata) as CategoryKey[]).filter(key => !visibleCategories.has(key)).map(key => (
                                            <button key={key} onClick={() => onAddCategory(key)} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                {categoryMetadata[key].title}
                                            </button>
                                        ))
                                    ) : ( <p className="px-4 py-2 text-sm text-gray-500">All sections added.</p> )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
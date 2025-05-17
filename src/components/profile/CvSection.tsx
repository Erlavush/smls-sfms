// src/components/profile/CvSection.tsx
import React from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import type { EditableCvItem, TempCommon, CategoryKey } from '@/types';

// Import all your Display and Form components
import AcademicQualificationDisplay from './AcademicQualificationDisplay';
import AcademicQualificationForm from './AcademicQualificationForm';
import ProfessionalDevelopmentDisplay from './ProfessionalDevelopmentDisplay';
import ProfessionalDevelopmentForm from './ProfessionalDevelopmentForm';
import ProfessionalLicenseDisplay from './ProfessionalLicenseDisplay';
import ProfessionalLicenseForm from './ProfessionalLicenseForm';
import WorkExperienceDisplay from './WorkExperienceDisplay';
import WorkExperienceForm from './WorkExperienceForm';
import ProfessionalAffiliationDisplay from './ProfessionalAffiliationDisplay';
import ProfessionalAffiliationForm from './ProfessionalAffiliationForm';
import AwardRecognitionDisplay from './AwardRecognitionDisplay';
import AwardRecognitionForm from './AwardRecognitionForm';
import CommunityInvolvementDisplay from './CommunityInvolvementDisplay';
import CommunityInvolvementForm from './CommunityInvolvementForm';
import PublicationDisplay from './PublicationDisplay';
import PublicationForm from './PublicationForm';
import ConferencePresentationDisplay from './ConferencePresentationDisplay';
import ConferencePresentationForm from './ConferencePresentationForm';
// StatusDisplay is used within the individual Display components, so not directly here unless needed for a section-level status.

interface CvSectionProps<T extends EditableCvItem> {
    categoryKey: CategoryKey;
    title: string;
    Icon: React.ElementType;
    items: T[];
    isEditingPage: boolean; // Is the overall profile page in edit mode?
    editingItemId: string | null; // ID of the item currently being edited within this section or any other
    isPending: boolean; // Global pending state for save operations
    changedItemIds: Set<string>; // Set of item IDs that have pending changes

    onAddItem: () => void; // Handler to add a new item to this section
    onStartEditItem: (itemId: string) => void; // Handler to start editing an item
    onCancelEditItem: (itemId: string) => void; // Handler to cancel editing an item
    onSaveItemEdit: (itemId: string) => void; // Handler to confirm/save an item's edit (primarily to exit item edit mode)
    onDeleteItem: (itemId: string) => void; // Handler to delete an item

    // Handlers for input and file changes within an item's form
    onItemInputChange: (itemId: string, fieldName: keyof T, value: any) => void;
    onItemFileChange: (itemId: string, file: File | null | undefined) => void;
}

// Helper to get the correct Display or Form component based on categoryKey
// These need to match the structure of your actual display/form components
const componentMap: Record<CategoryKey, { Display: React.FC<any>; Form: React.FC<any> }> = {
    academicQualifications: { Display: AcademicQualificationDisplay, Form: AcademicQualificationForm },
    professionalLicenses: { Display: ProfessionalLicenseDisplay, Form: ProfessionalLicenseForm },
    workExperiences: { Display: WorkExperienceDisplay, Form: WorkExperienceForm },
    professionalAffiliations: { Display: ProfessionalAffiliationDisplay, Form: ProfessionalAffiliationForm },
    awardsRecognitions: { Display: AwardRecognitionDisplay, Form: AwardRecognitionForm },
    professionalDevelopments: { Display: ProfessionalDevelopmentDisplay, Form: ProfessionalDevelopmentForm },
    communityInvolvements: { Display: CommunityInvolvementDisplay, Form: CommunityInvolvementForm },
    publications: { Display: PublicationDisplay, Form: PublicationForm },
    conferencePresentations: { Display: ConferencePresentationDisplay, Form: ConferencePresentationForm },
};

// Button Styles (can be imported from a shared constants file if you create one)
const iconButtonBaseClasses = "p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:opacity-50";
const editIconButtonClasses = `${iconButtonBaseClasses} bg-blue-100 text-blue-600 hover:bg-blue-200 focus:ring-blue-400`;
const deleteIconButtonClasses = `${iconButtonBaseClasses} bg-red-100 text-red-600 hover:bg-red-200 focus:ring-red-400`;
const smallActionButtonBaseClasses = "inline-flex items-center justify-center gap-1 px-2 py-1 rounded text-xs font-medium focus:outline-none focus:ring-2 disabled:opacity-60";
const cancelItemEditButtonClasses = `${smallActionButtonBaseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400`;
const saveItemButtonClasses = `${smallActionButtonBaseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-400`;


export default function CvSection<T extends EditableCvItem>({
    categoryKey,
    title,
    Icon,
    items,
    isEditingPage,
    editingItemId,
    isPending,
    changedItemIds,
    onAddItem,
    onStartEditItem,
    onCancelEditItem,
    onSaveItemEdit,
    onDeleteItem,
    onItemInputChange,
    onItemFileChange,
}: CvSectionProps<T>) {
    const { Display: DisplayComponent, Form: FormComponent } = componentMap[categoryKey] ||
        {
            Display: ({ item }: { item: any }) => <div className="text-red-500">Display for {categoryKey} not found.</div>,
            Form: ({ item }: { item: any }) => <div className="text-red-500">Form for {categoryKey} not found.</div>
        };

    const isNewItem = (item: T): boolean => !!(item as TempCommon)._isNew;

    return (
        <div className="flex flex-col rounded-2xl bg-white shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl">
            {/* Section Header */}
            <div className="flex items-center gap-4 p-5 sm:p-6 bg-spc-blue-darker text-white">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 flex-shrink-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-semibold text-md sm:text-lg flex-grow tracking-tight">
                    {title}
                </h2>
                {isEditingPage && (
                    <button
                        onClick={onAddItem}
                        className="ml-auto flex-shrink-0 rounded-full bg-white/25 p-1.5 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                        title={`Add New ${title.slice(0, -1)}`} // e.g., "Add New Academic Qualification"
                        disabled={editingItemId !== null || isPending} // Disable if any item is being edited globally or global save is pending
                    >
                        <PlusIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Section Body - List of Items */}
            <div className="flex-grow p-5 sm:p-6">
                {items.length === 0 ? (
                    <p className="italic text-gray-400 text-center py-4">
                        {isEditingPage ? `Click the '+' button to add your first ${title.toLowerCase().slice(0, -1)}.` : 'No items recorded.'}
                    </p>
                ) : (
                    <ul className="space-y-6">
                        {items.map((item) => {
                            const isThisItemActivelyEditing = isEditingPage && item.id === editingItemId;
                            const hasPendingChanges = isEditingPage && changedItemIds.has(item.id) && !isThisItemActivelyEditing;
                            const stagedFile = (item as any)._selectedFile instanceof File ? (item as any)._selectedFile : null;

                            const liClasses = [
                                'relative group transition-all duration-200 ease-in-out',
                                isThisItemActivelyEditing ? 'bg-blue-50 p-4 rounded-md border border-dashed border-blue-300 shadow-inner -m-4' : '',
                                hasPendingChanges ? 'bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400 shadow-sm -m-4' : '',
                                !isThisItemActivelyEditing && !hasPendingChanges ? 'pb-6 border-b border-gray-100 last:border-b-0 last:pb-0' : ''
                            ].filter(Boolean).join(' ');

                            return (
                                <li key={item.id} className={liClasses}>
                                    {isThisItemActivelyEditing ? (
                                        <>
                                            <FormComponent
                                                item={item}
                                                isPending={isPending} // Global pending state
                                                handleInputChange={(fieldName: keyof T, value: any) => onItemInputChange(item.id, fieldName, value)}
                                                handleFileChange={(file: File | null | undefined) => onItemFileChange(item.id, file)}
                                            />
                                            <div className='flex justify-end gap-2 mt-3'>
                                                <button onClick={() => onCancelEditItem(item.id)} disabled={isPending} className={cancelItemEditButtonClasses}>
                                                    <XMarkIcon className='h-3 w-3'/> Cancel Item Edit
                                                </button>
                                                <button onClick={() => onSaveItemEdit(item.id)} disabled={isPending} className={saveItemButtonClasses}>
                                                    <CheckIcon className='h-3 w-3'/> Done Editing Item
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <DisplayComponent item={item} isEditing={isEditingPage} stagedFile={stagedFile} />
                                    )}

                                    {/* Edit/Delete buttons for existing items when page is in edit mode but this specific item is not actively being edited */}
                                    {isEditingPage && !isThisItemActivelyEditing && (
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {!isNewItem(item) && ( // Only show edit for non-new items not being edited
                                                <button
                                                    onClick={() => onStartEditItem(item.id)}
                                                    className={editIconButtonClasses}
                                                    title={`Edit this ${title.slice(0, -1)}`}
                                                    disabled={isPending || editingItemId !== null} // Disable if another item is being edited or global save
                                                >
                                                    <PencilIcon className="h-3.5 w-3.5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onDeleteItem(item.id)}
                                                className={deleteIconButtonClasses}
                                                title={`Delete this ${title.slice(0, -1)}`}
                                                disabled={isPending || editingItemId !== null} // Disable if another item is being edited or global save
                                            >
                                                <TrashIcon className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    )}
                                    {hasPendingChanges && (
                                        <div className="mt-2 text-xs text-yellow-700 flex items-center gap-1">
                                            <InformationCircleIcon className="h-3.5 w-3.5" />
                                            Changes pending overall save.
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
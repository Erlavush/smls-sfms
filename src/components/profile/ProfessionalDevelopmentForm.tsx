// src/components/profile/ProfessionalDevelopmentForm.tsx
import React from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import type { TempProfessionalDevelopment } from '@/types'; // Import from shared types

interface Props {
    item: TempProfessionalDevelopment;
    isPending: boolean;
    // Simplified signature (assuming bound in parent)
    handleInputChange: (fieldName: keyof TempProfessionalDevelopment, value: string) => void;
    // Updated signature for file change
    handleFileChange: (file: File | null | undefined) => void;
}

// Input and Label classes
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function ProfessionalDevelopmentForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;

    // Helper for input change to match simplified signature
    const onInputChange = (fieldName: keyof TempProfessionalDevelopment, value: string) => {
        handleInputChange(fieldName, value);
    };

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">
                {isNewItem ? 'New Professional Development' : 'Editing Professional Development'}
            </p>

            {/* Title Input */}
            <div>
                <label htmlFor={`title-${item.id}`} className={labelClass}>Title*</label>
                <input
                    type="text"
                    id={`title-${item.id}`}
                    name="title"
                    value={item.title || ''}
                    onChange={(e) => onInputChange('title', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Seminar on Advanced Lab Techniques"
                    required
                    disabled={isPending}
                />
            </div>

            {/* Organizer Input */}
            <div>
                <label htmlFor={`organizer-${item.id}`} className={labelClass}>Organizer*</label>
                <input
                    type="text"
                    id={`organizer-${item.id}`}
                    name="organizer"
                    value={item.organizer || ''}
                    onChange={(e) => onInputChange('organizer', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., PAMET"
                    required
                    disabled={isPending}
                />
            </div>

            {/* Date & Location Input */}
            <div>
                <label htmlFor={`dateLocation-${item.id}`} className={labelClass}>Date & Location*</label>
                <input
                    type="text"
                    id={`dateLocation-${item.id}`}
                    name="dateLocation"
                    value={item.dateLocation || ''}
                    onChange={(e) => onInputChange('dateLocation', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., May 2024 / Davao City"
                    required
                    disabled={isPending}
                />
            </div>

            {/* File Input for Certificate */}
            <div>
                <label htmlFor={`certificateFile-${item.id}`} className={labelClass}>
                    Upload Certificate {isNewItem ? '(Optional)' : '(Replace Existing - Optional)'}
                </label>
                {!isNewItem && item.certificateFileUrl && !item._selectedFile && (
                    <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        Current:
                        <a href={item.certificateFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]">
                            {item.certificateFileUrl.split('/').pop()}
                        </a>
                    </div>
                )}
                {/* *** UPDATED onChange *** */}
                <input
                    type="file"
                    id={`certificateFile-${item.id}`}
                    name="certificateFile"
                    onChange={(e) => handleFileChange(e.target.files?.[0])} // Pass only the file
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70"
                    accept=".pdf,.png,.jpg,.jpeg" // Consistent file types
                    disabled={isPending}
                />
                {item._selectedFile && (
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        New: <span>{item._selectedFile.name}</span>
                        {/* *** UPDATED onClick *** */}
                        <button
                            type="button"
                            onClick={() => handleFileChange(null)} // Pass null to clear
                            className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                            title="Remove selection"
                            disabled={isPending}
                        >
                            ✕ {/* Cross symbol */}
                        </button>
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, PNG, JPG.</p>
            </div>
        </div>
    );
}
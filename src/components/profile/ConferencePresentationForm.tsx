// src/components/profile/ConferencePresentationForm.tsx
import React from 'react';
import type { TempConferencePresentation } from '@/types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: TempConferencePresentation;
    isPending: boolean;
    // Simplified signature (assuming bound in parent)
    handleInputChange: (fieldName: keyof TempConferencePresentation, value: string) => void;
    // Updated signature for file change
    handleFileChange: (file: File | null | undefined) => void;
}
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function ConferencePresentationForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;

    // Helper for input change to match simplified signature
    const onInputChange = (fieldName: keyof TempConferencePresentation, value: string) => {
        handleInputChange(fieldName, value);
    };

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">{isNewItem ? 'New Conference Presentation' : 'Editing Conference Presentation'}</p>

            {/* Paper Title Input */}
            <div>
                <label htmlFor={`paperTitle-${item.id}`} className={labelClass}>Paper/Presentation Title*</label>
                <input
                    type="text"
                    id={`paperTitle-${item.id}`}
                    name="paperTitle"
                    value={item.paperTitle || ''}
                    onChange={(e) => onInputChange('paperTitle', e.target.value)}
                    className={inputClass}
                    required
                    disabled={isPending}
                />
            </div>

            {/* Event Name Input */}
            <div>
                <label htmlFor={`eventName-${item.id}`} className={labelClass}>Conference/Event Name*</label>
                <input
                    type="text"
                    id={`eventName-${item.id}`}
                    name="eventName"
                    value={item.eventName || ''}
                    onChange={(e) => onInputChange('eventName', e.target.value)}
                    className={inputClass}
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
                    placeholder="e.g., June 2024 / Manila"
                    required
                    disabled={isPending}
                />
            </div>

            {/* File Input for Proof */}
             <div>
                <label htmlFor={`proofFile-${item.id}`} className={labelClass}>Upload Proof (e.g., Certificate, Program) (Optional)</label>
                 {!isNewItem && item.proofUrl && !item._selectedFile && (
                    <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> Current:
                        <a href={item.proofUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]"> {item.proofUrl.split('/').pop()} </a>
                    </div>
                 )}
                 {/* *** UPDATED onChange *** */}
                 <input
                    type="file"
                    id={`proofFile-${item.id}`}
                    name="proofFile"
                    onChange={(e) => handleFileChange(e.target.files?.[0])} // Pass only file
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70"
                    accept=".pdf,.png,.jpg,.jpeg"
                    disabled={isPending}
                 />
                 {item._selectedFile && (
                     <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> New: <span>{item._selectedFile.name}</span>
                        {/* *** UPDATED onClick *** */}
                        <button type="button" onClick={() => handleFileChange(null)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none" title="Remove selection" disabled={isPending}>✕</button>
                     </div>
                 )}
                 <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, PNG, JPG.</p>
             </div>
        </div>
    );
}
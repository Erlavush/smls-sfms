// src/components/profile/CommunityInvolvementForm.tsx
import React from 'react';
import type { TempCommunityInvolvement } from '@/types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: TempCommunityInvolvement;
    isPending: boolean;
    // Simplified signature (assuming bound in parent)
    handleInputChange: (fieldName: keyof TempCommunityInvolvement, value: string | null) => void;
    // Updated signature for file change
    handleFileChange: (file: File | null | undefined) => void;
}
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function CommunityInvolvementForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;

    // Helper for input change to match simplified signature
    const onInputChange = (fieldName: keyof TempCommunityInvolvement, value: string | null) => {
        handleInputChange(fieldName, value);
    };

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">{isNewItem ? 'New Community Involvement' : 'Editing Community Involvement'}</p>

            {/* Engagement Title Input */}
            <div>
                <label htmlFor={`engagementTitle-${item.id}`} className={labelClass}>Engagement Title*</label>
                <input
                    type="text"
                    id={`engagementTitle-${item.id}`}
                    name="engagementTitle"
                    value={item.engagementTitle || ''}
                    onChange={(e) => onInputChange('engagementTitle', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Medical Mission Barangay X"
                    required
                    disabled={isPending}
                />
            </div>

            {/* Role Input */}
            <div>
                <label htmlFor={`role-${item.id}`} className={labelClass}>Role*</label>
                <input
                    type="text"
                    id={`role-${item.id}`}
                    name="role"
                    value={item.role || ''}
                    onChange={(e) => onInputChange('role', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Volunteer, Organizer"
                    required
                    disabled={isPending}
                />
            </div>

            {/* Location/Date Input */}
            <div>
                <label htmlFor={`locationDate-${item.id}`} className={labelClass}>Location & Date*</label>
                <input
                    type="text"
                    id={`locationDate-${item.id}`}
                    name="locationDate"
                    value={item.locationDate || ''}
                    onChange={(e) => onInputChange('locationDate', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Barangay X / May 5, 2024"
                    required
                    disabled={isPending}
                />
            </div>

             {/* File Input */}
             <div>
                <label htmlFor={`proofFile-${item.id}`} className={labelClass}>Upload Proof (e.g., Certificate) (Optional)</label>
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
// src/components/profile/ProfessionalAffiliationForm.tsx
import React from 'react';
import type { TempProfessionalAffiliation } from '@/types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: TempProfessionalAffiliation;
    isPending: boolean;
    // Simplified signature (assuming bound in parent)
    handleInputChange: (fieldName: keyof TempProfessionalAffiliation, value: string | null) => void;
    // Updated signature for file change
    handleFileChange: (file: File | null | undefined) => void;
}
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function ProfessionalAffiliationForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;

    // Helper for input change to match simplified signature
    const onInputChange = (fieldName: keyof TempProfessionalAffiliation, value: string | null) => {
        handleInputChange(fieldName, value);
    };

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">{isNewItem ? 'New Affiliation' : 'Editing Affiliation'}</p>
            <div>
                <label htmlFor={`organization-${item.id}`} className={labelClass}>Organization*</label>
                <input type="text" id={`organization-${item.id}`} name="organization" value={item.organization || ''} onChange={(e) => onInputChange('organization', e.target.value)} className={inputClass} required disabled={isPending} />
            </div>
            <div>
                <label htmlFor={`position-${item.id}`} className={labelClass}>Position (Optional)</label>
                <input type="text" id={`position-${item.id}`} name="position" value={item.position || ''} onChange={(e) => onInputChange('position', e.target.value || null)} className={inputClass} disabled={isPending} />
            </div>
            <div>
                <label htmlFor={`inclusiveYears-${item.id}`} className={labelClass}>Inclusive Years*</label>
                <input type="text" id={`inclusiveYears-${item.id}`} name="inclusiveYears" value={item.inclusiveYears || ''} onChange={(e) => onInputChange('inclusiveYears', e.target.value)} className={inputClass} placeholder="e.g., 2019-Present" required disabled={isPending} />
            </div>
             {/* File Input */}
             <div>
                <label htmlFor={`membershipProofFile-${item.id}`} className={labelClass}>Upload Membership Proof (Optional)</label>
                 {!isNewItem && item.membershipProofUrl && !item._selectedFile && ( <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600"> <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> Current: <a href={item.membershipProofUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]"> {item.membershipProofUrl.split('/').pop()} </a> </div> )}
                 {/* *** UPDATED onChange *** */}
                 <input
                    type="file"
                    id={`membershipProofFile-${item.id}`}
                    name="membershipProofFile"
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
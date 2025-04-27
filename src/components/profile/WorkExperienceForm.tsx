// src/components/profile/WorkExperienceForm.tsx
import React from 'react';
import type { TempWorkExperience } from '@/types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: TempWorkExperience;
    isPending: boolean;
    // String values are sufficient for this form's inputs
    handleInputChange: (itemId: string, fieldName: keyof TempWorkExperience, value: string | null) => void;
    handleFileChange: (itemId: string, file: File | null | undefined) => void;
}
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function WorkExperienceForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;
    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">{isNewItem ? 'New Work Experience' : 'Editing Work Experience'}</p>

            {/* Position Input */}
            <div>
                <label htmlFor={`position-${item.id}`} className={labelClass}>Position*</label>
                <input
                    type="text"
                    id={`position-${item.id}`}
                    name="position"
                    value={item.position || ''}
                    onChange={(e) => handleInputChange(item.id, 'position', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Faculty, Medical Technologist"
                    required
                    disabled={isPending} />
             </div>

             {/* Institution Input */}
            <div>
                <label htmlFor={`institution-${item.id}`} className={labelClass}>Institution*</label>
                <input
                    type="text"
                    id={`institution-${item.id}`}
                    name="institution"
                    value={item.institution || ''}
                    onChange={(e) => handleInputChange(item.id, 'institution', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., San Pedro College"
                    required
                    disabled={isPending}
                 />
             </div>

             {/* Inclusive Years Input */}
            <div>
                <label htmlFor={`inclusiveYears-${item.id}`} className={labelClass}>Inclusive Years*</label>
                <input
                    type="text"
                    id={`inclusiveYears-${item.id}`}
                    name="inclusiveYears"
                    value={item.inclusiveYears || ''}
                    onChange={(e) => handleInputChange(item.id, 'inclusiveYears', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., 2020-Present or 2018-2019"
                    required
                    disabled={isPending}
                 />
             </div>

             {/* Nature of Work Input */}
            <div>
                <label htmlFor={`natureOfWork-${item.id}`} className={labelClass}>Nature of Work (Optional)</label>
                <input
                    type="text"
                    id={`natureOfWork-${item.id}`}
                    name="natureOfWork"
                    value={item.natureOfWork || ''}
                    // Pass null if empty string for optional fields
                    onChange={(e) => handleInputChange(item.id, 'natureOfWork', e.target.value || null)}
                    className={inputClass}
                    disabled={isPending}
                 />
             </div>

             {/* File Input */}
             <div>
                <label htmlFor={`proofFile-${item.id}`} className={labelClass}>Upload Proof (e.g., COE) (Optional)</label>
                 {!isNewItem && item.proofUrl && !item._selectedFile && (
                    <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> Current:
                        <a href={item.proofUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]"> {item.proofUrl.split('/').pop()} </a>
                    </div>
                 )}
                 <input
                    type="file"
                    id={`proofFile-${item.id}`}
                    name="proofFile"
                    onChange={(e) => handleFileChange(item.id, e.target.files?.[0])}
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70"
                    accept=".pdf,.png,.jpg,.jpeg"
                    disabled={isPending}
                 />
                 {item._selectedFile && (
                     <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600"> <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> New: <span>{item._selectedFile.name}</span> <button type="button" onClick={() => handleFileChange(item.id, null)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none" title="Remove selection" disabled={isPending}>✕</button> </div>
                 )}
                 <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, PNG, JPG.</p>
             </div>
        </div>
    );
}
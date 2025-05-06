// src/components/profile/AcademicQualificationForm.tsx
import React, { ChangeEvent } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import type { TempAcademicQualification } from '@/types';

interface Props {
    item: TempAcademicQualification;
    isPending: boolean;
    handleInputChange: (fieldName: keyof TempAcademicQualification, value: string | number) => void; // Simplified signature if bound in parent
    // *** CHANGE THIS LINE ***
    handleFileChange: (file: File | null | undefined) => void; // Expects only the file
}

// Input and Label classes
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function AcademicQualificationForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;
    // Helper for input change to match simplified signature
    const onInputChange = (fieldName: keyof TempAcademicQualification, value: string | number) => {
        handleInputChange(fieldName, value);
    };

    return (
        <div className="space-y-3">
             <p className="text-xs font-semibold text-blue-700"> {isNewItem ? 'New Qualification' : 'Editing Qualification'} </p>
             {/* Degree Input */}
             <div> <label htmlFor={`degree-${item.id}`} className={labelClass}>Degree*</label> <input type="text" id={`degree-${item.id}`} name="degree" value={item.degree || ''} onChange={(e) => onInputChange('degree', e.target.value)} className={inputClass} placeholder="e.g., Bachelor of Science" required disabled={isPending} /> </div>
             {/* Institution Input */}
             <div> <label htmlFor={`institution-${item.id}`} className={labelClass}>Institution*</label> <input type="text" id={`institution-${item.id}`} name="institution" value={item.institution || ''} onChange={(e) => onInputChange('institution', e.target.value)} className={inputClass} placeholder="e.g., San Pedro College" required disabled={isPending} /> </div>
             {/* Program Input */}
             <div> <label htmlFor={`program-${item.id}`} className={labelClass}>Program/Major*</label> <input type="text" id={`program-${item.id}`} name="program" value={item.program || ''} onChange={(e) => onInputChange('program', e.target.value)} className={inputClass} placeholder="e.g., Medical Laboratory Science" required disabled={isPending} /> </div>
             {/* Year Completed Input */}
             <div> <label htmlFor={`yearCompleted-${item.id}`} className={labelClass}>Year Completed*</label> <input type="number" id={`yearCompleted-${item.id}`} name="yearCompleted" value={item.yearCompleted || ''} onChange={(e) => onInputChange('yearCompleted', parseInt(e.target.value, 10) || '')} className={inputClass} placeholder="YYYY" required min="1900" max={new Date().getFullYear() + 5} disabled={isPending} /> </div>
             {/* File Input */}
             <div>
                <label htmlFor={`diplomaFile-${item.id}`} className={labelClass}> Upload Diploma/Transcript {isNewItem ? '(Optional)' : '(Replace Existing - Optional)'} </label>
                {!isNewItem && item.diplomaFileUrl && !item._selectedFile && ( <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600"> <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> Current: <a href={item.diplomaFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]">{item.diplomaFileUrl.split('/').pop()}</a> </div> )}
                {/* *** CHANGE THIS LINE *** */}
                <input
                    type="file"
                    id={`diplomaFile-${item.id}`}
                    name="diplomaFile"
                    onChange={(e) => handleFileChange(e.target.files?.[0])} // Only pass the file
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70"
                    accept=".pdf,.png,.jpg,.jpeg"
                    disabled={isPending}
                />
                {item._selectedFile && ( <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600"> <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> New: <span>{item._selectedFile.name}</span> <button type="button" onClick={() => handleFileChange(null)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none" title="Remove selection" disabled={isPending}>×</button> </div> )}
                <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, PNG, JPG.</p>
             </div>
        </div>
    );
}
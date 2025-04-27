// src/components/profile/ProfessionalLicenseForm.tsx
import React from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import type { TempProfessionalLicense } from '@/types'; // Import from shared types

interface Props {
    item: TempProfessionalLicense;
    isPending: boolean;
    handleInputChange: (itemId: string, fieldName: keyof TempProfessionalLicense, value: string | Date | number | null) => void;
    // ADDED: handleFileChange prop
    handleFileChange: (itemId: string, file: File | null | undefined) => void;
}

// Input and Label classes
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

// Helper to format date for input type="date"
const formatDateForInput = (date: Date | string | null): string => {
    if (!date) return '';
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch { return ''; }
};

export default function ProfessionalLicenseForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        try {
            const dateObject = dateValue ? new Date(dateValue) : null;
            if (dateObject && isNaN(dateObject.getTime())) {
                handleInputChange(item.id, 'expiration', null);
            } else {
                 // Ensure we pass a Date object or null, even if invalid (backend MUST validate)
                handleInputChange(item.id, 'expiration', dateObject);
            }
        } catch {
            handleInputChange(item.id, 'expiration', null);
        }
    };

    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">
                {isNewItem ? 'New Professional License' : 'Editing Professional License'}
            </p>

            {/* Examination Name Input */}
            <div>
                <label htmlFor={`examination-${item.id}`} className={labelClass}>Examination Name*</label>
                <input type="text" id={`examination-${item.id}`} name="examination" value={item.examination || ''} onChange={(e) => handleInputChange(item.id, 'examination', e.target.value)} className={inputClass} placeholder="e.g., Medical Technologist Licensure" required disabled={isPending} />
            </div>

            {/* License Number Input */}
            <div>
                <label htmlFor={`licenseNumber-${item.id}`} className={labelClass}>License Number*</label>
                <input type="text" id={`licenseNumber-${item.id}`} name="licenseNumber" value={item.licenseNumber || ''} onChange={(e) => handleInputChange(item.id, 'licenseNumber', e.target.value)} className={inputClass} placeholder="e.g., 0123456" required disabled={isPending} />
            </div>

            {/* Month/Year Issued Input */}
            <div>
                <label htmlFor={`monthYear-${item.id}`} className={labelClass}>Month/Year Issued*</label>
                <input type="text" id={`monthYear-${item.id}`} name="monthYear" value={item.monthYear || ''} onChange={(e) => handleInputChange(item.id, 'monthYear', e.target.value)} className={inputClass} placeholder="e.g., August 2023" required disabled={isPending} />
            </div>

            {/* Expiration Date Input */}
            <div>
                <label htmlFor={`expiration-${item.id}`} className={labelClass}>Expiration Date*</label>
                <input type="date" id={`expiration-${item.id}`} name="expiration" value={formatDateForInput(item.expiration)} onChange={handleDateChange} className={inputClass} required disabled={isPending} />
            </div>

            {/* ADDED: File Input for License */}
            <div>
                <label htmlFor={`licenseFile-${item.id}`} className={labelClass}>
                    Upload License File {isNewItem ? '(Optional)' : '(Replace Existing - Optional)'}
                </label>
                {!isNewItem && item.licenseFileUrl && !item._selectedFile && (
                    <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        Current:
                        <a href={item.licenseFileUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]">
                            {item.licenseFileUrl.split('/').pop()}
                        </a>
                    </div>
                )}
                <input
                    type="file"
                    id={`licenseFile-${item.id}`}
                    name="licenseFile"
                    onChange={(e) => handleFileChange(item.id, e.target.files?.[0])} // Use handleFileChange
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70"
                    accept=".pdf,.png,.jpg,.jpeg"
                    disabled={isPending}
                />
                {item._selectedFile && (
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        New: <span>{item._selectedFile.name}</span>
                        <button
                            type="button"
                            onClick={() => handleFileChange(item.id, null)}
                            className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                            title="Remove selection"
                            disabled={isPending}
                        >
                            ✕
                        </button>
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF, PNG, JPG.</p>
            </div>
        </div>
    );
}
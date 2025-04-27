// src/components/profile/PublicationForm.tsx
import React from 'react';
import type { TempPublication } from '@/types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: TempPublication;
    isPending: boolean;
    handleInputChange: (itemId: string, fieldName: keyof TempPublication, value: string | Date | null) => void;
    handleFileChange: (itemId: string, file: File | null | undefined) => void;
}
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


export default function PublicationForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;

    // Handle date change specifically
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        try {
            // Date is required, so only pass valid Date objects
            const dateObject = dateValue ? new Date(dateValue) : null;
            if (dateObject && !isNaN(dateObject.getTime())) {
                handleInputChange(item.id, 'datePublished', dateObject);
            } else {
                 // Handle potentially setting an invalid state or visual feedback if needed
                 // For now, we might just clear it or pass null, but backend validation is key
                 handleInputChange(item.id, 'datePublished', null); // Pass null if invalid/empty
            }
        } catch {
            handleInputChange(item.id, 'datePublished', null); // Pass null on error
        }
    };


    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">{isNewItem ? 'New Publication' : 'Editing Publication'}</p>

            {/* Research Title Input */}
            <div>
                <label htmlFor={`researchTitle-${item.id}`} className={labelClass}>Research Title*</label>
                <input
                    type="text"
                    id={`researchTitle-${item.id}`}
                    name="researchTitle"
                    value={item.researchTitle || ''}
                    onChange={(e) => handleInputChange(item.id, 'researchTitle', e.target.value)}
                    className={inputClass}
                    required
                    disabled={isPending}
                />
            </div>

            {/* Journal Input */}
            <div>
                <label htmlFor={`journal-${item.id}`} className={labelClass}>Journal Name*</label>
                <input
                    type="text"
                    id={`journal-${item.id}`}
                    name="journal"
                    value={item.journal || ''}
                    onChange={(e) => handleInputChange(item.id, 'journal', e.target.value)}
                    className={inputClass}
                    required
                    disabled={isPending}
                />
            </div>

            {/* Date Published Input */}
             <div>
                <label htmlFor={`datePublished-${item.id}`} className={labelClass}>Date Published*</label>
                <input
                    type="date"
                    id={`datePublished-${item.id}`}
                    name="datePublished"
                    value={formatDateForInput(item.datePublished)} // Format Date to YYYY-MM-DD string
                    onChange={handleDateChange}
                    className={inputClass}
                    required // Mark as required
                    disabled={isPending}
                />
            </div>

             {/* DOI Link Input */}
            <div>
                <label htmlFor={`doiLink-${item.id}`} className={labelClass}>DOI Link (Optional)</label>
                <input
                    type="text"
                    id={`doiLink-${item.id}`}
                    name="doiLink"
                    value={item.doiLink || ''}
                    onChange={(e) => handleInputChange(item.id, 'doiLink', e.target.value || null)} // Pass null if empty
                    className={inputClass}
                    placeholder="e.g., 10.1000/xyz123 or https://doi.org/..."
                    disabled={isPending}
                 />
            </div>

            {/* File Input for PDF */}
             <div>
                <label htmlFor={`pdfFile-${item.id}`} className={labelClass}>Upload PDF Copy (Optional)</label>
                 {!isNewItem && item.pdfUrl && !item._selectedFile && (
                    <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> Current:
                        <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]"> {item.pdfUrl.split('/').pop()} </a>
                    </div>
                 )}
                 <input
                    type="file"
                    id={`pdfFile-${item.id}`}
                    name="pdfFile"
                    onChange={(e) => handleFileChange(item.id, e.target.files?.[0])}
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-70"
                    accept=".pdf" // Primarily expect PDFs
                    disabled={isPending}
                 />
                 {item._selectedFile && (
                     <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-600"> <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> New: <span>{item._selectedFile.name}</span> <button type="button" onClick={() => handleFileChange(item.id, null)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none" title="Remove selection" disabled={isPending}>✕</button> </div>
                 )}
                 <p className="text-xs text-gray-500 mt-1">Max 5MB. PDF only.</p>
             </div>
        </div>
    );
}
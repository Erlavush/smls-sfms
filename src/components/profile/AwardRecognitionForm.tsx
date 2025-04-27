// src/components/profile/AwardRecognitionForm.tsx
import React from 'react';
import type { TempAwardRecognition } from '@/types';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: TempAwardRecognition;
    isPending: boolean;
    handleInputChange: (itemId: string, fieldName: keyof TempAwardRecognition, value: string | number | null) => void;
    handleFileChange: (itemId: string, file: File | null | undefined) => void;
}
const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:opacity-70";
const labelClass = "block text-xs font-medium text-gray-600 mb-0.5";

export default function AwardRecognitionForm({ item, isPending, handleInputChange, handleFileChange }: Props) {
    const isNewItem = !!item._isNew;
    return (
        <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-700">{isNewItem ? 'New Award/Recognition' : 'Editing Award/Recognition'}</p>

            {/* Award Name Input */}
            <div>
                <label htmlFor={`awardName-${item.id}`} className={labelClass}>Award/Recognition Name*</label>
                <input
                    type="text"
                    id={`awardName-${item.id}`}
                    name="awardName"
                    value={item.awardName || ''}
                    onChange={(e) => handleInputChange(item.id, 'awardName', e.target.value)}
                    className={inputClass}
                    required
                    disabled={isPending}
                />
            </div>

            {/* Awarding Body Input */}
            <div>
                <label htmlFor={`awardingBody-${item.id}`} className={labelClass}>Awarding Body*</label>
                <input
                    type="text"
                    id={`awardingBody-${item.id}`}
                    name="awardingBody"
                    value={item.awardingBody || ''}
                    onChange={(e) => handleInputChange(item.id, 'awardingBody', e.target.value)}
                    className={inputClass}
                    placeholder="e.g., San Pedro College, PAMET"
                    required
                    disabled={isPending}
                />
            </div>

            {/* Year Received Input */}
            <div>
                <label htmlFor={`yearReceived-${item.id}`} className={labelClass}>Year Received*</label>
                <input
                    type="number"
                    id={`yearReceived-${item.id}`}
                    name="yearReceived"
                    value={item.yearReceived || ''}
                    onChange={(e) => handleInputChange(item.id, 'yearReceived', parseInt(e.target.value, 10) || null)} // Parse to number or null
                    className={inputClass}
                    placeholder="YYYY"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 5} // Allow a bit into the future
                    disabled={isPending}
                />
            </div>

             {/* File Input */}
             <div>
                <label htmlFor={`certificateFile-${item.id}`} className={labelClass}>Upload Certificate/Proof (Optional)</label>
                 {!isNewItem && item.certificateUrl && !item._selectedFile && (
                    <div className="mb-1.5 flex items-center gap-1 text-xs text-gray-600">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> Current:
                        <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate max-w-[150px]"> {item.certificateUrl.split('/').pop()} </a>
                    </div>
                 )}
                 <input
                    type="file"
                    id={`certificateFile-${item.id}`}
                    name="certificateFile"
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
// src/components/profile/ProfessionalLicenseDisplay.tsx
import React from 'react';
import type { ProfessionalLicense } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, IdentificationIcon, ClockIcon as ExpiryIcon } from '@heroicons/react/24/outline'; // Added IdentificationIcon, aliased ClockIcon

// Helper function to format only the date part
const formatDateOnly = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'Invalid Date';
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return 'Invalid Date'; }
};

interface Props {
    item: ProfessionalLicense;
    isEditing?: boolean; // Added for edit mode context
    stagedFile?: File | null; // Added for pending file display
}

export default function ProfessionalLicenseDisplay({ item, isEditing, stagedFile }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Examination Name */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.examination || 'N/A'}
            </h3>

            {/* License Number */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-lime-50 text-lime-600 flex-shrink-0">
                    {/* Use a relevant icon */}
                    <IdentificationIcon className="h-4 w-4" />
                </div>
                <span>License No: {item.licenseNumber || 'N/A'}</span>
            </div>

            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Issued & Expiry */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                        <span>Issued: {item.monthYear || 'N/A'}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <ExpiryIcon className="h-4 w-4 text-gray-400"/>
                        <span>Expires: {formatDateOnly(item.expiration)}</span>
                    </div>
                </div>

                {/* Document Link / Staged File Indicator */}
                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.licenseFileUrl ? (
                     <a
                        href={item.licenseFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={item.licenseFileUrl}
                    >
                       <DocumentTextIcon className="h-4 w-4" />
                       <span>View License File</span>
                    </a>
                ) : (
                    <span className="text-xs text-gray-400 italic">No file</span>
                )}

                {/* Status Display */}
                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>
        </div>
    );
}
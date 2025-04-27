// src/components/profile/ProfessionalLicenseDisplay.tsx
import React from 'react';
import type { ProfessionalLicense } from '@/generated/prisma';
import { PaperClipIcon } from '@heroicons/react/24/outline';

// Helper function
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
}

export default function ProfessionalLicenseDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.examination || 'N/A'}</p>
            <p className="text-gray-600">
                <span className="font-medium">License No:</span> {item.licenseNumber || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Issued:</span> {item.monthYear || 'N/A'} | <span className="font-medium">Expires:</span> {formatDateOnly(item.expiration)}
            </p>
            {/* ADDED: Link to view document */}
            {item.licenseFileUrl && (
                 <a
                    href={item.licenseFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]"
                    title={item.licenseFileUrl}
                 >
                   <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                   View License File
                 </a>
            )}
        </>
    );
}
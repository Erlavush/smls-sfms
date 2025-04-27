// src/components/profile/AcademicQualificationDisplay.tsx
import React from 'react';
import type { AcademicQualification } from '@/generated/prisma';

// Helper function (can be moved to a utils file later)
const formatDateLocal = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch (e) { return 'Invalid Date'; }
};


interface Props {
    item: AcademicQualification;
}

export default function AcademicQualificationDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.degree || 'N/A'}</p>
            <p className="text-gray-600">{item.institution || 'N/A'}{item.program ? ` - ${item.program}` : ''}</p>
            <p className="text-xs text-gray-500 mt-1">Completed: {item.yearCompleted || 'N/A'}</p>
            {item.diplomaFileUrl && (
                 <a
                    href={item.diplomaFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-1 block truncate"
                    title={item.diplomaFileUrl} // Show full URL on hover
                 >
                    View Document
                 </a>
            )}
        </>
    );
}
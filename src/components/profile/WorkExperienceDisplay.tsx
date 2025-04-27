// src/components/profile/WorkExperienceDisplay.tsx
import React from 'react';
import type { WorkExperience } from '@/generated/prisma';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props { item: WorkExperience }

export default function WorkExperienceDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.position || 'N/A'}</p>
            <p className="text-gray-600">{item.institution || 'N/A'}</p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Years:</span> {item.inclusiveYears || 'N/A'}
            </p>
            {item.natureOfWork && (
                <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">Nature:</span> {item.natureOfWork}
                 </p>
            )}
            {item.proofUrl && (
                 <a
                    href={item.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]"
                    title={item.proofUrl}>
                   <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> View Proof
                 </a>
            )}
        </>
    );
}
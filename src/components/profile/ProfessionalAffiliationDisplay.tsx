// src/components/profile/ProfessionalAffiliationDisplay.tsx
import React from 'react';
import type { ProfessionalAffiliation } from '@/generated/prisma';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props { item: ProfessionalAffiliation }

export default function ProfessionalAffiliationDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.organization || 'N/A'}</p>
            {item.position && <p className="text-gray-600">Position: {item.position}</p>}
            <p className="text-xs text-gray-500 mt-1">Years: {item.inclusiveYears || 'N/A'}</p>
            {item.membershipProofUrl && (
                 <a href={item.membershipProofUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]" title={item.membershipProofUrl}>
                   <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> View Proof
                 </a>
            )}
        </>
    );
}
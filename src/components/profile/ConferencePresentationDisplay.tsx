// src/components/profile/ConferencePresentationDisplay.tsx
import React from 'react';
import type { ConferencePresentation } from '@/generated/prisma';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props { item: ConferencePresentation }

export default function ConferencePresentationDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.paperTitle || 'N/A'}</p>
            <p className="text-gray-600">
                <span className="font-medium">Event:</span> {item.eventName || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Date/Location:</span> {item.dateLocation || 'N/A'}
            </p>
            {item.proofUrl && (
                 <a href={item.proofUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]" title={item.proofUrl}>
                   <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> View Proof/Details
                 </a>
            )}
        </>
    );
}
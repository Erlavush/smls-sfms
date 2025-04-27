// src/components/profile/AwardRecognitionDisplay.tsx
import React from 'react';
import type { AwardRecognition } from '@/generated/prisma';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props { item: AwardRecognition }

export default function AwardRecognitionDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.awardName || 'N/A'}</p>
            <p className="text-gray-600">
                <span className="font-medium">Awarding Body:</span> {item.awardingBody || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Year Received:</span> {item.yearReceived || 'N/A'}
            </p>
            {item.certificateUrl && (
                 <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]"
                    title={item.certificateUrl}>
                   <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> View Certificate/Proof
                 </a>
            )}
        </>
    );
}
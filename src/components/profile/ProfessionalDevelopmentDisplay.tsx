// src/components/profile/ProfessionalDevelopmentDisplay.tsx
import React from 'react';
import type { ProfessionalDevelopment } from '@/generated/prisma';
import { PaperClipIcon } from '@heroicons/react/24/outline';

interface Props {
    item: ProfessionalDevelopment;
}

export default function ProfessionalDevelopmentDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.title || 'N/A'}</p>
            <p className="text-gray-600">
                <span className="font-medium">Organizer:</span> {item.organizer || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Date/Location:</span> {item.dateLocation || 'N/A'}
            </p>
            {item.certificateFileUrl && (
                <a
                    href={item.certificateFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]" // Added max-w for long URLs
                    title={item.certificateFileUrl} // Show full URL on hover
                >
                   <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                   View Certificate
                </a>
            )}
        </>
    );
}
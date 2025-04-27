// src/components/profile/PublicationDisplay.tsx
import React from 'react';
import type { Publication } from '@/generated/prisma';
import { PaperClipIcon, LinkIcon } from '@heroicons/react/24/outline';

// Helper function
const formatDateOnly = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'Invalid Date';
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return 'Invalid Date'; }
};

interface Props { item: Publication }

export default function PublicationDisplay({ item }: Props) {
    return (
        <>
            <p className="font-semibold text-gray-800">{item.researchTitle || 'N/A'}</p>
            <p className="text-gray-600 italic">
                <span className="font-medium not-italic">Journal:</span> {item.journal || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">Published:</span> {formatDateOnly(item.datePublished)}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                {item.doiLink && (
                    <a
                        href={item.doiLink.startsWith('http') ? item.doiLink : `https://${item.doiLink}`} // Basic protocol check
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                        title={item.doiLink}
                    >
                    <LinkIcon className="h-3 w-3 flex-shrink-0" /> DOI Link
                    </a>
                )}
                 {item.pdfUrl && (
                    <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                        title={item.pdfUrl}>
                    <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> View PDF
                    </a>
                )}
            </div>
        </>
    );
}
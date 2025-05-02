// src/components/profile/PublicationDisplay.tsx
import React from 'react';
import type { Publication } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, LinkIcon, BookOpenIcon } from '@heroicons/react/24/outline'; // Added BookOpenIcon

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
    item: Publication;
}

export default function PublicationDisplay({ item }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Research Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.researchTitle || 'N/A'}
            </h3>

            {/* Journal */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold italic">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-rose-50 text-rose-600 flex-shrink-0 not-italic">
                    {/* Use a relevant icon */}
                    <BookOpenIcon className="h-4 w-4" />
                </div>
                <span className='not-italic'>Journal: {item.journal || 'N/A'}</span>
            </div>

            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Date Published */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Published: {formatDateOnly(item.datePublished)}</span>
                </div>

                {/* Links (DOI & PDF) */}
                <div className="flex items-center gap-x-3 gap-y-1">
                    {item.doiLink && (
                        <a
                            href={item.doiLink.startsWith('http') ? item.doiLink : `https://${item.doiLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                            title={item.doiLink}
                        >
                        <LinkIcon className="h-4 w-4" /> DOI Link
                        </a>
                    )}
                    {item.pdfUrl && (
                        <a
                            href={item.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                             className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                            title={item.pdfUrl}>
                        <DocumentTextIcon className="h-4 w-4" /> View PDF
                        </a>
                    )}
                    {!item.doiLink && !item.pdfUrl && (
                         <span className="text-xs text-gray-400 italic">No links</span>
                    )}
                </div>


                {/* Status Display */}
                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>
        </div>
    );
}
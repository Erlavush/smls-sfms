// src/components/profile/PublicationDisplay.tsx
import React, { useState } from 'react'; // Import useState
import type { Publication } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay';
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, LinkIcon, BookOpenIcon, EyeIcon } from '@heroicons/react/24/outline'; // Added EyeIcon
import FilePreviewModal from '@/components/ui/FilePreviewModal'; // Import the modal

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
    isEditing?: boolean;
    stagedFile?: File | null;
}

export default function PublicationDisplay({ item, isEditing, stagedFile }: Props) {
    // State for this specific item's preview modal (for PDF)
    const [isPdfPreviewModalOpen, setIsPdfPreviewModalOpen] = useState(false);

    const openPdfPreview = () => {
        if (item.pdfUrl) {
            setIsPdfPreviewModalOpen(true);
        }
    };

    const closePdfPreview = () => {
        setIsPdfPreviewModalOpen(false);
    };

    // Helper to get filename from URL
    const getFileName = (url: string | null | undefined): string => {
        if (!url) return 'Publication PDF';
        try {
            return decodeURIComponent(url.split('/').pop() || 'Publication PDF');
        } catch {
            return 'Publication PDF';
        }
    };

    const pdfFileName = getFileName(item.pdfUrl);

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.researchTitle || 'N/A'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold italic">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-rose-50 text-rose-600 flex-shrink-0 not-italic">
                    <BookOpenIcon className="h-4 w-4" />
                </div>
                <span className='not-italic'>Journal: {item.journal || 'N/A'}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Published: {formatDateOnly(item.datePublished)}</span>
                </div>

                <div className="flex items-center gap-x-3 gap-y-1">
                    {isEditing && stagedFile ? (
                        <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                            <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                            <span>Pending upload: {stagedFile.name}</span>
                        </div>
                    ) : (
                        <>
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
                                 <button
                                    type="button"
                                    onClick={openPdfPreview}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                                    title={`Preview ${pdfFileName}`}>
                                <EyeIcon className="h-4 w-4" /> Preview PDF
                                </button>
                            )}
                            {!item.doiLink && !item.pdfUrl && !isEditing && (
                                 (<span className="text-xs text-gray-400 italic">No links/file</span>)
                            )}
                        </>
                    )}
                </div>

                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>

            {item.pdfUrl && pdfFileName && (
                <FilePreviewModal
                    isOpen={isPdfPreviewModalOpen}
                    onClose={closePdfPreview}
                    fileUrl={item.pdfUrl}
                    fileName={pdfFileName}
                />
            )}
        </div>
    );
}
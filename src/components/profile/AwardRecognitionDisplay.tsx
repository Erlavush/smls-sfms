// src/components/profile/AwardRecognitionDisplay.tsx
import React, { useState } from 'react'; // Import useState
import type { AwardRecognition } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay';
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon, StarIcon, EyeIcon } from '@heroicons/react/24/outline'; // Added EyeIcon
import FilePreviewModal from '@/components/ui/FilePreviewModal'; // Import the modal

interface Props {
    item: AwardRecognition;
    isEditing?: boolean;
    stagedFile?: File | null;
}

export default function AwardRecognitionDisplay({ item, isEditing, stagedFile }: Props) {
    // State for this specific item's preview modal
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const openPreview = () => {
        if (item.certificateUrl) {
            setIsPreviewModalOpen(true);
        }
    };

    const closePreview = () => {
        setIsPreviewModalOpen(false);
    };

    // Helper to get filename from URL
    const getFileName = (url: string | null | undefined): string => {
        if (!url) return 'Certificate';
        try {
            return decodeURIComponent(url.split('/').pop() || 'Certificate');
        } catch {
            return 'Certificate';
        }
    };

    const certificateFileName = getFileName(item.certificateUrl);

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.awardName || 'N/A'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex-shrink-0">
                    <StarIcon className="h-4 w-4" />
                </div>
                <span>{item.awardingBody || 'N/A'}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Received: {item.yearReceived || 'N/A'}</span>
                </div>

                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.certificateUrl ? (
                     <button
                        type="button"
                        onClick={openPreview}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={`Preview ${certificateFileName}`}
                    >
                       <EyeIcon className="h-4 w-4" />
                       <span>Preview Certificate</span>
                    </button>
                ) : (
                    <span className="text-xs text-gray-400 italic">No certificate</span>
                )}

                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>

            {item.certificateUrl && certificateFileName && (
                <FilePreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={closePreview}
                    fileUrl={item.certificateUrl}
                    fileName={certificateFileName}
                />
            )}
        </div>
    );
}
// src/components/profile/AcademicQualificationDisplay.tsx
import React, { useState } from 'react';
import type { AcademicQualification } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay';
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon, EyeIcon } from '@heroicons/react/24/outline';
import FilePreviewModal from '@/components/ui/FilePreviewModal';

interface Props {
    item: AcademicQualification;
    isEditing?: boolean;
    stagedFile?: File | null;
}

export default function AcademicQualificationDisplay({ item, isEditing, stagedFile }: Props) {
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const openPreview = () => {
        if (item.diplomaFileUrl) {
            setIsPreviewModalOpen(true);
        }
    };

    const closePreview = () => {
        setIsPreviewModalOpen(false);
    };

    // Helper to get filename from URL, can be moved to utils if used elsewhere
    const getFileName = (url: string | null | undefined): string => {
        if (!url) return 'Document';
        try {
            return decodeURIComponent(url.split('/').pop() || 'Document');
        } catch {
            return 'Document';
        }
    };

    const diplomaFileName = getFileName(item.diplomaFileUrl);

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.degree || 'N/A'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex-shrink-0">
                    <BuildingLibraryIcon className="h-4 w-4" />
                </div>
                <span>{item.institution || 'N/A'}{item.program ? ` - ${item.program}` : ''}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Completed: {item.yearCompleted || 'N/A'}</span>
                </div>

                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.diplomaFileUrl ? (
                     <button
                        type="button"
                        onClick={openPreview}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={`Preview ${diplomaFileName}`}
                    >
                       <EyeIcon className="h-4 w-4" />
                       <span>Preview Document</span>
                    </button>
                ) : (
                    <span className="text-xs text-gray-400 italic">No document</span>
                )}

                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>

            {item.diplomaFileUrl && diplomaFileName && (
                <FilePreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={closePreview}
                    fileUrl={item.diplomaFileUrl}
                    fileName={diplomaFileName}
                />
            )}
        </div>
    );
}
// src/components/profile/ProfessionalLicenseDisplay.tsx
import React, { useState } from 'react'; // Import useState
import type { ProfessionalLicense } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay';
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, IdentificationIcon, ClockIcon as ExpiryIcon, EyeIcon } from '@heroicons/react/24/outline'; // Added EyeIcon
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
    item: ProfessionalLicense;
    isEditing?: boolean;
    stagedFile?: File | null;
}

export default function ProfessionalLicenseDisplay({ item, isEditing, stagedFile }: Props) {
    // State for this specific item's preview modal
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    const openPreview = () => {
        if (item.licenseFileUrl) {
            setIsPreviewModalOpen(true);
        }
    };

    const closePreview = () => {
        setIsPreviewModalOpen(false);
    };

    // Helper to get filename from URL
    const getFileName = (url: string | null | undefined): string => {
        if (!url) return 'License File';
        try {
            return decodeURIComponent(url.split('/').pop() || 'License File');
        } catch {
            return 'License File';
        }
    };

    const licenseFileName = getFileName(item.licenseFileUrl);

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.examination || 'N/A'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-lime-50 text-lime-600 flex-shrink-0">
                    <IdentificationIcon className="h-4 w-4" />
                </div>
                <span>License No: {item.licenseNumber || 'N/A'}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                        <span>Issued: {item.monthYear || 'N/A'}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <ExpiryIcon className="h-4 w-4 text-gray-400"/>
                        <span>Expires: {formatDateOnly(item.expiration)}</span>
                    </div>
                </div>

                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.licenseFileUrl ? (
                     <button
                        type="button"
                        onClick={openPreview}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={`Preview ${licenseFileName}`}
                    >
                       <EyeIcon className="h-4 w-4" />
                       <span>Preview License</span>
                    </button>
                ) : (
                    <span className="text-xs text-gray-400 italic">No file</span>
                )}

                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>

            {item.licenseFileUrl && licenseFileName && (
                <FilePreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={closePreview}
                    fileUrl={item.licenseFileUrl}
                    fileName={licenseFileName}
                />
            )}
        </div>
    );
}
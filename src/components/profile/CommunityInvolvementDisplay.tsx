// src/components/profile/CommunityInvolvementDisplay.tsx
import React from 'react';
import type { CommunityInvolvement } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Added UserGroupIcon, MapPinIcon

interface Props {
    item: CommunityInvolvement;
    isEditing?: boolean; // Added for edit mode context
    stagedFile?: File | null; // Added for pending file display
}

export default function CommunityInvolvementDisplay({ item, isEditing, stagedFile }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Engagement Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.engagementTitle || 'N/A'}
            </h3>
            {/* Role */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-teal-50 text-teal-600 flex-shrink-0">
                    {/* Use a relevant icon */}
                    <UserGroupIcon className="h-4 w-4" />
                </div>
                <span>Role: {item.role || 'N/A'}</span>
            </div>
            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Location/Date */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <MapPinIcon className="h-4 w-4 text-gray-400"/>
                    <span>{item.locationDate || 'N/A'}</span>
                </div>

                {/* Document Link / Staged File Indicator */}
                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.proofUrl ? (
                     <a
                        href={item.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={item.proofUrl}
                    >
                       <DocumentTextIcon className="h-4 w-4" />
                       <span>View Proof</span>
                    </a>
                ) : (
                    <span className="text-xs text-gray-400 italic">No proof</span>
                )}

                {/* Status Display */}
                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>
        </div>
    );
}
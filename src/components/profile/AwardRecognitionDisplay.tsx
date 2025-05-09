// src/components/profile/AwardRecognitionDisplay.tsx
import React from 'react';
import type { AwardRecognition } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon, StarIcon } from '@heroicons/react/24/outline'; // Added StarIcon

interface Props {
    item: AwardRecognition;
    isEditing?: boolean; // Added for edit mode context
    stagedFile?: File | null; // Added for pending file display
}

export default function AwardRecognitionDisplay({ item, isEditing, stagedFile }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Award Name Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.awardName || 'N/A'}
            </h3>
            {/* Awarding Body */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex-shrink-0">
                    {/* Use a relevant icon */}
                    <StarIcon className="h-4 w-4" />
                </div>
                <span>{item.awardingBody || 'N/A'}</span>
            </div>
            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Year Received */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Received: {item.yearReceived || 'N/A'}</span>
                </div>

                {/* Document Link / Staged File Indicator */}
                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.certificateUrl ? (
                     <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={item.certificateUrl}
                    >
                       <DocumentTextIcon className="h-4 w-4" />
                       <span>View Certificate</span>
                    </a>
                ) : (
                    <span className="text-xs text-gray-400 italic">No certificate</span>
                )}

                {/* Status Display */}
                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0">
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>
        </div>
    );
}
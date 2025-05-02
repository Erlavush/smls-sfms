// src/components/profile/AwardRecognitionDisplay.tsx
import React from 'react';
import type { AwardRecognition } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon, StarIcon } from '@heroicons/react/24/outline'; // Added StarIcon

interface Props {
    item: AwardRecognition;
}

export default function AwardRecognitionDisplay({ item }: Props) {
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

                {/* Document Link */}
                {item.certificateUrl ? (
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
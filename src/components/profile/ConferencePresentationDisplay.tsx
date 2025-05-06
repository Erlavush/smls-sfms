// src/components/profile/ConferencePresentationDisplay.tsx
import React from 'react';
import type { ConferencePresentation } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon, PresentationChartBarIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Added PresentationChartBarIcon, MapPinIcon

interface Props {
    item: ConferencePresentation;
    isEditing?: boolean; // Added for edit mode context
    stagedFile?: File | null; // Added for pending file display
}

export default function ConferencePresentationDisplay({ item, isEditing, stagedFile }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Paper Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.paperTitle || 'N/A'}
            </h3>

            {/* Event Name */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex-shrink-0">
                    {/* Use a relevant icon */}
                    <PresentationChartBarIcon className="h-4 w-4" />
                </div>
                <span>Event: {item.eventName || 'N/A'}</span>
            </div>

            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Date/Location */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <MapPinIcon className="h-4 w-4 text-gray-400"/>
                    <span>{item.dateLocation || 'N/A'}</span>
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
                       <span>View Proof/Details</span>
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
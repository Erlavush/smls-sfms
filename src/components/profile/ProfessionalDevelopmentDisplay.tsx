// src/components/profile/ProfessionalDevelopmentDisplay.tsx
import React from 'react';
import type { ProfessionalDevelopment } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon, SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Added SparklesIcon, MapPinIcon

interface Props {
    item: ProfessionalDevelopment;
}

export default function ProfessionalDevelopmentDisplay({ item }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Development Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.title || 'N/A'}
            </h3>

            {/* Organizer */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-yellow-50 text-yellow-600 flex-shrink-0">
                    {/* Use a relevant icon */}
                    <SparklesIcon className="h-4 w-4" />
                </div>
                <span>Organizer: {item.organizer || 'N/A'}</span>
            </div>

            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Date/Location */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <MapPinIcon className="h-4 w-4 text-gray-400"/>
                    <span>{item.dateLocation || 'N/A'}</span>
                </div>

                {/* Document Link */}
                {item.certificateFileUrl ? (
                     <a
                        href={item.certificateFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200"
                        title={item.certificateFileUrl}
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
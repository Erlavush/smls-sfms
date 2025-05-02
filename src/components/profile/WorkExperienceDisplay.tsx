// src/components/profile/WorkExperienceDisplay.tsx
import React from 'react';
import type { WorkExperience } from '@/generated/prisma';
import StatusDisplay from './StatusDisplay'; // Import the new StatusDisplay component
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingOfficeIcon, BriefcaseIcon } from '@heroicons/react/24/outline'; // Added BriefcaseIcon

interface Props {
    item: WorkExperience;
}

export default function WorkExperienceDisplay({ item }: Props) {
    return (
        // Mimic the 'qualification' div structure
        <div className="flex flex-col gap-2">
            {/* Position Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight">
                {item.position || 'N/A'}
            </h3>

            {/* Institution */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-orange-50 text-orange-600 flex-shrink-0">
                    {/* Use a relevant icon */}
                    <BuildingOfficeIcon className="h-4 w-4" />
                </div>
                <span>{item.institution || 'N/A'}</span>
            </div>

             {/* Nature of Work (Conditional) */}
             {item.natureOfWork && (
                <p className="text-xs text-gray-500 mt-1 pl-8"> {/* Indent slightly */}
                    <span className="font-medium">Nature:</span> {item.natureOfWork}
                 </p>
            )}

            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2">

                {/* Inclusive Years */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Years: {item.inclusiveYears || 'N/A'}</span>
                </div>

                {/* Document Link */}
                {item.proofUrl ? (
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
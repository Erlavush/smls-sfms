// src/components/profile/AcademicQualificationDisplay.tsx
import React from 'react';
import type { AcademicQualification } from '@/generated/prisma';
// Import the new StatusDisplay component
import StatusDisplay from './StatusDisplay';
// Import necessary icons (adjust as needed)
import { PaperClipIcon, DocumentTextIcon, CalendarDaysIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

interface Props {
    item: AcademicQualification;
    isEditing?: boolean; // Added for edit mode context
    stagedFile?: File | null; // Added for pending file display
}

export default function AcademicQualificationDisplay({ item, isEditing, stagedFile }: Props) {
    return (
        // Mimic the 'qualification' div structure from the template
        <div className="flex flex-col gap-2"> {/* Reduced gap slightly */}
            {/* Degree Title */}
            <h3 className="text-base font-bold text-gray-800 tracking-tight"> {/* Adjusted size */}
                {item.degree || 'N/A'}
            </h3>
            {/* Institution */}
            <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold"> {/* Adjusted size/gap */}
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex-shrink-0"> {/* Adjusted size */}
                    {/* Use a relevant icon */}
                    <BuildingLibraryIcon className="h-4 w-4" />
                </div>
                <span>{item.institution || 'N/A'}{item.program ? ` - ${item.program}` : ''}</span>
            </div>
            {/* Details Row */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-3 border-t border-gray-100 mt-2"> {/* Added gap/margin */}

                {/* Completion Year */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium"> {/* Adjusted size/gap */}
                    <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                    <span>Completed: {item.yearCompleted || 'N/A'}</span>
                </div>

                {/* Document Link / Staged File Indicator */}
                {isEditing && stagedFile ? (
                    <div className="mt-1 flex items-center gap-1 text-xs text-purple-700 bg-purple-50 p-1 rounded">
                        <PaperClipIcon className="h-3 w-3 flex-shrink-0" />
                        <span>Pending upload: {stagedFile.name}</span>
                    </div>
                ) : item.diplomaFileUrl ? (
                     <a
                        href={item.diplomaFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-1 transition duration-200" // Adjusted size/padding
                        title={item.diplomaFileUrl}
                    >
                       <DocumentTextIcon className="h-4 w-4" /> {/* Changed icon */}
                       <span>View Document</span>
                    </a>
                ) : (
                    <span className="text-xs text-gray-400 italic">No document</span>
                )}

                {/* Status Display */}
                <div className="w-full sm:w-auto flex justify-end pt-1 sm:pt-0"> {/* Ensure status is right-aligned */}
                    <StatusDisplay status={item.status} rejectionReason={item.rejectionReason} />
                </div>
            </div>
        </div>
    );
}
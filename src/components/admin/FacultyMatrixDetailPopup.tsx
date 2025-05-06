'use client';

import React from 'react';
import Link from 'next/link';
// Updated imports: Added LightBulbIcon, CheckIcon is already there
import { ArrowTopRightOnSquareIcon, TagIcon, CheckIcon, LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { FacultyLinkedSpecialization } from '@/types';

interface Props {
    faculty: FacultyLinkedSpecialization | null;
    onClose: () => void;
}

export default function FacultyMatrixDetailPopup({ faculty, onClose }: Props) {
    if (!faculty) {
        return null; // Return null if no faculty data is provided
    }

    // Ensure linkedSpecializationNames is always an array, sort it
    const specializations = faculty.linkedSpecializationNames?.sort() || [];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 transition-opacity duration-300"
            aria-labelledby="faculty-detail-popup-title"
            role="dialog"
            aria-modal="true"
            onClick={onClose} // Close when clicking the backdrop
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2" id="faculty-detail-popup-title">
                        {/* Using TagIcon for general faculty info */}
                        <TagIcon className="h-5 w-5 text-indigo-600"/>
                        {faculty.name || 'Unnamed Faculty'} - Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                        aria-label="Close detail view"
                    >
                        {/* Using XMarkIcon for close button */}
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="p-5 overflow-y-auto flex-grow space-y-5"> {/* Added space-y-5 */}
                    {/* Basic Info */}
                    <div>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Email:</span> {faculty.email || 'N/A'}
                        </p>
                        {/* Add other basic info if needed */}
                    </div>

                    {/* Linked Specializations / Suggested Areas Section */}
                    <div>
                        <h4 className="text-md font-semibold text-yellow-800 mb-3 border-b border-yellow-200 pb-1 flex items-center gap-2">
                            <LightBulbIcon className="h-5 w-5 text-yellow-600" />
                            Linked Specializations / Suggested Areas ({specializations.length})
                        </h4>
                        {specializations.length === 0 ? (
                            <p className="italic text-gray-500 text-sm">No specializations linked.</p>
                        ) : (
                            <ul className="space-y-1.5 pl-2">
                                {specializations.map((specName, index) => (
                                    <li key={`${faculty.userId}-spec-${index}`} className="flex items-center gap-2 text-sm text-gray-800">
                                        {/* Using CheckIcon to indicate linkage */}
                                        <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0"/>
                                        <span>{specName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                         <p className="text-xs text-gray-400 mt-3 italic">Suggestions based on explicitly linked specializations.</p>
                    </div>
                </div>

                 {/* Footer with Profile Link */}
                 <div className="p-4 border-t border-gray-200 bg-gray-50 text-right flex-shrink-0">
                    <Link
                        href={`/admin/faculty/${faculty.userId}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        target="_blank" // Open profile in new tab
                        rel="noopener noreferrer"
                    >
                        View Full Profile
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
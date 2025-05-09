'use client';

import React from 'react';
import Link from 'next/link';
// Updated imports: Added LightBulbIcon, CheckIcon is already there
import { ArrowTopRightOnSquareIcon, TagIcon, CheckIcon, LightBulbIcon, XMarkIcon, BookOpenIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { FacultyLinkedSpecialization } from '@/types';
import type { Course, Specialization } from '@/generated/prisma/client'; // <-- ADD THIS IMPORT

// Define CourseMatchStrength type (can be imported from a shared types file if it exists there too)
type CourseMatchStrength = 'FULL_MATCH' | 'PARTIAL_MATCH' | 'NO_MATCH';

interface Props {
    faculty: FacultyLinkedSpecialization | null;
    onClose: () => void;
    selectedCourseForCheck?: (Course & { // Make it optional, as a course might not always be selected
        requiredSpecializations: Pick<Specialization, 'id' | 'name'>[];
    }) | null;
}

export default function FacultyMatrixDetailPopup({ faculty, onClose, selectedCourseForCheck }: Props) {
    if (!faculty) {
        return null; // Return null if no faculty data is provided
    }

    // Ensure linkedSpecializationNames is always an array, sort it
    const specializations = faculty.linkedSpecializationNames?.sort() || [];

    // --- NEW: Calculate match strength for the selected course ---
    let courseSuitability: {
        strength: CourseMatchStrength;
        possessedReqSpecs: string[];
        missingReqSpecs: string[];
    } | null = null;

    if (selectedCourseForCheck && selectedCourseForCheck.requiredSpecializations) {
        const facultySpecNamesSet = new Set(faculty.linkedSpecializationNames || []);
        const courseReqSpecNames = selectedCourseForCheck.requiredSpecializations.map(s => s.name);
        
        let possessedCount = 0;
        const possessedSpecs: string[] = [];
        const missingSpecs: string[] = [];

        if (courseReqSpecNames.length === 0) { // Course has no specific requirements
            courseSuitability = { strength: 'FULL_MATCH', possessedReqSpecs: [], missingReqSpecs: [] };
        } else {
            courseReqSpecNames.forEach(reqSpecName => {
                if (facultySpecNamesSet.has(reqSpecName)) {
                    possessedCount++;
                    possessedSpecs.push(reqSpecName);
                } else {
                    missingSpecs.push(reqSpecName);
                }
            });

            if (possessedCount === courseReqSpecNames.length) {
                courseSuitability = { strength: 'FULL_MATCH', possessedReqSpecs: possessedSpecs, missingReqSpecs: missingSpecs };
            } else if (possessedCount > 0) {
                courseSuitability = { strength: 'PARTIAL_MATCH', possessedReqSpecs: possessedSpecs, missingReqSpecs: missingSpecs };
            } else {
                courseSuitability = { strength: 'NO_MATCH', possessedReqSpecs: possessedSpecs, missingReqSpecs: missingSpecs };
            }
        }
    }
    // --- END NEW LOGIC ---

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
                        {/* Made title slightly more prominent and changed icon/color for emphasis */}
                        <h4 className="text-md font-semibold text-indigo-700 mb-2.5 border-b border-indigo-100 pb-1.5 flex items-center gap-2">
                            <LightBulbIcon className="h-5 w-5 text-yellow-600" />
                            Expertise / Suggested Teaching Areas ({specializations.length})
                        </h4>
                        {specializations.length === 0 ? (
                            <p className="italic text-gray-500 text-sm">No specializations linked.</p>
                        ) : (
                            <ul className="space-y-1.5 pl-1">
                                {specializations.map((specName, index) => (
                                    <li key={`${faculty.userId}-spec-${index}`} className="flex items-center gap-2 text-sm text-gray-800">
                                        {/* Using CheckIcon to indicate linkage */}
                                        <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0"/>
                                        <span>{specName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                         {/* Added a more direct note for admins */}
                         <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
                            Consider these areas when assigning teaching loads or responsibilities.
                         </p>
                    </div>

                    {/* --- NEW: Course Specific Suitability Section --- */}
                    {selectedCourseForCheck && courseSuitability && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="text-md font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <BookOpenIcon className="h-5 w-5 text-gray-500" />
                                Suitability for: <span className="text-blue-600">{selectedCourseForCheck.name}</span>
                            </h4>
                            <div className="text-sm space-y-1">
                                {courseSuitability.strength === 'FULL_MATCH' && (
                                    <p className="flex items-center gap-1 text-green-700">
                                        <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                        <strong>Full Match:</strong> Meets all required specializations.
                                    </p>
                                )}
                                {courseSuitability.strength === 'PARTIAL_MATCH' && (
                                    <p className="flex items-center gap-1 text-yellow-700">
                                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                                        <strong>Partial Match:</strong> Meets some required specializations.
                                    </p>
                                )}
                                {courseSuitability.strength === 'NO_MATCH' && (
                                    <p className="flex items-center gap-1 text-red-700">
                                        <XCircleIcon className="h-5 w-5 text-red-500" />
                                        <strong>No Direct Match:</strong> Does not meet primary specializations for this course.
                                    </p>
                                )}

                                {/* Optionally list possessed and missing specializations for the selected course */}
                                {courseSuitability.possessedReqSpecs.length > 0 && (
                                    <p className="text-xs text-gray-600 pl-6">
                                        <span className="font-medium text-green-600">Possesses:</span> {courseSuitability.possessedReqSpecs.join(', ')}
                                    </p>
                                )}
                                {courseSuitability.missingReqSpecs.length > 0 && (
                                    <p className="text-xs text-gray-600 pl-6">
                                        <span className="font-medium text-red-600">Lacks:</span> {courseSuitability.missingReqSpecs.join(', ')}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    {/* --- END NEW Section --- */}
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
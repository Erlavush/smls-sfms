// Action: Modify src/app/(protected)/admin/matrix/page.tsx

'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { getFacultySpecializationData, generateMatrixCsv } from '@/lib/actions/dashboardActions'; // Import actions
import { getCourses } from '@/lib/courseActions'; // <-- CORRECTED IMPORT PATH
import { TableCellsIcon, ExclamationTriangleIcon, UserCircleIcon, FunnelIcon, ArrowDownTrayIcon, BookOpenIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'; // <-- ADDED BookOpenIcon, CheckIcon, XMarkIcon
import FacultyMatrixDetailPopup from '@/components/admin/FacultyMatrixDetailPopup';
import type { FacultyLinkedSpecialization } from '@/types';
import type { Course, Specialization } from '@/generated/prisma/client'; // <-- NEW IMPORT for types

export default function AdminMatrixPage() {
    // --- State Declarations ---
    const [matrixData, setMatrixData] = useState<FacultyLinkedSpecialization[]>([]);
    const [allSpecializations, setAllSpecializations] = useState<string[]>([]); // For table headers
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyLinkedSpecialization | null>(null);
    // const [filterSpecialization, setFilterSpecialization] = useState<string>(''); // Old single filter
    const [selectedFilterSpecializations, setSelectedFilterSpecializations] = useState<Set<string>>(new Set()); // New multi-filter
    const [isDownloading, startDownloadTransition] = useTransition();
    const [downloadError, setDownloadError] = useState<string | null>(null);

    // --- NEW STATE FOR COURSE SUITABILITY CHECK ---
    const [allCourses, setAllCourses] = useState<(Course & { requiredSpecializations: Pick<Specialization, 'id' | 'name'>[] })[]>([]);
    const [selectedCourseIdForCheck, setSelectedCourseIdForCheck] = useState<string>(''); // Store ID of selected course
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    // --- END NEW STATE ---

    // --- Fetch Initial Data ---
    useEffect(() => {
        setIsLoading(true); // Combined loading state
        setIsLoadingCourses(true);
        setError(null);
        setDownloadError(null);

        Promise.all([
            getFacultySpecializationData(),
            getCourses() // Fetch courses
        ]).then(([matrixResponse, coursesResponse]) => {
            // Process matrixResponse (faculty and all specialization names)
            if (matrixResponse.success && matrixResponse.data && matrixResponse.allSpecializationNames) {
                setMatrixData(matrixResponse.data);
                setAllSpecializations(matrixResponse.allSpecializationNames);
            } else {
                setError(prev => prev ? `${prev}\n${matrixResponse.error || 'Failed to load matrix data.'}` : (matrixResponse.error || 'Failed to load matrix data.'));
                setMatrixData([]);
                setAllSpecializations([]);
            }

            // Process coursesResponse
            if (coursesResponse.success && coursesResponse.courses) {
                const processedCourses = coursesResponse.courses.map(course => ({
                    ...course,
                    requiredSpecializations: course.requiredSpecializations || [], // Default to empty array if undefined
                }));
                setAllCourses(processedCourses);
            } else {
                setError(prev => prev ? `${prev}\n${coursesResponse.error || 'Failed to load courses.'}` : (coursesResponse.error || 'Failed to load courses.'));
                setAllCourses([]);
            }
        }).catch(err => {
            console.error("Error fetching page data:", err);
            setError('An unexpected error occurred while loading page data.');
            setMatrixData([]);
            setAllSpecializations([]);
            setAllCourses([]);
        }).finally(() => {
            setIsLoading(false);
            setIsLoadingCourses(false);
        });
    }, []);

    // --- Filtering Logic ---
    const filteredMatrixData = useMemo(() => {
        // If no specializations are selected for filtering, return all data
        if (selectedFilterSpecializations.size === 0) {
            return matrixData;
        }
        // Filter faculty who have ALL of the selected specializations
        return matrixData.filter(faculty =>
            // Check if every specialization in selectedFilterSpecializations is present in faculty.linkedSpecializationNames
            Array.from(selectedFilterSpecializations).every(selSpec =>
                faculty.linkedSpecializationNames.includes(selSpec)
            )
        );
    }, [matrixData, selectedFilterSpecializations]);

    // --- Handler for Specialization Filter Checkbox Change ---
    const handleFilterChange = (specializationName: string, isChecked: boolean) => {
        setSelectedFilterSpecializations(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (isChecked) {
                newSelected.add(specializationName);
            } else {
                newSelected.delete(specializationName);
            }
            return newSelected;
        });
    };

    // --- Popup Handlers ---
    const handleFacultyClick = (faculty: FacultyLinkedSpecialization) => {
        setSelectedFaculty(faculty);
        setIsPopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedFaculty(null);
    };

    // --- CSV Download Handler ---
    const handleDownloadCsv = () => {
        setDownloadError(null);
        startDownloadTransition(async () => {
            try {
                const result = await generateMatrixCsv();
                if (result.success && result.csvData) {
                    const blob = new Blob([result.csvData], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute('download', 'faculty_specialization_matrix.csv');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                } else {
                    setDownloadError(result.error || 'Failed to generate CSV data.');
                }
            } catch (err: any) {
                console.error("CSV download error:", err);
                setDownloadError('An unexpected error occurred during download.');
            }
        });
    };

    const selectedCourseDetails = useMemo(() => {
        if (!selectedCourseIdForCheck) return null;
        return allCourses.find(course => course.id === selectedCourseIdForCheck);
    }, [selectedCourseIdForCheck, allCourses]);

    const requiredSpecsForSelectedCourse = useMemo(() => {
        if (!selectedCourseDetails || !selectedCourseDetails.requiredSpecializations) return new Set<string>();
        return new Set(selectedCourseDetails.requiredSpecializations.map(spec => spec.name)); // Store names for easy lookup
    }, [selectedCourseDetails]);

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                 <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading specialization matrix...</span>
                </div>
            </div>
        );
     }

    // --- Error State ---
    if (error) {
        return (
            <div className="p-6 bg-red-50 min-h-screen">
                 <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow border border-red-200">
                     <div className="flex items-center gap-3 text-red-700 mb-4">
                        <ExclamationTriangleIcon className="h-6 w-6" />
                        <h2 className="text-xl font-semibold">Error Loading Matrix</h2>
                     </div>
                    <p className="text-red-600 mb-6">{error}</p>
                 </div>
            </div>
        );
     }

    // --- Render Matrix Table ---
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen relative">
            {/* --- Header, Filter, and Download Row --- */}
            <div className="mb-6 md:flex md:items-center md:justify-between gap-4 flex-wrap">
                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4 md:mb-0 flex-shrink-0">
                    <TableCellsIcon className="h-7 w-7 text-purple-600" />
                    Faculty Specialization Matrix
                </h1>

                <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                    {/* --- NEW: Course Suitability Check Dropdown --- */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="courseCheckFilter" className="text-sm font-medium text-gray-700 flex-shrink-0 flex items-center gap-1">
                            <BookOpenIcon className="h-4 w-4 text-gray-500"/>
                            Check Suitability for Course:
                        </label>
                        <select
                            id="courseCheckFilter"
                            name="courseCheckFilter"
                            value={selectedCourseIdForCheck}
                            onChange={(e) => setSelectedCourseIdForCheck(e.target.value)}
                            disabled={isLoadingCourses || allCourses.length === 0}
                            className="block w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5 pl-3 pr-8"
                        >
                            <option value="">-- Select a Course --</option>
                            {allCourses.map(course => (
                                <option key={course.id} value={course.id}>
                                    {course.name} {course.code && `(${course.code})`}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* --- END NEW Dropdown --- */}

                    {/* Filter Section - Changed from Dropdown to Checkboxes */}
                    <div className="flex items-start gap-2"> {/* Changed to items-start for better alignment with multi-line checkboxes */}
                        <label className="text-sm font-medium text-gray-700 flex-shrink-0 flex items-center gap-1 pt-1"> {/* Added pt-1 for alignment */}
                            <FunnelIcon className="h-4 w-4 text-gray-500"/>
                            Filter:
                        </label>
                        {/* Container for Checkboxes - allowing wrap */}
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 max-w-md"> {/* Added max-w-md for better control on wider screens */}
                            {allSpecializations.length > 0 ? (
                                allSpecializations.map(specName => (
                                    <div key={specName} className="flex items-center">
                                        <input
                                            id={`filter-${specName}`}
                                            type="checkbox"
                                            checked={selectedFilterSpecializations.has(specName)}
                                            onChange={(e) => handleFilterChange(specName, e.target.checked)}
                                            className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor={`filter-${specName}`} className="ml-1.5 text-xs text-gray-700">
                                            {specName}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <span className="text-xs text-gray-500 italic">No specializations to filter by.</span>
                            )}
                        </div>
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={handleDownloadCsv}
                        disabled={isDownloading || isLoading}
                        className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                             <>
                                <svg className="animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                                Downloading...
                             </>
                        ) : (
                            <>
                                <ArrowDownTrayIcon className="h-4 w-4" />
                                Download CSV
                            </>
                        )}
                    </button>
                </div>
            </div>
            {/* Download Error Display */}
            {downloadError && (
                 <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded relative flex items-center gap-2 text-sm" role="alert">
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                    <span className="block sm:inline">Error downloading CSV: {downloadError}</span>
                </div>
            )}
            {/* --- End Header Row --- */}
            {/* --- Matrix Table --- */}
            {filteredMatrixData.length === 0 && !isLoading ? (
                 <p className="text-gray-500 italic text-center mt-10 py-5 bg-white rounded-md shadow-sm border border-gray-200">
                    {selectedFilterSpecializations.size > 0
                        ? `No faculty found matching all selected specializations: "${Array.from(selectedFilterSpecializations).join(' & ')}".`
                        : 'No faculty data found or no filters applied.'}
                 </p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-100 z-20">
                                    Faculty Name ({filteredMatrixData.length})
                                </th>
                                {/* *** Uses allSpecializations state correctly *** */}
                                {allSpecializations.map(spec => (
                                    <th key={spec} scope="col" className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                        {spec}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMatrixData.map((faculty) => {
                                const linkedSpecsSet = new Set(faculty.linkedSpecializationNames);
                                return (
                                    <tr key={faculty.userId} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 sticky left-0 bg-white hover:bg-gray-50 z-10">
                                            <button
                                                type="button"
                                                onClick={() => handleFacultyClick(faculty)}
                                                className="flex items-center gap-2 group text-left w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 rounded"
                                                title={`View details for ${faculty.name || 'Unnamed Faculty'}`}
                                            >
                                                <UserCircleIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 flex-shrink-0"/>
                                                <div>
                                                    <span className="group-hover:text-indigo-600 group-hover:font-semibold">{faculty.name || 'Unnamed Faculty'}</span>
                                                    <div className="text-xs text-gray-500">{faculty.email || 'No Email'}</div>
                                                </div>
                                            </button>
                                        </td>
                                        {/* *** Uses allSpecializations state correctly *** */}
                                        {allSpecializations.map(specName => (
                                            <td key={`${faculty.userId}-${specName}`} className="px-3 py-3 text-center">
                                                {(() => {
                                                    const facultyHasThisSpec = linkedSpecsSet.has(specName);
                                                    
                                                    if (selectedCourseIdForCheck && requiredSpecsForSelectedCourse.size > 0) {
                                                        // A course is selected for suitability check
                                                        if (requiredSpecsForSelectedCourse.has(specName)) {
                                                            // This column (specName) IS one of the required specializations for the selected course
                                                            if (facultyHasThisSpec) {
                                                                return <CheckIcon className="h-5 w-5 text-green-500 mx-auto" title={`${faculty.name} has required specialization: ${specName}`} />;
                                                            } else {
                                                                return <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" title={`${faculty.name} is missing required specialization: ${specName}`} />;
                                                            }
                                                        } else {
                                                            // This column (specName) is NOT required by the selected course, show normal status
                                                            return facultyHasThisSpec ? <CheckIcon className="h-5 w-5 text-gray-400 mx-auto" title={`${faculty.name} has specialization: ${specName}`} /> : <span className="text-gray-300">-</span>;
                                                        }
                                                    } else {
                                                        // No course selected for check, show normal status
                                                        return facultyHasThisSpec ? <CheckIcon className="h-5 w-5 text-green-500 mx-auto" title={`${faculty.name} has specialization: ${specName}`} /> : <span className="text-gray-300">-</span>;
                                                    }
                                                })()}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {/* --- Pop-up Component Integration --- */}
            {isPopupOpen && selectedFaculty && ( // Ensure selectedFaculty is also not null
                 (<FacultyMatrixDetailPopup
                    faculty={selectedFaculty}
                    onClose={handleClosePopup}
                    selectedCourseForCheck={selectedCourseDetails} // <-- PASS THE SELECTED COURSE DETAILS
                 />)
            )}
        </div>
    );
}
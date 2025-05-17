// src/app/(protected)/admin/matrix/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { getFacultySpecializationData, generateMatrixCsv } from '@/lib/actions/dashboardActions';
import { getCourses } from '@/lib/courseActions';
import { TableCellsIcon, ExclamationTriangleIcon, UserCircleIcon, FunnelIcon, ArrowDownTrayIcon, BookOpenIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FacultyMatrixDetailPopup from '@/components/admin/FacultyMatrixDetailPopup';
import type { FacultyLinkedSpecialization } from '@/types';
import type { Course, Specialization } from '@/generated/prisma/client';

export default function AdminMatrixPage() {
    // --- State Declarations ---
    const [matrixData, setMatrixData] = useState<FacultyLinkedSpecialization[]>([]);
    const [allSpecializations, setAllSpecializations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyLinkedSpecialization | null>(null);
    const [selectedFilterSpecializations, setSelectedFilterSpecializations] = useState<Set<string>>(new Set());
    const [isDownloading, startDownloadTransition] = useTransition();
    const [downloadError, setDownloadError] = useState<string | null>(null);
    const [allCourses, setAllCourses] = useState<(Course & { requiredSpecializations: Pick<Specialization, 'id' | 'name'>[] })[]>([]);
    const [selectedCourseIdForCheck, setSelectedCourseIdForCheck] = useState<string>('');
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setIsLoadingCourses(true);
        setError(null);
        setDownloadError(null);

        Promise.all([
            getFacultySpecializationData(),
            getCourses()
        ]).then(([matrixResponse, coursesResponse]) => {
            if (matrixResponse.success && matrixResponse.data && matrixResponse.allSpecializationNames) {
                setMatrixData(matrixResponse.data);
                setAllSpecializations(matrixResponse.allSpecializationNames);
            } else {
                setError(prev => prev ? `${prev}\n${matrixResponse.error || 'Failed to load matrix data.'}` : (matrixResponse.error || 'Failed to load matrix data.'));
                setMatrixData([]);
                setAllSpecializations([]);
            }
            if (coursesResponse.success && coursesResponse.courses) {
                const processedCourses = coursesResponse.courses.map(course => ({
                    ...course,
                    requiredSpecializations: course.requiredSpecializations || [],
                }));
                setAllCourses(processedCourses);
            } else {
                setError(prev => prev ? `${prev}\n${coursesResponse.error || 'Failed to load courses.'}` : (coursesResponse.error || 'Failed to load courses.'));
                setAllCourses([]);
            }
        }).catch(err => {
            console.error("Error fetching page data:", err);
            setError('An unexpected error occurred while loading page data.');
        }).finally(() => {
            setIsLoading(false);
            setIsLoadingCourses(false);
        });
    }, []);

    const filteredMatrixData = useMemo(() => {
        if (selectedFilterSpecializations.size === 0) return matrixData;
        return matrixData.filter(faculty =>
            Array.from(selectedFilterSpecializations).every(selSpec =>
                faculty.linkedSpecializationNames.includes(selSpec)
            )
        );
    }, [matrixData, selectedFilterSpecializations]);

    const handleFilterChange = (specializationName: string, isChecked: boolean) => {
        setSelectedFilterSpecializations(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (isChecked) newSelected.add(specializationName);
            else newSelected.delete(specializationName);
            return newSelected;
        });
    };

    const handleFacultyClick = (faculty: FacultyLinkedSpecialization) => {
        setSelectedFaculty(faculty);
        setIsPopupOpen(true);
    };
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedFaculty(null);
    };

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
        return new Set(selectedCourseDetails.requiredSpecializations.map(spec => spec.name));
    }, [selectedCourseDetails]);

    if (isLoading) {
        return (
            <div className="p-6 bg-spc-blue-lighter min-h-screen flex items-center justify-center">
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

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen relative">
            <div className="mb-6 md:flex md:items-center md:justify-between gap-4 flex-wrap">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4 md:mb-0 flex-shrink-0">
                    <TableCellsIcon className="h-7 w-7 text-purple-600" />
                    Faculty Specialization Matrix
                </h1>
                <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                    <div className="flex items-center gap-2">
                        <label htmlFor="courseCheckFilter" className="text-sm font-medium text-gray-700 flex-shrink-0 flex items-center gap-1">
                            <BookOpenIcon className="h-4 w-4 text-gray-500" />
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
                    <div className="flex items-start gap-2">
                        <label className="text-sm font-medium text-gray-700 flex-shrink-0 flex items-center gap-1 pt-1">
                            <FunnelIcon className="h-4 w-4 text-gray-500" />
                            Filter:
                        </label>
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 max-w-md">
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
                    <button
                        onClick={handleDownloadCsv}
                        disabled={isDownloading || isLoading}
                        className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <><svg className="animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> Downloading...</>
                        ) : (
                            <><ArrowDownTrayIcon className="h-4 w-4" />Download CSV</>
                        )}
                    </button>
                </div>
            </div>
            {downloadError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded relative flex items-center gap-2 text-sm" role="alert">
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                    <span className="block sm:inline">Error downloading CSV: {downloadError}</span>
                </div>
            )}
            {filteredMatrixData.length === 0 && !isLoading ? (
                <p className="text-gray-500 italic text-center mt-10 py-5 bg-white rounded-md shadow-sm border border-gray-200">
                    {selectedFilterSpecializations.size > 0
                        ? `No faculty found matching all selected specializations: "${Array.from(selectedFilterSpecializations).join(' & ')}".`
                        : 'No faculty data found or no filters applied.'}
                </p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-300">
                    <table className="min-w-full">
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider sticky left-0 bg-spc-blue-darker z-20 border-r border-white/20">
                                    Faculty Name ({filteredMatrixData.length})
                                </th>
                                {allSpecializations.map((spec, index) => (
                                    <th key={spec} scope="col" 
                                        className={`px-3 py-3 text-center text-xs font-semibold text-white bg-spc-blue-darker uppercase tracking-wider whitespace-nowrap 
                                                   ${index < allSpecializations.length - 1 ? 'border-r border-white/20' : ''}`}>
                                        {spec}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredMatrixData.map((faculty, facultyIndex) => {
                                const linkedSpecsSet = new Set(faculty.linkedSpecializationNames);
                                return (
                                    <tr key={faculty.userId} 
                                        className={`hover:bg-sky-50 transition-colors duration-150 ease-in-out ${facultyIndex < filteredMatrixData.length -1 ? 'border-b border-gray-300' : ''}`}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 sticky left-0 bg-white hover:bg-sky-50 z-10 border-r border-gray-300">
                                            <button
                                                type="button"
                                                onClick={() => handleFacultyClick(faculty)}
                                                className="flex items-center gap-2 group text-left w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:ring-offset-1 rounded"
                                                title={`View details for ${faculty.name || 'Unnamed Faculty'}`}
                                            >
                                                <UserCircleIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
                                                <div>
                                                    <span className="group-hover:text-indigo-600 group-hover:font-semibold">{faculty.name || 'Unnamed Faculty'}</span>
                                                    <div className="text-xs text-gray-500">{faculty.email || 'No Email'}</div>
                                                </div>
                                            </button>
                                        </td>
                                        {allSpecializations.map((specName, specIndex) => (
                                            <td key={`${faculty.userId}-${specName}`} 
                                                className={`px-3 py-3 text-center ${specIndex < allSpecializations.length - 1 ? 'border-r border-gray-300' : ''}`}>
                                                {(() => {
                                                    const facultyHasThisSpec = linkedSpecsSet.has(specName);
                                                    // --- ICON SIZE AND COLOR ADJUSTMENTS ---
                                                    const iconSize = "h-6 w-6"; // Increased size
                                                    const greenColor = "text-green-500"; // Standard green
                                                    const redColor = "text-red-500";     // Standard red
                                                    const grayColor = "text-gray-400";   // Lighter gray for less emphasis

                                                    if (selectedCourseIdForCheck && requiredSpecsForSelectedCourse.size > 0) {
                                                        if (requiredSpecsForSelectedCourse.has(specName)) {
                                                            return facultyHasThisSpec ?
                                                                <CheckIcon className={`${iconSize} ${greenColor} mx-auto font-bold`} title={`${faculty.name} has required specialization: ${specName}`} /> : // Added font-bold for CheckIcon
                                                                <XMarkIcon className={`${iconSize} ${redColor} mx-auto font-bold`} title={`${faculty.name} is missing required specialization: ${specName}`} />; // Added font-bold for XMarkIcon
                                                        } else {
                                                            return facultyHasThisSpec ? <CheckIcon className={`${iconSize} ${grayColor} mx-auto`} title={`${faculty.name} has specialization: ${specName} (not required for selected course)`} /> : <span className="text-gray-300 text-lg">-</span>; // Made dash larger
                                                        }
                                                    } else {
                                                        return facultyHasThisSpec ? <CheckIcon className={`${iconSize} ${greenColor} mx-auto font-bold`} title={`${faculty.name} has specialization: ${specName}`} /> : <span className="text-gray-300 text-lg">-</span>; // Made dash larger
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
            {isPopupOpen && selectedFaculty && (
                <FacultyMatrixDetailPopup
                    faculty={selectedFaculty}
                    onClose={handleClosePopup}
                    selectedCourseForCheck={selectedCourseDetails}
                />
            )}
        </div>
    );
}
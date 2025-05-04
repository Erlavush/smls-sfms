// src/app/(protected)/admin/matrix/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { getFacultySpecializationData } from '@/lib/actions/dashboardActions'; // Import the server action
import { TableCellsIcon, ExclamationTriangleIcon, UserCircleIcon, FunnelIcon } from '@heroicons/react/24/outline'; // Added FunnelIcon
// --- Import the actual Popup Component ---
import FacultyMatrixDetailPopup from '@/components/admin/FacultyMatrixDetailPopup'; // Changed import
// --- Import the CORRECT type for the new data structure ---
import type { FacultyLinkedSpecialization } from '@/types';

export default function AdminMatrixPage() {
    // --- State Declarations (Ensure no duplicates) ---
    const [matrixData, setMatrixData] = useState<FacultyLinkedSpecialization[]>([]); // <-- Use new type
    const [allSpecializations, setAllSpecializations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyLinkedSpecialization | null>(null); // <-- Use new type

    // --- State for Filtering ---
    const [filterSpecialization, setFilterSpecialization] = useState<string>(''); // Empty string = show all

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        getFacultySpecializationData()
            .then(response => {
                if (response.success && response.data) {
                    setMatrixData(response.data);
                    // --- Adjust logic to extract unique specializations from the new structure ---
                    const uniqueSpecializations = new Set<string>();
                    response.data.forEach(faculty => {
                        // Iterate over the array of linked names
                        faculty.linkedSpecializationNames.forEach(specName => {
                            uniqueSpecializations.add(specName); // <-- Fix: Use specName here
                        });
                    });
                    setAllSpecializations(Array.from(uniqueSpecializations).sort());
                } else {
                    setError(response.error || 'Failed to load specialization data.');
                    setMatrixData([]);
                    setAllSpecializations([]);
                }
            })
            .catch(err => {
                setError('An unexpected error occurred while loading the matrix.');
                setMatrixData([]);
                setAllSpecializations([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // --- Filtering Logic ---
    // Use useMemo to recalculate filtered data only when matrixData or filter changes
    const filteredMatrixData = useMemo(() => {
        if (!filterSpecialization) {
            return matrixData; // No filter applied
        }
        // --- Adjust filter logic for the new structure ---
        return matrixData.filter(faculty =>
            // Check if the linkedSpecializationNames array includes the filter value
            faculty.linkedSpecializationNames.includes(filterSpecialization)
        );
    }, [matrixData, filterSpecialization]); // Dependencies for recalculation

    const handleFacultyClick = (faculty: FacultyLinkedSpecialization) => { // <-- Fix: Use correct type here
        setSelectedFaculty(faculty);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedFaculty(null);
    };

    // --- Loading State ---
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                 <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        {/* ... svg paths ... */}
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
        // Ensure this div closes correctly at the very end
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen relative">
            {/* --- Header and Filter Row --- */}
            <div className="mb-6 md:flex md:items-center md:justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4 md:mb-0 flex-shrink-0">
                    <TableCellsIcon className="h-7 w-7 text-purple-600" />
                    Faculty Specialization Matrix
                </h1>
                {/* --- Filter Dropdown --- */}
                <div className="flex items-center gap-2">
                     <label htmlFor="specFilter" className="text-sm font-medium text-gray-700 flex-shrink-0 flex items-center gap-1">
                        <FunnelIcon className="h-4 w-4 text-gray-500"/>
                        Filter by Specialization:
                    </label>
                    <select
                        id="specFilter"
                        name="specFilter"
                        value={filterSpecialization}
                        onChange={(e) => setFilterSpecialization(e.target.value)}
                        className="block w-full md:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5 pl-3 pr-8" // Added padding
                    >
                        <option value="">-- All Specializations --</option>
                        {allSpecializations.map(spec => (
                            <option key={spec} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>
                 {/* --- End Filter Dropdown --- */}
            </div>
            {/* --- End Header and Filter Row --- */}


            {/* --- Matrix Table --- */}
            {/* Check filtered data length */}
            {filteredMatrixData.length === 0 && !isLoading ? (
                 <p className="text-gray-500 italic text-center mt-10">
                    {filterSpecialization ? `No faculty found with specialization: "${filterSpecialization}".` : 'No faculty data found.'}
                 </p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-gray-100 z-20">
                                    Faculty Name ({filteredMatrixData.length}) {/* Show count */}
                                </th>
                                {allSpecializations.map(spec => (
                                    <th key={spec} scope="col" className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                        {spec}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Use filteredMatrixData for rendering rows */}
                            {filteredMatrixData.map((faculty) => (
                                <tr key={faculty.userId} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 sticky left-0 bg-white hover:bg-gray-50 z-10">
                                        <button
                                            type="button" // <-- Pass the correct type here
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
                                    {allSpecializations.map(spec => (
                                        // --- Adjust rendering logic for the new structure ---
                                        <td key={`${faculty.userId}-${spec}`} className="px-3 py-3 text-center">
                                            {faculty.linkedSpecializationNames.includes(spec) ? ( // Check if the name exists in the array
                                                <span className="text-green-600" title={`${faculty.name} has specialization: ${spec}`}>✔️</span>
                                            ) : (
                                                <span className="text-gray-300">-</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- Pop-up Component Integration --- */}
            {isPopupOpen && (
                 <FacultyMatrixDetailPopup
                    faculty={selectedFaculty}
                    onClose={handleClosePopup}
                 />
            )}
            {/* --- End Pop-up --- */}

        </div>
    );
}
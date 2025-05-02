// src/app/(protected)/admin/faculty/page.tsx
'use client';

import React, { useState, useEffect, useTransition, FormEvent, useRef } from 'react'; // Added useTransition, FormEvent, useRef
import Link from 'next/link';
import { getAllFaculty, createFacultyUser } from '@/lib/adminActions'; // Import createFacultyUser action
import {
    UserGroupIcon, EnvelopeIcon, CalendarDaysIcon, ArrowRightIcon, ExclamationTriangleIcon,
    PlusIcon, // Added PlusIcon
    XMarkIcon // Added XMarkIcon for closing modal
} from '@heroicons/react/24/outline';

// Define the type for a faculty member in the list
interface FacultyMember {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
}

// Helper to format date
const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch (e) { return 'Invalid Date'; }
};

export default function AdminFacultyListPage() {
    const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition(); // For server action loading state

    // --- State for Add Faculty Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);
    const [modalSuccess, setModalSuccess] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null); // Ref to reset the form

    // --- Fetch Faculty List ---
    const fetchFaculty = () => {
        setIsLoading(true);
        setError(null);
        getAllFaculty()
            .then(result => {
                if (result.success) {
                    setFacultyList(result.faculty || []);
                } else {
                    setError(result.error || 'Failed to load faculty list.');
                    setFacultyList([]);
                }
            })
            .catch(err => {
                console.error("Faculty list fetch error:", err);
                setError("An unexpected error occurred while fetching faculty.");
                setFacultyList([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchFaculty();
    }, []);

    // --- Modal Handlers ---
    const openModal = () => {
        setModalError(null); // Clear previous errors/success messages
        setModalSuccess(null);
        formRef.current?.reset(); // Reset form fields when opening
        setIsModalOpen(true);
    };
    const closeModal = () => {
        if (isPending) return; // Don't close while submitting
        setIsModalOpen(false);
        setModalError(null);
        setModalSuccess(null);
    };

    // --- Form Submission Handler ---
    const handleAddFacultySubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setModalError(null);
        setModalSuccess(null);

        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const result = await createFacultyUser(formData);
            if (result.success) {
                setModalSuccess(`Faculty user ${result.user?.email} created successfully!`);
                formRef.current?.reset(); // Reset form on success
                // Optionally close modal after a delay or keep it open to add more
                // closeModal();
                fetchFaculty(); // Refresh the faculty list in the background
            } else {
                setModalError(result.error || 'Failed to add faculty user.');
            }
        });
    };

    // --- Input/Label Classes for Modal Form ---
    const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-70";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <UserGroupIcon className="h-7 w-7 text-blue-600" />
                    Faculty Management
                </h1>
                {/* --- Add Faculty Button --- */}
                <button
                    onClick={openModal}
                    disabled={isPending} // Disable button if modal action is pending
                    className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Faculty
                </button>
            </div>

            {/* --- Loading and Error Display for List --- */}
            {isLoading && (
                 <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading faculty list...</span>
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2 mb-4" role="alert">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {/* --- Faculty List Table/UL --- */}
            {!isLoading && !error && (
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                    <ul role="list" className="divide-y divide-gray-200">
                        {/* ... (mapping facultyList remains the same) ... */}
                        {facultyList.length === 0 ? (
                            <li className="px-6 py-4 text-center text-gray-500 italic">No faculty members found.</li>
                        ) : (
                            facultyList.map((faculty) => (
                                <li key={faculty.id}>
                                    <Link href={`/admin/faculty/${faculty.id}`} className="block hover:bg-gray-50 transition duration-150 ease-in-out group"> {/* Added group class */}
                                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-indigo-600 truncate group-hover:text-indigo-700"> {/* Added group-hover effect */}
                                                    {faculty.name || 'Unnamed Faculty'}
                                                </p>
                                                <div className="mt-1 flex items-center text-xs text-gray-500 gap-x-3 gap-y-1 flex-wrap">
                                                    <p className="flex items-center gap-1 truncate">
                                                        <EnvelopeIcon className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                                                        {faculty.email || 'No Email'}
                                                    </p>
                                                    <p className="flex items-center gap-1">
                                                        <CalendarDaysIcon className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                                                        Joined: {formatDate(faculty.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                {/* Make arrow more prominent on hover */}
                                                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}

            {/* --- Add Faculty Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800" id="modal-title">Add New Faculty Member</h2>
                            <button
                                onClick={closeModal}
                                disabled={isPending}
                                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                                aria-label="Close modal"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form ref={formRef} onSubmit={handleAddFacultySubmit} className="space-y-4">
                            {/* Name Input (Optional) */}
                            <div>
                                <label htmlFor="faculty-name" className={labelClass}>Full Name (Optional)</label>
                                <input type="text" id="faculty-name" name="name" className={inputClass} placeholder="e.g., Juan Dela Cruz" disabled={isPending} />
                            </div>
                            {/* Email Input (Required) */}
                            <div>
                                <label htmlFor="faculty-email" className={labelClass}>Email Address*</label>
                                <input type="email" id="faculty-email" name="email" className={inputClass} placeholder="faculty@spcdavao.edu.ph" required disabled={isPending} />
                            </div>
                            {/* Password Input (Required) */}
                            <div>
                                <label htmlFor="faculty-password" className={labelClass}>Initial Password*</label>
                                <input type="password" id="faculty-password" name="password" className={inputClass} placeholder="Min. 8 characters" required minLength={8} disabled={isPending} />
                                <p className="text-xs text-gray-500 mt-1">Faculty member should change this upon first login.</p>
                            </div>

                            {/* Modal Error/Success Messages */}
                            {modalError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert">
                                    <ExclamationTriangleIcon className="h-4 w-4" /> {modalError}
                                </div>
                            )}
                            {modalSuccess && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm" role="alert">
                                    {modalSuccess}
                                </div>
                            )}

                            {/* Modal Footer Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
                                <button
                                    type="button" // Important: type="button" to prevent form submission
                                    onClick={closeModal}
                                    disabled={isPending}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
                                >
                                    {isPending ? (
                                        <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
                                        Adding...
                                        </>
                                    ) : (
                                        'Add Faculty'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
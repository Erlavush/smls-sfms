// src/app/(protected)/admin/faculty/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useTransition, FormEvent, useRef } from 'react';
import Link from 'next/link';
import { getAllFaculty, createFacultyUser } from '@/lib/actions/facultyActions';
import {
    UserGroupIcon, EnvelopeIcon, CalendarDaysIcon, ArrowRightIcon, ExclamationTriangleIcon,
    PlusIcon, XMarkIcon, UserCircleIcon as UserAvatarIcon,
    MagnifyingGlassIcon // Added for Search
} from '@heroicons/react/24/outline';

interface FacultyMember {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
}

const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch (e) { return 'Invalid Date'; }
};

export default function AdminFacultyListPage() {
    const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);
    const [modalSuccess, setModalSuccess] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // --- State for Search Functionality ---
    const [searchTerm, setSearchTerm] = useState('');

    const fetchFaculty = () => {
        setIsLoading(true);
        setError(null);
        getAllFaculty()
            .then(result => {
                if (result.success) setFacultyList(result.faculty || []);
                else { setError(result.error || 'Failed to load faculty list.'); setFacultyList([]); }
            })
            .catch(err => {
                setError("An unexpected error occurred."); setFacultyList([]);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => { fetchFaculty(); }, []);

    const openModal = () => {
        setModalError(null); setModalSuccess(null);
        formRef.current?.reset(); setIsModalOpen(true);
    };
    const closeModal = () => {
        if (isPending) return;
        setIsModalOpen(false); setModalError(null); setModalSuccess(null);
    };

    const handleAddFacultySubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setModalError(null); setModalSuccess(null);
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
            const result = await createFacultyUser(formData);
            if (result.success) {
                setModalSuccess(`Faculty user ${result.user?.email} created!`);
                formRef.current?.reset();
                fetchFaculty();
            } else {
                setModalError(result.error || 'Failed to add faculty.');
            }
        });
    };

    // --- Filtered Faculty List based on Search Term ---
    const filteredFacultyList = useMemo(() => {
        if (!searchTerm.trim()) {
            return facultyList; // Return all if search is empty
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return facultyList.filter(faculty =>
            (faculty.name?.toLowerCase().includes(lowercasedSearchTerm)) ||
            (faculty.email?.toLowerCase().includes(lowercasedSearchTerm))
        );
    }, [facultyList, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-spc-blue-main focus:ring-spc-blue-main sm:text-sm disabled:opacity-70";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            {/* Header: Title, Search, and Add Button */}
            <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-spc-blue-darker flex items-center gap-3 flex-shrink-0">
                    <UserGroupIcon className="h-8 w-8 text-spc-blue-main" />
                    Faculty Management
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-auto sm:flex-grow max-w-md">
                        <label htmlFor="faculty-search" className="sr-only">Search Faculty</label>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="search" // Using type="search" gives a clear 'x' button in some browsers
                            name="faculty-search"
                            id="faculty-search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 shadow-sm focus:border-spc-blue-main focus:ring-1 focus:ring-spc-blue-main"
                            placeholder="Search by name or email..."
                        />
                    </div>

                    {/* Add Faculty Button */}
                    <button
                        onClick={openModal}
                        disabled={isPending}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-spc-blue-main px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-spc-blue-darker focus:outline-none focus:ring-2 focus:ring-spc-blue-light focus:ring-offset-2 focus:ring-offset-spc-blue-lighter disabled:opacity-60 transition-all duration-150 ease-in-out transform hover:scale-105 flex-shrink-0"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add New Faculty
                    </button>
                </div>
            </div>

            {isLoading && (
                 <div className="flex items-center justify-center py-10 gap-3 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Loading faculty list...</span>
                </div>
            )}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-center gap-3 mb-6" role="alert">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div> <p className="font-bold">Error</p> <p>{error}</p> </div>
                </div>
            )}

            {!isLoading && !error && (
                <div className="space-y-4">
                    {filteredFacultyList.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl shadow-lg border border-gray-200">
                            <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-xl font-semibold text-gray-500">
                                {searchTerm ? 'No faculty members match your search.' : 'No faculty members found.'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                {searchTerm ? 'Try a different search term or clear the search.' : 'Click "Add New Faculty" to get started.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredFacultyList.map((faculty) => ( // Use filteredFacultyList here
                                <Link
                                    key={faculty.id}
                                    href={`/admin/faculty/${faculty.id}`}
                                    className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-200/80 hover:border-spc-blue-main/50
                                               transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
                                >
                                    <div className="p-5">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-spc-blue-lighter flex items-center justify-center text-spc-blue-main text-xl font-semibold ring-2 ring-spc-blue-light/50 group-hover:ring-spc-blue-main transition-all">
                                                {faculty.name ? faculty.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() : <UserAvatarIcon className="h-6 w-6" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-semibold text-spc-blue-darker truncate group-hover:text-spc-blue-main transition-colors">
                                                    {faculty.name || 'Unnamed Faculty'}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate flex items-center gap-1 group-hover:text-spc-blue-light transition-colors">
                                                    <EnvelopeIcon className="h-3.5 w-3.5" />
                                                    {faculty.email || 'No Email'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between items-center">
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <CalendarDaysIcon className="h-3.5 w-3.5" />
                                                Joined: {formatDate(faculty.createdAt)}
                                            </p>
                                            <ArrowRightIcon className="h-5 w-5 text-gray-300 group-hover:text-spc-blue-main group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-scale">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all flex flex-col">
                        <div className="flex justify-between items-center p-5 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-spc-blue-darker flex items-center gap-2" id="modal-title">
                                <UserAvatarIcon className="h-6 w-6 text-spc-blue-main" /> Add New Faculty
                            </h2>
                            <button onClick={closeModal} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50 transition-colors" aria-label="Close modal" > <XMarkIcon className="h-5 w-5" /> </button>
                        </div>
                        <form ref={formRef} onSubmit={handleAddFacultySubmit} className="p-5 space-y-4 overflow-y-auto max-h-[70vh]">
                            <div> <label htmlFor="faculty-name" className={labelClass}>Full Name (Optional)</label> <input type="text" id="faculty-name" name="name" className={inputClass} placeholder="e.g., Dr. Juan Dela Cruz" disabled={isPending} /> </div>
                            <div> <label htmlFor="faculty-email" className={labelClass}>Email Address*</label> <input type="email" id="faculty-email" name="email" className={inputClass} placeholder="faculty@spcdavao.edu.ph" required disabled={isPending} /> </div>
                            <div> <label htmlFor="faculty-password" className={labelClass}>Initial Password*</label> <input type="password" id="faculty-password" name="password" className={inputClass} placeholder="Min. 8 characters" required minLength={8} disabled={isPending} /> <p className="text-xs text-gray-500 mt-1">Faculty member should change this upon first login.</p> </div>
                            {modalError && ( <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"> <ExclamationTriangleIcon className="h-5 w-5" /> {modalError} </div> )}
                            {modalSuccess && ( <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-md text-sm" role="alert"> {modalSuccess} </div> )}
                            <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
                                <button type="button" onClick={closeModal} disabled={isPending} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50 transition-colors"> Cancel </button>
                                <button type="submit" disabled={isPending} className="inline-flex items-center justify-center rounded-lg bg-spc-blue-main px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-spc-blue-darker focus:outline-none focus:ring-2 focus:ring-spc-blue-light focus:ring-offset-2 disabled:opacity-60 transition-colors" > {isPending ? ( <><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Adding...</> ) : ( <><PlusIcon className="h-4 w-4 mr-1.5" />Add Faculty</> )} </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
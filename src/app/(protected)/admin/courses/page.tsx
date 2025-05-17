// src/app/(protected)/admin/courses/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useTransition, FormEvent, useRef } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/lib/courseActions';
import { getSpecializations } from '@/lib/actions/specializationActions';
import type { Course, Specialization } from '@/generated/prisma/client';
import {
    BookOpenIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon,
    ExclamationTriangleIcon, TagIcon, CheckCircleIcon,
    MagnifyingGlassIcon // Added for Search
} from '@heroicons/react/24/outline';

type CourseWithSpecs = Course & {
    requiredSpecializations?: Pick<Specialization, 'id' | 'name'>[];
};

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<CourseWithSpecs[]>([]);
    const [allSpecializations, setAllSpecializations] = useState<Specialization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentCourse, setCurrentCourse] = useState<CourseWithSpecs | null>(null);
    const [modalError, setModalError] = useState<string | null>(null);
    const [modalSuccess, setModalSuccess] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedSpecIds, setSelectedSpecIds] = useState<Set<string>>(new Set());
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deletingCourse, setDeletingCourse] = useState<CourseWithSpecs | null>(null);

    // --- State for Search Functionality ---
    const [searchTerm, setSearchTerm] = useState('');
    // Note: 'modalError' is used for both add/edit modal, and general 'error' for list fetching.
    // If delete fails, its error is currently set to the main 'error' state. We can make a specific 'deleteModalError' if needed.

    const fetchPageData = async () => {
        if(!isPending) setIsLoading(true); // Only set loading if not already in a CUD transition
        setError(null);
        // Clear modal-specific success/error states on main data refresh
        setModalError(null); setModalSuccess(null);
        try {
            const [coursesRes, specsRes] = await Promise.all([getCourses(), getSpecializations()]);
            if (coursesRes.success && coursesRes.courses) setCourses(coursesRes.courses);
            else { setError(coursesRes.error || 'Failed to load courses.'); setCourses([]); }
            if (specsRes.success && specsRes.specializations) setAllSpecializations(specsRes.specializations);
            else { setError(prev => prev ? `${prev}, ${specsRes.error || 'FS'}` : (specsRes.error || 'FS')); setAllSpecializations([]); }
        } catch (err) { setError('An unexpected error occurred.'); setCourses([]); setAllSpecializations([]); }
        finally { if(!isPending) setIsLoading(false); }
    };

    useEffect(() => { fetchPageData(); }, []);

    const openModal = (mode: 'add' | 'edit', course?: CourseWithSpecs) => {
        setModalMode(mode); setCurrentCourse(course || null);
        setSelectedSpecIds(course ? new Set(course.requiredSpecializations?.map(s => s.id) || []) : new Set());
        setModalError(null); setModalSuccess(null);
        formRef.current?.reset();
        if (mode === 'edit' && course && formRef.current) {
            (formRef.current.elements.namedItem('name') as HTMLInputElement).value = course.name;
            (formRef.current.elements.namedItem('code') as HTMLInputElement).value = course.code || '';
            (formRef.current.elements.namedItem('description') as HTMLInputElement).value = course.description || '';
        }
        setIsModalOpen(true);
    };
    const closeModal = () => { if (isPending) return; setIsModalOpen(false); setCurrentCourse(null); setModalError(null); setModalSuccess(null); setSelectedSpecIds(new Set()); };
    const handleSpecSelectionChange = (specId: string) => { setSelectedSpecIds(prev => { const newSet = new Set(prev); if (newSet.has(specId)) newSet.delete(specId); else newSet.add(specId); return newSet; }); };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); setModalError(null); setModalSuccess(null);
        const formData = new FormData(event.currentTarget);
        formData.append('specializationIds', JSON.stringify(Array.from(selectedSpecIds)));
        startTransition(async () => {
            setIsLoading(true); // Show loading indicator for list refresh
            let result;
            if (modalMode === 'add') result = await createCourse(formData);
            else if (currentCourse) result = await updateCourse(currentCourse.id, formData);
            else { setModalError("Action error."); setIsLoading(false); return; }

            if (result.success) {
                setModalSuccess(`Course ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
                fetchPageData();
                if (modalMode === 'add') { formRef.current?.reset(); setSelectedSpecIds(new Set()); }
                else { setTimeout(() => closeModal(), 1500); } // Close edit modal after success
            } else {
                setModalError(result.error || `Failed to ${modalMode} course.`);
                setIsLoading(false);
            }
        });
    };

    const openDeleteConfirm = (course: CourseWithSpecs) => { setDeletingCourse(course); setError(null); setIsDeleteConfirmOpen(true); };
    const closeDeleteConfirm = () => { if (isPending) return; setIsDeleteConfirmOpen(false); setDeletingCourse(null); };
    const handleDelete = async () => {
        if (!deletingCourse) return;
        setError(null); // Clear main page error before delete attempt
        startTransition(async () => {
            setIsLoading(true);
            const result = await deleteCourse(deletingCourse.id);
            if (result.success) {
                // Use modalSuccess for delete confirmation, not main 'error'
                setModalSuccess('Course deleted successfully!'); // Show success on main page
                fetchPageData();
                closeDeleteConfirm();
            } else {
                // If delete fails, show error on main page.
                setError(result.error || 'Failed to delete course.');
                setIsLoading(false);
                closeDeleteConfirm();
            }
        });
    };

    // --- Filtered Courses List based on Search Term ---
    const filteredCourses = useMemo(() => {
        if (!searchTerm.trim()) {
            return courses; // Return all if search is empty
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return courses.filter(course =>
            (course.name.toLowerCase().includes(lowercasedSearchTerm)) ||
            (course.code?.toLowerCase().includes(lowercasedSearchTerm))
        );
    }, [courses, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const inputClass = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-spc-blue-main focus:ring-1 focus:ring-spc-blue-main sm:text-sm disabled:opacity-70 bg-white py-2.5 px-3.5";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
    const modalButtonBase = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spc-blue-lighter disabled:opacity-60 transition-all duration-150 ease-in-out transform hover:scale-105";

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            {/* Header: Title, Search, and Add Button */}
            <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-spc-blue-darker flex items-center gap-3 flex-shrink-0">
                    <BookOpenIcon className="h-8 w-8 text-spc-blue-main" />
                    Manage Courses
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-auto sm:flex-grow max-w-md">
                        <label htmlFor="course-search" className="sr-only">Search Courses</label>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="search"
                            name="course-search"
                            id="course-search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 shadow-sm focus:border-spc-blue-main focus:ring-1 focus:ring-spc-blue-main"
                            placeholder="Search by name or code..."
                        />
                    </div>
                    <button
                        onClick={() => openModal('add')}
                        disabled={isPending}
                        className={`${modalButtonBase} bg-spc-blue-main text-white hover:bg-spc-blue-darker focus:ring-spc-blue-light w-full sm:w-auto flex-shrink-0`}
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add New Course
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-10 gap-3 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>{isPending ? 'Processing...' : 'Loading courses...'}</span>
                </div>
            )}
            {error && !isLoading && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-center gap-3 mb-6" role="alert">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div><p className="font-bold">Error</p><p>{error}</p></div>
                </div>
            )}
            {modalSuccess && !isModalOpen && !isDeleteConfirmOpen && ( // Show delete success on main page
                <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md shadow-sm flex items-center gap-2 text-sm" role="alert">
                    <CheckCircleIcon className="h-5 w-5"/> {modalSuccess}
                </div>
            )}

            {!isLoading && !error && (
                 <div className="bg-white shadow-xl overflow-hidden rounded-xl border border-gray-200/80">
                    {filteredCourses.length === 0 ? ( // Use filteredCourses here
                        <div className="p-10 text-center text-gray-500">
                            <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-xl font-semibold">
                                {searchTerm ? 'No courses match your search.' : 'No courses defined yet.'}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                {searchTerm ? 'Try a different search term.' : 'Click "Add New Course" to create one.'}
                            </p>
                        </div>
                    ) : (
                        <ul role="list" className="divide-y divide-gray-200">
                            {filteredCourses.map((course) => ( // Use filteredCourses here
                                <li key={course.id} className="px-5 py-4 sm:px-6 group hover:bg-sky-50/50 transition-colors duration-150">
                                    <div className="flex items-center justify-between gap-x-4 gap-y-2"> {/* Adjusted gap */}
                                        <div className="flex-1 min-w-0">
                                            {/* Course Name with Highlight */}
                                            <div className="flex items-baseline gap-x-2 mb-1.5"> {/* Container for name and code */}
                                                <span className="inline-block bg-spc-blue-main text-white text-sm font-semibold px-3 py-1 rounded-md shadow group-hover:bg-spc-blue-darker transition-colors">
                                                    {course.name}
                                                </span>
                                                {course.code && (
                                                    <span className="text-xs text-gray-400 font-normal self-end pb-0.5">
                                                        ({course.code})
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {course.description && (
                                                <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-600 leading-relaxed">
                                                    {course.description}
                                                </p>
                                            )}
                                            {course.requiredSpecializations && course.requiredSpecializations.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    <span className="text-xs font-medium text-gray-400 mr-1 self-center">Requires:</span>
                                                    {course.requiredSpecializations.map((spec) => (
                                                        <span key={spec.id} className="text-xs inline-flex items-center rounded-full bg-spc-blue-lighter px-2.5 py-1 font-medium text-spc-blue-darker ring-1 ring-inset ring-spc-blue-main/20">
                                                            <TagIcon className="h-3 w-3 mr-1 text-spc-blue-main/70"/>{spec.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-shrink-0 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button onClick={() => openModal('edit', course)} disabled={isPending} className="p-2 rounded-full text-spc-blue-main hover:bg-spc-blue-lighter focus:outline-none focus:ring-2 focus:ring-spc-blue-light focus:ring-offset-1 disabled:opacity-50 transition-colors" title={`Edit ${course.name}`}> <PencilIcon className="h-4 w-4" /> </button>
                                            <button onClick={() => openDeleteConfirm(course)} disabled={isPending} className="p-2 rounded-full text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 disabled:opacity-50 transition-colors" title={`Delete ${course.name}`}> <TrashIcon className="h-4 w-4" /> </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {(isModalOpen || isDeleteConfirmOpen) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in-scale">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all flex flex-col max-h-[90vh]">
                        {isModalOpen && ( /* Add/Edit Modal Content */
                            <>
                                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-spc-blue-darker flex items-center gap-2" id="course-modal-title">
                                        {modalMode === 'add' ? <PlusIcon className="h-6 w-6 text-spc-blue-main"/> : <PencilIcon className="h-6 w-6 text-spc-blue-main"/>}
                                        {modalMode === 'add' ? 'Add New Course' : `Edit Course: ${currentCourse?.name}`}
                                    </h2>
                                    <button onClick={closeModal} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50" aria-label="Close modal"><XMarkIcon className="h-5 w-5" /></button>
                                </div>
                                <form ref={formRef} onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
                                    <div> <label htmlFor="course-name" className={labelClass}>Course Name*</label> <input type="text" id="course-name" name="name" defaultValue={currentCourse?.name || ''} className={inputClass} required disabled={isPending} placeholder="e.g., Clinical Hematology I"/> </div>
                                    <div> <label htmlFor="course-code" className={labelClass}>Course Code (Optional)</label> <input type="text" id="course-code" name="code" defaultValue={currentCourse?.code || ''} className={inputClass} disabled={isPending} placeholder="e.g., MLS301"/> </div>
                                    <div> <label htmlFor="course-description" className={labelClass}>Description (Optional)</label> <textarea id="course-description" name="description" rows={3} defaultValue={currentCourse?.description || ''} className={inputClass} disabled={isPending} placeholder="Briefly describe the course..."></textarea> </div>
                                    <div>
                                        <label className={labelClass}>Required Specializations (Optional)</label>
                                        <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-2 max-h-48 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                                            {allSpecializations.length > 0 ? allSpecializations.map(spec => (
                                                <div key={spec.id} className="flex items-center">
                                                    <input id={`spec-${spec.id}`} type="checkbox" checked={selectedSpecIds.has(spec.id)} onChange={() => handleSpecSelectionChange(spec.id)} className="h-4 w-4 rounded border-gray-300 text-spc-blue-main focus:ring-spc-blue-light disabled:opacity-70" disabled={isPending} />
                                                    <label htmlFor={`spec-${spec.id}`} className="ml-2 text-sm text-gray-700 select-none">{spec.name}</label>
                                                </div>
                                            )) : <p className="text-xs text-gray-500 italic col-span-full">No specializations defined to link.</p>}
                                        </div>
                                    </div>
                                    {modalError && <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><ExclamationTriangleIcon className="h-5 w-5" /> {modalError}</div>}
                                    {modalSuccess && <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><CheckCircleIcon className="h-5 w-5"/> {modalSuccess}</div>}
                                    <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
                                        <button type="button" onClick={closeModal} disabled={isPending} className={`${modalButtonBase} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 focus:ring-gray-400`}>Cancel</button>
                                        <button type="submit" disabled={isPending} className={`${modalButtonBase} ${modalMode === 'add' ? 'bg-spc-blue-main text-white hover:bg-spc-blue-darker focus:ring-spc-blue-light' : 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500'}`}>{isPending ? 'Saving...' : (modalMode === 'add' ? <><PlusIcon className="h-4 w-4 mr-1"/>Add Course</> : 'Save Changes')}</button>
                                    </div>
                                </form>
                            </>
                        )}
                        {isDeleteConfirmOpen && deletingCourse && ( /* Delete Modal Content */
                            <>
                                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-red-700 flex items-center gap-2" id="delete-modal-title"><ExclamationTriangleIcon className="h-6 w-6"/> Confirm Deletion</h2>
                                    <button onClick={closeDeleteConfirm} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50" aria-label="Close modal"><XMarkIcon className="h-5 w-5" /></button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <p className="text-sm text-gray-700"> Are you sure you want to permanently delete the course: <br /> <strong className="text-spc-blue-darker text-md">{deletingCourse.name}</strong>? </p>
                                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200"> This action cannot be undone. </p>
                                    {/* Delete modal error is shown on main page for now, but can be moved here */}
                                </div>
                                <div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
                                    <button type="button" onClick={closeDeleteConfirm} disabled={isPending} className={`${modalButtonBase} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 focus:ring-gray-400`}>Cancel</button>
                                    <button type="button" onClick={handleDelete} disabled={isPending} className={`${modalButtonBase} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`}>{isPending ? 'Deleting...' : <><TrashIcon className="h-4 w-4 mr-1"/>Delete Course</>}</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
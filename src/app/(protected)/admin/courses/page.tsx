'use client';

import React, { useState, useEffect, useTransition, FormEvent, useRef } from 'react';
import {
    getCourses, createCourse, updateCourse, deleteCourse,
} from '@/lib/courseActions';
import { getSpecializations } from '@/lib/actions/specializationActions';

import type { Course, Specialization } from '@/generated/prisma/client';
import {
    BookOpenIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon, ExclamationTriangleIcon, TagIcon
} from '@heroicons/react/24/outline';

// Interface for Course with its linked specializations (basic info)
type CourseWithSpecs = Course & {
    requiredSpecializations?: Pick<Specialization, 'id' | 'name'>[];
};

export default function AdminCoursesPage() {
    // --- State ---
    const [courses, setCourses] = useState<CourseWithSpecs[]>([]);
    const [allSpecializations, setAllSpecializations] = useState<Specialization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // For list loading
    const [isPending, startTransition] = useTransition(); // For CUD operations

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentCourse, setCurrentCourse] = useState<CourseWithSpecs | null>(null); // For editing
    const [modalError, setModalError] = useState<string | null>(null);
    const [modalSuccess, setModalSuccess] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedSpecIds, setSelectedSpecIds] = useState<Set<string>>(new Set());

    // --- Data Fetching ---
    const fetchPageData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [coursesRes, specsRes] = await Promise.all([
                getCourses(),
                getSpecializations() // Fetch all specializations for the form
            ]);

            if (coursesRes.success && coursesRes.courses) {
                setCourses(coursesRes.courses);
            } else {
                setError(coursesRes.error || 'Failed to load courses.');
                setCourses([]);
            }

            if (specsRes.success && specsRes.specializations) {
                setAllSpecializations(specsRes.specializations);
            } else {
                setError(prevError => prevError ? `${prevError}, ${specsRes.error || 'Failed to load specializations.'}` : (specsRes.error || 'Failed to load specializations.'));
                setAllSpecializations([]);
            }
        } catch (err) {
            setError('An unexpected error occurred while loading page data.');
            setCourses([]);
            setAllSpecializations([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPageData();
    }, []);

    // --- Modal Handlers ---
    const openModal = (mode: 'add' | 'edit', course?: CourseWithSpecs) => {
        setModalMode(mode);
        setCurrentCourse(course || null);
        setSelectedSpecIds(course ? new Set(course.requiredSpecializations?.map(s => s.id) || []) : new Set());
        setModalError(null);
        setModalSuccess(null);
        formRef.current?.reset();
        if (mode === 'edit' && course && formRef.current) {
            // Manually set form values for edit as defaultValue doesn't always re-trigger
            (formRef.current.elements.namedItem('name') as HTMLInputElement).value = course.name;
            (formRef.current.elements.namedItem('code') as HTMLInputElement).value = course.code || '';
            (formRef.current.elements.namedItem('description') as HTMLInputElement).value = course.description || '';
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        if (isPending) return;
        setIsModalOpen(false);
        setCurrentCourse(null);
        setModalError(null);
        setModalSuccess(null);
        setSelectedSpecIds(new Set());
    };

    const handleSpecSelectionChange = (specId: string) => {
        setSelectedSpecIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(specId)) {
                newSet.delete(specId);
            } else {
                newSet.add(specId);
            }
            return newSet;
        });
    };

    // --- Form Submission (Add/Edit) ---
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setModalError(null);
        setModalSuccess(null);

        const formData = new FormData(event.currentTarget);
        formData.append('specializationIds', JSON.stringify(Array.from(selectedSpecIds))); // Add selected spec IDs

        startTransition(async () => {
            let result;
            if (modalMode === 'add') {
                result = await createCourse(formData);
            } else if (currentCourse) {
                result = await updateCourse(currentCourse.id, formData);
            } else {
                setModalError("Action could not be determined.");
                return;
            }

            if (result.success) {
                setModalSuccess(`Course ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
                fetchPageData(); // Refresh list
                if (modalMode === 'add') {
                    formRef.current?.reset();
                    setSelectedSpecIds(new Set());
                } else {
                    // closeModal(); // Optionally close edit modal on success
                }
            } else {
                setModalError(result.error || `Failed to ${modalMode} course.`);
            }
        });
    };

    // --- Delete Handler ---
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deletingCourse, setDeletingCourse] = useState<CourseWithSpecs | null>(null);

    const openDeleteConfirm = (course: CourseWithSpecs) => {
        setDeletingCourse(course);
        setModalError(null); // Clear other modal errors
        setIsDeleteConfirmOpen(true);
    };
    const closeDeleteConfirm = () => {
        if (isPending) return;
        setIsDeleteConfirmOpen(false);
        setDeletingCourse(null);
    };
    const handleDelete = async () => {
        if (!deletingCourse) return;
        setModalError(null);
        startTransition(async () => {
            const result = await deleteCourse(deletingCourse.id);
            if (result.success) {
                setModalSuccess('Course deleted successfully!');
                fetchPageData(); // Refresh list
                closeDeleteConfirm();
            } else {
                // Display error within the delete confirmation modal or as a general page error
                setError(result.error || 'Failed to delete course.'); // Using main page error for now
                closeDeleteConfirm();
            }
        });
    };


    // --- UI Rendering ---
    const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-70";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading courses...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <BookOpenIcon className="h-7 w-7 text-indigo-600" />
                    Manage Courses
                </h1>
                <button
                    onClick={() => openModal('add')}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Course
                </button>
            </div>

            {/* Error Display for List */}
            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2" role="alert">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    <span>{error}</span>
                </div>
            )}
             {/* Success Message from Delete */}
             {modalSuccess && !isModalOpen && !isDeleteConfirmOpen && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm" role="alert">
                    {modalSuccess}
                </div>
            )}


            {/* Courses List */}
            {!isLoading && !error && courses.length === 0 && (
                <p className="text-center text-gray-500 italic py-10 bg-white rounded-md shadow-sm border">No courses defined yet.</p>
            )}
            {!isLoading && !error && courses.length > 0 && (
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                    <ul role="list" className="divide-y divide-gray-200">
                        {courses.map((course) => (
                            <li key={course.id} className="px-4 py-4 sm:px-6 group">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-indigo-700 truncate">
                                            {course.name} {course.code && `(${course.code})`}
                                        </p>
                                        {course.description && (
                                            <p className="mt-1 text-xs text-gray-600">
                                                {course.description}
                                            </p>
                                        )}
                                        {course.requiredSpecializations && course.requiredSpecializations.length > 0 && (
                                            <div className="mt-2">
                                                <span className="text-xs font-medium text-gray-500">Requires: </span>
                                                {course.requiredSpecializations.map((spec, index) => (
                                                    <span key={spec.id} className="ml-1 text-xs inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
                                                        {spec.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-shrink-0 space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openModal('edit', course)}
                                            disabled={isPending}
                                            className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
                                            title={`Edit ${course.name}`}
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteConfirm(course)}
                                            disabled={isPending}
                                            className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-400 focus:ring-offset-1 disabled:opacity-50"
                                            title={`Delete ${course.name}`}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Add/Edit Course Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {modalMode === 'add' ? 'Add New Course' : `Edit Course: ${currentCourse?.name}`}
                            </h2>
                            <button onClick={closeModal} disabled={isPending} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 p-5 overflow-y-auto">
                            <div>
                                <label htmlFor="course-name" className={labelClass}>Course Name*</label>
                                <input type="text" id="course-name" name="name" defaultValue={currentCourse?.name || ''} className={inputClass} required disabled={isPending} />
                            </div>
                            <div>
                                <label htmlFor="course-code" className={labelClass}>Course Code (Optional)</label>
                                <input type="text" id="course-code" name="code" defaultValue={currentCourse?.code || ''} className={inputClass} disabled={isPending} />
                            </div>
                            <div>
                                <label htmlFor="course-description" className={labelClass}>Description (Optional)</label>
                                <textarea id="course-description" name="description" rows={3} defaultValue={currentCourse?.description || ''} className={inputClass} disabled={isPending}></textarea>
                            </div>
                            <div>
                                <label className={labelClass}>Required Specializations (Optional)</label>
                                <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-1.5 max-h-40 overflow-y-auto p-2 border rounded-md">
                                    {allSpecializations.length > 0 ? allSpecializations.map(spec => (
                                        <div key={spec.id} className="flex items-center">
                                            <input
                                                id={`spec-${spec.id}`}
                                                type="checkbox"
                                                checked={selectedSpecIds.has(spec.id)}
                                                onChange={() => handleSpecSelectionChange(spec.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-70"
                                                disabled={isPending}
                                            />
                                            <label htmlFor={`spec-${spec.id}`} className="ml-2 text-sm text-gray-700">{spec.name}</label>
                                        </div>
                                    )) : <p className="text-xs text-gray-500 italic col-span-full">No specializations defined.</p>}
                                </div>
                            </div>

                            {modalError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2"><ExclamationTriangleIcon className="h-4 w-4" /> {modalError}</div>}
                            {modalSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm">{modalSuccess}</div>}

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6 sticky bottom-0 bg-white py-4 px-5 -mx-5">
                                <button type="button" onClick={closeModal} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50">Cancel</button>
                                <button type="submit" disabled={isPending} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60">
                                    {isPending ? 'Saving...' : (modalMode === 'add' ? 'Add Course' : 'Save Changes')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteConfirmOpen && deletingCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete the course: <strong className="text-gray-900">{deletingCourse.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={closeDeleteConfirm} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50">Cancel</button>
                            <button onClick={handleDelete} disabled={isPending} className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:opacity-60">
                                {isPending ? 'Deleting...' : 'Delete Course'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
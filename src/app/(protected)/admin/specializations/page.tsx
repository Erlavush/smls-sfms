// src/app/(protected)/admin/specializations/page.tsx
'use client';

import React, { useState, useEffect, useMemo, useTransition, FormEvent, useRef } from 'react';
import { getSpecializations, createSpecialization, updateSpecialization, deleteSpecialization } from '@/lib/actions/specializationActions';
import {
    TagIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon, PencilIcon, TrashIcon, CheckCircleIcon,
    MagnifyingGlassIcon // Added for Search
} from '@heroicons/react/24/outline';
import type { Specialization } from '@/generated/prisma';

export default function AdminSpecializationsPage() {
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addModalError, setAddModalError] = useState<string | null>(null);
    const [addModalSuccess, setAddModalSuccess] = useState<string | null>(null);
    const addFormRef = useRef<HTMLFormElement>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalError, setEditModalError] = useState<string | null>(null);
    const [editModalSuccess, setEditModalSuccess] = useState<string | null>(null);
    const [editingSpecialization, setEditingSpecialization] = useState<Specialization | null>(null);
    const editFormRef = useRef<HTMLFormElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteModalError, setDeleteModalError] = useState<string | null>(null);
    const [deletingSpecialization, setDeletingSpecialization] = useState<Specialization | null>(null);

    // --- State for Search Functionality ---
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSpecializations = () => {
        if (!isPending) setIsLoading(true);
        setError(null); setAddModalError(null); setAddModalSuccess(null);
        setEditModalError(null); setEditModalSuccess(null); setDeleteModalError(null);

        getSpecializations()
            .then(response => {
                if (response.success && response.specializations) setSpecializations(response.specializations);
                else { setError(response.error || 'Failed to load specializations.'); setSpecializations([]); }
            })
            .catch(() => { setError('An unexpected error occurred.'); setSpecializations([]); })
            .finally(() => { if (!isPending) setIsLoading(false); });
    };

    useEffect(() => { fetchSpecializations(); }, []);

    const openAddModal = () => { setAddModalError(null); setAddModalSuccess(null); addFormRef.current?.reset(); setIsAddModalOpen(true); };
    const closeAddModal = () => { if (isPending) return; setIsAddModalOpen(false); setAddModalError(null); setAddModalSuccess(null); };
    const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAddModalError(null); setAddModalSuccess(null);
        const formData = new FormData(event.currentTarget);
        const specName = formData.get('name') as string;
        startTransition(async () => {
            setIsLoading(true);
            const result = await createSpecialization(formData);
            if (result.success) {
                setAddModalSuccess(`Specialization "${specName}" created successfully!`);
                addFormRef.current?.reset(); fetchSpecializations();
            } else {
                setAddModalError(result.error || 'Failed to create specialization.'); setIsLoading(false);
            }
        });
    };

    const openEditModal = (spec: Specialization) => { setEditingSpecialization(spec); setEditModalError(null); setEditModalSuccess(null); setIsEditModalOpen(true); };
    const closeEditModal = () => { if (isPending) return; setIsEditModalOpen(false); setEditingSpecialization(null); setEditModalError(null); setEditModalSuccess(null); };
    const handleUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingSpecialization) return;
        setEditModalError(null); setEditModalSuccess(null);
        const formData = new FormData(event.currentTarget);
        formData.append('id', editingSpecialization.id);
        const specName = formData.get('name') as string;
        startTransition(async () => {
            setIsLoading(true);
            const result = await updateSpecialization(formData);
            if (result.success) {
                setEditModalSuccess(`Specialization "${specName}" updated successfully!`);
                fetchSpecializations();
                setTimeout(() => closeEditModal(), 1500);
            } else {
                setEditModalError(result.error || 'Failed to update specialization.'); setIsLoading(false);
            }
        });
    };

    const openDeleteModal = (spec: Specialization) => { setDeletingSpecialization(spec); setDeleteModalError(null); setIsDeleteModalOpen(true); };
    const closeDeleteModal = () => { if (isPending) return; setIsDeleteModalOpen(false); setDeletingSpecialization(null); setDeleteModalError(null); };
    const handleDeleteConfirm = async () => {
        if (!deletingSpecialization) return;
        setDeleteModalError(null);
        startTransition(async () => {
            setIsLoading(true);
            const result = await deleteSpecialization(deletingSpecialization.id);
            if (result.success) {
                // setAddModalSuccess might be a good place for a generic success message after delete
                // For now, just refetching and closing.
                setAddModalSuccess('Specialization deleted successfully!'); // Using addModalSuccess for general page success message
                closeDeleteModal();
                fetchSpecializations();
            } else {
                setDeleteModalError(result.error || 'Failed to delete specialization.');
                setIsLoading(false);
                // Don't close delete modal on error, so user can see the error.
            }
        });
    };

    // --- Filtered Specializations List based on Search Term ---
    const filteredSpecializations = useMemo(() => {
        if (!searchTerm.trim()) {
            return specializations;
        }
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return specializations.filter(spec =>
            (spec.name.toLowerCase().includes(lowercasedSearchTerm)) ||
            (spec.description?.toLowerCase().includes(lowercasedSearchTerm)) // Also search in description
        );
    }, [specializations, searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const inputClass = "block w-full rounded-lg border-gray-300 shadow-sm focus:border-spc-blue-main focus:ring-1 focus:ring-spc-blue-main sm:text-sm disabled:opacity-70 bg-white py-2.5 px-3.5";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
    const modalButtonBase = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spc-blue-lighter disabled:opacity-60 transition-all duration-150 ease-in-out transform hover:scale-105";
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-spc-blue-darker flex items-center gap-3 flex-shrink-0">
                    <TagIcon className="h-8 w-8 text-spc-blue-main" />
                    Manage Specializations
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-auto sm:flex-grow max-w-md">
                        <label htmlFor="specialization-search" className="sr-only">Search Specializations</label>
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="search"
                            name="specialization-search"
                            id="specialization-search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 shadow-sm focus:border-spc-blue-main focus:ring-1 focus:ring-spc-blue-main"
                            placeholder="Search by name or description..."
                        />
                    </div>
                    <button
                        onClick={openAddModal}
                        disabled={isPending}
                        className={`${modalButtonBase} bg-spc-blue-main text-white hover:bg-spc-blue-darker focus:ring-spc-blue-light w-full sm:w-auto flex-shrink-0`}
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Specialization
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-10 gap-3 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>{isPending ? 'Processing...' : 'Loading specializations...'}</span>
                </div>
            )}
            {error && !isLoading && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-center gap-3 mb-6" role="alert">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div> <p className="font-bold">Error</p> <p>{error}</p> </div>
                </div>
            )}
            {/* Unified success message area for Add/Edit/Delete success outside modals */}
            {/* Display addModalSuccess if it's set and no modals are open. This can serve as a general success message area. */}
            {(addModalSuccess && !isAddModalOpen && !isEditModalOpen && !isDeleteModalOpen) && (
                <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md shadow-sm flex items-center gap-2 text-sm" role="alert">
                    <CheckCircleIcon className="h-5 w-5"/> {addModalSuccess}
                </div>
            )}
            {/* Display editModalSuccess if it's set and no modals are open */}
            {(editModalSuccess && !isAddModalOpen && !isEditModalOpen && !isDeleteModalOpen) && (
                <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md shadow-sm flex items-center gap-2 text-sm" role="alert">
                    <CheckCircleIcon className="h-5 w-5"/> {editModalSuccess}
                </div>
            )}

            {!isLoading && !error && (
                <div className="bg-white shadow-xl overflow-hidden rounded-xl border border-gray-200/80">
                    {filteredSpecializations.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">
                             <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                             <p className="text-xl font-semibold">
                                {searchTerm ? 'No specializations match your search.' : 'No specializations defined yet.'}
                            </p>
                             <p className="text-sm text-gray-400 mt-1">
                                {searchTerm ? 'Try a different search term.' : 'Click "Add Specialization" to create one.'}
                            </p>
                        </div>
                    ) : (
                        <ul role="list" className="divide-y divide-gray-200">
                            {filteredSpecializations.map((spec) => ( // Use filteredSpecializations
                                <li key={spec.id} className="px-5 py-4 sm:px-6 group hover:bg-sky-50/50 transition-colors duration-150">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            {/* Highlighted Specialization Name */}
                                            <span className="inline-block bg-spc-blue-main text-white text-sm font-semibold px-3 py-1 rounded-md shadow group-hover:bg-spc-blue-darker transition-colors mb-1">
                                                {spec.name}
                                            </span>
                                            {spec.description && (
                                                <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-600 leading-relaxed">
                                                    {spec.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-shrink-0 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => openEditModal(spec)}
                                                disabled={isPending}
                                                className="p-2 rounded-full text-spc-blue-main hover:bg-spc-blue-lighter focus:outline-none focus:ring-2 focus:ring-spc-blue-light focus:ring-offset-1 disabled:opacity-50 transition-colors"
                                                title={`Edit ${spec.name}`}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(spec)}
                                                disabled={isPending}
                                                className="p-2 rounded-full text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 disabled:opacity-50 transition-colors"
                                                title={`Delete ${spec.name}`}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Common Modal Structure */}
            {(isAddModalOpen || isEditModalOpen || isDeleteModalOpen) && ( // Modals (Add/Edit/Delete structure)
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in-scale">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all flex flex-col max-h-[90vh]">
                        {/* Add Modal Content */}
                        {isAddModalOpen && (
                            <>
                                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-spc-blue-darker flex items-center gap-2" id="add-modal-title"> <TagIcon className="h-6 w-6 text-spc-blue-main"/> Add New Specialization</h2>
                                    <button onClick={closeAddModal} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50" aria-label="Close modal"><XMarkIcon className="h-5 w-5" /></button>
                                </div>
                                <form ref={addFormRef} onSubmit={handleCreateSubmit} className="p-5 space-y-4 overflow-y-auto">
                                    <div> <label htmlFor="spec-name-add" className={labelClass}>Specialization Name*</label> <input type="text" id="spec-name-add" name="name" className={inputClass} required disabled={isPending} placeholder="e.g., Clinical Hematology"/> </div>
                                    <div> <label htmlFor="spec-description-add" className={labelClass}>Description (Optional)</label> <textarea id="spec-description-add" name="description" rows={3} className={inputClass} disabled={isPending} placeholder="Briefly describe the specialization..."></textarea> </div>
                                    {addModalError && <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><ExclamationTriangleIcon className="h-5 w-5" /> {addModalError}</div>}
                                    {addModalSuccess && <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><CheckCircleIcon className="h-5 w-5"/> {addModalSuccess}</div>}
                                    <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
                                        <button type="button" onClick={closeAddModal} disabled={isPending} className={`${modalButtonBase} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 focus:ring-gray-400`}>Cancel</button>
                                        <button type="submit" disabled={isPending} className={`${modalButtonBase} bg-spc-blue-main text-white hover:bg-spc-blue-darker focus:ring-spc-blue-light`}>{isPending ? 'Adding...' : <><PlusIcon className="h-4 w-4 mr-1"/>Add Specialization</>}</button>
                                    </div>
                                </form>
                            </>
                        )}
                        {/* Edit Modal Content */}
                        {isEditModalOpen && editingSpecialization && (
                            <>
                                <div className="flex justify-between items-center p-5 border-b border-gray-200"> {/* ... existing Edit Modal JSX ... */}
                                    <h2 className="text-xl font-semibold text-spc-blue-darker flex items-center gap-2" id="edit-modal-title"><PencilIcon className="h-6 w-6 text-spc-blue-main"/> Edit Specialization</h2>
                                    <button onClick={closeEditModal} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50" aria-label="Close modal"><XMarkIcon className="h-5 w-5" /></button>
                                </div>
                                <form ref={editFormRef} onSubmit={handleUpdateSubmit} className="p-5 space-y-4 overflow-y-auto">
                                    <div> <label htmlFor="spec-name-edit" className={labelClass}>Specialization Name*</label> <input type="text" id="spec-name-edit" name="name" defaultValue={editingSpecialization.name} className={inputClass} required disabled={isPending} /> </div>
                                    <div> <label htmlFor="spec-description-edit" className={labelClass}>Description (Optional)</label> <textarea id="spec-description-edit" name="description" rows={3} defaultValue={editingSpecialization.description || ''} className={inputClass} disabled={isPending}></textarea> </div>
                                    {editModalError && <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><ExclamationTriangleIcon className="h-5 w-5" /> {editModalError}</div>}
                                    {editModalSuccess && <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><CheckCircleIcon className="h-5 w-5"/> {editModalSuccess}</div>}
                                    <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
                                        <button type="button" onClick={closeEditModal} disabled={isPending} className={`${modalButtonBase} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 focus:ring-gray-400`}>Cancel</button>
                                        <button type="submit" disabled={isPending} className={`${modalButtonBase} bg-spc-blue-main text-white hover:bg-spc-blue-darker focus:ring-spc-blue-light`}>{isPending ? 'Saving...' : 'Save Changes'}</button>
                                    </div>
                                </form>
                            </>
                        )}
                        {/* Delete Modal Content */}
                        {isDeleteModalOpen && deletingSpecialization && (
                            <>
                                <div className="flex justify-between items-center p-5 border-b border-gray-200"> {/* ... existing Delete Modal JSX ... */}
                                    <h2 className="text-xl font-semibold text-red-700 flex items-center gap-2" id="delete-modal-title"><ExclamationTriangleIcon className="h-6 w-6"/> Confirm Deletion</h2>
                                    <button onClick={closeDeleteModal} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50" aria-label="Close modal"><XMarkIcon className="h-5 w-5" /></button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <p className="text-sm text-gray-700"> Are you sure you want to permanently delete the specialization: <br /> <strong className="text-spc-blue-darker text-md">{deletingSpecialization.name}</strong>? </p>
                                    <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-md border border-red-200"> This action cannot be undone. Faculty members currently linked to this specialization will be unlinked. </p>
                                    {deleteModalError && <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"><ExclamationTriangleIcon className="h-5 w-5" /> {deleteModalError}</div>}
                                </div>
                                <div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
                                    <button type="button" onClick={closeDeleteModal} disabled={isPending} className={`${modalButtonBase} bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 focus:ring-gray-400`}>Cancel</button>
                                    <button type="button" onClick={handleDeleteConfirm} disabled={isPending} className={`${modalButtonBase} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`}>{isPending ? 'Deleting...' : <><TrashIcon className="h-4 w-4 mr-1"/>Delete</>}</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
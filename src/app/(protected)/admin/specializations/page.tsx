// src/app/(protected)/admin/specializations/page.tsx
'use client';

import React, { useState, useEffect, useTransition, FormEvent, useRef } from 'react';
// Import the new server actions
import { getSpecializations, createSpecialization, updateSpecialization, deleteSpecialization } from '@/lib/actions/specializationActions';import { TagIcon, PlusIcon, ExclamationTriangleIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Added PencilIcon, TrashIcon
import type { Specialization } from '@/generated/prisma';

export default function AdminSpecializationsPage() {
    // --- Existing State ---
    const [specializations, setSpecializations] = useState<Specialization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // For fetching list
    const [isPending, startTransition] = useTransition(); // For server action loading state

    // --- State for Add Modal ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addModalError, setAddModalError] = useState<string | null>(null);
    const [addModalSuccess, setAddModalSuccess] = useState<string | null>(null);
    const addFormRef = useRef<HTMLFormElement>(null);

    // --- State for Edit Modal ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editModalError, setEditModalError] = useState<string | null>(null);
    const [editModalSuccess, setEditModalSuccess] = useState<string | null>(null);
    const [editingSpecialization, setEditingSpecialization] = useState<Specialization | null>(null);
    const editFormRef = useRef<HTMLFormElement>(null);

    // --- State for Delete Modal ---
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteModalError, setDeleteModalError] = useState<string | null>(null);
    const [deletingSpecialization, setDeletingSpecialization] = useState<Specialization | null>(null);

    // --- Fetch Specializations (Modified to clear modal states) ---
    const fetchSpecializations = () => {
        if (!isPending) setIsLoading(true);
        setError(null);
        // Clear modal states on refresh
        setAddModalError(null);
        setAddModalSuccess(null);
        setEditModalError(null);
        setEditModalSuccess(null);
        setDeleteModalError(null);
        console.log("Specializations page: Fetching data...");

        getSpecializations()
            .then(response => {
                if (response.success && response.specializations) {
                    setSpecializations(response.specializations);
                    console.log("Specializations fetched:", response.specializations);
                } else {
                    setError(response.error || 'Failed to load specializations.');
                    setSpecializations([]);
                    console.error("Error fetching specializations:", response.error);
                }
            })
            .catch(err => {
                console.error("Unexpected error fetching specializations:", err);
                setError('An unexpected error occurred.');
                setSpecializations([]);
            })
            .finally(() => {
                if (!isPending) setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchSpecializations();
    }, []); // Initial fetch

    // --- Add Modal Handlers ---
    const openAddModal = () => {
        setAddModalError(null);
        setAddModalSuccess(null);
        addFormRef.current?.reset();
        setIsAddModalOpen(true);
    };
    const closeAddModal = () => {
        if (isPending) return;
        setIsAddModalOpen(false);
        setAddModalError(null);
        setAddModalSuccess(null);
    };
    const handleCreateSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAddModalError(null);
        setAddModalSuccess(null);
        const formData = new FormData(event.currentTarget);
        const specName = formData.get('name') as string;

        startTransition(async () => {
            setIsLoading(true); // Indicate loading for list refresh
            const result = await createSpecialization(formData);
            if (result.success) {
                setAddModalSuccess(`Specialization "${specName}" created successfully!`);
                addFormRef.current?.reset();
                fetchSpecializations(); // Refresh list
                // Keep modal open to add more, or close after delay:
                // setTimeout(() => closeAddModal(), 1500);
            } else {
                setAddModalError(result.error || 'Failed to create specialization.');
                setIsLoading(false); // Stop list loading if creation failed
            }
        });
    };

    // --- Edit Modal Handlers ---
    const openEditModal = (spec: Specialization) => {
        setEditingSpecialization(spec); // Set the spec to edit
        setEditModalError(null);
        setEditModalSuccess(null);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        if (isPending) return;
        setIsEditModalOpen(false);
        setEditingSpecialization(null); // Clear editing state
        setEditModalError(null);
        setEditModalSuccess(null);
    };
    const handleUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editingSpecialization) return; // Should not happen

        setEditModalError(null);
        setEditModalSuccess(null);
        const formData = new FormData(event.currentTarget);
        // Ensure the ID is included in the form data for the action
        formData.append('id', editingSpecialization.id);
        const specName = formData.get('name') as string;

        startTransition(async () => {
            setIsLoading(true); // Indicate loading for list refresh
            const result = await updateSpecialization(formData);
            if (result.success) {
                setEditModalSuccess(`Specialization "${specName}" updated successfully!`);
                fetchSpecializations(); // Refresh list
                // Close modal after successful update
                setTimeout(() => closeEditModal(), 1500);
            } else {
                setEditModalError(result.error || 'Failed to update specialization.');
                setIsLoading(false); // Stop list loading if update failed
            }
        });
    };

    // --- Delete Modal Handlers ---
    const openDeleteModal = (spec: Specialization) => {
        setDeletingSpecialization(spec);
        setDeleteModalError(null); // Clear previous delete errors
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        if (isPending) return;
        setIsDeleteModalOpen(false);
        setDeletingSpecialization(null);
        setDeleteModalError(null);
    };
    const handleDeleteConfirm = async () => {
        if (!deletingSpecialization) return;
        setDeleteModalError(null); // Clear error before attempting delete

        startTransition(async () => {
            setIsLoading(true); // Indicate loading for list refresh
            const result = await deleteSpecialization(deletingSpecialization.id);
            if (result.success) {
                closeDeleteModal(); // Close modal on success
                fetchSpecializations(); // Refresh list
            } else {
                setDeleteModalError(result.error || 'Failed to delete specialization.');
                setIsLoading(false); // Stop list loading if delete failed
            }
        });
    };

    // --- Input/Label Classes ---
    const inputClass = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:opacity-70";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        // End Page Container
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <TagIcon className="h-7 w-7 text-blue-600" />
                    Manage Specializations
                </h1>
                <button
                    onClick={openAddModal}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Specialization
                </button>
            </div>
            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-10">
                    <div className="flex items-center justify-center gap-3 text-gray-500">
                        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{isPending ? 'Processing...' : 'Loading specializations...'}</span>
                    </div>
                </div>
            )}
            {/* Error State for List */}
            {error && !isLoading && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-center gap-2 mb-4" role="alert">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {/* Specializations List/Table */}
            {!isLoading && !error && (
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                    <ul role="list" className="divide-y divide-gray-200">
                        {specializations.length === 0 ? (
                            <li className="px-6 py-4 text-center text-gray-500 italic">No specializations defined yet. Click "Add Specialization" to create one.</li>
                        ) : (
                            specializations.map((spec) => (
                                <li key={spec.id} className="px-4 py-3 sm:px-6 hover:bg-gray-50 group"> {/* Added group */}
                                    <div className="flex items-center justify-between gap-4">
                                        {/* Specialization Name & Description */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                {spec.name}
                                            </p>
                                            {spec.description && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {spec.description}
                                                </p>
                                            )}
                                        </div>
                                        {/* Action Buttons (Visible on hover) */}
                                        <div className="ml-4 flex-shrink-0 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => openEditModal(spec)}
                                                disabled={isPending}
                                                className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
                                                title={`Edit ${spec.name}`}
                                            >
                                                <PencilIcon className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(spec)}
                                                disabled={isPending}
                                                className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-400 focus:ring-offset-1 disabled:opacity-50"
                                                title={`Delete ${spec.name}`}
                                            >
                                                <TrashIcon className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
            {/* --- Add Specialization Modal --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" aria-labelledby="add-modal-title" role="dialog" aria-modal="true">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800" id="add-modal-title">Add New Specialization</h2>
                            <button onClick={closeAddModal} disabled={isPending} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        {/* Form */}
                        <form ref={addFormRef} onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="spec-name-add" className={labelClass}>Specialization Name*</label>
                                <input type="text" id="spec-name-add" name="name" className={inputClass} required disabled={isPending} />
                            </div>
                            <div>
                                <label htmlFor="spec-description-add" className={labelClass}>Description (Optional)</label>
                                <textarea id="spec-description-add" name="description" rows={3} className={inputClass} disabled={isPending}></textarea>
                            </div>
                            {/* Messages */}
                            {addModalError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert"><ExclamationTriangleIcon className="h-4 w-4" /> {addModalError}</div>}
                            {addModalSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm" role="alert">{addModalSuccess}</div>}
                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
                                <button type="button" onClick={closeAddModal} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">Cancel</button>
                                <button type="submit" disabled={isPending} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60">{isPending ? 'Adding...' : 'Add Specialization'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* --- Edit Specialization Modal --- */}
            {isEditModalOpen && editingSpecialization && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" aria-labelledby="edit-modal-title" role="dialog" aria-modal="true">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800" id="edit-modal-title">Edit Specialization</h2>
                            <button onClick={closeEditModal} disabled={isPending} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        {/* Form */}
                        <form ref={editFormRef} onSubmit={handleUpdateSubmit} className="space-y-4">
                            {/* Hidden ID field - not strictly necessary if passed via FormData in handler, but good practice */}
                            {/* <input type="hidden" name="id" value={editingSpecialization.id} /> */}
                            <div>
                                <label htmlFor="spec-name-edit" className={labelClass}>Specialization Name*</label>
                                <input type="text" id="spec-name-edit" name="name" defaultValue={editingSpecialization.name} className={inputClass} required disabled={isPending} />
                            </div>
                            <div>
                                <label htmlFor="spec-description-edit" className={labelClass}>Description (Optional)</label>
                                <textarea id="spec-description-edit" name="description" rows={3} defaultValue={editingSpecialization.description || ''} className={inputClass} disabled={isPending}></textarea>
                            </div>
                            {/* Messages */}
                            {editModalError && <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2" role="alert"><ExclamationTriangleIcon className="h-4 w-4" /> {editModalError}</div>}
                            {editModalSuccess && <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm" role="alert">{editModalSuccess}</div>}
                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
                                <button type="button" onClick={closeEditModal} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">Cancel</button>
                                <button type="submit" disabled={isPending} className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60">{isPending ? 'Saving...' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* --- Delete Confirmation Modal --- */}
            {isDeleteModalOpen && deletingSpecialization && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" aria-labelledby="delete-modal-title" role="dialog" aria-modal="true">
                   <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
                       {/* Header */}
                       <div className="flex justify-between items-center mb-4">
                           <h2 className="text-lg font-semibold text-gray-800" id="delete-modal-title">Confirm Deletion</h2>
                           <button onClick={closeDeleteModal} disabled={isPending} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50" aria-label="Close modal">
                               <XMarkIcon className="h-5 w-5" />
                           </button>
                       </div>
                       {/* Confirmation Text */}
                       <p className="text-sm text-gray-600 mb-4">
                           Are you sure you want to delete the specialization: <strong className="text-gray-900">{deletingSpecialization.name}</strong>?
                           This action cannot be undone. Faculty members currently linked to this specialization will be unlinked.
                       </p>
                        {/* Error Message Area */}
                        {deleteModalError && (
                           <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm flex items-center gap-2 mb-4" role="alert">
                               <ExclamationTriangleIcon className="h-4 w-4" /> {deleteModalError}
                           </div>
                       )}
                       {/* Footer Actions */}
                       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
                           <button type="button" onClick={closeDeleteModal} disabled={isPending} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
                               Cancel
                           </button>
                           <button
                               type="button"
                               onClick={handleDeleteConfirm}
                               disabled={isPending}
                               className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60"
                           >
                               {isPending ? 'Deleting...' : 'Delete'}
                           </button>
                       </div>
                   </div>
               </div>
           )}
        </div>
    );
}
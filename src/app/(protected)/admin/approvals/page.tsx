// src/app/(protected)/admin/approvals/page.tsx
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getPendingSubmissions, approveSubmission, rejectSubmission } from '@/lib/actions/approvalActions';
import type { ItemType } from '@/types';
import {
    CheckCircleIcon, XCircleIcon, PaperClipIcon, UserCircleIcon, ClockIcon, EyeIcon, // Added EyeIcon
    ExclamationTriangleIcon, XMarkIcon, DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import FilePreviewModal from '@/components/ui/FilePreviewModal'; // Import the new modal

interface PendingItem {
    id: string;
    itemType: ItemType;
    createdAt: string | Date;
    user: { id: string; name: string | null; email: string | null };
    title?: string;
    degree?: string;
    examination?: string;
    position?: string;
    awardName?: string;
    engagementTitle?: string;
    researchTitle?: string;
    paperTitle?: string;
    diplomaFileUrl?: string | null;
    certificateFileUrl?: string | null;
    licenseFileUrl?: string | null;
    proofUrl?: string | null;
    membershipProofUrl?: string | null;
    certificateUrl?: string | null;
    pdfUrl?: string | null;
    institution?: string;
    organizer?: string;
}

function getItemDisplayTitle(item: PendingItem): string {
    return item.title ?? item.degree ?? item.examination ?? item.awardName ?? item.engagementTitle ?? item.researchTitle ?? item.paperTitle ?? item.position ?? `Item ID: ${item.id}`;
}

function getItemDocumentUrl(item: PendingItem): string | null | undefined {
    switch (item.itemType) {
        case 'academicQualification': return item.diplomaFileUrl;
        case 'professionalDevelopment': return item.certificateFileUrl;
        case 'professionalLicense': return item.licenseFileUrl;
        case 'awardRecognition': return item.certificateUrl;
        case 'publication': return item.pdfUrl;
        case 'workExperience':
        case 'communityInvolvement':
        case 'conferencePresentation':
        case 'professionalAffiliation':
             return item.proofUrl ?? item.membershipProofUrl;
        default: return null;
    }
}

// Helper to extract filename from URL (can be moved to a utils file)
function getFileNameFromUrl(url: string | null | undefined): string {
    if (!url) return 'Document'; // Default name if URL is missing
    try {
        const parts = url.split('/');
        const encodedName = parts[parts.length - 1];
        return decodeURIComponent(encodedName);
    } catch (e) {
        console.error("Error extracting filename:", e);
        return 'file'; // Fallback filename
    }
}

const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); } // Changed dateStyle
    catch (e) { return 'Invalid Date'; }
};

export default function AdminApprovalsPage() {
    const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [actionError, setActionError] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState<{ [itemId: string]: string }>({});
    const [showRejectReasonInput, setShowRejectReasonInput] = useState<string | null>(null);
    const [isApproveConfirmModalOpen, setIsApproveConfirmModalOpen] = useState(false);
    const [itemToApprove, setItemToApprove] = useState<PendingItem | null>(null);

    // State for File Preview Modal
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [currentFileForPreview, setCurrentFileForPreview] = useState<{ url: string; name: string } | null>(null);

    const openPreviewModal = (fileUrl: string, fileName: string) => {
        setCurrentFileForPreview({ url: fileUrl, name: fileName });
        setIsPreviewModalOpen(true);
    };

    const closePreviewModal = () => { setIsPreviewModalOpen(false); setCurrentFileForPreview(null); };

    const fetchItems = async () => {
        setIsLoading(true); setError(null);
        const result = await getPendingSubmissions();
        if (result.success) setPendingItems(result.pendingItems || []);
        else setError(result.error || 'Failed to load pending items.');
        setIsLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const openApproveConfirmationModal = (item: PendingItem) => {
        setItemToApprove(item); setActionError(null); setIsApproveConfirmModalOpen(true);
    };

    const handleConfirmApprove = () => {
        if (!itemToApprove || isPending) return;
        setActionError(null);
        startTransition(async () => {
            const result = await approveSubmission(itemToApprove.id, itemToApprove.itemType);
            if (!result.success) setActionError(`Failed to approve ${itemToApprove.itemType}: ${result.error}`);
            else { setIsApproveConfirmModalOpen(false); setItemToApprove(null); await fetchItems(); }
        });
    };

    const handleReject = (itemId: string, itemType: ItemType) => {
        setActionError(null);
        const reason = rejectionReason[itemId]?.trim();
        if (!reason) { setActionError(`Rejection reason is required for item ${itemId}.`); setShowRejectReasonInput(itemId); return; }
        startTransition(async () => {
            const result = await rejectSubmission(itemId, itemType, reason);
            if (!result.success) setActionError(`Failed to reject ${itemType}: ${result.error}`);
            else { setRejectionReason(prev => ({ ...prev, [itemId]: '' })); setShowRejectReasonInput(null); await fetchItems(); }
        });
    };

    const handleReasonChange = (itemId: string, value: string) => setRejectionReason(prev => ({ ...prev, [itemId]: value }));
    const toggleRejectInput = (itemId: string) => {
        setShowRejectReasonInput(prev => prev === itemId ? null : itemId);
        setActionError(null);
    };

    // Button Styles - centralized for consistency
    const baseButtonClasses = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spc-blue-lighter disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform hover:scale-105";
    const approveButtonClasses = `${baseButtonClasses} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`;
    const rejectButtonBaseClasses = `${baseButtonClasses} text-white`;
    const activeRejectButtonClasses = `${rejectButtonBaseClasses} bg-red-600 hover:bg-red-700 focus:ring-red-500`;
    const inactiveRejectButtonClasses = `${rejectButtonBaseClasses} bg-rose-500 hover:bg-rose-600 focus:ring-rose-500`; // Slightly different red for default "Reject"

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            <div className="mb-8 flex items-center gap-3">
                <DocumentMagnifyingGlassIcon className="h-8 w-8 text-spc-blue-main" />
                <h1 className="text-2xl sm:text-3xl font-bold text-spc-blue-darker">Pending Approvals</h1>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center py-10 gap-3 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Loading pending items...</span>
                </div>
            )}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-center gap-3 mb-6" role="alert">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div><p className="font-bold">Error</p><p>{error}</p></div>
                </div>
            )}
            {actionError && !isApproveConfirmModalOpen && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md shadow-sm flex items-center gap-2 mb-4 text-sm" role="alert">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" /> {actionError}
                </div>
            )}

            {!isLoading && !error && pendingItems.length === 0 && (
                 <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                    <CheckCircleIcon className="h-20 w-20 text-green-300 mx-auto mb-5" />
                    <p className="text-xl font-semibold text-gray-600">All Clear!</p>
                    <p className="text-sm text-gray-400 mt-1">No items currently pending approval.</p>
                </div>
            )}

            {pendingItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingItems.map((item) => {
                        const docUrl = getItemDocumentUrl(item);
                        const docFileName = getFileNameFromUrl(docUrl); // Get filename
                        const displayTitle = getItemDisplayTitle(item);
                        const isRejectingThis = showRejectReasonInput === item.id;

                        return (
                            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-200/80 flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                {/* Card Header - Item Type */}
                                <div className="p-4 bg-gradient-to-r from-spc-blue-light to-spc-blue-main text-white">
                                    <p className="text-sm font-semibold uppercase tracking-wider">{item.itemType.replace(/([A-Z])/g, ' $1').trim()}</p>
                                </div>

                                <div className="p-5 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-spc-blue-darker mb-1.5 break-words">{displayTitle}</h2>
                                        <div className="mb-3 text-xs text-gray-500 space-y-1">
                                            <p className="flex items-center gap-1.5">
                                                <UserCircleIcon className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium text-gray-600">{item.user.name ?? item.user.email ?? 'Unknown User'}</span>
                                            </p>
                                            <p className="flex items-center gap-1.5">
                                                <ClockIcon className="h-4 w-4 text-gray-400" />
                                                <span>Submitted: {formatDate(item.createdAt)}</span>
                                            </p>
                                        </div>
                                        {docUrl ? (
                                            <button
                                                type="button"
                                                onClick={() => openPreviewModal(docUrl, docFileName)}
                                                className="inline-flex items-center gap-1.5 text-sm text-spc-blue-main hover:text-spc-blue-darker hover:underline font-medium transition-colors duration-150"
                                            >
                                                <EyeIcon className="h-4 w-4" /> Preview Document
                                            </button>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic mt-1">No document attached.</p>
                                        )}
                                    </div>

                                    {/* Action Buttons Area */}
                                    <div className="mt-5 pt-4 border-t border-gray-100">
                                        <div className="flex flex-col sm:flex-row gap-2.5">
                                            <button
                                                onClick={() => openApproveConfirmationModal(item)}
                                                disabled={isPending || isRejectingThis}
                                                className={`${approveButtonClasses} w-full sm:w-auto`}
                                            >
                                                <CheckCircleIcon className="h-5 w-5" /> Approve
                                            </button>
                                            <button
                                                onClick={() => toggleRejectInput(item.id)}
                                                disabled={isPending}
                                                className={`${isRejectingThis ? activeRejectButtonClasses : inactiveRejectButtonClasses} w-full sm:w-auto`}
                                            >
                                                <XCircleIcon className="h-5 w-5" /> {isRejectingThis ? 'Cancel' : 'Reject'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Rejection Reason Input Area (Conditional) */}
                                {isRejectingThis && (
                                    <div className="p-4 border-t border-dashed border-gray-200 bg-rose-50">
                                        <label htmlFor={`reason-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Reason for Rejection*
                                        </label>
                                        <textarea
                                            id={`reason-${item.id}`} rows={2}
                                            value={rejectionReason[item.id] || ''}
                                            onChange={(e) => handleReasonChange(item.id, e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm disabled:opacity-50"
                                            placeholder="Provide a clear reason..."
                                            disabled={isPending}
                                        />
                                        <button
                                            onClick={() => handleReject(item.id, item.itemType)}
                                            disabled={isPending || !rejectionReason[item.id]?.trim()}
                                            className={`${activeRejectButtonClasses} mt-2.5 w-full`}
                                        >
                                            Confirm Rejection
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Approve Confirmation Modal (styling adjusted to match general aesthetic) */}
            {isApproveConfirmModalOpen && itemToApprove && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-scale">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-5 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-spc-blue-darker flex items-center gap-2" id="approve-confirm-modal-title">
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                Confirm Approval
                            </h2>
                            <button onClick={() => { if (!isPending) setIsApproveConfirmModalOpen(false); }} disabled={isPending} className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-spc-blue-light disabled:opacity-50 transition-colors" aria-label="Close confirmation"> <XMarkIcon className="h-5 w-5" /> </button>
                        </div>
                        <div className="p-5 sm:p-6 overflow-y-auto flex-grow space-y-4">
                            <p className="text-sm text-gray-700"> Please review the details below and confirm approval: </p>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2.5">
                                <div> <span className="text-xs font-medium text-gray-500 uppercase">Item Type:</span> <p className="text-sm text-gray-800">{itemToApprove.itemType.replace(/([A-Z])/g, ' $1').trim()}</p> </div>
                                <div> <span className="text-xs font-medium text-gray-500 uppercase">Title/Identifier:</span> <p className="text-sm font-semibold text-spc-blue-darker">{getItemDisplayTitle(itemToApprove)}</p> </div>
                                <div> <span className="text-xs font-medium text-gray-500 uppercase">Submitted By:</span> <p className="text-sm text-gray-800">{itemToApprove.user.name ?? itemToApprove.user.email ?? 'Unknown User'}</p> </div>
                                <div> <span className="text-xs font-medium text-gray-500 uppercase">Submitted On:</span> <p className="text-sm text-gray-800">{formatDate(itemToApprove.createdAt)}</p> </div>
                                {getItemDocumentUrl(itemToApprove) && (
                                    <div>
                                        <span className="text-xs font-medium text-gray-500 uppercase">Document:</span>
                                        <button
                                            type="button"
                                            onClick={() => openPreviewModal(getItemDocumentUrl(itemToApprove)!, getFileNameFromUrl(getItemDocumentUrl(itemToApprove)))}
                                            className="flex items-center gap-1.5 text-sm text-spc-blue-main hover:text-spc-blue-darker hover:underline mt-0.5 font-medium focus:outline-none"
                                        >
                                            <EyeIcon className="h-4 w-4" /> Preview Attached Document
                                        </button>
                                    </div>
                                )}
                            </div>
                            {actionError && ( <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-md text-sm flex items-center gap-2" role="alert"> <ExclamationTriangleIcon className="h-5 w-5" /> {actionError} </div> )}
                        </div>
                        <div className="flex justify-end gap-3 p-5 border-t border-gray-200 bg-gray-50">
                            <button type="button" onClick={() => { if (!isPending) setIsApproveConfirmModalOpen(false); }} disabled={isPending} className={`${baseButtonClasses} bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400`}> Cancel </button>
                            <button type="button" onClick={handleConfirmApprove} disabled={isPending} className={approveButtonClasses} > {isPending ? ( <><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Approving...</> ) : ( 'Confirm Approve' )} </button>
                        </div>
                    </div>
                </div>
            )}

            {/* File Preview Modal Component */}
            <FilePreviewModal
                isOpen={isPreviewModalOpen}
                onClose={closePreviewModal}
                fileUrl={currentFileForPreview?.url || null}
                fileName={currentFileForPreview?.name || null}
            />
        </div>
    );
}
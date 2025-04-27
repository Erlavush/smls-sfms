// src/app/admin/approvals/page.tsx
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getPendingSubmissions, approveSubmission, rejectSubmission } from '@/lib/adminActions'; // Import admin actions
import type { ItemType } from '@/types'; // Import ItemType
import { CheckCircleIcon, XCircleIcon, PaperClipIcon, UserCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

// Define a more specific type for the items displayed on this page
interface PendingItem {
    id: string;
    itemType: ItemType; // Added during fetch
    createdAt: string | Date;
    user: { id: string; name: string | null; email: string | null };
    // Include fields common enough to display, or use specific checks
    title?: string; // For ProfessionalDevelopment
    degree?: string; // For AcademicQualification
    examination?: string; // For ProfessionalLicense
    position?: string; // For WorkExperience, ProfessionalAffiliation
    awardName?: string; // For AwardRecognition
    engagementTitle?: string; // For CommunityInvolvement
    researchTitle?: string; // For Publication
    paperTitle?: string; // For ConferencePresentation
    // Include relevant URL fields based on itemType
    diplomaFileUrl?: string | null;
    certificateFileUrl?: string | null;
    licenseFileUrl?: string | null;
    proofUrl?: string | null;
    membershipProofUrl?: string | null;
    certificateUrl?: string | null;
    pdfUrl?: string | null;
    // Add other potentially relevant fields
    institution?: string;
    organizer?: string;
    // ... add more as needed for display
}

// Helper to get the display title for an item
function getItemDisplayTitle(item: PendingItem): string {
    return item.title ?? item.degree ?? item.examination ?? item.awardName ?? item.engagementTitle ?? item.researchTitle ?? item.paperTitle ?? item.position ?? `Item ID: ${item.id}`;
}

// Helper to get the relevant document URL
function getItemDocumentUrl(item: PendingItem): string | null | undefined {
     // Order matters if multiple could exist (e.g., proofUrl used in multiple types)
    switch (item.itemType) {
        case 'academicQualification': return item.diplomaFileUrl;
        case 'professionalDevelopment': return item.certificateFileUrl;
        case 'professionalLicense': return item.licenseFileUrl;
        case 'awardRecognition': return item.certificateUrl;
        case 'publication': return item.pdfUrl;
        case 'workExperience':
        case 'communityInvolvement':
        case 'conferencePresentation':
        case 'professionalAffiliation': // Added affiliation proof
             return item.proofUrl ?? item.membershipProofUrl; // Use specific proofUrl if available
        default: return null;
    }
}

// Helper to format date
const formatDate = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' }); }
    catch (e) { return 'Invalid Date'; }
};


export default function AdminApprovalsPage() {
    const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [actionError, setActionError] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState<{ [itemId: string]: string }>({});
    const [showRejectReasonInput, setShowRejectReasonInput] = useState<string | null>(null); // Store ID of item being rejected

    const fetchItems = async () => {
        setIsLoading(true);
        setError(null);
        setActionError(null);
        const result = await getPendingSubmissions();
        if (result.success) {
            setPendingItems(result.pendingItems || []);
        } else {
            setError(result.error || 'Failed to load pending items.');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleApprove = (itemId: string, itemType: ItemType) => {
        setActionError(null);
        startTransition(async () => {
            const result = await approveSubmission(itemId, itemType);
            if (!result.success) {
                setActionError(`Failed to approve ${itemType} (${itemId}): ${result.error}`);
            } else {
                // Refresh list after successful action
                await fetchItems();
            }
        });
    };

    const handleReject = (itemId: string, itemType: ItemType) => {
        setActionError(null);
        const reason = rejectionReason[itemId]?.trim();
        if (!reason) {
            setActionError(`Rejection reason is required for item ${itemId}.`);
            setShowRejectReasonInput(itemId); // Ensure input is visible
            return;
        }
        startTransition(async () => {
            const result = await rejectSubmission(itemId, itemType, reason);
            if (!result.success) {
                setActionError(`Failed to reject ${itemType} (${itemId}): ${result.error}`);
            } else {
                // Clear reason and hide input on success
                setRejectionReason(prev => ({ ...prev, [itemId]: '' }));
                setShowRejectReasonInput(null);
                // Refresh list
                await fetchItems();
            }
        });
    };

    const handleReasonChange = (itemId: string, value: string) => {
        setRejectionReason(prev => ({ ...prev, [itemId]: value }));
    };

    const toggleRejectInput = (itemId: string) => {
        if (showRejectReasonInput === itemId) {
            setShowRejectReasonInput(null); // Hide if already shown
        } else {
            setShowRejectReasonInput(itemId); // Show for this item
            setActionError(null); // Clear previous errors when showing input
        }
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pending Approvals</h1>

            {isLoading && <p className="text-gray-600">Loading pending items...</p>}
            {error && <p className="text-red-600 bg-red-50 p-3 rounded border border-red-200">{error}</p>}
            {actionError && <p className="text-red-600 bg-red-50 p-3 rounded border border-red-200 mb-4">{actionError}</p>}

            {!isLoading && !error && pendingItems.length === 0 && (
                <p className="text-gray-500 italic">No items currently pending approval.</p>
            )}

            {pendingItems.length > 0 && (
                <div className="space-y-6">
                    {pendingItems.map((item) => {
                        const docUrl = getItemDocumentUrl(item);
                        const displayTitle = getItemDisplayTitle(item);
                        const isRejectingThis = showRejectReasonInput === item.id;

                        return (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                                    {/* Item Details */}
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-indigo-600 uppercase">{item.itemType.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <p className="text-lg font-semibold text-gray-800 mt-1">{displayTitle}</p>
                                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                                            <p className="flex items-center gap-1">
                                                <UserCircleIcon className="h-4 w-4" />
                                                <span>{item.user.name ?? item.user.email ?? 'Unknown User'}</span>
                                            </p>
                                            <p className="flex items-center gap-1">
                                                <ClockIcon className="h-4 w-4" />
                                                <span>Submitted: {formatDate(item.createdAt)}</span>
                                            </p>
                                        </div>
                                        {docUrl && (
                                            <a
                                                href={docUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mt-3"
                                            >
                                                <PaperClipIcon className="h-4 w-4" /> View Document
                                            </a>
                                        )}
                                        {!docUrl && <p className="text-xs text-gray-400 italic mt-3">No document attached.</p>}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 flex-shrink-0 mt-2 sm:mt-0">
                                        <button
                                            onClick={() => handleApprove(item.id, item.itemType)}
                                            disabled={isPending || isRejectingThis} // Disable if rejecting this item
                                            className="inline-flex items-center justify-center gap-1 rounded-md bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <CheckCircleIcon className="h-4 w-4" /> Approve
                                        </button>
                                        <button
                                            onClick={() => toggleRejectInput(item.id)}
                                            disabled={isPending}
                                            className={`inline-flex items-center justify-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                                                isRejectingThis
                                                ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' // Active rejection state
                                                : 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500' // Default reject button state
                                            }`}
                                        >
                                            <XCircleIcon className="h-4 w-4" /> {isRejectingThis ? 'Cancel Reject' : 'Reject'}
                                        </button>
                                    </div>
                                </div>

                                {/* Rejection Reason Input Area (Conditional) */}
                                {isRejectingThis && (
                                    <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                                        <label htmlFor={`reason-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Reason for Rejection*
                                        </label>
                                        <textarea
                                            id={`reason-${item.id}`}
                                            rows={2}
                                            value={rejectionReason[item.id] || ''}
                                            onChange={(e) => handleReasonChange(item.id, e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm disabled:opacity-50"
                                            placeholder="Provide a clear reason..."
                                            disabled={isPending}
                                        />
                                        <button
                                            onClick={() => handleReject(item.id, item.itemType)}
                                            disabled={isPending || !rejectionReason[item.id]?.trim()}
                                            className="mt-2 inline-flex items-center justify-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
    );
}
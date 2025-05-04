// src/app/(protected)/(faculty)/documents/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link'; // Keep Link if needed for other navigation
import { getMyProfileData } from '@/lib/userActions'; // Action to fetch all profile data
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
} from '@/generated/prisma'; // Import specific types
import {
    DocumentTextIcon, PaperClipIcon, ExclamationTriangleIcon,
    AcademicCapIcon, BriefcaseIcon, IdentificationIcon, StarIcon, SparklesIcon, UsersIcon,
    PresentationChartBarIcon, BookOpenIcon // Add relevant icons
} from '@heroicons/react/24/outline';

// Define a type for the processed document list item
interface DocumentListItem {
    id: string; // ID of the parent CV item
    itemType: string; // User-friendly type name (e.g., "Academic Qualification")
    itemName: string; // Name of the parent CV item (e.g., degree, title)
    fileUrl: string; // URL of the document
    fileName: string; // Extracted file name
    icon: React.ElementType; // Icon associated with the item type
}

// Helper to get a display name for different item types (similar to dashboard)
function getItemName(item: any): string {
    return item.degree ?? item.examination ?? item.title ?? item.awardName ?? item.engagementTitle ?? item.researchTitle ?? item.paperTitle ?? item.position ?? item.organization ?? `Item ID: ${item.id}`;
}

// Helper to get the file URL and type info based on the CV item type
function getFileInfo(item: any, itemTypeName: string): { url: string | null | undefined, type: string, icon: React.ElementType } {
    switch (itemTypeName) {
        case 'Academic Qualification': return { url: item.diplomaFileUrl, type: itemTypeName, icon: AcademicCapIcon };
        case 'Professional License': return { url: item.licenseFileUrl, type: itemTypeName, icon: IdentificationIcon };
        case 'Work Experience': return { url: item.proofUrl, type: itemTypeName, icon: BriefcaseIcon };
        case 'Professional Affiliation': return { url: item.membershipProofUrl, type: itemTypeName, icon: UsersIcon };
        case 'Award/Recognition': return { url: item.certificateUrl, type: itemTypeName, icon: StarIcon };
        case 'Professional Development': return { url: item.certificateFileUrl, type: itemTypeName, icon: SparklesIcon };
        case 'Community Involvement': return { url: item.proofUrl, type: itemTypeName, icon: UsersIcon }; // Reusing UsersIcon
        case 'Publication': return { url: item.pdfUrl, type: itemTypeName, icon: BookOpenIcon };
        case 'Conference Presentation': return { url: item.proofUrl, type: itemTypeName, icon: PresentationChartBarIcon };
        default: return { url: null, type: 'Unknown', icon: DocumentTextIcon };
    }
}

// Helper to extract filename from URL
function getFileNameFromUrl(url: string | null | undefined): string {
    if (!url) return 'N/A';
    try {
        // Basic split, might need refinement for complex URLs
        const parts = url.split('/');
        const encodedName = parts[parts.length - 1];
        // Decode URI component to handle spaces etc. (%20)
        return decodeURIComponent(encodedName);
    } catch (e) {
        console.error("Error extracting filename:", e);
        return 'invalid_url';
    }
}


export default function DocumentsPage() {
    const { status: sessionStatus } = useSession();
    const [documentsList, setDocumentsList] = useState<DocumentListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            setIsLoading(true);
            setError(null);
            getMyProfileData()
                .then(data => {
                    if (data.error || !data.user) {
                        setError(data.error || 'Failed to load profile data for documents.');
                        setDocumentsList([]);
                    } else {
                        // Process data to extract documents
                        const processedDocs: DocumentListItem[] = [];
                        const sections = [
                            { data: data.academicQualifications, name: 'Academic Qualification' },
                            { data: data.professionalLicenses, name: 'Professional License' },
                            { data: data.workExperiences, name: 'Work Experience' },
                            { data: data.professionalAffiliations, name: 'Professional Affiliation' },
                            { data: data.awardsRecognitions, name: 'Award/Recognition' },
                            { data: data.professionalDevelopments, name: 'Professional Development' },
                            { data: data.communityInvolvements, name: 'Community Involvement' },
                            { data: data.publications, name: 'Publication' },
                            { data: data.conferencePresentations, name: 'Conference Presentation' },
                        ];

                        sections.forEach(section => {
                            (section.data ?? []).forEach((item: any) => {
                                const fileInfo = getFileInfo(item, section.name);
                                if (fileInfo.url) {
                                    processedDocs.push({
                                        id: item.id,
                                        itemType: fileInfo.type,
                                        itemName: getItemName(item),
                                        fileUrl: fileInfo.url,
                                        fileName: getFileNameFromUrl(fileInfo.url),
                                        icon: fileInfo.icon,
                                    });
                                }
                            });
                        });

                        // Optional: Sort documents, e.g., by type then name
                        processedDocs.sort((a, b) => {
                            if (a.itemType !== b.itemType) {
                                return a.itemType.localeCompare(b.itemType);
                            }
                            return a.itemName.localeCompare(b.itemName);
                        });

                        setDocumentsList(processedDocs);
                    }
                })
                .catch(err => {
                    console.error("Documents page fetch error:", err);
                    setError("An error occurred while loading documents.");
                    setDocumentsList([]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else if (sessionStatus === 'unauthenticated') {
            setIsLoading(false);
            setError("Access Denied. Please log in.");
        }
    }, [sessionStatus]); // Re-run effect when session status changes

    // --- Loading State ---
    if (isLoading || sessionStatus === 'loading') {
        return (
            <div className="p-6 flex items-center justify-center min-h-[calc(100vh-8rem)]"> {/* Adjusted height */}
                 <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading documents...</span>
                </div>
            </div>
        );
    }

    // --- Error or Unauthenticated State ---
    if (error || sessionStatus === 'unauthenticated') {
         return (
             <div className="p-6 text-center bg-red-50 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
                <ExclamationTriangleIcon className="h-10 w-10 text-red-400 mb-3" />
                 <p className="mb-4 text-lg font-semibold text-red-700">Access Denied or Error</p>
                 <p className="mb-5 text-red-600">{error || "You must be signed in to view this page."}</p>
                 <Link href="/login">
                     <button className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                         Go to Login
                     </button>
                 </Link>
             </div>
        );
    }

    // --- Display Document List ---
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <DocumentTextIcon className="h-7 w-7 text-green-600" />
                My Uploaded Documents
            </h1>

            {documentsList.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200 text-center text-gray-500 italic">
                    You have not uploaded any documents via your profile yet. Documents added to your CV sections will appear here.
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                    <ul role="list" className="divide-y divide-gray-200">
                        {documentsList.map((doc) => {
                            const IconComponent = doc.icon; // Get the icon component
                            return (
                                <li key={`${doc.id}-${doc.fileName}`} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <div className="flex items-center justify-between gap-4">
                                        {/* Icon, Type and Item Name */}
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <span className="inline-block rounded-md p-1.5 bg-gray-100 text-gray-600 flex-shrink-0">
                                                <IconComponent className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate" title={doc.itemName}>
                                                    {doc.itemName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Type: {doc.itemType}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Link to Document */}
                                        <div className="ml-4 flex-shrink-0">
                                            <a
                                                href={doc.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                                title={`View ${doc.fileName}`}
                                            >
                                                <PaperClipIcon className="h-3.5 w-3.5" aria-hidden="true" />
                                                View File
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
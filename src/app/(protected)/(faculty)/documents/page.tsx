// src/app/(protected)/(faculty)/documents/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getMyProfileData } from '@/lib/userActions';
import type {
    AcademicQualification, ProfessionalLicense, WorkExperience,
    ProfessionalAffiliation, AwardRecognition, ProfessionalDevelopment,
    CommunityInvolvement, Publication, ConferencePresentation
} from '@/generated/prisma';
import {
    DocumentMagnifyingGlassIcon, PaperClipIcon, ExclamationTriangleIcon, ChevronDownIcon, ChevronUpIcon,
    AcademicCapIcon, BriefcaseIcon, IdentificationIcon, StarIcon, SparklesIcon, UsersIcon,
    PresentationChartBarIcon, BookOpenIcon, InboxIcon, ArrowRightIcon, EyeIcon // Added EyeIcon
} from '@heroicons/react/24/outline';
import FilePreviewModal from '@/components/ui/FilePreviewModal'; // Import the new modal

interface DocumentListItem {
    id: string;
    itemType: string;
    itemName: string;
    fileUrl: string;
    fileName: string;
    icon: React.ElementType;
    categoryOrder: number;
}

type CvItem = AcademicQualification | ProfessionalLicense | WorkExperience |
    ProfessionalAffiliation | AwardRecognition | ProfessionalDevelopment |
    CommunityInvolvement | Publication | ConferencePresentation;

function getItemName(item: CvItem): string {
    if ('degree' in item && item.degree) return item.degree;
    if ('examination' in item && item.examination) return item.examination;
    if ('title' in item && item.title) return item.title;
    if ('awardName' in item && item.awardName) return item.awardName;
    if ('engagementTitle' in item && item.engagementTitle) return item.engagementTitle;
    if ('researchTitle' in item && item.researchTitle) return item.researchTitle;
    if ('paperTitle' in item && item.paperTitle) return item.paperTitle;
    if ('position' in item && item.position) return item.position;
    if ('organization' in item && item.organization) return item.organization;
    return `Item ID: ${item.id}`;
}

const categoryDisplayConfig: Record<string, { icon: React.ElementType, order: number, colorClasses: string }> = {
    'Academic Qualification': { icon: AcademicCapIcon, order: 1, colorClasses: "bg-spc-blue-lighter text-spc-blue-main ring-spc-blue-light/30" },
    'Professional License': { icon: IdentificationIcon, order: 2, colorClasses: "bg-lime-50 text-lime-600 ring-lime-200/50" },
    'Work Experience': { icon: BriefcaseIcon, order: 3, colorClasses: "bg-orange-50 text-orange-600 ring-orange-200/50" },
    'Professional Development': { icon: SparklesIcon, order: 4, colorClasses: "bg-yellow-50 text-yellow-600 ring-yellow-200/50" },
    'Award/Recognition': { icon: StarIcon, order: 5, colorClasses: "bg-indigo-50 text-indigo-600 ring-indigo-200/50" },
    'Publication': { icon: BookOpenIcon, order: 6, colorClasses: "bg-rose-50 text-rose-600 ring-rose-200/50" },
    'Conference Presentation': { icon: PresentationChartBarIcon, order: 7, colorClasses: "bg-purple-50 text-purple-600 ring-purple-200/50" },
    'Professional Affiliation': { icon: UsersIcon, order: 8, colorClasses: "bg-cyan-50 text-cyan-600 ring-cyan-200/50" },
    'Community Involvement': { icon: UsersIcon, order: 9, colorClasses: "bg-teal-50 text-teal-600 ring-teal-200/50" },
    'Unknown': { icon: DocumentMagnifyingGlassIcon, order: 10, colorClasses: "bg-gray-100 text-gray-600 ring-gray-300/50" }
};

function getFileInfo(item: CvItem, itemTypeName: string): { url: string | null | undefined, type: string, icon: React.ElementType, order: number, colorClasses: string } {
    const config = categoryDisplayConfig[itemTypeName] || categoryDisplayConfig['Unknown'];
    let url: string | null | undefined = null;
    switch (itemTypeName) {
        case 'Academic Qualification': url = (item as AcademicQualification).diplomaFileUrl; break;
        case 'Professional License': url = (item as ProfessionalLicense).licenseFileUrl; break;
        case 'Work Experience': url = (item as WorkExperience).proofUrl; break;
        case 'Professional Affiliation': url = (item as ProfessionalAffiliation).membershipProofUrl; break;
        case 'Award/Recognition': url = (item as AwardRecognition).certificateUrl; break;
        case 'Professional Development': url = (item as ProfessionalDevelopment).certificateFileUrl; break;
        case 'Community Involvement': url = (item as CommunityInvolvement).proofUrl; break;
        case 'Publication': url = (item as Publication).pdfUrl; break;
        case 'Conference Presentation': url = (item as ConferencePresentation).proofUrl; break;
    }
    return { url, type: itemTypeName, icon: config.icon, order: config.order, colorClasses: config.colorClasses };
}

function getFileNameFromUrl(url: string | null | undefined): string {
    if (!url) return 'N/A';
    try {
        const parts = url.split('/');
        const encodedName = parts[parts.length - 1];
        return decodeURIComponent(encodedName);
    } catch (e) {
        console.error("Error extracting filename:", e);
        return 'invalid_url_or_filename';
    }
}


export default function DocumentsPage() {
    const { status: sessionStatus } = useSession();
    const [documentsList, setDocumentsList] = useState<DocumentListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    // State for File Preview Modal
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [currentFileForPreview, setCurrentFileForPreview] = useState<{ url: string; name: string } | null>(null);

    const openPreviewModal = (fileUrl: string, fileName: string) => {
        setCurrentFileForPreview({ url: fileUrl, name: fileName });
        setIsPreviewModalOpen(true);
    };

    const closePreviewModal = () => {
        setIsPreviewModalOpen(false);
        setCurrentFileForPreview(null);
    };

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            setIsLoading(true);
            setError(null);
            getMyProfileData()
                .then(data => {
                    if ('error' in data) {
                        setError(data.error || 'Failed to load profile data for documents.');
                        setDocumentsList([]);
                    } else if (!data.user) {
                        setError('User details not found in profile data.');
                        setDocumentsList([]);
                    } else {
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

                        const initialExpanded = new Set<string>();
                        sections.forEach(section => {
                            (section.data ?? []).forEach((item: CvItem) => {
                                const fileInfo = getFileInfo(item, section.name);
                                if (fileInfo.url) {
                                    processedDocs.push({
                                        id: item.id,
                                        itemType: fileInfo.type,
                                        itemName: getItemName(item),
                                        fileUrl: fileInfo.url,
                                        fileName: getFileNameFromUrl(fileInfo.url),
                                        icon: fileInfo.icon,
                                        categoryOrder: fileInfo.order
                                    });
                                    initialExpanded.add(fileInfo.type);
                                }
                            });
                        });
                        setDocumentsList(processedDocs);
                        setExpandedCategories(initialExpanded);
                    }
                })
                .catch(err => {
                    console.error("Documents page fetch error:", err);
                    setError("An error occurred while loading documents.");
                    setDocumentsList([]);
                })
                .finally(() => setIsLoading(false));
        } else if (sessionStatus === 'unauthenticated') {
            setIsLoading(false);
            setError("Access Denied. Please log in.");
        }
    }, [sessionStatus]);

    const groupedDocuments = useMemo(() => {
        const groups: Record<string, DocumentListItem[]> = {};
        documentsList.forEach(doc => {
            if (!groups[doc.itemType]) groups[doc.itemType] = [];
            groups[doc.itemType].push(doc);
        });
        return Object.entries(groups)
            .sort(([typeA], [typeB]) => (categoryDisplayConfig[typeA]?.order || 99) - (categoryDisplayConfig[typeB]?.order || 99))
            .map(([type, docs]) => ({
                type,
                icon: categoryDisplayConfig[type]?.icon || DocumentMagnifyingGlassIcon,
                colorClasses: categoryDisplayConfig[type]?.colorClasses || categoryDisplayConfig['Unknown'].colorClasses,
                documents: docs.sort((a,b) => a.itemName.localeCompare(b.itemName))
            }));
    }, [documentsList]);

    const toggleCategory = (categoryType: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryType)) newSet.delete(categoryType);
            else newSet.add(categoryType);
            return newSet;
        });
    };

    if (isLoading || sessionStatus === 'loading') {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6 bg-spc-blue-lighter">
                <div className="flex items-center gap-3 text-gray-500">
                    <svg className="animate-spin h-6 w-6 text-spc-blue-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Loading your documents...</span>
                </div>
            </div>
        );
    }

    if (error || sessionStatus === 'unauthenticated') {
        return (
            <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 text-center bg-red-50">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-400 mb-4" />
                <p className="mb-4 text-xl font-semibold text-red-700">Access Denied or Error</p>
                <p className="mb-6 text-red-600">{error || "You must be signed in to view this page."}</p>
                <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105">
                    Go to Login <ArrowRightIcon className="h-4 w-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-spc-blue-lighter min-h-screen">
            <div className="mb-10 flex items-center gap-3">
                <DocumentMagnifyingGlassIcon className="h-8 w-8 text-spc-blue-main" />
                <h1 className="text-3xl font-bold tracking-tight text-spc-blue-darker">
                    My Uploaded Documents
                </h1>
            </div>

            {documentsList.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200/80">
                    <InboxIcon className="h-20 w-20 text-gray-300 mx-auto mb-5" />
                    <p className="text-xl font-semibold text-gray-600">No Documents Found</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Looks like you haven't uploaded any documents to your profile yet.
                    </p>
                    <Link href="/profile" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-spc-blue-main px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-spc-blue-darker focus:outline-none focus:ring-2 focus:ring-spc-blue-light focus:ring-offset-2 transform hover:scale-105">
                        Go to My Profile to Add Documents <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {groupedDocuments.map((group) => {
                        const CategoryIcon = group.icon;
                        const isExpanded = expandedCategories.has(group.type);
                        return (
                            <div key={group.type} className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                <button
                                    onClick={() => toggleCategory(group.type)}
                                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 transition-colors duration-200 hover:bg-gray-50/50"
                                    aria-expanded={isExpanded}
                                    aria-controls={`category-panel-${group.type.replace(/\s+/g, '-')}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`inline-flex items-center justify-center p-2.5 rounded-lg ring-1 ${group.colorClasses}`}>
                                            <CategoryIcon className="h-6 w-6" />
                                        </span>
                                        <h2 className="text-lg font-semibold text-spc-blue-darker">
                                            {group.type} ({group.documents.length})
                                        </h2>
                                    </div>
                                    {isExpanded ? <ChevronUpIcon className="h-6 w-6 text-gray-500" /> : <ChevronDownIcon className="h-6 w-6 text-gray-400" />}
                                </button>

                                {isExpanded && (
                                    <div id={`category-panel-${group.type.replace(/\s+/g, '-')}`} className="border-t border-gray-200">
                                        <ul role="list" className="divide-y divide-gray-100">
                                            {group.documents.map((doc) => (
                                                <li key={`${doc.id}-${doc.fileName}`} className="px-5 py-4 hover:bg-sky-50/30 transition duration-150 ease-in-out">
                                                    <div className="flex items-center justify-between gap-x-4 gap-y-2">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-800 truncate" title={doc.itemName}>
                                                                {doc.itemName}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-0.5">
                                                                File: <span className="font-mono">{doc.fileName}</span>
                                                            </p>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <button
                                                                type="button"
                                                                onClick={() => openPreviewModal(doc.fileUrl, doc.fileName)}
                                                                className="inline-flex items-center gap-1.5 rounded-lg bg-spc-blue-main px-3.5 py-2 text-xs font-semibold text-white shadow-md hover:bg-spc-blue-darker focus:outline-none focus:ring-2 focus:ring-spc-blue-light focus:ring-offset-1 transition-all duration-150 transform hover:scale-105"
                                                                title={`Preview ${doc.fileName}`}
                                                            >
                                                                <EyeIcon className="h-3.5 w-3.5" />
                                                                Preview File
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
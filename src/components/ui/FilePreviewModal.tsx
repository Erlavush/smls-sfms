// src/components/ui/FilePreviewModal.tsx
'use client';

import React, { useEffect, useMemo } from 'react';
import { XMarkIcon, ArrowTopRightOnSquareIcon, ArrowDownTrayIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface FilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string | null;
    fileName: string | null;
}

export default function FilePreviewModal({ isOpen, onClose, fileUrl, fileName }: FilePreviewModalProps) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const fileType = useMemo(() => {
        if (!fileUrl) return 'unknown';
        const extension = fileUrl.split('.').pop()?.toLowerCase();
        if (extension === 'pdf') return 'pdf';
        if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension || '')) return 'image';
        return 'other';
    }, [fileUrl]);

    if (!isOpen || !fileUrl || !fileName) {
        return null;
    }

    const renderPreviewContent = () => {
        switch (fileType) {
            case 'pdf':
                return (
                    <iframe
                        src={fileUrl}
                        title={fileName}
                        className="w-full h-full border-0"
                        // sandbox="allow-scripts allow-same-origin" // For enhanced security if PDFs are from less trusted sources
                    />
                );
            case 'image':
                return (
                    <div className="w-full h-full flex items-center justify-center p-4 bg-gray-800/50">
                        <img
                            src={fileUrl}
                            alt={fileName}
                            className="max-w-full max-h-full object-contain rounded-md shadow-lg"
                        />
                    </div>
                );
            default:
                return (
                    <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-gray-100">
                        <DocumentIcon className="h-24 w-24 text-gray-400 mb-4" />
                        <p className="text-lg font-semibold text-gray-700 mb-1">Preview not available</p>
                        <p className="text-sm text-gray-500">
                            This file type ({fileName.split('.').pop()?.toUpperCase() || 'Unknown'}) cannot be previewed directly.
                        </p>
                        <p className="text-sm text-gray-500 mt-1">You can download it or open it in a new tab.</p>
                    </div>
                );
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity duration-300 animate-fade-in-scale"
            aria-labelledby="file-preview-modal-title"
            role="dialog"
            aria-modal="true"
            onClick={onClose} // Close on backdrop click
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[85vh] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl flex flex-col transform transition-all duration-300 overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                        {fileType === 'image' ? <PhotoIcon className="h-5 w-5 text-spc-blue-main flex-shrink-0" /> : <DocumentIcon className="h-5 w-5 text-spc-blue-main flex-shrink-0" />}
                        <h3 className="text-md font-semibold text-spc-blue-darker truncate" id="file-preview-modal-title" title={fileName}>
                            {fileName}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                            href={fileUrl}
                            download={fileName}
                            className="inline-flex items-center gap-1.5 rounded-md bg-spc-blue-lighter px-3 py-1.5 text-xs font-semibold text-spc-blue-main hover:bg-spc-blue-light/20 focus:outline-none focus:ring-2 focus:ring-spc-blue-main focus:ring-offset-1 transition-colors"
                            title="Download file"
                        >
                            <ArrowDownTrayIcon className="h-4 w-4" />
                            Download
                        </a>
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-spc-blue-lighter px-3 py-1.5 text-xs font-semibold text-spc-blue-main hover:bg-spc-blue-light/20 focus:outline-none focus:ring-2 focus:ring-spc-blue-main focus:ring-offset-1 transition-colors"
                            title="Open in new tab"
                        >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            New Tab
                        </a>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-spc-blue-main focus:ring-offset-1 transition-colors"
                            aria-label="Close preview"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Content (Preview Area) */}
                <div className="flex-grow overflow-auto bg-gray-200"> {/* Added bg-gray-200 for contrast with iframe */}
                    {renderPreviewContent()}
                </div>
            </div>
        </div>
    );
}
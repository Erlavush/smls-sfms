// src/components/profile/AcademicQualificationDisplay.tsx
import React from 'react';
import type { AcademicQualification, ApprovalStatus } from '@/generated/prisma'; // Import ApprovalStatus
import { PaperClipIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// Helper function (can be moved to a utils file later)
const formatDateLocal = (date: string | Date | null | undefined): string => {
    if (!date) return 'N/A';
    try { return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); }
    catch (e) { return 'Invalid Date'; }
};

// Status Badge Component (can be moved to a shared UI folder)
const StatusBadge: React.FC<{ status: ApprovalStatus }> = ({ status }) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';
    let Icon = ClockIcon;

    switch (status) {
        case 'PENDING':
            bgColor = 'bg-yellow-100';
            textColor = 'text-yellow-800';
            Icon = ClockIcon;
            break;
        case 'APPROVED':
            bgColor = 'bg-green-100';
            textColor = 'text-green-800';
            Icon = CheckCircleIcon;
            break;
        case 'REJECTED':
            bgColor = 'bg-red-100';
            textColor = 'text-red-800';
            Icon = XCircleIcon;
            break;
    }

    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
            <Icon className="h-3 w-3" />
            {status}
        </span>
    );
};


interface Props {
    item: AcademicQualification; // Type already includes status/rejectionReason from Prisma
}

export default function AcademicQualificationDisplay({ item }: Props) {
    return (
        <div className="relative"> {/* Added relative positioning for badge */}
            {/* Status Badge - Positioned top-right */}
            <div className="absolute top-0 right-0">
                 <StatusBadge status={item.status} />
            </div>

            {/* Main Content */}
            <p className="font-semibold text-gray-800 pr-16">{item.degree || 'N/A'}</p> {/* Added padding-right */}
            <p className="text-gray-600">{item.institution || 'N/A'}{item.program ? ` - ${item.program}` : ''}</p>
            <p className="text-xs text-gray-500 mt-1">Completed: {item.yearCompleted || 'N/A'}</p>

            {/* Document Link */}
            {item.diplomaFileUrl && (
                 <a
                    href={item.diplomaFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1 truncate max-w-[200px]"
                    title={item.diplomaFileUrl}
                 >
                    <PaperClipIcon className="h-3 w-3 flex-shrink-0" /> View Document
                 </a>
            )}

            {/* Rejection Reason */}
            {item.status === 'REJECTED' && item.rejectionReason && (
                <div className="mt-2 flex items-start gap-1.5 rounded border border-red-200 bg-red-50 p-1.5 text-xs text-red-700">
                   <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 text-red-500 mt-0.5" />
                   <span><strong>Reason:</strong> {item.rejectionReason}</span>
                </div>
            )}
        </div>
    );
}
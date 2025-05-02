// src/components/profile/StatusDisplay.tsx
import React from 'react';
import type { ApprovalStatus } from '@/generated/prisma';
import { ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
    status: ApprovalStatus;
    rejectionReason?: string | null;
}

export default function StatusDisplay({ status, rejectionReason }: Props) {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-700';
    let iconColor = 'text-gray-500';
    let shadow = 'shadow-sm';
    let Icon = ClockIcon;
    let text = status;

    switch (status) {
        case 'PENDING':
            bgColor = 'bg-amber-100';
            textColor = 'text-amber-800';
            iconColor = 'text-amber-600';
            shadow = 'shadow-md shadow-amber-500/10';
            Icon = ClockIcon;
            break;
        case 'APPROVED':
            // Match template's approved style
            bgColor = 'bg-emerald-100'; // Lighter green
            textColor = 'text-emerald-800'; // Darker green text
            iconColor = 'text-emerald-600';
            shadow = 'shadow-lg shadow-emerald-500/20'; // Subtle green shadow
            Icon = CheckCircleIcon;
            break;
        case 'REJECTED':
            bgColor = 'bg-red-100';
            textColor = 'text-red-800';
            iconColor = 'text-red-600';
            shadow = 'shadow-md shadow-red-500/10';
            Icon = XCircleIcon;
            break;
    }

    return (
        <div className="flex flex-col items-end gap-1"> {/* Align status pill and reason */}
            <div
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${bgColor} ${textColor} ${shadow}`}
                title={status}
            >
                <Icon className={`h-4 w-4 ${iconColor}`} />
                {text}
            </div>
            {status === 'REJECTED' && rejectionReason && (
                 <div className="mt-1 flex items-start gap-1 rounded border border-red-200 bg-red-50 p-1.5 text-xs text-red-700 max-w-[200px] text-right"> {/* Added max-width */}
                    <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 text-red-500 mt-0.5" />
                    <span><strong>Reason:</strong> {rejectionReason}</span>
                 </div>
            )}
        </div>
    );
}
// src/components/ui/AestheticClock.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline'; // Using outline for consistency

const AestheticClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(timerId); // Cleanup on unmount
        };
    }, []);

    // Format time: e.g., 03:45:22 PM (with seconds)
    const timeString = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit', // Added seconds
        hour12: true,
    });

    // Format date: e.g., Thursday, May 16 (Year removed for a cleaner dashboard look, can be added back)
    const dateString = currentTime.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        // Main container: inline-flex to wrap content, styled with blur, shadow, etc.
        <div className="inline-flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/70">
            {/* Icon */}
            <ClockIcon className="h-8 w-8 sm:h-10 sm:w-10 text-spc-blue-main flex-shrink-0" />

            {/* Time and Date Text Block */}
            <div className="flex flex-col items-start"> {/* Aligns time/date text to the left */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-spc-blue-darker tracking-tight font-mono">
                    {/* font-mono gives the time a digital clock feel */}
                    {timeString}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {dateString}
                </div>
            </div>
        </div>
    );
};

export default AestheticClock;
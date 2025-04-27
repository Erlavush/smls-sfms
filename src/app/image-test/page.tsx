'use client'; // Required for potential state/hooks later if needed

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Ensure you have a valid image file named dot.png
// located directly in your project's /public directory
const IMAGE_SRC = "/dot.png";
const IMAGE_WIDTH = 100; // Example width
const IMAGE_HEIGHT = 100; // Example height

export default function ImageTestPage() {

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-6">Image Loading Test Page</h1>

            <p className="mb-4">
                This page attempts to load the image located at <code>{IMAGE_SRC}</code>
                (expected to be in the <code>/public</code> folder).
            </p>

            <hr className="my-6" />

            {/* Test Case 1: Standard next/image */}
            <div className="mb-8 p-4 border rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Test 1: Standard `next/image`</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Using default optimization. Should work if the file is valid and optimization is okay.
                </p>
                <div style={{ width: `${IMAGE_WIDTH}px`, height: `${IMAGE_HEIGHT}px`, position: 'relative', border: '1px dashed blue' }}>
                    <Image
                        src={IMAGE_SRC}
                        alt="Test Dot - Standard"
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        style={{ border: '1px solid red' }} // Add visible border to image itself
                        // Add onError for more feedback
                        onError={(e) => console.error(`Standard Image Error for ${IMAGE_SRC}:`, e)}
                    />
                </div>
                 <p className="text-xs mt-2">Container size: {IMAGE_WIDTH}x{IMAGE_HEIGHT}. Image border: red. Container border: blue dashed.</p>
            </div>

            {/* Test Case 2: next/image with unoptimized={true} */}
            <div className="mb-8 p-4 border rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Test 2: `next/image` with `unoptimized`</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Bypasses optimization. Should work if the file exists but optimization fails.
                </p>
                 <div style={{ width: `${IMAGE_WIDTH}px`, height: `${IMAGE_HEIGHT}px`, position: 'relative', border: '1px dashed blue' }}>
                    <Image
                        src={IMAGE_SRC}
                        alt="Test Dot - Unoptimized"
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        unoptimized={true} // Bypass optimization
                        style={{ border: '1px solid red' }}
                        onError={(e) => console.error(`Unoptimized Image Error for ${IMAGE_SRC}:`, e)}
                    />
                </div>
                <p className="text-xs mt-2">Container size: {IMAGE_WIDTH}x{IMAGE_HEIGHT}. Image border: red. Container border: blue dashed.</p>
            </div>

             {/* Test Case 3: Standard HTML <img> tag */}
            <div className="mb-8 p-4 border rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Test 3: Standard HTML `<img/>` tag</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Loads the image directly from the public folder, no Next.js processing. Should work if the file exists and the server serves static files correctly.
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={IMAGE_SRC}
                    alt="Test Dot - Standard img tag"
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    style={{ border: '1px solid red' }}
                    onError={(e) => console.error(`Standard <img> Error for ${IMAGE_SRC}:`, e.currentTarget.src)} // Note: error handling is slightly different
                />
                 <p className="text-xs mt-2">Explicit width/height set: {IMAGE_WIDTH}x{IMAGE_HEIGHT}. Image border: red.</p>
            </div>

            <hr className="my-6" />

            <Link href="/login" className="text-blue-600 hover:underline">
                ← Back to Login
            </Link>
        </div>
    );
}
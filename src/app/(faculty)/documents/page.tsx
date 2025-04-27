// src/app/(faculty)/documents/page.tsx
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

// We might need specific types for document data later
// import type { DocumentData } from '@/types';

export default function DocumentsPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="p-6">Loading documents page...</div>;
    }

    if (status === 'unauthenticated') {
        return <div className="p-6">Access Denied. Please sign in.</div>;
    }

    // Placeholder state for file handling (will expand later)
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [uploading, setUploading] = useState(false);
    // const [documents, setDocuments] = useState<DocumentData[]>([]); // To display existing docs

    // Placeholder function for upload logic
    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        // TODO: Implement actual file upload logic
        // - Get file from state
        // - Validate file type/size
        // - Send file to a backend API route or Server Action
        // - Handle response (success/error)
        // - Update the list of documents
        alert('Upload functionality not implemented yet.');
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-semibold text-[#003153]">
                My Documents & Credentials
            </h1>

            {/* Section for Uploading New Documents */}
            <div className="mb-8 rounded border border-gray-200 bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-medium text-gray-800">Upload New Document</h2>
                <form onSubmit={handleUpload}>
                    <div className="mb-4">
                        <label htmlFor="documentFile" className="mb-2 block text-sm font-medium text-gray-700">
                            Select File (.pdf, .png, .jpg)
                        </label>
                        <input
                            type="file"
                            id="documentFile"
                            name="documentFile"
                            accept=".pdf,.png,.jpg,.jpeg" // Specify accepted formats
                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-[#003153] file:px-4 file:py-2 file:text-white hover:file:bg-[#002742] disabled:opacity-50"
                            // onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                            required
                            disabled // Disable upload for now
                        />
                         {/* TODO: Add fields for document type/category (e.g., Academic, Seminar, Award) */}
                    </div>
                    <button
                        type="submit"
                        className="rounded bg-[#003153] px-4 py-2 text-white shadow hover:bg-[#002742] focus:outline-none focus:ring-2 focus:ring-[#003153] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled // Disable upload for now
                        // disabled={!selectedFile || uploading}
                    >
                        {/* {uploading ? 'Uploading...' : 'Upload Document'} */}
                        Upload Document (Coming Soon)
                    </button>
                </form>
            </div>

            {/* Section for Displaying Existing Documents */}
            <div className="rounded border border-gray-200 bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-medium text-gray-800">Uploaded Documents</h2>
                {/* TODO: Fetch and display list of user's documents */}
                <p className="text-gray-500">Your uploaded documents will appear here.</p>
                 {/* Example structure for later:
                 <ul className="space-y-2">
                    {documents.map((doc) => (
                        <li key={doc.id} className="flex justify-between items-center border-b pb-1">
                            <span>{doc.fileName} ({doc.category})</span>
                            <button className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                        </li>
                    ))}
                </ul>
                */}
            </div>
        </div>
    );
}
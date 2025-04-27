# SMLS-SFMS: Automated Skills and Faculty Management System


To develop an automated system for managing faculty CVs, skills, credentials, and documents for the School of Medical Laboratory Science (SMLS) at San Pedro College, replacing manual processes.

## TECHS USED

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v3)
*   **Database:** SQLite (via Prisma)
*   **Authentication:** NextAuth.js (Credentials, Prisma Adapter)

##

## Current STATUS

*   Core project setup complete.
*   Authentication (Login, Roles, Route Protection) implemented.
*   Faculty profile page allows viewing data.
*   Edit mode for profile implemented with local state management.
*   Basic Add/Delete/Save (including file uploads/deletes for new items) functional for **Academic Qualifications** section via server actions and FormData.
*   Other sections and Admin features are under development.


smls-sfms/
├── .env.local                  # Environment variables
├── .gitignore
├── create_context.ps1          # Context script (You might have this)
├── eslint.config.mjs           # ESLint config
├── next-env.d.ts               # Next.js TS declarations
├── next.config.ts              # Next.js config
├── package.json
├── package-lock.json           # Or yarn.lock
├── postcss.config.mjs          # PostCSS config (for Tailwind v3)
├── prisma/
│   ├── dev.db                  # SQLite database file
│   ├── migrations/
│   │   ├── ... (folders for each migration, including add_approval_status) ...
│   │   └── migration_lock.toml
│   └── schema.prisma           # Prisma schema definition (with approval status)
├── public/
│   ├── smls-logo.png           # SMLS logo file
│   └── spc-logo.png            # SPC logo file
│   └── dot.png                 # Test image file
│   └── favicon.ico             # Default favicon
│   └── uploads/                # Directory for local file uploads (gitignored)
│       ├── qualifications/     # Subdir for qualification uploads
│       │   └── [userId]/       # User-specific folders
│       ├── profdev/            # Subdir for prof dev uploads
│       │   └── [userId]/
│       ├── licenses/           # Subdir for license uploads
│       │   └── [userId]/
│       ├── workexp/            # Subdir for work experience uploads
│       │   └── [userId]/
│       ├── affiliations/       # Subdir for affiliation uploads
│       │   └── [userId]/
│       ├── awards/             # Subdir for award uploads
│       │   └── [userId]/
│       ├── community/          # Subdir for community involvement uploads
│       │   └── [userId]/
│       ├── publications/       # Subdir for publication uploads
│       │   └── [userId]/
│       └── presentations/      # Subdir for presentation uploads
│           └── [userId]/
├── project_context.txt         # Context script output (You might have this)
├── README.md
├── src/
│   ├── app/
│   │   ├── (auth)/             # Group for authentication routes
│   │   │   └── login/
│   │   │       └── page.tsx    # Login page component
│   │   ├── (protected)/        # << NEW: Group for protected routes
│   │   │   ├── (faculty)/      # << MOVED: Group for faculty routes
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx # Faculty dashboard component (Updated)
│   │   │   │   ├── documents/
│   │   │   │   │   └── page.tsx # Faculty documents page component
│   │   │   │   └── profile/
│   │   │   │       └── page.tsx # Faculty profile page component (Updated)
│   │   │   ├── admin/          # << MOVED: Group for admin routes
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx # Admin dashboard page
│   │   │   │   ├── approvals/
│   │   │   │   │   └── page.tsx # Admin approvals page (Created)
│   │   │   │   ├── faculty/
│   │   │   │   │   ├── page.tsx             # (Likely empty/stub) List faculty
│   │   │   │   │   └── [facultyId]/
│   │   │   │   │       └── page.tsx         # (Likely empty/stub) View/Edit specific faculty
│   │   │   │   └── matrix/
│   │   │   │       └── page.tsx    # (Likely empty/stub) Specialization matrix
│   │   │   └── layout.tsx        # << NEW: Shared layout for protected routes
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts # NextAuth configuration route
│   │   │   ├── documents/      # (Likely empty/stub) Potential API route
│   │   │   │   └── route.ts
│   │   │   └── faculty/        # (Likely empty/stub) Potential API route
│   │   │       └── route.ts
│   │   ├── image-test/         # (Can be removed if not needed)
│   │   │   └── page.tsx        # Image test page
│   │   ├── globals.css         # Global styles (Updated)
│   │   ├── layout.tsx          # Root layout component (Updated for Font)
│   │   └── page.tsx            # Homepage component
│   ├── components/
│   │   ├── profile/            # Folder for profile sub-components
│   │   │   ├── AcademicQualificationDisplay.tsx # (Updated for Status)
│   │   │   ├── AcademicQualificationForm.tsx
│   │   │   ├── AwardRecognitionDisplay.tsx      # (Needs Status Update)
│   │   │   ├── AwardRecognitionForm.tsx
│   │   │   ├── CommunityInvolvementDisplay.tsx  # (Needs Status Update)
│   │   │   ├── CommunityInvolvementForm.tsx
│   │   │   ├── ConferencePresentationDisplay.tsx# (Needs Status Update)
│   │   │   ├── ConferencePresentationForm.tsx
│   │   │   ├── ProfessionalAffiliationDisplay.tsx# (Needs Status Update)
│   │   │   ├── ProfessionalAffiliationForm.tsx
│   │   │   ├── ProfessionalDevelopmentDisplay.tsx# (Needs Status Update)
│   │   │   ├── ProfessionalDevelopmentForm.tsx
│   │   │   ├── ProfessionalLicenseDisplay.tsx   # (Needs Status Update)
│   │   │   ├── ProfessionalLicenseForm.tsx
│   │   │   ├── PublicationDisplay.tsx           # (Needs Status Update)
│   │   │   ├── PublicationForm.tsx
│   │   │   ├── WorkExperienceDisplay.tsx        # (Needs Status Update)
│   │   │   └── WorkExperienceForm.tsx
│   │   ├── providers/
│   │   │   └── NextAuthProvider.tsx # SessionProvider wrapper
│   │   └── ui/                   # << NEW: Folder for general UI elements
│   │       ├── Header.tsx        # << NEW: Header component (Updated)
│   │       └── Footer.tsx        # << NEW: Footer component (Updated)
│   ├── generated/
│   │   └── prisma/             # Prisma Client generated here
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── userActions.ts      # Server Actions (Updated for Status)
│   │   └── adminActions.ts     # << NEW: Server Actions for Admin
│   ├── middleware.ts           # Route protection & redirect middleware
│   └── types/
│       └── index.ts            # Shared type definitions (Updated for Status)
├── tailwind.config.ts          # Tailwind config (Updated for Font)
└── tsconfig.json               # TypeScript config
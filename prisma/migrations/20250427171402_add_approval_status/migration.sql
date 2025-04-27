-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AcademicQualification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "yearCompleted" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "diplomaFileUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "AcademicQualification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AcademicQualification" ("createdAt", "degree", "diplomaFileUrl", "id", "institution", "program", "updatedAt", "userId", "yearCompleted") SELECT "createdAt", "degree", "diplomaFileUrl", "id", "institution", "program", "updatedAt", "userId", "yearCompleted" FROM "AcademicQualification";
DROP TABLE "AcademicQualification";
ALTER TABLE "new_AcademicQualification" RENAME TO "AcademicQualification";
CREATE TABLE "new_AwardRecognition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "awardName" TEXT NOT NULL,
    "awardingBody" TEXT NOT NULL,
    "yearReceived" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "certificateUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "AwardRecognition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AwardRecognition" ("awardName", "awardingBody", "certificateUrl", "createdAt", "id", "updatedAt", "userId", "yearReceived") SELECT "awardName", "awardingBody", "certificateUrl", "createdAt", "id", "updatedAt", "userId", "yearReceived" FROM "AwardRecognition";
DROP TABLE "AwardRecognition";
ALTER TABLE "new_AwardRecognition" RENAME TO "AwardRecognition";
CREATE TABLE "new_CommunityInvolvement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "engagementTitle" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "locationDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "proofUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "CommunityInvolvement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CommunityInvolvement" ("createdAt", "engagementTitle", "id", "locationDate", "proofUrl", "role", "updatedAt", "userId") SELECT "createdAt", "engagementTitle", "id", "locationDate", "proofUrl", "role", "updatedAt", "userId" FROM "CommunityInvolvement";
DROP TABLE "CommunityInvolvement";
ALTER TABLE "new_CommunityInvolvement" RENAME TO "CommunityInvolvement";
CREATE TABLE "new_ConferencePresentation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paperTitle" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "dateLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "proofUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "ConferencePresentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ConferencePresentation" ("createdAt", "dateLocation", "eventName", "id", "paperTitle", "proofUrl", "updatedAt", "userId") SELECT "createdAt", "dateLocation", "eventName", "id", "paperTitle", "proofUrl", "updatedAt", "userId" FROM "ConferencePresentation";
DROP TABLE "ConferencePresentation";
ALTER TABLE "new_ConferencePresentation" RENAME TO "ConferencePresentation";
CREATE TABLE "new_ProfessionalAffiliation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organization" TEXT NOT NULL,
    "position" TEXT,
    "inclusiveYears" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "membershipProofUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "ProfessionalAffiliation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfessionalAffiliation" ("createdAt", "id", "inclusiveYears", "membershipProofUrl", "organization", "position", "updatedAt", "userId") SELECT "createdAt", "id", "inclusiveYears", "membershipProofUrl", "organization", "position", "updatedAt", "userId" FROM "ProfessionalAffiliation";
DROP TABLE "ProfessionalAffiliation";
ALTER TABLE "new_ProfessionalAffiliation" RENAME TO "ProfessionalAffiliation";
CREATE TABLE "new_ProfessionalDevelopment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "dateLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "certificateFileUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "ProfessionalDevelopment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfessionalDevelopment" ("certificateFileUrl", "createdAt", "dateLocation", "id", "organizer", "title", "updatedAt", "userId") SELECT "certificateFileUrl", "createdAt", "dateLocation", "id", "organizer", "title", "updatedAt", "userId" FROM "ProfessionalDevelopment";
DROP TABLE "ProfessionalDevelopment";
ALTER TABLE "new_ProfessionalDevelopment" RENAME TO "ProfessionalDevelopment";
CREATE TABLE "new_ProfessionalLicense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "examination" TEXT NOT NULL,
    "monthYear" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "expiration" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseFileUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "ProfessionalLicense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProfessionalLicense" ("createdAt", "examination", "expiration", "id", "licenseFileUrl", "licenseNumber", "monthYear", "updatedAt", "userId") SELECT "createdAt", "examination", "expiration", "id", "licenseFileUrl", "licenseNumber", "monthYear", "updatedAt", "userId" FROM "ProfessionalLicense";
DROP TABLE "ProfessionalLicense";
ALTER TABLE "new_ProfessionalLicense" RENAME TO "ProfessionalLicense";
CREATE UNIQUE INDEX "ProfessionalLicense_licenseNumber_key" ON "ProfessionalLicense"("licenseNumber");
CREATE TABLE "new_Publication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "researchTitle" TEXT NOT NULL,
    "journal" TEXT NOT NULL,
    "datePublished" DATETIME NOT NULL,
    "doiLink" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Publication" ("createdAt", "datePublished", "doiLink", "id", "journal", "pdfUrl", "researchTitle", "updatedAt", "userId") SELECT "createdAt", "datePublished", "doiLink", "id", "journal", "pdfUrl", "researchTitle", "updatedAt", "userId" FROM "Publication";
DROP TABLE "Publication";
ALTER TABLE "new_Publication" RENAME TO "Publication";
CREATE TABLE "new_WorkExperience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institution" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "natureOfWork" TEXT,
    "inclusiveYears" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "proofUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkExperience" ("createdAt", "id", "inclusiveYears", "institution", "natureOfWork", "position", "proofUrl", "updatedAt", "userId") SELECT "createdAt", "id", "inclusiveYears", "institution", "natureOfWork", "position", "proofUrl", "updatedAt", "userId" FROM "WorkExperience";
DROP TABLE "WorkExperience";
ALTER TABLE "new_WorkExperience" RENAME TO "WorkExperience";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

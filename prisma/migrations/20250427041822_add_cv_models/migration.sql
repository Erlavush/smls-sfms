-- CreateTable
CREATE TABLE "AcademicQualification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "yearCompleted" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AcademicQualification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfessionalLicense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "examination" TEXT NOT NULL,
    "monthYear" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "expiration" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProfessionalLicense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institution" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "natureOfWork" TEXT,
    "inclusiveYears" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfessionalAffiliation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organization" TEXT NOT NULL,
    "position" TEXT,
    "inclusiveYears" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProfessionalAffiliation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AwardRecognition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "awardName" TEXT NOT NULL,
    "awardingBody" TEXT NOT NULL,
    "yearReceived" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AwardRecognition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfessionalDevelopment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "dateLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ProfessionalDevelopment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommunityInvolvement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "engagementTitle" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "locationDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CommunityInvolvement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "researchTitle" TEXT NOT NULL,
    "journal" TEXT NOT NULL,
    "datePublished" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConferencePresentation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paperTitle" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "dateLocation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ConferencePresentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalLicense_licenseNumber_key" ON "ProfessionalLicense"("licenseNumber");

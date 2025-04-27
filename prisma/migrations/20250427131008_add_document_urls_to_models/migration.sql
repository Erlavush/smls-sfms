-- AlterTable
ALTER TABLE "AwardRecognition" ADD COLUMN "certificateUrl" TEXT;

-- AlterTable
ALTER TABLE "CommunityInvolvement" ADD COLUMN "proofUrl" TEXT;

-- AlterTable
ALTER TABLE "ConferencePresentation" ADD COLUMN "proofUrl" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalAffiliation" ADD COLUMN "membershipProofUrl" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalLicense" ADD COLUMN "licenseFileUrl" TEXT;

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN "doiLink" TEXT;
ALTER TABLE "Publication" ADD COLUMN "pdfUrl" TEXT;

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN "proofUrl" TEXT;

// prisma/seed.js
// Creates 'Prof. Ken Neutron' - focusing on Physics, Instrumentation, Safety

// Use the direct path that worked before
const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed script for Prof. Ken Neutron...");

  // Clear existing data first
  console.log("Clearing existing data...");
  await clearExistingData();
  console.log("Existing data cleared.");

  // Create the new faculty user
  console.log("Creating faculty user Prof. Ken Neutron...");
  const facultyUser = await createFacultyUser();
  console.log(`Faculty user ${facultyUser.email} created (ID: ${facultyUser.id}).`);

  // Add CV details
  console.log("Adding academic qualifications...");
  await addAcademicQualifications(facultyUser.id);
  console.log("Adding professional licenses...");
  await addProfessionalLicenses(facultyUser.id);
  console.log("Adding work experiences...");
  await addWorkExperiences(facultyUser.id);
  console.log("Adding professional affiliations...");
  await addProfessionalAffiliations(facultyUser.id);
  console.log("Adding awards/recognitions...");
  await addAwardsRecognitions(facultyUser.id);
  console.log("Adding professional developments...");
  await addProfessionalDevelopments(facultyUser.id);
  console.log("Adding community involvements...");
  await addCommunityInvolvements(facultyUser.id);
  console.log("Adding publications...");
  await addPublications(facultyUser.id);
  console.log("Adding conference presentations...");
  await addConferencePresentations(facultyUser.id);

  console.log(`Seeding finished for Prof. Ken Neutron.`);
}

async function clearExistingData() {
  // Delete all existing records in reverse order of dependencies
  await prisma.conferencePresentation.deleteMany({});
  await prisma.publication.deleteMany({});
  await prisma.communityInvolvement.deleteMany({});
  await prisma.professionalDevelopment.deleteMany({});
  await prisma.awardRecognition.deleteMany({});
  await prisma.professionalAffiliation.deleteMany({});
  await prisma.workExperience.deleteMany({});
  await prisma.professionalLicense.deleteMany({});
  await prisma.academicQualification.deleteMany({});
  await prisma.user.deleteMany({});
}

async function createFacultyUser() {
  const hashedPassword = await bcrypt.hash('neutronPass456', 10); // Different password

  return prisma.user.create({
    data: {
      name: 'Prof. Ken Neutron', // Different name
      email: 'ken.neutron@spcdavao.edu.ph', // Different email
      password: hashedPassword,
      role: 'FACULTY', // Use string literal
    }
  });
}

async function addAcademicQualifications(userId) {
  await prisma.academicQualification.createMany({
    data: [
      {
        userId,
        degree: 'MS Physics',
        institution: 'National Institute of Physics',
        program: 'Applied Physics',
        yearCompleted: 2014,
        diplomaFileUrl: null,
        status: 'APPROVED' // Use string literal
      },
      {
        userId,
        degree: 'BS Medical Technology',
        institution: 'San Pedro College',
        program: 'Medical Technology',
        yearCompleted: 2010,
        diplomaFileUrl: null,
        status: 'APPROVED'
      }
    ]
  });
}

async function addProfessionalLicenses(userId) {
  await prisma.professionalLicense.createMany({
    data: [
      {
        userId,
        examination: 'Medical Technologist Licensure',
        monthYear: 'March 2011',
        licenseNumber: '0246810',
        expiration: new Date('2025-03-15'),
        licenseFileUrl: null,
        status: 'APPROVED'
      },
      {
        userId,
        examination: 'Radiation Safety Officer Training', // Different type of cert/license
        monthYear: 'July 2018',
        licenseNumber: 'RSO-KN-001',
        expiration: new Date('2026-07-31'), // Example expiry
        licenseFileUrl: null,
        status: 'APPROVED'
      }
    ]
  });
}

async function addWorkExperiences(userId) {
  await prisma.workExperience.createMany({
    data: [
      {
        userId,
        institution: 'San Pedro College',
        position: 'Instructor / Lab Safety Officer',
        natureOfWork: 'Teaching Physics for Health Sciences, Managing Lab Safety Protocols',
        inclusiveYears: '2015-Present',
        proofUrl: null,
        status: 'APPROVED'
      },
      {
        userId,
        institution: 'BioInstrumentation Inc.',
        position: 'Field Service Engineer',
        natureOfWork: 'Calibration and Maintenance of Laboratory Equipment',
        inclusiveYears: '2011-2015',
        proofUrl: null,
        status: 'APPROVED'
      }
    ]
  });
}

async function addProfessionalAffiliations(userId) {
  await prisma.professionalAffiliation.createMany({
    data: [
      {
        userId,
        organization: 'Philippine Association of Medical Technologists (PAMET)',
        position: 'Member',
        inclusiveYears: '2011-Present',
        membershipProofUrl: null,
        status: 'APPROVED'
      },
      {
        userId,
        organization: 'Samahang Pisika ng Pilipinas (SPP)', // Physics Association
        position: 'Associate Member',
        inclusiveYears: '2016-Present',
        membershipProofUrl: null,
        status: 'PENDING' // Example pending
      }
    ]
  });
}

async function addAwardsRecognitions(userId) {
  // Maybe fewer awards for this profile
  await prisma.awardRecognition.createMany({
    data: [
      {
        userId,
        awardName: 'Laboratory Safety Excellence Award',
        awardingBody: 'SPC Safety Committee',
        yearReceived: 2021,
        certificateUrl: null,
        status: 'APPROVED'
      }
    ]
  });
}

async function addProfessionalDevelopments(userId) {
  await prisma.professionalDevelopment.createMany({
    data: [
      {
        userId,
        title: 'Training on Calibration of Spectrophotometers',
        organizer: 'Precision Instruments Ltd.',
        dateLocation: 'August 2022, Online',
        certificateFileUrl: null,
        status: 'APPROVED'
      },
      {
        userId,
        title: 'Seminar on Occupational Safety and Health in Laboratories',
        organizer: 'DOLE / OSHC',
        dateLocation: 'April 2023, Davao City',
        certificateFileUrl: null,
        status: 'APPROVED'
      },
      {
        userId,
        title: 'Modern Physics Applications in Medicine',
        organizer: 'SPP Annual Convention',
        dateLocation: 'October 2023, Cebu City',
        certificateFileUrl: null,
        status: 'REJECTED', // Example rejected
        rejectionReason: 'Certificate unclear.'
      }
    ]
  });
}

async function addCommunityInvolvements(userId) {
  // Maybe less community involvement for this profile
  await prisma.communityInvolvement.createMany({
    data: [
      {
        userId,
        engagementTitle: 'Career Talk: Medical Technology',
        role: 'Speaker',
        locationDate: 'Davao City National High School, Feb 2023',
        proofUrl: null,
        status: 'APPROVED'
      }
    ]
  });
}

async function addPublications(userId) {
  // Maybe no publications for this profile yet
  // You can leave this function call out or pass an empty array if desired
  // await prisma.publication.createMany({ data: [] });
  console.log("Skipping publications for this user.");
}

async function addConferencePresentations(userId) {
  await prisma.conferencePresentation.createMany({
    data: [
      {
        userId,
        paperTitle: 'Implementing Enhanced Safety Protocols in a University MedTech Laboratory', // Poster presentation maybe
        eventName: 'PAMET Davao Chapter Annual Meeting - Poster Session',
        dateLocation: 'November 2022, Davao City',
        proofUrl: null,
        status: 'APPROVED'
      }
    ]
  });
}

// --- Main execution ---
main()
  .catch((e) => {
    console.error("Seeding script failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting Prisma Client...");
    await prisma.$disconnect();
    console.log("Prisma Client disconnected.");
  });
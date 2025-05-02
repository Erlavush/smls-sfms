// prisma/add_faculty.cjs
// Adds ONE faculty user ('Prof. Ken Neutron') with details.
// IMPORTANT: Does NOT delete existing data.

// Use the direct path that worked before
const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// --- Configuration for this specific faculty ---
const facultyEmail = 'faculty2@test.com';
const facultyPassword = 'password123'; // Choose a password
const facultyName = 'Prof. Ken Neutron';
// --- End Configuration ---


async function main() {
  console.log(`Starting script to add faculty: ${facultyEmail}`);

  // 1. Check if this specific faculty user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: facultyEmail },
  });

  if (existingUser) {
    console.log(`Faculty user with email ${facultyEmail} already exists. Skipping creation.`);
    return; // Exit if this user exists
  }

  // --- Create the Faculty User ---
  console.log(`Creating faculty user ${facultyEmail}...`);
  const facultyUser = await createFacultyUser();
  if (!facultyUser) {
      // Error handled within createFacultyUser
      return;
  }
  console.log(`Faculty user ${facultyUser.email} created (ID: ${facultyUser.id}).`);


  // --- Add CV details ---
  // Wrap additions in try...catch in case user creation succeeded but CV fails
  try {
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

      console.log(`Successfully added CV details for ${facultyEmail}.`);

  } catch(error) {
      console.error(`Error adding CV details for ${facultyEmail} (User was created but CV data failed):`, error);
      // Decide if you want to delete the user if CV fails, or leave them partially created
      // await prisma.user.delete({ where: { id: facultyUser.id }});
      // console.log(`Cleaned up partially created user ${facultyEmail}.`);
      process.exit(1);
  }

  console.log(`Script finished for adding ${facultyEmail}.`);
}


// --- Helper Functions (Copied from previous seed, NO clearExistingData) ---

async function createFacultyUser() {
  try {
      const hashedPassword = await bcrypt.hash(facultyPassword, 10);
      console.log(`Password hashed for ${facultyEmail}.`);

      return await prisma.user.create({
        data: {
          name: facultyName,
          email: facultyEmail.toLowerCase().trim(),
          password: hashedPassword,
          role: 'FACULTY', // Use string literal
        },
        select: { id: true, email: true } // Select only needed fields
      });
  } catch (error) {
      console.error(`Error during faculty user creation (${facultyEmail}):`, error);
      // Handle potential unique constraint violation gracefully if check missed somehow
      if (error.code === 'P2002') {
          console.error(`Error: Email ${facultyEmail} already exists (constraint violation).`);
      }
      return null; // Indicate failure
  }
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
        licenseNumber: '0246810', // Ensure this is unique if needed
        expiration: new Date('2025-03-15'),
        licenseFileUrl: null,
        status: 'APPROVED'
      },
      {
        userId,
        examination: 'Radiation Safety Officer Training',
        monthYear: 'July 2018',
        licenseNumber: 'RSO-KN-001', // Ensure this is unique if needed
        expiration: new Date('2026-07-31'),
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
        organization: 'Samahang Pisika ng Pilipinas (SPP)',
        position: 'Associate Member',
        inclusiveYears: '2016-Present',
        membershipProofUrl: null,
        status: 'PENDING'
      }
    ]
  });
}

async function addAwardsRecognitions(userId) {
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
        status: 'REJECTED',
        rejectionReason: 'Certificate unclear.'
      }
    ]
  });
}

async function addCommunityInvolvements(userId) {
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
  // No publications for this user in this example
  console.log("Skipping publications for this user.");
}

async function addConferencePresentations(userId) {
  await prisma.conferencePresentation.createMany({
    data: [
      {
        userId,
        paperTitle: 'Implementing Enhanced Safety Protocols in a University MedTech Laboratory',
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
    console.error("Script execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting Prisma Client...");
    await prisma.$disconnect();
    console.log("Prisma Client disconnected.");
  });
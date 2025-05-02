// prisma/add_faculty_hematology.cjs
// Adds 'Dr. Heidi Hematology' with placeholder file URLs.
// IMPORTANT: Does NOT delete existing data. Files won't actually exist.

const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// --- Configuration ---
const facultyEmail = 'faculty1@test.com';
const facultyPassword = 'password123';
const facultyName = 'Dr. Heidi Hematology';
// --- End Configuration ---

async function main() {
  console.log(`Starting script to add faculty: ${facultyEmail}`);

  const existingUser = await prisma.user.findUnique({
    where: { email: facultyEmail },
  });

  if (existingUser) {
    console.log(`Faculty user with email ${facultyEmail} already exists. Skipping creation.`);
    return;
  }

  console.log(`Creating faculty user ${facultyEmail}...`);
  const facultyUser = await createFacultyUser();
  if (!facultyUser) { return; }
  console.log(`Faculty user ${facultyUser.email} created (ID: ${facultyUser.id}).`);

  // --- Add CV details (Pass userId for dummy URLs) ---
  try {
      console.log("Adding academic qualifications...");
      await addAcademicQualifications(facultyUser.id); // Pass ID
      console.log("Adding professional licenses...");
      await addProfessionalLicenses(facultyUser.id); // Pass ID
      console.log("Adding work experiences...");
      await addWorkExperiences(facultyUser.id); // Pass ID
      console.log("Adding professional affiliations...");
      await addProfessionalAffiliations(facultyUser.id); // Pass ID
      console.log("Adding awards/recognitions...");
      await addAwardsRecognitions(facultyUser.id); // Pass ID
      console.log("Adding professional developments...");
      await addProfessionalDevelopments(facultyUser.id); // Pass ID
      console.log("Skipping community involvements for this user.");
      console.log("Skipping publications for this user.");
      console.log("Adding conference presentations...");
      await addConferencePresentations(facultyUser.id); // Pass ID

      console.log(`Successfully added CV details for ${facultyEmail}.`);

  } catch(error) {
      console.error(`Error adding CV details for ${facultyEmail} (User created but CV data failed):`, error);
      process.exit(1);
  }

  console.log(`Script finished for adding ${facultyEmail}.`);
}

// --- Helper Functions ---

async function createFacultyUser() {
    // ... (createFacultyUser function remains the same) ...
    try {
        const hashedPassword = await bcrypt.hash(facultyPassword, 10);
        console.log(`Password hashed for ${facultyEmail}.`);

        return await prisma.user.create({
            data: {
            name: facultyName,
            email: facultyEmail.toLowerCase().trim(),
            password: hashedPassword,
            role: 'FACULTY',
            },
            select: { id: true, email: true }
        });
    } catch (error) {
        console.error(`Error during faculty user creation (${facultyEmail}):`, error);
        if (error.code === 'P2002') {
            console.error(`Error: Email ${facultyEmail} already exists (constraint violation).`);
        }
        return null;
    }
}

// --- Modified Helper functions to include dummy URLs ---

async function addAcademicQualifications(userId) { // Accept userId
  await prisma.academicQualification.createMany({
    data: [
      {
        userId,
        degree: 'MS Medical Technology',
        institution: 'University of Santo Tomas',
        program: 'Specialization in Hematology',
        yearCompleted: 2016,
        // Example placeholder URL
        diplomaFileUrl: `/uploads/qualifications/${userId}/dummy-ms-diploma.pdf`,
        status: 'APPROVED'
      },
      {
        userId,
        degree: 'BS Medical Technology',
        institution: 'San Pedro College',
        program: 'Medical Technology',
        yearCompleted: 2013,
        // Example placeholder URL
        diplomaFileUrl: `/uploads/qualifications/${userId}/dummy-bs-diploma.pdf`,
        status: 'APPROVED'
      }
    ]
  });
}

async function addProfessionalLicenses(userId) { // Accept userId
  await prisma.professionalLicense.createMany({
    data: [
      {
        userId,
        examination: 'Medical Technologist Licensure',
        monthYear: 'August 2013',
        licenseNumber: '0369121',
        expiration: new Date('2027-08-20'),
        // Example placeholder URL
        licenseFileUrl: `/uploads/licenses/${userId}/dummy-rmt-license.png`,
        status: 'APPROVED'
      },
      {
        userId,
        examination: 'Blood Bank Specialist (ASCP)',
        monthYear: 'November 2019',
        licenseNumber: 'SBB-HH-002',
        expiration: new Date('2026-11-30'),
        // Example placeholder URL
        licenseFileUrl: `/uploads/licenses/${userId}/dummy-sbb-cert.pdf`,
        status: 'APPROVED'
      }
    ]
  });
}

async function addWorkExperiences(userId) { // Accept userId
   await prisma.workExperience.createMany({
    data: [
      {
        userId,
        institution: 'San Pedro College',
        position: 'Instructor',
        natureOfWork: 'Teaching Hematology, Immunohematology & Serology',
        inclusiveYears: '2017-Present',
        // Example placeholder URL
        proofUrl: `/uploads/workexp/${userId}/dummy-spc-coe.pdf`,
        status: 'APPROVED'
      },
      {
        userId,
        institution: 'Southern Philippines Medical Center - Blood Bank',
        position: 'Medical Technologist II',
        natureOfWork: 'Blood banking procedures, component preparation, compatibility testing',
        inclusiveYears: '2014-2017',
        // Example placeholder URL
        proofUrl: `/uploads/workexp/${userId}/dummy-spmc-coe.jpg`,
        status: 'APPROVED'
      }
    ]
  });
}

async function addProfessionalAffiliations(userId) { // Accept userId
  await prisma.professionalAffiliation.createMany({
    data: [
      {
        userId,
        organization: 'Philippine Association of Medical Technologists (PAMET)',
        position: 'Member, Committee on Hematology',
        inclusiveYears: '2013-Present',
        // Example placeholder URL
        membershipProofUrl: `/uploads/affiliations/${userId}/dummy-pamet-id.png`,
        status: 'APPROVED'
      },
      {
        userId,
        organization: 'Philippine Blood Coordinating Council (PBCC)',
        position: 'Affiliate Member',
        inclusiveYears: '2018-Present',
        // Example placeholder URL (optional, could be null)
        membershipProofUrl: `/uploads/affiliations/${userId}/dummy-pbcc-cert.pdf`,
        status: 'APPROVED'
      }
    ]
  });
}

async function addAwardsRecognitions(userId) { // Accept userId
  await prisma.awardRecognition.createMany({
    data: [
      {
        userId,
        awardName: 'Excellence in Teaching - Junior Faculty',
        awardingBody: 'San Pedro College - Academic Council',
        yearReceived: 2020,
        // Example placeholder URL
        certificateUrl: `/uploads/awards/${userId}/dummy-teaching-award.pdf`,
        status: 'APPROVED'
      }
    ]
  });
}

async function addProfessionalDevelopments(userId) { // Accept userId
   await prisma.professionalDevelopment.createMany({
    data: [
      {
        userId,
        title: 'Advanced Concepts in Immunohematology',
        organizer: 'PBCC National Convention',
        dateLocation: 'May 2023, Iloilo City',
        // Example placeholder URL
        certificateFileUrl: `/uploads/profdev/${userId}/dummy-pbcc-cert.pdf`,
        status: 'APPROVED'
      },
      {
        userId,
        title: 'Flow Cytometry Principles and Applications',
        organizer: 'Hematology Experts Inc.',
        dateLocation: 'September 2022, Online',
        // Example placeholder URL
        certificateFileUrl: `/uploads/profdev/${userId}/dummy-flowcyto-cert.png`,
        status: 'APPROVED'
      }
    ]
  });
}

async function addCommunityInvolvements(userId) { // Accept userId
  // Skipping for this user
  console.log("Skipping community involvements for this user.");
}

async function addPublications(userId) { // Accept userId
  // Skipping for this user
  console.log("Skipping publications for this user.");
}

async function addConferencePresentations(userId) { // Accept userId
  await prisma.conferencePresentation.createMany({
    data: [
      {
        userId,
        paperTitle: 'Case Study: Rare Blood Group Antigen Identification',
        eventName: 'PAMET Southern Mindanao Regional Conference',
        dateLocation: 'July 2023, General Santos City',
        // Example placeholder URL
        proofUrl: `/uploads/presentations/${userId}/dummy-pamet-poster-proof.pdf`,
        status: 'PENDING'
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
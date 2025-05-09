// prisma/add_dummy_faculty_1.cjs
// Adds 'Dr. Adam Apple' with email faculty1@test.com and varied CV data.
// IMPORTANT: Does NOT delete existing data. Files won't actually exist.

const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// --- Configuration for Dummy Faculty 1 ---
const facultyEmail = 'faculty1@test.com';
const facultyPassword = 'password123';    // Uniform password
const facultyName = 'Dr. Adam Apple';
// --- End Configuration ---

async function main() {
  console.log(`Starting script to add dummy faculty: ${facultyName} (${facultyEmail})`);

  const existingUser = await prisma.user.findUnique({
    where: { email: facultyEmail },
  });

  if (existingUser) {
    console.log(`Faculty user with email ${facultyEmail} already exists. Skipping creation.`);
    await prisma.$disconnect();
    return;
  }

  console.log(`Creating faculty user ${facultyEmail}...`);
  const hashedPassword = await bcrypt.hash(facultyPassword, 10);
  const facultyUser = await prisma.user.create({
    data: {
      name: facultyName,
      email: facultyEmail.toLowerCase().trim(),
      password: hashedPassword,
      role: 'FACULTY',
    },
    select: { id: true, email: true }
  });
  console.log(`Faculty user ${facultyUser.email} created (ID: ${facultyUser.id}).`);

  const userId = facultyUser.id;

  // --- Add CV details ---
  try {
    console.log("Adding academic qualifications...");
    await prisma.academicQualification.createMany({
      data: [
        { userId, degree: 'PhD in Fictional Science', institution: 'Testville University', program: 'Advanced Theories', yearCompleted: 2018, diplomaFileUrl: `/uploads/qualifications/${userId}/phd_fictional_apple.pdf`, status: 'APPROVED' },
        { userId, degree: 'MS in Imaginary Studies', institution: 'Placeholder College', program: 'Core Concepts', yearCompleted: 2015, diplomaFileUrl: `/uploads/qualifications/${userId}/ms_imaginary_apple.pdf`, status: 'PENDING' },
        { userId, degree: 'BS in Applied Logic', institution: 'Logic Institute', program: 'Critical Thinking', yearCompleted: 2012, diplomaFileUrl: `/uploads/qualifications/${userId}/bs_logic_apple.pdf`, status: 'APPROVED' },
      ]
    });

    console.log("Adding professional licenses...");
    await prisma.professionalLicense.createMany({
      data: [
        { userId, examination: 'Certified Idea Implementer (CII)', monthYear: 'July 2019', licenseNumber: `CII-AA-${Math.floor(100000 + Math.random() * 900000)}`, expiration: new Date('2029-07-31'), licenseFileUrl: `/uploads/licenses/${userId}/cii_apple.pdf`, status: 'APPROVED' },
        { userId, examination: 'Registered Test Data Analyst (RTDA)', monthYear: 'Jan 2016', licenseNumber: `RTDA-AA-${Math.floor(10000 + Math.random() * 90000)}`, expiration: new Date('2026-01-31'), licenseFileUrl: `/uploads/licenses/${userId}/rtda_apple.png`, status: 'APPROVED' },
      ]
    });

    console.log("Adding work experiences...");
    await prisma.workExperience.createMany({
      data: [
        { userId, institution: 'Innovate Solutions Ltd.', position: 'Lead Thinker', natureOfWork: 'Developing conceptual frameworks and strategic plans.', inclusiveYears: '2020-Present', proofUrl: `/uploads/workexp/${userId}/innovate_coe_apple.pdf`, status: 'APPROVED' },
        { userId, institution: 'Old School Corp.', position: 'Junior Analyst', natureOfWork: 'Data collection and report generation.', inclusiveYears: '2018-2020', proofUrl: `/uploads/workexp/${userId}/oldschool_coe_apple.jpg`, status: 'REJECTED', rejectionReason: "Proof of employment unclear." },
        { userId, institution: 'Data Insights Group', position: 'Research Assistant', natureOfWork: 'Assisted in market research projects.', inclusiveYears: '2015-2018', proofUrl: `/uploads/workexp/${userId}/datainsights_coe_apple.pdf`, status: 'PENDING' },
      ]
    });

    console.log("Adding professional affiliations...");
    await prisma.professionalAffiliation.createMany({
      data: [
        { userId, organization: 'Global Thinkers Association (GTA)', position: 'Member', inclusiveYears: '2019-Present', membershipProofUrl: `/uploads/affiliations/${userId}/gta_apple.pdf`, status: 'APPROVED' },
        { userId, organization: 'Institute of Fictional Sciences (IFS)', position: 'Associate', inclusiveYears: '2017-Present', membershipProofUrl: null, status: 'APPROVED' },
      ]
    });

    console.log("Adding awards/recognitions...");
    await prisma.awardRecognition.createMany({
      data: [
        { userId, awardName: 'Top Innovator Award', awardingBody: 'Innovate Solutions Ltd.', yearReceived: 2022, certificateUrl: `/uploads/awards/${userId}/top_innovator_apple.pdf`, status: 'APPROVED' },
      ]
    });

    console.log("Adding professional developments...");
    await prisma.professionalDevelopment.createMany({
      data: [
        { userId, title: 'Advanced Conceptualization Workshop', organizer: 'ThinkTank International', dateLocation: 'Nov 2023, Online', certificateFileUrl: `/uploads/profdev/${userId}/conceptualization_apple.pdf`, status: 'APPROVED' },
        { userId, title: 'Data Analysis Bootcamp', organizer: 'StatWizards Academy', dateLocation: 'June 2021, Virtual', certificateFileUrl: `/uploads/profdev/${userId}/data_bootcamp_apple.png`, status: 'PENDING' },
      ]
    });

    // --- Linking to Specializations (Example) ---
    // Ensure these specializations exist in your DB.
    const specsToLink = ['Physics', 'Hematology']; // You can change these as needed
    for (const specName of specsToLink) {
        const spec = await prisma.specialization.findUnique({ where: { name: specName } });
        if (spec) {
            console.log(`Linking to '${specName}' specialization...`);
            await prisma.user.update({
                where: { id: userId },
                data: { specializations: { connect: { id: spec.id } } }
            });
        } else {
            console.warn(`Specialization '${specName}' not found. Skipping linking for this user.`);
        }
    }

    console.log(`Successfully added CV details for ${facultyEmail}.`);

  } catch (error) {
    console.error(`Error adding CV details for ${facultyEmail} (User created but CV data failed):`, error);
    process.exit(1);
  } finally {
    console.log("Disconnecting Prisma Client...");
    await prisma.$disconnect();
    console.log("Prisma Client disconnected.");
  }
}

main()
  .catch(async (e) => {
    console.error("Script execution failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
// prisma/add_dummy_faculty_4.cjs
// Adds 'Ms. Diana Evans' with email faculty4@test.com

const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// --- Configuration ---
const facultyEmail = 'faculty4@test.com';
const facultyPassword = 'password123';
const facultyName = 'Ms. Diana Evans';
// --- End Configuration ---

async function main() {
  console.log(`Starting script to add dummy faculty: ${facultyName} (${facultyEmail})`);
  const existingUser = await prisma.user.findUnique({ where: { email: facultyEmail } });
  if (existingUser) {
    console.log(`User ${facultyEmail} already exists. Skipping.`);
    await prisma.$disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(facultyPassword, 10);
  const facultyUser = await prisma.user.create({
    data: { name: facultyName, email: facultyEmail.toLowerCase().trim(), password: hashedPassword, role: 'FACULTY' },
    select: { id: true, email: true }
  });
  console.log(`User ${facultyUser.email} created (ID: ${facultyUser.id}).`);
  const userId = facultyUser.id;

  try {
    await prisma.academicQualification.createMany({
      data: [
        { userId, degree: 'MPH - Master of Public Health', institution: 'National Institute of Public Health', program: 'Epidemiology', yearCompleted: 2020, diplomaFileUrl: `/uploads/qualifications/${userId}/mph_evans.pdf`, status: 'APPROVED' },
        { userId, degree: 'BS Nursing', institution: 'City College of Nursing', program: 'General Nursing', yearCompleted: 2017, diplomaFileUrl: `/uploads/qualifications/${userId}/bsn_evans.pdf`, status: 'APPROVED' },
      ]
    });
     await prisma.professionalLicense.createMany({
      data: [
        { userId, examination: 'Registered Nurse (RN)', monthYear: 'May 2017', licenseNumber: `RN-DE-${Math.floor(100000 + Math.random() * 900000)}`, expiration: new Date('2028-05-31'), licenseFileUrl: `/uploads/licenses/${userId}/rn_evans.pdf`, status: 'APPROVED' },
      ]
    });
    await prisma.workExperience.createMany({
      data: [
        { userId, institution: 'County Health Department', position: 'Public Health Analyst', natureOfWork: 'Disease surveillance, health education program development.', inclusiveYears: '2020-Present', proofUrl: `/uploads/workexp/${userId}/county_coe_evans.pdf`, status: 'PENDING' },
      ]
    });
    await prisma.communityInvolvement.createMany({
      data: [
        { userId, engagementTitle: 'Community Health Fair Organizer', role: 'Lead Organizer', locationDate: 'Downtown Community Center, Annually since 2021', proofUrl: `/uploads/community/${userId}/healthfair_evans.pdf`, status: 'APPROVED' },
      ]
    });
    await prisma.conferencePresentation.createMany({
      data: [
        { userId, paperTitle: 'Impact of Health Literacy on Vaccination Rates', eventName: 'National Public Health Conference', dateLocation: 'April 2023, Atlanta, GA', proofUrl: `/uploads/presentations/${userId}/nphc_evans.pdf`, status: 'APPROVED' },
      ]
    });

    const specsToLink = ['Public Health', 'Research Methodology']; // Example
    for (const specName of specsToLink) {
        const spec = await prisma.specialization.findUnique({ where: { name: specName } });
        if (spec) {
            console.log(`Linking ${facultyName} to '${specName}'...`);
            await prisma.user.update({ where: { id: userId }, data: { specializations: { connect: { id: spec.id } } } });
        } else { console.warn(`Specialization '${specName}' not found. Skipping.`); }
    }
    console.log(`Successfully added CV details for ${facultyEmail}.`);
  } catch (error) {
    console.error(`Error adding CV details for ${facultyEmail}:`, error); process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
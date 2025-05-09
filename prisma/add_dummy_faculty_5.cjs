// prisma/add_dummy_faculty_5.cjs
// Adds 'Mr. Edward "Ed" Foster' with email faculty5@test.com

const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// --- Configuration ---
const facultyEmail = 'faculty5@test.com';
const facultyPassword = 'password123';
const facultyName = 'Mr. Edward "Ed" Foster';
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
        { userId, degree: 'MBA Healthcare Management', institution: 'Business School of Excellence', program: 'Healthcare Administration', yearCompleted: 2017, diplomaFileUrl: `/uploads/qualifications/${userId}/mba_foster.pdf`, status: 'APPROVED' },
        { userId, degree: 'BSc Health Sciences', institution: 'University of Applied Health', program: 'Health Admin Track', yearCompleted: 2014, diplomaFileUrl: `/uploads/qualifications/${userId}/bs_healthsci_foster.pdf`, status: 'APPROVED' },
      ]
    });
    await prisma.workExperience.createMany({
      data: [
        { userId, institution: 'Regional Medical Center', position: 'Laboratory Manager', natureOfWork: 'Operational management, budgeting, staffing, compliance for clinical labs.', inclusiveYears: '2018-Present', proofUrl: `/uploads/workexp/${userId}/rmc_coe_foster.pdf`, status: 'APPROVED' },
        { userId, institution: 'Metro Labs Inc.', position: 'Assistant Lab Supervisor', natureOfWork: 'Assisted in daily lab operations and quality control.', inclusiveYears: '2015-2018', proofUrl: `/uploads/workexp/${userId}/metro_coe_foster.jpg`, status: 'REJECTED', rejectionReason: "Dates on COE do not match submitted years." },
      ]
    });
    await prisma.professionalDevelopment.createMany({
      data: [
        { userId, title: 'Advanced Laboratory Leadership Program', organizer: 'Healthcare Leaders Institute', dateLocation: 'July 2022, Chicago, IL', certificateFileUrl: `/uploads/profdev/${userId}/lab_leadership_foster.pdf`, status: 'APPROVED' },
        { userId, title: 'Financial Management for Healthcare', organizer: 'BusinessPro Seminars', dateLocation: 'Jan 2020, Online', certificateFileUrl: null, status: 'PENDING' },
      ]
    });
    await prisma.awardRecognition.createMany({
      data: [
        { userId, awardName: 'Manager of the Year', awardingBody: 'Regional Medical Center', yearReceived: 2021, certificateUrl: `/uploads/awards/${userId}/manager_award_foster.pdf`, status: 'APPROVED' },
      ]
    });

    const specsToLink = ['Laboratory Management', 'Medical Ethics', 'Anatomic Pathology']; // Example
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
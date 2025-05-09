// prisma/add_dummy_faculty_2.cjs
// Adds 'Dr. Brenda Berry' with email faculty2@test.com

const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// --- Configuration ---
const facultyEmail = 'faculty2@test.com';
const facultyPassword = 'password123';
const facultyName = 'Dr. Brenda Berry';
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
        { userId, degree: 'MS Clinical Chemistry', institution: 'Science National University', program: 'Advanced Diagnostics', yearCompleted: 2019, diplomaFileUrl: `/uploads/qualifications/${userId}/ms_clinchem_berry.pdf`, status: 'APPROVED' },
        { userId, degree: 'BS Medical Laboratory Science', institution: 'Tech Institute of Health', program: 'MLS Generalist', yearCompleted: 2016, diplomaFileUrl: `/uploads/qualifications/${userId}/bsmls_berry.pdf`, status: 'APPROVED' },
      ]
    });
    await prisma.professionalLicense.createMany({
      data: [
        { userId, examination: 'Registered Medical Technologist (RMT)', monthYear: 'Aug 2016', licenseNumber: `RMT-BB-${Math.floor(100000 + Math.random() * 900000)}`, expiration: new Date('2027-08-15'), licenseFileUrl: `/uploads/licenses/${userId}/rmt_berry.pdf`, status: 'APPROVED' },
        { userId, examination: 'Clinical Chemistry Specialist (ASCP)', monthYear: 'Nov 2020', licenseNumber: `CC-BB-${Math.floor(10000 + Math.random() * 90000)}`, expiration: new Date('2026-11-30'), licenseFileUrl: `/uploads/licenses/${userId}/cc_ascp_berry.png`, status: 'PENDING' },
      ]
    });
    await prisma.workExperience.createMany({
      data: [
        { userId, institution: 'City General Hospital Lab', position: 'Clinical Chemist', natureOfWork: 'Routine and special chemistry testing, instrument maintenance.', inclusiveYears: '2017-Present', proofUrl: `/uploads/workexp/${userId}/cgh_coe_berry.pdf`, status: 'APPROVED' },
      ]
    });
     await prisma.professionalDevelopment.createMany({
      data: [
        { userId, title: 'Advanced Techniques in Clinical Enzymology', organizer: 'ChemEx Society', dateLocation: 'May 2023, Online', certificateFileUrl: `/uploads/profdev/${userId}/enzymology_berry.pdf`, status: 'APPROVED' },
      ]
    });

    const specsToLink = ['Clinical Chemistry', 'Hematology'];
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
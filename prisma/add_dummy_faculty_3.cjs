// prisma/add_dummy_faculty_3.cjs
// Adds 'Prof. Charles "Charlie" Davis' with email faculty3@test.com

const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// --- Configuration ---
const facultyEmail = 'faculty3@test.com';
const facultyPassword = 'password123';
const facultyName = 'Prof. Charles "Charlie" Davis';
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
        { userId, degree: 'MSc Microbiology & Immunology', institution: 'State Research University', program: 'Pathogen Research', yearCompleted: 2014, diplomaFileUrl: `/uploads/qualifications/${userId}/msc_microimm_davis.pdf`, status: 'APPROVED' },
        { userId, degree: 'BSc Biology', institution: 'Community College of Science', program: 'General Biology', yearCompleted: 2011, diplomaFileUrl: `/uploads/qualifications/${userId}/bsc_bio_davis.pdf`, status: 'REJECTED', rejectionReason: "Transcript required, not just diploma." },
      ]
    });
    await prisma.professionalLicense.createMany({
      data: [
        { userId, examination: 'Registered Microbiologist (RM)', monthYear: 'Mar 2015', licenseNumber: `RM-CD-${Math.floor(100000 + Math.random() * 900000)}`, expiration: new Date('2026-03-31'), licenseFileUrl: `/uploads/licenses/${userId}/rm_davis.pdf`, status: 'APPROVED' },
      ]
    });
    await prisma.workExperience.createMany({
      data: [
        { userId, institution: 'University Teaching Hospital', position: 'Microbiology Lab Supervisor', natureOfWork: 'Overseeing diagnostic microbiology, staff training, quality assurance.', inclusiveYears: '2016-Present', proofUrl: `/uploads/workexp/${userId}/uth_coe_davis.pdf`, status: 'APPROVED' },
        { userId, institution: 'PharmaCorp Diagnostics', position: 'Junior Microbiologist', natureOfWork: 'Culture and sensitivity testing.', inclusiveYears: '2014-2016', proofUrl: `/uploads/workexp/${userId}/pharma_coe_davis.jpg`, status: 'APPROVED' },
      ]
    });
    await prisma.professionalAffiliation.createMany({
      data: [
        { userId, organization: 'Society for Applied Microbiology (SAM)', position: 'Active Member', inclusiveYears: '2015-Present', membershipProofUrl: null, status: 'PENDING' },
      ]
    });
    await prisma.publication.createMany({
      data: [
        { userId, researchTitle: 'Emerging Antibiotic Resistance Patterns in Urban Hospitals', journal: 'Journal of Infectious Diseases', datePublished: new Date('2021-05-20'), doiLink: `10.1093/infdis/${userId.substring(0,4)}210520`, pdfUrl: `/uploads/publications/${userId}/jid_resistance_davis.pdf`, status: 'APPROVED' },
      ]
    });

    const specsToLink = ['Microbiology', 'Immunology', 'Research Methodology'];
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
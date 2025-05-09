// prisma/seed_courses.cjs
// Adds sample courses and links them to existing specializations.
// IMPORTANT: Run this AFTER 'add_missing_specializations.cjs' or ensure specializations exist.

const { PrismaClient } = require('../src/generated/prisma/index.js');
const prisma = new PrismaClient();

// Define sample courses and the names of specializations they require.
// Ensure these specialization names EXACTLY match what's in your Specialization table.
const coursesToSeed = [
  {
    name: 'Clinical Hematology I',
    code: 'MLS301',
    description: 'Fundamentals of hematology, including blood cell formation, function, and common disorders. Focus on manual techniques.',
    requiredSpecializationNames: ['Hematology', 'Laboratory Management'] // Example
  },
  {
    name: 'Clinical Chemistry I',
    code: 'MLS302',
    description: 'Principles of clinical chemistry, analysis of carbohydrates, lipids, proteins, and enzymes.',
    requiredSpecializationNames: ['Clinical Chemistry', 'Laboratory Management']
  },
  {
    name: 'Diagnostic Microbiology I',
    code: 'MLS303',
    description: 'Introduction to pathogenic microorganisms, sterilization, disinfection, and basic culture techniques.',
    requiredSpecializationNames: ['Microbiology', 'Immunology']
  },
  {
    name: 'Immunology & Serology',
    code: 'MLS304',
    description: 'Study of the immune system, antigen-antibody reactions, and serological techniques for disease diagnosis.',
    requiredSpecializationNames: ['Immunology', 'Molecular Biology']
  },
  {
    name: 'Research Methods for Health Sciences',
    code: 'RES401',
    description: 'Introduction to research design, data collection, statistical analysis, and ethical considerations in health research.',
    requiredSpecializationNames: ['Research Methodology', 'Medical Ethics']
  },
  {
    name: 'Public Health & Epidemiology',
    code: 'PH201',
    description: 'Principles of public health, disease patterns, and epidemiological investigation.',
    requiredSpecializationNames: ['Public Health', 'Research Methodology']
  },
  {
    name: 'Advanced Molecular Diagnostics',
    code: 'MLS501',
    description: 'Advanced techniques in molecular biology for diagnostic purposes, including PCR, sequencing, and microarrays.',
    requiredSpecializationNames: ['Molecular Biology', 'Clinical Chemistry']
  }
];

async function main() {
  console.log('Starting script to seed courses and link specializations...');

  for (const courseData of coursesToSeed) {
    const { requiredSpecializationNames, ...courseDetails } = courseData;

    // Check if course already exists by name or code (if code is unique)
    let existingCourse = await prisma.course.findUnique({
      where: { name: courseDetails.name },
    });
    if (!existingCourse && courseDetails.code) {
        existingCourse = await prisma.course.findUnique({
            where: { code: courseDetails.code }
        });
    }


    if (existingCourse) {
      console.log(`Course "${courseDetails.name}" already exists. Checking/updating specialization links...`);
      // If course exists, you might want to update its specializations if they differ.
      // For simplicity in this seed, we'll just ensure links exist.
      const specializationIdsToConnect = [];
      for (const specName of requiredSpecializationNames) {
        const spec = await prisma.specialization.findUnique({ where: { name: specName } });
        if (spec) {
          specializationIdsToConnect.push({ id: spec.id });
        } else {
          console.warn(`  - Specialization "${specName}" not found for course "${courseDetails.name}". Skipping link.`);
        }
      }
      if (specializationIdsToConnect.length > 0) {
        await prisma.course.update({
            where: { id: existingCourse.id },
            data: {
                requiredSpecializations: {
                    // 'set' will replace all existing links with the new set.
                    // Use 'connect' if you only want to add without removing others,
                    // but for a seed, 'set' is often cleaner to ensure defined state.
                    set: specializationIdsToConnect
                }
            }
        });
        console.log(`  Updated specialization links for "${courseDetails.name}".`);
      }

    } else {
      // Course does not exist, create it and link specializations
      console.log(`Creating course: "${courseDetails.name}"...`);
      const specializationIdsToConnect = [];
      for (const specName of requiredSpecializationNames) {
        const spec = await prisma.specialization.findUnique({ where: { name: specName } });
        if (spec) {
          specializationIdsToConnect.push({ id: spec.id });
        } else {
          console.warn(`  - Specialization "${specName}" not found for new course "${courseDetails.name}". Link will be skipped.`);
        }
      }

      try {
        await prisma.course.create({
          data: {
            ...courseDetails,
            requiredSpecializations: {
              connect: specializationIdsToConnect,
            },
          },
        });
        console.log(`  Successfully created course "${courseDetails.name}" and linked specializations.`);
      } catch (createError) {
         console.error(`  Error creating course "${courseDetails.name}":`, createError);
         if (createError.code === 'P2002') { // Unique constraint failed
            console.error(`  A course with this name or code likely already exists (unique constraint violation).`);
         }
      }
    }
  }

  console.log('Finished seeding courses.');
}

main()
  .catch(async (e) => {
    console.error('Course seeding script failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
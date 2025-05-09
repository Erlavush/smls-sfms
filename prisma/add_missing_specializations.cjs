// prisma/add_missing_specializations.cjs
// Adds specializations that might be missing for dummy faculty linking.
// IMPORTANT: Does NOT delete existing data.

const { PrismaClient } = require('../src/generated/prisma/index.js');
const prisma = new PrismaClient();

const specializationsToAdd = [
  { name: 'Clinical Chemistry', description: 'Specialization in chemical processes and substances in the human body.' },
  { name: 'Microbiology', description: 'Study of microscopic organisms, such as bacteria, viruses, archaea, fungi and protozoa.' },
  { name: 'Immunology', description: 'Branch of biology and medicine that covers the study of immune systems.' },
  { name: 'Research Methodology', description: 'Expertise in designing and conducting research studies.' },
  { name: 'Public Health', description: 'Focus on the health of populations as a whole.' },
  { name: 'Laboratory Management', description: 'Skills in managing clinical or research laboratory operations.' },
  { name: 'Medical Ethics', description: 'Understanding and application of ethical principles in medicine.' },
  { name: 'Anatomic Pathology', description: 'Diagnosis of disease based on the macroscopic, microscopic, biochemical, immunologic and molecular examination of organs and tissues.' },
  // Add any other specializations you might have used or plan to use here
  // For example, from the first dummy script if you didn't add them manually:
  { name: 'Physics', description: 'The natural science of matter, its fundamental constituents, its motion and behavior through space and time.' },
  { name: 'Hematology', description: 'The study of blood, blood-forming organs, and blood diseases.' },
  { name: 'Molecular Biology', description: 'The study of biology at a molecular level, including the structure and function of genes and gene products.'}
];

async function main() {
  console.log('Starting script to add missing specializations...');

  for (const specData of specializationsToAdd) {
    const existingSpec = await prisma.specialization.findUnique({
      where: { name: specData.name },
    });

    if (existingSpec) {
      console.log(`Specialization "${specData.name}" already exists. Skipping.`);
    } else {
      try {
        await prisma.specialization.create({
          data: {
            name: specData.name,
            description: specData.description,
          },
        });
        console.log(`Successfully created specialization: "${specData.name}"`);
      } catch (error) {
        // This might catch a race condition if run in parallel, though unlikely here.
        // Or if the unique constraint is case-insensitive on your DB (not default for SQLite).
        if (error.code === 'P2002') {
             console.warn(`Specialization "${specData.name}" likely created by another process or already exists (case-insensitive match?). Skipping.`);
        } else {
            console.error(`Error creating specialization "${specData.name}":`, error);
        }
      }
    }
  }

  console.log('Finished adding specializations.');
}

main()
  .catch(async (e) => {
    console.error('Script execution failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
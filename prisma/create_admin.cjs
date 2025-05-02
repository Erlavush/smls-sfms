// prisma/create_admin.cjs
// Creates ONLY an admin user. Does NOT delete existing data.

// Use the direct path that worked before
const { PrismaClient } = require('../src/generated/prisma/index.js');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// --- Configuration ---
// CHANGE THESE VALUES AS NEEDED
const adminEmail = 'admin@test.com';
const adminPassword = 'password123'; // Choose a secure password!
const adminName = 'SMLS Admin'; // Optional: Set a name
// --- End Configuration ---

async function main() {
  console.log(`Attempting to create admin user: ${adminEmail}`);

  // 1. Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`Admin user with email ${adminEmail} already exists. Skipping creation.`);
    return; // Exit if admin exists
  }

  // 2. Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
  console.log(`Password hashed.`);

  // 3. Create the admin user
  try {
    const newAdmin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail.toLowerCase().trim(), // Store lowercase, trimmed email
        password: hashedPassword,
        role: 'ADMIN', // Use the string literal 'ADMIN'
        // emailVerified: new Date(), // Optional: Mark as verified immediately if desired
      },
      select: { // Only select necessary fields
        id: true,
        email: true,
        role: true,
      }
    });
    console.log(`Successfully created ADMIN user: ${newAdmin.email} (ID: ${newAdmin.id})`);

  } catch (error) {
    console.error(`Error creating admin user ${adminEmail}:`, error);
    process.exit(1); // Exit with error on failure
  }
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
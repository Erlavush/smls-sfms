// prisma/delete_all_faculty_accounts.cjs
// Deletes ALL users with the role 'FACULTY' and their associated data.
// USE WITH CAUTION. ENSURE YOU WANT TO DO THIS.

const { PrismaClient } = require('../src/generated/prisma/index.js');
const prisma = new PrismaClient();

async function main() {
  console.log("WARNING: This script will delete ALL users with the role 'FACULTY' and all their associated data.");
  console.log("This includes academic qualifications, licenses, work experiences, etc., due to cascading deletes.");
  console.log("Admin accounts will NOT be affected.");
  console.log("---------------------------------------------------------------------------------------------------");

  // Add a small delay and a prompt to allow cancellation
  // For a real prompt, you'd use a library like 'inquirer', but for a simple script, a timeout is a basic safeguard.
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise(resolve => {
    readline.question('Type "DELETE ALL FACULTY" to confirm, or anything else to cancel: ', (answer) => {
      if (answer === "DELETE ALL FACULTY") {
        console.log("Confirmation received. Proceeding with deletion...");
        resolve();
      } else {
        console.log("Deletion cancelled by user.");
        process.exit(0);
      }
      readline.close();
    });
  });


  console.log("Attempting to delete ALL users with role FACULTY...");
  const facultyUsers = await prisma.user.findMany({
    where: { role: 'FACULTY' },
    select: { id: true, email: true, name: true } // Select more info for logging
  });

  if (facultyUsers.length === 0) {
    console.log("No faculty users found to delete.");
    await prisma.$disconnect();
    return;
  }

  console.log(`Found ${facultyUsers.length} faculty users to delete:`);
  facultyUsers.forEach(user => console.log(`- ${user.name || 'Unnamed'} (${user.email || 'No Email'}) - ID: ${user.id}`));

  try {
    // This will also delete all their related CV data due to onDelete: Cascade
    // and unlink them from specializations.
    const deleteResult = await prisma.user.deleteMany({
      where: {
        role: 'FACULTY',
      },
    });
    console.log(`Successfully deleted ${deleteResult.count} faculty users.`);
  } catch (error) {
    console.error("An error occurred during deletion:", error);
    process.exit(1); // Exit with error if deletion fails
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(async (e) => {
    console.error("Script execution failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
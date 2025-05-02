// prisma/delete_user.js
// Use the direct path that worked for seeding
const { PrismaClient } = require('../src/generated/prisma/index.js');
const prisma = new PrismaClient();

async function main() {
  // --- Get Email from Command Line Argument ---
  // process.argv contains command line arguments.
  // argv[0] is node executable path
  // argv[1] is the script path
  // argv[2] will be the first argument we pass (the email)
  const emailToDelete = process.argv[2];

  if (!emailToDelete) {
    console.error("ERROR: Please provide the email address of the user to delete as a command line argument.");
    console.log("Example: node prisma/delete_user.js user@example.com");
    process.exit(1); // Exit with an error code
  }

  console.log(`Attempting to delete user with email: ${emailToDelete}`);

  try {
    // Find the user first to confirm existence (optional but good practice)
    const user = await prisma.user.findUnique({
      where: { email: emailToDelete },
    });

    if (!user) {
      console.log(`User with email ${emailToDelete} not found.`);
      return; // Exit gracefully if user doesn't exist
    }

    console.log(`Found user ${user.name || user.email} (ID: ${user.id}). Proceeding with deletion...`);

    // --- Delete the User (Cascade will handle related data) ---
    const deleteResult = await prisma.user.delete({
      where: {
        email: emailToDelete,
      },
    });

    console.log(`Successfully deleted user with email: ${emailToDelete}`);
    console.log("Associated CV data should also be deleted due to 'onDelete: Cascade'.");

  } catch (e) {
    console.error(`Error deleting user ${emailToDelete}:`, e);
    process.exit(1); // Exit with an error code if deletion fails
  }
}

// --- Main execution ---
main()
  .catch((e) => {
    // Catch any unexpected errors during main execution
    console.error("Script execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting Prisma Client...");
    await prisma.$disconnect();
    console.log("Prisma Client disconnected.");
  });
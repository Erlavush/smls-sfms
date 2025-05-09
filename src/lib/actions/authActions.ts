// Action: Modify src/lib/actions/authActions.ts

'use server';

import prisma from '@/lib/prisma';
import crypto from 'crypto'; // For generating secure random tokens
import bcrypt from 'bcrypt'; // For hashing the token AND new password
import { z } from 'zod'; // For input validation
import { revalidatePath } from 'next/cache'; // May not be strictly needed here, but good practice

// --- Request Reset Types/Action (Keep existing) ---
interface RequestPasswordResetResponse {
    success: boolean;
    message: string;
}
const EmailSchema = z.string().email({ message: "Invalid email address." });
export async function requestPasswordReset(formData: FormData): Promise<RequestPasswordResetResponse> {
    const emailValue = formData.get('email');
    const validationResult = EmailSchema.safeParse(emailValue);
    if (!validationResult.success) {
        console.warn("Password reset attempt with invalid email format:", emailValue);
        return { success: true, message: "If an account with that email exists, a password reset link has been sent." };
    }
    const email = validationResult.data.toLowerCase().trim();
    console.log(`Password reset requested for email: ${email}`);
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { id: true }
        });
        if (user) {
            console.log(`User found with ID: ${user.id}. Proceeding with token generation.`);
            const resetToken = crypto.randomBytes(32).toString('hex');
            const saltRounds = 10;
            const hashedToken = await bcrypt.hash(resetToken, saltRounds);
            const expires = new Date(Date.now() + 3600 * 1000); // 1 hour
            await prisma.$transaction([
                prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
                prisma.passwordResetToken.create({
                    data: { userId: user.id, token: hashedToken, expires: expires }
                })
            ]);
            console.log(`Stored hashed password reset token for user ${user.id}. Expiration: ${expires.toISOString()}`);
            const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
            console.log("--------------------------------------------------");
            console.log("--- SIMULATED EMAIL ---");
            console.log(`To: ${email}`);
            console.log(`Subject: Reset Your SMLS-SFMS Password`);
            console.log(`Body: Click the link below to reset your password:\n${resetLink}`);
            console.log(`(Unhashed Token for link: ${resetToken})`);
            console.log("--------------------------------------------------");
        } else {
            console.log(`Password reset requested for non-existent email: ${email}. No action taken.`);
        }
        return { success: true, message: "If an account with that email exists, a password reset link has been sent." };
    } catch (error: any) {
        console.error("Error during password reset request:", error);
        return { success: false, message: "An error occurred while processing your request. Please try again later." };
    }
}


// --- *** NEW: Perform Password Reset Action *** ---

// Define the expected shape of the response
interface PerformPasswordResetResponse {
    success: boolean;
    message: string; // User-facing message
}

// Define a schema for the reset form data validation using Zod
const ResetPasswordSchema = z.object({
    token: z.string().min(1, { message: "Token is required." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Point error to the confirmation field
});

export async function performPasswordReset(formData: FormData): Promise<PerformPasswordResetResponse> {
    const rawFormData = {
        token: formData.get('token'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    };

    // 1. Validate Form Input
    const validationResult = ResetPasswordSchema.safeParse(rawFormData);
    if (!validationResult.success) {
        // Combine multiple errors if necessary, or just take the first one
        const firstError = validationResult.error.errors[0]?.message || "Invalid input.";
        console.warn("Password reset validation failed:", validationResult.error.flatten());
        return { success: false, message: firstError };
    }

    const { token, password } = validationResult.data;
    console.log(`Attempting password reset with token (first 8 chars): ${token.substring(0, 8)}...`);

    try {
        // 2. Find the corresponding HASHED token in the database
        // We need to iterate through potential tokens or use a more direct lookup if possible.
        // Since we stored the HASHED token, we cannot directly query `where: { token: hashedToken }`
        // because bcrypt generates a different hash each time even for the same input.
        // The standard secure approach is:
        // a) Hash the token from the URL *before* storing it. (We did this in requestPasswordReset)
        // b) Find the token record by its *hashed* value.

        // Let's re-evaluate: We stored the HASHED token. The URL contains the UNHASHED token.
        // We CANNOT efficiently find the DB record using the unhashed token.
        // The CORRECT secure flow is usually:
        //   - Store HASHED token in DB.
        //   - Send UNHASHED token in URL.
        //   - When user submits: Hash the token from URL AGAIN, then find the DB record matching this NEW HASH.
        // This seems counter-intuitive but prevents timing attacks.
        // HOWEVER, bcrypt salts hashes, meaning hashing the same token twice yields DIFFERENT hashes.
        // THEREFORE, the standard secure method is actually:
        //   - Generate token. Store HASHED token in DB. Send UNHASHED token in URL.
        //   - When user submits: Find the potential DB token record(s) by USER ID (if possible, or other non-secret identifier).
        //   - Use `bcrypt.compare(unhashedTokenFromUrl, hashedTokenFromDb)` to verify.

        // Let's adjust the logic: We can't easily find the token by its value.
        // A common workaround (less ideal than finding by user ID if the token page required login)
        // is to fetch recent, unexpired tokens and compare. This is inefficient.

        // *** A BETTER APPROACH (REQUIRING SCHEMA CHANGE which we already did): ***
        // Find the token record by the *hashed* token value. We need to hash the incoming token first.
        // THIS IS WRONG - bcrypt compare is needed.

        // *** CORRECTED APPROACH: Find token records and compare ***
        // This is still inefficient if many tokens exist. A better real-world solution
        // might involve linking the token request to a session or adding a non-secret identifier.
        // For this implementation, let's fetch recent tokens and compare.

        const potentialTokens = await prisma.passwordResetToken.findMany({
            where: {
                expires: { gt: new Date() } // Only consider non-expired tokens
            },
            include: { user: { select: { id: true } } } // Include user ID
        });

        let validTokenRecord = null;
        for (const dbToken of potentialTokens) {
            const isValid = await bcrypt.compare(token, dbToken.token);
            if (isValid) {
                validTokenRecord = dbToken;
                break; // Found the matching token
            }
        }

        // 3. Validate Token Existence and Expiry
        if (!validTokenRecord) {
            console.log("Password reset failed: Token not found or expired/invalid.");
            return { success: false, message: "Invalid or expired password reset link." };
        }

        // Check expiry again just in case (though the query should handle it)
        if (new Date() > validTokenRecord.expires) {
            console.log(`Password reset failed: Token expired at ${validTokenRecord.expires.toISOString()}`);
             // Clean up expired token (optional, could run a cron job)
             await prisma.passwordResetToken.delete({ where: { id: validTokenRecord.id } });
            return { success: false, message: "Password reset link has expired." };
        }

        const userId = validTokenRecord.userId;
        console.log(`Valid token found for user ID: ${userId}. Proceeding to update password.`);

        // 4. Hash the New Password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(password, saltRounds);

        // 5. Update User Password and Delete Token (Transaction)
        await prisma.$transaction([
            // Update user's password
            prisma.user.update({
                where: { id: userId },
                data: { password: hashedNewPassword }
            }),
            // Delete the used reset token
            prisma.passwordResetToken.delete({
                where: { id: validTokenRecord.id }
            })
        ]);

        console.log(`Successfully reset password for user ID: ${userId} and deleted token.`);

        // 6. Return Success
        return { success: true, message: "Password has been reset successfully." };

    } catch (error: any) {
        console.error("Error during password reset execution:", error);
        // Handle potential errors like user deletion between token validation and update
        if (error.code === 'P2025') { // Record not found during update/delete
             return { success: false, message: "User not found or token already used." };
        }
        return { success: false, message: "An error occurred while resetting your password. Please try again." };
    }
}
// --- *** END: Perform Password Reset Action *** ---
import { NextResponse } from "next/server";
import { db } from "@/db/index.js";
import { creators, otpCodes } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if the email exists in the approved creators table
    const creatorList = await db.select().from(creators).where(eq(creators.email, trimmedEmail)).limit(1);
    if (creatorList.length === 0) {
      return NextResponse.json(
        { error: "Access denied. Only approved creators can log in. Please submit an application." },
        { status: 403 }
      );
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes from now

    // Clean up old codes for this email and insert new code
    await db.delete(otpCodes).where(eq(otpCodes.email, trimmedEmail));
    await db.insert(otpCodes).values({
      email: trimmedEmail,
      code,
      expiresAt
    });

    // Log code to stdout/console so that the user and developers can view it in logs
    console.log(`\n===============================================\n[OTP CODE DISPATCH]\nEmail: ${trimmedEmail}\nCode: ${code}\nExpires: ${expiresAt}\n===============================================\n`);

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully. Check system logs for your code."
    });
  } catch (error) {
    console.error("OTP Dispatch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

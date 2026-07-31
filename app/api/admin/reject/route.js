import { NextResponse } from "next/server";
import { auth } from "@/auth.js";
import { db } from "@/db/index.js";

export const runtime = "edge";
import { creatorApplications } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export async function POST(request) {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { applicationId } = await request.json();

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    // Update status to rejected
    await db
      .update(creatorApplications)
      .set({ status: "rejected" })
      .where(eq(creatorApplications.id, applicationId));

    return NextResponse.json({
      success: true,
      message: "Creator application status updated to rejected."
    });
  } catch (error) {
    console.error("Creator rejection error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

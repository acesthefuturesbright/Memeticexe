import { NextResponse } from "next/server";
import { auth } from "@/auth.js";
import { db } from "@/db/index.js";
import { creators, creatorApplications } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export async function POST(request) {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { applicationId, name, email, twitter, nodeId, bio, status, cardStatus } = await request.json();

    if (!applicationId || !name || !email || !nodeId) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    const creatorId = name.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Create a new creator profile
    await db.insert(creators).values({
      id: creatorId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      nodeId: nodeId.trim(),
      status: status || "Creator",
      cardStatus: cardStatus || "ACTIVE",
      bio: bio ? bio.trim() : null,
      twitter: twitter ? twitter.trim() : null,
      isOnline: 1, // Active/On by default
      royaltyTier: "Level 1 — New Drop (fresh payload)",
      payoutInfo: "$1.00 / shirt payout",
      role: "creator",
      createdAt: new Date().toISOString()
    });

    // Update the application status to approved
    await db
      .update(creatorApplications)
      .set({ status: "approved" })
      .where(eq(creatorApplications.id, applicationId));

    return NextResponse.json({
      success: true,
      message: `Creator @${name} approved successfully with nodeId: ${nodeId}.`
    });
  } catch (error) {
    console.error("Creator approval error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

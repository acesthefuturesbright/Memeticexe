import { NextResponse } from "next/server";
import { db } from "@/db/index.js";

export const runtime = "edge";
import { creatorApplications } from "@/db/schema.js";

export async function POST(request) {
  try {
    const { displayName, email, twitter, portfolio, bio, designSamples } = await request.json();

    if (!displayName || !email || !bio) {
      return NextResponse.json(
        { error: "Display name, email address, and biography are required fields." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Insert pending creator application into the database
    await db.insert(creatorApplications).values({
      displayName: displayName.trim(),
      email: trimmedEmail,
      twitter: twitter ? twitter.trim() : null,
      portfolio: portfolio ? portfolio.trim() : null,
      bio: bio.trim(),
      designSamples: designSamples ? designSamples.trim() : null,
      status: "pending",
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: "Creator application registered in pending status."
    });
  } catch (error) {
    console.error("Apply API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

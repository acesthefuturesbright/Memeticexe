import { NextResponse } from "next/server";
import { auth } from "@/auth.js";
import { db } from "@/db/index.js";
import { creatorApplications } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const pendingList = await db
      .select()
      .from(creatorApplications)
      .where(eq(creatorApplications.status, "pending"));

    return NextResponse.json(pendingList);
  } catch (error) {
    console.error("Fetch pending applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

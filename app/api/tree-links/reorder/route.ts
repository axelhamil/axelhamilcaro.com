import { db } from "@/app/_lib/db";
import { treeLinks } from "@/app/_lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "orderedIds must be an array" },
        { status: 400 },
      );
    }

    for (let i = 0; i < orderedIds.length; i++) {
      await db
        .update(treeLinks)
        .set({ order: i, updatedAt: new Date() })
        .where(eq(treeLinks.id, orderedIds[i]));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to reorder links:", error);
    return NextResponse.json(
      { error: "Failed to reorder links" },
      { status: 500 },
    );
  }
}

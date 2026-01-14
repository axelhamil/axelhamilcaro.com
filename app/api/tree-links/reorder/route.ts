import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/_lib/api-auth";
import { db } from "@/drizzle";
import { treeLinks } from "@/drizzle/schema";

export async function POST(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

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
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to reorder links" },
      { status: 500 },
    );
  }
}

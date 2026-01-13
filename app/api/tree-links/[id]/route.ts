import { db } from "@/app/_lib/db";
import { treeLinks } from "@/app/_lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [updatedLink] = await db
      .update(treeLinks)
      .set({
        title: body.title?.trim(),
        url: body.url?.trim(),
        description: body.description?.trim() || null,
        icon: body.icon,
        featured: body.featured,
        isActive: body.isActive,
        order: body.order,
        updatedAt: new Date(),
      })
      .where(eq(treeLinks.id, id))
      .returning();

    if (!updatedLink) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error("Failed to update tree link:", error);
    return NextResponse.json(
      { error: "Failed to update tree link" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const [deletedLink] = await db
      .delete(treeLinks)
      .where(eq(treeLinks.id, id))
      .returning();

    if (!deletedLink) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete tree link:", error);
    return NextResponse.json(
      { error: "Failed to delete tree link" },
      { status: 500 },
    );
  }
}

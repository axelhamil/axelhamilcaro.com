import { db } from "@/app/_lib/db";
import { treeLinks } from "@/app/_lib/db/schema";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const links = await db
      .select()
      .from(treeLinks)
      .orderBy(asc(treeLinks.order));

    return NextResponse.json(links);
  } catch (error) {
    console.error("Failed to fetch tree links:", error);
    return NextResponse.json(
      { error: "Failed to fetch tree links" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title?.trim() || !body.url?.trim()) {
      return NextResponse.json(
        { error: "Title and URL are required" },
        { status: 400 }
      );
    }

    const maxOrderResult = await db
      .select({ order: treeLinks.order })
      .from(treeLinks)
      .orderBy(asc(treeLinks.order))
      .limit(1);

    const maxOrder = maxOrderResult[0]?.order ?? -1;

    const [newLink] = await db
      .insert(treeLinks)
      .values({
        title: body.title.trim(),
        url: body.url.trim(),
        description: body.description?.trim() || null,
        icon: body.icon || "link",
        featured: body.featured ?? false,
        isActive: body.isActive ?? true,
        order: body.order ?? maxOrder + 1,
      })
      .returning();

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Failed to create tree link:", error);
    return NextResponse.json(
      { error: "Failed to create tree link" },
      { status: 500 }
    );
  }
}

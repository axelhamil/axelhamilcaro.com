import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/_lib/api-auth";
import { db } from "@/drizzle";
import { formTemplates } from "@/drizzle/schema";

export async function GET() {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const templates = await db
      .select()
      .from(formTemplates)
      .orderBy(desc(formTemplates.createdAt));

    return NextResponse.json(templates);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const body = await request.json();

    const [newTemplate] = await db
      .insert(formTemplates)
      .values({
        name: body.name,
        config: body.config,
      })
      .returning();

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 },
      );
    }

    const [deletedTemplate] = await db
      .delete(formTemplates)
      .where(eq(formTemplates.id, id))
      .returning();

    if (!deletedTemplate) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 },
    );
  }
}

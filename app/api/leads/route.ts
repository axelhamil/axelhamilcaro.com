import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");

    let query = db
      .select({
        id: leads.id,
        firstName: leads.firstName,
        email: leads.email,
        createdAt: leads.createdAt,
        formId: leads.formId,
        formTitle: forms.title,
        formSlug: forms.slug,
      })
      .from(leads)
      .innerJoin(forms, eq(leads.formId, forms.id))
      .orderBy(desc(leads.createdAt));

    if (formId) {
      query = query.where(eq(leads.formId, formId)) as typeof query;
    }

    const result = await query;

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const [deletedLead] = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();

    if (!deletedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}

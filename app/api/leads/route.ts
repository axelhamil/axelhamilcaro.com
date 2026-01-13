import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { requireAdminAuth } from "@/app/_lib/api-auth";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function GET(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");

    let query = db
      .select({
        id: leads.id,
        firstName: leads.firstName,
        email: leads.email,
        status: leads.status,
        notes: leads.notes,
        score: leads.score,
        source: leads.source,
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

    const leadsResult = await query;

    const allForms = await db
      .select({
        id: forms.id,
        title: forms.title,
      })
      .from(forms)
      .orderBy(forms.title);

    const formattedLeads = leadsResult.map((lead) => ({
      ...lead,
      createdAtFormatted: formatDate(lead.createdAt),
    }));

    return NextResponse.json({
      leads: formattedLeads,
      forms: allForms,
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, notes } = body;

    const [updatedLead] = await db
      .update(leads)
      .set({
        ...(status !== undefined && { status }),
        ...(notes !== undefined && { notes }),
      })
      .where(eq(leads.id, id))
      .returning();

    if (!updatedLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
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

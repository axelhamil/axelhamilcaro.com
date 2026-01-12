import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db
      .select({
        id: forms.id,
        slug: forms.slug,
        title: forms.title,
        isActive: forms.isActive,
        createdAt: forms.createdAt,
        leadsCount: sql<number>`(SELECT COUNT(*) FROM ${leads} WHERE ${leads.formId} = ${forms.id})`,
      })
      .from(forms)
      .orderBy(desc(forms.createdAt));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const existingForm = await db
      .select()
      .from(forms)
      .where(eq(forms.slug, body.slug))
      .limit(1);

    if (existingForm.length > 0) {
      return NextResponse.json(
        { error: "A form with this slug already exists" },
        { status: 400 }
      );
    }

    const [newForm] = await db
      .insert(forms)
      .values({
        slug: body.slug,
        backgroundType: body.backgroundType || "color",
        backgroundColor: body.backgroundColor,
        backgroundGradient: body.backgroundGradient,
        backgroundImage: body.backgroundImage,
        cardImage: body.cardImage,
        badgeText: body.badgeText,
        title: body.title,
        description: body.description,
        buttonText: body.buttonText || "Envoyer",
        emailSubject: body.emailSubject,
        emailBody: body.emailBody,
        emailTo: body.emailTo,
        isActive: body.isActive ?? true,
      })
      .returning();

    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error("Failed to create form:", error);
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 }
    );
  }
}

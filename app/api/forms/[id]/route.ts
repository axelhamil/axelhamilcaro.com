import { db } from "@/app/_lib/db";
import { forms } from "@/app/_lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [form] = await db.select().from(forms).where(eq(forms.id, id));

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Failed to fetch form:", error);
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.slug) {
      const existingForm = await db
        .select()
        .from(forms)
        .where(eq(forms.slug, body.slug));

      const otherFormWithSlug = existingForm.find((f) => f.id !== id);
      if (otherFormWithSlug) {
        return NextResponse.json(
          { error: "A form with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const [updatedForm] = await db
      .update(forms)
      .set({
        slug: body.slug,
        backgroundType: body.backgroundType,
        backgroundColor: body.backgroundColor,
        backgroundGradient: body.backgroundGradient,
        backgroundImage: body.backgroundImage,
        cardImage: body.cardImage,
        badgeText: body.badgeText,
        title: body.title,
        description: body.description,
        buttonText: body.buttonText,
        emailSubject: body.emailSubject,
        emailBody: body.emailBody,
        emailTo: body.emailTo,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(forms.id, id))
      .returning();

    if (!updatedForm) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error("Failed to update form:", error);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [deletedForm] = await db
      .delete(forms)
      .where(eq(forms.id, id))
      .returning();

    if (!deletedForm) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete form:", error);
    return NextResponse.json(
      { error: "Failed to delete form" },
      { status: 500 }
    );
  }
}

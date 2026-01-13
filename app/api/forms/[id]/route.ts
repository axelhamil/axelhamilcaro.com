import { db } from "@/app/_lib/db";
import { forms } from "@/app/_lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .replace(/-+/g, "-");
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 2;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
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
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Le titre est requis" },
        { status: 400 },
      );
    }

    const slug = slugify(body.slug || body.title);

    if (!isValidSlug(slug)) {
      return NextResponse.json(
        {
          error:
            "Le slug n'est pas valide (min 2 caractères, lettres/chiffres/tirets)",
        },
        { status: 400 },
      );
    }

    const existingForm = await db
      .select()
      .from(forms)
      .where(eq(forms.slug, slug));

    const otherFormWithSlug = existingForm.find((f) => f.id !== id);
    if (otherFormWithSlug) {
      return NextResponse.json(
        { error: "Un formulaire avec ce slug existe déjà" },
        { status: 400 },
      );
    }

    const [updatedForm] = await db
      .update(forms)
      .set({
        slug,
        backgroundType: body.backgroundType,
        backgroundColor: body.backgroundColor,
        backgroundGradient: body.backgroundGradient,
        backgroundImage: body.backgroundImage,
        cardImage: body.cardImage,
        badgeText: body.badgeText,
        badgeColor: body.badgeColor,
        title: body.title.trim(),
        description: body.description,
        buttonText: body.buttonText,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(forms.id, id))
      .returning();

    if (!updatedForm) {
      return NextResponse.json(
        { error: "Formulaire non trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error("Failed to update form:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du formulaire" },
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
      { status: 500 },
    );
  }
}

import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { requireAdminAuth } from "@/app/_lib/api-auth";
import { desc, eq, sql } from "drizzle-orm";
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

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function GET() {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

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

    const formattedResult = result.map((form) => ({
      ...form,
      createdAtFormatted: formatDate(form.createdAt),
    }));

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error("Failed to fetch forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Le titre est requis" },
        { status: 400 }
      );
    }

    const slug = slugify(body.slug || body.title);

    if (!isValidSlug(slug)) {
      return NextResponse.json(
        {
          error:
            "Le slug n'est pas valide (min 2 caractères, lettres/chiffres/tirets)",
        },
        { status: 400 }
      );
    }

    const existingForm = await db
      .select()
      .from(forms)
      .where(eq(forms.slug, slug))
      .limit(1);

    if (existingForm.length > 0) {
      return NextResponse.json(
        { error: "Un formulaire avec ce slug existe déjà" },
        { status: 400 }
      );
    }

    const [newForm] = await db
      .insert(forms)
      .values({
        slug,
        backgroundType: body.backgroundType || "color",
        backgroundColor: body.backgroundColor,
        backgroundGradient: body.backgroundGradient,
        backgroundImage: body.backgroundImage,
        cardImage: body.cardImage,
        badgeText: body.badgeText,
        badgeColor: body.badgeColor,
        title: body.title.trim(),
        description: body.description,
        buttonText: body.buttonText || "Envoyer",
        isActive: body.isActive ?? true,
      })
      .returning();

    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error("Failed to create form:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du formulaire" },
      { status: 500 }
    );
  }
}

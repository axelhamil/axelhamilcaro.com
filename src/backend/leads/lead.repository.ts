import { and, desc, eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { forms, leads } from "@/drizzle/schema";

export type Lead = typeof leads.$inferSelect;

export interface LeadWithForm {
  id: string;
  firstName: string;
  email: string;
  status: string | null;
  notes: string | null;
  score: number | null;
  source: string | null;
  createdAt: Date | null;
  formId: string;
  formTitle: string;
  formSlug: string;
}

export interface CreateLeadData {
  formId: string;
  firstName: string;
  email: string;
  source?: string | null;
}

export const leadRepository = {
  async findById(id: string): Promise<Lead | null> {
    const row = await db.query.leads.findFirst({
      where: eq(leads.id, id),
    });
    return row ?? null;
  },

  async findAllWithForm(formId?: string): Promise<LeadWithForm[]> {
    const baseQuery = db
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
      return baseQuery.where(eq(leads.formId, formId));
    }

    return baseQuery;
  },

  async existsByFormAndEmail(formId: string, email: string): Promise<boolean> {
    const existing = await db
      .select()
      .from(leads)
      .where(and(eq(leads.formId, formId), eq(leads.email, email)))
      .limit(1);

    return existing.length > 0;
  },

  async create(data: CreateLeadData): Promise<Lead> {
    const [row] = await db
      .insert(leads)
      .values({
        formId: data.formId,
        firstName: data.firstName,
        email: data.email,
        source: data.source ?? null,
      })
      .returning();

    return row;
  },

  async update(
    id: string,
    data: { status?: string; notes?: string | null; score?: number },
  ): Promise<Lead | null> {
    const [row] = await db
      .update(leads)
      .set({
        ...(data.status !== undefined && { status: data.status }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.score !== undefined && { score: data.score }),
      })
      .where(eq(leads.id, id))
      .returning();

    return row ?? null;
  },

  async delete(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();

    return !!deleted;
  },
};

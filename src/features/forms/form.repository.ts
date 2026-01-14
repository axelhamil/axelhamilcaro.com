import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/drizzle";
import { forms, leads } from "@/drizzle/schema";

export type Form = typeof forms.$inferSelect;

export interface FormWithLeadsCount {
  id: string;
  slug: string;
  title: string;
  isActive: boolean | null;
  createdAt: Date | null;
  leadsCount: number;
}

export const formRepository = {
  async findById(id: string): Promise<Form | null> {
    const row = await db.query.forms.findFirst({
      where: eq(forms.id, id),
    });
    return row ?? null;
  },

  async findBySlug(slug: string): Promise<Form | null> {
    const row = await db.query.forms.findFirst({
      where: eq(forms.slug, slug),
    });
    return row ?? null;
  },

  async findAllWithLeadsCount(): Promise<FormWithLeadsCount[]> {
    return db
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
  },

  async findAllForDropdown(): Promise<{ id: string; title: string }[]> {
    return db
      .select({ id: forms.id, title: forms.title })
      .from(forms)
      .orderBy(forms.title);
  },

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const existing = await db
      .select({ id: forms.id })
      .from(forms)
      .where(eq(forms.slug, slug))
      .limit(1);

    if (existing.length === 0) return false;
    if (excludeId && existing[0].id === excludeId) return false;
    return true;
  },

  async create(data: typeof forms.$inferInsert): Promise<Form> {
    const [row] = await db.insert(forms).values(data).returning();
    return row;
  },

  async update(
    id: string,
    data: Partial<typeof forms.$inferInsert>,
  ): Promise<Form> {
    const [row] = await db
      .update(forms)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(forms.id, id))
      .returning();
    return row;
  },

  async delete(id: string): Promise<void> {
    await db.delete(forms).where(eq(forms.id, id));
  },
};

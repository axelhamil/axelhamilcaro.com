import { desc, eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { formTemplates } from "@/drizzle/schema";

export type Template = typeof formTemplates.$inferSelect;

export const templateRepository = {
  async findAll(): Promise<Template[]> {
    return db
      .select()
      .from(formTemplates)
      .orderBy(desc(formTemplates.createdAt));
  },

  async findById(id: string): Promise<Template | null> {
    const row = await db.query.formTemplates.findFirst({
      where: eq(formTemplates.id, id),
    });
    return row ?? null;
  },

  async create(data: typeof formTemplates.$inferInsert): Promise<Template> {
    const [row] = await db.insert(formTemplates).values(data).returning();
    return row;
  },

  async delete(id: string): Promise<void> {
    await db.delete(formTemplates).where(eq(formTemplates.id, id));
  },
};

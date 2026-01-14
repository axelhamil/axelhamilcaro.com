import { asc, eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { treeLinks } from "@/drizzle/schema";

export type TreeLink = typeof treeLinks.$inferSelect;
export type TreeLinkInsert = typeof treeLinks.$inferInsert;

export const treeLinkRepository = {
  async findAll(): Promise<TreeLink[]> {
    return db.select().from(treeLinks).orderBy(asc(treeLinks.order));
  },

  async findAllActive(): Promise<TreeLink[]> {
    return db
      .select()
      .from(treeLinks)
      .where(eq(treeLinks.isActive, true))
      .orderBy(asc(treeLinks.order));
  },

  async findById(id: string): Promise<TreeLink | null> {
    const row = await db.query.treeLinks.findFirst({
      where: eq(treeLinks.id, id),
    });
    return row ?? null;
  },

  async getMaxOrder(): Promise<number> {
    const result = await db
      .select({ order: treeLinks.order })
      .from(treeLinks)
      .orderBy(asc(treeLinks.order))
      .limit(1);
    return result[0]?.order ?? -1;
  },

  async create(data: TreeLinkInsert): Promise<TreeLink> {
    const [row] = await db.insert(treeLinks).values(data).returning();
    return row;
  },

  async update(
    id: string,
    data: Partial<TreeLinkInsert>,
  ): Promise<TreeLink | null> {
    const [row] = await db
      .update(treeLinks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(treeLinks.id, id))
      .returning();
    return row ?? null;
  },

  async delete(id: string): Promise<TreeLink | null> {
    const [row] = await db
      .delete(treeLinks)
      .where(eq(treeLinks.id, id))
      .returning();
    return row ?? null;
  },

  async updateOrder(id: string, order: number): Promise<void> {
    await db
      .update(treeLinks)
      .set({ order, updatedAt: new Date() })
      .where(eq(treeLinks.id, id));
  },
};

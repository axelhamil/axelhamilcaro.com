import { asc, eq } from "drizzle-orm";
import TreeFooter from "@/app/_components/tree/footer";
import TreeHeader from "@/app/_components/tree/header";
import { db } from "@/drizzle";
import { treeLinks as treeLinksTable } from "@/drizzle/schema";
import TreeLinksWrapper from "./_components/tree-links-wrapper";

export const dynamic = "force-dynamic";

async function getLinks() {
  const links = await db
    .select()
    .from(treeLinksTable)
    .where(eq(treeLinksTable.isActive, true))
    .orderBy(asc(treeLinksTable.order));

  return links;
}

export default async function TreePage() {
  const links = await getLinks();

  return (
    <main className="relative h-full flex flex-col items-center justify-start px-4 pt-20 sm:pt-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4 sm:gap-6">
        <TreeHeader />
        <TreeLinksWrapper links={links} />
        <TreeFooter />
      </div>
    </main>
  );
}

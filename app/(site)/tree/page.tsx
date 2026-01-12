import { db } from "@/app/_lib/db";
import { treeLinks as treeLinksTable } from "@/app/_lib/db/schema";
import { asc, eq } from "drizzle-orm";
import TreeFooter from "@/app/_components/tree/footer";
import TreeHeader from "@/app/_components/tree/header";
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
    <main className="min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] flex flex-col items-center py-6 sm:py-10 md:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6 sm:gap-8">
        <TreeHeader />
        <TreeLinksWrapper links={links} />
        <TreeFooter />
      </div>
    </main>
  );
}

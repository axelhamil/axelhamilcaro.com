export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { treeLinks } from "@/app/_lib/db/schema";
import { asc } from "drizzle-orm";
import { TreeLinksClient } from "./_components/tree-links-client";

async function getLinks() {
  return db.select().from(treeLinks).orderBy(asc(treeLinks.order));
}

export default async function TreeAdminPage() {
  const links = await getLinks();
  return <TreeLinksClient initialLinks={links} />;
}

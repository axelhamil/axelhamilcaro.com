"use client";

import { treeLinks } from "@/app/_config/tree-links";
import TreeFooter from "@/app/_components/tree/footer";
import TreeHeader from "@/app/_components/tree/header";
import TreeLinks from "@/app/_components/tree/links";

export default function TreePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] flex flex-col items-center py-6 sm:py-10 md:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6 sm:gap-8">
        <TreeHeader />
        <TreeLinks links={treeLinks} />
        <TreeFooter />
      </div>
    </main>
  );
}

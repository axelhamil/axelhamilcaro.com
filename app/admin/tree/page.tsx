import { TreeAdminHeader } from "@/src/features/admin-tree/components/tree-admin-header";
import { TreeLinkEditor } from "@/src/features/admin-tree/components/tree-link-editor";
import { TreeLinksList } from "@/src/features/admin-tree/components/tree-links-list";
import { TreeLinksProvider } from "@/src/features/admin-tree/components/tree-links-provider";

export default function TreeAdminPage() {
  return (
    <TreeLinksProvider>
      <div className="space-y-6">
        <TreeAdminHeader />
        <TreeLinkEditor />
        <TreeLinksList />
      </div>
    </TreeLinksProvider>
  );
}

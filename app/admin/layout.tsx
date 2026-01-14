"use client";

import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-theme flex h-screen overflow-hidden bg-[var(--admin-bg-subtle)]">
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--admin-accent)] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)] focus:ring-offset-2"
      >
        Aller au contenu principal
      </a>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main id="admin-main-content" className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

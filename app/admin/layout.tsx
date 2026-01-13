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
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
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

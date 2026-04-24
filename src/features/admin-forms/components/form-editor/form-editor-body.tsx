"use client";

import { motion } from "framer-motion";
import { FormEditorPreview } from "./form-editor-preview";
import { FormEditorTabs } from "./form-editor-tabs";

export function FormEditorBody() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        <FormEditorTabs />
      </motion.div>

      <FormEditorPreview />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useFormEditorContext } from "./form-editor-provider";
import { PreviewPanel } from "./preview-panel";

export function FormEditorPreview() {
  const { formData, getBackgroundStyle } = useFormEditorContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <PreviewPanel
        formData={formData}
        backgroundStyle={getBackgroundStyle()}
      />
    </motion.div>
  );
}

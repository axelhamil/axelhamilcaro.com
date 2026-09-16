"use client";

import { useEffect } from "react";
import { isWebMcpAvailable } from "./is-webmcp-available";

export function WebMcpBootstrap() {
  useEffect(() => {
    const doc = document as Document & {
      modelContext?: { registerTool?: (...args: unknown[]) => unknown };
    };
    const nav = navigator as Navigator & {
      modelContext?: { registerTool?: (...args: unknown[]) => unknown };
    };
    const modelContext = doc.modelContext ?? nav.modelContext;
    if (!isWebMcpAvailable(modelContext)) return;

    const controller = new AbortController();
    import("./register")
      .then(({ registerWebMcpTools }) =>
        registerWebMcpTools(modelContext, controller.signal),
      )
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return null;
}

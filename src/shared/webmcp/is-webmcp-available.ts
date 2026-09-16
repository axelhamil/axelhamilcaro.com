export type WebMcpHost = {
  registerTool?: (...args: unknown[]) => unknown;
};

export function isWebMcpAvailable(
  modelContext: WebMcpHost | null | undefined,
): modelContext is WebMcpHost & {
  registerTool: (...args: unknown[]) => unknown;
} {
  return typeof modelContext?.registerTool === "function";
}

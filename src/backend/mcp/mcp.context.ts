import { AsyncLocalStorage } from "node:async_hooks";

export type McpStore = {
  request: Request;
  pending?: {
    method: string;
    name: string | null;
    clientName: string | null;
    clientVersion: string | null;
    toolArguments: Record<string, string | null> | null;
  };
  errorMessage?: string;
  toolFailed?: boolean;
};

const storage = new AsyncLocalStorage<McpStore>();

export function runWithMcpRequest<T>(request: Request, fn: () => T) {
  return storage.run({ request }, fn);
}

export function getMcpStore(): McpStore | undefined {
  return storage.getStore();
}

export function getMcpRequest(): Request | undefined {
  return storage.getStore()?.request;
}

export function setMcpPending(pending: McpStore["pending"]) {
  const store = storage.getStore();
  if (store) store.pending = pending;
}

export function setMcpError(message: string, options = { toolFailed: false }) {
  const store = storage.getStore();
  if (!store) return;

  store.errorMessage ??= message;
  if (options.toolFailed) store.toolFailed = true;
}

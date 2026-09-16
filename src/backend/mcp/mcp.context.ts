import { AsyncLocalStorage } from "node:async_hooks";

type McpStore = {
  request: Request;
  pending?: {
    method: string;
    name: string | null;
    clientName: string | null;
    clientVersion: string | null;
  };
};

const storage = new AsyncLocalStorage<McpStore>();

export function runWithMcpRequest<T>(request: Request, fn: () => T) {
  return storage.run({ request }, fn);
}

export function getMcpRequest(): Request | undefined {
  return storage.getStore()?.request;
}

export function setMcpPending(pending: McpStore["pending"]) {
  const store = storage.getStore();
  if (store) store.pending = pending;
}

export function getMcpPending() {
  return storage.getStore()?.pending;
}

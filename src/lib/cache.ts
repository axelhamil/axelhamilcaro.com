import { unstable_cache } from "next/cache";
import { cache } from "react";

type CacheConfig = {
  revalidate?: number;
  tags?: string[];
};

export function createCachedFn<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  keyParts: string[],
  config: CacheConfig = {},
): (...args: TArgs) => Promise<TResult> {
  const { revalidate = 60, tags = [] } = config;

  const requestMemoized = cache(fn);

  const dataCached = unstable_cache(requestMemoized, keyParts, {
    revalidate,
    tags,
  });

  return dataCached as (...args: TArgs) => Promise<TResult>;
}

export const CACHE_TAGS = {
  forms: "forms",
  leads: "leads",
  treeLinks: "tree-links",
  analytics: "analytics",
} as const;

export const CACHE_TIMES = {
  short: 60,
  medium: 300,
  long: 3600,
} as const;

"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  addTransitionType,
  startTransition,
  useEffect,
  useLayoutEffect,
} from "react";
import { planTraverse, type TraversePlan } from "./traverse-plan";

interface HistoryEntry {
  key: string;
  index: number;
  url: string | null;
}

interface TraverseEvent extends Event {
  navigationType: string;
  canIntercept: boolean;
  hashChange: boolean;
  destination: HistoryEntry;
  intercept(options: { scroll: "manual"; focusReset: "manual" }): void;
}

interface HistoryNavigation extends EventTarget {
  currentEntry: HistoryEntry | null;
}

interface TransitionDocument {
  activeViewTransition: ViewTransition | null;
}

const DETAIL_PAGE = "main.cas, .article-corps";

const scrollTopByEntry = new Map<string, number>();

let pending: TraversePlan | null = null;
let replay: ReturnType<typeof setTimeout> | undefined;

const hasNavigation = (
  target: Window,
): target is Window & { navigation: HistoryNavigation } =>
  "navigation" in target;

const tracksTransition = (
  target: Document,
): target is Document & TransitionDocument => "activeViewTransition" in target;

const isTraverseEvent = (event: Event): event is TraverseEvent =>
  "navigationType" in event && "destination" in event;

const isRouterState = (state: unknown) =>
  typeof state === "object" && state !== null && "__NA" in state;

function restoreScroll() {
  if (!pending) return;

  window.scrollTo({ top: pending.scrollTop, behavior: "instant" });
  pending = null;
}

function interceptTraverse(event: Event) {
  if (!hasNavigation(window) || !isTraverseEvent(event)) return;

  const current = window.navigation.currentEntry;

  if (!current) return;

  scrollTopByEntry.set(current.key, window.scrollY);

  if (event.navigationType === "replace") return;

  const { destination } = event;

  pending = planTraverse({
    navigationType: event.navigationType,
    canIntercept: event.canIntercept,
    hashChange: event.hashChange,
    supportsViewTransition: "startViewTransition" in document,
    fromPath: window.location.pathname,
    toPath: new URL(destination.url ?? "", window.location.href).pathname,
    fromIndex: current.index,
    toIndex: destination.index,
    leavingDetailPage: document.querySelector(DETAIL_PAGE) !== null,
    savedScrollTop: scrollTopByEntry.get(destination.key),
  });

  if (!pending) return;

  event.intercept({ scroll: "manual", focusReset: "manual" });

  if (tracksTransition(document))
    document.activeViewTransition?.skipTransition();
}

export function TraverseTransition() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!hasNavigation(window)) return;

    const { navigation } = window;

    const replayAsTransition = (event: PopStateEvent) => {
      if (!pending) return;

      if (!isRouterState(event.state)) {
        restoreScroll();
        return;
      }

      event.stopImmediatePropagation();
      clearTimeout(replay);

      const { transitionType } = pending;
      const { pathname, search, hash } = window.location;

      replay = setTimeout(() => {
        startTransition(() => {
          if (transitionType) addTransitionType(transitionType);

          router.replace(pathname + search + hash, { scroll: false });
        });
      });
    };

    navigation.addEventListener("navigate", interceptTraverse);
    window.addEventListener("popstate", replayAsTransition, true);

    return () => {
      navigation.removeEventListener("navigate", interceptTraverse);
      window.removeEventListener("popstate", replayAsTransition, true);
    };
  }, [router]);

  useLayoutEffect(() => {
    if (pending?.path === pathname) restoreScroll();
  }, [pathname]);

  return null;
}

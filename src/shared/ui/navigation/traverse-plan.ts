export type TraverseTransitionType = "retour-avance" | "retour-recule";

export interface TraverseContext {
  navigationType: string;
  canIntercept: boolean;
  hashChange: boolean;
  supportsViewTransition: boolean;
  fromPath: string;
  toPath: string;
  fromIndex: number;
  toIndex: number;
  leavingDetailPage: boolean;
  savedScrollTop: number | undefined;
}

export interface TraversePlan {
  path: string;
  scrollTop: number;
  transitionType: TraverseTransitionType | null;
}

const isAdminPath = (path: string) =>
  path === "/admin" || path.startsWith("/admin/");

export function planTraverse(context: TraverseContext): TraversePlan | null {
  const { fromPath, toPath, savedScrollTop } = context;

  if (context.navigationType !== "traverse") return null;

  if (!context.canIntercept || context.hashChange) return null;

  if (!context.supportsViewTransition) return null;

  if (fromPath === toPath) return null;

  if (isAdminPath(fromPath) || isAdminPath(toPath)) return null;

  if (savedScrollTop === undefined) return null;

  const isBack = context.toIndex < context.fromIndex;
  const backType = context.leavingDetailPage
    ? "retour-recule"
    : "retour-avance";

  return {
    path: toPath,
    scrollTop: savedScrollTop,
    transitionType: isBack ? backType : null,
  };
}

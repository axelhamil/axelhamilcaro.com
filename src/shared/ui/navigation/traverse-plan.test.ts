import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { planTraverse, type TraverseContext } from "./traverse-plan";

const backFromCaseToList: TraverseContext = {
  navigationType: "traverse",
  canIntercept: true,
  hashChange: false,
  supportsViewTransition: true,
  fromPath: "/portfolio/civitime",
  toPath: "/portfolio",
  fromIndex: 1,
  toIndex: 0,
  leavingDetailPage: true,
  savedScrollTop: 4745,
};

describe("planTraverse", () => {
  test("going back from a detail page sweeps backwards to the saved scroll", () => {
    assert.deepEqual(planTraverse(backFromCaseToList), {
      path: "/portfolio",
      scrollTop: 4745,
      transitionType: "retour-recule",
    });
  });

  test("going back from a hub reverses the sweep that led to it", () => {
    const plan = planTraverse({
      ...backFromCaseToList,
      fromPath: "/about",
      toPath: "/",
      leavingDetailPage: false,
    });

    assert.equal(plan?.transitionType, "retour-avance");
  });

  test("going forward replays the default direction", () => {
    const plan = planTraverse({
      ...backFromCaseToList,
      fromPath: "/portfolio",
      toPath: "/portfolio/civitime",
      fromIndex: 0,
      toIndex: 1,
      leavingDetailPage: false,
    });

    assert.equal(plan?.transitionType, null);
  });

  test("leaves the browser alone when the traversal cannot be animated safely", () => {
    const untouched: Partial<TraverseContext>[] = [
      { navigationType: "push" },
      { navigationType: "reload" },
      { canIntercept: false },
      { hashChange: true },
      { supportsViewTransition: false },
      { toPath: "/portfolio/civitime" },
      { savedScrollTop: undefined },
      { toPath: "/admin" },
      { fromPath: "/admin/leads" },
    ];

    for (const override of untouched) {
      assert.equal(planTraverse({ ...backFromCaseToList, ...override }), null);
    }
  });
});

import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { z } from "zod";
import { contactSubmitSchema } from "./contact.schema";

const fieldErrors = (payload: unknown) => {
  const result = contactSubmitSchema.safeParse(payload);

  assert.equal(result.success, false);

  return result.success ? {} : z.flattenError(result.error).fieldErrors;
};

describe("contact form validation", () => {
  test("an empty form gets the messages shown under each field", () => {
    const errors = fieldErrors({
      email: " ",
      message: "  trop court  ",
      projectType: "",
      budget: "",
    });

    assert.deepEqual(errors.email, [
      "Ton email est requis pour qu'on puisse te répondre.",
    ]);
    assert.deepEqual(errors.message, [
      "Décris ton projet en au moins 80 caractères (10 actuellement).",
    ]);
    assert.deepEqual(errors.projectType, ["Sélectionne le type de projet."]);
    assert.deepEqual(errors.budget, ["Sélectionne une fourchette de budget."]);
  });

  test("a malformed email is told apart from a missing one", () => {
    const errors = fieldErrors({
      email: "pas-un-email",
      message: "x".repeat(80),
      projectType: "tma",
      budget: "s",
    });

    assert.deepEqual(errors.email, ["Cet email n'a pas l'air valide."]);
    assert.equal(errors.message, undefined);
  });

  test("a complete request passes", () => {
    const result = contactSubmitSchema.safeParse({
      email: " client@exemple.com ",
      message: "x".repeat(80),
      projectType: "tma",
      budget: "s",
    });

    assert.equal(result.success && result.data.email, "client@exemple.com");
  });
});

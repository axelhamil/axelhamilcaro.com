import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Form } from "@/drizzle/schema";
import { FormPageBackground } from "./form-background";
import { FormCard } from "./form-card";

const baseForm: Form = {
  id: "form-test",
  slug: "mon-template",
  title: "Mon guide",
  description: "Une description",
  backgroundType: "gradient",
  backgroundColor: "#1e1e2e",
  backgroundGradient: "linear-gradient(135deg, #ffe2d6, #ff6b35)",
  backgroundImage: null,
  badgeText: "Offert",
  badgeColor: "#ff4d00",
  badgeStyle: "outline",
  cardImage: null,
  buttonText: "Recevoir",
  buttonSubtext: null,
  isActive: true,
  emailSubject: null,
  emailBody: null,
  emailCtaText: null,
  emailCtaUrl: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

const renderPage = (form: Form) =>
  renderToStaticMarkup(
    <FormPageBackground form={form}>
      <FormCard form={form} />
    </FormPageBackground>,
  );

describe("public form page", () => {
  test("applies the gradient background and badge color set in the editor", () => {
    const html = renderPage(baseForm);

    assert.match(
      html,
      /--form-fond:linear-gradient\(135deg, #ffe2d6, #ff6b35\)/,
    );
    assert.match(html, /--form-accent:#ff4d00/);
  });

  test("applies the plain color background", () => {
    const html = renderPage({
      ...baseForm,
      backgroundType: "color",
      backgroundColor: "#123456",
    });

    assert.match(html, /--form-fond:#123456/);
  });

  test("keeps the image background out of the color variable", () => {
    const html = renderPage({
      ...baseForm,
      backgroundType: "image",
      backgroundImage: "/fond.jpg",
    });

    assert.doesNotMatch(html, /--form-fond/);
  });

  test("renders the badge with the style chosen in the editor", () => {
    assert.match(renderPage(baseForm), /data-badge="outline"/);
    assert.match(
      renderPage({ ...baseForm, badgeStyle: "filled" }),
      /data-badge="filled"/,
    );
  });
});

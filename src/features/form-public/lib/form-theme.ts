import type { CSSProperties } from "react";
import type { Form } from "@/drizzle/schema";

type FormThemeVariable = "--form-fond" | "--form-accent";

export type FormThemeStyle = CSSProperties &
  Partial<Record<FormThemeVariable, string>>;

export type FormBadgeStyle = "filled" | "outline";

type FormTheme = Pick<
  Form,
  "backgroundType" | "backgroundColor" | "backgroundGradient" | "badgeColor"
>;

function backgroundOf(form: FormTheme) {
  if (form.backgroundType === "image") return null;
  if (form.backgroundType === "gradient") return form.backgroundGradient;
  return form.backgroundColor;
}

export function formThemeStyle(form: FormTheme): FormThemeStyle {
  const fond = backgroundOf(form);

  return {
    ...(fond ? { "--form-fond": fond } : {}),
    ...(form.badgeColor ? { "--form-accent": form.badgeColor } : {}),
  };
}

export function formBadgeStyle(form: Pick<Form, "badgeStyle">): FormBadgeStyle {
  return form.badgeStyle === "outline" ? "outline" : "filled";
}

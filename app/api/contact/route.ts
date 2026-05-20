import { ZodError } from "zod";
import {
  type BudgetRangeValue,
  calculateLeadScore,
  getBudgetRange,
  getProjectType,
  type ProjectTypeValue,
} from "@/src/backend/contact/contact.config";
import { contactSubmitSchema } from "@/src/backend/contact/contact.schema";
import { emailService } from "@/src/backend/email/email.service";
import { env } from "@/src/lib/env";
import { json } from "@/src/lib/http";

const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const turnstileSecret =
  env.TURNSTILE_SECRET_KEY ||
  (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SECRET : undefined);

async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
): Promise<boolean> {
  if (!turnstileSecret) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret: turnstileSecret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ success: true });
  }

  const parsed = contactSubmitSchema.safeParse(payload);
  if (!parsed.success) {
    if (parsed.error instanceof ZodError) {
      console.log("[contact] validation failed", parsed.error.issues);
    }
    return json({ success: true });
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return json({ success: true });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null;

  const captchaOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!captchaOk) {
    console.log("[contact] captcha invalid", { ip });
    return json({ success: true });
  }

  const projectType = getProjectType(
    parsed.data.projectType as ProjectTypeValue,
  );
  const budget = getBudgetRange(parsed.data.budget as BudgetRangeValue);

  if (!projectType || !budget) {
    return json({ success: true });
  }

  const score = calculateLeadScore(projectType.value, budget.value);

  const result = await emailService.sendContactMessage({
    email: parsed.data.email,
    name: parsed.data.name,
    message: parsed.data.message,
    projectTypeLabel: projectType.label,
    budgetLabel: budget.label,
    score,
    inScope: projectType.inScope,
    sourcePath: parsed.data.sourcePath,
  });

  if (!result.success) {
    console.error("[contact] send failed", result.error);
    return json(
      { success: false, error: "Le message n'a pas pu être envoyé." },
      500,
    );
  }

  return json({ success: true });
}

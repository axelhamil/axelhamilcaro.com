import { ZodError } from "zod";
import { NotFoundError, ValidationError } from "@/src/core/errors/domain.error";
import { authService } from "@/src/features/auth/auth.service";
import { formRepository } from "@/src/features/forms/form.repository";
import { error, json } from "@/src/lib/http";
import { leadService } from "./lead.service";

export async function list(formId: string | undefined, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const [leads, forms] = await Promise.all([
      leadService.list(formId),
      formRepository.findAllForDropdown(),
    ]);
    return json({ leads, forms });
  } catch (_err) {
    return error("Failed to fetch leads");
  }
}

export async function update(id: string, body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  if (!id) {
    return error("Lead ID is required", 400);
  }

  try {
    const lead = await leadService.update(id, body);
    return json({ success: true, lead });
  } catch (err) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    return error("Failed to update lead");
  }
}

export async function remove(id: string, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  if (!id) {
    return error("Lead ID is required", 400);
  }

  try {
    await leadService.delete(id);
    return json({ success: true });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    return error("Failed to delete lead");
  }
}

export async function submit(slug: string, body: { source?: string }) {
  try {
    await leadService.submit(slug, body, body.source);
    return json({ success: true }, 201);
  } catch (err) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    if (err instanceof NotFoundError) {
      return error("Form not found", 404);
    }
    if (err instanceof ValidationError) {
      return error(err.message, 400);
    }
    return error("Failed to submit form");
  }
}

import { ZodError } from "zod";
import { ConflictError, NotFoundError } from "@/src/core/errors/domain.error";
import { authService } from "@/src/features/auth/auth.service";
import { error, json } from "@/src/lib/http";
import { formService } from "./form.service";

export async function list(headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const forms = await formService.list();
    return json(forms);
  } catch {
    return error("Failed to fetch forms");
  }
}

export async function getById(id: string, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const form = await formService.getById(id);
    return json(form);
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    return error("Failed to fetch form");
  }
}

export async function create(body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const form = await formService.create(body);
    return json(form, 201);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    if (err instanceof ConflictError) {
      return error(err.message, 400);
    }
    return error("Erreur lors de la création du formulaire");
  }
}

export async function update(id: string, body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const form = await formService.update(id, body);
    return json(form);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    if (err instanceof ConflictError) {
      return error(err.message, 400);
    }
    return error("Erreur lors de la mise à jour du formulaire");
  }
}

export async function remove(id: string, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    await formService.delete(id);
    return json({ success: true });
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    return error("Failed to delete form");
  }
}

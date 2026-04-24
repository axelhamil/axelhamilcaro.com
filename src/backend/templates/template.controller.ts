import { ZodError } from "zod";
import { authService } from "@/src/backend/auth/auth.service";
import { NotFoundError } from "@/src/core/errors/domain.error";
import { error, json } from "@/src/lib/http";
import { templateService } from "./template.service";

export async function list(headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const templates = await templateService.list();
    return json(templates);
  } catch {
    return error("Failed to fetch templates");
  }
}

export async function create(body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const template = await templateService.create(body);
    return json(template, 201);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    return error("Failed to create template");
  }
}

export async function remove(id: string, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    await templateService.delete(id);
    return json({ success: true });
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    return error("Failed to delete template");
  }
}

import { ZodError } from "zod";
import { NotFoundError } from "@/src/core/errors/domain.error";
import { error, json } from "@/src/lib/http";
import { authService } from "@/src/features/auth/auth.service";
import { treeLinkService } from "./tree-link.service";

export async function list() {
  const links = await treeLinkService.list();
  return json(links);
}

export async function listActive() {
  const links = await treeLinkService.listActive();
  return json(links);
}

export async function create(body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const link = await treeLinkService.create(body);
    return json(link, 201);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    throw err;
  }
}

export async function update(id: string, body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const link = await treeLinkService.update(id, body);
    return json(link);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    throw err;
  }
}

export async function remove(id: string, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    await treeLinkService.delete(id);
    return json({ success: true });
  } catch (err: unknown) {
    if (err instanceof NotFoundError) {
      return error(err.message, 404);
    }
    throw err;
  }
}

export async function reorder(body: unknown, headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    await treeLinkService.reorder(body);
    return json({ success: true });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    throw err;
  }
}

import { z } from "zod";

const codeSchema = z.union([z.string(), z.number()]).transform(String);

const codedErrorSchema = z.object({ code: codeSchema });

const wrappedErrorSchema = z.object({ cause: codedErrorSchema });

function errorCode(error: unknown) {
  const direct = codedErrorSchema.safeParse(error);
  if (direct.success) return direct.data.code;

  const wrapped = wrappedErrorSchema.safeParse(error);
  if (wrapped.success) return wrapped.data.cause.code;

  return null;
}

function errorName(error: unknown) {
  if (error === undefined) return null;

  return error instanceof Error ? error.name : typeof error;
}

export function logMcpFailure(scope: string, message: string, error?: unknown) {
  console.error(
    JSON.stringify({
      level: "error",
      scope,
      message,
      errorName: errorName(error),
      code: errorCode(error),
    }),
  );
}

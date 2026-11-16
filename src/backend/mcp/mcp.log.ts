function errorCode(error: unknown) {
  if (!error || typeof error !== "object") return null;
  const code = Reflect.get(error, "code");
  return typeof code === "string" || typeof code === "number"
    ? String(code)
    : null;
}

export function logMcpFailure(scope: string, message: string, error: unknown) {
  console.error(
    JSON.stringify({
      level: "error",
      scope,
      message,
      errorName: error instanceof Error ? error.name : typeof error,
      code: errorCode(error),
    }),
  );
}

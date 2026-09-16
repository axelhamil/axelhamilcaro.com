import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export function json<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonWithHeaders<T>(
  data: T,
  headers: Record<string, string>,
  status = 200,
) {
  return NextResponse.json(data, { status, headers });
}

export function jsonCached<T>(
  data: T,
  request: Request,
  headers: Record<string, string>,
) {
  const etag = `"${createHash("sha1").update(JSON.stringify(data)).digest("hex")}"`;
  const merged = { ...headers, ETag: etag };
  const cached = request.headers.get("if-none-match");
  if (cached?.split(/,\s*/).includes(etag))
    return new NextResponse(null, { status: 304, headers: merged });

  return NextResponse.json(data, { headers: merged });
}

export function error(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function rateLimited(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests" },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    },
  );
}

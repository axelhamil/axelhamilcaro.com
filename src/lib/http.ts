import { NextResponse } from "next/server";

function weakEtag(data: unknown) {
  const json = JSON.stringify(data);
  let hash = 2166136261;
  for (let i = 0; i < json.length; i++) {
    hash ^= json.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `"${(hash >>> 0).toString(16)}-${json.length.toString(16)}"`;
}

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
  try {
    const etag = weakEtag(data);
    const merged = { ...headers, ETag: etag };
    const cached = request.headers.get("if-none-match");
    if (cached?.split(/,\s*/).includes(etag))
      return new NextResponse(null, { status: 304, headers: merged });

    return NextResponse.json(data, { headers: merged });
  } catch {
    return NextResponse.json(data, { headers });
  }
}

export function noContent(headers: Record<string, string>) {
  return new NextResponse(null, { status: 204, headers });
}

export function withCors(response: Response, cors: Record<string, string>) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(cors)) headers.set(key, value);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
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

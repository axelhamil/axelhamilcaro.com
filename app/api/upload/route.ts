import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/_lib/api-auth";

export async function POST(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) {
    return authResult.response;
  }

  const formData = await request.formData();
  const fileEntry = formData.get("file");

  if (!fileEntry || typeof fileEntry === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const file = fileEntry;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed" },
      { status: 400 },
    );
  }

  try {
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

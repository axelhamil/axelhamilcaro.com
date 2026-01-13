import { db } from "@/app/_lib/db";
import { linkClicks, pageViews } from "@/app/_lib/db/schema";
import { NextResponse } from "next/server";

function parseUserAgent(ua: string | null) {
  if (!ua) return { device: "unknown", browser: "unknown", os: "unknown" };

  let device = "desktop";
  if (/mobile/i.test(ua)) device = "mobile";
  else if (/tablet|ipad/i.test(ua)) device = "tablet";

  let browser = "unknown";
  if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";

  let os = "unknown";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/mac/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad/i.test(ua)) os = "iOS";

  return { device, browser, os };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type,
      path,
      targetUrl,
      linkId,
      referrer,
      sessionId,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    const userAgent = request.headers.get("user-agent");
    const { device, browser, os } = parseUserAgent(userAgent);

    if (type === "pageview") {
      await db.insert(pageViews).values({
        path,
        referrer,
        userAgent,
        device,
        browser,
        os,
        sessionId,
        utmSource,
        utmMedium,
        utmCampaign,
      });
    } else if (type === "click") {
      await db.insert(linkClicks).values({
        linkId: linkId || null,
        path,
        targetUrl,
        referrer,
        userAgent,
        sessionId,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to track:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

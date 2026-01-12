import { db } from "@/app/_lib/db";
import {
  forms,
  leads,
  linkClicks,
  pageViews,
  treeLinks,
} from "@/app/_lib/db/schema";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = Number.parseInt(searchParams.get("days") || "30");
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [totalViews] = await db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate));

    const [totalClicks] = await db
      .select({ count: count() })
      .from(linkClicks)
      .where(gte(linkClicks.createdAt, startDate));

    const [totalLeads] = await db
      .select({ count: count() })
      .from(leads)
      .where(gte(leads.createdAt, startDate));

    const [activeForms] = await db
      .select({ count: count() })
      .from(forms)
      .where(eq(forms.isActive, true));

    const viewsByPage = await db
      .select({ path: pageViews.path, count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(10);

    const viewsByDevice = await db
      .select({ device: pageViews.device, count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.device);

    const viewsByBrowser = await db
      .select({ browser: pageViews.browser, count: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, startDate))
      .groupBy(pageViews.browser);

    const topLinks = await db
      .select({
        id: treeLinks.id,
        title: treeLinks.title,
        url: treeLinks.url,
        clicks: count(linkClicks.id),
      })
      .from(treeLinks)
      .leftJoin(
        linkClicks,
        and(
          eq(linkClicks.linkId, treeLinks.id),
          gte(linkClicks.createdAt, startDate),
        ),
      )
      .groupBy(treeLinks.id, treeLinks.title, treeLinks.url)
      .orderBy(desc(count(linkClicks.id)))
      .limit(10);

    const viewsOverTime = await db
      .select({
        date: sql<string>`DATE(${pageViews.createdAt})`,
        count: count(),
      })
      .from(pageViews)
      .where(
        gte(
          pageViews.createdAt,
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        ),
      )
      .groupBy(sql`DATE(${pageViews.createdAt})`)
      .orderBy(sql`DATE(${pageViews.createdAt})`);

    const leadsOverTime = await db
      .select({ date: sql<string>`DATE(${leads.createdAt})`, count: count() })
      .from(leads)
      .where(
        gte(leads.createdAt, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      )
      .groupBy(sql`DATE(${leads.createdAt})`)
      .orderBy(sql`DATE(${leads.createdAt})`);

    const recentLeads = await db
      .select({
        id: leads.id,
        firstName: leads.firstName,
        email: leads.email,
        formTitle: forms.title,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .innerJoin(forms, eq(leads.formId, forms.id))
      .orderBy(desc(leads.createdAt))
      .limit(5);

    return NextResponse.json({
      overview: {
        totalViews: totalViews?.count || 0,
        totalClicks: totalClicks?.count || 0,
        totalLeads: totalLeads?.count || 0,
        activeForms: activeForms?.count || 0,
      },
      viewsByPage,
      viewsByDevice,
      viewsByBrowser,
      topLinks,
      viewsOverTime,
      leadsOverTime,
      recentLeads,
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}

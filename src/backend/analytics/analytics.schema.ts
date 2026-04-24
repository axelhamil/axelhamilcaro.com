import { z } from "zod";

export const trackEventSchema = z.object({
  type: z.enum(["pageview", "click"]),
  path: z.string(),
  targetUrl: z.string().optional(),
  linkId: z.string().optional(),
  referrer: z.string().optional(),
  sessionId: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type TrackEventInput = z.infer<typeof trackEventSchema>;

import { z } from "zod";
import { PRIVATE_BUILD_TEXTS } from "./projects";

export const nowEntrySchema = z.object({
  date: z.iso.date(),
  slug: z.string().min(1),
  summary: z.string().min(1),
  next: z.string().min(1),
});

export type NowEntry = z.infer<typeof nowEntrySchema>;

export const sortNowEntries = (entries: readonly NowEntry[]): NowEntry[] =>
  [...entries].sort((a, b) => b.date.localeCompare(a.date));

const { weathertop, afterlive } = PRIVATE_BUILD_TEXTS;

export const NOW_ENTRIES: readonly NowEntry[] = sortNowEntries(
  z.array(nowEntrySchema).parse([
    {
      date: "2026-11-14",
      slug: "weathertop",
      summary: `Weathertop est ${weathertop.pitch}. En chantier depuis ${weathertop.duration}, pas encore sortie.`,
      next: "Je continue ticket par ticket et je ne donne pas de date.",
    },
    {
      date: "2026-11-14",
      slug: "afterlive",
      summary: `Afterlive ${afterlive.pitch}. Je le construis seul depuis fin septembre 2026.`,
      next: "Il sera bientôt en production, sans date annoncée.",
    },
  ]),
);

import type { Viewport } from "next";
import { PALETTE } from "./site.constants";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: PALETTE.papier },
    { media: "(prefers-color-scheme: dark)", color: PALETTE.noir },
  ],
};

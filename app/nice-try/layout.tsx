import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nice Try",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NiceTryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

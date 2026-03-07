import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ScormpilotShowcase = dynamic(
  () => import("./_components/scormpilot-showcase"),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "ScormPilot - Plateforme SaaS e-learning SCORM",
  description:
    "Conception et developpement complet d'une plateforme SaaS multi-tenant pour la gestion et diffusion de modules e-learning SCORM. Alternative simple aux LMS rigides.",
  alternates: {
    canonical: "/portfolio/scormpilot",
  },
  openGraph: {
    title: "ScormPilot - Plateforme SaaS e-learning SCORM",
    description:
      "Plateforme SaaS multi-tenant : gestion, test et diffusion de modules SCORM. Architecture hexagonale, DDD, multi-tenant Identity Platform.",
    url: "/portfolio/scormpilot",
  },
};

export default function ScormpilotPage() {
  return (
    <main className="pb-8">
      <ScormpilotShowcase />
    </main>
  );
}

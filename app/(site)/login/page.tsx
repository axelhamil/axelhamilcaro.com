import type { Metadata } from "next";
import { LoginFooter } from "@/src/features/auth/components/login-footer";
import { LoginHeader } from "@/src/features/auth/components/login-header";
import { LoginPanel } from "@/src/features/auth/components/login-panel";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Mon espace de connexion, réservé à l'administration du site.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="trame pleine-largeur min-h-[calc(100svh-var(--nav-h))] flex">
      <div className="w-full max-w-md m-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-10">
        <LoginHeader />
        <LoginPanel />
        <LoginFooter />
      </div>
    </main>
  );
}

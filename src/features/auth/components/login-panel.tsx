import { Terminal } from "lucide-react";
import { Suspense } from "react";
import { LoginForm } from "@/src/features/auth/components/login-form";
import { LoginLoading } from "@/src/features/auth/components/login-loading";

export function LoginPanel() {
  return (
    <section
      aria-labelledby="login-connexion"
      className="etiquette etiquette-carte etiquette-gris gap-6"
    >
      <h2
        id="login-connexion"
        className="label-mono ink-muted flex items-center gap-2"
      >
        <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
        auth.connect()
      </h2>
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
      <p className="login-note">
        Seul mon compte GitHub autorisé ouvre l'administration.
      </p>
    </section>
  );
}

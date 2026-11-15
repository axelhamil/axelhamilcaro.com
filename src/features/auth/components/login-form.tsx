"use client";

import { Github, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "@/src/shared/api/auth-client";
import { Button } from "@/src/shared/ui/portfolio/button";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackURL = searchParams.get("callbackURL") || "/admin";
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      router.replace("/nice-try");
    }
  }, [error, router]);

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn.social({
        provider: "github",
        callbackURL,
      });

      if (result?.error) {
        setIsLoading(false);
      }
    } catch (_error) {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      className="w-full"
      onClick={handleGitHubSignIn}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      ) : (
        <Github className="w-5 h-5" aria-hidden="true" />
      )}
      {isLoading ? "Connexion..." : "Continuer avec GitHub"}
    </Button>
  );
}

"use client";

import { signIn } from "@/app/_lib/auth-client";
import { Github, Loader2, Lock, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
        console.error("Sign in error:", result.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <Lock className="w-7 h-7 text-accent" />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-primary tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Administration
        </motion.h1>

        <motion.p
          className="text-secondary mt-3 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Accès réservé au propriétaire du site
        </motion.p>
      </div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl" />

        <div className="relative bg-primary-background border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-muted mb-6 font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>auth.connect()</span>
          </div>

          <motion.button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full relative group flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-medium rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered && !isLoading ? "0%" : "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Github className="w-5 h-5" />
              )}
              <span>
                {isLoading ? "Connexion..." : "Continuer avec GitHub"}
              </span>
            </span>
          </motion.button>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted text-center leading-relaxed">
              En vous connectant, vous acceptez de vous identifier
              <br />
              via votre compte GitHub autorisé.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors duration-200"
        >
          <span>←</span>
          <span>Retour au site</span>
        </a>
      </motion.div>
    </motion.div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-background animate-pulse mb-6" />
        <div className="h-10 bg-secondary-background rounded-lg w-48 mx-auto animate-pulse" />
        <div className="h-5 bg-secondary-background rounded w-64 mx-auto mt-3 animate-pulse" />
      </div>
      <div className="bg-primary-background border border-border rounded-2xl p-8">
        <div className="h-14 bg-secondary-background rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 bg-primary-background relative overflow-hidden">
      <Suspense fallback={<LoadingFallback />}>
        <LoginForm />
      </Suspense>

      <motion.p
        className="absolute bottom-6 text-xs text-muted font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        axel_hamilcaro() • {new Date().getFullYear()}
      </motion.p>
    </div>
  );
}

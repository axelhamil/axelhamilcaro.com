"use client";

import type { Form } from "@/app/_lib/db/schema";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Sparkles, Send, User, Mail } from "lucide-react";
import { useState, useEffect } from "react";

interface FormCardProps {
  form: Form;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

function FloatingParticles({ color }: { color: string }) {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const newParticles: FloatingParticle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function SuccessAnimation({ firstName, accentColor }: { firstName: string; accentColor: string }) {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${accentColor}, transparent 70%)`,
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: accentColor }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Merci {firstName} !
            </h2>
            <p className="text-white/70 text-lg">
              Ta demande a bien été envoyée
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {["🎉", "✨", "🚀"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function FormCard({ form }: FormCardProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const accentColor = form.badgeColor || "#ff4d00";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/submit/${form.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessAnimation firstName={firstName} accentColor={accentColor} />;
  }

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
        style={{ background: accentColor }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: accentColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-5">
            {form.cardImage && (
              <motion.div
                className="hidden sm:block w-24 h-24 rounded-2xl overflow-hidden shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                style={{
                  boxShadow: `0 10px 30px ${accentColor}40`,
                }}
              >
                <img
                  src={form.cardImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            <div className="flex-1 min-w-0">
              {form.badgeText && (
                <motion.span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white mb-3"
                  style={{ backgroundColor: accentColor }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-3 h-3" />
                  {form.badgeText}
                </motion.span>
              )}

              <motion.h1
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {form.title}
              </motion.h1>

              {form.description && (
                <motion.p
                  className="text-white/60 text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {form.description}
                </motion.p>
              )}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="space-y-1.5">
              <label
                htmlFor="firstName"
                className="text-xs font-medium text-white/70 uppercase tracking-wider"
              >
                Prénom
              </label>
              <motion.div
                className="relative"
                animate={{
                  scale: focusedField === "firstName" ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Ton prénom"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 disabled:opacity-50"
                  style={{
                    boxShadow: focusedField === "firstName" ? `0 0 20px ${accentColor}40` : "none",
                  }}
                />
              </motion.div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-white/70 uppercase tracking-wider"
              >
                Email
              </label>
              <motion.div
                className="relative"
                animate={{
                  scale: focusedField === "email" ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="ton@email.com"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 disabled:opacity-50"
                  style={{
                    boxShadow: focusedField === "email" ? `0 0 20px ${accentColor}40` : "none",
                  }}
                />
              </motion.div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 10px 30px ${accentColor}50`,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {form.buttonText}
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            className="mt-6 text-center text-xs text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            🔒 Tes données sont en sécurité
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

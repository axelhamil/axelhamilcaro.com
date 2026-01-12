"use client";

import type { Form } from "@/app/_lib/db/schema";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Sparkles, Send, User, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

interface FormCardProps {
  form: Form;
}

function SuccessState({ firstName, accentColor }: { firstName: string; accentColor: string }) {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-2" style={{ backgroundColor: accentColor }} />

        <div className="p-8 sm:p-12 text-center">
          <motion.div
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: `${accentColor}15` }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: accentColor }} />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Merci {firstName} !
          </motion.h2>

          <motion.p
            className="text-gray-500 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Ta demande a bien été envoyée
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {["🎉", "✨", "🚀"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </div>
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
    return <SuccessState firstName={firstName} accentColor={accentColor} />;
  }

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <motion.div
          className="h-2"
          style={{ backgroundColor: accentColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <div className="p-6 sm:p-8">
          <div className="flex gap-5">
            {form.cardImage && (
              <motion.div
                className="hidden sm:block shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div
                  className="w-28 h-28 rounded-xl overflow-hidden shadow-lg"
                  style={{ boxShadow: `0 8px 30px ${accentColor}25` }}
                >
                  <img
                    src={form.cardImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}

            <div className="flex-1 min-w-0">
              {form.badgeText && (
                <motion.span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white mb-3"
                  style={{ backgroundColor: accentColor }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-3 h-3" />
                  {form.badgeText}
                </motion.span>
              )}

              <motion.h1
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {form.title}
              </motion.h1>

              {form.description && (
                <motion.p
                  className="text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {form.description}
                </motion.p>
              )}
            </div>
          </div>

          <motion.div
            className="h-px bg-gray-100 my-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          />

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Prénom
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "firstName" ? 1.01 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:bg-white"
                  style={{
                    borderColor: focusedField === "firstName" ? accentColor : "transparent",
                    boxShadow: focusedField === "firstName" ? `0 0 0 4px ${accentColor}15` : "none",
                  }}
                />
              </motion.div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === "email" ? 1.01 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent text-gray-900 placeholder-gray-400 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:bg-white"
                  style={{
                    borderColor: focusedField === "email" ? accentColor : "transparent",
                    boxShadow: focusedField === "email" ? `0 0 0 4px ${accentColor}15` : "none",
                  }}
                />
              </motion.div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                >
                  <span className="shrink-0">⚠️</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70"
              style={{ backgroundColor: accentColor }}
              whileHover={{ scale: 1.02, boxShadow: `0 10px 40px ${accentColor}40` }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  {form.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>🔒</span>
            Tes données restent confidentielles
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

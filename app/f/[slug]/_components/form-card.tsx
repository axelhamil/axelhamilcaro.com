"use client";

import type { Form } from "@/app/_lib/db/schema";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Sparkles, ArrowRight, User, Mail } from "lucide-react";
import { useState } from "react";

interface FormCardProps {
  form: Form;
}

function SuccessState({ firstName, accentColor }: { firstName: string; accentColor: string }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1.5" style={{ backgroundColor: accentColor }} />

        <div className="p-10 sm:p-14 text-center">
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: `${accentColor}12` }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: accentColor }} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Merci {firstName} !
          </h2>

          <p className="text-gray-500 text-lg">
            Ta demande a bien été envoyée
          </p>
        </div>
      </div>
    </div>
  );
}

export function FormCard({ form }: FormCardProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-1.5" style={{ backgroundColor: accentColor }} />

        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {form.cardImage && (
              <div className="shrink-0 mx-auto sm:mx-0">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-lg"
                  style={{ boxShadow: `0 8px 30px ${accentColor}20` }}
                >
                  <img
                    src={form.cardImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              {form.badgeText && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white mb-3"
                  style={{ backgroundColor: accentColor }}
                >
                  <Sparkles className="w-3 h-3" />
                  {form.badgeText}
                </span>
              )}

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {form.title}
              </h1>

              {form.description && (
                <p className="text-gray-500">
                  {form.description}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-gray-100 mb-8" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ton prénom"
                    required
                    disabled={isSubmitting}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 transition-colors duration-200 disabled:opacity-50 focus:outline-none focus:border-gray-300 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    required
                    disabled={isSubmitting}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 transition-colors duration-200 disabled:opacity-50 focus:outline-none focus:border-gray-300 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="shrink-0">⚠️</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70 hover:opacity-90"
              style={{ backgroundColor: accentColor }}
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
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            🔒 Tes données restent confidentielles
          </p>
        </div>
      </div>
    </div>
  );
}

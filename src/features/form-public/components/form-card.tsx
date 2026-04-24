"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { Form } from "@/drizzle/schema";

interface FormCardProps {
  form: Form;
}

function FloatingParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: `${x}%`,
        background:
          "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.3) 100%)",
      }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: [-20, -100],
        opacity: [0, 1, 0],
        scale: [0, 1, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

function SuccessState({
  firstName,
  accentColor,
}: {
  firstName: string;
  accentColor: string;
}) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: Math.random() * 100,
  }));

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-[1px]"
        style={{
          background: `linear-gradient(135deg, ${accentColor}40 0%, transparent 50%, ${accentColor}20 100%)`,
        }}
      >
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
              <FloatingParticle key={p.id} delay={p.delay} x={p.x} />
            ))}
          </div>

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: accentColor }}
          />

          <div className="relative p-12 sm:p-16 text-center">
            <motion.div
              className="relative w-20 h-20 mx-auto mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{ backgroundColor: accentColor }}
              />
              <div
                className="relative w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <Sparkles className="w-9 h-9" style={{ color: accentColor }} />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-3 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Merci {firstName} !
            </motion.h2>

            <motion.p
              className="text-gray-500 text-lg mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Ta demande a bien été envoyée
            </motion.p>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Mail className="w-4 h-4" />
              Pense à vérifier tes spams
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingLabelInput({
  label,
  type,
  value,
  onChange,
  disabled,
  accentColor,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  accentColor: string;
}) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
        disabled={disabled}
        className="peer w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 text-lg transition-all duration-300 focus:outline-none focus:border-current disabled:opacity-50 placeholder-transparent"
        style={{ borderColor: isFocused ? accentColor : undefined }}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-0 transition-all duration-300 pointer-events-none font-medium"
        style={{
          top: isActive ? "-8px" : "16px",
          fontSize: isActive ? "12px" : "16px",
          color: isFocused ? accentColor : "#9ca3af",
          fontWeight: isActive ? 600 : 400,
          letterSpacing: isActive ? "0.05em" : "0",
          textTransform: isActive ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 origin-left"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export function FormCard({ form }: FormCardProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const accentColor = form.badgeColor || "#ff4d00";
  const badgeStyle = form.badgeStyle || "filled";
  const hasLargeImage = !!form.cardImage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/submit/${form.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
        }),
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
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-[1px]"
        style={{
          background: `linear-gradient(135deg, ${accentColor}30 0%, rgba(255,255,255,0.1) 50%, ${accentColor}15 100%)`,
        }}
      >
        <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />

          <div
            className={`relative ${hasLargeImage ? "flex flex-col lg:flex-row" : ""}`}
          >
            {hasLargeImage && (
              <motion.div
                className="lg:w-[45%] shrink-0 relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="h-72 lg:h-full min-h-[400px] relative">
                  <Image
                    src={form.cardImage ?? ""}
                    alt={form.title || "Image du formulaire"}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor} 0%, transparent 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {form.badgeText && (
                    <motion.div
                      className="absolute top-6 left-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase backdrop-blur-md ${
                          badgeStyle === "outline"
                            ? "bg-white/20 border-2"
                            : "text-white border-2 border-transparent"
                        }`}
                        style={{
                          ...(badgeStyle === "outline"
                            ? { borderColor: "white", color: "white" }
                            : { backgroundColor: accentColor }),
                        }}
                      >
                        {form.badgeText}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex-1 relative">
              {!hasLargeImage && (
                <div
                  className="h-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}60 100%)`,
                  }}
                />
              )}

              <div className="p-8 sm:p-12">
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {!hasLargeImage && form.badgeText && (
                    <motion.span
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-6 ${
                        badgeStyle === "outline"
                          ? "bg-transparent border-2"
                          : "text-white border-2 border-transparent"
                      }`}
                      style={{
                        ...(badgeStyle === "outline"
                          ? { borderColor: accentColor, color: accentColor }
                          : { backgroundColor: accentColor }),
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      {form.badgeText}
                    </motion.span>
                  )}

                  <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                    {form.title}
                  </h1>

                  {form.description && (
                    <p className="text-gray-500 text-lg leading-relaxed">
                      {form.description}
                    </p>
                  )}
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="space-y-6">
                    <FloatingLabelInput
                      label="Prénom"
                      type="text"
                      value={firstName}
                      onChange={setFirstName}
                      disabled={isSubmitting}
                      accentColor={accentColor}
                    />
                    <FloatingLabelInput
                      label="Email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      disabled={isSubmitting}
                      accentColor={accentColor}
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        className="flex items-center gap-3 text-red-600 text-sm bg-red-50/80 backdrop-blur border border-red-100 rounded-2xl px-5 py-4"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      >
                        <span className="shrink-0 text-lg">⚠️</span>
                        <span className="font-medium">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    ref={buttonRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full py-5 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 disabled:opacity-70"
                    style={{ backgroundColor: accentColor }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                      }}
                    />

                    <span className="relative flex flex-col items-center justify-center gap-1">
                      {isSubmitting ? (
                        <span className="flex items-center gap-3 text-lg">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <>
                          <span className="flex items-center gap-2 text-lg tracking-wide">
                            {form.buttonText}
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                          {form.buttonSubtext && (
                            <span className="text-sm font-medium opacity-80">
                              {form.buttonSubtext}
                            </span>
                          )}
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>

                <motion.p
                  className="mt-8 text-center text-sm text-gray-400 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <span className="text-base">🔒</span>
                  Tes données restent confidentielles
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

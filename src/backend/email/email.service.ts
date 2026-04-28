import { Resend } from "resend";
import { CONTACT } from "@/app/_config/site.constants";
import { AdminNotification } from "@/src/backend/email/templates/admin-notification";
import { LeadEmail } from "@/src/backend/email/templates/lead-email";
import { env } from "@/src/lib/env";

const resendApiKey = env.RESEND_API_KEY;
const adminEmail = env.ADMIN_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resendApiKey) {
}

interface SendLeadEmailParams {
  to: string;
  firstName: string;
  subject: string;
  body: string;
}

interface SendAdminNotificationParams {
  formTitle: string;
  formSlug: string;
  firstName: string;
  email: string;
  source?: string | null;
}

interface SendContactMessageParams {
  email: string;
  name?: string;
  message: string;
}

export const emailService = {
  async sendLeadEmail({ to, firstName, subject, body }: SendLeadEmailParams) {
    if (!resend) {
      return { success: false, error: "Resend not configured" };
    }

    const parsedSubject = subject.replace(/\{\{firstName\}\}/g, firstName);

    try {
      const { data, error } = await resend.emails.send({
        from: `Axel Hamilcaro <${CONTACT.noreply}>`,
        to: [to],
        subject: parsedSubject,
        react: LeadEmail({ firstName, subject: parsedSubject, body }),
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  },

  async sendContactMessage({ email, name, message }: SendContactMessageParams) {
    if (!resend) {
      return { success: false, error: "Resend not configured" };
    }
    if (!adminEmail) {
      return { success: false, error: "ADMIN_EMAIL not configured" };
    }

    const displayName = name?.trim();
    const fromLine = displayName ? `${displayName} <${email}>` : email;

    try {
      const { data, error } = await resend.emails.send({
        from: `Contact <${CONTACT.noreply}>`,
        to: [adminEmail],
        replyTo: email,
        subject: `Nouveau contact${displayName ? ` de ${displayName}` : ""}`,
        text: `De: ${fromLine}\n\n${message}`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  },

  async sendAdminNotification({
    formTitle,
    formSlug,
    firstName,
    email,
    source,
  }: SendAdminNotificationParams) {
    if (!resend) {
      return { success: false, error: "Resend not configured" };
    }

    if (!adminEmail) {
      return { success: false, error: "ADMIN_EMAIL not configured" };
    }

    try {
      const { data, error } = await resend.emails.send({
        from: `Formulaire <${CONTACT.noreply}>`,
        to: [adminEmail],
        subject: `Nouveau lead: ${firstName} via ${formTitle}`,
        react: AdminNotification({
          formTitle,
          formSlug,
          firstName,
          email,
          source,
        }),
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  },
};

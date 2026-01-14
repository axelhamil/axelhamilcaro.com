import { Resend } from "resend";
import { CONTACT } from "@/app/_config/site.constants";
import { AdminNotification } from "@/app/_lib/emails/admin-notification";
import { LeadEmail } from "@/app/_lib/emails/lead-email";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

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

import { Resend } from "resend";
import { AdminNotification } from "./templates/admin-notification";
import { LeadEmail } from "./templates/lead-email";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

if (!resendApiKey) {
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendLeadEmailParams {
  to: string;
  firstName: string;
  subject: string;
  body: string;
}

export async function sendLeadEmail({
  to,
  firstName,
  subject,
  body,
}: SendLeadEmailParams) {
  if (!resend) {
    return { success: false, error: "Resend not configured" };
  }

  const parsedSubject = subject.replace(/\{\{firstName\}\}/g, firstName);

  try {
    const { data, error } = await resend.emails.send({
      from: "Axel Hamilcaro <noreply@axelhamilcaro.com>",
      to: [to],
      subject: parsedSubject,
      react: LeadEmail({ firstName, subject: parsedSubject, body }),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

interface SendAdminNotificationParams {
  formTitle: string;
  formSlug: string;
  firstName: string;
  email: string;
  source?: string | null;
}

export async function sendAdminNotification({
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
      from: "Formulaire <noreply@axelhamilcaro.com>",
      to: [adminEmail],
      subject: `🎯 Nouveau lead: ${firstName} via ${formTitle}`,
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
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

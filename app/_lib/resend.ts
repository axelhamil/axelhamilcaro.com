import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("RESEND_API_KEY is not configured - emails will not be sent");
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendLeadNotificationParams {
  to: string;
  subject: string;
  body: string;
  firstName: string;
  email: string;
}

export async function sendLeadNotification({
  to,
  subject,
  body,
  firstName,
  email,
}: SendLeadNotificationParams) {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return { success: false, error: "Resend not configured" };
  }

  const parsedSubject = subject
    .replace(/\{\{firstName\}\}/g, firstName)
    .replace(/\{\{email\}\}/g, email);

  const parsedBody = body
    .replace(/\{\{firstName\}\}/g, firstName)
    .replace(/\{\{email\}\}/g, email);

  try {
    const { data, error } = await resend.emails.send({
      from: "Formulaire <noreply@axelhamilcaro.com>",
      to: [to],
      subject: parsedSubject,
      html: parsedBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

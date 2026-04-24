import { emailService } from "@/src/backend/email/email.service";
import { formRepository } from "@/src/backend/forms/form.repository";
import { NotFoundError, ValidationError } from "@/src/core/errors/domain.error";
import { formatDate } from "@/src/lib/utils/date.utils";
import { normalizeEmail } from "@/src/lib/utils/email.utils";
import { leadRepository } from "./lead.repository";
import { submitLeadSchema, updateLeadSchema } from "./lead.schema";

export const leadService = {
  async list(formId?: string) {
    const leads = await leadRepository.findAllWithForm(formId);
    return leads.map((lead) => ({
      ...lead,
      createdAtFormatted: formatDate(lead.createdAt),
    }));
  },

  async getById(id: string) {
    const lead = await leadRepository.findById(id);
    if (!lead) {
      throw new NotFoundError("Lead", id);
    }
    return lead;
  },

  async submit(slug: string, input: unknown, source?: string | null) {
    const data = submitLeadSchema.parse(input);

    const form = await formRepository.findBySlug(slug);
    if (!form) {
      throw new NotFoundError("Formulaire", slug);
    }

    if (!form.isActive) {
      throw new ValidationError("Ce formulaire n'est plus actif");
    }

    const email = normalizeEmail(data.email);
    const firstName = data.firstName.trim();

    const alreadyExists = await leadRepository.existsByFormAndEmail(
      form.id,
      email,
    );
    if (!alreadyExists) {
      await leadRepository.create({
        formId: form.id,
        firstName,
        email,
        source,
      });
    }

    if (form.emailSubject && form.emailBody) {
      await emailService.sendLeadEmail({
        to: email,
        firstName,
        subject: form.emailSubject,
        body: form.emailBody,
      });
    }

    await emailService.sendAdminNotification({
      formTitle: form.title,
      formSlug: form.slug,
      firstName,
      email,
      source,
    });
  },

  async update(id: string, input: unknown) {
    const data = updateLeadSchema.parse(input);

    const existing = await leadRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Lead", id);
    }

    return leadRepository.update(id, data);
  },

  async delete(id: string) {
    const deleted = await leadRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Lead", id);
    }
  },
};

import { ConflictError, NotFoundError } from "@/src/core/errors/domain.error";
import { formatDate } from "@/src/lib/utils/date.utils";
import { generateSlug } from "@/src/lib/utils/slug.utils";
import { formRepository } from "./form.repository";
import { createFormSchema, updateFormSchema } from "./form.schema";

export const formService = {
  async list() {
    const forms = await formRepository.findAllWithLeadsCount();
    return forms.map((form) => ({
      ...form,
      createdAtFormatted: formatDate(form.createdAt),
    }));
  },

  async getById(id: string) {
    const form = await formRepository.findById(id);
    if (!form) {
      throw new NotFoundError("Formulaire", id);
    }
    return form;
  },

  async getBySlug(slug: string) {
    const form = await formRepository.findBySlug(slug);
    if (!form) {
      throw new NotFoundError("Formulaire", slug);
    }
    return form;
  },

  async create(input: unknown) {
    const data = createFormSchema.parse(input);
    const slug = generateSlug(data.slug || data.title);

    if (await formRepository.slugExists(slug)) {
      throw new ConflictError(
        `Un formulaire avec le slug "${slug}" existe déjà`,
      );
    }

    return formRepository.create({
      ...data,
      slug,
      backgroundType: data.backgroundType ?? "color",
      buttonText: data.buttonText ?? "Envoyer",
      isActive: data.isActive ?? true,
    });
  },

  async update(id: string, input: unknown) {
    const data = updateFormSchema.parse(input);

    const existing = await formRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Formulaire", id);
    }

    const slug = data.slug ? generateSlug(data.slug) : undefined;

    if (slug && (await formRepository.slugExists(slug, id))) {
      throw new ConflictError(
        `Un formulaire avec le slug "${slug}" existe déjà`,
      );
    }

    return formRepository.update(id, { ...data, ...(slug && { slug }) });
  },

  async delete(id: string) {
    const existing = await formRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Formulaire", id);
    }
    await formRepository.delete(id);
  },
};

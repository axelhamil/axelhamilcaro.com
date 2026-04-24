import { NotFoundError } from "@/src/core/errors/domain.error";
import { templateRepository } from "./template.repository";
import { createTemplateSchema } from "./template.schema";

export const templateService = {
  async list() {
    return templateRepository.findAll();
  },

  async create(input: unknown) {
    const data = createTemplateSchema.parse(input);
    return templateRepository.create({
      name: data.name,
      config: data.config,
    });
  },

  async delete(id: string) {
    const existing = await templateRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Template", id);
    }
    await templateRepository.delete(id);
  },
};

import { NotFoundError } from "@/src/core/errors/domain.error";
import { treeLinkRepository } from "./tree-link.repository";
import {
  createTreeLinkSchema,
  reorderTreeLinksSchema,
  updateTreeLinkSchema,
} from "./tree-link.schema";

export const treeLinkService = {
  async list() {
    return treeLinkRepository.findAll();
  },

  async listActive() {
    return treeLinkRepository.findAllActive();
  },

  async create(input: unknown) {
    const data = createTreeLinkSchema.parse(input);
    const maxOrder = await treeLinkRepository.getMaxOrder();

    return treeLinkRepository.create({
      ...data,
      order: data.order ?? maxOrder + 1,
    });
  },

  async update(id: string, input: unknown) {
    const data = updateTreeLinkSchema.parse(input);

    const updated = await treeLinkRepository.update(id, data);
    if (!updated) {
      throw new NotFoundError("Lien", id);
    }

    return updated;
  },

  async delete(id: string) {
    const deleted = await treeLinkRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError("Lien", id);
    }
  },

  async reorder(input: unknown) {
    const { orderedIds } = reorderTreeLinksSchema.parse(input);

    for (let i = 0; i < orderedIds.length; i++) {
      await treeLinkRepository.updateOrder(orderedIds[i], i);
    }
  },
};

function collectIds(
  node: unknown,
  defined: Set<string>,
  referenced: Set<string>,
) {
  if (Array.isArray(node)) {
    for (const item of node) collectIds(item, defined, referenced);
    return;
  }

  if (typeof node !== "object" || node === null) return;

  const id = "@id" in node ? node["@id"] : undefined;

  if (typeof id === "string") {
    const target = Object.keys(node).length === 1 ? referenced : defined;
    target.add(id);
  }

  for (const value of Object.values(node)) {
    collectIds(value, defined, referenced);
  }
}

export function orphanIds(...blocks: unknown[]) {
  const defined = new Set<string>();
  const referenced = new Set<string>();
  collectIds(blocks, defined, referenced);

  return [...referenced].filter((id) => !defined.has(id));
}

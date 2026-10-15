export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateUniqueSlug(prisma, name, excludeId = null) {
  const base = slugify(name) || 'product';
  let slug = base;
  let counter = 1;
  while (true) {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    counter += 1;
    slug = `${base}-${counter}`;
  }
}
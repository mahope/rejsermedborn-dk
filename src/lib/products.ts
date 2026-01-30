import type { Product } from './types';
import { getAllProducts } from './feeds';

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsBySubCategory(category: Product['category'], subCategory: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category === category && (p.subCategory || '').toLowerCase() === subCategory.toLowerCase());
}

export async function getSubCategories(category: Product['category']): Promise<string[]> {
  const products = await getAllProducts();
  const set = new Set<string>();
  for (const p of products) {
    if (p.category === category && p.subCategory) set.add(p.subCategory);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'da'));
}

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ProductGrid from '@/components/ProductGrid';
import { getCategoryBySlug, getCategoryName } from '@/lib/categories';
import { ProductCategory } from '@/lib/types';
import { getProductsBySubCategory, getSubCategories } from '@/lib/products';

interface PageProps {
  params: Promise<{ kategori: string; underkategori: string }>;
}

export async function generateStaticParams() {
  // Build subcategory pages from cache
  const categories = ['white-noise-speakers', 'moerklaegningsgardiner', 'baby-soevn', 'puder', 'wake-up-lights', 'andet'] as const;
  const out: Array<{ kategori: string; underkategori: string }> = [];

  for (const c of categories) {
    const subs = await getSubCategories(c);
    for (const s of subs) out.push({ kategori: c, underkategori: s });
  }

  return out;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori, underkategori } = await params;
  const category = getCategoryBySlug(kategori);
  if (!category) return { title: 'Kategori ikke fundet' };

  const title = `${decodeURIComponent(underkategori)} | ${category.name}`;
  return {
    title,
    description: `Se produkter i underkategorien ${decodeURIComponent(underkategori)} under ${category.name}.`,
  };
}

export const revalidate = 3600;

export default async function SubCategoryPage({ params }: PageProps) {
  const { kategori, underkategori } = await params;
  const category = getCategoryBySlug(kategori);
  if (!category) notFound();

  const sub = decodeURIComponent(underkategori);
  const products = await getProductsBySubCategory(kategori as ProductCategory, sub);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Forside</Link>
        <span>/</span>
        <Link href="/produkter" className="hover:text-indigo-600">Produkter</Link>
        <span>/</span>
        <Link href={`/produkter/${kategori}`} className="hover:text-indigo-600">{getCategoryName(kategori as ProductCategory)}</Link>
        <span>/</span>
        <span className="text-gray-900">{sub}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{sub}</h1>
        <p className="text-gray-600">Produkter i underkategorien “{sub}”.</p>
      </div>

      <ProductGrid products={products} subtitle={`${products.length} produkt${products.length !== 1 ? 'er' : ''} fundet`} />
    </div>
  );
}

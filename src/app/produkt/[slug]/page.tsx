import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getAllProducts } from '@/lib/feeds';
import { getProductBySlug } from '@/lib/products';
import { getCategoryName } from '@/lib/categories';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Produkt ikke fundet' };
  }

  const title = `${product.name} – pris & anmeldelse`;
  const description = (product.description || '').slice(0, 160) || `Se pris og detaljer for ${product.name}.`;

  return {
    title,
    description,
    keywords: [product.name, product.merchant, getCategoryName(product.category), 'pris', 'anmeldelse'].filter(Boolean),
    openGraph: {
      title: `${product.name} | WhiteNoise.dk`,
      description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

export const revalidate = 3600;

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const formattedPrice = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: product.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    brand: product.merchant ? { '@type': 'Brand', name: product.merchant } : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: product.affiliateUrl,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Forside</Link>
        <span>/</span>
        <Link href="/produkter" className="hover:text-indigo-600">Produkter</Link>
        <span>/</span>
        <Link href={`/produkter/${product.category}`} className="hover:text-indigo-600">
          {getCategoryName(product.category)}
        </Link>
        <span>/</span>
        <span className="text-gray-900 line-clamp-1">{product.name}</span>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                unoptimized
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full font-medium">
              {getCategoryName(product.category)}
            </span>
            {product.subCategory && (
              <span className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                {product.subCategory}
              </span>
            )}
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl p-6 mb-6 border border-indigo-100">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Pris hos {product.merchant || 'forhandler'}</div>
                <div className="text-4xl font-bold text-gray-900">{formattedPrice}</div>
                {!product.inStock && (
                  <div className="inline-flex items-center gap-1 text-sm text-red-600 mt-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Ikke på lager
                  </div>
                )}
              </div>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm"
              >
                Se tilbud
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {product.description && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Beskrivelse</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                Produktdata og priser hentes fra vores partnerfeeds og kan ændre sig.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

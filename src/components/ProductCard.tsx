'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { getCategoryName } from '@/lib/categories';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: product.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            unoptimized
            referrerPolicy="no-referrer"
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Ikke på lager
          </div>
        )}
        <div className="absolute top-2 left-2 bg-sky-100 text-sky-900 text-xs px-2 py-1 rounded">
          {getCategoryName(product.category)}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/produkt/${product.slug}`} className="hover:text-indigo-600">
            {product.name}
          </Link>
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
        )}
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-indigo-600">
              {formattedPrice}
            </span>
            {product.merchant && (
              <span className="text-xs text-gray-500">
                {product.merchant}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/produkt/${product.slug}`}
              className="block w-full bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-center py-2.5 px-4 rounded-lg font-medium transition-colors"
            >
              Se detaljer
            </Link>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block w-full bg-sky-700 hover:bg-sky-800 text-white text-center py-2.5 px-4 rounded-lg font-medium transition-colors"
            >
              Køb →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

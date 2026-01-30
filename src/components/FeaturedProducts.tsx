import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export default function FeaturedProducts({ 
  products, 
  title = 'Populære produkter',
  showViewAll = true 
}: FeaturedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
          {showViewAll && (
            <Link 
              href="/produkter"
              className="text-sky-700 hover:text-sky-800 font-medium flex items-center gap-1"
            >
              Se alle produkter
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

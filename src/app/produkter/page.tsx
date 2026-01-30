import { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/feeds';
import { CATEGORIES } from '@/lib/categories';
import ProductGrid from '@/components/ProductGrid';
import { DisplayAd } from '@/components/AdUnit';

export const metadata: Metadata = {
  title: 'Alle produkter - White noise speakers, mørklægning og søvnprodukter',
  description: 'Find de bedste produkter til bedre søvn. White noise speakers, mørklægningsgardiner, baby soveposer, søvnpuder og wake-up lights.',
  openGraph: {
    title: 'Alle produkter | WhiteNoise.dk',
    description: 'Find de bedste produkter til bedre søvn.',
  },
};

export const revalidate = 3600;

export default async function ProdukterPage() {
  let products: any[] = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Forside</Link>
        <span>/</span>
        <span className="text-gray-900">Produkter</span>
      </nav>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Alle produkter
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          Udforsk vores udvalg af søvnprodukter fra danske forhandlere.
          Vi hjælper dig med at finde de bedste produkter til bedre søvn.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/produkter"
            className="px-4 py-2 rounded-full bg-indigo-600 text-white font-medium shadow-sm"
          >
            Alle
          </Link>
          {CATEGORIES.filter(c => c.slug !== 'andet').map((category) => (
            <Link
              key={category.slug}
              href={`/produkter/${category.slug}`}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 font-medium transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Produkter kommer snart</h2>
          <p className="text-gray-600 mb-6">
            Vi er i gang med at hente produkter fra vores partnere. Kom tilbage senere.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Læs vores guides i mellemtiden
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* Ad before SEO content */}
      <DisplayAd className="max-w-3xl mx-auto" />

      {/* SEO Content */}
      <section className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Find det rette produkt til bedre søvn
        </h2>
        <div className="text-gray-600 space-y-4 leading-relaxed">
          <p>
            På WhiteNoise.dk samler vi de bedste søvnprodukter fra danske forhandlere.
            Uanset om du søger en white noise speaker til dit barn, mørklægningsgardiner
            til soveværelset, eller en komfortabel søvnpude – vi hjælper dig med at finde
            det rigtige produkt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">White Noise Speakers</h3>
            <p className="text-sm text-gray-600">Perfekt til babyer og voksne der har svært ved at falde i søvn</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Mørklægningsgardiner</h3>
            <p className="text-sm text-gray-600">Skab det perfekte mørke soverum</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Baby Søvn</h3>
            <p className="text-sm text-gray-600">Soveposer, SleepySacks og alt til de mindste</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Søvnpuder</h3>
            <p className="text-sm text-gray-600">Ergonomiske puder for optimal komfort</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Wake-up Lights</h3>
            <p className="text-sm text-gray-600">Vågn naturligt med lysende vækkeure</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Alle produkter vises med aktuelle priser fra vores partnerbutikker.
          Når du køber via vores links, modtager vi en lille kommission – uden
          ekstra omkostning for dig.
        </p>
      </section>
    </div>
  );
}

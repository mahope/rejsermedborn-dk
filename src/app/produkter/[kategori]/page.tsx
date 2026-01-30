import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/feeds';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import { getSubCategories } from '@/lib/products';
import SubCategoryChips from '@/components/SubCategoryChips';
import { ProductCategory } from '@/lib/types';
import ProductGrid from '@/components/ProductGrid';

interface PageProps {
  params: Promise<{ kategori: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  const category = getCategoryBySlug(kategori);
  
  if (!category) {
    return {
      title: 'Kategori ikke fundet',
    };
  }

  return {
    title: `${category.name} | Køb online med affiliate rabat`,
    description: category.description,
    keywords: category.keywords,
    openGraph: {
      title: `${category.name} | WhiteNoise.dk`,
      description: category.description,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    kategori: category.slug,
  }));
}

export const revalidate = 3600;

export default async function KategoriPage({ params }: PageProps) {
  const { kategori } = await params;
  const category = getCategoryBySlug(kategori);

  if (!category) {
    notFound();
  }

  let products: any[] = [];
  let subCategories: string[] = [];

  try {
    products = await getProductsByCategory(kategori as ProductCategory);
    subCategories = await getSubCategories(kategori as ProductCategory);
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Forside</Link>
        <span>/</span>
        <Link href="/produkter" className="hover:text-indigo-600">Produkter</Link>
        <span>/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/produkter"
            className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 font-medium transition-colors"
          >
            Alle
          </Link>
          {CATEGORIES.filter(c => c.slug !== 'andet').map((cat) => (
            <Link
              key={cat.slug}
              href={`/produkter/${cat.slug}`}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                cat.slug === kategori
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <SubCategoryChips category={kategori} subCategories={subCategories} />

      {/* Products Grid */}
      {products.length > 0 ? (
        <ProductGrid
          products={products}
          subtitle={`${products.length} produkt${products.length !== 1 ? 'er' : ''} fundet`}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ingen produkter i denne kategori</h2>
          <p className="text-gray-600 mb-6">
            Vi henter løbende nye produkter. Prøv en anden kategori eller kom tilbage senere.
          </p>
          <Link
            href="/produkter"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Se alle produkter
          </Link>
        </div>
      )}

      {/* Category Content */}
      <CategoryContent kategori={kategori} />
    </div>
  );
}

function CategoryContent({ kategori }: { kategori: string }) {
  const content: Record<string, React.ReactNode> = {
    'white-noise-speakers': (
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Alt om white noise speakers
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            En white noise speaker er en lille enhed der afspiller konstant baggrundsstøj
            for at hjælpe med indsovning og dybere søvn. Lyden maskerer forstyrrende lyde
            og skaber et roligt sovemiljø.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Populære valg</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-900">Moonboon Speaker</strong> – Dansk favorit med 10 lyde og 30 timers batteri</li>
            <li><strong className="text-gray-900">Hatch Baby Rest</strong> – App-styret med farveskiftende lys</li>
            <li><strong className="text-gray-900">Marpac Dohm</strong> – Klassisk mekanisk white noise</li>
          </ul>
          <p className="mt-6">
            <Link href="/blog/hvad-er-white-noise" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium">
              Læs vores komplette guide til white noise
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </p>
        </div>
      </section>
    ),
    'moerklaegningsgardiner': (
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Guide til mørklægningsgardiner
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Mørklægningsgardiner blokerer sollys og gadelys og skaber et optimalt mørkt
            soverum. De er særligt effektive til børneværelser og til folk der arbejder
            i skift.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Fordele ved mørklægning</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Bedre produktion af melatonin (søvnhormon)</li>
            <li>Længere morgensøvn for børn</li>
            <li>Reducerer varme om sommeren</li>
            <li>Energibesparende isolering</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Hvad skal du kigge efter?</h3>
          <p>
            Vælg gardiner med mindst 90% mørklægning. "Instant Night" og "blackout" gardiner
            giver den bedste effekt. Overvej også thermal gardiner for ekstra isolering.
          </p>
        </div>
      </section>
    ),
    'baby-soevn': (
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Produkter til babyens søvn
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            God søvn er afgørende for babyens udvikling. De rigtige produkter kan hjælpe
            dit barn med at falde i søvn hurtigere og sove længere.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Populære produkttyper</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-900">SleepySack</strong> – Pucking-soveposer der giver tryghed</li>
            <li><strong className="text-gray-900">White noise speakers</strong> – Efterligner livmoderens lyde</li>
            <li><strong className="text-gray-900">Slyngevugger</strong> – Moonboons klassiker</li>
            <li><strong className="text-gray-900">Sengetøj</strong> – Blødt og åndbart til de små</li>
          </ul>
          <p className="mt-6">
            <Link href="/blog/white-noise-til-baby" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium">
              Læs vores guide til white noise for babyer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </p>
        </div>
      </section>
    ),
    'puder': (
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Find den perfekte søvnpude
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Den rigtige hovedpude kan gøre en kæmpe forskel for din søvnkvalitet.
            En god pude holder nakken i neutral position og forebygger smerter.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Pudetyper</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-900">Memory foam</strong> – Former sig efter hovedet</li>
            <li><strong className="text-gray-900">Latex</strong> – Naturlig og allergivenlig</li>
            <li><strong className="text-gray-900">Dun/fjer</strong> – Klassisk og luftig</li>
            <li><strong className="text-gray-900">Ergonomiske</strong> – Designet til specifik søvnstilling</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Vælg efter søvnstilling</h3>
          <p>
            Sidesovere har brug for en højere pude, rygsovere en medium, og mavsovere
            en tynd pude – eller slet ingen.
          </p>
        </div>
      </section>
    ),
    'wake-up-lights': (
      <section className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Vågn naturligt med wake-up lights
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Wake-up lights simulerer solopgangen og hjælper dig med at vågne gradvist
            og naturligt. Det er særligt effektivt i de mørke vintermåneder.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Sådan virker det</h3>
          <p>
            Lampen begynder at lyse svagt 30-60 minutter før din alarm. Lyset øges
            gradvist og signalerer til din krop, at det er tid til at vågne. Det
            stopper melatonin-produktionen og gør opvågningen mere naturlig.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Fordele</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mere energi om morgenen</li>
            <li>Lettere at komme ud af sengen</li>
            <li>Kan hjælpe mod vinterdepression</li>
            <li>Bonus: Kan bruges som aftenlampe</li>
          </ul>
        </div>
      </section>
    ),
  };

  return content[kategori] || null;
}

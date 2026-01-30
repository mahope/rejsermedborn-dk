import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/feeds';
import { getLatestPosts } from '@/lib/blog';
import { CATEGORIES } from '@/lib/categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import BlogPostCard from '@/components/BlogPostCard';
import { DisplayAd } from '@/components/AdUnit';

export default async function HomePage() {
  let products: any[] = [];
  let posts: any[] = [];

  try {
    products = await getFeaturedProducts(6);
  } catch {
    products = [];
  }

  try {
    posts = getLatestPosts(3);
  } catch {
    posts = [];
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
              Uforglemmelige<br />
              <span className="text-emerald-600">familierejser</span> starter her
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              Alt du har brug for til rejser med børn. Find børnevenlige destinationer,
              tips til flyrejser med baby og de bedste familiehoteller.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produkter"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Udforsk guides
              </Link>
              <Link
                href="/blog/flyrejse-med-baby"
                className="border border-slate-300 text-slate-800 px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
              >
                Flyrejse med baby
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Udforsk kategorier</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.filter(c => c.slug !== 'andet').map((category) => (
              <Link
                key={category.slug}
                href={`/produkter/${category.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <CategoryIcon slug={category.slug} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description.substring(0, 100)}...
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <FeaturedProducts products={products} title="Anbefalede rejseprodukter" />
      )}

      {/* Ad between products and why section */}
      <div className="container mx-auto px-4 py-8">
        <DisplayAd className="max-w-3xl mx-auto" />
      </div>

      {/* Why Travel With Kids Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Derfor skal I rejse med børn</h2>
            <p className="text-gray-600">
              At rejse med børn kan virke overvældende, men med den rette forberedelse bliver det en uforglemmelig oplevelse for hele familien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Lærerige oplevelser</h3>
              <p className="text-sm text-gray-600">
                Børn lærer gennem oplevelser. Rejser giver dem indsigt i andre kulturer, sprog og måder at leve på.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Kvalitetstid sammen</h3>
              <p className="text-sm text-gray-600">
                Væk fra hverdagens travlhed får I tid til at være sammen og skabe minder der varer livet ud.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Eventyr for alle aldre</h3>
              <p className="text-sm text-gray-600">
                Fra strande til forlystelsesparker – der er uendelige muligheder for sjov med hele familien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {posts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold">Seneste fra bloggen</h2>
              <Link
                href="/blog"
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                Se alle artikler
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}

function CategoryIcon({ slug }: { slug: string }) {
  switch (slug) {
    case 'feriedestinationer':
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'flyrejser':
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 'hoteller':
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'pakkelister':
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    case 'aktiviteter':
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
  }
}

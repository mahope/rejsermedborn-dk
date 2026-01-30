import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';
import { DisplayAd } from '@/components/AdUnit';

export const metadata: Metadata = {
  title: 'Blog - Guides og artikler om white noise og søvn',
  description: 'Læs ekspertguides om white noise, pink noise, søvn for babyer og voksne. Tips til bedre søvnkvalitet.',
  openGraph: {
    title: 'Blog | WhiteNoise.dk',
    description: 'Ekspertguides om white noise og bedre søvn.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Group posts by category
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Forside</Link>
        <span>/</span>
        <span className="text-gray-900">Blog</span>
      </nav>

      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Dybdegående guides og artikler om white noise, søvn og alt der hjælper dig
          og din familie med at sove bedre.
        </p>
      </div>

      {/* Category filters */}
      {categories.length > 1 && (
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">
              Alle ({posts.length})
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {category} ({posts.filter(p => p.category === category).length})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Featured Post */}
      {posts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-4">
            Nyeste artikel
          </h2>
          <BlogPostCard post={posts[0]} featured />
        </div>
      )}

      {/* Ad between featured and grid */}
      <DisplayAd className="max-w-3xl" />

      {/* All Posts Grid */}
      {posts.length > 1 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Alle artikler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Artikler kommer snart</h2>
          <p className="text-gray-600">
            Vi arbejder på spændende indhold. Kom snart tilbage!
          </p>
        </div>
      )}

      {/* SEO Content */}
      {posts.length > 0 && (
        <section className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Guides til bedre søvn
          </h2>
          <div className="text-gray-600 space-y-4 leading-relaxed">
            <p>
              Vores blog indeholder dybdegående guides om white noise, pink noise, brown noise og
              andre lydtyper der kan hjælpe med søvn. Vi skriver også om søvnprodukter, rutiner og
              tips til hele familien.
            </p>
            <p>
              Uanset om du søger hjælp til din babys søvn, teenagerens morgenrutine, eller din egen
              søvnkvalitet – finder du praktiske råd baseret på forskning og erfaring.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

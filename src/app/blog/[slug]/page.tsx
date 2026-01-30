import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { getFeaturedProducts } from '@/lib/feeds';
import { Product } from '@/lib/types';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import BlogPostCard from '@/components/BlogPostCard';
import FeaturedProducts from '@/components/FeaturedProducts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '../../../../mdx-components';
import { DisplayAd } from '@/components/AdUnit';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getPostBySlug(slug);

  if (!data) {
    return {
      title: 'Artikel ikke fundet',
    };
  }

  const { post } = data;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPostBySlug(slug);

  if (!data) {
    notFound();
  }

  const { post, content } = data;
  const relatedPosts = getRelatedPosts(slug, 3);
  
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await getFeaturedProducts(3);
  } catch {
    // Ignore errors
  }

  const formattedDate = format(new Date(post.date), 'd. MMMM yyyy', { locale: da });

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WhiteNoise.dk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://whitenoise.dk/logo.png',
      },
    },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://whitenoise.dk/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-indigo-600">Forside</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime} min læsetid</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <div className="mdx-content">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>

          {/* Ad after article content */}
          <DisplayAd className="max-w-2xl mx-auto" />
        </div>

        {/* Product Recommendations */}
        {featuredProducts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Anbefalede produkter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredProducts.map((product) => (
                  <a
                    key={product.id}
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-indigo-600 font-semibold">
                      {new Intl.NumberFormat('da-DK', {
                        style: 'currency',
                        currency: product.currency,
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </p>
                    <span className="text-sm text-gray-500">hos {product.merchant}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ad before related posts */}
        <div className="max-w-3xl mx-auto mt-12">
          <DisplayAd />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Relaterede artikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost) => (
                <BlogPostCard key={relPost.slug} post={relPost} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

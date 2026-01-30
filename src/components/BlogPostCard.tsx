import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const formattedDate = format(new Date(post.date), 'd. MMMM yyyy', { locale: da });

  if (featured) {
    return (
      <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="block">
          {post.featuredImage && (
            <div className="relative h-64 bg-gray-100">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <span className="bg-sky-100 text-sky-900 px-2 py-1 rounded text-xs font-medium">
                {post.category}
              </span>
              <time dateTime={post.date}>{formattedDate}</time>
              <span>· {post.readingTime} min læsetid</span>
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2 hover:text-sky-700 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
            {post.category}
          </span>
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
        
        <h3 className="font-semibold text-slate-900 mb-2 hover:text-sky-700 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>
        
        <span className="inline-flex items-center text-sky-700 text-sm font-medium mt-3">
          Læs mere
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </article>
  );
}

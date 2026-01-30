import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './types';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      // Calculate reading time (assuming 200 words per minute)
      const wordCount = fileContents.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);

      return {
        slug,
        title: data.title || slug,
        metaTitle: data.metaTitle || data.title || slug,
        metaDescription: data.metaDescription || data.excerpt || '',
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString(),
        updatedAt: data.updatedAt,
        author: data.author || 'Whitenoise.dk',
        category: data.category || 'guide',
        featuredImage: data.featuredImage,
        readingTime,
      } as BlogPost;
    });

  const now = new Date();

  // Filter out future posts and sort by date (newest first)
  return posts
    .filter(post => new Date(post.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): { post: BlogPost; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Don't return future posts
  const postDate = new Date(data.date || new Date().toISOString());
  if (postDate > new Date()) {
    return null;
  }

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const post: BlogPost = {
    slug,
    title: data.title || slug,
    metaTitle: data.metaTitle || data.title || slug,
    metaDescription: data.metaDescription || data.excerpt || '',
    excerpt: data.excerpt || '',
    date: data.date || new Date().toISOString(),
    updatedAt: data.updatedAt,
    author: data.author || 'Whitenoise.dk',
    category: data.category || 'guide',
    featuredImage: data.featuredImage,
    readingTime,
  };

  return { post, content };
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
}

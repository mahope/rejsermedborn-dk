export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  affiliateUrl: string;
  merchant: string;
  category: ProductCategory;
  subCategory?: string;
  inStock: boolean;
  feedId: string;
  updatedAt: string;
}

export type ProductCategory =
  | 'feriedestinationer'
  | 'flyrejser'
  | 'hoteller'
  | 'pakkelister'
  | 'aktiviteter'
  | 'andet';

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  keywords: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  author: string;
  category: string;
  featuredImage?: string;
  readingTime: number;
}

export interface FeedConfig {
  id: string;
  bannerId: string;
  url: string;
  category?: ProductCategory;
  keywords?: string[];
}

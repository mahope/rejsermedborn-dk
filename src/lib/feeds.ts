import { XMLParser } from 'fast-xml-parser';
import { Product, ProductCategory, FeedConfig } from './types';
import { slugify } from './slug';
import fs from 'fs/promises';
import path from 'path';

// Feed configurations with category mappings
export const FEED_CONFIGS: FeedConfig[] = [
  // Adventure Pro - Rejsetasker, vakuumrygsække, toilettasker, powerbanks
  {
    id: '3995',
    bannerId: '113961',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=113961&feedid=3995',
    category: 'pakkelister',
    keywords: ['rygsæk', 'taske', 'toilettaske', 'powerbank', 'pude', 'rejse'],
  },
  // Backpackerlife.dk - Outdoor/camping udstyr, telte, soveposer
  {
    id: '1318',
    bannerId: '65841',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=65841&feedid=1318',
    category: 'aktiviteter',
    keywords: ['telt', 'sovepose', 'vandre', 'camping', 'outdoor', 'friluft'],
  },
  // Stort feed - Diverse produkter
  {
    id: '2084',
    bannerId: '84908',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=84908&feedid=2084',
    category: 'pakkelister',
    keywords: ['rejse', 'kuffert', 'taske', 'bagage'],
  },
  // CleverPack - Rejsepuder, rygsække
  {
    id: '3936',
    bannerId: '113369',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=113369&feedid=3936',
    category: 'pakkelister',
    keywords: ['nakkepude', 'rygsæk', 'rejsepude', 'memory foam'],
  },
  // Stort feed - Diverse
  {
    id: '867',
    bannerId: '52894',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=52894&feedid=867',
    category: 'pakkelister',
    keywords: ['rejse', 'kuffert', 'taske'],
  },
  // Journeylife.dk - Kufferter, nakkepuder, sovemaskker
  {
    id: '3117',
    bannerId: '103675',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=103675&feedid=3117',
    category: 'pakkelister',
    keywords: ['kuffert', 'nakkepude', 'øjenmaske', 'ørepropper', 'rejse'],
  },
  // Stort feed
  {
    id: '522',
    bannerId: '42807',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=42807&feedid=522',
    category: 'pakkelister',
    keywords: ['rejse', 'bagage', 'kuffert'],
  },
  // Nakkepude-shop.dk - Rejsepuder, øjenmasker, adaptorer
  {
    id: '3251',
    bannerId: '105675',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=105675&feedid=3251',
    category: 'pakkelister',
    keywords: ['nakkepude', 'rejsepude', 'øjenmaske', 'adaptor', 'powerbank'],
  },
  // Roamer.dk - Kufferter, packing cubes, rejsepuder
  {
    id: '4045',
    bannerId: '114518',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=114518&feedid=4045',
    category: 'pakkelister',
    keywords: ['kuffert', 'packing cubes', 'vakuum', 'nakkepude', 'sovemaske'],
  },
  // Travelbetter.dk - Kufferter, rejsetasker
  {
    id: '3833',
    bannerId: '112426',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=112426&feedid=3833',
    category: 'pakkelister',
    keywords: ['kuffert', 'rejsetaske', 'trolley', 'kabine', 'bagage'],
  },
  // Trailcam.dk - Action kameraer
  {
    id: '4109',
    bannerId: '114948',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=114948&feedid=4109',
    category: 'aktiviteter',
    keywords: ['kamera', 'action', 'trailcam', 'video'],
  },
  // Urban Hunt - Escape games, byjagt
  {
    id: '3685',
    bannerId: '111023',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=111023&feedid=3685',
    category: 'aktiviteter',
    keywords: ['escape', 'byjagt', 'oplevelse', 'gåtur', 'spil'],
  },
];

const CACHE_FILE = path.join(process.cwd(), 'data', 'products-cache.json');
const CACHE_DURATION = 1000 * 60 * 60 * 6; // 6 hours

interface CacheData {
  products: Product[];
  lastUpdated: string;
}

// Parse Partner-ads XML feed
function parseXMLFeed(xml: string, feedConfig: FeedConfig): Product[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  try {
    const result = parser.parse(xml);
    const items = result?.produkter?.produkt || result?.products?.product || [];
    const productArray = Array.isArray(items) ? items : [items];

    const keywords = (feedConfig.keywords || []).map((k) => k.toLowerCase()).filter(Boolean);

    return productArray
      .filter((item: Record<string, unknown>) => item && (item.produktnavn || item.navn || item.name))
      .filter((item: Record<string, unknown>) => {
        if (!keywords.length) return true;

        const name = String(item.produktnavn || item.navn || item.name || '').toLowerCase();
        const desc = String(item.beskrivelse || item.LangBeskrivelse || item.description || '').toLowerCase();
        const text = `${name} ${desc}`;
        return keywords.some((kw) => text.includes(kw));
      })
      .map((item: Record<string, unknown>): Product => {
        const name = String(item.produktnavn || item.navn || item.name || '');
        const description = String(
          item.beskrivelse || item.LangBeskrivelse || item.description || item.produktbeskrivelse || ''
        );
        const priceStr = String(item.nypris || item.NyPris || item.pris || item.price || '0');
        const price = parseFloat(priceStr.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
        const imageUrl = String(item.billedurl || item.LilleBilledeUrl || item.BilledUrl || item.image || item.billede || '');
        const affiliateUrl = String(item.vareurl || item.LandingsUrl || item.url || item.link || '');
        const merchant = String(item.forhandler || item.varebrand || item.brand || feedConfig.id);

        const stockRaw = String(item.lagerantal ?? item.LagerStatus ?? item.stock ?? '').toLowerCase();
        const inStock = !(stockRaw.includes('out of stock') || stockRaw === '0' || stockRaw.includes('ikke') || stockRaw.includes('udsolgt'));

        const id = `${feedConfig.id}-${String(item.produktid || item.VareId || item.id || Math.random().toString(36).slice(2, 11))}`;
        const subCategoryRaw = String(item.kategorinavn || item.kategori || item.category || '').trim();
        const subCategory = subCategoryRaw && subCategoryRaw.length <= 40 ? subCategoryRaw : undefined;
        const slug = slugify(`${merchant}-${name}-${id}`);

        return {
          id,
          slug,
          name,
          description: description.substring(0, 500),
          price,
          currency: 'DKK',
          imageUrl,
          affiliateUrl,
          merchant,
          category: feedConfig.category || categorizeProduct(name, description, feedConfig.keywords || []),
          subCategory,
          inStock,
          feedId: feedConfig.id,
          updatedAt: new Date().toISOString(),
        };
      });
  } catch (error) {
    console.error(`Error parsing feed ${feedConfig.id}:`, error);
    return [];
  }
}

// Categorize product based on name and description
function categorizeProduct(name: string, description: string, feedKeywords: string[]): ProductCategory {
  const text = `${name} ${description}`.toLowerCase();

  // Keyword-based categorization for travel products
  if (text.includes('hotel') || text.includes('resort') || text.includes('overnatning')) {
    return 'hoteller';
  }
  if (text.includes('fly') || text.includes('lufthavn') || text.includes('flight')) {
    return 'flyrejser';
  }
  if (text.includes('kuffert') || text.includes('taske') || text.includes('rygsæk') ||
      text.includes('bagage') || text.includes('pakke') || text.includes('pude') ||
      text.includes('adaptor') || text.includes('powerbank')) {
    return 'pakkelister';
  }
  if (text.includes('oplevelse') || text.includes('aktivitet') || text.includes('park') ||
      text.includes('museum') || text.includes('escape') || text.includes('tur') ||
      text.includes('camping') || text.includes('outdoor') || text.includes('kamera')) {
    return 'aktiviteter';
  }
  if (text.includes('ferie') || text.includes('destination') || text.includes('rejsemål')) {
    return 'feriedestinationer';
  }

  return 'andet';
}

// Note: fetching/parsing feeds is intentionally NOT done in the request path.
// Use scripts/sync-feeds.ts to generate data/products-cache.json instead.

// Load cached products (memoized in-memory for performance)
let memoryCache: CacheData | null = null;

async function loadCache(): Promise<CacheData | null> {
  if (memoryCache) return memoryCache;

  try {
    const data = await fs.readFile(CACHE_FILE, 'utf-8');
    memoryCache = JSON.parse(data);
    return memoryCache;
  } catch {
    return null;
  }
}

// Save products to cache
async function saveCache(products: Product[]): Promise<void> {
  try {
    const cacheDir = path.dirname(CACHE_FILE);
    await fs.mkdir(cacheDir, { recursive: true });

    const cacheData: CacheData = {
      products,
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error('Error saving cache:', error);
  }
}

// Get all products (FAST: read from local cache only)
export async function getAllProducts(): Promise<Product[]> {
  const cache = await loadCache();

  if (cache) {
    return cache.products;
  }

  return [];
}

// Get products by category
export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(p => p.category === category);
}

// Get featured products
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(p => p.inStock).slice(0, limit);
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getAllProducts();
  const lowerQuery = query.toLowerCase();

  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.merchant.toLowerCase().includes(lowerQuery)
  );
}

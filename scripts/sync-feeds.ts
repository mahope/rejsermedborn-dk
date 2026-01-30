/**
 * Feed Sync Script for RejserMedBørn.dk
 *
 * Henter produkter fra Partner-ads feeds og gemmer dem lokalt.
 * Kør med: npx ts-node --esm scripts/sync-feeds.ts
 * Eller: npm run sync-feeds
 */

import { XMLParser } from 'fast-xml-parser';
import fs from 'fs/promises';
import path from 'path';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  affiliateUrl: string;
  merchant: string;
  category: string;
  subCategory?: string;
  inStock: boolean;
  feedId: string;
  updatedAt: string;
}

interface FeedConfig {
  id: string;
  bannerId: string;
  url: string;
  category?: string;
  keywords: string[];
  strictFilter?: boolean; // Kun medtag produkter der matcher keywords
}

// Max products per feed to avoid memory issues
const MAX_PRODUCTS_PER_FEED = 500;

// Rejse-relaterede feeds
const FEED_CONFIGS: FeedConfig[] = [
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
    keywords: ['telt', 'sovepose', 'rygsæk', 'rejse', 'tur', 'vandre', 'camping'],
    strictFilter: true,
  },
  // Stort feed - kræver streng filtrering
  {
    id: '2084',
    bannerId: '84908',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=84908&feedid=2084',
    category: 'pakkelister',
    keywords: ['kuffert', 'rejsetaske', 'trolley', 'kabinekuffert', 'bagage', 'rejsesæt', 'hardcase', 'weekendtaske'],
    strictFilter: true,
  },
  // CleverPack - Rejsepuder, rygsække
  {
    id: '3936',
    bannerId: '113369',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=113369&feedid=3936',
    category: 'pakkelister',
    keywords: ['nakkepude', 'rygsæk', 'rejsepude', 'memory foam'],
  },
  // Stort feed - kræver streng filtrering
  {
    id: '867',
    bannerId: '52894',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=52894&feedid=867',
    category: 'pakkelister',
    keywords: ['kuffert', 'rejsetaske', 'trolley', 'kabine', 'bagage', 'weekendtaske'],
    strictFilter: true,
  },
  // Journeylife.dk - Kufferter, nakkepuder, sovemaskker
  {
    id: '3117',
    bannerId: '103675',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=103675&feedid=3117',
    category: 'pakkelister',
    keywords: ['kuffert', 'nakkepude', 'øjenmaske', 'ørepropper', 'rejse'],
  },
  // Stort feed - kræver streng filtrering
  {
    id: '522',
    bannerId: '42807',
    url: 'https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=42553&bannerid=42807&feedid=522',
    category: 'pakkelister',
    keywords: ['kuffert', 'rejsetaske', 'trolley', 'kabine', 'bagage', 'weekendtaske', 'rejsesæt'],
    strictFilter: true,
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

function decodeXmlFromResponse(buffer: ArrayBuffer, contentType: string | null): string {
  const ct = (contentType || '').toLowerCase();
  const charset = ct.includes('charset=') ? ct.split('charset=')[1].split(';')[0].trim() : '';
  const enc = charset || 'iso-8859-1';
  const normalized = enc.includes('8859-1') || enc.includes('latin1') ? 'latin1' : 'utf-8';
  return new TextDecoder(normalized).decode(new Uint8Array(buffer));
}

function normalizeText(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .trim();
}

function inferSubCategory(partnerCategory: string, name: string, description: string): string | undefined {
  const text = normalizeText(`${partnerCategory} ${name} ${description}`);

  // Kufferter
  if (/(kuffert|trolley|kabine)/.test(text)) return 'Kufferter';
  if (/(rygsæk|backpack)/.test(text)) return 'Rygsække';
  if (/(taske|bag)/.test(text)) return 'Tasker';

  // Rejsekomfort
  if (/(nakkepude|rejsepude|travel pillow)/.test(text)) return 'Rejsepuder';
  if (/(øjenmaske|sovemaske|eye mask)/.test(text)) return 'Sovemasker';
  if (/(ørepropper|ear plug)/.test(text)) return 'Ørepropper';

  // Elektronik
  if (/(powerbank|oplader)/.test(text)) return 'Powerbanks';
  if (/(adaptor|adapter|stik)/.test(text)) return 'Adaptorer';
  if (/(kamera|camera)/.test(text)) return 'Kameraer';

  // Outdoor
  if (/(telt|tent)/.test(text)) return 'Telte';
  if (/(sovepose|sleeping bag)/.test(text)) return 'Soveposer';
  if (/(vandre|hiking)/.test(text)) return 'Vandreudstyr';

  // Oplevelser
  if (/(escape|byjagt|treasure)/.test(text)) return 'Oplevelser';

  // Organisering
  if (/(packing cube|pakkepose)/.test(text)) return 'Pakkeposer';
  if (/(toilettaske|wash bag)/.test(text)) return 'Toilettasker';

  const pc = (partnerCategory || '').trim();
  if (pc && pc.length <= 40) return pc;

  return undefined;
}

function mapToCategory(name: string, description: string, defaultCategory?: string): string {
  const text = normalizeText(`${name} ${description}`);

  // Pakkelister (rejseudstyr)
  if (/(kuffert|taske|rygsæk|bagage|packing|pakke|nakkepude|rejsepude|øjenmaske|sovemaske|adaptor|powerbank|toilettaske)/.test(text)) {
    return 'pakkelister';
  }

  // Aktiviteter
  if (/(escape|byjagt|oplevelse|tur|camping|outdoor|friluft|telt|vandre|kamera|action cam)/.test(text)) {
    return 'aktiviteter';
  }

  // Hoteller
  if (/(hotel|resort|overnatning)/.test(text)) {
    return 'hoteller';
  }

  // Flyrejser
  if (/(fly|lufthavn|flight|boarding)/.test(text)) {
    return 'flyrejser';
  }

  return defaultCategory || 'andet';
}

async function fetchFeed(config: FeedConfig): Promise<Product[]> {
  console.log(`Fetching feed ${config.id}...`);

  try {
    const response = await fetch(config.url);
    if (!response.ok) {
      console.error(`Feed ${config.id} returned ${response.status}`);
      return [];
    }

    const buffer = await response.arrayBuffer();
    const xml = decodeXmlFromResponse(buffer, response.headers.get('content-type'));

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const result = parser.parse(xml);
    const items = result?.produkter?.produkt || result?.products?.product || [];
    const productArray = Array.isArray(items) ? items : [items];

    // Filter by keywords if strictFilter is enabled
    const keywords = config.keywords.map(k => k.toLowerCase());
    const shouldFilter = config.strictFilter && keywords.length > 0;

    let filteredItems = productArray
      .filter((item: Record<string, unknown>) => item && (item.produktnavn || item.navn || item.name));

    if (shouldFilter) {
      filteredItems = filteredItems.filter((item: Record<string, unknown>) => {
        const name = String(item.produktnavn || item.navn || item.name || '').toLowerCase();
        const desc = String(item.beskrivelse || item.LangBeskrivelse || item.description || '').toLowerCase();
        const cat = String(item.kategorinavn || item.kategori || item.category || '').toLowerCase();
        const text = `${name} ${desc} ${cat}`;
        return keywords.some(kw => text.includes(kw));
      });
      console.log(`  Filtered to ${filteredItems.length} relevant products`);
    }

    // Limit products per feed
    if (filteredItems.length > MAX_PRODUCTS_PER_FEED) {
      console.log(`  Limiting to ${MAX_PRODUCTS_PER_FEED} products`);
      filteredItems = filteredItems.slice(0, MAX_PRODUCTS_PER_FEED);
    }

    const products = filteredItems
      .map((item: Record<string, unknown>): Product | null => {
        const name = String(item.produktnavn || item.navn || item.name || '');
        const description = String(item.beskrivelse || item.LangBeskrivelse || item.description || '');
        const partnerCategory = String(item.kategorinavn || item.kategori || item.category || '');

        // Map to our category
        const category = mapToCategory(name, description, config.category);

        const priceStr = String(item.nypris || item.NyPris || item.pris || item.price || '0');
        const price = parseFloat(priceStr.replace(',', '.').replace(/[^\d.]/g, '')) || 0;
        const imageUrl = String(item.billedurl || item.LilleBilledeUrl || item.BilledUrl || item.image || '');
        const affiliateUrl = String(item.vareurl || item.LandingsUrl || item.url || item.link || '');
        const merchant = String(item.forhandler || item.varebrand || item.brand || 'Unknown');
        const stockRaw = String(item.lagerantal ?? item.LagerStatus ?? item.stock ?? '').toLowerCase();
        const inStock = !(stockRaw.includes('out of stock') || stockRaw === '0' || stockRaw.includes('udsolgt'));

        const id = `${config.id}-${String(item.produktid || item.VareId || item.id || Math.random().toString(36).slice(2, 11))}`;
        const subCategory = inferSubCategory(partnerCategory, name, description);
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
          category,
          subCategory,
          inStock,
          feedId: config.id,
          updatedAt: new Date().toISOString(),
        };
      })
      .filter((p): p is Product => Boolean(p));

    console.log(`Found ${products.length} products in feed ${config.id}`);
    return products;
  } catch (error) {
    console.error(`Error fetching feed ${config.id}:`, error);
    return [];
  }
}

async function main() {
  console.log('Starting feed sync for RejserMedBørn.dk...\n');

  const allProducts: Product[] = [];

  for (const config of FEED_CONFIGS) {
    const products = await fetchFeed(config);
    allProducts.push(...products);

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Limit total products to avoid memory issues
  const maxTotal = 3000;
  if (allProducts.length > maxTotal) {
    console.log(`\nLimiting from ${allProducts.length} to ${maxTotal} products...`);
    allProducts.length = maxTotal;
  }

  // Sort by stock status
  allProducts.sort((a, b) => {
    if (a.inStock !== b.inStock) {
      return a.inStock ? -1 : 1;
    }
    return a.name.localeCompare(b.name, 'da');
  });

  // Save to file
  const dataDir = path.join(process.cwd(), 'data');
  await fs.mkdir(dataDir, { recursive: true });

  const cacheFile = path.join(dataDir, 'products-cache.json');
  await fs.writeFile(cacheFile, JSON.stringify({
    products: allProducts,
    lastUpdated: new Date().toISOString(),
  }, null, 2));

  console.log(`\nSync complete! ${allProducts.length} products saved to ${cacheFile}`);

  // Summary
  const categories = [...new Set(allProducts.map(p => p.category))];
  console.log('\nProducts by category:');
  categories.forEach(cat => {
    const count = allProducts.filter(p => p.category === cat).length;
    console.log(`  ${cat}: ${count}`);
  });
}

main().catch(console.error);

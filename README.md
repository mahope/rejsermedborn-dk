# RejserMedBørn.dk

En dansk affiliate-side om rejser med børn. Bygget med Next.js 16, Tailwind CSS 4 og MDX.

## Quick Start

```bash
# Installer dependencies
npm install

# Start development server
npm run dev

# Åbn http://localhost:3000
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Blog:** MDX
- **Language:** TypeScript
- **Affiliate:** Partner-ads feed integration

## Projektstruktur

```
rejsermedborn-dk/
├── src/
│   ├── app/                 # Next.js App Router sider
│   │   ├── page.tsx         # Forside
│   │   ├── produkter/       # Kategori-sider
│   │   ├── blog/            # Blog-sider
│   │   ├── om-os/           # Om os
│   │   └── kontakt/         # Kontakt
│   ├── components/          # React komponenter
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── BlogPostCard.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/                 # Utilities
│       ├── feeds.ts         # Partner-ads feed integration
│       ├── blog.ts          # Blog utilities
│       ├── categories.ts    # Kategori-config
│       └── types.ts         # TypeScript types
├── content/
│   └── blog/                # MDX blog posts
├── data/
│   └── products-cache.json  # Cached produkter
├── scripts/
│   └── sync-feeds.ts        # Feed sync script
└── public/                  # Static assets
```

## Scripts

```bash
# Development
npm run dev           # Start dev server

# Build
npm run build         # Build for production
npm run start         # Start production server

# Feed Sync
npm run sync-feeds    # Hent produkter fra Partner-ads
```

## Blog Posts

Blog posts skrives i MDX format og gemmes i `content/blog/`.

### Frontmatter format:

```mdx
---
title: "Titel på artiklen"
metaTitle: "SEO titel (2026)"
metaDescription: "SEO beskrivelse..."
excerpt: "Kort beskrivelse til oversigter"
date: "2026-01-15"
author: "RejserMedBørn.dk"
category: "Flyrejser"
---

## Indhold her...
```

## Kategorier

| Kategori | Slug | Beskrivelse |
|----------|------|-------------|
| Feriedestinationer | feriedestinationer | Børnevenlige rejsemål |
| Flyrejser med børn | flyrejser | Tips til flyrejser |
| Børnevenlige hoteller | hoteller | Familiehoteller og resorts |
| Pakkelister | pakkelister | Komplette pakkelister |
| Aktiviteter & oplevelser | aktiviteter | Oplevelser for hele familien |

## Affiliate Feed Integration

Produkter hentes fra Partner-ads XML feeds. Tilføj nye feeds i `src/lib/feeds.ts`.

### Manuel sync:

```bash
npm run sync-feeds
```

### Automatisk sync (anbefalet):

Sæt op som cron job eller GitHub Action til at køre dagligt.

## Deployment

### Vercel (anbefalet)

1. Push til GitHub
2. Forbind repo til Vercel
3. Deploy automatisk ved push

### Environment Variables

Ingen påkrævede env vars til basic setup.

Valgfrit:
- `NEXT_PUBLIC_SITE_URL` - Site URL (default: https://rejsermedborn.dk)

## SEO

Siden inkluderer:

- Meta tags (title, description)
- Open Graph tags
- JSON-LD structured data
- Automatisk sitemap.xml
- robots.txt
- Danske keywords

## Affiliate Disclosure

Siden indeholder affiliate-links. Disclosure vises i footer på alle sider.

## Licens

Privat projekt.

---

Lavet til familier der elsker at rejse

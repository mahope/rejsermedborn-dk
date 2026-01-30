import { CategoryInfo, ProductCategory } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'feriedestinationer',
    name: 'Feriedestinationer',
    description: 'Find de bedste rejsemål til familier med børn. Strand, storby, natureoplevelser og forlystelsesparker.',
    keywords: ['ferie', 'destination', 'rejsemål', 'strand', 'storby', 'natur'],
  },
  {
    slug: 'flyrejser',
    name: 'Flyrejser med børn',
    description: 'Alt om flyrejser med børn – tips til lange flyture, baby i fly, og hvordan I overlever rejsen.',
    keywords: ['flyrejse', 'fly', 'flytur', 'lufthavn', 'baby fly'],
  },
  {
    slug: 'hoteller',
    name: 'Børnevenlige hoteller',
    description: 'Find de bedste børnevenlige hoteller og resorts. Familieværelser, all-inclusive og aktiviteter for børn.',
    keywords: ['hotel', 'resort', 'børnevenlig', 'familiehotel', 'all-inclusive'],
  },
  {
    slug: 'pakkelister',
    name: 'Pakkelister',
    description: 'Komplette pakkelister til rejser med børn i alle aldre. Aldrig glem det vigtige igen.',
    keywords: ['pakkeliste', 'pakning', 'rejseudstyr', 'babyudstyr'],
  },
  {
    slug: 'aktiviteter',
    name: 'Aktiviteter & oplevelser',
    description: 'Spændende aktiviteter og oplevelser for hele familien. Forlystelsesparker, dyreparker og eventyr.',
    keywords: ['aktivitet', 'oplevelse', 'forlystelsespark', 'dyrepark', 'museum'],
  },
  {
    slug: 'andet',
    name: 'Øvrige rejsetips',
    description: 'Andre gode råd til rejser med børn – forsikring, mad, transport og praktiske tips.',
    keywords: ['rejsetips', 'praktisk', 'forsikring'],
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCategoryName(slug: ProductCategory): string {
  return getCategoryBySlug(slug)?.name || slug;
}

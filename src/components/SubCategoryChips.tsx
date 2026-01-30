import Link from 'next/link';

export default function SubCategoryChips({
  category,
  subCategories,
}: {
  category: string;
  subCategories: string[];
}) {
  if (!subCategories.length) return null;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {subCategories.map((s) => (
          <Link
            key={s}
            href={`/produkter/${category}/${encodeURIComponent(s)}`}
            className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-sky-50 hover:text-sky-800 font-medium transition-colors"
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
}

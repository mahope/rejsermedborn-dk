import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import CookieSettingsButton from './CookieSettingsButton';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">RejserMedBørn<span className="text-emerald-400">.dk</span></span>
            </Link>
            <p className="text-sm text-slate-300">
              Din guide til uforglemmelige familierejser. Tips, inspiration og praktiske råd til rejser med børn.
            </p>
          </div>

          {/* Kategorier */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kategorier</h3>
            <ul className="space-y-2">
              {CATEGORIES.filter(c => c.slug !== 'andet').map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/produkter/${category.slug}`}
                    className="text-sm hover:text-emerald-400 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="font-semibold text-white mb-4">Populære guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/flyrejse-med-baby" className="text-sm hover:text-emerald-400 transition-colors">
                  Flyrejse med baby
                </Link>
              </li>
              <li>
                <Link href="/blog/pakkeliste-boern" className="text-sm hover:text-emerald-400 transition-colors">
                  Pakkeliste med børn
                </Link>
              </li>
              <li>
                <Link href="/blog/boernevenlige-destinationer" className="text-sm hover:text-emerald-400 transition-colors">
                  Børnevenlige destinationer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-emerald-400 transition-colors">
                  Se alle artikler
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/om-os" className="text-sm hover:text-emerald-400 transition-colors">
                  Om os
                </Link>
              </li>
              <li>
                <Link href="/privatlivspolitik" className="text-sm hover:text-emerald-400 transition-colors">
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link href="/cookiepolitik" className="text-sm hover:text-emerald-400 transition-colors">
                  Cookie-politik
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Andre værktøjer */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <h3 className="font-semibold text-white mb-4">🛠️ Andre gratis værktøjer</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm text-slate-300">
            <a href="https://gratisfaktura.dk" className="hover:text-emerald-400">📄 Faktura Generator</a>
            <a href="https://kodeord.dk" className="hover:text-emerald-400">🔐 Kodeord Generator</a>
            <a href="https://countdowntimer.dk" className="hover:text-emerald-400">⏰ Countdown Timer</a>
            <a href="https://loenberegner.dk" className="hover:text-emerald-400">💰 Lønberegner</a>
            <a href="https://minberegner.dk" className="hover:text-emerald-400">🧮 Alle Beregnere</a>
            <a href="https://ai-tools.dk" className="hover:text-emerald-400">🤖 AI Værktøjer</a>
            <a href="https://whitenoise.dk" className="hover:text-emerald-400">🔊 White Noise</a>
            <a href="https://notiondk.dk" className="hover:text-emerald-400">📋 Notion Templates</a>
            <a href="https://valuta.holstjensen.eu" className="hover:text-emerald-400">💱 Valuta Omregner</a>
            <a href="https://enheder.holstjensen.eu" className="hover:text-emerald-400">📏 Enheder Omregner</a>
            <a href="https://citater.holstjensen.eu" className="hover:text-emerald-400">💬 Citater</a>
            <a href="https://lorem.holstjensen.eu" className="hover:text-emerald-400">📜 Lorem Ipsum</a>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <p className="text-sm text-slate-400 mb-4">
            <strong>Affiliate disclaimer:</strong> RejserMedBørn.dk indeholder affiliate-links. Når du booker via vores links, modtager vi en lille kommission uden ekstra omkostning for dig. Dette hjælper os med at vedligeholde siden og skabe gratis indhold.
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} RejserMedBørn.dk. Alle rettigheder forbeholdes.
          </p>
        </div>
      </div>
    </footer>
  );
}

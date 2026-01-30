import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt - WhiteNoise.dk',
  description: 'Kontakt WhiteNoise.dk - din danske guide til bedre søvn.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-indigo-600">Forside</Link>
          <span>/</span>
          <span className="text-gray-900">Kontakt</span>
        </nav>

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontakt</h1>

        {/* Info box */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-sky-900 mb-2">Bemærk</h2>
              <p className="text-sky-800">
                WhiteNoise.dk er et informations- og affiliate-site. Vi tilbyder ikke kundesupport
                eller direkte henvendelser via kontaktformular.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Hvis du har spørgsmål til et specifikt produkt, anbefaler vi at du kontakter
            den pågældende forhandler direkte via deres hjemmeside.
          </p>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Nyttige links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privatlivspolitik"
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link
                  href="/cookiepolitik"
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Cookie-politik
                </Link>
              </li>
              <li>
                <Link
                  href="/om-os"
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Om WhiteNoise.dk
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

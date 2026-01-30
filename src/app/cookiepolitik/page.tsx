import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie-politik - RejserMedBørn.dk',
  description: 'Læs om cookies på RejserMedBørn.dk, herunder affiliate- og statistikcookies.',
};

export default function CookiePolitikPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Forside</Link>
          <span>/</span>
          <span className="text-gray-900">Cookie-politik</span>
        </nav>

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie-politik</h1>
        <p className="text-xl text-gray-600 mb-8">
          Denne cookie-politik beskriver, hvordan RejserMedBørn.dk bruger cookies og lignende teknologier.
        </p>

        {/* Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">1</span>
              Hvad er cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies er små tekstfiler, der gemmes på din enhed, når du besøger et website. De bruges bl.a. til at
              få sitet til at fungere, huske præferencer og måle trafik.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">2</span>
              Typer af cookies vi kan bruge
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-gray-900">Nødvendige cookies</strong>
                  <p className="text-gray-600">Sikrer basale funktioner og sikkerhed.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-gray-900">Statistik/analytics</strong>
                  <p className="text-gray-600">Hjælper os med at forstå, hvilke sider der bruges mest.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-gray-900">Marketing/affiliate</strong>
                  <p className="text-gray-600">Når du klikker på affiliate-links, kan tredjepart sætte cookies for at måle og tilskrive kommission.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">3</span>
              Affiliate-cookies (Partner-ads m.fl.)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              RejserMedBørn.dk anvender affiliate-links. Hvis du klikker på et link, kan affiliate-netværket/bookingsiden
              sætte en cookie for at registrere din henvisning. Dette bruges til at tilskrive os kommission, hvis du
              gennemfører en booking.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">4</span>
              Sådan kan du slette/undgå cookies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Du kan altid slette cookies i din browser eller blokere dem helt. Bemærk at visse funktioner på sitet
              kan påvirkes, hvis du blokerer cookies.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Sidst opdateret: {new Date().toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}

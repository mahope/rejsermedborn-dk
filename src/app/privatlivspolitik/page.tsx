import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privatlivspolitik - RejserMedBørn.dk',
  description: 'Læs hvordan RejserMedBørn.dk behandler personoplysninger og cookies.',
};

export default function PrivatlivspolitikPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Forside</Link>
          <span>/</span>
          <span className="text-gray-900">Privatlivspolitik</span>
        </nav>

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privatlivspolitik</h1>
        <p className="text-xl text-gray-600 mb-8">
          Denne privatlivspolitik forklarer, hvordan RejserMedBørn.dk behandler personoplysninger, når du
          besøger vores website.
        </p>

        {/* Content */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">1</span>
              Dataansvarlig
            </h2>
            <p className="text-gray-700 leading-relaxed">
              RejserMedBørn.dk er et informations- og affiliate-site. Vi indsamler som udgangspunkt ikke følsomme
              personoplysninger og tilbyder ikke support via kontaktformular.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">2</span>
              Hvilke oplysninger behandles?
            </h2>
            <p className="text-gray-700 mb-4">Ved besøg på sitet kan der behandles følgende typer oplysninger:</p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-gray-900">Tekniske oplysninger</strong>
                  <p className="text-gray-600">(fx IP-adresse, browser, enhedstype) – typisk i forbindelse med drift/sikkerhed og evt. statistik.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <strong className="text-gray-900">Cookie- og trackingdata</strong>
                  <p className="text-gray-600">
                    – afhænger af dine cookievalg. Se{' '}
                    <Link href="/cookiepolitik" className="text-emerald-600 hover:text-emerald-700 underline">
                      cookie-politik
                    </Link>.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">3</span>
              Formål
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">At levere og forbedre indholdet på sitet</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">At måle performance og fejl (drift/sikkerhed)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">At føre affiliate-attribution når du klikker på affiliate-links</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">4</span>
              Affiliate-links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              RejserMedBørn.dk indeholder affiliate-links. Når du klikker på et affiliate-link, kan en tredjepart
              (fx et affiliate-netværk eller en bookingside) sætte cookies for at registrere, at du kommer fra os.
              Dette sker med henblik på at tilskrive os en kommission, hvis du senere gennemfører en booking.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">5</span>
              Opbevaring
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Vi opbevarer kun data så længe det er nødvendigt for formålet. Eventuelle cookies opbevares i de perioder
              der fremgår af cookie-politikken.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">6</span>
              Dine rettigheder
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Du har rettigheder efter GDPR, herunder ret til indsigt, berigtigelse og sletning. Da vi som udgangspunkt
              ikke indsamler direkte kontaktdata via sitet, vil mange henvendelser typisk vedrøre cookies/tracking.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">7</span>
              Ændringer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Vi kan opdatere denne privatlivspolitik løbende. Seneste version vil altid være tilgængelig på denne side.
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

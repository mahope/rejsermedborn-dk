import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Om os - RejserMedBørn.dk',
  description: 'Lær mere om RejserMedBørn.dk – din danske guide til uforglemmelige familierejser med børn i alle aldre.',
  openGraph: {
    title: 'Om os | RejserMedBørn.dk',
    description: 'Din danske guide til familierejser med børn.',
  },
};

export default function OmOsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Forside</Link>
          <span>/</span>
          <span className="text-gray-900">Om os</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Om RejserMedBørn.dk
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          RejserMedBørn.dk er din danske guide til uforglemmelige familierejser.
          Vi hjælper familier med at planlægge, forberede og nyde rejser med børn i alle aldre.
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vores mission</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              At rejse med børn kan virke overvældende. Lange flyture, pakkelister,
              børnevenlige hoteller – der er meget at tænke på. Men med den rette
              forberedelse kan familierejser blive noget af det bedste I oplever sammen.
            </p>
            <p>
              Vi startede RejserMedBørn.dk fordi vi selv har erfaret, hvor stor forskel
              god forberedelse gør. Nu deler vi vores viden og hjælper andre familier
              med at skabe fantastiske rejseminder.
            </p>
          </div>
        </section>

        {/* What we offer */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hvad vi tilbyder</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Destinationsguides</h3>
                <p className="text-gray-600">Børnevenlige rejsemål med tips til hvad I kan opleve med hele familien.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Pakkelister</h3>
                <p className="text-gray-600">Komplette pakkelister til alle typer rejser – så I aldrig glemmer det vigtige.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Flyrejsetips</h3>
                <p className="text-gray-600">Alt om flyrejser med baby og børn – fra booking til landing.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* How we make money */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sådan tjener vi penge</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              RejserMedBørn.dk er en affiliate-side. Det betyder, at når du booker
              via vores links, modtager vi en lille kommission fra bookingsiden.
              <strong className="text-gray-900"> Det koster dig ikke ekstra.</strong>
            </p>
            <p>Denne model gør det muligt for os at:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Holde alt vores indhold gratis</li>
              <li>Bruge tid på research og rejseguides</li>
              <li>Opdatere siden løbende med nye destinationer og tips</li>
            </ul>
            <p className="text-gray-600 italic">
              Vi anbefaler kun destinationer og produkter, vi selv ville vælge.
              Vores integritet er vigtigere end kommission.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vores værdier</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ærlighed</h3>
              <p className="text-gray-600 text-sm">
                Vi fortæller det som det er – også når destinationer ikke lever op
                til forventningerne.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Praktisk viden</h3>
              <p className="text-gray-600 text-sm">
                Vores indhold er baseret på erfaring fra rigtige familierejser.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dansk fokus</h3>
              <p className="text-gray-600 text-sm">
                Vi fokuserer på rejsemål der er populære og relevante for danske familier.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Passion for rejser</h3>
              <p className="text-gray-600 text-sm">
                Vi tror på, at rejser beriger børns liv og styrker familiebånd.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Har du spørgsmål?</h2>
          <p className="text-gray-600 mb-6">
            Vi vil meget gerne høre fra dig med feedback eller ønsker til indhold.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Kontakt os
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}

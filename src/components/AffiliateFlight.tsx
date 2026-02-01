'use client';

interface AffiliateFlightProps {
  destination: string;
  destinationCode?: string;
  label?: string;
}

/**
 * Flight affiliate link (Momondo/Skyscanner pattern)
 * Can be replaced with actual affiliate network when signed up
 */
export default function AffiliateFlight({
  destination,
  destinationCode,
  label = "Find billige fly",
}: AffiliateFlightProps) {
  // Momondo search URL (no affiliate needed for basic link)
  const momondoUrl = new URL('https://www.momondo.dk/flight-search/CPH-' + (destinationCode || 'PMI'));
  
  // Alternative: Skyscanner
  // const skyscannerUrl = `https://www.skyscanner.dk/transport/flights/cph/${destinationCode?.toLowerCase() || 'pmi'}/`;

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-800">
            ✈️ {label}
          </p>
          <p className="text-slate-600">
            Sammenlign flypriser til {destination} fra København
          </p>
        </div>
        <a
          href={momondoUrl.toString()}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
        >
          Søg fly
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}

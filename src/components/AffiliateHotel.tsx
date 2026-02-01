'use client';

interface AffiliateHotelProps {
  destination: string;
  checkIn?: string;
  nights?: number;
  label?: string;
}

/**
 * Booking.com affiliate link generator
 * Affiliate ID: XXXXXX (replace with actual ID when signed up)
 */
export default function AffiliateHotel({
  destination,
  checkIn,
  nights = 7,
  label = "Find familiehoteller",
}: AffiliateHotelProps) {
  // Build Booking.com search URL
  // Note: Replace 'aid=XXXXXX' with actual affiliate ID when registered
  const bookingUrl = new URL('https://www.booking.com/searchresults.html');
  bookingUrl.searchParams.set('ss', destination);
  bookingUrl.searchParams.set('nflt', 'hotelfacility=28'); // 28 = Family rooms
  bookingUrl.searchParams.set('group_adults', '2');
  bookingUrl.searchParams.set('group_children', '2');
  bookingUrl.searchParams.set('age', '5'); // Child age
  bookingUrl.searchParams.set('age', '8'); // Child age
  // bookingUrl.searchParams.set('aid', 'XXXXXX'); // TODO: Add affiliate ID

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-800">
            🏨 {label}
          </p>
          <p className="text-slate-600">
            Find de bedste familiehoteller i {destination} på Booking.com
          </p>
        </div>
        <a
          href={bookingUrl.toString()}
          target="_blank"
          rel="noopener sponsored"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Søg hoteller
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <p className="text-xs text-slate-500 mt-3">
        * Sponsoreret link. Vi modtager kommission ved booking uden ekstra omkostning for dig.
      </p>
    </div>
  );
}

/**
 * Compact version for inline use
 */
export function AffiliateHotelInline({
  destination,
  label = "familiehoteller",
}: {
  destination: string;
  label?: string;
}) {
  const bookingUrl = new URL('https://www.booking.com/searchresults.html');
  bookingUrl.searchParams.set('ss', destination);
  bookingUrl.searchParams.set('nflt', 'hotelfacility=28');

  return (
    <a
      href={bookingUrl.toString()}
      target="_blank"
      rel="noopener sponsored"
      className="text-sky-700 hover:text-sky-800 underline decoration-sky-300 hover:decoration-sky-500"
    >
      {label} i {destination}*
    </a>
  );
}

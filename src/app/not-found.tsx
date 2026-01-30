import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Siden blev ikke fundet
        </h2>
        <p className="text-gray-600 mb-8">
          Beklager, vi kunne ikke finde den side du ledte efter. 
          Den er måske blevet flyttet eller fjernet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Gå til forsiden
          </Link>
          <Link
            href="/produkter"
            className="border border-gray-300 hover:border-indigo-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Se produkter
          </Link>
        </div>
      </div>
    </div>
  );
}

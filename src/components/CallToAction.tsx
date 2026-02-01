'use client';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'success';
  icon?: string;
}

export default function CallToAction({
  title,
  description,
  buttonText,
  href,
  variant = 'primary',
  icon = '📧',
}: CallToActionProps) {
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-sky-100 to-blue-100',
      border: 'border-sky-300',
      button: 'bg-sky-600 hover:bg-sky-700',
    },
    secondary: {
      bg: 'bg-gradient-to-r from-slate-100 to-gray-100',
      border: 'border-slate-300',
      button: 'bg-slate-700 hover:bg-slate-800',
    },
    success: {
      bg: 'bg-gradient-to-r from-emerald-50 to-green-100',
      border: 'border-emerald-300',
      button: 'bg-emerald-600 hover:bg-emerald-700',
    },
  };

  const style = variants[variant];

  return (
    <div className={`my-10 p-8 ${style.bg} rounded-2xl border ${style.border} text-center`}>
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6 max-w-lg mx-auto">{description}</p>
      <a
        href={href}
        className={`inline-flex items-center px-8 py-3 ${style.button} text-white font-medium rounded-lg transition-colors`}
      >
        {buttonText}
      </a>
    </div>
  );
}

/**
 * Newsletter signup CTA
 */
export function NewsletterCTA() {
  return (
    <CallToAction
      title="Få de bedste rejsetips direkte i indbakken"
      description="Tilmeld dig vores nyhedsbrev og få eksklusive tilbud, destination-guides og tips til din næste familieferie."
      buttonText="Tilmeld nyhedsbrev"
      href="/nyhedsbrev"
      variant="primary"
      icon="✉️"
    />
  );
}

/**
 * Related articles CTA
 */
export function RelatedCTA({ 
  category,
  href 
}: { 
  category: string;
  href: string;
}) {
  return (
    <div className="my-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
      <p className="text-sm text-slate-500 uppercase tracking-wide mb-2">Læs også</p>
      <p className="font-semibold text-slate-800">
        <a href={href} className="hover:text-sky-600 transition-colors">
          → Se alle vores guides om {category}
        </a>
      </p>
    </div>
  );
}

/**
 * Packing list CTA - cross-promotion
 */
export function PackingListCTA({ destination }: { destination?: string }) {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-800">
            🧳 Pakkeliste til {destination || 'rejsen'}
          </p>
          <p className="text-slate-600">
            Få en skræddersyet pakkeliste til din familieferie
          </p>
        </div>
        <a
          href="https://ai-packing-list.dk"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
        >
          Lav pakkeliste
        </a>
      </div>
    </div>
  );
}

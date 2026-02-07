import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin'] });

const ADSENSE_ID = 'ca-pub-1902871361369866';

export const metadata: Metadata = {
  title: {
    default: 'RejserMedBørn.dk | Din guide til familierejser',
    template: '%s | RejserMedBørn.dk',
  },
  description: 'Alt om rejser med børn. Find børnevenlige destinationer, tips til flyrejser med baby, pakkelister og de bedste familiehoteller.',
  keywords: ['rejser med børn', 'familierejse', 'børnevenlig ferie', 'flyrejse med baby', 'familiehotel', 'pakkeliste børn'],
  authors: [{ name: 'RejserMedBørn.dk' }],
  creator: 'RejserMedBørn.dk',
  publisher: 'RejserMedBørn.dk',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    url: 'https://rejsermedborn.dk',
    siteName: 'RejserMedBørn.dk',
    title: 'RejserMedBørn.dk | Din guide til familierejser',
    description: 'Alt om rejser med børn. Find børnevenlige destinationer, tips og de bedste familiehoteller.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RejserMedBørn.dk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RejserMedBørn.dk | Din guide til familierejser',
    description: 'Alt om rejser med børn. Find børnevenlige destinationer og tips.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://rejsermedborn.dk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <head>
        {/* Google Consent Mode - Default to denied until user consents */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {/* Google AdSense - Loads but respects Consent Mode */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  );
}

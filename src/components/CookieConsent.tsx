'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const CONSENT_KEY = 'whitenoise_cookie_consent';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    // Check if consent has been given
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(savedConsent) as ConsentState;
      setConsent(parsed);
      // Apply consent settings
      applyConsent(parsed);
    }
  }, []);

  const applyConsent = (consentState: ConsentState) => {
    // Set Google Consent Mode
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': consentState.marketing ? 'granted' : 'denied',
        'ad_user_data': consentState.marketing ? 'granted' : 'denied',
        'ad_personalization': consentState.marketing ? 'granted' : 'denied',
        'analytics_storage': consentState.analytics ? 'granted' : 'denied',
      });
    }
  };

  const saveConsent = (consentState: ConsentState) => {
    const withTimestamp = {
      ...consentState,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(withTimestamp));
    setConsent(withTimestamp);
    applyConsent(withTimestamp);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  const saveSettings = () => {
    saveConsent(consent);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {!showSettings ? (
            // Main banner
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Vi bruger cookies
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Vi bruger cookies for at forbedre din oplevelse, vise relevante annoncer og analysere vores trafik.
                    Du kan vælge hvilke cookies du vil acceptere.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={acceptAll}
                      className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Acceptér alle
                    </button>
                    <button
                      onClick={acceptNecessary}
                      className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Kun nødvendige
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-5 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                      Indstillinger
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Læs mere i vores{' '}
                    <Link href="/cookiepolitik" className="text-indigo-600 hover:underline">
                      cookie-politik
                    </Link>{' '}
                    og{' '}
                    <Link href="/privatlivspolitik" className="text-indigo-600 hover:underline">
                      privatlivspolitik
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Settings panel
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Cookie-indstillinger</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-gray-900">Nødvendige cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Disse cookies er nødvendige for at sitet fungerer og kan ikke slås fra.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Analytics cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-gray-900">Statistik cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Hjælper os med at forstå hvordan besøgende bruger sitet, så vi kan forbedre det.
                    </p>
                  </div>
                  <button
                    onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      consent.analytics ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}>
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </button>
                </div>

                {/* Marketing cookies */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1 pr-4">
                    <h3 className="font-medium text-gray-900">Marketing cookies</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Bruges til at vise relevante annoncer baseret på dine interesser. Inkluderer affiliate-tracking og Google AdSense.
                    </p>
                  </div>
                  <button
                    onClick={() => setConsent(c => ({ ...c, marketing: !c.marketing }))}
                    className="flex-shrink-0"
                  >
                    <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      consent.marketing ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}>
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveSettings}
                  className="flex-1 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Gem indstillinger
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Acceptér alle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Hook to check consent status
export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) {
      setConsent(JSON.parse(saved));
    }
  }, []);

  return consent;
}

// Check if marketing consent is given
export function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem(CONSENT_KEY);
  if (!saved) return false;
  const consent = JSON.parse(saved) as ConsentState;
  return consent.marketing;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, params: Record<string, string>) => void;
  }
}

'use client';

import { useEffect, useRef } from 'react';

// AdSense ad slot IDs
const AD_SLOTS = {
  display: '5705605166',
  inArticle: '5705605166',    // Using display slot for now - create in-article slot in AdSense if needed
  banner: '5705605166',       // Using display slot for now - create banner slot in AdSense if needed
};

const ADSENSE_CLIENT = 'ca-pub-1902871361369866';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  layout?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  slot,
  format = 'auto',
  layout,
  className = '',
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    try {
      if (typeof window !== 'undefined' && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout && { 'data-ad-layout': layout })}
      />
    </div>
  );
}

// Display ad - for general placement (sidebar, between content)
export function DisplayAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-6 ${className}`}>
      <p className="text-xs text-gray-400 text-center mb-2">Annonce</p>
      <AdUnit slot={AD_SLOTS.display} format="auto" />
    </div>
  );
}

// In-article ad - flows naturally within article content
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <p className="text-xs text-gray-400 text-center mb-2">Annonce</p>
      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" />
    </div>
  );
}

// Banner ad - horizontal format for headers/footers
export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 ${className}`}>
      <p className="text-xs text-gray-400 text-center mb-2">Annonce</p>
      <AdUnit slot={AD_SLOTS.banner} format="horizontal" />
    </div>
  );
}

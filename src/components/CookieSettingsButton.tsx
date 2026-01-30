'use client';

const CONSENT_KEY = 'whitenoise_cookie_consent';

export default function CookieSettingsButton() {
  const openSettings = () => {
    // Remove consent to re-show the banner
    localStorage.removeItem(CONSENT_KEY);
    // Reload to show the consent banner
    window.location.reload();
  };

  return (
    <button
      onClick={openSettings}
      className="text-sm hover:text-sky-300 transition-colors text-left"
    >
      Cookie-indstillinger
    </button>
  );
}

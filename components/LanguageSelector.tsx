"use client";

import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2" suppressHydrationWarning>
      <button
        onClick={() => changeLanguage('es')}
        className={`p-2 rounded-lg transition-all ${
          i18n.language === 'es'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        title="Español"
        suppressHydrationWarning
      >
        🇪🇸
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`p-2 rounded-lg transition-all ${
          i18n.language === 'en'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        title="English"
        suppressHydrationWarning
      >
        🇺🇸
      </button>
    </div>
  );
}
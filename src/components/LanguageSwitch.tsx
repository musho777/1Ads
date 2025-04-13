import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: 'en' | 'ru') => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={t('settings.language')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="ml-2 text-sm font-medium text-gray-700">
          {language === 'en' ? 'EN' : 'RU'}
        </span>
      </button> */}

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-sky-50 text-sky-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => handleLanguageChange('en')}
              role="menuitem"
            >
              {t('settings.english')}
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm ${language === 'ru' ? 'bg-sky-50 text-sky-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() => handleLanguageChange('ru')}
              role="menuitem"
            >
              {t('settings.russian')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
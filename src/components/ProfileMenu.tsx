import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, CreditCard, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileMenuProps {
  onEditProfile: () => void;
}

export default function ProfileMenu({ onEditProfile }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

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

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 
          hover:bg-gray-50 active:bg-gray-100 
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
          shadow-sm hover:shadow-md"
      >
        <User className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="p-2 border-b border-gray-100">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900">Ivan Ivanov</p>
              <p className="text-sm text-gray-500">ivan@example.com</p>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                onEditProfile();
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Settings className="w-4 h-4 mr-3" />
              {t('profile.settings')}
            </button>

            <button
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <CreditCard className="w-4 h-4 mr-3" />
              {t('profile.billing')}
            </button>

            <button
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              {t('profile.help')}
            </button>
          </div>

          <div className="p-2 border-t border-gray-100">
            <button
              className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut className="w-4 h-4 mr-3" />
              {t('profile.logout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
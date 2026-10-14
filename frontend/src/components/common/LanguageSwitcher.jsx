import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  // If i18n.language has region tags like 'en-US', match base
  const currentLangCode = (i18n.language || 'en').split('-')[0];
  const currentLanguage = languages.find(l => l.code === currentLangCode) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe size={16} className="text-[#0F4C81]" />
        <span className="hidden md:inline">{currentLanguage.name}</span>
        <span className="md:hidden">Language</span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-slate-100 divide-y divide-slate-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-t-xl flex items-center gap-2">
             <Globe size={14} /> Select Language
          </div>
          <div className="py-1">
            {languages.map((lng) => (
              <button
                key={lng.code}
                onClick={() => changeLanguage(lng.code)}
                className={`group flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#0F4C81] hover:text-white ${
                  currentLangCode === lng.code ? 'font-bold text-[#0F4C81] bg-blue-50' : 'text-slate-700'
                }`}
              >
                <div className="w-4 flex justify-center">
                  {currentLangCode === lng.code && <Check size={14} className="text-[#0F4C81] group-hover:text-white" />}
                </div>
                {lng.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

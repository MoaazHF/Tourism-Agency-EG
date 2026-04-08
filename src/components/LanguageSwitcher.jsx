import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ar', label: 'العربية', short: 'AR' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/30 hover:bg-surface-container-low transition-all group bg-white/50 backdrop-blur-sm shadow-sm"
      >
        <Globe className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
        <span className="text-xs font-bold uppercase text-secondary group-hover:text-primary">
          {currentLanguage.short}
        </span>
        <ChevronDown className={`w-3 h-3 text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full inset-e-0 mt-2 w-40 bg-surface-container-lowest shadow-xl rounded-xl border border-outline-variant/20 overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-surface-container-low transition-colors ${
                  i18n.language === lang.code ? 'text-primary font-bold bg-surface-container-low' : 'text-on-surface'
                }`}
              >
                <span className={lang.code === 'ar' ? 'font-arabic' : 'font-body'}>{lang.label}</span>
                {i18n.language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:bg-surface-container-low transition-all group"
      title={i18n.language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
    >
      <Globe className={`w-4 h-4 text-secondary group-hover:text-primary transition-colors`} />
      <span className="text-xs font-bold uppercase text-secondary group-hover:text-primary">
        {i18n.language === 'en' ? 'EN' : 'FR'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;

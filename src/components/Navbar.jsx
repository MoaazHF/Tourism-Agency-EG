import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 hover:text-primary transition-colors pb-1 uppercase tracking-tight text-sm font-bold border-b-2 ${
      isActive ? 'text-primary border-primary' : 'text-secondary border-transparent'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block hover:text-primary transition-colors py-2 uppercase font-bold text-sm ${
      isActive ? 'text-primary' : 'text-secondary'
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-[80px] bg-[#f8faf3]/80 backdrop-blur-xl shadow-sm`}
    >
      <div className="flex justify-between items-center w-full px-8 h-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-[#1a2b48] font-headline" onClick={closeMenu}>
          Route d'Égypte
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-headline">
          <NavLink to="/" className={navLinkClass}>
            {t('nav.welcome')}
          </NavLink>

          {/* Cruises Dropdown */}
          <div className="relative group flex items-center">
            <Link to="/cruises" className={`flex items-center gap-1 uppercase tracking-tight text-sm font-bold border-b-2 pb-1 border-transparent text-secondary hover:text-primary transition-colors`}>
              {t('nav.cruises')} <ChevronDown size={14} />
            </Link>
            <div className="absolute top-full inset-s-0 mt-2 w-56 bg-surface-container-lowest shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="flex flex-col">
                <Link to="/cruises/felucca" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.felucca')}</Link>
                <Link to="/cruises/dahabeya" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.dahabeya')}</Link>
                <Link to="/cruises/ship-tours" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.ship_tours')}</Link>
                <Link to="/cruises/lake-nasser" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.lake_nasser')}</Link>
              </div>
            </div>
          </div>

          {/* Excursions Dropdown */}
          <div className="relative group flex items-center">
            <Link to="/excursions" className={`flex items-center gap-1 uppercase tracking-tight text-sm font-bold border-b-2 pb-1 border-transparent text-secondary hover:text-primary transition-colors`}>
              {t('nav.excursions')} <ChevronDown size={14} />
            </Link>
            <div className="absolute top-full inset-s-0 mt-2 w-64 bg-surface-container-lowest shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="flex flex-col">
                <Link to="/excursions/cairo" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.starting_cairo')}</Link>
                <Link to="/excursions/luxor" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.luxor_region')}</Link>
                <Link to="/excursions/aswan" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.aswan_region')}</Link>
                <Link to="/excursions/gouna-hurghada-safaga" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.red_sea')}</Link>
                <Link to="/excursions/marsa-alam" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.marsa_alam')}</Link>
                <Link to="/excursions/sinai" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">{t('nav.dropdowns.sinai')}</Link>
              </div>
            </div>
          </div>

          <NavLink to="/about" className={navLinkClass}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {t('nav.contact')}
          </NavLink>
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <button className="btn-primary-gradient text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-transform duration-200">
            {t('nav.book_now')}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="text-secondary p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full inset-s-0 w-full bg-surface-container-lowest shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen border-t' : 'max-h-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-4 font-headline">
          <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
            {t('nav.welcome')}
          </NavLink>

          <div className="border-t border-surface-container-high pt-2">
            <div className="flex items-center justify-between w-full text-left py-2 text-secondary uppercase font-bold text-sm">
              <Link to="/cruises" className="hover:text-primary" onClick={closeMenu}>{t('nav.cruises')}</Link>
              <button onClick={() => setActiveDropdown(activeDropdown === 'cruises' ? null : 'cruises')} className="p-1 cursor-pointer">
                <ChevronDown size={18} className={`transition-transform border-gray-100 ${activeDropdown === 'cruises' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'cruises' ? 'max-h-60 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col ps-4 gap-3 text-sm font-body">
                <Link to="/cruises/felucca" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.felucca')}</Link>
                <Link to="/cruises/dahabeya" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.dahabeya')}</Link>
                <Link to="/cruises/ship-tours" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.ship_tours')}</Link>
                <Link to="/cruises/lake-nasser" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.lake_nasser')}</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-container-high pt-2">
            <div className="flex items-center justify-between w-full text-left py-2 text-secondary uppercase font-bold text-sm">
              <Link to="/excursions" className="hover:text-primary" onClick={closeMenu}>{t('nav.excursions')}</Link>
              <button onClick={() => setActiveDropdown(activeDropdown === 'excursions' ? null : 'excursions')} className="p-1 cursor-pointer">
                <ChevronDown size={18} className={`transition-transform border-gray-100 ${activeDropdown === 'excursions' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'excursions' ? 'max-h-60 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col ps-4 gap-3 text-sm font-body">
                <Link to="/excursions/cairo" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.starting_cairo')}</Link>
                <Link to="/excursions/luxor" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.luxor_region')}</Link>
                <Link to="/excursions/aswan" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.aswan_region')}</Link>
                <Link to="/excursions/gouna-hurghada-safaga" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.red_sea')}</Link>
                <Link to="/excursions/marsa-alam" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.marsa_alam')}</Link>
                <Link to="/excursions/sinai" className="text-on-surface hover:text-primary" onClick={closeMenu}>{t('nav.dropdowns.sinai')}</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-container-high pt-2 flex flex-col gap-4">
            <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMenu}>
              {t('nav.about')}
            </NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMenu}>
              {t('nav.contact')}
            </NavLink>
          </div>
          
          <div className="mt-4">
             <button className="w-full btn-primary-gradient text-white px-6 py-3 rounded-xl font-headline font-bold text-sm uppercase tracking-wider shadow-lg">
               {t('nav.book_now')}
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

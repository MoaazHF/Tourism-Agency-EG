import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const Navbar = () => {
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
            Welcome
          </NavLink>

          {/* Cruises Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 uppercase tracking-tight text-sm font-bold border-b-2 pb-1 border-transparent text-secondary hover:text-primary transition-colors`}>
              Cruises in Egypt <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-surface-container-lowest shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="flex flex-col">
                <Link to="/cruises/felucca" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Felucca Cruises</Link>
                <Link to="/cruises/dahabeya" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Dahabeya Cruises</Link>
                <Link to="/cruises/ship-tours" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Cruise Ship Tours</Link>
                <Link to="/cruises/lake-nasser" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Cruise on Lake Nasser</Link>
              </div>
            </div>
          </div>

          {/* Excursions Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 uppercase tracking-tight text-sm font-bold border-b-2 pb-1 border-transparent text-secondary hover:text-primary transition-colors`}>
              Desert & Excursions <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-surface-container-lowest shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="flex flex-col">
                <Link to="/excursions/cairo" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Starting from Cairo</Link>
                <Link to="/excursions/luxor" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Luxor & Its Region</Link>
                <Link to="/excursions/aswan" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Aswan & Its Region</Link>
                <Link to="/excursions/gouna-hurghada-safaga" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">From El Gouna / Hurghada / Safaga</Link>
                <Link to="/excursions/marsa-alam" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Starting from Marsa Alam</Link>
                <Link to="/excursions/sinai" className="px-4 py-3 hover:bg-surface-container-low text-sm font-body text-on-surface">Starting from Southern Sinai</Link>
              </div>
            </div>
          </div>

          <NavLink to="/about" className={navLinkClass}>
            Who Are We?
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <Globe className="text-secondary cursor-pointer hover:text-primary transition-colors w-5 h-5" />
          <button className="btn-primary-gradient text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-transform duration-200">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-secondary p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-surface-container-lowest shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen border-t' : 'max-h-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-4 font-headline">
          <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
            Welcome
          </NavLink>

          <div className="border-t border-surface-container-high pt-2">
            <button 
              className="flex items-center justify-between w-full text-left py-2 text-secondary uppercase font-bold text-sm"
              onClick={() => setActiveDropdown(activeDropdown === 'cruises' ? null : 'cruises')}
            >
              Cruises in Egypt <ChevronDown size={14} className={`transition-transform border-gray-100 ${activeDropdown === 'cruises' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'cruises' ? 'max-h-60 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col pl-4 gap-3 text-sm font-body">
                <Link to="/cruises/felucca" className="text-on-surface hover:text-primary" onClick={closeMenu}>Felucca Cruises</Link>
                <Link to="/cruises/dahabeya" className="text-on-surface hover:text-primary" onClick={closeMenu}>Dahabeya Cruises</Link>
                <Link to="/cruises/ship-tours" className="text-on-surface hover:text-primary" onClick={closeMenu}>Cruise Ship Tours</Link>
                <Link to="/cruises/lake-nasser" className="text-on-surface hover:text-primary" onClick={closeMenu}>Cruise on Lake Nasser</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-container-high pt-2">
            <button 
              className="flex items-center justify-between w-full text-left py-2 text-secondary uppercase font-bold text-sm"
              onClick={() => setActiveDropdown(activeDropdown === 'excursions' ? null : 'excursions')}
            >
              Desert & Excursions <ChevronDown size={14} className={`transition-transform border-gray-100 ${activeDropdown === 'excursions' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'excursions' ? 'max-h-60 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col pl-4 gap-3 text-sm font-body">
                <Link to="/excursions/cairo" className="text-on-surface hover:text-primary" onClick={closeMenu}>Starting from Cairo</Link>
                <Link to="/excursions/luxor" className="text-on-surface hover:text-primary" onClick={closeMenu}>Luxor & Its Region</Link>
                <Link to="/excursions/aswan" className="text-on-surface hover:text-primary" onClick={closeMenu}>Aswan & Its Region</Link>
                <Link to="/excursions/gouna-hurghada-safaga" className="text-on-surface hover:text-primary" onClick={closeMenu}>From El Gouna / Hurghada / Safaga</Link>
                <Link to="/excursions/marsa-alam" className="text-on-surface hover:text-primary" onClick={closeMenu}>Starting from Marsa Alam</Link>
                <Link to="/excursions/sinai" className="text-on-surface hover:text-primary" onClick={closeMenu}>Starting from Southern Sinai</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-container-high pt-2 flex flex-col gap-4">
            <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMenu}>
              Who Are We?
            </NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
          
          <div className="mt-4">
             <button className="w-full btn-primary-gradient text-white px-6 py-3 rounded-xl font-headline font-bold text-sm uppercase tracking-wider shadow-lg">
               Book Now
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

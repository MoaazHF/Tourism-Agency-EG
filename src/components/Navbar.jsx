import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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
    `flex items-center gap-1 hover:text-gold-500 transition-colors ${
      isActive ? 'text-gold-500 font-medium' : 'text-gray-800'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block hover:text-gold-500 transition-colors py-2 ${
      isActive ? 'text-gold-500 font-medium' : 'text-gray-800'
    }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight" onClick={closeMenu}>
          Egypt <span className="text-gold-500">Journeys</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Welcome
          </NavLink>

          {/* Cruises Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-800 hover:text-gold-500 transition-colors py-2">
              Cruises in Egypt <ChevronDown size={16} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="flex flex-col">
                <Link to="/cruises/felucca" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Felucca Cruises</Link>
                <Link to="/cruises/dahabeya" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Dahabeya Cruises</Link>
                <Link to="/cruises/ship-tours" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Cruise Ship Tours</Link>
                <Link to="/cruises/lake-nasser" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Cruise on Lake Nasser</Link>
              </div>
            </div>
          </div>

          {/* Excursions Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-gray-800 hover:text-gold-500 transition-colors py-2">
              Desert & Excursions <ChevronDown size={16} />
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="flex flex-col">
                <Link to="/excursions/cairo" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Starting from Cairo</Link>
                <Link to="/excursions/luxor" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Luxor & Its Region</Link>
                <Link to="/excursions/aswan" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Aswan & Its Region</Link>
                <Link to="/excursions/gouna-hurghada-safaga" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">From El Gouna / Hurghada / Safaga</Link>
                <Link to="/excursions/marsa-alam" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Starting from Marsa Alam</Link>
                <Link to="/excursions/sinai" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-800">Starting from Southern Sinai</Link>
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

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-800 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen border-t' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu}>
            Welcome
          </NavLink>

          <div className="border-t border-gray-100 pt-2">
            <button 
              className="flex items-center justify-between w-full text-left py-2 text-gray-800 font-medium"
              onClick={() => setActiveDropdown(activeDropdown === 'cruises' ? null : 'cruises')}
            >
              Cruises in Egypt <ChevronDown size={16} className={`transition-transform border-gray-100 ${activeDropdown === 'cruises' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'cruises' ? 'max-h-60 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col pl-4 gap-3 text-sm">
                <Link to="/cruises/felucca" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Felucca Cruises</Link>
                <Link to="/cruises/dahabeya" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Dahabeya Cruises</Link>
                <Link to="/cruises/ship-tours" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Cruise Ship Tours</Link>
                <Link to="/cruises/lake-nasser" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Cruise on Lake Nasser</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-2">
            <button 
              className="flex items-center justify-between w-full text-left py-2 text-gray-800 font-medium"
              onClick={() => setActiveDropdown(activeDropdown === 'excursions' ? null : 'excursions')}
            >
              Desert & Excursions <ChevronDown size={16} className={`transition-transform border-gray-100 ${activeDropdown === 'excursions' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === 'excursions' ? 'max-h-60 mt-2' : 'max-h-0'}`}>
              <div className="flex flex-col pl-4 gap-3 text-sm">
                <Link to="/excursions/cairo" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Starting from Cairo</Link>
                <Link to="/excursions/luxor" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Luxor & Its Region</Link>
                <Link to="/excursions/aswan" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Aswan & Its Region</Link>
                <Link to="/excursions/gouna-hurghada-safaga" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>From El Gouna / Hurghada / Safaga</Link>
                <Link to="/excursions/marsa-alam" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Starting from Marsa Alam</Link>
                <Link to="/excursions/sinai" className="text-gray-600 hover:text-gold-500" onClick={closeMenu}>Starting from Southern Sinai</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-2 flex flex-col gap-4">
            <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMenu}>
              Who Are We?
            </NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={closeMenu}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

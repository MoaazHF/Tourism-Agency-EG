import { Link } from 'react-router-dom';
import { ArrowRight, Star, Map, CarFront, Clock, ShieldCheck, Ship, Calendar } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <div className="mb-4">
            <span className="text-[#f0bf5d] font-caveat text-4xl transform -rotate-2 inline-block">Tailor-Made Travel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-headline tracking-tight mb-6 max-w-4xl leading-tight">
            Discover the Soul of <span className="text-transparent bg-clip-text btn-primary-gradient">Egypt</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-container-low max-w-2xl font-body opacity-90 mb-10 leading-relaxed">
            The excellence of tailor-made travel in Egypt. Discover authentic and luxurious experiences created for discerning travelers.
          </p>
          <button className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
            Craft Your Itinerary <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-surface max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">The Difference</h2>
          <h3 className="text-4xl font-bold text-on-surface font-headline">Why Book With Us?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-10 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 shadow-sm border border-transparent hover:border-[#e1e3dd]">
            <div className="w-16 h-16 bg-[#c79a3c]/10 text-[#7b5800] rounded-full flex items-center justify-center mx-auto mb-6">
              <Map className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#1a2b48] mb-4 font-headline">Local Expertise</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Our guides are passionate Egyptologists who reveal the best-kept secrets of the pharaohs.
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-10 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 shadow-sm border border-transparent hover:border-[#e1e3dd]">
            <div className="w-16 h-16 bg-[#c79a3c]/10 text-[#7b5800] rounded-full flex items-center justify-center mx-auto mb-6">
              <CarFront className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#1a2b48] mb-4 font-headline">Private Vehicles</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Travel in absolute comfort aboard our recent, air-conditioned, and fully privatized vehicles.
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-10 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 shadow-sm border border-transparent hover:border-[#e1e3dd]">
            <div className="w-16 h-16 bg-[#c79a3c]/10 text-[#7b5800] rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#1a2b48] mb-4 font-headline">24/7 Assistance</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              Dedicated support from your arrival to your departure for total peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Cruises Section */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">On The Nile</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">Signature Cruises</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Ships <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Cruise 1 */}
            <Link to="/cruises/dahabeya" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop" alt="Dahabeya" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Premium
                </div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">The Dahabeya</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Intimate sailing along the Nile. Discover Egypt at a gentle pace on this traditional majestic sailboat.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 5 Nights</span>
                  <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-[#c79a3c]" /> 8 Cabins</span>
                </div>
              </div>
            </Link>

            {/* Cruise 2 */}
            <Link to="/cruises/the-luxor" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600521605615-585a06584c31?q=80&w=2070&auto=format&fit=crop" alt="The Luxor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Luxury
                </div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">The Luxor</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Steamship charm from the 1920s. Relive the golden age of Nile cruises in absolute refinement.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 7 Nights</span>
                  <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-[#c79a3c]" /> 22 Cabins</span>
                </div>
              </div>
            </Link>

            {/* Cruise 3 */}
            <Link to="/cruises/the-sandal" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1580834341580-8c1ee9dfeb8c?q=80&w=2070&auto=format&fit=crop" alt="The Sandal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">The Sandal</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Authentic experience away from the crowds. A two-masted boat for a private immersion in local life.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 4 Nights</span>
                  <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-[#c79a3c]" /> 4 Cabins</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <button className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Ships <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 btn-primary-gradient relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-7xl font-bold text-white font-headline mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>15+</div>
              <div className="text-tertiary-fixed font-headline font-semibold uppercase tracking-wider text-sm">Years of Expertise</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-bold text-white font-headline mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>2500+</div>
              <div className="text-tertiary-fixed font-headline font-semibold uppercase tracking-wider text-sm">Happy Travelers</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-bold text-white font-headline mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>100%</div>
              <div className="text-tertiary-fixed font-headline font-semibold uppercase tracking-wider text-sm">Tailor-Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Desert Safari Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">Off the beaten path</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">Desert Safari</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Safaris <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Safari 1 */}
            <Link to="/safari/white-desert" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1549646879-11ba18e775eb?q=80&w=1974&auto=format&fit=crop" alt="The White Desert" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">The White Desert</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  A sculpted world of chalk. Spend the night under the stars amidst these surreal geological formations.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 2 Nights</span>
                  <span className="flex items-center gap-1.5"><CarFront className="w-4 h-4 text-[#c79a3c]" /> 4x4 Private</span>
                </div>
              </div>
            </Link>

            {/* Safari 2 */}
            <Link to="/safari/siwa-oasis" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1502485542750-f8f533cc285b?q=80&w=2070&auto=format&fit=crop" alt="Siwa Oasis" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Siwa Oasis</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  An island of palm trees and springs deep in the sand sea. Discover Alexander the Great's temple and salt lakes.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 3 Nights</span>
                  <span className="flex items-center gap-1.5"><CarFront className="w-4 h-4 text-[#c79a3c]" /> 4x4 Private</span>
                </div>
              </div>
            </Link>

            {/* Safari 3 */}
            <Link to="/safari/black-desert" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1627914441270-e4708fb56447?q=80&w=2070&auto=format&fit=crop" alt="Black Desert & Bahariya" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Black Desert</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Volcanic mountains rising from the golden sands. Explore hot springs and ancient dinosaur remnants.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 1 Night</span>
                  <span className="flex items-center gap-1.5"><CarFront className="w-4 h-4 text-[#c79a3c]" /> 4x4 Private</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <button className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Safaris <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Tours & Packages Section */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">Curated Itineraries</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">Tours & Packages</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Packages <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Tour 1 */}
            <Link to="/tours/classic-egypt" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=2071&auto=format&fit=crop" alt="Classic Egypt" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Bestseller
                </div>
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Classic Egypt</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Experience the quintessential highlights. Cairo, the Pyramids, Luxor, Aswan, and a gentle Nile Cruise.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 7 Nights</span>
                  <span className="flex items-center gap-1.5"><Map className="w-4 h-4 text-[#c79a3c]" /> 4 Cities</span>
                </div>
              </div>
            </Link>

            {/* Tour 2 */}
            <Link to="/tours/pharaohs-coral" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1589839461973-45ab8bb4167e?q=80&w=2070&auto=format&fit=crop" alt="Egypt & The Red Sea" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Pharaohs & Coral</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  A perfect blend of culture and relaxation. Explore ancient temples followed by days on pristine Red Sea beaches.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 10 Nights</span>
                  <span className="flex items-center gap-1.5"><Map className="w-4 h-4 text-[#c79a3c]" /> 3 Cities</span>
                </div>
              </div>
            </Link>

            {/* Tour 3 */}
            <Link to="/tours/deep-south" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600021319082-f538e12128aa?q=80&w=2070&auto=format&fit=crop" alt="Deep South Explorer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Deep South Explorer</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Venture from Aswan down to the majestic temples of Abu Simbel. A journey into the heart of Nubia.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> 5 Nights</span>
                  <span className="flex items-center gap-1.5"><Map className="w-4 h-4 text-[#c79a3c]" /> 2 Cities</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <button className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Packages <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Excursions Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">Day Trips</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">Excursions</h3>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Excursions <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Excursion 1 */}
            <Link to="/excursions/giza-pyramids" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542475454-945b4c107eaa?q=80&w=2070&auto=format&fit=crop" alt="Giza Pyramids" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Giza Pyramids & Sphinx</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Half-day private tour. Stand before the last remaining wonder of the ancient world with an expert Egyptologist.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#c79a3c]" /> 4 Hours</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#c79a3c]" /> Private Guide</span>
                </div>
              </div>
            </Link>

            {/* Excursion 2 */}
            <Link to="/excursions/valley-of-kings" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1621255855078-d101d2ceeeff?q=80&w=2070&auto=format&fit=crop" alt="Valley of the Kings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Valley of the Kings</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  Full-day Luxor tour. Descend into royal tombs, marvel at Karnak Temple, and cross the majestic Nile.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#c79a3c]" /> 8 Hours</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#c79a3c]" /> Private Guide</span>
                </div>
              </div>
            </Link>

            {/* Excursion 3 */}
            <Link to="/excursions/abu-simbel" className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1628172102146-24ba0baedce0?q=80&w=2070&auto=format&fit=crop" alt="Abu Simbel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">Abu Simbel Temples</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                  From Aswan by air or road. Witness Ramses II's colossal monuments carved directly into the mountain side.
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#c79a3c]" /> 6 Hours</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#c79a3c]" /> Private Guide</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <button className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              View All Excursions <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Module */}
      <section className="py-24 bg-surface-container-lowest border-t border-surface-container">
        <div className="max-w-4xl mx-auto px-8 text-center bg-[#f8faf3] rounded-3xl p-12 md:p-20 shadow-sm border border-[#e1e3dd] relative overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0bf5d]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7b5800]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-on-surface font-headline mb-4">Subscribe to our Newsletter</h3>
            <p className="text-on-surface-variant font-body mb-10 max-w-xl mx-auto">
              Stay informed about our exclusive offers, new itineraries, and travel inspiration for Egypt.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="grow bg-white border border-surface-dim px-6 py-4 rounded-xl font-body text-[#191c18] focus:outline-none focus:ring-2 focus:ring-[#c79a3c] focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

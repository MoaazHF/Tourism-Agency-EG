import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Map, CarFront, Clock, ShieldCheck, Ship, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTrips } from '../hooks/useTrips';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { t } = useTranslation();
  const { trips, loading } = useTrips();

  const getCategoryTrips = (slug) => {
    return trips
      .filter(t => t.category_slug === slug)
      .sort((a, b) => {
        // Prioritize is_featured, then created_at desc
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      })
      .slice(0, 3);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <div className="mb-4">
            <span className="text-[#f0bf5d] font-caveat text-4xl transform -rotate-2 inline-block">{t('home.hero.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-headline tracking-tight mb-6 max-w-4xl leading-tight">
            {t('home.hero.title_part1')} <span className="text-transparent bg-clip-text btn-primary-gradient">{t('home.hero.title_part2')}</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-container-low max-w-2xl font-body opacity-90 mb-10 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
          <button className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
            {t('home.hero.cta_explore')} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-surface max-w-screen-2xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">{t('home.explore.badge')}</h2>
          <h3 className="text-4xl font-bold text-on-surface font-headline">{t('home.explore.title')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-10 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 shadow-sm border border-transparent hover:border-[#e1e3dd]">
            <div className="w-16 h-16 bg-[#c79a3c]/10 text-[#7b5800] rounded-full flex items-center justify-center mx-auto mb-6">
              <Map className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#1a2b48] mb-4 font-headline">{t('home.features.serenity.title')}</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              {t('home.features.serenity.desc')}
            </p>
          </div>
          {/* Card 2 */}
          <div className="p-10 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 shadow-sm border border-transparent hover:border-[#e1e3dd]">
            <div className="w-16 h-16 bg-[#c79a3c]/10 text-[#7b5800] rounded-full flex items-center justify-center mx-auto mb-6">
              <CarFront className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#1a2b48] mb-4 font-headline">{t('home.features.excellence.title')}</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              {t('home.features.excellence.desc')}
            </p>
          </div>
          {/* Card 3 */}
          <div className="p-10 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-300 shadow-sm border border-transparent hover:border-[#e1e3dd]">
            <div className="w-16 h-16 bg-[#c79a3c]/10 text-[#7b5800] rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#1a2b48] mb-4 font-headline">{t('home.features.authentic.title')}</h4>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              {t('home.features.authentic.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Signature Cruises Section */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">{t('nav.cruises')}</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">{t('nav.dropdowns.ship_tours')}</h3>
            </div>
            <Link to="/cruises" className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {getCategoryTrips('cruises').map((trip) => (
              <Link key={trip.id} to={`/cruises/${trip.id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img src={trip.images?.[0] || 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop'} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {trip.is_featured && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {trip.category_label || 'Premium'}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col grow">
                  <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">{trip.title}</h4>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 line-clamp-2">
                    {trip.short_description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> {trip.duration}</span>
                    <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-[#c79a3c]" /> {trip.group_size || 'Private'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/cruises" className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
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
              <div className="text-tertiary-fixed font-headline font-semibold uppercase tracking-wider text-sm">{t('home.stats.years')}</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-bold text-white font-headline mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>2500+</div>
              <div className="text-tertiary-fixed font-headline font-semibold uppercase tracking-wider text-sm">{t('home.stats.travelers')}</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-bold text-white font-headline mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>100%</div>
              <div className="text-tertiary-fixed font-headline font-semibold uppercase tracking-wider text-sm">{t('home.stats.custom')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Desert Safari Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">{t('home.categories.desert')}</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">{t('home.categories.desert')}</h3>
            </div>
            <Link to="/safari" className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {getCategoryTrips('safari').map((trip) => (
              <Link key={trip.id} to={`/safari/${trip.id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img src={trip.images?.[0]} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {trip.is_featured && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {trip.category_label || 'Most Popular'}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col grow">
                  <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">{trip.title}</h4>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 line-clamp-2">
                    {trip.short_description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> {trip.duration}</span>
                    <span className="flex items-center gap-1.5"><CarFront className="w-4 h-4 text-[#c79a3c]" /> {trip.group_size || '4x4 Private'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/safari" className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tours & Packages Section */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">{t('home.explore.badge')}</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">{t('home.categories.luxury')}</h3>
            </div>
            <Link to="/tours" className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {getCategoryTrips('tours').map((trip) => (
              <Link key={trip.id} to={`/tours/${trip.id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img src={trip.images?.[0]} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {trip.is_featured && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {trip.category_label || 'Bestseller'}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col grow">
                  <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">{trip.title}</h4>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 line-clamp-2">
                    {trip.short_description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#c79a3c]" /> {trip.duration}</span>
                    <span className="flex items-center gap-1.5"><Map className="w-4 h-4 text-[#c79a3c]" /> {trip.group_size || 'Discovery'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/tours" className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Excursions Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-[#c79a3c] font-headline font-bold tracking-widest uppercase text-sm mb-2">{t('home.categories.excursions')}</h2>
              <h3 className="text-4xl font-bold text-on-surface font-headline">{t('home.categories.excursions')}</h3>
            </div>
            <Link to="/excursions" className="hidden md:flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {getCategoryTrips('excursions').map((trip) => (
              <Link key={trip.id} to={`/excursions/${trip.id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img src={trip.images?.[0]} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {trip.is_featured && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#7b5800] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> {trip.category_label || 'Expert Guide'}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col grow">
                  <h4 className="text-2xl font-bold text-on-surface font-headline mb-3 group-hover:text-[#c79a3c] transition-colors">{trip.title}</h4>
                  <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 line-clamp-2">
                    {trip.short_description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-sm font-headline font-bold text-[#1a2b48]">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#c79a3c]" /> {trip.duration}</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#c79a3c]" /> {trip.group_size || 'Private Guide'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/excursions" className="inline-flex items-center gap-2 text-[#7b5800] font-headline font-bold hover:text-[#c79a3c] transition-colors">
              {t('home.explore.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
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
            <h3 className="text-3xl font-bold text-on-surface font-headline mb-4">{t('home.newsletter.title')}</h3>
            <p className="text-on-surface-variant font-body mb-10 max-w-xl mx-auto">
              {t('home.newsletter.subtitle')}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder={t('home.newsletter.placeholder')} 
                className="grow bg-white border border-surface-dim px-6 py-4 rounded-xl font-body text-[#191c18] focus:outline-none focus:ring-2 focus:ring-[#c79a3c] focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="btn-primary-gradient text-white px-8 py-4 rounded-xl font-headline font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 duration-200 whitespace-nowrap"
              >
                {t('home.newsletter.button')}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

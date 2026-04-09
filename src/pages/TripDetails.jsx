import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Clock, 
  Calendar,
  Users, 
  Globe, 
  Star, 
  CheckCircle, 
  Check, 
  Plus, 
  Minus, 
  Send,
  XCircle
} from 'lucide-react';
import { useTrip } from '../hooks/useTrip';
import { MotionReveal } from '../components/MotionReveal';
import { supabase } from '../lib/supabaseClient';


// ── Skeleton loader matching the bento gallery layout ────────────
function TripDetailsSkeleton() {
  return (
    <main className="pt-24 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="h-4 bg-surface-container rounded w-48 mb-8" />
        {/* Title */}
        <div className="mb-12 space-y-3">
          <div className="h-5 bg-surface-container rounded w-32" />
          <div className="h-12 bg-surface-container rounded w-3/4" />
        </div>
        {/* Bento gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[520px] mb-12">
          <div className="col-span-2 row-span-2 bg-surface-container rounded-xl" />
          <div className="bg-surface-container rounded-xl" />
          <div className="bg-surface-container rounded-xl" />
          <div className="bg-surface-container rounded-xl" />
          <div className="bg-surface-container rounded-xl" />
        </div>
        {/* Info bar */}
        <div className="bg-surface-container-low rounded-xl px-8 py-6 mb-16 flex gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container" />
              <div className="space-y-2">
                <div className="h-3 bg-surface-container rounded w-16" />
                <div className="h-4 bg-surface-container rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const TripDetails = () => {
  const { t } = useTranslation();
  const { tripId } = useParams();

  // ── Data from Supabase ──────────────────────────────────────────
  const { trip, loading, error } = useTrip(tripId);
  const [openDay, setOpenDay] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // ── Booking Form State ───────────────────────────────────────────
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    adults: 2,
    children: 0,
    message: ''
  });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, submitting, success, error
  const [bookingError, setBookingError] = useState(null);

  const toggleDay = (day) => setOpenDay(openDay === day ? null : day);

  const images = trip?.images || [];

  // ── Keyboard Navigation ──────────────────────────────────────────
  const nextImage = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [activeImageIndex, images.length]);

  const prevImage = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [activeImageIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setActiveImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, nextImage, prevImage]);

  // ── Loading ─────────────────────────────────────────────────────
  if (loading) return <TripDetailsSkeleton />;

  // ── Error ───────────────────────────────────────────────────────
  if (error) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[40vh] flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-on-surface mb-2">{t('trip_details.error.title')}</h1>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-8">
              {error}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {t('trip_details.error.retry')}
            </button>
            <Link
              to="/"
              className="px-8 py-3 bg-surface-container text-on-surface rounded-xl font-bold text-sm hover:bg-surface-container-high transition-colors text-center"
            >
              {t('common.actions.back_home') || 'Back Home'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl font-black text-primary/20">404</p>
          <h1 className="text-2xl font-bold text-on-surface">{t('trip_details.not_found.title')}</h1>
          <p className="text-on-surface-variant text-sm max-w-sm">
            {t('trip_details.not_found.subtitle')}
          </p>
          <Link
            to="/"
            className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm"
          >
            {t('trip_details.not_found.back_home')}
          </Link>
        </div>
      </main>
    );
  }

  // ── Normalise snake_case DB → display fields ────────────────────
  const duration      = trip.duration        || t('common.contact_us');
  const groupSize     = trip.group_size      || trip.groupSize  || t('common.customizable');
  const language      = trip.language        || t('common.languages_default');
  const categoryLabel = trip.category_label  || trip.categoryLabel || t('common.signature_experience');
  const shortDesc     = trip.short_description || trip.shortDescription || '';
  const ratingLabel   = trip.extra_data?.rating_label || (trip.star_rating ? `${trip.star_rating}/5` : 'New');
  const price         = trip.price_per_person ?? null;
  const itinerary     = trip.itinerary        || [];
  const includes      = trip.includes         || [];
  const excludes      = trip.excludes         || [];

  // ── Price Calculation ───────────────────────────────────────────
  const perPerson = price || 0;
  const adultsTotal = bookingForm.adults * perPerson;
  const childrenTotal = bookingForm.children * (perPerson * 0.7); // 30% discount for children
  const extras = 85; // Fixed fees
  const totalDisplayPrice = perPerson ? (adultsTotal + childrenTotal + extras).toFixed(0) : null;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) {
      setBookingError(t('booking_form.validation.required'));
      return;
    }

    setBookingStatus('submitting');
    setBookingError(null);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          trip_id: trip.id,
          customer_name: bookingForm.name,
          customer_email: bookingForm.email,
          customer_phone: bookingForm.phone,
          travel_date: bookingForm.date,
          adults: bookingForm.adults,
          children: bookingForm.children,
          message: bookingForm.message,
          total_price: totalDisplayPrice ? parseFloat(totalDisplayPrice) : null,
          status: 'pending'
        }]);

      if (error) throw error;
      setBookingStatus('success');
    } catch (err) {
      console.error('Booking Error:', err);
      setBookingError(t('booking_form.error'));
      setBookingStatus('error');
    }
  };

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <MotionReveal animation="fade-in">
          <nav className="flex flex-wrap items-center space-x-2 text-xs font-medium uppercase tracking-widest text-outline mb-8">
            <Link to="/" className="hover:text-primary transition-colors">{t('trip_details.breadcrumb.home')}</Link>
            <ChevronRight size={14} />
            <Link to={`/${trip.category_slug || 'cruises'}`} className="hover:text-primary transition-colors capitalize">
              {trip.category_slug || t('trip_details.breadcrumb.tours')}
            </Link>
            <ChevronRight size={14} />
            <span className="text-secondary">{trip.title}</span>
          </nav>
        </MotionReveal>

        {/* Title Section */}
        <header className="mb-12">
          <MotionReveal animation="fade-in-up">
            <span className="font-['Caveat'] text-2xl text-primary mb-2 block">{categoryLabel}</span>
          </MotionReveal>
          <MotionReveal animation="fade-in-up" delay={200}>
            <h1 className="hero-title font-headline text-4xl md:text-6xl font-extrabold text-secondary max-w-4xl tracking-tight leading-[1.1]">
              {trip.title}
            </h1>
          </MotionReveal>
        </header>

        {/* Gallery Grid */}
        <MotionReveal animation="zoom-in" delay={400}>
          <section className="editorial-grid mb-12">
            {images.length > 0 ? (
              <>
                <div className="md:row-span-2 overflow-hidden rounded-xl bg-surface-container shadow-sm group cursor-zoom-in" onClick={() => setActiveImageIndex(0)}>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 1" src={images[0]} />
                </div>
                <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group cursor-zoom-in" onClick={() => setActiveImageIndex(1)}>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 2" src={images[1] || images[0]} />
                </div>
                <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group cursor-zoom-in" onClick={() => setActiveImageIndex(2)}>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 3" src={images[2] || images[0]} />
                </div>
                <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group cursor-zoom-in" onClick={() => setActiveImageIndex(3)}>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 4" src={images[3] || images[0]} />
                </div>
                <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group relative cursor-zoom-in" onClick={() => setActiveImageIndex(4)}>
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 5" src={images[4] || images[0]} />
                  {images.length > 5 && (
                    <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none transition-colors group-hover:bg-secondary/20">
                      <span className="text-white font-bold text-lg">{t('trip_details.gallery.more_photos', { count: images.length - 4 })}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
               <div className="col-span-full h-64 flex items-center justify-center bg-surface-container rounded-xl text-outline italic">
                 {t('trip_details.gallery.no_images')}
               </div>
            )}
          </section>
        </MotionReveal>

        {/* Image Lightbox Modal */}
        {activeImageIndex !== null && (
          <div 
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Header / Info */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 pointer-events-none">
              <span className="text-white/60 font-bold text-sm tracking-widest uppercase">
                {activeImageIndex + 1} / {images.length}
              </span>
              <button 
                className="text-white/50 hover:text-white transition-all transform hover:rotate-90 p-2 pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md group"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md group"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 cursor-default" onClick={(e) => e.stopPropagation()}>
              <img 
                key={activeImageIndex}
                src={images[activeImageIndex]} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 fade-in duration-500" 
                alt={`Trip gallery view ${activeImageIndex + 1}`} 
              />
            </div>
          </div>
        )}

        {/* Info Bar */}
        <MotionReveal animation="slide-up" delay={600}>
          <section className="bg-surface-container-low rounded-xl px-8 py-6 mb-16 flex flex-wrap gap-8 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Clock size={20} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">{t('trip_details.info.duration')}</p>
                <p className="font-bold text-secondary">{duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Users size={20} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">{t('trip_details.info.group_size')}</p>
                <p className="font-bold text-secondary">{groupSize}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Globe size={20} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">{t('trip_details.info.language')}</p>
                <p className="font-bold text-secondary">{language}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Star size={20} /></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-outline font-bold">{t('trip_details.info.rating')}</p>
                <p className="font-bold text-secondary">{ratingLabel}</p>
              </div>
            </div>
          </section>
        </MotionReveal>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Details */}
          <div className="lg:w-2/3 space-y-16">
            <article>
              <MotionReveal animation="slide-up">
                <h2 className="font-headline text-3xl font-bold text-secondary mb-6">{t('trip_details.sections.about')}</h2>
              </MotionReveal>
              <MotionReveal animation="fade-in" delay={200}>
                <div className="space-y-4 text-on-surface-variant leading-relaxed text-lg font-light">
                  {shortDesc ? (
                    <p>{shortDesc}</p>
                  ) : (
                    <>
                      <p>Découvrez l'Égypte dans son authenticité la plus pure. Ce voyage exclusif commence par l'effervescence du Caire et ses pyramides millénaires avant de vous emmener vers le sud, où le temps semble s'être arrêté.</p>
                      <p>La croisière en felouque, voilier traditionnel du Nil, est une immersion sensorielle. Sans moteur, bercé par le vent, vous accosterez sur des îles inaccessibles aux gros paquebots, dînerez sous les étoiles et rencontrerez les communautés nubiennes au cœur de paysages d'une beauté désarmante.</p>
                    </>
                  )}
                </div>
              </MotionReveal>
            </article>

            {/* Itinerary Accordion — rendered from DB data or static fallback */}
            <section>
              <h2 className="font-headline text-3xl font-bold text-secondary mb-8">{t('trip_details.sections.itinerary')}</h2>
              <div className="space-y-4">
                {itinerary.length > 0 ? (
                  itinerary.map((item, i) => {
                    const dayNum = item.day ?? i + 1;
                    const isOpen = openDay === dayNum;
                    return (
                      <div
                        key={dayNum}
                        className={`rounded-xl overflow-hidden shadow-xl shadow-primary/5 transition-all ${isOpen ? 'bg-white border-2 border-primary/20' : 'bg-surface-container-lowest border border-outline-variant/10'}`}
                      >
                        <div
                          className={`px-6 py-5 flex items-center justify-between cursor-pointer ${isOpen ? 'bg-primary-container/10' : ''}`}
                          onClick={() => toggleDay(dayNum)}
                        >
                          <div className="flex items-center space-x-6">
                            <span className={`font-headline font-black text-4xl ${isOpen ? 'text-primary' : 'text-primary/30'}`}>
                              {String(dayNum).padStart(2, '0')}
                            </span>
                            <div>
                              <h3 className="font-bold text-secondary">{item.title}</h3>
                              <p className={`text-sm font-medium ${isOpen ? 'text-primary italic' : 'text-outline'}`}>
                                {item.subtitle || item.description?.substring(0, 60) + '…' || ''}
                              </p>
                            </div>
                          </div>
                          {isOpen ? <Minus size={20} className="text-primary flex-shrink-0" /> : <Plus size={20} className="text-outline flex-shrink-0" />}
                        </div>
                        {isOpen && item.description && (
                          <MotionReveal animation="fade-in">
                            <div className="px-10 py-6 text-on-surface-variant text-base leading-relaxed border-t border-outline-variant/10">
                              <p>{item.description}</p>
                            </div>
                          </MotionReveal>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group border border-outline-variant/10">
                      <div className="px-6 py-5 flex items-center justify-between cursor-pointer" onClick={() => toggleDay(1)}>
                        <div className="flex items-center space-x-6">
                          <span className="font-headline font-black text-primary/30 text-4xl">01</span>
                          <div>
                            <h3 className="font-bold text-secondary">{t('trip_details.itinerary_static.day1_title')}</h3>
                            <p className="text-sm text-outline">{t('trip_details.itinerary_static.day1_desc')}</p>
                          </div>
                        </div>
                        {openDay === 1 ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-outline" />}
                      </div>
                    </div>

                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group border border-outline-variant/10">
                      <div className="px-6 py-5 flex items-center justify-between cursor-pointer" onClick={() => toggleDay(2)}>
                        <div className="flex items-center space-x-6">
                          <span className="font-headline font-black text-primary/30 text-4xl">02</span>
                          <div>
                            <h3 className="font-bold text-secondary">{t('trip_details.itinerary_static.day2_title')}</h3>
                            <p className="text-sm text-outline">{t('trip_details.itinerary_static.day2_desc')}</p>
                          </div>
                        </div>
                        {openDay === 2 ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-outline" />}
                      </div>
                    </div>

                    <div className={`rounded-xl overflow-hidden shadow-xl shadow-primary/5 transition-all ${openDay === 4 ? 'bg-white border-2 border-primary/20' : 'bg-surface-container-lowest border border-outline-variant/10'}`}>
                      <div className={`px-6 py-5 flex items-center justify-between cursor-pointer ${openDay === 4 ? 'bg-primary-container/10' : ''}`} onClick={() => toggleDay(4)}>
                        <div className="flex items-center space-x-6">
                          <span className={`font-headline font-black text-4xl ${openDay === 4 ? 'text-primary' : 'text-primary/30'}`}>04</span>
                          <div>
                            <h3 className="font-bold text-lg hidden md:block text-secondary">{t('trip_details.itinerary_static.day4_title')}</h3>
                            <h3 className="font-bold text-lg md:hidden text-secondary">{t('trip_details.itinerary_static.day4_mobile')}</h3>
                            <p className={`text-sm font-medium ${openDay === 4 ? 'text-primary italic' : 'text-outline'}`}>
                              {openDay === 4 ? t('trip_details.itinerary_static.day4_subtitle') : t('trip_details.itinerary_static.day4_brief')}
                            </p>
                          </div>
                        </div>
                        {openDay === 4 ? <Minus size={20} className="text-primary shrink-0" /> : <Plus size={20} className="text-outline shrink-0" />}
                      </div>
                      {openDay === 4 && (
                        <div className="px-10 py-6 text-on-surface-variant text-base leading-relaxed border-t border-outline-variant/10">
                          <p className="mb-4">{t('trip_details.itinerary_static.day4_content')}</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2"><div className="w-5 grid place-items-center"><Star size={16} className="text-primary" /></div> <span>{t('trip_details.itinerary_static.day4_feat1')}</span></li>
                            <li className="flex items-center space-x-2"><div className="w-5 grid place-items-center"><Users size={16} className="text-primary" /></div> <span>{t('trip_details.itinerary_static.day4_feat2')}</span></li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="bg-surface-container-low/50 rounded-xl px-6 py-4 text-center mt-4 border border-outline-variant/10">
                      <p className="text-primary font-bold text-sm uppercase tracking-widest">
                        {t('trip_details.sections.itinerary_full_req')}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <MotionReveal animation="slide-up">
                <div className="bg-surface-container-low/40 rounded-2xl p-8 border border-outline-variant/10 h-full">
                  <h3 className="font-headline text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                    <CheckCircle size={24} className="text-primary" />{t('trip_details.sections.includes')}
                  </h3>
                  <ul className="space-y-4">
                    {includes.length > 0 ? includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <Check size={18} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    )) : (
                      <>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><Check size={18} className="text-primary mt-0.5 shrink-0" /><span>Hébergement 5* au Caire et à Louxor</span></li>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><Check size={18} className="text-primary mt-0.5 shrink-0" /><span>3 nuits en felouque traditionnelle (privatisée)</span></li>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><Check size={18} className="text-primary mt-0.5 shrink-0" /><span>Pension complète pendant la navigation</span></li>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><Check size={18} className="text-primary mt-0.5 shrink-0" /><span>Guide égyptologue francophone certifié</span></li>
                      </>
                    )}
                  </ul>
                </div>
              </MotionReveal>
              <MotionReveal animation="slide-up" delay={200}>
                <div className="bg-surface-container-low/40 rounded-2xl p-8 border border-outline-variant/10 h-full">
                  <h3 className="font-headline text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                    <XCircle size={24} className="text-error" />{t('trip_details.sections.excludes')}
                  </h3>
                  <ul className="space-y-4">
                    {excludes.length > 0 ? excludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <X size={18} className="text-error/60 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    )) : (
                      <>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><X size={18} className="text-error/60 mt-0.5 shrink-0" /><span>Vols internationaux</span></li>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><X size={18} className="text-error/60 mt-0.5 shrink-0" /><span>Frais de visa (environ 25€)</span></li>
                        <li className="flex items-start gap-3 text-sm text-on-surface-variant"><X size={18} className="text-error/60 mt-0.5 shrink-0" /><span>Pourboires usuels pour le guide et l'équipage</span></li>
                      </>
                    )}
                  </ul>
                </div>
              </MotionReveal>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <aside className="lg:w-1/3">
            <MotionReveal animation="slide-up" delay={800}>
              <div className="sticky top-28 bg-white rounded-2xl p-8 shadow-2xl shadow-secondary/10 border border-outline-variant/10 overflow-hidden">
                {bookingStatus === 'success' ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-secondary mb-3">{t('booking_form.success.title')}</h3>
                    <p className="text-on-surface-variant text-sm mb-8">
                      {t('booking_form.success.message', { title: trip.title, email: bookingForm.email })}
                    </p>
                    <button 
                      onClick={() => {
                          setBookingStatus('idle');
                          setBookingForm({ ...bookingForm, name: '', email: '', phone: '', message: '' });
                      }}
                      className="text-primary font-bold text-sm underline hover:text-primary-container transition-colors"
                    >
                      {t('booking_form.success.button')}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-baseline mb-8">
                      <div>
                        <span className="text-outline text-xs uppercase tracking-widest font-bold">{t('booking_form.summary.starts_from')}</span>
                        <div className="text-4xl font-black text-secondary">
                          {price != null ? `${price} €` : t('booking_form.summary.on_quote')}
                          <span className="text-sm font-normal text-outline ml-1">{t('booking_form.summary.per_pers_short')}</span>
                        </div>
                      </div>
                      {price && <div className="bg-primary-container/20 text-primary flex items-center px-3 py-1 rounded-full text-xs font-bold">{t('booking_form.summary.early_bird')}</div>}
                    </div>

                    <form className="space-y-5" onSubmit={handleBooking}>
                      {bookingError && (
                        <div className="p-3 bg-error/10 text-error text-xs font-bold rounded-lg border border-error/20">
                          {bookingError}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-outline mb-1.5 ml-1">{t('booking_form.labels.name')}</label>
                          <input 
                            required
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent text-secondary font-medium transition-all" 
                            placeholder={t('booking_form.labels.name_placeholder')}
                            type="text" 
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-outline mb-1.5 ml-1">{t('booking_form.labels.email')}</label>
                          <input 
                            required
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent text-secondary font-medium transition-all" 
                            placeholder={t('booking_form.labels.email_placeholder')}
                            type="email" 
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-outline mb-1.5 ml-1">{t('booking_form.labels.date')}</label>
                        <div className="relative">
                          <input 
                            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent text-secondary font-medium transition-all" 
                            placeholder={t('booking_form.labels.date_placeholder')}
                            type="text" 
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          />
                          <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 pointer-events-none" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-outline mb-1.5 ml-1">{t('booking_form.labels.adults')}</label>
                          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2">
                            <button 
                              type="button"
                              onClick={() => setBookingForm(p => ({...p, adults: Math.max(1, p.adults - 1)}))}
                              className="text-primary hover:bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-secondary">{bookingForm.adults}</span>
                            <button 
                              type="button"
                              onClick={() => setBookingForm(p => ({...p, adults: p.adults + 1}))}
                              className="text-primary hover:bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-outline mb-1.5 ml-1">{t('booking_form.labels.children')}</label>
                          <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2">
                            <button 
                              type="button"
                              onClick={() => setBookingForm(p => ({...p, children: Math.max(0, p.children - 1)}))}
                              className="text-primary hover:bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-secondary">{bookingForm.children}</span>
                            <button 
                              type="button"
                              onClick={() => setBookingForm(p => ({...p, children: p.children + 1}))}
                              className="text-primary hover:bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-surface-container-lowest border border-dashed border-outline-variant p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-outline">{t('booking_form.summary.price_base', { count: bookingForm.adults + bookingForm.children })}</span>
                          <span className="text-secondary font-bold">{price != null ? `${(adultsTotal + childrenTotal).toFixed(0)} €` : '—'}</span>
                        </div>
                        <div className="flex justify-between text-xs text-primary italic">
                          <span className="opacity-70">{t('booking_form.summary.child_discount')}</span>
                          <span>{bookingForm.children > 0 ? `-${(bookingForm.children * perPerson * 0.3).toFixed(0)} €` : '0 €'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-outline">{t('booking_form.summary.fees')}</span>
                          <span className="text-secondary font-bold">{extras} €</span>
                        </div>
                        <div className="pt-4 mt-2 border-t border-outline-variant flex justify-between items-center text-secondary">
                          <span className="font-bold uppercase tracking-widest text-xs">{t('booking_form.summary.total_estimate')}</span>
                          <span className="text-2xl font-black text-primary">
                            {totalDisplayPrice ? `${totalDisplayPrice} €` : t('booking_form.summary.on_quote')}
                          </span>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={bookingStatus === 'submitting'}
                        className="w-full bg-linear-to-br from-primary to-primary-container text-white py-5 rounded-xl font-headline font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                      >
                        {bookingStatus === 'submitting' ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                              <Send size={18} />
                              <span>{t('booking_form.submit')}</span>
                            </>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-outline uppercase tracking-tight flex items-center justify-center gap-2">
                        <CheckCircle size={10} className="text-primary" />
                        {t('booking_form.confirmation_hint')}
                      </p>
                    </form>
                  </>
                )}

                {/* Expert Help */}
                <div className="mt-8 pt-8 border-t border-outline-variant/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/10">
                    <img className="w-full h-full object-cover" alt="expert" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1588&auto=format&fit=crop" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary leading-none mb-1">{t('trip_details.expert.help_title')}</p>
                    <p className="text-xs text-outline mb-1">{t('trip_details.expert.expert_name')}, {t('trip_details.expert.expert_title')}</p>
                    <a className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline" href="#contact">{t('trip_details.expert.contact_link')}</a>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default TripDetails;

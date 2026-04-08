import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight, Clock, Users, Globe, Star, Plus, Minus,
  CheckCircle, Check, XCircle, X, Calendar
} from 'lucide-react';
import { useTrip } from '../hooks/useTrip';

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
  const { tripId } = useParams();

  // ── Data from Supabase ──────────────────────────────────────────
  const { trip, loading, error } = useTrip(tripId || 'felucca');
  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (day) => setOpenDay(openDay === day ? null : day);

  // ── Loading ─────────────────────────────────────────────────────
  if (loading) return <TripDetailsSkeleton />;

  // ── Error ───────────────────────────────────────────────────────
  if (error) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[40vh] flex flex-col items-center justify-center gap-4">
          <p className="text-2xl font-bold text-error">Something went wrong</p>
          <p className="text-on-surface-variant text-sm max-w-md text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ── Not found ───────────────────────────────────────────────────
  if (!trip) {
    return (
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-6xl font-black text-primary/20">404</p>
          <h1 className="text-2xl font-bold text-on-surface">Trip not found</h1>
          <p className="text-on-surface-variant text-sm max-w-sm">
            This trip doesn't exist or may have been removed.
          </p>
          <Link
            to="/"
            className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // ── Normalise snake_case DB → display fields ────────────────────
  const images        = trip.images          || [];
  const duration      = trip.duration        || 'Contact us';
  const groupSize     = trip.group_size      || trip.groupSize  || 'Customizable';
  const language      = trip.language        || 'Français, Anglais';
  const categoryLabel = trip.category_label  || trip.categoryLabel || 'Expérience Signature';
  const shortDesc     = trip.short_description || trip.shortDescription || '';
  const ratingLabel   = trip.extra_data?.rating_label || (trip.star_rating ? `${trip.star_rating}/5` : 'New');
  const price         = trip.price_per_person ?? null;
  const itinerary     = trip.itinerary        || [];
  const includes      = trip.includes         || [];
  const excludes      = trip.excludes         || [];

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center space-x-2 text-xs font-medium uppercase tracking-widest text-outline mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight size={14} />
          <Link to={`/${trip.category_slug || 'cruises'}`} className="hover:text-primary transition-colors capitalize">
            {trip.category_slug || 'Tours'}
          </Link>
          <ChevronRight size={14} />
          <span className="text-secondary">{trip.title}</span>
        </nav>

        {/* Title Section */}
        <header className="mb-12">
          <span className="font-['Caveat'] text-2xl text-primary mb-2 block">{categoryLabel}</span>
          <h1 className="hero-title font-headline text-4xl md:text-6xl font-extrabold text-secondary max-w-4xl tracking-tight leading-[1.1]">
            {trip.title}
          </h1>
        </header>

        {/* Gallery Grid */}
        <section className="editorial-grid mb-12">
          <div className="md:row-span-2 overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 1" src={images[0] || 'https://images.unsplash.com/photo-1542475454-945b4c107eaa?q=80&w=2070&auto=format&fit=crop'} />
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 2" src={images[1] || images[0]} />
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 3" src={images[2] || images[0]} />
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 4" src={images[3] || images[0]} />
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group relative">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="gallery 5" src={images[4] || images[0]} />
            <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold text-lg">+{Math.max(0, images.length - 4)} Photos</span>
            </div>
          </div>
        </section>

        {/* Info Bar */}
        <section className="bg-surface-container-low rounded-xl px-8 py-6 mb-16 flex flex-wrap gap-8 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Clock size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Durée</p>
              <p className="font-bold text-secondary">{duration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Users size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Taille du groupe</p>
              <p className="font-bold text-secondary">{groupSize}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Globe size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Langue</p>
              <p className="font-bold text-secondary">{language}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Star size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Évaluation</p>
              <p className="font-bold text-secondary">{ratingLabel}</p>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Details */}
          <div className="lg:w-2/3 space-y-16">
            <article>
              <h2 className="font-headline text-3xl font-bold text-secondary mb-6">À propos de ce voyage</h2>
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
            </article>

            {/* Itinerary Accordion — rendered from DB data or static fallback */}
            <section>
              <h2 className="font-headline text-3xl font-bold text-secondary mb-8">Itinéraire détaillé</h2>
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
                          <div className="px-10 py-6 text-on-surface-variant text-base leading-relaxed border-t border-outline-variant/10">
                            <p>{item.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  /* Static fallback shown until itinerary is populated via admin */
                  <>
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group border border-outline-variant/10">
                      <div className="px-6 py-5 flex items-center justify-between cursor-pointer" onClick={() => toggleDay(1)}>
                        <div className="flex items-center space-x-6">
                          <span className="font-headline font-black text-primary/30 text-4xl">01</span>
                          <div>
                            <h3 className="font-bold text-secondary">Arrivée au Caire</h3>
                            <p className="text-sm text-outline">Accueil à l'aéroport et transfert à votre hôtel de luxe.</p>
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
                            <h3 className="font-bold text-secondary">Les Pyramides de Gizeh &amp; Saqqarah</h3>
                            <p className="text-sm text-outline">Journée entière dédiée aux origines de la civilisation.</p>
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
                            <h3 className="font-bold text-lg hidden md:block text-secondary">Assouan : Début de la Croisière</h3>
                            <h3 className="font-bold text-lg md:hidden text-secondary">Assouan</h3>
                            <p className={`text-sm font-medium ${openDay === 4 ? 'text-primary italic' : 'text-outline'}`}>
                              {openDay === 4 ? 'Le moment magique' : 'Embarquement et navigation'}
                            </p>
                          </div>
                        </div>
                        {openDay === 4 ? <Minus size={20} className="text-primary flex-shrink-0" /> : <Plus size={20} className="text-outline flex-shrink-0" />}
                      </div>
                      {openDay === 4 && (
                        <div className="px-10 py-6 text-on-surface-variant text-base leading-relaxed border-t border-outline-variant/10">
                          <p className="mb-4">Vol matinal pour Assouan. Visite du temple de Philae, la perle de l'Égypte, posée sur son île. En milieu d'après-midi, embarquement sur votre felouque privée. Première navigation au gré du vent entre les îles de granit.</p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center space-x-2"><div className="w-5 grid place-items-center"><Star size={16} className="text-primary" /></div> <span>Déjeuner et dîner à bord préparés par votre cuisinier nubien.</span></li>
                            <li className="flex items-center space-x-2"><div className="w-5 grid place-items-center"><Users size={16} className="text-primary" /></div> <span>Nuit étoilée sur le pont (matelas confortables fournis).</span></li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="bg-surface-container-low/50 rounded-xl px-6 py-4 text-center mt-4 border border-outline-variant/10">
                      <p className="text-primary font-bold text-sm uppercase tracking-widest">
                        Itinéraire complet disponible sur demande
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low/40 rounded-2xl p-8 border border-outline-variant/10">
                <h3 className="font-headline text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                  <CheckCircle size={24} className="text-primary" />Le prix comprend
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
              <div className="bg-surface-container-low/40 rounded-2xl p-8 border border-outline-variant/10">
                <h3 className="font-headline text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                  <XCircle size={24} className="text-error" />Le prix ne comprend pas
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
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 bg-white rounded-2xl p-8 shadow-2xl shadow-secondary/10 border border-outline-variant/10">
              <div className="flex justify-between items-baseline mb-8">
                <div>
                  <span className="text-outline text-xs uppercase tracking-widest font-bold">À partir de</span>
                  <div className="text-4xl font-black text-secondary">
                    {price != null ? `${price} €` : 'Sur devis'}
                    <span className="text-sm font-normal text-outline ml-1">/ pers</span>
                  </div>
                </div>
                <div className="bg-primary-container/20 text-primary flex items-center px-3 py-1 rounded-full text-xs font-bold">-15% Early Bird</div>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Sélectionnez vos dates</label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary text-secondary placeholder:text-outline/50 font-medium" placeholder="Choisir une période" type="text" readOnly value="12 Oct 2024 - 22 Oct 2024" />
                    <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Adultes</label>
                    <div className="flex items-center justify-between bg-surface-container-low rounded-xl px-4 py-3">
                      <button className="text-primary font-black text-lg w-6 h-6 flex items-center justify-center leading-none" type="button">-</button>
                      <span className="font-bold text-secondary">2</span>
                      <button className="text-primary font-black text-lg w-6 h-6 flex items-center justify-center leading-none" type="button">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Enfants</label>
                    <div className="flex items-center justify-between bg-surface-container-low rounded-xl px-4 py-3">
                      <button className="text-primary font-black text-lg w-6 h-6 flex items-center justify-center leading-none" type="button">-</button>
                      <span className="font-bold text-secondary">0</span>
                      <button className="text-primary font-black text-lg w-6 h-6 flex items-center justify-center leading-none" type="button">+</button>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-dashed border-outline-variant p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Prix par personne</span>
                    <span className="text-secondary font-bold">{price != null ? `${price} €` : '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Suppléments (Visa + Taxes)</span>
                    <span className="text-secondary font-bold">85 €</span>
                  </div>
                  <div className="pt-4 mt-2 border-t border-outline-variant flex justify-between items-center">
                    <span className="font-bold text-secondary">Total</span>
                    <span className="text-2xl font-black text-primary">
                      {price != null ? `${(price * 2 + 85)} €` : 'Sur devis'}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-5 rounded-xl font-headline font-extrabold uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform" type="button">
                  Réserver l'Aventure
                </button>
                <p className="text-center text-[10px] text-outline uppercase tracking-tighter">Aucun paiement requis pour le moment</p>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="expert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPAFcHIIndeT06PfTl20olsZYUaR18R47Xzsa6_98g6JL_11VOue0BcB0i0m77Z9h0moEfcNJyycJxM77I-p6zxuZGhf5SIsfnYOye7KiqX0CfaFVU_kovJCFidHV4zcSaDhH-0mbHUFYeIIz2sg8z7oz33daKHQHx1JSzZojGAagNzccM-TrTFBnuYEHwcYiTB_AZaW7AA7CRdotTGIIi_ttPPHMZo6dsvx7DK0MoF_cfofsJqVxSpM_2pEXWcxy0O4-aDcDd-hSZ" />
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary">Besoin d'aide ?</p>
                  <p className="text-xs text-outline">Karim, votre expert Croisière</p>
                  <a className="text-xs text-primary font-bold underline" href="#contact">Parler à un conseiller</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default TripDetails;

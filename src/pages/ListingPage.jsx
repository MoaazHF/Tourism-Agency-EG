import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategory } from '../hooks/useCategory';
import { ArrowRight, Edit3, Compass, Headset, Leaf, Check, CheckCircle2, Star } from 'lucide-react';

// ── Skeleton card shown while data loads ─────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow animate-pulse">
      <div className="h-64 md:h-80 bg-surface-container" />
      <div className="p-8 md:p-10 space-y-4">
        <div className="h-6 bg-surface-container rounded w-3/4" />
        <div className="h-4 bg-surface-container rounded w-full" />
        <div className="h-4 bg-surface-container rounded w-5/6" />
        <div className="h-4 bg-surface-container rounded w-1/3 mt-6" />
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-surface-container-high">
          <div className="h-8 bg-surface-container rounded w-24" />
          <div className="h-4 bg-surface-container rounded w-28" />
        </div>
      </div>
    </div>
  );
}

export default function ListingPage({ defaultCategory }) {
  const { '*': path } = useParams();
  const categoryId = defaultCategory || path?.split('/')[0] || 'cruises';

  // ── Data from Supabase ──────────────────────────────────────────
  const { category: data, trips, loading, error } = useCategory(categoryId);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  // Per-trip image index for a lightweight local gallery in listing cards
  const [imageIndex, setImageIndex] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  // ── Loading state ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-surface font-body text-on-surface pb-16">
        {/* Hero skeleton */}
        <div className="relative h-[65vh] md:h-[870px] bg-surface-container animate-pulse pt-20" />
        {/* Cards skeleton */}
        <div className="pb-24 px-6 md:px-8 max-w-7xl mx-auto pt-16">
          <div className="grid md:grid-cols-2 gap-10">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────
  if (error) {
    return (
      <div className="pt-24 px-4 min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-error">Something went wrong</p>
        <p className="text-on-surface-variant text-sm max-w-md text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Category not found ──────────────────────────────────────────
  if (!data) {
    return (
      <div className="pt-24 px-4 min-h-[50vh] flex items-center justify-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  // ── Normalise intro_text (DB returns array, legacy JS used camelCase) ──
  const introText = data.intro_text || data.introText || [];
  const introTitle = data.intro_title || data.introTitle || '';
  const heroImage  = data.hero_image  || data.heroImage  || '';
  const heroTag    = data.hero_tag    || data.heroTag    || '';

  return (
    <div className="bg-surface font-body text-on-surface pb-16 scroll-smooth">

      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[870px] flex items-center justify-center overflow-hidden pt-20">
        <img
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-surface" />
        <div className="relative z-10 text-center px-4 max-w-4xl pt-10">
          <span className="font-headline text-on-primary-fixed bg-primary-fixed/30 backdrop-blur-md px-4 py-1 rounded-full text-sm font-semibold tracking-widest uppercase mb-6 inline-block">
            {heroTag}
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-surface tracking-tighter leading-tight mb-6 font-headline">
            {data.title}
          </h1>
          <p className="text-lg md:text-2xl text-surface/90 font-medium tracking-wide">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Content Intro */}
      <section className="py-16 md:py-24 px-6 md:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold font-headline text-primary leading-tight">
              {introTitle}
            </h2>
            <div className="w-16 h-1 bg-primary-container mt-6" />
          </div>
          <div className="md:col-span-3 space-y-6 text-tertiary leading-relaxed">
            {introText.map((paragraph, index) => {
              if (!isDescriptionExpanded && index > 0) return null;
              return (
                <p
                  key={index}
                  className={index === 0 ? 'text-lg' : ''}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              );
            })}
            {introText.length > 1 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-secondary font-bold hover:text-secondary-fixed transition-colors mt-2 inline-flex items-center gap-1"
              >
                {isDescriptionExpanded ? 'Voir Moins' : 'Voir Plus'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-24 px-6 md:px-8 max-w-7xl mx-auto">
        {trips.length === 0 ? (
          <p className="text-center text-on-surface-variant py-16">
            No trips found in this category yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {trips.map((trip) => {
              const currentIndex = imageIndex[trip.id] ?? 0;
              const images = trip.images || [];
              const mainSrc = images[currentIndex] ?? images[0] ?? 'https://via.placeholder.com/800x600?text=No+Image';

              // Normalise snake_case DB fields → camelCase display
              const duration      = trip.duration       || '';
              const shortDesc     = trip.short_description || trip.shortDescription || '';
              const categoryLabel = trip.category_label   || trip.categoryLabel || '';
              const groupSize     = trip.group_size       || trip.groupSize || '';
              const starRating    = trip.star_rating      ?? trip.rating ?? null;
              const ratingLabel   = trip.extra_data?.rating_label || trip.rating || null;
              const price         = trip.price_per_person ?? null;

              return (
                <Link
                  id={trip.id}
                  to={`/${categoryId}/${trip.id}`}
                  key={trip.id}
                  className="group bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform hover:-translate-y-2 duration-500 block scroll-mt-32"
                >
                  <div className="h-64 md:h-80 overflow-hidden relative">
                    <img
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={mainSrc}
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image'; }}
                    />
                    <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      {duration}
                    </div>
                  </div>

                  {/* Thumbnail strip (only when multiple images) */}
                  {images.length > 1 && (
                    <div className="px-3 py-2 flex items-center gap-2 overflow-x-auto bg-surface-container-lowest">
                      {images.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`${trip.title} image ${idx + 1}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setImageIndex((prev) => ({ ...prev, [trip.id]: idx }));
                          }}
                          className={`w-8 h-8 object-cover rounded border ${currentIndex === idx ? 'border-primary' : 'border-transparent'}`}
                          style={{ cursor: 'pointer' }}
                          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="p-8 md:p-10">
                    <h3 className="text-2xl font-bold font-headline mb-3 text-on-surface line-clamp-2">
                      {trip.title}
                    </h3>
                    <p className="text-tertiary mb-6 line-clamp-3">
                      {shortDesc}
                    </p>
                    <div className="text-tertiary text-sm mb-4 flex items-center gap-2">
                      <span className="font-semibold text-secondary">{categoryLabel}</span>
                      <span>•</span>
                      <span>{groupSize}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-6 text-on-surface">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="text-sm font-bold">
                        {ratingLabel || (starRating ? `${starRating}/5` : '—')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-6 border-t border-surface-container-high pt-6">
                      <div>
                        <p className="text-xs text-secondary-fixed-dim uppercase tracking-wider mb-1">Starts from</p>
                        <p className="font-bold text-xl text-primary">
                          {price != null ? `${price} €` : 'Sur devis'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                        Voir Le Voyage <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-on-surface mb-4">Pourquoi voyager avec Route d'Égypte ?</h2>
            <p className="text-tertiary max-w-2xl mx-auto">Une expertise forgée au cœur du Nil pour des voyages qui vous ressemblent.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl border-b-4 border-primary/20 hover:-translate-y-1 transition-transform">
              <Edit3 className="text-primary-container w-10 h-10 mb-6" />
              <h4 className="text-xl font-bold font-headline mb-4">100% Sur-mesure</h4>
              <ul className="space-y-3 text-sm text-tertiary">
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Itinéraires flexibles</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Rythme personnalisé</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Choix de l'hôtellerie</li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border-b-4 border-primary/20 hover:-translate-y-1 transition-transform">
              <Compass className="text-primary-container w-10 h-10 mb-6" />
              <h4 className="text-xl font-bold font-headline mb-4">Expertise locale</h4>
              <ul className="space-y-3 text-sm text-tertiary">
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Guides francophones</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Accès privilégiés</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Savoir-faire ancestral</li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border-b-4 border-primary/20 hover:-translate-y-1 transition-transform">
              <Headset className="text-primary-container w-10 h-10 mb-6" />
              <h4 className="text-xl font-bold font-headline mb-4">Assistance 24/7</h4>
              <ul className="space-y-3 text-sm text-tertiary">
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Conciergerie dédiée</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Réactivité immédiate</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Tranquillité d'esprit</li>
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border-b-4 border-primary/20 hover:-translate-y-1 transition-transform">
              <Leaf className="text-primary-container w-10 h-10 mb-6" />
              <h4 className="text-xl font-bold font-headline mb-4">Engagement durable</h4>
              <ul className="space-y-3 text-sm text-tertiary">
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Soutien aux locaux</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Préservation des sites</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-4 h-4 shrink-0" /> Tourisme responsable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-6xl mx-auto bg-secondary rounded-3xl p-8 md:p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 flex-1 w-full">
            <h2 className="text-3xl lg:text-5xl font-bold font-headline text-surface mb-8 leading-tight">Prêt à planifier votre voyage de rêve ?</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 text-surface-container"><CheckCircle2 className="text-primary-container w-5 h-5 shrink-0" /><span>Devis gratuit en 24h</span></div>
              <div className="flex items-center gap-3 text-surface-container"><CheckCircle2 className="text-primary-container w-5 h-5 shrink-0" /><span>Modification flexible</span></div>
              <div className="flex items-center gap-3 text-surface-container"><CheckCircle2 className="text-primary-container w-5 h-5 shrink-0" /><span>Paiement sécurisé</span></div>
              <div className="flex items-center gap-3 text-surface-container"><CheckCircle2 className="text-primary-container w-5 h-5 shrink-0" /><span>Garantie Voyageur</span></div>
            </div>
            <button className="bg-linear-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto">
              Planifier maintenant
            </button>
          </div>
          <div className="relative z-10 lg:w-1/3 w-full">
            <div className="bg-surface/10 backdrop-blur-md p-8 rounded-2xl border border-surface/20">
              <p className="font-headline text-2xl text-primary-container mb-6 italic">"Le Nil ne se raconte pas, il se vit."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center font-bold text-surface">AM</div>
                <div>
                  <p className="text-surface font-bold">Ahmed M.</p>
                  <p className="text-surface/60 text-xs uppercase tracking-wider">Expert Croisières</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Clock, Users, Globe, Star, Plus, Minus, 
  CheckCircle, Check, XCircle, X, Calendar 
} from 'lucide-react';

const TripDetails = ({ title }) => {
  const [openDay, setOpenDay] = useState(4);

  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center space-x-2 text-xs font-medium uppercase tracking-widest text-outline mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight size={14} />
          <span className="hover:text-primary transition-colors cursor-pointer">Tours</span>
          <ChevronRight size={14} />
          <span className="text-secondary">{title || 'Croisière en Felouque'}</span>
        </nav>

        {/* Title Section */}
        <header className="mb-12">
          <span className="font-['Caveat'] text-2xl text-primary mb-2 block">Expérience Signature</span>
          <h1 className="hero-title font-headline text-4xl md:text-6xl font-extrabold text-secondary max-w-4xl tracking-tight leading-[1.1]">
            {title || 'Au départ du Caire visites et croisière d’Assouan à Louxor en felouque'}
          </h1>
        </header>

        {/* Gallery Grid */}
        <section className="editorial-grid mb-12">
          <div className="md:row-span-2 overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="felucca" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Ts9_GbJSd5Jrk9HlA-ChzKIqNKKNra9H2-IX7L2_ommiGQjGHUmJLYFVgC2ZOjQiCh4H8QTi7LuQ6DPW5AisNHN8CqUgj53SybLLrCUeIw_m5SFiuZlhM5rAvDHwuJgoQOi3oJ1k4as-diLNdAu0y0BVIPyTa381i71IjW6oB6oFboN2l1sJVGjlK4eDItKuHMwO1HooBU9x_qEo5ghhmBeduNzgS46DiyHIUHaV-0rAkKr85xqoDKi_gZo19PeoKjQONzKMNvgi"/>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="temple" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWlSUnfNrfBuV6gl0v1oUYBgNcRL3cLHfbV_eInws9lAQTmYdrVzwsIJSk2oIHKDKA_Aigobj46ALITVfpTyYc0cgIkscL4Fyk6wWoxUTPoRK3xDR1AxjicLiycClpgO7_1WbyB6XWOphYti2XtlpT-v9bgVdl-Kcjh9NhJqUfXj4bQ8gEAhHJf008oPe-95L063KX77sYtqHU4GTlCPTgeVMF25CIXENJP0qWJV_InN6GNSnWQ03DvmUsqkdnuxQiHYZsZJairSJ0"/>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="pyramids" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtp6dKFE_dLV_6Iel1h4AFUQsxgwlljXJ5B2QYh89cUFwerlTX-_Kqqf5pL3jczlakWWVbttqnsnln-3oMDllzkpYcEJYBE_a28VBWyCBRLcO9A-6ITOFr26t8JnEarf_C32G1NIUTPf5WoaBLeFyF3wNpYfQs1lOtaoIkdDHVRJYt4Nn6pCmAu_PQHXzKH6TEFCgGI9kQW65kAJ0rUlvb_Vv6ffjIRdfPjYWTcgnU_JZM-ZB5ASyTFFdPwbTLzNNMTHfDfiZaXsCr"/>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcMgIFj2GmZE5NIIyGR9X52VqYwS-DFQPybb6Y10ZUJLLTPByZ9Vjw0bwyWigy9ebm0F2rdZt7xYfyGrCHLp88Q1VBtTDfAZ2iixWxj0iPR74Z8E_dEfIml4fRRu_xpybv4sRMHgBH7takWaSGIDrIJXJf5y70LrmQxIt18jWOGfSUl8gONZu31ooQJyxdb6qE4qVqQiWi1HFyGajE6I-io04zpTEFlOysqvqw7QpXIk-ML3Y2Y9wnWoh4aFOraw-0p-Hw7IumtS-U"/>
          </div>
          <div className="overflow-hidden rounded-xl bg-surface-container shadow-sm group relative">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="market" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW0BzdOwc4pPtpoGr6pdw0UALcYlxtv3wUK3aiI4QzdxXzkz4_8XGBckUZIg1gqvKlAcSE1GEy1tP2MtShMscBsUI0-OfBHhw-GsJKpWB5QNjEg_3L2qNRBJGSejrg7reTt-UhL9U2fvP0Yc_anBpB01Zl3MZD9Mbjty2E_R4wdfdRhhlV1QK1XCLrMX0UQ1sAocSpY4VESvzmkdpNwZTWfsBUDEdk9sCwoBEzjtCTUjvgJc5QeESG4fyaxFptL7ynPknDTiXr4f4B"/>
            <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold text-lg">+12 Photos</span>
            </div>
          </div>
        </section>

        {/* Info Bar */}
        <section className="bg-surface-container-low rounded-xl px-8 py-6 mb-16 flex flex-wrap gap-8 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Clock size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Durée</p>
              <p className="font-bold text-secondary">10 Jours / 9 Nuits</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Users size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Taille du groupe</p>
              <p className="font-bold text-secondary">Max 12 Personnes</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Globe size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Langue</p>
              <p className="font-bold text-secondary">Français, Anglais</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Star size={20} /></div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Évaluation</p>
              <p className="font-bold text-secondary">4.9/5 (128 avis)</p>
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
                <p>Découvrez l'Égypte dans son authenticité la plus pure. Ce voyage exclusif commence par l'effervescence du Caire et ses pyramides millénaires avant de vous emmener vers le sud, où le temps semble s'être arrêté.</p>
                <p>La croisière en felouque, voilier traditionnel du Nil, est une immersion sensorielle. Sans moteur, bercé par le vent, vous accosterez sur des îles inaccessibles aux gros paquebots, dînerez sous les étoiles et rencontrerez les communautés nubiennes au cœur de paysages d'une beauté désarmante.</p>
              </div>
            </article>

            {/* Itinerary Accordion */}
            <section>
              <h2 className="font-headline text-3xl font-bold text-secondary mb-8">Itinéraire détaillé</h2>
              <div className="space-y-4">
                {/* Day 1 */}
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

                {/* Day 2-3 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden group border border-outline-variant/10">
                  <div className="px-6 py-5 flex items-center justify-between cursor-pointer" onClick={() => toggleDay(2)}>
                    <div className="flex items-center space-x-6">
                      <span className="font-headline font-black text-primary/30 text-4xl">02</span>
                      <div>
                        <h3 className="font-bold text-secondary">Les Pyramides de Gizeh & Saqqarah</h3>
                        <p className="text-sm text-outline">Journée entière dédiée aux origines de la civilisation.</p>
                      </div>
                    </div>
                    {openDay === 2 ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-outline" />}
                  </div>
                </div>

                {/* Day 4 (Active Example) */}
                <div className={`rounded-xl overflow-hidden shadow-xl shadow-primary/5 transition-all ${openDay === 4 ? 'bg-white border-2 border-primary/20' : 'bg-surface-container-lowest border border-outline-variant/10'}`}>
                  <div className={`px-6 py-5 flex items-center justify-between cursor-pointer ${openDay === 4 ? 'bg-primary-container/10' : ''}`} onClick={() => toggleDay(4)}>
                    <div className="flex items-center space-x-6">
                      <span className={`font-headline font-black text-4xl ${openDay === 4 ? 'text-primary' : 'text-primary/30'}`}>04</span>
                      <div>
                        <h3 className={`font-bold text-lg hidden md:block ${openDay === 4 ? 'text-secondary' : 'text-secondary'}`}>Assouan : Début de la Croisière</h3>
                        <h3 className={`font-bold text-lg md:hidden ${openDay === 4 ? 'text-secondary' : 'text-secondary'}`}>Assouan</h3>
                        <p className={`text-sm font-medium ${openDay === 4 ? 'text-primary italic' : 'text-outline'}`}>{openDay === 4 ? 'Le moment magique' : 'Embarquement et navigation'}</p>
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
                  <button className="text-primary font-bold text-sm uppercase tracking-widest hover:underline">Voir les 6 jours restants</button>
                </div>
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface-container-low/40 rounded-2xl p-8 border border-outline-variant/10">
                <h3 className="font-headline text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                  <CheckCircle size={24} className="text-primary" />
                  Le prix comprend
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>Hébergement 5* au Caire et à Louxor</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>3 nuits en felouque traditionnelle (privatisée)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>Pension complète pendant la navigation</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>Guide égyptologue francophone certifié</span>
                  </li>
                </ul>
              </div>
              <div className="bg-surface-container-low/40 rounded-2xl p-8 border border-outline-variant/10">
                <h3 className="font-headline text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                  <XCircle size={24} className="text-error" />
                  Le prix ne comprend pas
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <X size={18} className="text-error/60 mt-0.5 shrink-0" />
                    <span>Vols internationaux</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <X size={18} className="text-error/60 mt-0.5 shrink-0" />
                    <span>Frais de visa (environ 25€)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <X size={18} className="text-error/60 mt-0.5 shrink-0" />
                    <span>Pourboires usuels pour le guide et l'équipage</span>
                  </li>
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
                  <div className="text-4xl font-black text-secondary">2 450 €<span className="text-sm font-normal text-outline ml-1">/ pers</span></div>
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
                    <span className="text-secondary font-bold">2 450 €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-outline">Suppléments (Visa + Taxes)</span>
                    <span className="text-secondary font-bold">85 €</span>
                  </div>
                  <div className="pt-4 mt-2 border-t border-outline-variant flex justify-between items-center">
                    <span className="font-bold text-secondary">Total</span>
                    <span className="text-2xl font-black text-primary">5 070 €</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-5 rounded-xl font-headline font-extrabold uppercase tracking-[0.2em] shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform" type="button">
                  Réserver l'Aventure
                </button>
                <p className="text-center text-[10px] text-outline uppercase tracking-tighter">Aucun paiement requis pour le moment</p>
              </form>

              <div className="mt-8 pt-8 border-t border-outline-variant/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="expert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPAFcHIIndeT06PfTl20olsZYUaR18R47Xzsa6_98g6JL_11VOue0BcB0i0m77Z9h0moEfcNJyycJxM77I-p6zxuZGhf5SIsfnYOye7KiqX0CfaFVU_kovJCFidHV4zcSaDhH-0mbHUFYeIIz2sg8z7oz33daKHQHx1JSzZojGAagNzccM-TrTFBnuYEHwcYiTB_AZaW7AA7CRdotTGIIi_ttPPHMZo6dsvx7DK0MoF_cfofsJqVxSpM_2pEXWcxy0O4-aDcDd-hSZ"/>
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

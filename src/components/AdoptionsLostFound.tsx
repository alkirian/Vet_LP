import React, { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, Heart, Search, MessageSquare, Filter, AlertTriangle, Info, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { petsData } from "../data";
import { LostOrAdoptablePet } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { PawIcon, FloatingPaws } from "./Logo";
import { getWhatsAppLink } from "../utils/whatsapp";

export default function AdoptionsLostFound() {
  const [activeTab, setActiveTab] = useState<"adoptions" | "lost-found">("adoptions");
  const [selectedSpecies, setSelectedSpecies] = useState<"all" | "dog" | "cat">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected pet for detail modal
  const [selectedPet, setSelectedPet] = useState<LostOrAdoptablePet | null>(null);

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filters within Lost/Found tab
  const [lostFoundFilter, setLostFoundFilter] = useState<"all" | "lost" | "found">("all");

  const handleTabChange = (tab: "adoptions" | "lost-found") => {
    setActiveTab(tab);
    setSearchQuery("");
    setSelectedSpecies("all");
    setLostFoundFilter("all");
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  };

  // Filter logic
  const filteredPets = petsData.filter((pet) => {
    // 1. Tab filter
    if (activeTab === "adoptions" && pet.status !== "adoptable") return false;
    if (activeTab === "lost-found" && pet.status === "adoptable") return false;

    // 2. Status sub-filter for lost-found tab
    if (activeTab === "lost-found" && lostFoundFilter !== "all" && pet.status !== lostFoundFilter) return false;

    // 3. Species filter
    if (selectedSpecies !== "all" && pet.type !== selectedSpecies) return false;

    // 4. Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchesName = pet.name.toLowerCase().includes(query);
      const matchesStory = pet.story.toLowerCase().includes(query);
      const matchesLocation = pet.location?.toLowerCase().includes(query) || false;
      return matchesName || matchesStory || matchesLocation;
    }

    return true;
  });

  // Carousel scroll handler to show/hide navigation arrows dynamically
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active index on mobile (each card is full width: clientWidth + gap)
    if (clientWidth > 0) {
      const gap = 20; // gap-5 is 20px
      const index = Math.round(scrollLeft / (clientWidth + gap));
      if (index >= 0 && index < filteredPets.length) {
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", handleCarouselScroll);
      // Trigger initial calculation
      handleCarouselScroll();
    }
    return () => el?.removeEventListener("scroll", handleCarouselScroll);
  }, [filteredPets]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedPet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPet]);

  return (
    <section id="adopciones" className="py-20 bg-brand-bg-warm relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-primary-light rounded-full blur-3xl -z-10 opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl -z-10 opacity-40 pointer-events-none" />
      <FloatingPaws className="text-brand-primary/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Demo Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-4 bg-brand-accent/10 border border-brand-accent/30 rounded-2xl flex items-start gap-3 shadow-sm" id="demo-banner">
          <AlertTriangle className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
          <div className="font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
            <span className="font-extrabold text-brand-secondary">Sección en Demostración:</span> Los perritos y gatitos listados a continuación son ejemplos de prueba simulados para demostrar la visualización de la cartelera comunitaria de adopciones y extravíos.
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in" id="adoptions-header">
          <span className="text-brand-secondary font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-2">
            Espacio de Comunidad
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight mb-4">
            Huellas de Las Piedras
          </h2>
          <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
            En la veterinaria nos importa cada vida. Aquí compartimos los reportes de animales extraviados y los rescatados que buscan un hogar responsable en nuestra zona.
          </p>
        </div>

        {/* Tabs Control */}
        <div className="flex justify-center mb-10" id="adoptions-tabs">
          <div className="bg-white p-1.5 rounded-2xl shadow-md border border-brand-primary-light/60 flex gap-2">
            <button
              onClick={() => handleTabChange("adoptions")}
              className={`px-4 sm:px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "adoptions"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-brand-text-muted hover:text-brand-primary"
              }`}
            >
              🐶 Buscando Hogar (Adopciones)
            </button>
            <button
              onClick={() => handleTabChange("lost-found")}
              className={`px-4 sm:px-5 py-3 rounded-xl font-display font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                activeTab === "lost-found"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-brand-text-muted hover:text-brand-primary"
              }`}
            >
              🔍 Mascotas Extraviadas
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-6 rounded-3xl border border-brand-primary-light/50 shadow-lg max-w-5xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4" id="adoptions-filters-bar">
          
          {/* Species filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" /> Filtrar por:
            </span>
            <button
              onClick={() => setSelectedSpecies("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                selectedSpecies === "all"
                  ? "bg-brand-primary-light text-brand-primary border-brand-primary/20"
                  : "bg-transparent text-brand-text-muted border-brand-primary-light hover:border-brand-primary/20"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedSpecies("dog")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                selectedSpecies === "dog"
                  ? "bg-brand-primary-light text-brand-primary border-brand-primary/20"
                  : "bg-transparent text-brand-text-muted border-brand-primary-light hover:border-brand-primary/20"
              }`}
            >
              Perros
            </button>
            <button
              onClick={() => setSelectedSpecies("cat")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                selectedSpecies === "cat"
                  ? "bg-brand-primary-light text-brand-primary border-brand-primary/20"
                  : "bg-transparent text-brand-text-muted border-brand-primary-light hover:border-brand-primary/20"
              }`}
            >
              Gatos
            </button>

            {/* Sub-status filter inside Lost/Found tab */}
            {activeTab === "lost-found" && (
              <div className="flex gap-2 pl-2 border-l border-brand-primary-light/80 ml-2">
                <button
                  onClick={() => setLostFoundFilter("all")}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                    lostFoundFilter === "all" ? "bg-brand-primary text-white" : "bg-brand-primary-light text-brand-text-muted"
                  }`}
                >
                  Ver Todos
                </button>
                <button
                  onClick={() => setLostFoundFilter("lost")}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                    lostFoundFilter === "lost" ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  Perdidos
                </button>
                <button
                  onClick={() => setLostFoundFilter("found")}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                    lostFoundFilter === "found" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  Encontrados
                </button>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative flex-grow md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-text-muted">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre o zona..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-bg-warm border border-brand-primary-light rounded-xl font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary text-brand-text transition-all"
            />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto px-4 md:px-0" id="adoptions-carousel-wrapper">
          {/* Left Arrow Button (Desktop only) */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scrollCarousel("left")}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-brand-primary-light text-brand-primary rounded-full shadow-lg border border-brand-primary-light flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all hidden md:flex"
                title="Desplazar a la izquierda"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right Arrow Button (Desktop only) */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scrollCarousel("right")}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-brand-primary-light text-brand-primary rounded-full shadow-lg border border-brand-primary-light flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all hidden md:flex"
                title="Desplazar a la derecha"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-5 snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth w-full"
            id="adoptions-carousel-track"
          >
            {filteredPets.map((pet) => (
              <motion.div
                key={pet.id}
                layout
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setSelectedPet(pet)}
                className="w-full md:w-[310px] shrink-0 snap-center bg-white rounded-3xl border border-brand-primary-light/50 overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Pet Photo and Badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-primary-light/35 shrink-0">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    {pet.status === "adoptable" && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-accent text-brand-text shadow-sm border border-brand-accent/20">
                        Buscando Hogar
                      </span>
                    )}
                    {pet.status === "lost" && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-sm">
                        Perdido
                      </span>
                    )}
                    {pet.status === "found" && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
                        Encontrado
                      </span>
                    )}
                  </div>

                  {/* Gender badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wide bg-black/60 text-white backdrop-blur-xs">
                      {pet.gender}
                    </span>
                  </div>
                </div>

                {/* Content summary */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display font-extrabold text-lg text-brand-text tracking-tight truncate">
                        {pet.name.replace(" (Prueba)", "")}
                      </h3>
                      {pet.age && pet.status === "adoptable" && (
                        <span className="text-[10px] font-bold text-brand-text-muted bg-brand-primary-light px-2.5 py-0.5 rounded-md">
                          {pet.age}
                        </span>
                      )}
                    </div>

                    {/* Location/Date for lost/found */}
                    {(pet.status === "lost" || pet.status === "found") && (
                      <div className="space-y-1 text-xs text-brand-text-muted font-sans truncate">
                        {pet.location && (
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                            <span className="truncate">{pet.location.split(",")[0]}</span>
                          </div>
                        )}
                        {pet.date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                            <span>Visto el: {pet.date}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {pet.status === "adoptable" && pet.size && (
                      <p className="text-xs text-brand-text-muted font-sans">
                        Tamaño: <span className="text-brand-primary font-bold capitalize">{pet.size}</span>
                      </p>
                    )}

                    {/* Prompt message */}
                    <p className="text-[11px] font-bold text-brand-primary hover:text-brand-secondary tracking-wide mt-2 block transition-colors">
                      + Ver historia y detalles de salud
                    </p>
                  </div>

                  {/* Compact action footer */}
                  <div className="pt-4 border-t border-brand-primary-light/50 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-brand-text-muted font-sans italic">Ejemplo de prueba</span>
                    <span className="bg-brand-primary text-white font-sans font-bold text-[10px] px-3.5 py-1.5 rounded-lg shadow-sm hover:bg-brand-primary/95">
                      Ver Ficha
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Empty State inside track */}
            {filteredPets.length === 0 && (
              <div className="w-full bg-white p-12 rounded-3xl border border-brand-primary-light text-center" id="empty-state-pets">
                <div className="w-12 h-12 bg-brand-primary-light text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-brand-text text-lg mb-2">No se encontraron resultados</h3>
                <p className="font-sans text-brand-text-muted text-sm max-w-md mx-auto">
                  Prueba cambiando los filtros o ajustando tu búsqueda para encontrar lo que buscas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Controls for Mobile (Dots and subtle chevrons) */}
        {filteredPets.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-6 md:hidden" id="adoptions-mobile-controls">
            <button
              onClick={() => {
                if (!carouselRef.current) return;
                const { clientWidth } = carouselRef.current;
                carouselRef.current.scrollBy({ left: -(clientWidth + 20), behavior: "smooth" });
              }}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full bg-white hover:bg-brand-primary-light text-brand-primary flex items-center justify-center border border-brand-primary-light transition-all disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Anterior mascota"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex gap-1" id="adoptions-mobile-dots">
              {filteredPets.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!carouselRef.current) return;
                    const { clientWidth } = carouselRef.current;
                    carouselRef.current.scrollTo({
                      left: idx * (clientWidth + 20),
                      behavior: "smooth",
                    });
                    setActiveIndex(idx);
                  }}
                  className="w-6 h-6 flex items-center justify-center cursor-pointer"
                  aria-label={`Ir a la mascota ${idx + 1}`}
                >
                  <span
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "bg-brand-primary w-6" : "bg-brand-primary-light w-2.5 hover:bg-brand-primary-light/80"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (!carouselRef.current) return;
                const { clientWidth } = carouselRef.current;
                carouselRef.current.scrollBy({ left: clientWidth + 20, behavior: "smooth" });
              }}
              disabled={activeIndex === filteredPets.length - 1}
              className="w-10 h-10 rounded-full bg-white hover:bg-brand-primary-light text-brand-primary flex items-center justify-center border border-brand-primary-light transition-all disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Siguiente mascota"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* CTA Callout Banner (Report or Collaborate) */}
        <div className="max-w-5xl mx-auto mt-16 grid grid-cols-2 gap-3 md:gap-6" id="community-action-banners">
          {/* Card 1: Report lost/found */}
          <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-brand-primary-light/60 shadow-md md:shadow-lg flex flex-col justify-between items-center md:items-start text-center md:text-left h-full">
            <div className="space-y-2 md:space-y-3 mb-4 flex flex-col items-center md:items-start">
              <div className="bg-rose-50 text-rose-600 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="font-display font-extrabold text-xs md:text-lg text-brand-text leading-tight">
                ¿Perdiste o encontraste?
              </h3>
              <p className="hidden md:block font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                Si sos vecino de Las Piedras y perdiste a tu compañero, o encontraste una mascota sola en la calle, comunicate con nosotros para publicarlo en esta cartelera.
              </p>
              <p className="block md:hidden font-sans text-[10px] text-brand-text-muted leading-tight">
                Reportá mascotas extraviadas en Las Piedras.
              </p>
            </div>
            <a
              href={getWhatsAppLink("Hola! Me comunico para reportar una mascota perdida/encontrada en Las Piedras. (Ficha de Prueba)")}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 md:py-3 px-3 md:px-5 rounded-lg md:rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-sans font-bold text-[9px] md:text-xs shadow-sm md:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Reportar
            </a>
          </div>

          {/* Card 2: Transit/Collaborate */}
          <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-brand-primary-light/60 shadow-md md:shadow-lg flex flex-col justify-between items-center md:items-start text-center md:text-left h-full">
            <div className="space-y-2 md:space-y-3 mb-4 flex flex-col items-center md:items-start">
              <div className="bg-brand-primary-light text-brand-primary w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-brand-primary fill-brand-primary" />
              </div>
              <h3 className="font-display font-extrabold text-xs md:text-lg text-brand-text leading-tight">
                ¿Querés colaborar?
              </h3>
              <p className="hidden md:block font-sans text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                Si no podés adoptar definitivamente pero querés ayudar brindando hogar de tránsito temporal, o colaborando con alimento y medicamentos, escribinos.
              </p>
              <p className="block md:hidden font-sans text-[10px] text-brand-text-muted leading-tight">
                Ayudá como hogar de tránsito o con donaciones.
              </p>
            </div>
            <a
              href={getWhatsAppLink("Hola! Me gustaría colaborar con los perros rescatados de la veterinaria (tránsito/donaciones). (Ficha de Prueba)")}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 md:py-3 px-3 md:px-5 rounded-lg md:rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-sans font-bold text-[9px] md:text-xs shadow-sm md:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Colaborar
            </a>
          </div>
        </div>

      </div>

      {/* Pet Detail Modal */}
      <AnimatePresence>
        {selectedPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="pet-detail-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPet(null)}
              className="fixed inset-0 bg-brand-text/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-organic-1 max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-brand-primary-light max-h-[90vh] md:max-h-[500px]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPet(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-brand-text p-2 rounded-full shadow-md z-20 transition-all border border-brand-primary-light/50 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column: Image */}
              <div className="relative w-full md:w-1/2 h-48 md:h-full bg-brand-primary-light/30">
                <img
                  src={selectedPet.image}
                  alt={selectedPet.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Overlay Badge */}
                <div className="absolute top-4 left-4 z-10">
                  {selectedPet.status === "adoptable" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-accent text-brand-text border border-brand-accent/20 shadow-sm">
                      Buscando Hogar
                    </span>
                  )}
                  {selectedPet.status === "lost" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-sm">
                      Perdido
                    </span>
                  )}
                  {selectedPet.status === "found" && (
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
                      Encontrado
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Info */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow md:w-1/2 overflow-y-auto no-scrollbar">
                <div className="space-y-4">
                  {/* Title & Basic Specs */}
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-brand-text leading-none">
                      {selectedPet.name.replace(" (Prueba)", "")}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2 font-sans text-xs text-brand-text-muted font-semibold">
                      <span className="bg-brand-primary-light text-brand-primary px-2.5 py-1 rounded-lg capitalize">
                        {selectedPet.gender}
                      </span>
                      {selectedPet.age && (
                        <span className="bg-brand-primary-light text-brand-primary px-2.5 py-1 rounded-lg">
                          Edad: {selectedPet.age}
                        </span>
                      )}
                      {selectedPet.size && selectedPet.status === "adoptable" && (
                        <span className="bg-brand-primary-light text-brand-primary px-2.5 py-1 rounded-lg capitalize">
                          Tamaño: {selectedPet.size}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location & Date (Lost/Found only) */}
                  {(selectedPet.status === "lost" || selectedPet.status === "found") && (
                    <div className="space-y-1.5 p-3.5 bg-brand-bg-warm border border-brand-primary-light/40 rounded-2xl font-sans text-xs text-brand-text-muted">
                      {selectedPet.location && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                          <span><strong>Visto en:</strong> {selectedPet.location}</span>
                        </div>
                      )}
                      {selectedPet.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-secondary shrink-0" />
                          <span><strong>Fecha de reporte:</strong> {selectedPet.date}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Story / Description */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brand-text uppercase tracking-widest block border-b border-brand-primary-light/50 pb-1">
                      Historia
                    </span>
                    <p className="font-sans text-sm text-brand-text-muted leading-relaxed">
                      {selectedPet.story}
                    </p>
                  </div>

                  {/* Health checks (Adoptable only) */}
                  {selectedPet.status === "adoptable" && selectedPet.health && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-brand-text uppercase tracking-widest block border-b border-brand-primary-light/50 pb-1">
                        Estado de Salud
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPet.health.map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold text-brand-text-muted bg-brand-primary-light/60 border border-brand-primary-light px-2.5 py-1 rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-brand-primary shrink-0" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Disclaimer & CTA */}
                <div className="pt-6 border-t border-brand-primary-light mt-6 space-y-3">
                  <span className="text-[9px] text-brand-text-muted/70 block italic text-center">
                    * Ficha de ejemplo provisional de la veterinaria.
                  </span>
                  
                  <a
                    href={getWhatsAppLink(selectedPet.contactText)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-sans font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                    {selectedPet.status === "adoptable" ? "Quiero Adoptar" : "Tengo Información"}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

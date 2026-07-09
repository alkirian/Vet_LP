import React, { useState } from "react";
import { Stethoscope, Scissors, Pill, ShoppingBag, Check, X, ArrowRight, MessageSquare, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { servicesData } from "../data";
import { ServiceItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { PawIcon, FloatingPaws } from "./Logo";
import { getWhatsAppLink } from "../utils/whatsapp";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope,
  Scissors,
  Pills: Pill,
  ShoppingBag,
};

const ICON_HOVER_VARIANTS: Record<string, any> = {
  "consulta-clinica": { rotate: [-10, 10, -10, 10, 0] },
  "cirugias-castraciones": { scale: [1, 0.85, 1.1, 0.95, 1], rotate: [0, -12, 12, 0] },
  "farmacia-veterinaria": { y: [0, -6, 2, -3, 0] },
  "pet-shop": { scale: [1, 1.15, 0.9, 1.05, 1], rotate: [0, 8, -8, 0] },
};

// Helper function to map string icon name to Lucide Component
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  const Component = ICON_MAP[name] || Stethoscope;
  return <Component className={className} />;
};

export default function Services({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    if (clientWidth === 0) return;
    
    // Each card is w-full (clientWidth) and the gap is gap-6 (24px)
    const gap = 24;
    const index = Math.round(scrollLeft / (clientWidth + gap));
    if (index !== activeIndex && index >= 0 && index < servicesData.length) {
      setActiveIndex(index);
    }
  };

  const scrollToService = (index: number) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const gap = 24;
    containerRef.current.scrollTo({
      left: index * (clientWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  React.useEffect(() => {
    onModalToggle?.(selectedService !== null);
    if (selectedService !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService, onModalToggle]);

  return (
    <section id="servicios" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-brand-primary-light/50 rounded-full blur-3xl -z-10" />
      <FloatingPaws />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="services-header">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight mb-4">
            Cuidado y dedicación para el miembro más mimado del hogar
          </h2>
          <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
            Brindamos una gama completa de cuidados médicos y preventivos en Las Piedras.
            Contamos con profesionales experimentados y equipamiento moderno para cada etapa de la vida de tu mascota.
          </p>
        </div>

        {/* Services Grid / Carousel */}
        <div className="relative">
          <div className="relative">
            <motion.div
              ref={containerRef}
              onScroll={handleScroll}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 sm:pb-0"
              id="services-grid"
            >
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col h-full bg-white card-organic border border-brand-primary-light/50 hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden w-full shrink-0 snap-center sm:w-auto sm:shrink"
                  id={`service-card-${service.id}`}
                >
                  {/* Image banner for card */}
                  <div className="p-4 pb-0">
                    <div className="h-40 relative overflow-hidden image-organic">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-text/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-brand-bg-warm/95 backdrop-blur-md p-2.5 rounded-2xl text-brand-primary shadow-md overflow-hidden">
                        <motion.div
                          variants={{
                            hover: ICON_HOVER_VARIANTS[service.id] || {}
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          <IconMapper name={service.iconName} className="w-5.5 h-5.5" />
                        </motion.div>
                      </div>
                      {/* Test Photo Badge */}
                      <div className="absolute top-3 right-3 bg-brand-secondary/90 backdrop-blur-xs text-white font-sans text-[9px] font-bold px-2 py-0.5 rounded-lg shadow-sm border border-brand-secondary/20 flex items-center gap-1 z-10 select-none">
                        <Camera className="w-2.5 h-2.5" />
                        <span>Foto de prueba</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-4 flex flex-col justify-between flex-grow">
                    <div className="flex-grow">
                      <h3 className="font-display font-bold text-lg text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="font-sans text-brand-text-muted text-sm leading-relaxed mb-6 flex-grow line-clamp-4 font-normal">
                        {service.description}
                      </p>

                      {/* Button Action */}
                      <button
                        onClick={() => setSelectedService(service)}
                        className="w-full py-3 px-4 rounded-xl bg-brand-bg-warm border border-brand-primary-light/60 text-brand-text font-sans font-bold text-xs group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        id={`btn-details-${service.id}`}
                      >
                        Ver detalles
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Horizontal Scroll Fade Indicator */}
            <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
          </div>
        </div>

        {/* Carousel Controls for Mobile */}
        <div className="flex items-center justify-center gap-6 mt-8 sm:hidden" id="services-controls">
          <button
            onClick={() => scrollToService(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full bg-brand-bg-warm hover:bg-brand-primary-light/50 text-brand-primary flex items-center justify-center border border-brand-primary-light/80 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none shadow-xs"
            aria-label="Servicio anterior"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex gap-1" id="services-dots">
            {servicesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToService(idx)}
                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                aria-label={`Ir al servicio ${idx + 1}`}
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-brand-primary w-6"
                      : "bg-brand-text-muted/20 w-2.5 hover:bg-brand-text-muted/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToService(activeIndex + 1)}
            disabled={activeIndex === servicesData.length - 1}
            className="w-10 h-10 rounded-full bg-brand-bg-warm hover:bg-brand-primary-light/50 text-brand-primary flex items-center justify-center border border-brand-primary-light/80 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none shadow-xs"
            aria-label="Servicio siguiente"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Dynamic Highlight Bar */}
        <div className="mt-16 bg-gradient-to-r from-brand-primary to-brand-primary/90 card-organic p-8 text-white relative overflow-hidden shadow-xl" id="services-banner">
          {/* Decorative shapes inside banner */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-brand-primary-light/5 rounded-l-full blur-xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl mb-1.5">
                ¿Tu mascota necesita una cirugía o castración?
              </h3>
              <p className="font-sans text-brand-primary-light/90 text-sm max-w-2xl font-light">
                Contamos con quirófano totalmente equipado, anestesia inhalatoria y profesionales altamente capacitados.
                Comunicate con nosotros para recibir asesoramiento sobre cuidados pre y postoperatorios.
              </p>
            </div>
            <a
              href="#ubicacion"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("ubicacion");
                if (el) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  window.scrollTo({
                    top: elementRect - bodyRect - offset,
                    behavior: "smooth"
                  });
                }
              }}
              className="bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white px-6 py-3.5 rounded-2xl font-sans font-bold text-sm transition-all shrink-0 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
              id="banner-contact-cta"
            >
              Contacto y Horarios
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Interactive Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-brand-text/40 backdrop-blur-sm" id="service-modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-brand-bg-warm rounded-none sm:rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full relative border border-brand-primary-light/40 h-full sm:h-auto max-h-full sm:max-h-[90vh] flex flex-col"
            >
              {/* Image Header with Close Button */}
              <div className="h-48 sm:h-56 relative overflow-hidden shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 via-brand-text/20 to-transparent" />
                
                {/* Test Image Badge */}
                <div className="absolute top-4 left-4 bg-brand-secondary/90 backdrop-blur-xs text-white font-sans text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-brand-secondary/20 flex items-center gap-1.5 z-10 select-none">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Foto de prueba (provisional)</span>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-brand-bg-warm/90 hover:bg-brand-bg-warm text-brand-text p-2 rounded-full shadow-lg transition-colors cursor-pointer"
                  aria-label="Cerrar detalles de servicio"
                  id="btn-close-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Icon & Title */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                  <div className="bg-brand-primary p-2.5 rounded-2xl flex items-center justify-center">
                    <IconMapper name={selectedService.iconName} className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Modal Content */}
               <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-text mb-2 uppercase tracking-wide">
                    Descripción del Servicio
                  </h4>
                  <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm text-brand-text mb-3 uppercase tracking-wide">
                    ¿Qué incluye nuestra prestación?
                  </h4>
                  <ul className="grid gap-3" id="service-details-list">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm font-sans text-brand-text-muted">
                        <span className="bg-brand-primary-light text-brand-primary p-0.5 rounded-full mt-0.5 shrink-0 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="p-6 bg-brand-primary-light/50 border-t border-brand-primary-light/40 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="text-center sm:text-left">
                  <p className="font-sans text-xs text-brand-text-muted">¿Dudas o querés agendar?</p>
                  <p className="font-display font-extrabold text-sm text-brand-text">Atendemos consultas online</p>
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-brand-primary-light text-brand-text hover:bg-brand-primary-light/50 transition-colors cursor-pointer rounded-xl font-bold text-xs"
                  >
                    Cerrar
                  </button>
                  <a
                    href={getWhatsAppLink(`Hola! Me gustaría saber más sobre el servicio de ${selectedService.title} en Veterinaria Pedrense.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-sans font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    Consultar ahora
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Divisor curvo hacia Guía de Primeros Auxilios */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,80 C480,0 960,100 1440,20 L1440,100 L0,100 Z" fill="var(--color-brand-bg-warm)" />
        </svg>
      </div>
    </section>
  );
}

import { useState, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data";
import { motion } from "motion/react";
import { PawIcon, FloatingPaws } from "./Logo";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    if (clientWidth === 0) return;
    
    // Each card is w-full (clientWidth) and the gap is gap-6 (24px)
    const gap = 24;
    const index = Math.round(scrollLeft / (clientWidth + gap));
    if (index !== activeIndex && index >= 0 && index < testimonials.length) {
      setActiveIndex(index);
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (!containerRef.current) return;
    const { clientWidth } = containerRef.current;
    const gap = 24;
    containerRef.current.scrollTo({
      left: index * (clientWidth + gap),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section id="testimonios" className="py-20 bg-brand-primary text-white relative overflow-hidden">
      <div className="absolute left-0 bottom-0 top-0 w-80 bg-brand-primary-light/5 rounded-r-full blur-3xl -z-10" />
      <FloatingPaws className="text-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="testimonials-header">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            ¿Qué dicen las familias que confían en nosotros?
          </h2>
          <p className="font-sans text-brand-primary-light/95 text-sm sm:text-base leading-relaxed">
            La salud de tus mascotas es nuestro motor principal. Conocé la opinión de algunos vecinos de Las Piedras que atienden a sus compañeros con nosotros.
          </p>
        </div>

        {/* Testimonials Grid / Carousel */}
        <div className="relative">
          <motion.div
            ref={containerRef}
            onScroll={handleScroll}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 md:pb-0"
            id="testimonials-grid"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.025 }}
                className="bg-brand-bg-warm p-6 sm:p-8 card-organic border border-brand-primary-light/30 shadow-xl shadow-emerald-950/20 relative hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-brand-text cursor-default w-full shrink-0 snap-center md:w-auto md:shrink"
                id={`testimonial-card-${idx}`}
              >
                {/* Quote Decorative Icon */}
                <div className="absolute top-6 right-6 text-brand-primary-light/40">
                  <Quote className="w-8 h-8 rotate-180 stroke-[1.5]" />
                </div>

                {/* Text / Review */}
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1" id={`stars-${idx}`}>
                    {Array.from({ length: testimonial.stars }).map((_, starIdx) => (
                      <Star key={starIdx} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>

                  <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed italic font-normal">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-brand-primary-light/80" id={`author-${idx}`}>
                  <div className="bg-brand-primary-light text-brand-primary p-2.5 rounded-full flex items-center justify-center transition-colors">
                    <PawIcon className="w-4.5 h-4.5 text-brand-primary fill-brand-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-brand-text text-sm">{testimonial.name}</div>
                    <p className="font-sans text-xs text-brand-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls for Mobile */}
        <div className="flex items-center justify-center gap-6 mt-8 md:hidden" id="testimonials-controls">
          <button
            onClick={() => scrollToTestimonial(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center border border-white/20 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex gap-1" id="testimonials-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToTestimonial(idx)}
                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                aria-label={`Ir al testimonio ${idx + 1}`}
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-brand-accent w-6"
                      : "bg-white/30 w-2.5 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToTestimonial(activeIndex + 1)}
            disabled={activeIndex === testimonials.length - 1}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center border border-white/20 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
      {/* Divisor curvo hacia FAQ */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,20 C480,100 960,0 1440,80 L1440,100 L0,100 Z" fill="#fcf9f2" />
        </svg>
      </div>
    </section>
  );
}

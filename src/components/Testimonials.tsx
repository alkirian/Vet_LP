import { Star, Quote, Heart } from "lucide-react";
import { testimonials } from "../data";
import { motion } from "motion/react";
import { PawIcon, FloatingPaws } from "./Logo";

export default function Testimonials() {
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

        {/* Testimonials Grid */}
        <motion.div
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
          className="grid md:grid-cols-3 gap-8"
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
              className="bg-brand-bg-warm p-6 sm:p-8 card-organic border border-brand-primary-light/30 shadow-xl shadow-emerald-950/20 relative hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-brand-text cursor-default"
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
                  <h4 className="font-display font-bold text-brand-text text-sm">{testimonial.name}</h4>
                  <p className="font-sans text-xs text-brand-text-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

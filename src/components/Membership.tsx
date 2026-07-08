import React, { useState } from "react";
import { Check, Sparkles, ShieldCheck, Heart, ArrowRight, HelpCircle, CheckCircle2, Lock } from "lucide-react";
import { membershipPlans } from "../data";
import { MembershipPlan } from "../types";
import MembershipModal from "./MembershipModal";
import { motion, AnimatePresence } from "motion/react";
import { PawIcon, FloatingPaws } from "./Logo";

export default function Membership({ onModalToggle }: { onModalToggle?: (isOpen: boolean) => void }) {
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);

  React.useEffect(() => {
    onModalToggle?.(selectedPlan !== null);
    if (selectedPlan !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPlan, onModalToggle]);

  // We only have one plan in the single plan setup
  const plan = membershipPlans[0];

  return (
    <section id="club" className="py-20 bg-brand-primary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-brand-primary-light/20 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
      <FloatingPaws className="text-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="membership-header">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Protección y salud continua para tu fiel compañero
          </h2>
          <p className="font-sans text-brand-primary-light/90 text-sm sm:text-base leading-relaxed">
            Asociando a tu mascota a nuestro Plan de Socios, accedés a una cobertura de salud veterinaria integral para que disfruten sin preocupaciones y garantices su atención médica en Las Piedras.
          </p>
        </div>

        {/* Two-Column Pitch & Card Layout */}
        <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-center" id="membership-content">
          {/* Left Column: Sales Pitch & Info */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
              ¿Por qué unirse a nuestro Plan de Socios?
            </h3>
            <p className="font-sans text-brand-primary-light/90 text-sm sm:text-base leading-relaxed">
              Sabemos que la salud de tu compañero es lo primero. Al unirte a nuestro Plan de Socios, te olvidás de pagar por consulta cada vez que se siente mal y le asegurás un cuidado preventivo lleno de cariño.
            </p>

            <div className="grid gap-4 pt-2">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-brand-accent shrink-0 mt-1 shadow-inner">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Tranquilidad sin Sorpresas</h4>
                  <p className="text-xs text-brand-primary-light/90 mt-0.5">Todas las consultas clínicas generales en veterinaria están 100% bonificadas y son ilimitadas.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-brand-accent shrink-0 mt-1 shadow-inner">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Salud Preventiva Anual</h4>
                  <p className="text-xs text-brand-primary-light/90 mt-0.5">Incluye la vacunación obligatoria anual completa para protegerlo de enfermedades graves.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-brand-accent shrink-0 mt-1 shadow-inner">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Beneficios en Compras y Farmacia</h4>
                  <p className="text-xs text-brand-primary-light/90 mt-0.5">Accedés a descuentos permanentes en pet shop (10%), farmacia veterinaria (15%) y alimentos balanceados (10%).</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/15 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-brand-accent">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-accent" /> Cobertura médica veterinaria</span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brand-accent" /> Sin permanencia mínima</span>
            </div>
          </div>

          {/* Right Column: Single Premium Plan Card */}
          <div className="lg:col-span-5 flex justify-center">
            {plan && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm card-organic border border-brand-primary-light/30 bg-white p-8 relative shadow-2xl shadow-brand-primary/25 ring-1 ring-brand-primary-light/10 text-brand-text overflow-hidden"
                id={`membership-card-${plan.id}`}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-organic-1 z-0">
                  <motion.div
                    className="w-[200%] h-full bg-gradient-to-r from-transparent via-brand-primary-light/45 to-transparent -skew-x-12 absolute -top-0 -left-[100%]"
                    animate={{
                      left: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Plan Tag */}
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md z-10">
                  Plan del Club
                </span>
 
                {/* Card Title & Pricing */}
                <div className="mb-6 mt-2 text-center lg:text-left relative z-10">
                  <h3 className="font-display font-extrabold text-2xl text-brand-text">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1">
                    Todo lo necesario para su cuidado en una sola cuota mensual.
                  </p>
                  <div className="mt-5 flex flex-col items-center lg:items-start">
                    <div className="flex items-baseline">
                      <span className="font-display text-5xl font-black text-brand-primary tracking-tight">
                        ${plan.price}
                      </span>
                      <span className="text-xs text-brand-text-muted font-bold ml-1.5 uppercase tracking-wide">
                        UYU / {plan.frequency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="mb-8 space-y-3.5 relative z-10">
                  <span className="text-xs font-bold text-brand-text uppercase tracking-wider block mb-2 border-b border-brand-primary-light pb-2">
                    Beneficios del Socio:
                  </span>
                  <motion.ul
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08
                        }
                      }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="space-y-3"
                  >
                    {plan.benefits.slice(0, 6).map((benefit, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-muted font-sans"
                      >
                        <span className="p-0.5 rounded-full mt-0.5 bg-brand-primary-light text-brand-primary shrink-0 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <span className="text-[10px] text-brand-primary hover:text-brand-secondary font-bold tracking-wide mt-2 block cursor-pointer text-center lg:text-left" onClick={() => setSelectedPlan(plan)}>
                    + Ver todos los beneficios y registrarse
                  </span>
                </div>

                {/* Button Action */}
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full py-4 px-6 rounded-2xl bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold font-sans text-sm shadow-lg shadow-brand-secondary/15 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer border-none relative z-10"
                  id={`btn-associate-${plan.id}`}
                >
                  Asociarse en la web
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="text-[10px] text-brand-text-muted flex items-center justify-center gap-1.5 mt-3 relative z-10">
                  <Lock className="w-3.5 h-3.5 text-brand-text-muted" />
                  Procesado de forma segura por Mercado Pago
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Render multi-step modal when plan is selected */}
      <AnimatePresence>
        {selectedPlan && (
          <MembershipModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>

      {/* Divisor curvo hacia Ubicación */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,20 C480,100 960,0 1440,80 L1440,100 L0,100 Z" fill="#fcf9f2" />
        </svg>
      </div>
    </section>
  );
}

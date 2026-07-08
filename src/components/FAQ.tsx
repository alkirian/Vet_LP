import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { faqData, contactInfo } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { PawIcon } from "./Logo";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cleanPhoneWhatsapp = contactInfo.phoneWhatsapp.replace(/\s+/g, "");

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-20 bg-brand-bg-warm relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-brand-primary-light/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" id="faq-header">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight mb-4">
            Resolvé tus dudas al instante
          </h2>
          <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
            Aquí respondemos las dudas más comunes de nuestros pacientes antes de visitar la veterinaria en Las Piedras.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordions">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-brand-primary-light/55 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                id={`faq-item-${idx}`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-display font-bold text-brand-text hover:text-brand-primary transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-primary shrink-0" />
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="bg-brand-bg-warm p-1.5 rounded-lg text-brand-text-muted flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Accordion Content with motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-brand-primary-light/40"
                    >
                      <p className="p-5 sm:p-6 font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Missing Question Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 border border-brand-primary-light shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left" id="faq-missing-banner">
          <div>
            <h4 className="font-display font-bold text-brand-text text-base">
              ¿Tenés otra consulta?
            </h4>
            <p className="font-sans text-brand-text-muted text-xs sm:text-sm mt-0.5">
              Si tenés alguna consulta específica, comunicate directamente con nuestro equipo técnico.
            </p>
          </div>
          <a
            href={`https://api.whatsapp.com/send?phone=598${cleanPhoneWhatsapp}&text=Hola!%20Tengo%20una%20consulta%20que%20no%20encontr%C3%A9%20en%20las%20Preguntas%20Frecuentes.`}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-secondary hover:bg-brand-secondary/90 text-white font-sans font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5 shrink-0"
            id="faq-whatsapp-cta"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Enviar Mensaje
          </a>
        </div>
      </div>
      {/* Divisor curvo hacia Footer */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,80 C480,0 960,100 1440,20 L1440,100 L0,100 Z" fill="var(--color-brand-primary)" />
        </svg>
      </div>
    </section>
  );
}

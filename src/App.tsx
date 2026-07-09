import { useState, useEffect } from "react";
import { ArrowUp, MessageSquare } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import FirstAidGuide from "./components/FirstAidGuide";
import Membership from "./components/Membership";
import AdoptionsLostFound from "./components/AdoptionsLostFound";
import ScheduleLocation from "./components/ScheduleLocation";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import GlobalScrollTrail from "./components/GlobalScrollTrail";
import { motion, AnimatePresence } from "motion/react";
import { getWhatsAppLink } from "./utils/whatsapp";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll-Spy implementation using IntersectionObserver
    const sections = ["inicio", "servicios", "primeros-auxilios", "club", "adopciones", "ubicacion", "testimonios", "faq"];
    const observers = sections.map((secId) => {
      const element = document.getElementById(secId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px", // Trigger when the section occupies the center of viewport
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    // Back to top button visibility handler
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappMessage = "Hola! Me gustaría agendar un turno para mi mascota en Veterinaria Pedrense.";

  return (
    <div className="min-h-screen bg-brand-bg-warm text-brand-text font-sans selection:bg-brand-secondary selection:text-white antialiased">
      {/* Header / Navigation */}
      <Header activeSection={activeSection} onMenuToggle={setIsMenuOpen} />

      {/* Main Sections */}
      <main className="relative" id="main-content">
        <GlobalScrollTrail />
        <Hero />
        <Services onModalToggle={setIsModalOpen} />
        <FirstAidGuide />
        <Membership onModalToggle={setIsModalOpen} />
        <AdoptionsLostFound />
        <ScheduleLocation />
        <Testimonials />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent floating actions on Desktop */}
      <AnimatePresence>
        {showScrollTop && (
          <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3" id="desktop-floating-actions">
            {/* Quick Whatsapp float on desktop */}
            <motion.a
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-secondary hover:bg-brand-secondary/90 text-white p-4 rounded-xl shadow-xl shadow-brand-secondary/20 hover:shadow-brand-secondary/30 transition-all hover:scale-105 flex items-center justify-center border border-brand-secondary/80"
              title="Agendar Turno por WhatsApp"
            >
              <MessageSquare className="w-6 h-6 fill-current animate-pulse" />
            </motion.a>

            {/* Back to top button */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="bg-white hover:bg-brand-primary-light text-brand-text p-4 rounded-xl shadow-xl hover:shadow-brand-primary-light/50 transition-all hover:scale-105 flex items-center justify-center border border-brand-primary-light/80 cursor-pointer"
              title="Volver arriba"
              id="btn-scroll-top"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Actions - WhatsApp + Back to top */}
      <AnimatePresence>
        {!isModalOpen && !isMenuOpen && (
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-center md:hidden" id="mobile-floating-actions">
            {/* Back to top button (shown only after scrolling) */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  onClick={scrollToTop}
                  className="w-12 h-12 bg-white text-brand-primary rounded-full shadow-lg border border-brand-primary-light flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                  title="Volver arriba"
                >
                  <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Quick Whatsapp float on mobile */}
            <motion.a
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 bg-brand-secondary text-white rounded-full shadow-lg shadow-brand-secondary/30 flex items-center justify-center border border-brand-secondary/80 active:scale-95 transition-transform cursor-pointer"
              id="mobile-whatsapp-fab"
              title="Agendar Turno por WhatsApp"
            >
              <MessageSquare className="w-5.5 h-5.5 fill-current animate-pulse" />
            </motion.a>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

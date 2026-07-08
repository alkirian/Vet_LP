import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { contactInfo } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Isologo } from "./Logo";

interface HeaderProps {
  activeSection: string;
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function Header({ activeSection, onMenuToggle }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    onMenuToggle?.(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onMenuToggle]);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Primeros Auxilios", href: "#primeros-auxilios" },
    { name: "Planes de Socio", href: "#club" },
    { name: "Horarios y Ubicación", href: "#ubicacion" },
    { name: "Testimonios", href: "#testimonios" },
    { name: "Preguntas Frecuentes", href: "#faq" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-bg-warm/95 backdrop-blur-md shadow-md border-b border-brand-primary-light"
            : "bg-transparent"
        }`}
        id="app-header"
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "py-1.5 md:py-2" : "py-2.5 md:py-3.5"}`}>
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <a
              href="#inicio"
              onClick={(e) => handleScrollTo(e, "#inicio")}
              className="flex items-center group"
              id="brand-logo"
            >
              <Isologo 
                className={`transition-all duration-300 transform group-hover:scale-105 ${
                  isScrolled
                    ? "w-10 h-10 md:w-12 md:h-12"
                    : "w-12 h-12 md:w-16 md:h-16"
                }`} 
              />
            </a>
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 relative" id="desktop-nav">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-250 font-sans z-10 ${
                      isActive
                        ? "text-brand-primary font-bold"
                        : isScrolled
                        ? "text-brand-text-muted hover:text-brand-primary"
                        : "text-brand-text hover:text-brand-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSectionIndicator"
                        className="absolute inset-0 bg-brand-primary-light/80 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Quick Contact Buttons */}
            <div className="hidden lg:flex items-center space-x-3" id="quick-contact-actions">
              <a
                href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                className="flex items-center text-brand-text hover:text-brand-primary font-sans font-semibold text-sm transition-colors mr-2"
                title="Llamar teléfono fijo"
              >
                <Phone className="w-4 h-4 mr-1.5 text-brand-primary" />
                {contactInfo.phoneLandline}
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=598${contactInfo.phoneWhatsapp.replace(/\s+/g, "")}&text=Hola!%20Me%20gustar%C3%ADa%20agendar%20un%20turno%20para%20mi%20mascota.`}
                target="_blank"
                rel="noreferrer"
                className="bg-brand-secondary text-white font-sans font-bold text-sm px-4 py-2 rounded-xl hover:bg-brand-secondary/90 shadow-md shadow-brand-secondary/15 transition-all hover:scale-[1.02] flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                Agendar Turno
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden" id="mobile-menu-trigger-container">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`p-2 rounded-xl transition-colors ${
                  isScrolled
                    ? "text-brand-text hover:bg-brand-primary-light"
                    : "text-brand-text hover:bg-white/40"
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                id="mobile-menu-toggle-button"
              >
                <span className="sr-only">Abrir menú</span>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-20 bg-brand-text/30 backdrop-blur-xs md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`fixed inset-x-0 z-30 bg-brand-bg-warm border-b border-brand-primary-light shadow-xl md:hidden overflow-y-auto ${
                isScrolled
                  ? "top-[52px] max-h-[calc(100vh-52px)]"
                  : "top-[68px] max-h-[calc(100vh-68px)]"
              }`}
              id="mobile-navigation-drawer"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium font-sans min-h-[48px] flex items-center ${
                        isActive
                          ? "text-brand-primary bg-brand-primary-light font-bold"
                          : "text-brand-text-muted hover:text-brand-primary hover:bg-brand-primary-light/50"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-brand-primary-light/60 flex flex-col gap-3">
                  <a
                    href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center py-3 border border-brand-primary-light/60 rounded-xl font-sans font-semibold text-brand-text hover:bg-brand-primary-light/50 transition-colors min-h-[48px]"
                  >
                    <Phone className="w-5 h-5 mr-2 text-brand-primary" />
                    Llamar al {contactInfo.phoneLandline}
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=598${contactInfo.phoneWhatsapp.replace(/\s+/g, "")}&text=Hola!%20Me%20gustar%C3%ADa%20agendar%20un%20turno%20para%20mi%20mascota.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center py-3.5 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-sans font-bold rounded-xl shadow-lg shadow-brand-secondary/10 transition-all min-h-[48px]"
                  >
                    <MessageSquare className="w-5 h-5 mr-2 fill-current" />
                    Agendar por WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

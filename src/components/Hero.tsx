import { useState } from "react";
import { MessageSquare, Phone, Clock, ShieldCheck, Heart, Camera } from "lucide-react";
import { contactInfo } from "../data";
import { motion } from "motion/react";
import logoOk from "../assets/logo_ok.png";
import { FullLogo, FloatingPaws, WalkTrail, PawIcon } from "./Logo";
import HeroGalleryModal from "./HeroGalleryModal";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
    title: "Atención Médica y Vacunación de Cachorros",
    description: "Cuidado profesional, planes preventivos y controles de salud para el correcto desarrollo de tu cachorro desde sus primeros meses de vida."
  },
  {
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop",
    title: "Cuidado Amigable y Adaptado para Felinos",
    description: "Instalaciones diseñadas y personal de manejo amigable para una experiencia de consulta positiva y tranquila para tu gato."
  },
  {
    url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop",
    title: "Medicina Preventiva y de Especialidad",
    description: "Monitoreo completo, vacunas esenciales, desparasitaciones y asesoramiento nutricional para asegurar una vida plena a tu mejor amigo."
  },
  {
    url: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1200&auto=format&fit=crop",
    title: "Monitoreo Clínico y Recuperación Confortable",
    description: "Espacios de internación adaptados y confortables con supervisión constante para la total tranquilidad durante tratamientos y cirugías."
  },
  {
    url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200&auto=format&fit=crop",
    title: "Compromiso Integral con la Salud de tu Mascota",
    description: "Un equipo multidisciplinario altamente calificado y equipamiento moderno dedicados al diagnóstico y bienestar de tus compañeros."
  }
];

export default function Hero() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const cleanPhoneWhatsapp = contactInfo.phoneWhatsapp.replace(/\s+/g, "");

  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-28 pb-24 flex items-center bg-brand-bg-warm overflow-hidden"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-primary-light rounded-full blur-2xl z-0" />
      <FloatingPaws />
      <WalkTrail className="w-full h-48 bottom-0 opacity-15 left-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left" id="hero-text-container">


            {/* Main Logo instead of text headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center lg:justify-start py-2"
            >
              <img
                src={logoOk}
                alt="Clínica Veterinaria Pedrense"
                className="w-full max-w-[28rem] sm:max-w-[34rem] md:max-w-[40rem] h-auto object-contain hover:scale-[1.01] transition-transform duration-300"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-brand-text-muted font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Cuidamos a quienes llenan tu vida de alegría. Atención médica profesional, cirugías con amor y el respaldo completo que tu familia necesita de lunes a domingos en Las Piedras.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-ctas"
            >
              {/* WhatsApp */}
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`https://api.whatsapp.com/send?phone=598${cleanPhoneWhatsapp}&text=Hola!%20Me%20gustar%C3%ADa%20agendar%20un%20turno%20para%20mi%20mascota%20en%20Veterinaria%20Pedrense.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-sans font-bold text-base rounded-2xl shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all cursor-pointer group"
                id="hero-whatsapp-button"
              >
                <MessageSquare className="w-5.5 h-5.5 fill-current" />
                <span>Agendar Turno por WhatsApp</span>
                <PawIcon className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-12" color="white" />
              </motion.a>

              {/* Call fixed line button */}
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-brand-primary-light text-brand-text font-sans font-bold text-base rounded-2xl border border-brand-primary-light shadow-sm transition-all hover:border-brand-primary-light/80 cursor-pointer"
                id="hero-landline-button"
              >
                <Phone className="w-4.5 h-4.5 text-brand-text-muted" />
                Llamar al {contactInfo.phoneLandline}
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-primary-light/80 max-w-lg mx-auto lg:mx-0"
              id="hero-trust-badges"
            >
              <div className="flex items-start gap-2.5 text-left">
                <Clock className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-brand-text">Abierto los Domingos</h4>
                  <p className="font-sans text-[10px] text-brand-text-muted">Horario de 09:00 a 12:30 hs</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-left">
                <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-brand-text">Equipo Profesional</h4>
                  <p className="font-sans text-[10px] text-brand-text-muted">Veterinarios colegiados</p>
                </div>
              </div>
              <div className="hidden sm:flex items-start gap-2.5 text-left">
                <Heart className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-brand-text">Fácil Acceso</h4>
                  <p className="font-sans text-[10px] text-brand-text-muted">Luis Batlle Berres y Ruta 48</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Graphical Frame with Pet Images Collage (Paw Print Layout) */}
          <div className="lg:col-span-6 flex flex-col justify-center relative" id="hero-graphic-container">

            {/* Collage of Blobs in Giant Paw Print Layout */}
            <div className="relative w-full max-w-[32.5rem] sm:max-w-[38.75rem] aspect-square mx-auto" id="hero-collage-container">
              {/* Test Photo Badge */}
              <div className="absolute bottom-4 right-4 z-20 bg-brand-secondary/90 hover:bg-brand-secondary text-white font-sans text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-xs border border-brand-secondary/30 flex items-center gap-1.5 transition-all select-none">
                <Camera className="w-3.5 h-3.5" />
                <span>Fotos de prueba (provisionales)</span>
              </div>
              {/* Giant SVG Paw Print Layout with Clipped Images */}
              <svg
                viewBox="0 0 512 512"
                className="w-full h-full relative overflow-visible select-none z-10 filter drop-shadow-xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Outer Left Toe Clip */}
                  <clipPath id="clip-toe-1">
                    <path d="M108.72 211.39c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34z" />
                  </clipPath>
                  
                  {/* Inner Left Toe Clip */}
                  <clipPath id="clip-toe-2">
                    <path d="M193.44 190.61c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87z" />
                  </clipPath>

                  {/* Inner Right Toe Clip */}
                  <clipPath id="clip-toe-3">
                    <path d="M318.56 190.61c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z" />
                  </clipPath>

                  {/* Outer Right Toe Clip */}
                  <clipPath id="clip-toe-4">
                    <path d="M474.83 161.27c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34z" />
                  </clipPath>

                  {/* Palm Clip */}
                  <clipPath id="clip-palm">
                    <path d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224z" />
                  </clipPath>
                </defs>

                {/* Dedo 1: Golden Retriever Puppy (Outer Left) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.1 },
                    scale: { duration: 0.6, delay: 0.1 },
                    y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover="hover"
                  className="cursor-pointer"
                  onClick={() => setActiveGalleryIndex(0)}
                >
                  <g clipPath="url(#clip-toe-1)">
                    <motion.image
                      variants={{
                        hover: { scale: 1.08 }
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{ duration: 0.3 }}
                      href="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=500&auto=format&fit=crop"
                      x="0"
                      y="150"
                      width="112"
                      height="140"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                  <motion.path
                    variants={{
                      hover: { stroke: "#e07a5f", strokeWidth: 8 }
                    }}
                    transition={{ duration: 0.3 }}
                    d="M108.72 211.39c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34z"
                    stroke="#fcf9f2"
                    strokeWidth="6"
                    fill="none"
                  />
                </motion.g>

                {/* Dedo 2: Kitten Playing (Inner Left) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, 6, 0],
                    rotate: [0, -1, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.3 },
                    scale: { duration: 0.6, delay: 0.3 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover="hover"
                  className="cursor-pointer"
                  onClick={() => setActiveGalleryIndex(1)}
                >
                  <g clipPath="url(#clip-toe-2)">
                    <motion.image
                      variants={{
                        hover: { scale: 1.08 }
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{ duration: 0.3 }}
                      href="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500&auto=format&fit=crop"
                      x="110"
                      y="30"
                      width="125"
                      height="162"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                  <motion.path
                    variants={{
                      hover: { stroke: "#e07a5f", strokeWidth: 8 }
                    }}
                    transition={{ duration: 0.3 }}
                    d="M193.44 190.61c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87z"
                    stroke="#fcf9f2"
                    strokeWidth="6"
                    fill="none"
                  />
                </motion.g>

                {/* Dedo 3: Kitten Looking Up (Inner Right) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, 8, 0],
                    rotate: [0, -1.5, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.7 },
                    scale: { duration: 0.6, delay: 0.7 },
                    y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover="hover"
                  className="cursor-pointer"
                  onClick={() => setActiveGalleryIndex(2)}
                >
                  <g clipPath="url(#clip-toe-3)">
                    <motion.image
                      variants={{
                        hover: { scale: 1.08 }
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{ duration: 0.3 }}
                      href="https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=500&auto=format&fit=crop"
                      x="277"
                      y="30"
                      width="125"
                      height="162"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                  <motion.path
                    variants={{
                      hover: { stroke: "#e07a5f", strokeWidth: 8 }
                    }}
                    transition={{ duration: 0.3 }}
                    d="M318.56 190.61c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"
                    stroke="#fcf9f2"
                    strokeWidth="6"
                    fill="none"
                  />
                </motion.g>

                {/* Dedo 4: Puppy Sleeping (Outer Right) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.9 },
                    scale: { duration: 0.6, delay: 0.9 },
                    y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover="hover"
                  className="cursor-pointer"
                  onClick={() => setActiveGalleryIndex(3)}
                >
                  <g clipPath="url(#clip-toe-4)">
                    <motion.image
                      variants={{
                        hover: { scale: 1.08 }
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{ duration: 0.3 }}
                      href="https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=500&auto=format&fit=crop"
                      x="400"
                      y="150"
                      width="112"
                      height="140"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                  <motion.path
                    variants={{
                      hover: { stroke: "#e07a5f", strokeWidth: 8 }
                    }}
                    transition={{ duration: 0.3 }}
                    d="M474.83 161.27c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34z"
                    stroke="#fcf9f2"
                    strokeWidth="6"
                    fill="none"
                  />
                </motion.g>

                {/* Palma: Dog and Cat Together (Center Bottom) */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0],
                    rotate: [0, 1.5, -1, 0]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.5 },
                    scale: { duration: 0.6, delay: 0.5 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover="hover"
                  className="cursor-pointer"
                  onClick={() => setActiveGalleryIndex(4)}
                >
                  <g clipPath="url(#clip-palm)">
                    <motion.image
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{ duration: 0.3 }}
                      href="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop"
                      x="64"
                      y="224"
                      width="384"
                      height="256"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </g>
                  <motion.path
                    variants={{
                      hover: { stroke: "#e07a5f", strokeWidth: 8 }
                    }}
                    transition={{ duration: 0.3 }}
                    d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224z"
                    stroke="#fcf9f2"
                    strokeWidth="6"
                    fill="none"
                  />
                </motion.g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <HeroGalleryModal
        isOpen={activeGalleryIndex !== null}
        activeIndex={activeGalleryIndex ?? 0}
        onClose={() => setActiveGalleryIndex(null)}
        onNavigate={(index) => setActiveGalleryIndex(index)}
        images={galleryImages}
      />

      {/* Divisor curvo hacia Servicios */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,20 C480,100 960,0 1440,80 L1440,100 L0,100 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}

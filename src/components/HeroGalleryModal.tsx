import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryImage {
  url: string;
  title: string;
  description: string;
}

interface HeroGalleryModalProps {
  isOpen: boolean;
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  images: GalleryImage[];
}

export default function HeroGalleryModal({
  isOpen,
  activeIndex,
  onClose,
  onNavigate,
  images,
}: HeroGalleryModalProps) {
  // Prevent page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, activeIndex]);

  const handlePrev = () => {
    onNavigate((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onNavigate((activeIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md px-4 py-6 md:p-8 select-none"
          onClick={onClose}
        >
          {/* Close Button - Moved down to clear notches on mobile */}
          <motion.button
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-8 right-6 md:top-8 md:right-8 z-50 flex items-center justify-center p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-sm active:scale-95 transition-all cursor-pointer"
            aria-label="Cerrar galería"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Main Content Area - Click propagation allowed so clicking background empty space closes gallery */}
          <div 
            className="relative flex flex-col items-center justify-center w-full max-w-5xl flex-1"
          >
            {/* Left navigation arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-2 md:left-4 z-40 flex items-center justify-center p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm active:scale-95 transition-all cursor-pointer group"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Main Image Container */}
            <div 
              className="relative w-full max-h-[60vh] md:max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/40 border border-white/5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={images[activeIndex].url}
                  alt={images[activeIndex].title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain rounded-2xl"
                />
              </AnimatePresence>

              {/* Slide Counter */}
              <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                {activeIndex + 1} / {images.length}
              </div>

              {/* Test Photo Badge */}
              <div className="absolute top-4 right-4 bg-amber-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-amber-400/20 shadow-md backdrop-blur-xs flex items-center gap-1.5 z-20 select-none">
                <Camera className="w-3.5 h-3.5" />
                <span>Foto de prueba (provisional)</span>
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-2 md:right-4 z-40 flex items-center justify-center p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm active:scale-95 transition-all cursor-pointer group"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Text Overlay info */}
            <motion.div
              key={`info-${activeIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full max-w-2xl mt-4 md:mt-6 bg-slate-900/55 border border-white/10 backdrop-blur-md p-4 rounded-xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display font-bold text-lg md:text-xl text-sky-300">
                {images[activeIndex].title}
              </h3>
              <p className="font-sans text-slate-300 text-xs md:text-sm mt-1 leading-relaxed">
                {images[activeIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Thumbnails list */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-2.5 md:gap-4 mt-6 md:mt-8 w-full max-w-lg overflow-x-auto py-2 px-4 scrollbar-thin scrollbar-thumb-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "border-sky-400 ring-4 ring-sky-500/30 scale-105 opacity-100"
                    : "border-transparent opacity-40 hover:opacity-85"
                }`}
              >
                <img
                  src={img.url}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

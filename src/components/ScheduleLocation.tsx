import { Clock, MapPin, Phone, MessageSquare, ExternalLink, ShieldCheck } from "lucide-react";
import { businessHours, contactInfo } from "../data";
import { motion } from "motion/react";
import { PawIcon } from "./Logo";

export default function ScheduleLocation() {
  const cleanPhoneWhatsapp = contactInfo.phoneWhatsapp.replace(/\s+/g, "");

  return (
    <section id="ubicacion" className="py-20 bg-brand-bg-warm relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-5 w-80 h-80 bg-brand-primary-light rounded-full blur-3xl -z-10 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          {/* Schedule and Contact Section */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10" id="schedule-left-panel">
            <div className="space-y-6">
              <span className="text-brand-secondary font-display font-extrabold text-xs sm:text-sm uppercase tracking-widest block">
                Contacto y Horarios
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight leading-tight">
                ¿Dónde encontrarnos y en qué horarios?
              </h2>
              <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
                Estamos ubicados en un punto estratégico y de fácil acceso en Las Piedras.
                Nuestros horarios extendidos de fin de semana están diseñados para respaldarte cuando más lo necesitás.
              </p>
            </div>

            {/* Opening Hours Grid */}
            <div className="bg-white p-6 sm:p-8 card-organic border border-brand-primary-light/50 shadow-xl shadow-brand-primary-light/10 space-y-6" id="schedule-hours-card">
              <h3 className="font-display font-bold text-lg text-brand-text flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-primary" />
                Horarios de Atención
              </h3>

              <div className="space-y-4" id="hours-list">
                {businessHours.map((bh, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all font-sans ${
                      bh.isSpecial
                        ? "bg-brand-accent/10 border border-brand-secondary/30 ring-2 ring-brand-secondary/15 shadow-sm"
                        : "bg-brand-bg-warm border border-brand-primary-light/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg flex items-center justify-center ${bh.isSpecial ? "bg-brand-secondary/20 text-brand-secondary" : "bg-brand-primary-light text-brand-primary"}`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className={`text-sm ${bh.isSpecial ? "font-extrabold text-brand-secondary" : "font-semibold text-brand-text"}`}>
                        {bh.dayGroup}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:text-right">
                      <span className={`text-sm ${bh.isSpecial ? "font-extrabold text-brand-text" : "font-medium text-brand-text-muted"}`}>
                        {bh.hours}
                      </span>
                      {bh.isSpecial && (
                        <span className="text-brand-secondary text-[10px] font-bold tracking-wider uppercase ml-1.5">
                          (Horario Especial)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Security notice / Sunday highlights */}
              <div className="p-4 bg-brand-primary-light/70 rounded-2xl border border-brand-primary-light text-brand-text text-xs flex items-start gap-2.5 font-sans">
                <ShieldCheck className="w-4.5 h-4.5 text-brand-primary mt-0.5 shrink-0" />
                <p className="leading-relaxed font-normal">
                  <strong>¡Atención los Domingos!</strong> Abrimos de 09:00 a 12:30 hs. Ideal para consultas de fin de semana y asistencia de urgencias.
                </p>
              </div>

              <span className="text-[10px] text-brand-text-muted/60 italic block mt-1.5 text-center">
                * Horarios de prueba sujetos a confirmación por la veterinaria.
              </span>
            </div>

            {/* Address Details Block */}
            <div className="space-y-4" id="address-block">
              <div className="flex gap-4 items-start">
                <div className="bg-brand-primary text-white p-3 rounded-2xl shadow-md shrink-0 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="font-sans">
                  <h4 className="font-display font-bold text-brand-text text-base">Dirección</h4>
                  <p className="text-sm text-brand-text-muted font-semibold mt-0.5">{contactInfo.address}</p>
                  <p className="text-xs text-brand-text-muted/80 mt-0.5">{contactInfo.addressDetail}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start pt-2">
                <div className="bg-brand-primary-light text-brand-primary p-3 rounded-2xl shrink-0 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="font-sans">
                  <h4 className="font-display font-bold text-brand-text text-base">Números de Contacto</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-0.5">
                    <a
                      href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                      className="text-sm text-brand-primary font-bold hover:text-brand-secondary hover:underline flex items-center gap-1"
                    >
                      <span>Fijo: {contactInfo.phoneLandline}</span>
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=598${cleanPhoneWhatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brand-primary font-bold hover:text-brand-secondary hover:underline flex items-center gap-1"
                    >
                      <span>Cel: {contactInfo.phoneWhatsapp}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed and Route Navigation Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="map-right-panel">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 card-organic border border-brand-primary-light shadow-2xl h-full flex flex-col justify-between overflow-hidden"
              id="map-card"
            >
              {/* Header inside Map Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-2 shrink-0">
                <div className="font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary block">
                    Mapa Interactivo
                  </span>
                  <h3 className="font-display font-extrabold text-brand-text text-base">
                    Ubicación en Google Maps
                  </h3>
                </div>
                <a
                  href={contactInfo.mapExternalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-primary-light hover:bg-brand-primary-light/80 text-brand-primary font-sans font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-brand-primary-light/50 inline-flex"
                  id="btn-external-map"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir en Google Maps
                </a>
              </div>

              {/* Map Iframe Wrapper */}
              <div className="relative rounded-organic-1 overflow-hidden border border-brand-primary-light/30 shadow-inner flex-grow min-h-[250px] sm:min-h-[350px] mt-4 mb-4">
                <iframe
                  title="Mapa de ubicación Veterinaria Pedrense"
                  src={contactInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Quick Route Assistance */}
              <div className="p-4 bg-brand-primary-light/50 rounded-2xl border border-brand-primary-light/40 text-xs sm:text-sm font-sans text-brand-text-muted flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <p className="text-center sm:text-left leading-relaxed">
                  Estamos ubicados sobre <strong>Luis Batlle Berres</strong> a pasos del cruce con la <strong>Ruta 48</strong>. Hay estacionamiento cómodo frente al local para clientes y urgencias.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Divisor curvo hacia Testimonios */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,80 C480,0 960,100 1440,20 L1440,100 L0,100 Z" fill="var(--color-brand-primary)" />
        </svg>
      </div>
    </section>
  );
}

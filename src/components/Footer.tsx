import React from "react";
import { Heart, MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { contactInfo, businessHours } from "../data";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const cleanPhoneWhatsapp = contactInfo.phoneWhatsapp.replace(/\s+/g, "");

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="bg-brand-text text-brand-primary-light/80 font-sans" id="app-footer">
      {/* Top Footer Banner */}
      <div className="bg-brand-primary border-b border-brand-primary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-white text-lg sm:text-xl">
              ¿Tu mascota necesita atención profesional?
            </h3>
            <p className="text-brand-primary-light/90 text-sm max-w-xl">
              No esperes más para brindarle el cuidado que se merece. Comunicate con nosotros por WhatsApp o teléfono fijo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <a
              href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto text-center px-6 py-3 border border-brand-primary-light/40 hover:border-white/50 hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-all"
            >
              Llamar al {contactInfo.phoneLandline}
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=598${cleanPhoneWhatsapp}&text=Hola!%20Me%20gustar%C3%ADa%20agendar%20un%20turno.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Agendar Turno
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand/Identity block */}
          <div className="space-y-6 text-center md:text-left" id="footer-brand-block">
            <a
              href="#inicio"
              onClick={(e) => handleScrollTo(e, "#inicio")}
              className="flex items-center space-x-2.5 group w-fit mx-auto md:mx-0"
            >
              <div className="bg-brand-primary text-white p-2.5 rounded-2xl shadow-md shadow-slate-950/20 group-hover:bg-brand-primary/80 transition-colors flex items-center justify-center">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
                  Veterinaria
                </span>
                <span className="font-display font-bold text-xs sm:text-sm text-brand-secondary uppercase tracking-widest mt-0.5">
                  Pedrense
                </span>
              </div>
            </a>
            <p className="text-brand-primary-light/60 text-sm leading-relaxed max-w-md mx-auto md:mx-0 text-center md:text-left">
              Brindando soluciones de salud integrales y compasivas para tus mascotas en Las Piedras, Canelones.
              La salud de tu mejor amigo, en manos expertas.
            </p>
          </div>

          {/* Contact Details block */}
          <div className="space-y-4 text-center md:text-left" id="footer-contact-block">
            <h4 className="font-display font-bold text-white text-base text-center md:text-left">Contacto</h4>
            <ul className="space-y-3.5 text-sm flex flex-col items-center md:items-start max-w-xs mx-auto md:mx-0">
              <li className="flex items-start gap-2.5 text-left w-full md:w-auto">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span className="text-brand-primary-light/60">
                  {contactInfo.address}, <br />
                  <span className="text-xs text-brand-primary-light/40">{contactInfo.addressDetail}</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-left w-full md:w-auto">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <a
                  href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                  className="text-brand-primary-light/60 hover:text-brand-secondary transition-colors font-semibold"
                >
                  {contactInfo.phoneLandline} (Fijo)
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-left w-full md:w-auto">
                <MessageSquare className="w-4 h-4 text-brand-secondary shrink-0 fill-current" />
                <a
                  href={`https://api.whatsapp.com/send?phone=598${cleanPhoneWhatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-primary-light/60 hover:text-brand-secondary transition-colors font-semibold"
                >
                  {contactInfo.phoneWhatsapp} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-left w-full md:w-auto">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-brand-primary-light/60 hover:text-brand-secondary transition-colors truncate block max-w-[200px] sm:max-w-none">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening summary block */}
          <div className="space-y-4 text-center md:text-left" id="footer-hours-block">
            <h4 className="font-display font-bold text-white text-base text-center md:text-left">Horarios</h4>
            <div className="grid grid-cols-2 gap-x-4 max-w-[280px] mx-auto md:mx-0 text-xs sm:text-sm">
              <div className="text-left text-brand-primary-light/60 space-y-2.5 font-semibold">
                {businessHours.map((bh, idx) => (
                  <div key={idx} className={bh.isSpecial ? "text-brand-accent" : ""}>
                    {bh.dayGroup}
                  </div>
                ))}
              </div>
              <div className="text-right text-brand-primary-light/80 space-y-2.5 font-bold sm:font-semibold">
                {businessHours.map((bh, idx) => (
                  <div key={idx} className={bh.isSpecial ? "text-brand-accent" : ""}>
                    {bh.hours}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-brand-primary-light/40 text-center md:text-left max-w-[280px] mx-auto md:mx-0">
              <span className="text-brand-accent font-bold block mb-0.5">Domingo Atendido:</span>
              Asistencia por urgencias y consultas de fin de semana por la mañana.
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-primary-light/40">
          <p>
            © {currentYear} Veterinaria Pedrense. Todos los derechos reservados. Las Piedras, Canelones, Uruguay.
          </p>
          <p className="flex items-center gap-1">
            Hecho con <span className="text-rose-500 animate-pulse">❤</span> en Uruguay
          </p>
        </div>
      </div>
    </footer>
  );
}

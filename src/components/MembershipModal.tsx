import React, { useState } from "react";
import { X, User, Mail, Phone, ShieldCheck, ChevronRight, ChevronLeft, Check, Sparkles, ExternalLink, Calendar, Heart, Award, Lock, Info } from "lucide-react";
import { MembershipPlan } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { getWhatsAppLink } from "../utils/whatsapp";

interface MembershipModalProps {
  plan: MembershipPlan;
  onClose: () => void;
}

export default function MembershipModal({ plan, onClose }: MembershipModalProps) {
  const [step, setStep] = useState(1);
  const [ownerName, setOwnerName] = useState("");
  const [ownerCi, setOwnerCi] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Perro");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memberNumber] = useState(() => `CP-${Math.floor(10000 + Math.random() * 90000)}`);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!ownerName.trim()) newErrors.ownerName = "El nombre es obligatorio";
    if (!ownerCi.trim()) {
      newErrors.ownerCi = "La Cédula de Identidad es obligatoria";
    } else if (!/^[0-9.-]{7,11}$/.test(ownerCi.trim())) {
      newErrors.ownerCi = "Ingrese una Cédula de Identidad válida (ej. 1.234.567-8)";
    }
    if (!ownerPhone.trim()) {
      newErrors.ownerPhone = "El teléfono celular es obligatorio";
    } else if (!/^[0-9\s-]{8,15}$/.test(ownerPhone.trim())) {
      newErrors.ownerPhone = "Ingrese un número de teléfono válido";
    }
    if (!ownerEmail.trim()) {
      newErrors.ownerEmail = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(ownerEmail)) {
      newErrors.ownerEmail = "Ingrese un correo electrónico válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!petName.trim()) newErrors.petName = "El nombre de la mascota es obligatorio";
    if (!petAge.trim()) newErrors.petAge = "La edad es obligatoria";
    if (!petBreed.trim()) newErrors.petBreed = "La raza es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCheckoutRedirection = () => {
    setIsSubmitting(true);
    
    // Open Mercado Pago link in a new window/tab
    window.open(plan.mercadoPagoLink, "_blank", "noopener,noreferrer");

    // Advance to success step after a brief simulated processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  const getWhatsAppMessage = () => {
    return `¡Hola! Acabo de registrarme en el Plan de Socio de la veterinaria al *${plan.name}* y quiero coordinar la afiliación.
    
*Datos del Propietario:*
- Nombre: ${ownerName}
- C.I.: ${ownerCi}
- Teléfono: ${ownerPhone}
- Email: ${ownerEmail}
- Nro. Socio Asignado: ${memberNumber}

*Datos de la Mascota:*
- Mascota: ${petName} (${petType === "Perro" ? "🐶 Perro" : petType === "Gato" ? "🐱 Gato" : "🐹 Otro"})
- Edad: ${petAge} ${Number(petAge) === 1 ? "año" : "años"}
- Raza: ${petBreed}

Ya inicié el proceso de pago por Mercado Pago. ¡Muchas gracias!`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm" id="membership-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-brand-bg-warm rounded-none sm:rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full relative border border-brand-primary-light/40 h-full sm:h-auto max-h-full sm:max-h-[92vh] flex flex-col font-sans"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-brand-primary-light/40 flex items-center justify-between shrink-0 bg-brand-primary-light/20">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-brand-primary-light text-brand-primary border border-brand-primary-light">
              {plan.name}
            </span>
            <h3 className="font-display font-extrabold text-xl text-brand-text mt-1">
              Asociarse a la Veterinaria
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-brand-text-muted hover:text-brand-text p-2 hover:bg-brand-primary-light/50 rounded-full transition-colors cursor-pointer"
            aria-label="Cerrar modal de membresía"
            id="btn-close-membership"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (Only show if not success) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-brand-primary-light/10 border-b border-brand-primary-light/35 flex items-center justify-between text-xs font-semibold text-brand-text-muted shrink-0">
            <span className={step >= 1 ? "text-brand-primary font-bold" : ""}>1. Dueño</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 2 ? "text-brand-primary font-bold" : ""}>2. Mascota</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 3 ? "text-brand-primary font-bold" : ""}>3. Pago</span>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="bg-brand-primary-light/50 p-4 rounded-2xl border border-brand-primary-light flex items-start gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-text leading-relaxed">
                    Completá tus datos personales. Con esta información abriremos tu ficha de propietario para asociar los beneficios del club.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className={`w-full pl-10 pr-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                        errors.ownerName ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                      }`}
                    />
                  </div>
                  {errors.ownerName && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.ownerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Cédula de Identidad</label>
                  <input
                    type="text"
                    value={ownerCi}
                    onChange={(e) => setOwnerCi(e.target.value)}
                    placeholder="Ej. 1.234.567-8"
                    className={`w-full px-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                      errors.ownerCi ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                    }`}
                  />
                  {errors.ownerCi && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.ownerCi}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Celular / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                      <input
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="Ej. 099 123 456"
                        className={`w-full pl-10 pr-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                          errors.ownerPhone ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                        }`}
                      />
                    </div>
                    {errors.ownerPhone && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.ownerPhone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                      <input
                        type="email"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="juanperez@gmail.com"
                        className={`w-full pl-10 pr-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                          errors.ownerEmail ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                        }`}
                      />
                    </div>
                    {errors.ownerEmail && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.ownerEmail}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="bg-brand-primary-light/50 p-4 rounded-2xl border border-brand-primary-light flex items-start gap-3 mb-4">
                  <Heart className="w-5 h-5 text-brand-primary shrink-0 mt-0.5 fill-brand-primary/10" />
                  <p className="text-xs text-brand-text leading-relaxed">
                    Contanos sobre tu mascota. La membresía es individual para brindarle el mejor seguimiento médico personalizado.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Nombre de la Mascota</label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Ej. Coco, Luna, Rocco"
                    className={`w-full px-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                      errors.petName ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                    }`}
                  />
                  {errors.petName && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.petName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Especie</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Perro", "Gato", "Otro"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPetType(type)}
                        className={`py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                          petType === type
                            ? "bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/15"
                            : "bg-brand-bg-warm border-brand-primary-light text-brand-text-muted hover:bg-brand-primary-light/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Edad (Años)</label>
                    <input
                      type="number"
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      placeholder="Ej. 3"
                      min="0"
                      max="30"
                      className={`w-full px-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                        errors.petAge ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                      }`}
                    />
                    {errors.petAge && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.petAge}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-1.5 uppercase tracking-wider">Raza</label>
                    <input
                      type="text"
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      placeholder="Ej. Golden, Mestizo, Siamés"
                      className={`w-full px-4 py-2.5 bg-brand-bg-warm/50 border rounded-xl font-sans text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all ${
                        errors.petBreed ? "border-rose-400 focus:border-rose-400" : "border-brand-primary-light/60 focus:border-brand-primary"
                      }`}
                    />
                    {errors.petBreed && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.petBreed}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div className="bg-brand-primary-light/30 rounded-2xl p-5 border border-brand-primary-light">
                  <h4 className="font-display font-bold text-brand-text text-sm mb-3">Resumen de Asociación</h4>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                    <div>
                      <span className="text-brand-text-muted">Mascota:</span>
                      <p className="font-bold text-brand-text mt-0.5">{petName} ({petType === "Perro" ? "Perro" : petType === "Gato" ? "Gato" : "Otro"})</p>
                    </div>
                    <div>
                      <span className="text-brand-text-muted">Socio Titular:</span>
                      <p className="font-bold text-brand-text mt-0.5">{ownerName}</p>
                    </div>
                    <div>
                      <span className="text-brand-text-muted">Plan Seleccionado:</span>
                      <p className="font-bold text-brand-text mt-0.5">{plan.name}</p>
                    </div>
                    <div>
                      <span className="text-brand-text-muted">Costo Mensual:</span>
                      <p className="font-bold text-brand-primary mt-0.5">${plan.price} UYU / mes*</p>
                    </div>
                  </div>
                  <p className="text-[9px] text-brand-text-muted/60 mt-3 text-center font-medium">
                    * La facturación mensual se iniciará al confirmar el alta en la plataforma segura de Mercado Pago.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-brand-primary-light/80 bg-brand-primary-light/20 rounded-2xl p-5 text-center">
                    <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
                      Para culminar el alta y activar tus beneficios, Mercado Pago procesará de forma segura el débito mensual de tu tarjeta. Podés cancelar en cualquier momento sin contratos.
                    </p>
                    
                    <button
                      onClick={handleCheckoutRedirection}
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-sky-500/10 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Procesando...
                        </span>
                      ) : (
                        <>
                          Pagar con Mercado Pago
                          <ExternalLink className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <span className="text-[10px] text-brand-text-muted/60 flex items-center justify-center gap-1.5 mt-2">
                      <Lock className="w-3.5 h-3.5 text-brand-text-muted/60" />
                      Pago procesado de forma segura en Uruguay
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 text-center py-2"
              >
                        <div className="w-16 h-16 bg-brand-primary-light rounded-full flex items-center justify-center mx-auto text-brand-primary">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-2xl text-brand-text">
                    ¡Te damos la bienvenida al Club!
                  </h3>
                  <p className="text-sm text-brand-text-muted max-w-sm mx-auto mt-2 leading-relaxed">
                    Tu suscripción se ha procesado con éxito y tu mascota ya tiene cobertura médica preferencial.
                  </p>
                </div>

                {/* Digital Membership Card Mockup */}
                <div className="relative w-full max-w-xs sm:max-w-sm mx-auto bg-gradient-to-br from-brand-primary to-indigo-950 text-white p-4 sm:p-6 rounded-3xl shadow-xl overflow-hidden text-left border border-brand-primary-light/20">
                  {/* Decorative Elements inside card */}
                  <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full blur-lg pointer-events-none" />
                  <div className="absolute top-2 right-4 text-white/10 font-black text-6xl select-none leading-none">
                    VET
                  </div>

                  {/* Card content */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-display font-extrabold text-lg leading-none tracking-tight">VET PEDRENSE</h4>
                      <span className="text-[9px] uppercase tracking-widest text-brand-primary-light/80 mt-1 block">Socio Adherido</span>
                    </div>
                    <Award className="w-6 h-6 text-brand-primary-light/80 fill-white/10" />
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-brand-primary-light/70">Nombre de la Mascota</span>
                      <p className="font-display font-bold text-base leading-none text-white mt-0.5">{petName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-brand-primary-light/70">Socio Titular</span>
                        <p className="font-bold text-xs text-white truncate mt-0.5">{ownerName}</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-brand-primary-light/70 font-bold">Nro. de Socio</span>
                        <p className="font-bold text-xs text-brand-accent mt-0.5">{memberNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card bottom footer */}
                  <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between text-[9px] text-brand-primary-light/65">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-accent" />
                      <span>Desde: {new Date().toLocaleDateString("es-UY")}</span>
                    </div>
                    <span className="font-semibold text-white px-2 py-0.5 bg-white/10 rounded-full border border-white/5 uppercase">
                      {plan.name.replace("Plan ", "")}
                    </span>
                  </div>
                </div>

                {/* Important Next Step WhatsApp Action */}
                <div className="bg-brand-primary-light/30 p-5 rounded-2xl border border-brand-primary-light/60 text-left mt-6">
                  <span className="text-brand-primary font-bold text-xs flex items-center gap-1 mb-1.5">
                    <Info className="w-3.5 h-3.5" />
                    Coordinación de ficha clínica
                  </span>
                  <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
                    Para registrar la ficha clínica de tu mascota y coordinar tu primera consulta preventiva, por favor confirmá los datos con nuestro equipo por WhatsApp.
                  </p>
                  
                  <a
                    href={getWhatsAppLink(getWhatsAppMessage())}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-secondary/15 text-xs"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Confirmar alta por WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer Controls (Only if not step 4) */}
        {step < 4 && (
          <div className="p-6 border-t border-brand-primary-light/40 flex items-center justify-between shrink-0 bg-brand-primary-light/10">
            <div>
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-brand-text-muted hover:text-brand-text text-sm font-bold cursor-pointer border-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Atrás
                </button>
              ) : (
                <span className="text-xs text-brand-text-muted/60">Paso 1 de 3</span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-brand-primary-light text-brand-text font-bold text-xs rounded-xl hover:bg-brand-primary-light/50 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer border-none"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

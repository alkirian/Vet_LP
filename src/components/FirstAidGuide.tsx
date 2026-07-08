import React, { useState } from "react";
import { 
  ShieldAlert, 
  Skull, 
  Activity, 
  Thermometer, 
  Brain, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  ChevronRight,
  HeartPulse
} from "lucide-react";
import { contactInfo } from "../data";
import { getWhatsAppLink } from "../utils/whatsapp";
import { motion, AnimatePresence } from "motion/react";
import { FloatingPaws } from "./Logo";

// Types
interface FirstAidCase {
  id: string;
  title: string;
  severity: "critical" | "warning" | "info";
  severityLabel: string;
  whatToDo: string[];
  whatNotToDo: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  cases: FirstAidCase[];
}

export default function FirstAidGuide() {
  const [activeCategory, setActiveCategory] = useState<string>("accidentes");
  const [activeCaseId, setActiveCaseId] = useState<string>("atropellamiento");

  const categories: Category[] = [
    {
      id: "accidentes",
      name: "Accidentes & Heridas",
      icon: ShieldAlert,
      cases: [
        {
          id: "atropellamiento",
          title: "Atropellamiento o Caída de Altura",
          severity: "critical",
          severityLabel: "Urgencia Crítica",
          whatToDo: [
            "Mantén la calma y asegura la zona para evitar otros accidentes.",
            "Improvisa una camilla rígida (tabla, cartón grueso o manta tensada) para moverlo.",
            "Desplaza al animal con mucho cuidado, manteniendo su columna lo más recta posible.",
            "Arrópalo con una manta ligera para evitar que pierda calor (hipotermia por shock).",
            "Trasládalo de forma urgente a la clínica veterinaria llamando en el camino."
          ],
          whatNotToDo: [
            "No lo muevas bruscamente ni lo levantes del cuello o las patas.",
            "No intentes darle de beber agua o comer si está aturdido o inconsciente.",
            "No trates de acomodar huesos si sospechas de una fractura expuesta."
          ]
        },
        {
          id: "heridas",
          title: "Cortes y Heridas Sangrantes",
          severity: "warning",
          severityLabel: "Consulta Prioritaria",
          whatToDo: [
            "Presiona la zona afectada firmemente con una gasa estéril o un paño limpio y seco.",
            "Mantén la presión de forma constante durante al menos 5 a 10 minutos.",
            "Si el sangrado se detiene, limpia suavemente alrededor con agua tibia o suero fisiológico.",
            "Protege la herida con un vendaje suave y seco sin apretar en exceso.",
            "Llévalo a consulta para evaluar si requiere sutura o antibióticos."
          ],
          whatNotToDo: [
            "No apliques alcohol directo, agua oxigenada ni yodo en heridas abiertas profundas.",
            "No utilices algodón, ya que desprende fibras que se adhieren a la carne y causan infección.",
            "No quites la gasa para ver si sigue sangrando; coloca otra encima si se empapa."
          ]
        }
      ]
    },
    {
      id: "ingestas",
      name: "Ingestas Peligrosas",
      icon: Skull,
      cases: [
        {
          id: "intoxicacion",
          title: "Intoxicación por Chocolate o Dulces",
          severity: "warning",
          severityLabel: "Consulta Prioritaria",
          whatToDo: [
            "Intenta identificar qué tipo comió (el chocolate negro/cacao puro es el más tóxico) y la cantidad aproximada.",
            "Anota la hora estimada en que ocurrió la ingesta.",
            "Llama de inmediato a la clínica indicando el peso aproximado de tu mascota.",
            "Observa si presenta síntomas como hiperactividad, vómitos, jadeo excesivo o temblores."
          ],
          whatNotToDo: [
            "No induzcas el vómito si ya han pasado más de 2 horas desde la ingesta.",
            "No intentes inducir el vómito si tu mascota está aletargada, débil o inconsciente.",
            "No le des medicamentos humanos ni remedios caseros sin indicación del veterinario."
          ]
        },
        {
          id: "quimicos",
          title: "Ingesta de Venenos o Limpiadores",
          severity: "critical",
          severityLabel: "Urgencia Crítica",
          whatToDo: [
            "Retira el producto del alcance de la mascota de forma inmediata.",
            "Si el producto tocó la piel o los ojos, enjuaga con abundante agua tibia durante 15 minutos.",
            "Guarda el envase, etiqueta o muestra del producto ingerido para llevárselo al veterinario.",
            "Traslada a la mascota a la clínica con urgencia."
          ],
          whatNotToDo: [
            "No induzcas el vómito si ingirió productos corrosivos (ácidos, cloro, soda cáustica) ya que quemará el esófago al subir.",
            "No le des leche, aceite ni carbón activado casero, pues pueden acelerar la absorción de ciertos tóxicos."
          ]
        }
      ]
    },
    {
      id: "digestivos",
      name: "Problemas Digestivos",
      icon: Activity,
      cases: [
        {
          id: "torsion",
          title: "Torsión de Estómago (Abdomen Hinchado)",
          severity: "critical",
          severityLabel: "Urgencia Crítica",
          whatToDo: [
            "Reconoce las señales: intentos de vomitar sin éxito (arcadas secas), salivación abundante, abdomen duro, inflado y dolor al tacto.",
            "Observa si está muy inquieto, camina de lado o estira el cuerpo en forma de rezo.",
            "Lleva a la mascota de forma inmediata a la veterinaria. Cada minuto cuenta, es una afección letal.",
            "Llama en el trayecto para que el equipo prepare el quirófano y material de descompresión."
          ],
          whatNotToDo: [
            "No le des absolutamente nada de comer, beber ni analgésicos.",
            "No intentes presionar el abdomen ni masajearlo para desinflarlo.",
            "No esperes a ver si mejora por su cuenta; esta condición no remite sin cirugía."
          ]
        },
        {
          id: "vomitos",
          title: "Vómitos o Diarrea Aislados",
          severity: "info",
          severityLabel: "Monitoreo en Casa",
          whatToDo: [
            "Retira el alimento sólido por un lapso de 6 a 8 horas para dar descanso al estómago.",
            "Ofrece agua fresca en cantidades muy pequeñas pero frecuentes (de a cucharadas) para evitar deshidratación.",
            "Si pasadas las 8 horas no vuelve a vomitar, ofrece una dieta blanda (arroz blanco hervido y pollo sin piel ni sal) en porciones chicas.",
            "Si los vómitos continúan, hay sangre en la diarrea o notas decaimiento fuerte, acude a consulta."
          ],
          whatNotToDo: [
            "No automediques a tu mascota con medicamentos humanos de farmacia (como Reliveran o buscapina) sin dosis exacta.",
            "No dejes un plato lleno de agua a su libre disposición, ya que beber rápido le provocará más vómitos."
          ]
        }
      ]
    },
    {
      id: "calor",
      name: "Calor & Respiración",
      icon: Thermometer,
      cases: [
        {
          id: "golpe-calor",
          title: "Golpe de Calor",
          severity: "critical",
          severityLabel: "Urgencia Crítica",
          whatToDo: [
            "Retira inmediatamente a la mascota del sol o del ambiente caluroso.",
            "Colócala en un sitio fresco y bien ventilado (frente a un ventilador o aire acondicionado).",
            "Mójale el cuello, las axilas, las ingles y las almohadillas con agua templada o fresca (NO helada).",
            "Coloca toallas húmedas en esas zonas y cámbialas seguido a medida que se calienten.",
            "Ofrécele agua fresca, pero déjala beber despacio y sin obligarla.",
            "Llévala de inmediato a la veterinaria para estabilizar sus constantes."
          ],
          whatNotToDo: [
            "No uses agua helada ni cubos de hielo directos; provocará un cierre de vasos sanguíneos (vasoconstricción) y shock térmico.",
            "No cubras por completo al animal con toallas mojadas y lo dejes así, ya que retendrán el calor corporal como un invernadero."
          ]
        },
        {
          id: "asfixia",
          title: "Atragantamiento u Obstrucción de Vías",
          severity: "critical",
          severityLabel: "Urgencia Crítica",
          whatToDo: [
            "Si está consciente y de pie, intenta realizar la maniobra de Heimlich para mascotas: abraza al animal desde atrás por la cintura, coloca un puño bajo sus costillas y presiona hacia arriba y adelante con fuerza 4-5 veces.",
            "Si está inconsciente, ábrele el hocico con cuidado, tira de la lengua hacia afuera e intenta retirar el objeto visible con los dedos en forma de gancho.",
            "Si logras retirar el objeto, llévalo de todas formas para verificar que no haya daños en la garganta."
          ],
          whatNotToDo: [
            "No intentes empujar el objeto hacia adentro con los dedos si no puedes agarrarlo bien.",
            "No metas la mano a ciegas si el animal está despierto y asustado, ya que por reflejo puede morderte muy fuerte."
          ]
        }
      ]
    },
    {
      id: "otros",
      name: "Alertas de Comportamiento",
      icon: Brain,
      cases: [
        {
          id: "convulsion",
          title: "Convulsiones o Temblores Severos",
          severity: "critical",
          severityLabel: "Urgencia Crítica",
          whatToDo: [
            "Retira cualquier objeto cercano (mesas, sillas, escaleras) con el que la mascota pueda golpearse durante el espasmo.",
            "Apaga luces, televisores y mantén la habitación en absoluto silencio y calma para reducir estímulos cerebrales.",
            "Anota o graba con el celular la duración del ataque (esta información es clave para el diagnóstico).",
            "Una vez cese la convulsión, mantenlo abrigado y tranquilo en un lugar seguro, y acude de inmediato a urgencias."
          ],
          whatNotToDo: [
            "No intentes sujetarle la lengua ni meter los dedos en su boca; los perros no se tragan su lengua y corres riesgo de mordeduras graves.",
            "No trates de inmovilizarlo a la fuerza o abrazarlo apretado mientras convulsiona.",
            "No le des agua, comida ni medicamentos durante la crisis."
          ]
        }
      ]
    }
  ];

  // Helper to get active category and case details
  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];
  const currentCase = currentCategory.cases.find(c => c.id === activeCaseId) || currentCategory.cases[0];

  // Handler for category switch (auto selects first case of new category)
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const cat = categories.find(c => c.id === catId);
    if (cat && cat.cases.length > 0) {
      setActiveCaseId(cat.cases[0].id);
    }
  };

  return (
    <section id="primeros-auxilios" className="py-20 bg-brand-bg-warm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-brand-primary-light/50 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
      <FloatingPaws className="text-brand-primary-light/35" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="first-aid-header">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-secondary/15 text-brand-secondary border border-brand-secondary/20 mb-4 animate-pulse">
            <HeartPulse className="w-3.5 h-3.5" />
            Guía de Emergencias
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight mb-4">
            Guía Rápida de Primeros Auxilios y Síntomas
          </h2>
          <p className="font-sans text-brand-text-muted text-sm sm:text-base leading-relaxed">
            ¿Tu mascota está decaída o sufrió un accidente? Selecciona una categoría para saber cómo actuar de inmediato de forma segura mientras te comunicas con nosotros.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-4 py-2.5 rounded-xl max-w-2xl mx-auto">
            <Info className="w-4 h-4 shrink-0" />
            <span>IMPORTANTE: Esta guía es puramente informativa. Ninguna instrucción sustituye el diagnóstico clínico de un veterinario profesional.</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start" id="first-aid-content">
          
          {/* Left Column: Categories Selector */}
          <div className="lg:col-span-4 space-y-3" id="first-aid-categories">
            <span className="text-xs font-bold text-brand-text uppercase tracking-wider block mb-2 px-1">
              1. Selecciona un área:
            </span>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2.5 snap-x no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-3 px-4 py-3 sm:py-3.5 rounded-2xl border text-sm font-bold transition-all cursor-pointer shrink-0 snap-start min-h-[48px] lg:w-full ${
                      isActive
                        ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/10"
                        : "bg-white border-brand-primary-light text-brand-text-muted hover:border-brand-primary/45 hover:text-brand-text"
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? "text-brand-accent" : "text-brand-primary"}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Cases list for active category (Horizontal pill selector on desktop/mobile for cleaner layout) */}
            <div className="pt-4 border-t border-brand-primary-light/80 mt-4">
              <span className="text-xs font-bold text-brand-text uppercase tracking-wider block mb-2 px-1">
                2. Síntoma o Situación:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentCategory.cases.map((c) => {
                  const isSelected = activeCaseId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveCaseId(c.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-brand-primary-light border-brand-primary/30 text-brand-primary font-bold shadow-inner"
                          : "bg-white border-brand-primary-light text-brand-text-muted hover:bg-brand-primary-light/50"
                      }`}
                    >
                      <ChevronRight className={`w-3 h-3 ${isSelected ? "text-brand-primary" : "text-slate-300"}`} />
                      {c.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Case Details View */}
          <div className="lg:col-span-8" id="first-aid-details">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-organic-2 border border-brand-primary-light p-6 sm:p-8 shadow-xl shadow-brand-primary-light/40 relative overflow-hidden"
              >
                {/* Visual Severity Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-primary-light pb-5 mb-6">
                  <div>
                    <span className="text-[10px] text-brand-text-muted/70 uppercase tracking-widest font-bold">Protocolo de Emergencia</span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-text mt-0.5">
                      {currentCase.title}
                    </h3>
                  </div>

                  {/* Status pill with color mappings */}
                  <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 border w-fit ${
                    currentCase.severity === "critical"
                      ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                      : currentCase.severity === "warning"
                      ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      currentCase.severity === "critical"
                        ? "bg-rose-500 animate-ping"
                        : currentCase.severity === "warning"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`} />
                    {currentCase.severityLabel}
                  </span>
                </div>

                {/* Steps Section: Do's and Dont's */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* What to do (Green Checkmark) */}
                  <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-5">
                    <h4 className="font-display font-bold text-sm text-emerald-700 flex items-center gap-2 mb-3.5">
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      ¿QUÉ HACER? (Primeros Auxilios)
                    </h4>
                    <ul className="space-y-3">
                      {currentCase.whatToDo.map((step, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                          <span className="font-bold text-emerald-600 shrink-0 select-none">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What not to do (Red Cross) */}
                  <div className="bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl p-5">
                    <h4 className="font-display font-bold text-sm text-rose-700 flex items-center gap-2 mb-3.5">
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      ¿QUÉ EVITAR? (Advertencias)
                    </h4>
                    <ul className="space-y-3">
                      {currentCase.whatNotToDo.map((step, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                          <span className="font-black text-rose-500 shrink-0 select-none">✕</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Emergency Actions Footer inside Card */}
                <div className="border-t border-brand-primary-light pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold text-brand-text">¿Necesitas asistencia en Las Piedras?</p>
                    <p className="text-[10px] text-brand-text-muted">Estamos disponibles en nuestro horario habitual para ayudarte.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {/* Urgencia 24h/Critical trigger dynamic calling */}
                    {currentCase.severity === "critical" ? (
                      <a
                        href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-sans font-bold text-sm rounded-xl shadow-lg shadow-rose-600/15 hover:shadow-rose-600/25 transition-all hover:scale-[1.01] shrink-0 animate-pulse"
                      >
                        <Phone className="w-4 h-4" />
                        Llamar Urgencia ({contactInfo.phoneLandline})
                      </a>
                    ) : (
                      <a
                        href={`tel:${contactInfo.phoneLandline.replace(/\s+/g, "")}`}
                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-sans font-bold text-sm rounded-xl shadow-md transition-all hover:scale-[1.01]"
                      >
                        <Phone className="w-4 h-4" />
                        Llamar a la Clínica
                      </a>
                    )}

                    <a
                      href={getWhatsAppLink(`Hola! Tengo una duda médica urgente con mi mascota por un caso de *${currentCase.title}*.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-secondary hover:bg-brand-secondary/95 text-white font-sans font-bold text-sm rounded-xl shadow-md transition-all hover:scale-[1.01]"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Consultar WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Divisor curvo hacia Club de Socios */}
      <div id="curve-to-club" className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[80px]">
          <path d="M0,80 C480,0 960,100 1440,20 L1440,100 L0,100 Z" fill="var(--color-brand-primary)" />
        </svg>
      </div>
    </section>
  );
}

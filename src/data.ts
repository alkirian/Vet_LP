import { ServiceItem, BusinessHours, ContactInfo, MembershipPlan } from "./types";

export const businessHours: BusinessHours[] = [
  {
    dayGroup: "Lunes a Viernes",
    hours: "09:00 a 20:00 hs",
    isSpecial: false,
  },
  {
    dayGroup: "Sábados",
    hours: "09:00 a 17:00 hs",
    isSpecial: false,
  },
  {
    dayGroup: "Domingos",
    hours: "09:00 a 12:30 hs",
    isSpecial: true, // Special highlight for Sunday opening
  },
];

export const contactInfo: ContactInfo = {
  address: "Luis Batlle Berres s/n esquina Ruta 48",
  addressDetail: "Las Piedras, Canelones, Uruguay",
  phoneLandline: "2366 0012",
  phoneWhatsapp: "091 212 587",
  email: "contacto@veterinariapedrense.uy",
  // Standard Google Maps embed iframe or clean placeholder. We can use a direct Google Maps view or a stylized interactive preview.
  // Location: Las Piedras, Canelones, Uruguay. Luis Batlle Berres & Ruta 48
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4739502909455!2d-56.2232599!3d-34.71183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a133dfda6be4fb%3A0xe7a5610ecfb9fc5f!2sLuis%20Batlle%20Berres%20%26%20Ruta%2048%2C%20Las%20Piedras%2C%20Canelones%20Department!5e0!3m2!1sen!2suy!4v1700000000000!5m2!1sen!2suy",
  mapExternalUrl: "https://maps.google.com/?q=Luis+Batlle+Berres+y+Ruta+48,+Las+Piedras,+Canelones,+Uruguay",
};

export const servicesData: ServiceItem[] = [
  {
    id: "consulta-clinica",
    title: "Consulta Clínica",
    description: "Evaluaciones completas con todo el amor y paciencia que tu compañero merece, buscando siempre prevenir y cuidar su salud en cada etapa de su vida.",
    iconName: "Stethoscope",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=600&auto=format&fit=crop",
    details: [
      "Chequeos generales preventivos",
      "Vacunación y desparasitación al día",
      "Diagnóstico y tratamiento de enfermedades agudas y crónicas",
      "Asesoramiento nutricional y cuidado diario",
      "Atención preferencial de urgencias durante el horario de atención"
    ]
  },
  {
    id: "cirugias-castraciones",
    title: "Cirugías & Castraciones",
    description: "Procedimientos quirúrgicos con tecnología moderna y un cuidado postoperatorio sumamente afectuoso para asegurar una recuperación rápida y sin dolor.",
    iconName: "Scissors",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=600&auto=format&fit=crop",
    details: [
      "Castraciones y esterilizaciones programadas",
      "Cirugías de tejidos blandos",
      "Monitoreo anestésico multiparamétrico continuo",
      "Manejo avanzado del dolor postoperatorio",
      "Instrucciones y seguimiento detallado post-quirúrgico"
    ]
  },
  {
    id: "farmacia-veterinaria",
    title: "Farmacia Veterinaria",
    description: "Medicamentos de confianza y tratamientos específicos seleccionados con seguridad para aliviar y proteger a tu mascota de forma inmediata.",
    iconName: "Pills",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?q=80&w=600&auto=format&fit=crop",
    details: [
      "Antibióticos y antiinflamatorios recetados",
      "Antiparasitarios internos y externos de primeras marcas",
      "Suplementos vitamínicos y condroprotectores",
      "Tratamientos dermatológicos y oftálmicos especializados",
      "Asesoramiento farmacéutico profesional"
    ]
  },
  {
    id: "pet-shop",
    title: "Pet Shop",
    description: "Alimentos premium de alta calidad, accesorios confortables y juguetes seguros elegidos especialmente para hacerlos muy felices todos los días.",
    iconName: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600&auto=format&fit=crop",
    details: [
      "Alimentos balanceados de líneas terapéuticas y premium",
      "Accesorios de paseo: collares, pretales, correas reforzadas",
      "Juguetes didácticos y de estimulación para perros y gatos",
      "Rascadores y bandejas sanitarias",
      "Artículos de higiene: champús hipoalergénicos, cepillos y colonias"
    ]
  }
];

export const faqData = [
  {
    question: "¿Es necesario agendar turno para una consulta general?",
    answer: "Para optimizar el tiempo de espera, sugerimos agendar la consulta de forma anticipada. De todas maneras, atendemos urgencias y consultas espontáneas por orden de llegada dentro de nuestro horario habitual."
  },
  {
    question: "¿Qué debo tener en cuenta antes de una cirugía o castración?",
    answer: "Sí, todo procedimiento quirúrgico requiere ayuno previo de sólidos y líquidos de 8 a 12 horas. Al momento de coordinar la cirugía, le brindaremos las indicaciones exactas según la edad y especie del paciente."
  },
  {
    question: "¿Abren los domingos?",
    answer: "Sí. Atendemos los domingos de mañana de 09:00 a 12:30 hs para consultas programadas de fin de semana y asistencia de urgencias dentro de ese horario."
  },
  {
    question: "¿En qué consiste el Plan de Socios y cómo funciona la membresía?",
    answer: "El Plan de Socios es un programa de cobertura médica prepaga. Mediante una cuota mensual fija, accede a consultas clínicas generales bonificadas sin límite, vacunación anual y descuentos en pet shop, farmacia y alimentos. El cobro se realiza automáticamente a través de Mercado Pago."
  },
  {
    question: "¿Tengo un período mínimo de permanencia al asociarme?",
    answer: "No hay período de permanencia mínima. Puede cancelar la membresía en cualquier momento directamente desde su perfil de Mercado Pago o comunicándolo a la clínica antes de que se emita la facturación del siguiente período."
  },
  {
    question: "¿Los descuentos aplican para cualquier mascota que tenga?",
    answer: "Sí, la membresía es individual por mascota registrada para llevar un correcto control del historial clínico. Si cuenta con más de una mascota, puede asociar a cada una de forma independiente en el plan que prefiera."
  }
];

export const testimonials = [
  {
    name: "María Eugenia Rodríguez",
    role: "Dueña de 'Coco' (Pug)",
    text: "La atención de la veterinaria es excelente. Los domingos de mañana me han salvado la vida cuando Coco estuvo con alergia. Súper recomendados, muy profesionales y con un trato muy dulce.",
    stars: 5
  },
  {
    name: "Juan Manuel Bentancor",
    role: "Dueño de 'Luna' y 'Simba' (Gatos)",
    text: "Excelente clínica en Las Piedras. Castré a mis dos gatos aquí y la recuperación fue rapidísima gracias a las indicaciones claras y el cariño con el que los trataron. Compro siempre el alimento terapéutico acá.",
    stars: 5
  },
  {
    name: "Clara Geymonat",
    role: "Dueña de 'Rocco' (Golden Retriever)",
    text: "Tienen un pet shop completísimo y la atención veterinaria es impecable. Se nota que aman a los animales y la ubicación es muy cómoda sobre Batlle Berres con lugar para estacionar.",
    stars: 5
  }
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: "plan-socio",
    name: "Socio Protector",
    price: "1.200",
    frequency: "mes",
    popular: true,
    color: "blue",
    benefits: [
      "Consultas clínicas generales 100% bonificadas (sin límite)",
      "Vacunación anual obligatoria 100% incluida (Antirrábica + Séxtuple/Triple Felina)",
      "15% de descuento en Farmacia Veterinaria",
      "10% de descuento en Pet Shop (accesorios y juguetes)",
      "10% de descuento en Alimentos Balanceados (premium y prescripción)",
      "1 Castración programada bonificada al 50% anual",
      "Orientación de urgencias y consultas por WhatsApp 24/7",
      "Prioridad alta en reservas de turnos"
    ],
    // Test payment link - users can replace this with their actual MP subscription link
    mercadoPagoLink: "https://www.mercadopago.com.uy/subscriptions/checkout?preapproval_plan_id=2c9380848037ea4e0180416b99330263"
  }
];

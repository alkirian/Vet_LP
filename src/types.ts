export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  details: string[];
}

export interface BusinessHours {
  dayGroup: string;
  hours: string;
  isSpecial?: boolean;
}

export interface ContactInfo {
  address: string;
  addressDetail: string;
  phoneLandline: string;
  phoneWhatsapp: string;
  email: string;
  mapEmbedUrl: string;
  mapExternalUrl: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number | string;
  frequency: string;
  popular: boolean;
  benefits: string[];
  color: string;
  mercadoPagoLink: string;
}

export interface LostOrAdoptablePet {
  id: string;
  name: string;
  type: "dog" | "cat";
  status: "adoptable" | "lost" | "found";
  gender: "macho" | "hembra";
  age?: string;
  size?: "chico" | "mediano" | "grande";
  location?: string;
  date?: string;
  image: string;
  story: string;
  health?: string[];
  contactText: string;
}



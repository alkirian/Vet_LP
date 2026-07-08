import { contactInfo } from "../data";

export function getCleanWhatsappNumber(): string {
  return contactInfo.phoneWhatsapp.replace(/\s+/g, "");
}

export function getWhatsAppLink(rawText?: string): string {
  const cleanNumber = getCleanWhatsappNumber();
  const textParam = rawText ? `&text=${encodeURIComponent(rawText)}` : "";
  return `https://api.whatsapp.com/send?phone=598${cleanNumber}${textParam}`;
}

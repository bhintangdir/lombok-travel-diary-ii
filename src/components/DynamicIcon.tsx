import React from "react";
import * as LucideIcons from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import InstagramIcon from "@/components/InstagramIcon";
import TikTokIcon from "@/components/TikTokIcon";

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = "w-6 h-6", size = 24 }: DynamicIconProps) {
  if (!name) return null;

  // Cek jika WhatsApp
  if (name.toLowerCase() === "whatsapp" || name.toLowerCase() === "wa") {
    return <WhatsAppIcon className={className} size={size} />;
  }

  // Cek jika Instagram
  if (name.toLowerCase() === "instagram" || name.toLowerCase() === "ig") {
    return <InstagramIcon className={className} size={size} />;
  }

  // Cek jika TikTok
  if (name.toLowerCase() === "tiktok" || name.toLowerCase() === "tt") {
    return <TikTokIcon className={className} size={size} />;
  }

  // Bersihkan nama icon (contoh: "CarTaxiFront", "Palmtree", dll)
  const formattedName = name
    .replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toUpperCase());

  // @ts-expect-error Lucide icons index signature
  const IconComponent = LucideIcons[formattedName] || LucideIcons[name];

  if (IconComponent) {
    return <IconComponent className={className} size={size} />;
  }

  // Fallback icon jika tidak ditemukan
  const HelpCircle = LucideIcons.HelpCircle;
  return <HelpCircle className={className} size={size} />;
}

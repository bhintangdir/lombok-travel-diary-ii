"use client";

import React from "react";
import { useContent } from "@/context/ContentContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function StickyWa() {
  const { content } = useContent();
  const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.nav.book_now_message)}`;

  return (
    <a
      className="wa"
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ display: "grid", placeItems: "center" }}
    >
      <WhatsAppIcon className="w-8 h-8 text-white" size={32} />
    </a>
  );
}

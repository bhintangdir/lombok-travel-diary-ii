"use client";

import React from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useContent } from "@/context/ContentContext";

export default function StickyWa() {
  const { content } = useContent();

  const waUrl = `https://wa.me/${content.contact?.whatsapp || "6285138939835"}?text=${encodeURIComponent(
    content.nav?.book_now_message || "Hi Lombok Travel Diary! I would like to plan a trip to Lombok."
  )}`;

  return (
    <a
      className="fab"
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon size={34} className="fab-wa-icon" />
    </a>
  );
}

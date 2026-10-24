import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact – Lombok Travel Diary",
  description: "Contact Lombok Travel Diary via WhatsApp, email or visit our office. Send your trip details and get a free plan within hours.",
  alternates: {
    canonical: "https://lomboktraveldiary.com/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}

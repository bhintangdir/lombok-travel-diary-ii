import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us – Lombok Travel Diary",
  description: "Meet the local team behind Lombok Travel Diary: private tours, rentals and transfers, booked easily via WhatsApp.",
  alternates: {
    canonical: "https://lomboktraveldiary.com/about",
  },
};

export default function Page() {
  return <AboutClient />;
}

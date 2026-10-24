import type { Metadata } from "next";
import HomeClient from "@/app/home/HomeClient";

export const metadata: Metadata = {
  title: "Lombok Travel Diary – Tour Packages, Car Rental & Airport Transfer",
  description: "Book your Lombok tour via WhatsApp. Island hopping, Rinjani views, waterfalls, car & scooter rental, airport and harbour transfers.",
  alternates: {
    canonical: "https://lomboktraveldiary.com",
  },
  openGraph: {
    title: "Lombok Travel Diary – Tour Packages & Private Trips",
    description: "Write your own Lombok diary with private local tours, island hopping, and honest prices booked directly via WhatsApp.",
    url: "https://lomboktraveldiary.com",
    siteName: "Lombok Travel Diary",
    type: "website",
  },
};

export default function Page() {
  return <HomeClient />;
}

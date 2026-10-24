import type { Metadata } from "next";
import TourPackageClient from "./TourPackageClient";

export const metadata: Metadata = {
  title: "Tour Packages – Lombok Travel Diary",
  description: "Private Lombok tour packages: Gili island hopping, south beaches, waterfalls, Rinjani sunrise and custom itineraries. Book via WhatsApp.",
  alternates: {
    canonical: "https://lomboktraveldiary.com/tour-package",
  },
};

export default function Page() {
  return <TourPackageClient />;
}

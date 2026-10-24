import type { Metadata } from "next";
import DestinationClient from "./DestinationClient";

export const metadata: Metadata = {
  title: "Destinations & Places Guide – Lombok Travel Diary",
  description: "Explore Lombok's dream destinations: Gili Islands, Kuta Mandalika, Mount Rinjani, Pink Beach, waterfalls and secret islands. Travel tips & guides.",
  alternates: {
    canonical: "https://lomboktraveldiary.com/destination",
  },
};

export default function Page() {
  return <DestinationClient />;
}

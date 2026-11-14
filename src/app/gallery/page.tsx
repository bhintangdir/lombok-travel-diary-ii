import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Photo Moments & Tour Gallery – Lombok Travel Diary",
  description: "Browse real photo moments across all Lombok tour packages and destinations. Explore waterfalls, secret Gilis, white sand beaches, and Rinjani sunrises.",
  alternates: {
    canonical: "https://lomboktraveldiary.com/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}


import type { Metadata } from "next";
import defaultContent from "@/data/content.json";
import TourDetailClient from "./TourDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = defaultContent.tours.find(
    (t) => t.slug === slug || t.id === slug
  );

  if (!tour) {
    return {
      title: "Tour Not Found | Lombok Travel Diary",
    };
  }

  return {
    title: `${tour.name} – Lombok Travel Diary`,
    description: tour.tagline,
  };
}

export function generateStaticParams() {
  return defaultContent.tours.map((t) => ({
    slug: t.slug,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <TourDetailClient slug={slug} />;
}

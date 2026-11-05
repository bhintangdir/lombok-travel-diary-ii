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

  const title = `${tour.name} – Lombok Travel Diary`;
  const description = tour.tagline || tour.overview?.slice(0, 160);
  const ogImage = tour.image?.startsWith("http")
    ? tour.image
    : tour.image?.startsWith("/")
    ? tour.image
    : "/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: tour.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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

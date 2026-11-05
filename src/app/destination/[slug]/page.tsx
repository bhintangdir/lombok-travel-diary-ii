import type { Metadata } from "next";
import defaultContent from "@/data/content.json";
import DestinationDetailClient from "./DestinationDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = defaultContent.destinations.items.find(
    (d: any) => d.slug === slug || d.id === slug
  );

  if (!destination) {
    return {
      title: "Destination Not Found | Lombok Travel Diary",
    };
  }

  const title = `${destination.name || destination.title} – Lombok Travel Diary`;
  const description = destination.tagline || destination.overview?.slice(0, 160);
  const ogImage = destination.image?.startsWith("http")
    ? destination.image
    : destination.image?.startsWith("/")
    ? destination.image
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
          alt: destination.name || destination.title,
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
  return defaultContent.destinations.items.map((d: any) => ({
    slug: d.slug || d.id,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <DestinationDetailClient slug={slug} />;
}

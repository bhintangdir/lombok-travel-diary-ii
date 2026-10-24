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

  return {
    title: `${destination.name || destination.title} – Lombok Travel Diary`,
    description: destination.tagline,
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

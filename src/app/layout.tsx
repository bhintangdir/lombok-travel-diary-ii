import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyWa from "@/components/StickyWa";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ContentProvider } from "@/context/ContentContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://lomboktraveldiary.com"),
  title: {
    default: "Lombok Travel Diary – Tour Packages, Car Rental & Airport Transfer",
    template: "%s | Lombok Travel Diary",
  },
  description:
    "Explore Lombok like an open travel journal. Private tours, 3 Gili island hopping, Sembalun trekking, secret waterfalls, and car rental with driver. Book direct via WhatsApp.",
  keywords: [
    "lombok travel diary",
    "lombok tour packages",
    "lombok car rental with driver",
    "lombok airport transfer",
    "gili islands hopping tour",
    "sembalun rinjani tour",
    "secret gili snorkeling",
    "benang kelambu waterfall",
    "kuta lombok tour",
    "lomboktraveldiary.com",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "https://lomboktraveldiary.com",
  },
  openGraph: {
    title: "Lombok Travel Diary – Tour Packages, Car Rental & Airport Transfer",
    description:
      "Explore Lombok like an open travel journal. Private tours, Gili island hopping, Sembalun trekking, secret waterfalls & car rental with driver. Direct WhatsApp booking.",
    url: "https://lomboktraveldiary.com",
    siteName: "Lombok Travel Diary",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lombok Travel Diary – Private Tours, Car Rental & Airport Transfer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lombok Travel Diary – Tour Packages, Car Rental & Airport Transfer",
    description:
      "Explore Lombok like an open travel journal. Private tours, Gili island hopping, Sembalun trekking, secret waterfalls & car rental with driver.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ContentProvider>
          <Navbar />
          {children}
          <Footer />
          <StickyWa />
          <MobileBottomNav />
        </ContentProvider>
      </body>
    </html>
  );
}

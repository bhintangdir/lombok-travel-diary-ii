"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Compass,
  MapPin,
  Sparkles,
  CheckCircle2,
  ZoomIn,
  Gem,
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export interface GalleryItem {
  id: string;
  sourceType: "tour" | "destination";
  title: string;
  subtitle: string;
  location: string;
  isGem: boolean;
  category: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  relatedTour: {
    name: string;
    slug: string;
    imageUrl: string;
    category: string;
    duration: string;
    tagline: string;
  } | null;
  destinationSlug?: string;
}

export default function GalleryClient() {
  const { content } = useContent();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    if (activeItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  const waNumber = content.contact?.whatsapp || "6285138939835";
  const waUrl = (msg: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  // Build combined gallery from tours and destinations
  const galleryItems = useMemo<GalleryItem[]>(() => {
    const items: GalleryItem[] = [];
    const tours: any[] = content.tours || [];
    const tourMap = new Map<string, any>();
    tours.forEach((t) => {
      if (t.slug) tourMap.set(t.slug, t);
    });

    const seenTourImages = new Set<string>();

    // Helper to determine region for tour packages
    const getTourRegion = (t: any) => {
      const text = `${t.name || ""} ${t.slug || ""} ${t.tagline || ""} ${t.overview || ""}`.toLowerCase();
      if (text.includes("secret gili") || text.includes("sekotong") || text.includes("pelangan") || text.includes("teluk sepi")) return "Southwest Lombok";
      if (text.includes("gili")) return "North Lombok";
      if (text.includes("sembalun") || text.includes("rinjani") || text.includes("pergasingan") || text.includes("dandaun") || text.includes("anak dara") || text.includes("kondo")) return "Sembalun, East Lombok";
      if (text.includes("klu") || text.includes("north lombok") || text.includes("senaru") || text.includes("tiu kelep")) return "North Lombok";
      if (text.includes("south lombok") || text.includes("mandalika") || text.includes("kuta") || text.includes("merese") || text.includes("selong belanak")) return "South Lombok";
      if (text.includes("central lombok") || text.includes("tetebatu") || text.includes("benang") || text.includes("sasak") || text.includes("sade") || text.includes("sukarara")) return "Central Lombok";
      if (text.includes("mataram") || text.includes("ampenan")) return "Mataram City";
      if (text.includes("sumbawa")) return "Sumbawa Island";
      return "Lombok";
    };

    // 1. Tour Packages
    tours.forEach((t) => {
      if (t.image && !seenTourImages.has(t.image)) {
        seenTourImages.add(t.image);
        const slug = (t.slug || t.id || "").toLowerCase();
        const catRaw = (t.category || t.category_label || "").toLowerCase();
        const isGem =
          t.is_hidden_gem ||
          catRaw.includes("gem") ||
          slug.includes("dandaun") ||
          slug.includes("kondo") ||
          slug.includes("anak-dara") ||
          slug.includes("secret-gili") ||
          slug.includes("semeti") ||
          slug.includes("bloam") ||
          slug.includes("mangku") ||
          slug.includes("beleq");

        const loc = t.region || t.location || getTourRegion(t);

        // Add main image
        items.push({
          id: `tour-${t.slug || t.id}`,
          sourceType: "tour",
          title: t.name,
          subtitle: t.duration ? `${t.duration} · ${t.category_label || t.category || "Tour Package"}` : (t.category_label || "Tour Package"),
          location: loc,
          isGem,
          category: t.category_label || t.category || "Tour Package",
          imageUrl: t.image,
          description: t.overview || t.tagline || "",
          highlights: t.highlights || [],
          relatedTour: {
            name: t.name,
            slug: t.slug,
            imageUrl: t.image,
            category: t.category_label || t.category || "Tour Package",
            duration: t.duration || "Full Day",
            tagline: t.tagline || "",
          },
        });

        // Add extra gallery images from public/pics if available
        if (Array.isArray(t.gallery)) {
          t.gallery.forEach((gImg: string, gIdx: number) => {
            if (gImg && !seenTourImages.has(gImg)) {
              seenTourImages.add(gImg);
              items.push({
                id: `tour-${t.slug || t.id}-g-${gIdx}`,
                sourceType: "tour",
                title: `${t.name}`,
                subtitle: t.duration ? `${t.duration} · ${t.category_label || t.category || "Tour Package"}` : (t.category_label || "Tour Package"),
                location: loc,
                isGem,
                category: t.category_label || t.category || "Tour Package",
                imageUrl: gImg,
                description: t.overview || t.tagline || "",
                highlights: t.highlights || [],
                relatedTour: {
                  name: t.name,
                  slug: t.slug,
                  imageUrl: t.image,
                  category: t.category_label || t.category || "Tour Package",
                  duration: t.duration || "Full Day",
                  tagline: t.tagline || "",
                },
              });
            }
          });
        }
      }
    });

    // 2. Destinations
    const destItems: any[] = content.destinations?.items || [];
    destItems.forEach((d) => {
      const img = d.image || d.bg_image;
      if (!img) return;

      const slug = (d.slug || d.id || "").toLowerCase();
      const catRaw = (d.category || "").toLowerCase();
      const isGem =
        d.is_hidden_gem ||
        catRaw.includes("gem") ||
        slug.includes("dandaun") ||
        slug.includes("kondo") ||
        slug.includes("anak-dara") ||
        slug.includes("secret-gili") ||
        slug.includes("semeti") ||
        slug.includes("bloam") ||
        slug.includes("mangku") ||
        slug.includes("beleq");

      const loc = d.region || d.location || "Lombok";
      const relTour = d.recommended_tour_slug ? tourMap.get(d.recommended_tour_slug) : null;

      items.push({
        id: `dest-${d.slug || d.id}`,
        sourceType: "destination",
        title: d.name || d.title,
        subtitle: `${d.region ? d.region + " · " : ""}${d.category_label || "Destination"}`,
        location: loc,
        isGem,
        category: d.category_label || d.region || "Destination",
        imageUrl: img,
        description: d.overview || d.tagline || "",
        highlights: d.highlights || [],
        relatedTour: relTour
          ? {
              name: relTour.name,
              slug: relTour.slug,
              imageUrl: relTour.image,
              category: relTour.category_label || relTour.category || "Tour Package",
              duration: relTour.duration || "Full Day",
              tagline: relTour.tagline || "",
            }
          : null,
        destinationSlug: d.slug,
      });

      // Add extra gallery images from public/pics if available for destination
      if (Array.isArray(d.gallery)) {
        d.gallery.forEach((gImg: string, gIdx: number) => {
          if (gImg && gImg !== img) {
            items.push({
              id: `dest-${d.slug || d.id}-g-${gIdx}`,
              sourceType: "destination",
              title: `${d.name || d.title}`,
              subtitle: `${d.region ? d.region + " · " : ""}${d.category_label || "Destination"}`,
              location: loc,
              isGem,
              category: d.category_label || d.region || "Destination",
              imageUrl: gImg,
              description: d.overview || d.tagline || "",
              highlights: d.highlights || [],
              relatedTour: relTour
                ? {
                    name: relTour.name,
                    slug: relTour.slug,
                    imageUrl: relTour.image,
                    category: relTour.category_label || relTour.category || "Tour Package",
                    duration: relTour.duration || "Full Day",
                    tagline: relTour.tagline || "",
                  }
                : null,
              destinationSlug: d.slug,
            });
          }
        });
      }
    });

    return items;
  }, [content]);

  return (
    <main>
      {/* 1. HERO BANNER */}
      <section className="hero sm">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Gallery</span>
          </div>
          <h1>
            Lombok Moments &amp; <span className="text-[#F2A541]">Visual Diary</span>
          </h1>
          <p>
            Browse real photo moments captured across all our Lombok tour packages and iconic destinations. Click any photo to see its story and explore the tour package or destination guide.
          </p>
        </div>
      </section>

      {/* 2. GALLERY GRID */}
      <section style={{ background: "var(--mist)", padding: "50px 0 80px" }}>
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "24px",
            }}
          >
            {galleryItems.map((item) => (
              <figure
                key={item.id}
                onClick={() => setActiveItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveItem(item);
                  }
                }}
                title="Click to view details"
                style={{
                  cursor: "pointer",
                  margin: 0,
                  background: "#ffffff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 18px rgba(4, 58, 75, 0.08)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="gallery-card-hover"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    overflow: "hidden",
                    background: "#043A4B",
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  {item.isGem ? (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(4, 58, 75, 0.92)",
                        color: "var(--sun)",
                        fontWeight: 700,
                        fontSize: "0.74rem",
                        padding: "5px 12px",
                        borderRadius: "999px",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        zIndex: 2,
                      }}
                    >
                      <Gem
                        size={12}
                        strokeWidth={2.4}
                        style={{ color: "#F2A541", stroke: "#F2A541" }}
                      />
                      Hidden Gem
                    </span>
                  ) : (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(4, 58, 75, 0.9)",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "0.76rem",
                        padding: "5px 12px",
                        borderRadius: "999px",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        zIndex: 2,
                      }}
                    >
                      <MapPin size={11} strokeWidth={2.5} />
                      {item.location}
                    </span>
                  )}
                  <span className="slide-zoom-pill">
                    <ZoomIn size={13} strokeWidth={2.4} />
                    Click to view
                  </span>
                </div>

                <figcaption
                  style={{
                    padding: "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.08rem",
                      fontWeight: 700,
                      color: "var(--deep)",
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      display: "block",
                      marginTop: "2px",
                    }}
                  >
                    {item.subtitle}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MODAL POPUP (EXACTLY MATCHING HOME PAGE GALLERY MODAL) */}
      {activeItem && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setActiveItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-page-modal-title"
        >
          <div
            className="gallery-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setActiveItem(null)}
              aria-label="Close details"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Modal Image */}
            <div className="gallery-modal-img">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                sizes="(max-width: 900px) 100vw, 860px"
                className="object-cover"
                loading="lazy"
              />
              <span className="gallery-modal-loc">
                <MapPin size={14} />
                {activeItem.subtitle}
              </span>
            </div>

            {/* Modal Content */}
            <div className="gallery-modal-body">
              <div className="gallery-modal-sub">
                {activeItem.sourceType === "tour" ? "Tour Package Moment" : "Destination Landmark"}
              </div>
              <h3 id="gallery-page-modal-title" className="gallery-modal-title">
                {activeItem.title}
              </h3>
              <p className="gallery-modal-desc">{activeItem.description}</p>

              {/* Highlights tags if available */}
              {activeItem.highlights && activeItem.highlights.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--ocean)",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Sparkles size={14} />
                    Highlights &amp; Experiences:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {activeItem.highlights.slice(0, 4).map((hl, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "0.82rem",
                          background: "var(--mist)",
                          border: "1px solid #e2e8f0",
                          color: "var(--deep)",
                          padding: "5px 12px",
                          borderRadius: "999px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <CheckCircle2 size={13} style={{ color: "var(--sea)" }} />
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Tour Package / Linked Tour Card */}
              {activeItem.relatedTour ? (
                <div className="gallery-featured-card">
                  <span className="gfc-eyebrow">
                    {activeItem.sourceType === "tour" ? "Book This Tour Package:" : "Featured in Tour Package:"}
                  </span>
                  <div className="gfc-body">
                    <div className="gfc-thumb">
                      <Image
                        src={activeItem.relatedTour.imageUrl}
                        alt={activeItem.relatedTour.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="gfc-details">
                      <div className="gfc-badges">
                        <span className="gfc-badge-cat">{activeItem.relatedTour.category}</span>
                        <span className="gfc-badge-dur">{activeItem.relatedTour.duration}</span>
                      </div>
                      <h4 className="gfc-tour-name">{activeItem.relatedTour.name}</h4>
                      <p className="gfc-tagline">{activeItem.relatedTour.tagline}</p>
                      <div className="gfc-actions">
                        <Link
                          href={`/tour-package/${activeItem.relatedTour.slug}`}
                          className="gfc-btn-view"
                          onClick={() => setActiveItem(null)}
                        >
                          View Tour Package →
                        </Link>
                        {activeItem.destinationSlug && (
                          <Link
                            href={`/destination/${activeItem.destinationSlug}`}
                            className="gfc-btn-view"
                            style={{ background: "#f1f5f9", color: "var(--deep)", borderColor: "#cbd5e1" }}
                            onClick={() => setActiveItem(null)}
                          >
                            Read Destination Guide
                          </Link>
                        )}
                        <a
                          href={waUrl(
                            `Hello Lombok Travel Diary! I saw ${activeItem.title} in your gallery and I am interested in: ${activeItem.relatedTour.name}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gfc-btn-wa"
                        >
                          <WhatsAppIcon size={14} />
                          Enquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeItem.destinationSlug ? (
                <div className="gallery-featured-card">
                  <span className="gfc-eyebrow">Destination Information:</span>
                  <div className="gfc-actions" style={{ marginTop: "10px" }}>
                    <Link
                      href={`/destination/${activeItem.destinationSlug}`}
                      className="gfc-btn-view"
                      onClick={() => setActiveItem(null)}
                    >
                      Read Destination Guide →
                    </Link>
                    <a
                      href={waUrl(
                        `Hello Lombok Travel Diary! I saw ${activeItem.title} in your gallery and I would like to visit here on a custom trip.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gfc-btn-wa"
                    >
                      <WhatsAppIcon size={14} />
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


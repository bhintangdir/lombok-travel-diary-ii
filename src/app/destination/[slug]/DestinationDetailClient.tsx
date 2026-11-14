"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Gem, Sparkles, ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

interface Props {
  slug: string;
}

export default function DestinationDetailClient({ slug }: Props) {
  const { content } = useContent();

  const destination: any = content.destinations?.items?.find(
    (d: any) => d.slug === slug || d.id === slug
  );

  if (!destination) {
    return notFound();
  }

  const name = destination.name || destination.title;
  const waNumber = content.contact?.whatsapp || "6285138939835";
  const inquiryMsg = `Hello Lombok Travel Diary! I am interested in visiting ${name} (${destination.region || destination.location || "Lombok"}). Please share private tour and driver details.`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(inquiryMsg)}`;

  const heroImage = destination.image?.startsWith("http")
    ? destination.image
    : destination.image?.startsWith("/")
    ? destination.image
    : `https://images.unsplash.com/${destination.image || "photo-1506905925346-21bda4d32df4"}?auto=format&fit=crop&w=1800&q=70`;

  const galleryList = Array.isArray(destination.gallery) && destination.gallery.length > 0 ? destination.gallery : [];
  const g1 = galleryList[0] || heroImage;
  const g2 = galleryList[1] || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=70";
  const g3 = galleryList[2] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70";

  // Find linked tour
  const linkedTour: any = (content.tours || []).find((t: any) =>
    (t.destinations || []).some((d: any) => {
      const dStr = typeof d === "string" ? d.toLowerCase() : (d.id || d.name || "").toLowerCase();
      return dStr.includes(slug) || slug.includes(dStr);
    })
  );

  const relatedDests = (content.destinations?.items || [])
    .filter((d: any) => (d.slug || d.id) !== slug)
    .slice(0, 3);

  const isGem =
    destination.is_hidden_gem ||
    destination.badge?.toLowerCase().includes("hidden") ||
    slug.includes("dandaun") ||
    slug.includes("kondo") ||
    slug.includes("anak-dara") ||
    slug.includes("secret-gili") ||
    slug.includes("semeti") ||
    slug.includes("bloam") ||
    slug.includes("mangku");

  return (
    <main>
      {/* 1. HERO BANNER */}
      <section
        className="hero sm"
        id="hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4, 58, 75, 0.6), rgba(4, 58, 75, 0.84)), url('${heroImage}'), linear-gradient(135deg, var(--sea), var(--deep))`,
        }}
      >
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="crumb-sep">/</span>
            <Link href="/destination">Destination</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{name}</span>
          </div>
          <h1>
            <span className="text-[#F2A541]">{name}</span>
          </h1>
          <p>{destination.tagline || destination.overview || destination.description}</p>
          <div className="hmeta">
            <span>
              <MapPin size={13} strokeWidth={2.4} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "-2px" }} />
              {destination.region || destination.location || "Lombok"}
            </span>
            <span>Best Season: {destination.best_time || "May – October"}</span>
            {isGem && (
              <span>
                <Gem size={13} strokeWidth={2.4} style={{ color: "#F2A541", stroke: "#F2A541", display: "inline-block", marginRight: "4px", verticalAlign: "-2px" }} />
                Hidden Gem
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT */}
      <section style={{ paddingTop: "56px" }}>
        <div className="wrap dl">
          <div className="dmain">
            {/* Gallery Grid */}
            <div className="dg">
              <div className="img">
                <Image src={g1} alt={`${destination.name} - Photo 1`} fill sizes="(max-width: 900px) 100vw, 66vw" loading="lazy" className="object-cover" />
              </div>
              <div className="img">
                <Image src={g2} alt={`${destination.name} - Photo 2`} fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" className="object-cover" />
              </div>
              <div className="img">
                <Image src={g3} alt={`${destination.name} - Photo 3`} fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" className="object-cover" />
              </div>
            </div>

            <h2>About This Destination</h2>
            <p>
              {destination.overview || destination.description || "A remarkable standalone destination on Lombok Island offering breathtaking natural landscapes and authentic local charm."}
            </p>

            <h2>Key Highlights &amp; Activities</h2>
            <ul className="hl">
              {(destination.highlights || destination.bullet_points || [
                "Unobstructed panoramic viewpoint",
                "Peaceful atmosphere away from heavy tourist traffic",
                "Authentic island experience with friendly locals",
              ]).map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            {/* Included Tour Package card */}
            {linkedTour && (
              <div
                style={{
                  margin: "36px 0",
                  background: "var(--mist)",
                  border: "1px solid var(--line)",
                  borderRadius: "18px",
                  padding: "26px",
                }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Featured in Tour Package:
                </span>
                <h3 style={{ margin: "8px 0 6px", fontSize: "1.3rem" }}>{linkedTour.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.93rem", marginBottom: "16px" }}>
                  {linkedTour.tagline || linkedTour.overview || linkedTour.description}
                </p>
                <Link className="btn btn-primary" href={`/tour-package/${linkedTour.slug}`}>
                  View Tour Package Details →
                </Link>
              </div>
            )}

            <div className="know">
              <b>Good to Know &amp; Travel Advice</b>
              <span>
                {Array.isArray(destination.tips)
                  ? destination.tips.join(" • ")
                  : destination.good_to_know ||
                    "We recommend visiting in the early morning or late afternoon for the best natural light and cooler temperatures. Bring plenty of drinking water, reef-safe sunscreen, and a camera."}
              </span>
            </div>
          </div>

          {/* Sticky Side Card */}
          <aside className="side">
            <small>Spot Overview</small>
            <div className="pp" style={{ fontSize: "1.7rem", marginTop: "6px" }}>{name}</div>
            <small>Standalone Lombok Destination</small>

            <dl>
              <div>
                <dt>Region</dt>
                <dd>{destination.region || destination.location || "Lombok"}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{destination.category_label || destination.category || "Nature"}</dd>
              </div>
              <div>
                <dt>Best Season</dt>
                <dd>{destination.best_time || "May – October"}</dd>
              </div>
              <div>
                <dt>Spot Status</dt>
                <dd>
                  {isGem ? (
                    <>
                      <Gem size={13} strokeWidth={2.4} style={{ color: "#F2A541", stroke: "#F2A541", display: "inline-block", marginRight: "4px", verticalAlign: "-2px" }} />
                      Hidden Gem
                    </>
                  ) : (
                    "Iconic Highlight"
                  )}
                </dd>
              </div>
            </dl>

            <a className="btn btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
            <p className="sm">Direct consultation on route and private driver availability with locals.</p>

            {/* Custom Trip Banner Card (Compact) */}
            <div
              style={{
                marginTop: "14px",
                padding: "10px 12px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(231, 246, 250, 0.6) 0%, rgba(244, 233, 214, 0.35) 100%)",
                border: "1px dashed var(--ocean)",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--deep)", fontWeight: 700, fontSize: "0.78rem", marginBottom: "2px" }}>
                <Sparkles size={13} style={{ color: "#F2A541", flexShrink: 0 }} />
                <span>Want to visit {name}?</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: "0 0 6px", lineHeight: 1.35 }}>
                Combine {name} into your custom tour route.
              </p>
              <Link
                href="/tour-package#custom-builder"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--link)",
                  textDecoration: "none",
                }}
              >
                <span>Click here to design your trip</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. RELATED DESTINATIONS */}
      <section className="tours">
        <div className="wrap">
          <div className="head c">
            <h2>More Highlights to Explore</h2>
          </div>
          <div className="grid g3">
            {relatedDests.map((r: any, idx: number) => {
              const rImg = r.image?.startsWith("http")
                ? r.image
                : r.image?.startsWith("/")
                ? r.image
                : `https://images.unsplash.com/${r.image || "photo-1506905925346-21bda4d32df4"}?auto=format&fit=crop&w=800&q=70`;

              return (
                <Link key={idx} className="card" href={`/destination/${r.slug}`}>
                  <div className="img">
                    <Image src={rImg} alt={r.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" className="object-cover" />
                  </div>
                  <div className="body">
                    <div className="meta">
                      <span>{r.region || "Lombok"}</span>
                      <span>{r.category_label || r.category || "Nature"}</span>
                    </div>
                    <h3>{r.name}</h3>
                    <p>{(r.tagline || r.overview || "").slice(0, 110)}...</p>
                    <span style={{ marginTop: "auto", fontWeight: 600, color: "var(--link)", fontSize: "0.93rem" }}>
                      Explore spot details →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>Looking to Visit {name}?</h2>
          <p>
            Whether as a standalone day trip or combined into a multi-day Lombok tour, our team is ready to organize everything for you.
          </p>
          <a className="btn btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
            Message Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

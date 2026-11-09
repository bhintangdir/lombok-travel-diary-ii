"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

interface Props {
  slug: string;
}

export default function TourDetailClient({ slug }: Props) {
  const { content } = useContent();

  const tour: any = content.tours.find(
    (t: any) => t.slug === slug || t.id === slug
  );

  if (!tour) {
    return notFound();
  }

  const waNumber = content.contact?.whatsapp || "6285138939835";
  const bookMsg = `Hello Lombok Travel Diary! I would like to book the tour: ${tour.name}\n• Preferred Dates: ___\n• Number of Guests: ___ people\n• Pickup Location: ___\nPlease confirm availability and details. Thank you!`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(bookMsg)}`;

  // Related tours
  const relatedTours = content.tours
    .filter((t: any) => t.id !== tour.id)
    .slice(0, 3);

  // Gallery images fallback
  const heroImage = tour.image?.startsWith("http")
    ? tour.image
    : tour.image?.startsWith("/")
    ? tour.image
    : `https://images.unsplash.com/${tour.image || "photo-1506905925346-21bda4d32df4"}?auto=format&fit=crop&w=1800&q=70`;

  const g1 = heroImage;
  const g2 = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=70";
  const g3 = "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=70";

  const includedList = tour.inclusions || tour.included || [
    "Private AC Vehicle & Experienced Local Driver (Fuel Included)",
    "Entrance & National Park Activity Fees",
    "Licensed English-Speaking Local Guide",
    "Chilled Bottled Mineral Water Throughout",
  ];

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
            <Link href="/tour-package">Tour Package</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{tour.name}</span>
          </div>
          <h1>
            <span className="text-[#F2A541]">{tour.name}</span>
          </h1>
          <p>{tour.subtitle || tour.tagline || tour.overview || tour.description}</p>
          <div className="hmeta">
            <span>{tour.category_label || tour.category || "Tour Package"}</span>
            <span>{tour.duration || "Full Day"}</span>
            <span>{tour.difficulty || "Moderate"}</span>
            <span>{tour.style || "Private Tour"}</span>
          </div>
        </div>
      </section>

      {/* 2. DETAIL MAIN LAYOUT */}
      <section style={{ paddingTop: "56px" }}>
        <div className="wrap dl">
          <div className="dmain">
            {/* Gallery Grid */}
            <div className="dg">
              <div className="img">
                <Image src={g1} alt={`${tour.name} - Photo 1`} fill sizes="(max-width: 900px) 100vw, 66vw" loading="lazy" className="object-cover" />
              </div>
              <div className="img">
                <Image src={g2} alt={`${tour.name} - Photo 2`} fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" className="object-cover" />
              </div>
              <div className="img">
                <Image src={g3} alt={`${tour.name} - Photo 3`} fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" className="object-cover" />
              </div>
            </div>

            <h2>Tour Overview &amp; Experience</h2>
            <p>
              {tour.overview || tour.description} All tours are conducted on a 100% private basis with pristine, air-conditioned vehicles and experienced local team members who know Lombok inside out.
            </p>

            {/* Destinations visited chips */}
            {tour.destinations && tour.destinations.length > 0 && (
              <>
                <h2>Destinations Visited on This Tour</h2>
                <p style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                  This package includes visits to the following standalone spots and hidden gems:
                </p>
                <div className="spots-tag">
                  {tour.destinations.map((d: any, idx: number) => {
                    const destName = typeof d === "string" ? d : d.name;
                    const destSlug = typeof d === "string" ? d.toLowerCase().replace(/\s+/g, "-") : d.slug || d.id;
                    return (
                      <Link key={idx} href={`/destination/${destSlug}`} className="spot-chip">
                        <MapPin size={12} strokeWidth={2.4} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "-1px" }} />
                        {destName}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            <h2>Key Highlights</h2>
            <ul className="hl">
              {(tour.highlights || tour.bullet_points || [
                "Breathtaking natural photo opportunities",
                "Insightful stories and local cultural knowledge",
                "Stress-free private schedule tailored to your pace",
              ]).map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <h2>Package Inclusions</h2>
            <div className="box yes" style={{ margin: "20px 0" }}>
              <h3>What is Included</h3>
              <ul>
                {includedList.map((inc: string, i: number) => (
                  <li key={i}>{inc}</li>
                ))}
              </ul>
            </div>

            <div className="know">
              <b>Good to Know &amp; Preparation Tips</b>
              <span>
                {tour.good_to_know ||
                  tour.best_time_note ||
                  "Wear light, breathable clothing and comfortable walking shoes or sandals suitable for the day's terrain. Don't forget reef-safe sunscreen, sunglasses, and a camera to capture the memories."}
              </span>
            </div>
          </div>

          {/* Sticky Side Card */}
          <aside className="side">
            <div className="pp" style={{ fontSize: "1.45rem", color: "var(--deep)", marginBottom: "4px" }}>
              Private Tour
            </div>
            <small style={{ color: "var(--sea)", fontWeight: 600 }}>Tailored quote on WhatsApp</small>

            <dl>
              <div>
                <dt>Category</dt>
                <dd>{tour.category_label || tour.category || "Tour Package"}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{tour.duration || "Full Day"}</dd>
              </div>
              <div>
                <dt>Difficulty</dt>
                <dd>{tour.difficulty || "Moderate"}</dd>
              </div>
              <div>
                <dt>Tour Style</dt>
                <dd>{tour.style || "Private Tour"}</dd>
              </div>
              <div>
                <dt>Pick-up</dt>
                <dd>Hotel / Airport</dd>
              </div>
            </dl>

            <a className="btn btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
              Book on WhatsApp
            </a>
            <p className="sm">Complimentary consultation &amp; flexible itinerary adjustments.</p>

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
                <span>Need a custom itinerary?</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: "0 0 6px", lineHeight: 1.35 }}>
                Combine spots or customize duration freely.
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

      {/* 3. RELATED TOURS */}
      <section className="tours">
        <div className="wrap">
          <div className="head c">
            <h2>Related Tour Packages</h2>
          </div>
          <div className="grid g3">
            {relatedTours.map((r: any, idx: number) => {
              const rImg = r.image?.startsWith("http")
                ? r.image
                : r.image?.startsWith("/")
                ? r.image
                : `https://images.unsplash.com/${r.image || "photo-1519046904884-53103b34b206"}?auto=format&fit=crop&w=800&q=70`;

              return (
                <Link key={idx} className="card" href={`/tour-package/${r.slug}`}>
                  <div className="img">
                    <Image src={rImg} alt={r.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" className="object-cover" />
                  </div>
                  <div className="body">
                    <div className="meta">
                      <span>{r.duration || "Full Day"}</span>
                      <span>{r.category_label || r.category || "Tour"}</span>
                    </div>
                    <h3>{r.name}</h3>
                    <p>{(r.tagline || r.overview || r.description || "").slice(0, 110)}...</p>
                    <span style={{ marginTop: "auto", fontWeight: 600, color: "var(--link)", fontSize: "0.93rem" }}>
                      View package details →
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
          <h2>Looking to Customise This Tour?</h2>
          <p>We can easily add extra destinations, adjust duration, or combine with Lombok&apos;s hidden gems.</p>
          <a className="btn btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp Now
          </a>
        </div>
      </section>
    </main>
  );
}

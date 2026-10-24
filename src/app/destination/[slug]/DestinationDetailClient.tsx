"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Star,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Car,
  Lightbulb,
} from "lucide-react";

interface Props {
  slug: string;
}

export default function DestinationDetailClient({ slug }: Props) {
  const { content } = useContent();

  const destination = content.destinations?.items?.find(
    (d: any) => d.slug === slug || d.id === slug
  );

  if (!destination) {
    return notFound();
  }

  const name = destination.name || destination.title;
  const inquiryMsg = `Hi Lombok Travel Diary! I'm planning to visit ${name}. Can you recommend an itinerary and private driver price?`;
  const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(inquiryMsg)}`;

  // Find recommended tour if available
  const recommendedTour = destination.recommended_tour_slug
    ? content.tours.find((t) => t.slug === destination.recommended_tour_slug || t.id === destination.recommended_tour_slug)
    : null;

  // Other destinations for the bottom grid
  const relatedDestinations = (content.destinations?.items || [])
    .filter((d: any) => (d.slug || d.id) !== (destination.slug || destination.id))
    .slice(0, 4);

  return (
    <main>
      {/* Hero Header */}
      <header className="hero" style={{ padding: "60px 0 70px" }}>
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link> › <Link href="/destination">Destination</Link> › {name}
          </p>
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Compass size={14} className="w-3.5 h-3.5 inline text-[var(--red)]" />
            Destination Guide
          </span>
          <h1>{name}</h1>
          <p>{destination.tagline}</p>
          <div className="meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={14} /> {destination.region}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} /> Best: {destination.best_time}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Clock size={14} /> Stay: {destination.ideal_duration}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Car size={14} /> {destination.distance}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content + Sidebar */}
      <section>
        <div className="wrap main-grid">
          <div>
            {/* Scrapbook Polaroids */}
            <div className="polas">
              <div className="pol">
                <div
                  style={{
                    backgroundImage: `url(${destination.image || destination.bg_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "4px",
                  }}
                />
                <small>Viewpoint</small>
              </div>
              <div className="pol">
                <div
                  style={{
                    background: destination.bg_gradient || "var(--navy)",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                >
                  <Sparkles size={48} className="text-white" />
                </div>
                <small>Local Diary</small>
              </div>
              <div className="pol">
                <div
                  style={{
                    background: "var(--paper)",
                    border: "2px dashed var(--ink)",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "4px",
                    color: "var(--navy)",
                    padding: "16px",
                    textAlign: "center",
                    fontFamily: "'Caveat', cursive",
                    fontSize: "1.35rem",
                  }}
                >
                  📍 {destination.region}
                  <br />
                  <span style={{ fontSize: "1rem", color: "#6b7790", fontFamily: "inherit" }}>
                    {destination.vibe}
                  </span>
                </div>
                <small>The vibe</small>
              </div>
            </div>

            {/* Overview */}
            <div className="blk">
              <h2>Overview</h2>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.7 }}>{destination.overview}</p>
              {destination.highlights && (
                <ul className="hl-grid" style={{ marginTop: "24px" }}>
                  {destination.highlights.map((h: string, i: number) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Star size={16} className="text-[var(--yellow)] flex-shrink-0" fill="currentColor" stroke="var(--ink)" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Top Spots to Explore */}
            {destination.spots && destination.spots.length > 0 && (
              <div className="blk">
                <h2>Top Spots to Explore</h2>
                <div className="dest-spots-grid">
                  {destination.spots.map((spot: any, idx: number) => (
                    <div key={idx} className="dest-spot-card">
                      <h4>
                        <span style={{ color: "var(--red)" }}>📍</span> {spot.title}
                      </h4>
                      <p>{spot.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Tips */}
            {destination.tips && destination.tips.length > 0 && (
              <div className="blk">
                <div className="note" style={{ background: "#fff", border: "2.5px solid var(--ink)", borderRadius: "14px", padding: "24px", boxShadow: "5px 5px 0 var(--ink)" }}>
                  <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.6rem", color: "var(--navy)", marginBottom: "12px" }}>
                    <Lightbulb size={24} className="text-[var(--yellow)]" />
                    📝 Insider Tips for Travellers
                  </h3>
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.95rem", color: "#3d4a66" }}>
                    {destination.tips.map((tip: string, i: number) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recommended Tour Package Callout */}
            {recommendedTour && (
              <div className="blk">
                <div
                  className="card"
                  style={{
                    padding: "24px",
                    background: "var(--paper)",
                    border: "2.5px solid var(--ink)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span className="tag" style={{ margin: 0 }}>Recommended Tour</span>
                  </div>
                  <h3 style={{ fontSize: "1.7rem", margin: 0 }}>
                    Experience {name} on our &ldquo;{recommendedTour.name}&rdquo; tour
                  </h3>
                  <p style={{ margin: 0, color: "#4a5873", fontSize: "0.95rem" }}>
                    Includes private hotel pickup, clean air-conditioned car, fuel, driver-guide, and flexible stops.
                  </p>
                  <div>
                    <Link
                      href={`/tour-package/${recommendedTour.slug}`}
                      className="btn b-yellow"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "6px" }}
                    >
                      View Tour Itinerary <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Good to know FAQ */}
            {destination.faq && destination.faq.length > 0 && (
              <div className="blk faq">
                <h2>Good to Know Before You Go</h2>
                {destination.faq.map((fq: any, i: number) => (
                  <details key={i}>
                    <summary>{fq.q}</summary>
                    <p>{fq.a}</p>
                  </details>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <aside>
            <div className="card book">
              <h3>Trip Quick Facts</h3>
              <dl>
                <div>
                  <dt>Region</dt>
                  <dd>{destination.region}</dd>
                </div>
                <div>
                  <dt>Best Season</dt>
                  <dd>{destination.best_time}</dd>
                </div>
                <div>
                  <dt>Ideal Stay</dt>
                  <dd>{destination.ideal_duration}</dd>
                </div>
                <div>
                  <dt>Distance</dt>
                  <dd>{destination.distance}</dd>
                </div>
                <div>
                  <dt>Atmosphere</dt>
                  <dd>{destination.vibe}</dd>
                </div>
              </dl>
              <a
                className="btn b-green"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
                Plan Visit via WhatsApp
              </a>
              <Link
                className="btn"
                href="/destination"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "8px" }}
              >
                <ArrowLeft size={16} /> All Destinations
              </Link>
              <small style={{ marginTop: "8px" }}>Friendly local guidance · Quick response</small>
            </div>
          </aside>
        </div>
      </section>

      {/* More Pages from Our Map */}
      <section className="rel">
        <div className="wrap">
          <h2>More Pages from Our Map</h2>
          <div className="rg">
            {relatedDestinations.map((rel: any, idx: number) => (
              <Link key={idx} className="card rc" href={`/destination/${rel.slug || rel.id}`}>
                <div
                  className="t"
                  style={{
                    backgroundImage: `url(${rel.image || rel.bg_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="b">
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--green)", textTransform: "uppercase" }}>
                    {rel.region}
                  </span>
                  <h3 style={{ fontSize: "1.4rem", marginTop: "2px" }}>{rel.name || rel.title}</h3>
                  <p>{rel.vibe || rel.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>Ready to Visit {name}?</h2>
          <p>Send us your travel dates and group details. We&apos;ll recommend the best route, driver, and stops.</p>
          <a
            className="btn b-yellow"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <WhatsAppIcon size={18} className="w-4 h-4 text-[var(--ink)]" />
            Ask Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

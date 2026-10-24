"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import DynamicIcon from "@/components/DynamicIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Clock, Users, Mountain, Calendar, Star, Check, X, ArrowLeft } from "lucide-react";

interface Props {
  slug: string;
}

export default function TourDetailClient({ slug }: Props) {
  const { content } = useContent();

  const tour = content.tours.find(
    (t) => t.slug === slug || t.id === slug
  );

  if (!tour) {
    return notFound();
  }

  const bookMsg = `Hi! I'd like to book the ${tour.name} tour. Dates: ... Guests: ...`;
  const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(bookMsg)}`;

  const relatedTours = content.tours.filter((t) => t.id !== tour.id).slice(0, 4);

  return (
    <main>
      {/* Hero Header */}
      <header className="hero" style={{ padding: "60px 0 70px" }}>
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link> › <Link href="/tour-package">Tour Package</Link> › {tour.name}
          </p>
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <DynamicIcon name={tour.icon} size={14} className="w-3.5 h-3.5 inline" />
            Diary page
          </span>
          <h1>{tour.name}</h1>
          <p>{tour.tagline}</p>
          <div className="meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Clock size={14} /> {tour.duration}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Users size={14} /> {tour.group_size}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Mountain size={14} /> {tour.difficulty}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} /> Best: {tour.best_time}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content + Sidebar */}
      <section>
        <div className="wrap main-grid">
          <div>
            {/* Polaroids */}
            <div className="polas">
              <div className="pol">
                <div className={tour.color_class}>
                  <DynamicIcon name={tour.icon} size={48} className="w-12 h-12 text-white" />
                </div>
                <small>Page one</small>
              </div>
              <div className="pol">
                <div className={tour.color_class}>
                  <DynamicIcon name="Palmtree" size={48} className="w-12 h-12 text-white" />
                </div>
                <small>Page two</small>
              </div>
              <div className="pol">
                <div className={tour.color_class}>
                  <DynamicIcon name="Camera" size={48} className="w-12 h-12 text-white" />
                </div>
                <small>Page three</small>
              </div>
            </div>

            {/* Overview */}
            <div className="blk">
              <h2>Overview</h2>
              <p>{tour.overview}</p>
              <ul className="hl-grid">
                {tour.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Star size={16} className="text-[var(--yellow)] flex-shrink-0" fill="currentColor" stroke="var(--ink)" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day Plan / Itinerary */}
            <div className="blk">
              <h2>Day Plan</h2>
              <div className="tl">
                {tour.itinerary.map((it, idx) => (
                  <div key={idx} className="st" data-n={idx + 1}>
                    <div className="card">
                      <time>{it.time}</time>
                      <h3>{it.title}</h3>
                      <p>{it.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Excluded */}
            <div className="blk two">
              <div className="card list inc">
                <h3>Included</h3>
                <ul>
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Check size={16} className="text-[var(--green)] flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card list exc">
                <h3>Not included</h3>
                <ul>
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <X size={16} className="text-[var(--red)] flex-shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to bring */}
            <div className="blk">
              <div className="note">
                <h3>📝 What to bring</h3>
                <ul>
                  {tour.what_to_bring.map((br, i) => (
                    <li key={i}>{br}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Good to know FAQ */}
            <div className="blk faq">
              <h2>Good to Know</h2>
              {tour.faq.map((fq, i) => (
                <details key={i}>
                  <summary>{fq.q}</summary>
                  <p>{fq.a}</p>
                </details>
              ))}
              <details>
                <summary>How do I book?</summary>
                <p>Tap the WhatsApp button, send your dates and group size, and we confirm availability and price.</p>
              </details>
              <details>
                <summary>How does payment work?</summary>
                <p>A small deposit secures your date and the balance is paid on tour day.</p>
              </details>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="card book">
              <h3>Book this page</h3>
              <dl>
                <div>
                  <dt>Duration</dt>
                  <dd>{tour.duration}</dd>
                </div>
                <div>
                  <dt>Group size</dt>
                  <dd>{tour.group_size}</dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{tour.difficulty}</dd>
                </div>
                <div>
                  <dt>Price level</dt>
                  <dd>{tour.price_level}</dd>
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
                Book on WhatsApp
              </a>
              <Link
                className="btn"
                href="/tour-package"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "8px" }}
              >
                <ArrowLeft size={16} /> All tours
              </Link>
              <small style={{ marginTop: "8px" }}>Free to ask · Reply within hours</small>
            </div>
          </aside>
        </div>
      </section>

      {/* More Pages from Our Diary */}
      <section className="rel">
        <div className="wrap">
          <h2>More Pages from Our Diary</h2>
          <div className="rg">
            {relatedTours.map((rel, idx) => (
              <Link key={idx} className="card rc" href={`/tour-package/${rel.slug}`}>
                <div
                  className={`t ${rel.color_class}`}
                  style={{
                    backgroundImage: rel.image ? `url(${rel.image})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  {!rel.image && (
                    <DynamicIcon name={rel.icon} size={36} className="w-9 h-9 text-white" />
                  )}
                </div>
                <div className="b">
                  <h3>{rel.name}</h3>
                  <p>{rel.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>Ready to Write This Page?</h2>
          <p>Send us your dates and group size. We&apos;ll confirm availability and price on WhatsApp.</p>
          <a
            className="btn b-yellow"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <WhatsAppIcon size={18} className="w-4 h-4 text-[var(--ink)]" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

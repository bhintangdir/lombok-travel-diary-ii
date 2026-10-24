"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import DynamicIcon from "@/components/DynamicIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Clock, Star, BookOpen, ChevronDown, Check, Compass, ArrowRight } from "lucide-react";

export default function TourPackageClient() {
  const { content } = useContent();
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { key: "all", label: "All Packages" },
    { key: "alam", label: "Nature & Beach" },
    { key: "trekking", label: "Trekking" },
    { key: "mancing", label: "Fishing" },
    { key: "transport", label: "Car Rental & Transfers" },
  ];

  const filteredTours = content.tours.filter(
    (tour) => filter === "all" || tour.category === filter
  );

  const getWaLink = (tourName: string) =>
    `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
      `Hi! I'm interested in the ${tourName} tour.`
    )}`;

  const ctaWa = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.cta.button_message)}`;

  const activeCategoryObj = categories.find((c) => c.key === filter) || categories[0];

  return (
    <main>
      {/* Hero Header */}
      <header className="hero">
        <div className="wrap">
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <BookOpen size={14} className="w-3.5 h-3.5 inline" />
            Tour packages
          </span>
          <h1>
            Choose Your Next <em>Chapter</em>
          </h1>
          <p>
            Private, flexible tours with a local driver-guide. Pick a page from our diary, tap WhatsApp, and we will handle the rest.
          </p>
        </div>
      </header>

      {/* Sticky Tab Filter (Desktop Tabs & Mobile Dropdown) */}
      <div className="filter" id="filter">
        <div className="wrap" style={{ position: "relative" }}>
          {/* Desktop Tabs */}
          <div className="filter-tabs-desktop">
            <span className="fl">Divider:</span>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`tab ${filter === cat.key ? "on" : ""}`}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile Dropdown (compact like switch bahasa) */}
          <div className="filter-dropdown-mobile">
            <div style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto" }}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Filter Tour Categories"
                aria-expanded={isDropdownOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  height: "40px",
                  padding: "0 14px",
                  borderRadius: "10px",
                  border: "2.5px solid var(--ink)",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  boxShadow: "3px 3px 0 var(--ink)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Compass size={16} className="text-[var(--navy)] flex-shrink-0" />
                  <span style={{ color: "var(--navy)", fontWeight: 700 }}>
                    {activeCategoryObj.label}
                  </span>
                  <span
                    style={{
                      background: "var(--yellow)",
                      color: "var(--ink)",
                      fontSize: "0.72rem",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      fontWeight: 800,
                      border: "1px solid var(--ink)",
                    }}
                  >
                    {filteredTours.length}
                  </span>
                </div>
                <ChevronDown
                  size={15}
                  style={{
                    color: "var(--ink)",
                    flexShrink: 0,
                    transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              {/* Dropdown Menu Modal */}
              {isDropdownOpen && (
                <>
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 9998 }}
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      border: "2.5px solid var(--ink)",
                      borderRadius: "12px",
                      boxShadow: "4px 4px 0 var(--ink)",
                      zIndex: 9999,
                      overflow: "hidden",
                      padding: "5px",
                    }}
                  >
                    {categories.map((cat) => {
                      const count = content.tours.filter(
                        (t) => cat.key === "all" || t.category === cat.key
                      ).length;
                      const isSelected = filter === cat.key;

                      return (
                        <button
                          key={cat.key}
                          onClick={() => {
                            setFilter(cat.key);
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "9px 12px",
                            borderRadius: "8px",
                            border: "none",
                            background: isSelected ? "var(--yellow)" : "transparent",
                            color: "var(--ink)",
                            fontWeight: isSelected ? 800 : 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            textAlign: "left",
                            marginBottom: "2px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {isSelected ? (
                              <Check size={15} className="text-[var(--navy)] flex-shrink-0" />
                            ) : (
                              <span style={{ width: 15 }} />
                            )}
                            <span>{cat.label}</span>
                          </div>
                          <span
                            style={{
                              fontSize: "0.74rem",
                              color: isSelected ? "var(--ink)" : "#7a87a5",
                              fontWeight: 700,
                            }}
                          >
                            ({count})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Collage Section */}
      <section style={{ paddingTop: "60px" }}>
        <div className="wrap">
          <div className="collage" id="collage">
            {filteredTours.map((tour) => {
              const slug = tour.slug || tour.id;

              return (
                <article key={tour.id} className="tour-card" data-c={tour.category}>
                  <div
                    className={`ph ${tour.height_class} ${tour.color_class}`}
                    style={{
                      backgroundImage: tour.image ? `url(${tour.image})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}
                  >
                    {!tour.image && (
                      <DynamicIcon name={tour.icon} size={48} className="w-12 h-12" />
                    )}
                    <span className="dur" style={{ display: "inline-flex", alignItems: "center", gap: "4px", zIndex: 2 }}>
                      <Clock size={12} /> {tour.duration}
                    </span>
                  </div>
                  <div className="tb">
                    <h3>{tour.name}</h3>
                    <p>{tour.tagline}</p>
                    <h4>Key highlights</h4>
                    <ul className="hl">
                      {tour.highlights.map((h, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Star size={14} className="text-[var(--yellow)] flex-shrink-0" fill="currentColor" stroke="var(--ink)" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="acts">
                      <Link
                        className="btn"
                        href={`/tour-package/${slug}`}
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        Detail <ArrowRight size={14} />
                      </Link>
                      <a
                        className="btn b-green"
                        href={getWaLink(tour.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        <WhatsAppIcon size={16} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredTours.length === 0 && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "'Caveat', cursive",
                fontSize: "2rem",
                color: "var(--navy)",
              }}
            >
              No pages here yet. Ask us for a custom plan! ✍️
            </p>
          )}
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="cmp" id="compare">
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.comparison_table.tag}</span>
            <h2>{content.comparison_table.heading}</h2>
            <p>{content.comparison_table.subheading}</p>
          </div>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  {content.comparison_table.columns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.comparison_table.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.name}</td>
                    <td>{row.duration}</td>
                    <td>{row.style}</td>
                    <td>{row.difficulty}</td>
                    <td>{row.best_for}</td>
                    <td className="lv">{row.price_level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note" style={{ textAlign: "center", fontSize: ".85rem", color: "#6b7790", marginTop: "16px" }}>
            {content.comparison_table.note}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <div className="head">
            <span className="tag">FAQ</span>
            <h2>Before You Book</h2>
          </div>
          <div className="faq">
            {content.faq.items.map((f, idx) => (
              <details key={idx}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>Found Your Page?</h2>
          <p>Send us your dates and the tour you like. We&apos;ll reply with a clear plan and price.</p>
          <a
            className="btn b-yellow"
            href={ctaWa}
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { MapPin, Compass, Clock, Calendar, ArrowRight, Sparkles, ChevronDown, Check } from "lucide-react";

export default function DestinationClient() {
  const { content } = useContent();
  const [filter, setFilter] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = content.destinations.categories || [
    { key: "all", label: "All Places" },
    { key: "island", label: "Islands" },
    { key: "beach", label: "Beaches" },
    { key: "mountain", label: "Mountains" },
    { key: "waterfall", label: "Waterfalls" },
    { key: "culture", label: "Culture" },
  ];

  const items = content.destinations.items || [];

  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter
  );

  const getWaLink = (destName: string) =>
    `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
      `Hi! I'd love to visit ${destName}. Can you help me arrange a private tour and driver?`
    )}`;

  const ctaWa = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    content.cta?.button_message || "Hi Lombok Travel Diary! I'd like to plan my trip."
  )}`;

  const activeCategoryObj = categories.find((c) => c.key === filter) || categories[0];

  return (
    <main>
      {/* Hero Header */}
      <header className="hero">
        <div className="wrap">
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Compass size={14} className="w-3.5 h-3.5 inline text-[var(--red)]" />
            {content.destinations.tag || "Lombok map & diary"}
          </span>
          <h1>
            Dream Spots on the <em>Map</em>
          </h1>
          <p>
            {content.destinations.subheading ||
              "Every corner of Lombok has its own story. Choose where your next page begins, pick your favorite spots, and let us take you there."}
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
                aria-label="Filter Destination Categories"
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
                  <MapPin size={16} className="text-[var(--navy)] flex-shrink-0" />
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
                    {filteredItems.length}
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
                      const count = items.filter(
                        (item) => cat.key === "all" || item.category === cat.key
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

      {/* Destination Collage Section */}
      <section style={{ paddingTop: "60px" }}>
        <div className="wrap">
          <div className="collage" id="dest-collage">
            {filteredItems.map((item) => {
              const slug = item.slug || item.id;
              const name = item.name || item.title;

              return (
                <article key={item.id || item.slug} className="dest-card" data-c={item.category}>
                  {/* Photo Frame & Stamp */}
                  <div className="dest-photo-frame">
                    <img
                      src={item.image || item.bg_image}
                      alt={name}
                      className="dest-photo-img"
                      loading="lazy"
                    />

                    {/* Airmail Postage Stamp */}
                    <div className="dest-stamp">
                      <Sparkles size={12} className="text-[var(--yellow)]" />
                      <span>{item.badge || "POST 🇮🇩"}</span>
                    </div>

                    {/* Region Tag */}
                    <div className="dest-region-tag">
                      <MapPin size={12} className="text-[var(--yellow)] flex-shrink-0" />
                      <span>{item.region}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="dest-tb">
                    <span className="dest-category-badge">{item.category_label || item.category}</span>
                    <h3>{name}</h3>
                    <p className="dest-tagline">{item.tagline}</p>

                    {/* Highlights / Must-See Spots */}
                    {item.highlights && item.highlights.length > 0 && (
                      <>
                        <h4 className="dest-spots-title">Must-See Highlights</h4>
                        <ul className="dest-spots-list">
                          {item.highlights.slice(0, 3).map((hl: string, i: number) => (
                            <li key={i}>
                              <span style={{ color: "var(--red)", marginTop: "2px", flexShrink: 0 }}>📍</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Quick Meta Pills */}
                    <div className="dest-meta-bar">
                      {item.ideal_duration && (
                        <span>
                          <Clock size={12} /> {item.ideal_duration}
                        </span>
                      )}
                      {item.best_time && (
                        <span>
                          <Calendar size={12} /> {item.best_time}
                        </span>
                      )}
                      {item.distance && (
                        <span>
                          <Compass size={12} /> {item.distance}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="dest-acts">
                      <Link
                        className="btn"
                        href={`/destination/${slug}`}
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        Detail <ArrowRight size={14} />
                      </Link>
                      <a
                        className="btn b-green"
                        href={getWaLink(name)}
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

          {filteredItems.length === 0 && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "'Caveat', cursive",
                fontSize: "2rem",
                color: "var(--navy)",
                margin: "40px 0",
              }}
            >
              No secret spots found in this category yet. Ask us for hidden gems! 🧭
            </p>
          )}
        </div>
      </section>

      {/* Comparison Guide Section */}
      {content.destinations.comparison_table && (
        <section className="cmp" id="compare">
          <div className="wrap">
            <div className="head">
              <span className="tag">{content.destinations.comparison_table.tag}</span>
              <h2>{content.destinations.comparison_table.heading}</h2>
              <p>{content.destinations.comparison_table.subheading}</p>
            </div>
            <div className="tw">
              <table>
                <thead>
                  <tr>
                    {content.destinations.comparison_table.columns.map((col: string, idx: number) => (
                      <th key={idx}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.destinations.comparison_table.rows.map((row: any, idx: number) => (
                    <tr key={idx}>
                      <td>{row.name}</td>
                      <td>{row.region}</td>
                      <td>{row.vibe}</td>
                      <td>{row.distance}</td>
                      <td>{row.best_time}</td>
                      <td className="lv">{row.ideal_stay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note" style={{ textAlign: "center", fontSize: ".85rem", color: "#6b7790", marginTop: "16px" }}>
              {content.destinations.comparison_table.note}
            </p>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {content.destinations.faq && (
        <section>
          <div className="wrap">
            <div className="head">
              <span className="tag">{content.destinations.faq.tag || "FAQ"}</span>
              <h2>{content.destinations.faq.heading || "Tips Before You Explore"}</h2>
            </div>
            <div className="faq">
              {content.destinations.faq.items.map((f: any, idx: number) => (
                <details key={idx}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta">
        <div className="wrap">
          <h2>Ready to Mark Your Map?</h2>
          <p>Tell us which destinations caught your eye. We&apos;ll create a smooth itinerary and clear quote on WhatsApp.</p>
          <a
            className="btn b-yellow"
            href={ctaWa}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <WhatsAppIcon size={18} className="w-4 h-4 text-[var(--ink)]" />
            Chat with Our Local Team
          </a>
        </div>
      </section>
    </main>
  );
}

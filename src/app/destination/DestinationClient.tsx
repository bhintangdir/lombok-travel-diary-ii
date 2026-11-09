"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, ArrowRight, Gem } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function DestinationClient() {
  const { content } = useContent();
  const [filter, setFilter] = useState("all");

  const waNumber = content.contact?.whatsapp || "6285138939835";
  const wa = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  const categories = [
    { key: "all", label: "All Spots" },
    { key: "gem", label: "Hidden Gems Only" },
    { key: "trek", label: "Hills & Mountains" },
    { key: "beach", label: "Beaches & Islands" },
    { key: "waterfall", label: "Waterfalls" },
    { key: "culture", label: "Culture & Circuit" },
  ];

  const items = (content.destinations?.items || []).map((item: any) => {
    let cat = "beach";
    let catLabel = "Beach & Coast";
    const slug = (item.slug || item.id || "").toLowerCase();
    const catRaw = (item.category || "").toLowerCase();

    const isGem =
      item.is_hidden_gem ||
      catRaw.includes("gem") ||
      slug.includes("dandaun") ||
      slug.includes("kondo") ||
      slug.includes("anak-dara") ||
      slug.includes("secret-gili") ||
      slug.includes("semeti") ||
      slug.includes("bloam") ||
      slug.includes("mangku") ||
      slug.includes("beleq");

    if (
      catRaw.includes("mountain") ||
      catRaw.includes("trek") ||
      catRaw.includes("hill") ||
      slug.includes("sembalun") ||
      slug.includes("pergasingan") ||
      slug.includes("dandaun") ||
      slug.includes("rinjani") ||
      slug.includes("kondo") ||
      slug.includes("anak-dara")
    ) {
      cat = "trek";
      catLabel = "Hill & Mountain";
    } else if (
      catRaw.includes("waterfall") ||
      slug.includes("waterfall") ||
      slug.includes("tiu-kelep") ||
      slug.includes("benang") ||
      slug.includes("mangku")
    ) {
      cat = "waterfall";
      catLabel = "Waterfall";
    } else if (
      catRaw.includes("culture") ||
      slug.includes("sade") ||
      slug.includes("sukarara") ||
      slug.includes("mandalika") ||
      slug.includes("beleq") ||
      slug.includes("mataram")
    ) {
      cat = "culture";
      catLabel = slug.includes("mandalika") ? "Circuit & Coast" : "Culture & Heritage";
    } else {
      cat = "beach";
      catLabel = slug.includes("gili") ? "Island & Reef" : "Beach & Coast";
    }

    const imgUrl = item.image?.startsWith("http")
      ? item.image
      : item.image?.startsWith("/")
      ? item.image
      : `https://images.unsplash.com/${item.image || "photo-1506905925346-21bda4d32df4"}?auto=format&fit=crop&w=800&q=70`;

    // Linked tour package
    const linkedPkg = (content.tours || []).find((t: any) =>
      (t.destinations || []).some((d: any) => {
        const dStr = typeof d === "string" ? d.toLowerCase() : (d.id || d.name || "").toLowerCase();
        return dStr.includes(slug) || slug.includes(dStr);
      })
    );

    const pkgName = linkedPkg?.name || "Custom Trip (Request this Spot)";
    const pkgUrl = linkedPkg ? `/tour-package/${linkedPkg.slug}` : "/tour-package#custom-builder";

    return {
      ...item,
      cat,
      catLabel,
      is_gem: isGem,
      imgUrl,
      pkgName,
      pkgUrl,
      highlightsList:
        item.highlights ||
        (item.bullet_points || []).slice(0, 3) || [
          "Panoramic photo viewpoint",
          "Easy access with local driver",
          "Pristine natural scenery",
        ],
    };
  });

  const filteredItems = items.filter((item: any) => {
    if (filter === "all") return true;
    if (filter === "gem") return item.is_gem === true;
    return item.cat === filter;
  });

  return (
    <main>
      {/* 1. HERO BANNER */}
      <section className="hero sm">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Destination</span>
          </div>
          <h1>
            Lombok Destinations &amp; <span className="text-[#F2A541]">Hidden Gems</span>
          </h1>
          <p>
            An inspiring directory of standalone destinations across Lombok — from world-famous landmarks to untouched hidden gems. Explore each spot individually, or combine them into your custom itinerary.
          </p>
        </div>
      </section>

      {/* 2. FLOATING STICKY FILTER BAR (Gading Trans style) */}
      <nav className="sticky-filter-bar" aria-label="Filter destinations by category">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter destinations">
            {categories.map((cat) => {
              const count =
                cat.key === "all"
                  ? items.length
                  : cat.key === "gem"
                  ? items.filter((item: any) => item.is_gem === true).length
                  : items.filter((item: any) => item.cat === cat.key).length;

              return (
                <button
                  key={cat.key}
                  className={`chip ${filter === cat.key ? "active" : ""}`}
                  aria-pressed={filter === cat.key}
                  style={cat.key === "gem" ? { color: "#F2A541", fontWeight: 700 } : {}}
                  onClick={() => setFilter(cat.key)}
                >
                  {cat.key === "gem" && (
                    <Gem size={13} strokeWidth={2.4} style={{ color: "#F2A541", stroke: "#F2A541", display: "inline-block", marginRight: "5px", verticalAlign: "-1px" }} />
                  )}
                  {cat.label} <span style={{ opacity: 0.85, fontSize: "0.86em", marginLeft: "4px" }}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. DESTINATION GRID */}
      <section style={{ paddingTop: "28px" }}>
        <div className="wrap">
          
          <div className="grid g3">
            {filteredItems.map((item: any, idx: number) => (
              <article key={idx} className="dcard" id={item.slug}>
                <Link href={`/destination/${item.slug}`} className="pic-link" aria-label={`View details for ${item.name}`}>
                  <div className="pic">
                    <Image src={item.imgUrl} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" className="object-cover" />
                    {item.is_gem ? (
                      <span className="badge gem">
                        <Gem size={12} strokeWidth={2.4} style={{ color: "#F2A541", stroke: "#F2A541", display: "inline-block", marginRight: "4px", verticalAlign: "-1px" }} />
                        Hidden Gem
                      </span>
                    ) : (
                      <span className="badge loc">
                        <MapPin size={11} strokeWidth={2.5} style={{ display: "inline-block", marginRight: "3px", verticalAlign: "-1px" }} />
                        {item.region || item.location || "Lombok"}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="body">
                  <span className="d-cat">
                    {item.catLabel} • {item.region || item.location || "Lombok"}
                  </span>
                  <h3>
                    <Link href={`/destination/${item.slug}`}>
                      {item.name}
                    </Link>
                  </h3>
                  <p className="desc">{item.tagline || item.overview || item.description || item.short_description}</p>

                  <ul className="hl">
                    {item.highlightsList.slice(0, 3).map((h: string, hIdx: number) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>

                  <div className="best-tag">
                    <b>Best Season:</b> {item.best_time || "May to October (Morning / Sunset)"}
                  </div>

                  <div className="pkg-link-box">
                    <span>Available in Tour Package:</span>
                    <Link href={item.pkgUrl}>
                      <span>{item.pkgName}</span>
                      <span>→</span>
                    </Link>
                  </div>

                  <div className="dacts">
                    <Link className="btn btn-line" href={`/destination/${item.slug}`}>
                      View Detail
                    </Link>
                    <a
                      className="btn btn-wa"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={wa(`Hello Lombok Travel Diary! I would like to enquire about visiting: ${item.name} (${item.region || item.location || "Lombok"}).`)}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 3. CUSTOM TRIP CONNECTOR BRIDGE */}
          <div
            className="sc custom"
            style={{
              marginTop: "60px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "24px",
              padding: "48px 40px",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 20px 45px rgba(4, 58, 75, 0.22)",
            }}
          >
            {/* Background Image & Ambient Gradient Overlay */}
            <div className="sc-bg-img" style={{ position: "absolute", inset: 0, zIndex: 0 }} aria-hidden="true">
                <Image src="/custom-trip.jpg" alt="Custom Trip Lombok" fill sizes="100vw" loading="lazy" className="object-cover" />
            </div>
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(4, 58, 75, 0.92) 0%, rgba(6, 91, 114, 0.86) 60%, rgba(4, 58, 75, 0.94) 100%)",
                zIndex: 1,
              }}
              aria-hidden="true"
            />

            <div className="txt" style={{ position: "relative", zIndex: 2 }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--sun)", textTransform: "uppercase", letterSpacing: "1px", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <Sparkles size={13} strokeWidth={2.4} />
                Tailor-Made Private Itinerary
              </span>
              <h3 style={{ fontSize: "1.65rem", color: "#fff", marginBottom: "8px", fontWeight: 700 }}>
                Want to Combine Multiple Destinations?
              </h3>
              <p style={{ color: "#E0F2FE", fontSize: "0.98rem", lineHeight: 1.6, maxWidth: "680px" }}>
                Craft your 100% flexible, private trip with our local experts. Pick your favorite beaches, hidden waterfalls, mountain viewpoints, and Secret Gilis — or let us design the optimal custom route tailored to your exact dates and pace!
              </p>
            </div>
            <Link
              className="btn btn-sun"
              href="/tour-package#custom-builder"
              style={{ position: "relative", zIndex: 2, padding: "14px 28px", fontSize: "0.96rem", whiteSpace: "nowrap" }}
            >
              Open Custom Trip Planner →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SEASON ADVICE */}
      <section style={{ background: "var(--mist)", padding: "70px 0" }}>
        <div className="wrap">
          <div className="head c">
            <h2>Best Time to Visit Lombok</h2>
            <p className="lead">Understand Lombok&apos;s seasonal weather patterns to plan the ideal spots for your trip.</p>
          </div>
          <div className="grid g3">
            <div style={{ background: "#fff", borderRadius: "18px", padding: "28px 24px", border: "1px solid var(--line)" }}>
              <h3 style={{ color: "var(--deep)", fontSize: "1.25rem", marginBottom: "4px" }}>May to September</h3>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                Dry Season &amp; Clear Skies
              </span>
              <p style={{ color: "var(--muted)", fontSize: "0.93rem", lineHeight: 1.6 }}>
                The prime window for trekking Sembalun ridges (Pergasingan, Savana Dandaun, Anak Dara), snorkeling calm turquoise reefs in 3 Gilis &amp; Secret Gilis, and catching iconic Merese sunsets.
              </p>
            </div>
            <div style={{ background: "#fff", borderRadius: "18px", padding: "28px 24px", border: "1px solid var(--line)" }}>
              <h3 style={{ color: "var(--deep)", fontSize: "1.25rem", marginBottom: "4px" }}>April &amp; October</h3>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                Quiet Shoulder Season
              </span>
              <p style={{ color: "var(--muted)", fontSize: "0.93rem", lineHeight: 1.6 }}>
                Peaceful island atmosphere with fewer travellers and warm coastal breezes. Ideal for discovering secluded hidden gems like Semeti Beach, Tanjung Bloam, and remote Secret Gilis.
              </p>
            </div>
            <div style={{ background: "#fff", borderRadius: "18px", padding: "28px 24px", border: "1px solid var(--line)" }}>
              <h3 style={{ color: "var(--deep)", fontSize: "1.25rem", marginBottom: "4px" }}>November to March</h3>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                Green Season &amp; Waterfalls
              </span>
              <p style={{ color: "var(--muted)", fontSize: "0.93rem", lineHeight: 1.6 }}>
                Lombok turns lush and emerald green. Rainforest waterfalls like Tiu Kelep, Sendang Gile, and Benang Kelambu reach their most dramatic and thunderous flow.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* 4.5 DESTINATION FAQ SECTION */}
      <section style={{ background: "#f8fafc", padding: "75px 0" }}>
        <div className="wrap">
          <div className="head c">
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", letterSpacing: "1.2px", display: "inline-block", marginBottom: "8px" }}>
              Travel Notes &amp; FAQ
            </span>
            <h2>Tips Before Exploring Lombok Destinations</h2>
            <p className="lead" style={{ maxWidth: "600px", margin: "6px auto 0" }}>
              Essential tips on regional travel times, road conditions, and combining standalone spots.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>Can I combine multiple destinations into a single day trip?</summary>
              <p>
                Yes! Many spots pair naturally together: Kuta Mandalika combines perfectly with Tanjung Aan &amp; Bukit Merese, while Tiu Kelep Waterfall pairs seamlessly with Senaru or Pergasingan Hill in Sembalun.
              </p>
            </details>
            <details>
              <summary>What is the best way to get between regions in Lombok?</summary>
              <p>
                Hiring a private AC car with a local driver is by far the most comfortable and flexible option. Our drivers know local road conditions, tidal schedules, and scenic photography viewpoints.
              </p>
            </details>
            <details>
              <summary>Are destination entrance and parking tickets included?</summary>
              <p>
                When booking any of our private tour packages, all village entrance tickets, waterfall permits, parking fees, and local community guide fees are fully included with zero surprise charges.
              </p>
            </details>
            <details>
              <summary>What should I wear or prepare when visiting these spots?</summary>
              <p>
                Wear light breathable clothes and secure sandals or walking shoes. If visiting traditional Sasak villages (Sade / Sukarara), modest attire is respectful (shoulders and knees covered). For waterfalls and snorkeling, bring swimwear and a dry change of clothes.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="cta">
        <div className="wrap">
          <h2>Have a Specific Spot on Your Wishlist?</h2>
          <p>Tell us where you want to go. Our local team will craft an efficient, comfortable route with transparent pricing.</p>
          <a
            className="btn btn-wa"
            href={wa("Hello Lombok Travel Diary! I have a list of destinations I would like to visit in Lombok.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

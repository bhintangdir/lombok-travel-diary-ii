"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Sparkles, Gem } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function TourPackageClient() {
  const { content } = useContent();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const c = params.get("c");
      if (c && ["all", "trek", "nature", "circuit", "fishing", "transport", "custom"].includes(c)) {
        setFilter(c);
      }
    }
  }, []);

  const waNumber = content.contact?.whatsapp || "6285138939835";
  const wa = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  const categories = [
    { key: "all", label: "All Tours" },
    { key: "trek", label: "Sembalun Trekking" },
    { key: "nature", label: "Snorkeling & Islands" },
    { key: "fishing", label: "Fishing Trips" },
    { key: "circuit", label: "Mandalika Circuit" },
    { key: "transport", label: "Car Rental & Transfer" },
    { key: "custom", label: "Custom Trip Planner" },
  ];

  // Map tours from content
  const allTours = (content.tours || []).map((t: any) => {
    let catKey = "nature";
    const slug = (t.slug || t.id || "").toLowerCase();
    const cat = (t.category || "").toLowerCase();

    if (
      cat === "mancing" ||
      cat === "fishing" ||
      slug.includes("mancing") ||
      slug.includes("fishing")
    ) {
      catKey = "fishing";
    } else if (
      cat === "trekking" ||
      slug.includes("sembalun") ||
      slug.includes("pergasingan") ||
      slug.includes("dandaun") ||
      slug.includes("anak-dara") ||
      slug.includes("kondo")
    ) {
      catKey = "trek";
    } else if (
      cat === "transport" ||
      slug.includes("rental") ||
      slug.includes("transfer") ||
      slug.includes("transport")
    ) {
      catKey = "transport";
    } else if (cat === "circuit" || slug.includes("mandalika")) {
      catKey = "circuit";
    } else if (cat === "custom" || slug.includes("custom")) {
      catKey = "custom";
    }

    const badgeText =
      catKey === "fishing"
        ? "Fishing Trip"
        : catKey === "trek"
        ? "Sembalun Trekking"
        : catKey === "transport"
        ? "Private Transport"
        : catKey === "circuit"
        ? "Motorsport & Circuit"
        : catKey === "custom"
        ? "Tailor-Made"
        : "Nature & Islands";

    return {
      ...t,
      catKey,
      badgeText,
      subTitle: t.subtitle || t.hero_tag || "",
      imageUrl: t.image?.startsWith("http")
        ? t.image
        : t.image?.startsWith("/")
        ? t.image
        : `https://images.unsplash.com/${t.image || "photo-1506905925346-21bda4d32df4"}?auto=format&fit=crop&w=800&q=70`,
      highlightsList: t.highlights || (t.bullet_points || []).slice(0, 3) || [
        "Private AC vehicle with local driver",
        "Licensed local guide accompaniment",
        "Flexible schedule tailored to you",
      ],
      includesList: t.inclusions || t.included || [
        "Private AC Car & Fuel",
        "Licensed Local Guide",
        "Entrance & Parking Fees",
        "Chilled Mineral Water",
      ],
    };
  });

  const filteredTours = allTours.filter((t: any) => filter === "all" || t.catKey === filter);

  // Custom Trip Builder States
  const [duration, setDuration] = useState("2 Days 1 Night (2D1N)");
  const [selectedDests, setSelectedDests] = useState<string[]>([
    "Savana Dandaun",
    "Gili Kedis, Nanggu & Sudak (Secret Gilis)",
  ]);
  const [selectedFeats, setSelectedFeats] = useState<string[]>([
    "Private AC Vehicle + Local Driver + Petrol",
    "Underwater GoPro Camera & Footage",
  ]);

  const toggleDest = (destName: string) => {
    setSelectedDests((prev) =>
      prev.includes(destName) ? prev.filter((d) => d !== destName) : [...prev, destName]
    );
  };

  const toggleFeat = (featName: string) => {
    setSelectedFeats((prev) =>
      prev.includes(featName) ? prev.filter((f) => f !== featName) : [...prev, featName]
    );
  };

  const buildCustomWaMessage = () => {
    let msg = `Hello Lombok Travel Diary! I would like to enquire about a Custom Trip to Lombok:\n`;
    msg += `• Duration: ${duration}\n`;
    msg += `• Selected Destinations: ${selectedDests.length > 0 ? selectedDests.join(", ") : "Local recommendations"}\n`;
    msg += `• Services: ${selectedFeats.length > 0 ? selectedFeats.join(", ") : "Standard private transport"}\n`;
    msg += `• Number of Guests: ___ people\n`;
    msg += `• Preferred Dates: ___\n`;
    msg += `Please send me an itinerary recommendation and quote. Thank you!`;
    return wa(msg);
  };

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="hero sm">
        <div className="wrap">
          <div className="crumb">
            <Link href="/" style={{ color: "rgba(255,255,255,0.85)" }}>
              Home
            </Link>{" "}
            / Tour Package
          </div>
          <h1>Lombok Tour Packages &amp; Trekking</h1>
          <p>
            Private, handcrafted itineraries: Sembalun Ridge Trekking, 3 Gilis &amp; Secret Gilis Snorkeling, rainforest waterfalls, southern beaches, and Pertamina Mandalika Circuit tours.
          </p>
        </div>
      </section>

      {/* 2. TOURS LIST & FILTERS */}
      <section id="list" style={{ paddingTop: "56px" }}>
        <div className="wrap">
          {/* Filter Chips */}
          <div className="filters" role="group" aria-label="Filter tours by category">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`chip ${filter === cat.key ? "active" : ""}`}
                aria-pressed={filter === cat.key}
                onClick={() => setFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="count">Showing {filteredTours.length} private tour packages</p>

          {/* Cards Grid */}
          <div className="grid g3" id="grid">
            {filteredTours.map((t: any, idx: number) => (
              <article key={idx} className="tc">
                <div
                  className="pic img"
                  style={{ backgroundImage: `url('${t.imageUrl}')` }}
                >
                  <span className={`badge ${t.catKey === "circuit" || t.catKey === "custom" ? "gem" : ""}`}>
                    {t.badgeText}
                  </span>
                  {t.is_popular && <span className="badge r">Most Popular</span>}
                </div>
                <div className="body">
                  <div className="sub">
                    <span>{t.duration || "Full Day"}</span>
                    <span>•</span>
                    <span>{t.difficulty || "Moderate"}</span>
                    <span>•</span>
                    <span>{t.style || "Private"}</span>
                  </div>
                  <h3>{t.name}</h3>
                  {t.subTitle && <span className="tagline">{t.subTitle}</span>}
                  <p className="d">{t.tagline || t.overview || t.description || t.short_description}</p>

                  <h4>Key Highlights</h4>
                  <ul className="hl">
                    {t.highlightsList.slice(0, 3).map((h: string, hIdx: number) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>

                  <h4>Key Inclusions</h4>
                  <div className="inc">
                    {t.includesList.slice(0, 4).map((incItem: string, incIdx: number) => (
                      <span key={incIdx}>
                        <Check size={12} strokeWidth={2.8} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "-1px" }} />
                        {incItem}
                      </span>
                    ))}
                  </div>

                  <div className="acts" style={{ marginTop: "22px" }}>
                    <Link className="btn btn-line" href={`/tour-package/${t.slug}`}>
                      View Details
                    </Link>
                    <a
                      className="btn btn-wa"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={wa(`Hello Lombok Travel Diary! I am interested in the tour package: ${t.name}. Dates: ___ Guests: ___`)}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 3. CUSTOM TRIP BUILDER (SANGAT PENTING) */}
          <div className="custom-box" id="custom-builder">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 16px",
                background: "rgba(242,165,65,0.2)",
                border: "1px solid var(--sun)",
                borderRadius: "999px",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--sun)",
                marginBottom: "14px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <Sparkles size={13} strokeWidth={2.4} />
              100% Tailor-Made Private Trip
            </div>
            <h2>Design Your Custom Lombok Trip</h2>
            <p className="cintro">
              Want to combine Sembalun ridge camping, Secret Gili snorkeling, hidden waterfalls, and a Mandalika trackday? Pick your preferred duration and spots below for an instant personalized WhatsApp quote.
            </p>

            {/* Step 1: Durasi */}
            <div className="c-step">
              <h3>
                <span>1</span> Choose Trip Duration
              </h3>
              <div className="c-opt-grid">
                {[
                  "1 Day (Day Trip)",
                  "2 Days 1 Night (2D1N)",
                  "3 Days 2 Nights (3D2N)",
                  "4 Days 3 Nights (4D3N)",
                  "5+ Days Expedition",
                ].map((dur) => (
                  <label key={dur} className={`c-opt ${duration === dur ? "checked" : ""}`}>
                    <input
                      type="radio"
                      name="c_duration"
                      value={dur}
                      checked={duration === dur}
                      onChange={() => setDuration(dur)}
                    />
                    <span className="c-control c-radio" aria-hidden="true" />
                    <span>{dur}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Destinasi & Hidden Gems */}
            <div className="c-step">
              <h3>
                <span>2</span> Select Destinations &amp; Hidden Gems (Mix &amp; Match)
              </h3>
              <div className="c-opt-grid">
                {[
                  { name: "Pergasingan Hill (1,750m)", gem: false },
                  { name: "Savana Dandaun", gem: true },
                  { name: "Bukit Anak Dara (1,921m)", gem: true },
                  { name: "Bukit Kondo", gem: true },
                  { name: "Snorkeling 3 Gilis (Trawangan, Meno, Air)", gem: false },
                  { name: "Gili Kedis, Nanggu & Sudak (Secret Gilis)", gem: true },
                  { name: "Benang Kelambu & Stokel Waterfalls", gem: false },
                  { name: "Tiu Kelep & Sendang Gile Waterfalls", gem: false },
                  { name: "Mangku Sakti Waterfall Sembalun", gem: true },
                  { name: "Pertamina Mandalika Circuit (Tour & Trackday)", gem: false },
                  { name: "Tanjung Aan Beach & Bukit Merese", gem: false },
                  { name: "Selong Belanak & Mawun Beaches", gem: false },
                  { name: "Sade & Sukarara Sasak Traditional Villages", gem: false },
                  { name: "Semeti & Telawas Blowhole Beach", gem: true },
                  { name: "Tanjung Bloam & Tunak Cliffs", gem: true },
                ].map((d) => {
                  const isChecked = selectedDests.includes(d.name);
                  return (
                    <label
                      key={d.name}
                      className={`c-opt ${d.gem ? "gem-opt" : ""} ${isChecked ? "checked" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleDest(d.name)}
                      />
                      <span className="c-control" aria-hidden="true">
                        {isChecked && <Check size={13} strokeWidth={3} />}
                      </span>
                      <span>
                        {d.gem && <Gem size={15} strokeWidth={2.3} className="c-gem-icon" style={{ color: "#F2A541", stroke: "#F2A541" }} />}
                        {d.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fasilitas Tambahan */}
            <div className="c-step">
              <h3>
                <span>3</span> Inclusions &amp; Services Needed
              </h3>
              <div className="c-opt-grid">
                {[
                  "Private AC Vehicle + Local Driver + Petrol",
                  "Underwater GoPro Camera & Footage",
                  "Full Camping Equipment & Tent Setup",
                  "Licensed Mountain Guide & Local Porter",
                  "Private Speedboat / Island Charter Boat",
                  "Mandalika Circuit Trackday Experience",
                ].map((feat) => {
                  const isChecked = selectedFeats.includes(feat);
                  return (
                    <label key={feat} className={`c-opt ${isChecked ? "checked" : ""}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFeat(feat)}
                      />
                      <span className="c-control" aria-hidden="true">
                        {isChecked && <Check size={13} strokeWidth={3} />}
                      </span>
                      <span>{feat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Live Result Box */}
            <div className="c-result-box">
              <div className="c-res-txt">
                <b>Your Custom Itinerary is Ready!</b>
                <p>
                  Duration: <b>{duration}</b> • <b>{selectedDests.length} Destinations</b> selected
                  {selectedDests.length > 0
                    ? ` (${selectedDests.slice(0, 3).join(", ")}${selectedDests.length > 3 ? ", and more" : ""})`
                    : ""}
                </p>
              </div>
              <a
                className="btn btn-sun"
                href={buildCustomWaMessage()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1rem", padding: "14px 30px" }}
              >
                Send Custom Plan to WhatsApp →
              </a>
            </div>
          </div>

          <p className="note">
            Need local advice on route logistics?{" "}
            <a
              href={wa("Hello Lombok Travel Diary! I would like recommendations for my Lombok trip.")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--link)", fontWeight: 600, textDecoration: "underline" }}
            >
              Consult directly with our local team on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      {/* 4. COMPARISON TABLE SECTION */}
      <section className="cmp" id="comparison">
        <div className="wrap">
          <div className="head c">
            <h2>Tour Package Comparison</h2>
            <p className="lead">Side-by-side comparison of our core itineraries, durations, difficulty levels, and tour styles.</p>
          </div>
          <div className="tbl">
            <table>
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Difficulty</th>
                  <th>Tour Style</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allTours.map((t: any, idx: number) => (
                  <tr key={idx}>
                    <td>
                      {t.name}
                      {t.is_popular && <span className="tag">Popular</span>}
                    </td>
                    <td>{t.badgeText}</td>
                    <td>{t.duration || "Full Day"}</td>
                    <td>{t.difficulty || "Moderate"}</td>
                    <td>{t.style || "Private"}</td>
                    <td>
                      <Link className="btn-sm btn-line" href={`/tour-package/${t.slug}`}>
                        View Tour
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">
            All tours are private or small-group with experienced local drivers and guides. Route adjustments, hotel pickups, or extra participants are gladly accommodated.
          </p>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section>
        <div className="wrap">
          <div className="head c">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq">
            <details>
              <summary>What is included in the Sembalun trekking and camping packages?</summary>
              <p>
                All Sembalun camping packages (Camping Pergasingan Hill and Savana Dandaun) are all-inclusive: hotel pick-up and drop-off in private AC car, warm meals and mineral water, clean dome tents, thick sleeping mattresses, sleeping bags, experienced local porters to carry camp gear, a licensed mountain guide, and all national park entrance fees.
              </p>
            </details>
            <details>
              <summary>Are underwater photos and videos provided?</summary>
              <p>
                Yes! Both our 3 Gilis and Secret Gilis snorkeling packages include underwater photography using high-definition GoPro cameras. All files are transferred directly to your smartphone before you return to your hotel.
              </p>
            </details>
            <details>
              <summary>How does the Pertamina Mandalika Circuit tour work?</summary>
              <p>
                The Mandalika Circuit Tour includes official walking access into the Pit Building, Paddock area, and photo stops along the famous Turn 10 batik motif curve and Bukit Seger viewpoint. For Trackday sessions (riding a motorcycle or sports car on the actual circuit), we handle official scheduling and registration.
              </p>
            </details>
            <details>
              <summary>Can I request a custom trip combining multiple destinations?</summary>
              <p>
                Absolutely! Custom trips are our specialty. You can mix and match Sembalun hill trekking, Secret Gili snorkeling, waterfalls like Benang Kelambu, and hidden coastal gems like Semeti Beach. Simply use our interactive Custom Trip Planner above or send us a message on WhatsApp.
              </p>
            </details>
            <details>
              <summary>When is the best season for trekking and island hopping in Lombok?</summary>
              <p>
                The dry season between May and October offers clear sunny skies, calm sea conditions for snorkeling, and crisp sunrise vistas above the clouds across Sembalun.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="cta">
        <div className="wrap">
          <h2>Found the Perfect Tour Package?</h2>
          <p>Send us your dates and party size. We will respond with an exact itinerary and transparent quote within hours.</p>
          <a className="btn btn-wa" href={wa("Hello Lombok Travel Diary! I would like to book a tour package.")} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp Now
          </a>
        </div>
      </section>
    </main>
  );
}

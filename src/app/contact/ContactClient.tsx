"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Mail, MapPin, Clock, ChevronDown, Check } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useContent } from "@/context/ContentContext";

export default function ContactClient() {
  const { content } = useContent();
  const page = content.contact_page;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [tourChoice, setTourChoice] = useState("Custom Trip (Tailor-Made Itinerary)");
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Lombok Travel Diary! 👋",
      `My name is: ${name.trim()}`,
      `I am interested in: ${tourChoice}`,
    ];
    if (date.trim()) lines.push(`Travel dates: ${date.trim()}`);
    if (guests) lines.push(`Number of guests: ${guests} people`);
    if (message.trim()) lines.push(`Additional notes: ${message.trim()}`);

    const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const defaultTourOptions = [
    "Custom Trip (Tailor-Made Itinerary)",
    "Camping Pergasingan Hill (2D1N)",
    "Camping Savana Dandaun Hill (2D1N)",
    "Hiking Bukit Anak Dara",
    "Hiking Bukit Kondo",
    "Snorkeling 3 Gilis (Trawangan, Meno, Air)",
    "Snorkeling Secret Gilis (Nanggu, Sudak, Kedis)",
    "Lombok Fishing Expeditions (Pelangan, Teluk Sepi, Ampenan)",
    "Central Lombok Waterfalls (Benang Kelambu & Stokel)",
    "North Lombok Waterfalls (Tiu Kelep & Sendang Gile)",
    "Sasak Heritage & Southern Beaches",
    "South Lombok Beach Tour & Merese Sunset",
    "Mandalika Circuit Tour & Trackday Experience",
    "Car or Scooter Rental with Driver",
    "Airport or Harbor Transfer",
  ];

  return (
    <main>
      {/* Hero */}
      <section
        className="hero sm"
        style={{
          backgroundImage:
            "linear-gradient(180deg,rgba(4,58,75,.5),rgba(4,58,75,.78)),url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=70'),linear-gradient(135deg,var(--sea),var(--deep))",
        }}
      >
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">Contact</span>
          </div>
          <h1>
            Let Us Plan <span className="text-[#F2A541]">Your Trip.</span>
          </h1>
          <p>The fastest way to reach us is WhatsApp. Prefer email or dropping by our office? We would love that too.</p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section style={{ paddingBottom: "40px" }}>
        <div className="wrap">
          <div className="grid g4">
            <a
              className="sc cc"
              href={`https://wa.me/${content.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="ico ico-wa">
                <WhatsAppIcon size={28} />
              </div>
              <b>WhatsApp</b>
              <p>{content.contact.phone}</p>
            </a>

            <a className="sc cc" href={`mailto:${content.contact.email}`}>
              <div className="ico">
                <Mail size={26} strokeWidth={2} />
              </div>
              <b>Email</b>
              <p>{content.contact.email}</p>
            </a>

            <div className="sc cc">
              <div className="ico">
                <MapPin size={26} strokeWidth={2} />
              </div>
              <b>Office</b>
              <p>{content.contact.address}</p>
            </div>

            <div className="sc cc">
              <div className="ico">
                <Clock size={26} strokeWidth={2} />
              </div>
              <b>Opening Hours</b>
              <p>Every day, 08:00 to 20:00 (WITA)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Split */}
      <section style={{ paddingTop: "20px" }}>
        <div className="wrap split" style={{ alignItems: "start" }}>
          <form className="cform" onSubmit={handleSubmit}>
            <h2>Send an Enquiry</h2>
            <p className="lead" style={{ marginBottom: "22px" }}>
              Fill this in and we will open WhatsApp with your message ready to send.
            </p>

            <div className="frow">
              <div className="field">
                <label htmlFor="nm">Your Name</label>
                <input
                  id="nm"
                  required
                  placeholder="e.g. Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="gs">Guests</label>
                <input
                  id="gs"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>

            <div className="frow">
              <div className="field">
                <label htmlFor="dt">Travel Dates</label>
                <input
                  id="dt"
                  placeholder="e.g. 12 to 18 June"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="field custom-dropdown-field" ref={dropdownRef}>
                <label id="interest-label">I Am Interested In</label>
                <button
                  type="button"
                  id="interest-trigger"
                  className={`custom-select-trigger ${dropdownOpen ? "active" : ""}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-labelledby="interest-label"
                >
                  <span className="cst-value-text">{tourChoice}</span>
                  <span className="cst-chevron-wrap" aria-hidden="true">
                    <ChevronDown
                      size={18}
                      strokeWidth={2.4}
                      className={`cst-chevron ${dropdownOpen ? "open" : ""}`}
                    />
                  </span>
                </button>

                {dropdownOpen && (
                  <div
                    className="custom-select-menu"
                    role="listbox"
                    aria-labelledby="interest-label"
                  >
                    {defaultTourOptions.map((opt, i) => {
                      const isSelected = opt === tourChoice;
                      return (
                        <div
                          key={i}
                          role="option"
                          aria-selected={isSelected}
                          className={`custom-select-option ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            setTourChoice(opt);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="cso-text">{opt}</span>
                          {isSelected && (
                            <Check size={16} strokeWidth={2.6} className="cso-check" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="ms">Message &amp; Wishlist</label>
              <textarea
                id="ms"
                rows={4}
                placeholder="Tell us what you would like to do (hotel, flights, custom places, preferences)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button className="btn btn-wa" type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <WhatsAppIcon size={18} />
              Send via WhatsApp
            </button>
          </form>

          <div>
            <iframe
              className="map"
              title="Lombok Travel Diary office map"
              loading="lazy"
              src={content.contact.map_embed}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f8fafc", padding: "75px 0" }}>
        <div className="wrap">
          <div className="head c">
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", letterSpacing: "1.2px", display: "inline-block", marginBottom: "8px" }}>
              Frequently Asked Questions
            </span>
            <h2>{page.faq.heading || "Quick Answers"}</h2>
            <p className="lead" style={{ maxWidth: "580px", margin: "6px auto 0" }}>
              Have questions about contacting our local team or office visits? Here are common answers.
            </p>
          </div>
          <div className="faq">
            {page.faq.items.map((fq, i) => (
              <details key={i}>
                <summary>{fq.q}</summary>
                <p>{fq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>{page.cta.heading}</h2>
          <p>{page.cta.subheading}</p>
          <a
            className="btn btn-sun"
            href={`https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
              "Hi Lombok Travel Diary! I'd like to plan my trip."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <WhatsAppIcon size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

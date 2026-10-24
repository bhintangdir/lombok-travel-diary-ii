"use client";

import React, { useState } from "react";
import { useContent } from "@/context/ContentContext";
import DynamicIcon from "@/components/DynamicIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Mail, Edit3, Send, MapPin } from "lucide-react";

export default function ContactClient() {
  const { content } = useContent();
  const page = content.contact_page;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [tourChoice, setTourChoice] = useState("Gili Islands Hopping");
  const [hotel, setHotel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hi Lombok Travel Diary! 👋",
      `I'm ${name.trim()}.`,
      `Interested in: ${tourChoice}`,
    ];
    if (date) lines.push(`Travel date: ${date}`);
    if (guests) lines.push(`Guests: ${guests}`);
    if (hotel) lines.push(`Staying at: ${hotel}`);
    if (message.trim()) lines.push("", message.trim());

    const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const getQuickLink = (type: string) => {
    switch (type) {
      case "wa":
        return `https://wa.me/${content.contact.whatsapp}`;
      case "email":
        return `mailto:${content.contact.email}`;
      case "ig":
        return content.contact.instagram_url;
      case "tiktok":
        return content.contact.tiktok_url || "https://www.tiktok.com/@lomboktraveldiary";
      case "office":
        return "#office";
      default:
        return "#";
    }
  };

  return (
    <main>
      {/* Hero */}
      <header className="hero">
        <div className="wrap">
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Mail size={14} className="w-3.5 h-3.5 inline" />
            {page.tag}
          </span>
          <h1>
            {page.heading_line_1} <em>{page.heading_highlight}</em>
          </h1>
          <p>{page.subheading}</p>
        </div>
      </header>

      {/* Quick Contact Cards */}
      <div className="quick">
        <div className="wrap qg">
          {page.quick_cards.map((qc, i) => (
            <a
              key={i}
              className={`card q q-${qc.type} ${qc.color}`}
              href={getQuickLink(qc.type)}
              target={qc.type !== "office" && qc.type !== "email" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              <div className="ic" style={{ display: "grid", placeItems: "center" }}>
                <DynamicIcon name={qc.icon} size={36} className="w-9 h-9" />
              </div>
              <h3>{qc.title}</h3>
              <p>
                {qc.desc}
                <br />
                {qc.sub}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <section>
        <div className="wrap fw">
          <div>
            <span className="tag">{page.form_section.tag}</span>
            <h2>{page.form_section.heading}</h2>
            <p>{page.form_section.paragraph_1}</p>
            <p>{page.form_section.paragraph_2}</p>
            <div className="note-box">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Edit3 size={20} className="text-[var(--navy)]" />
                <h3>{page.form_section.note_box.title}</h3>
              </div>
              <ul>
                {page.form_section.note_box.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          </div>

          <form className="card form" onSubmit={handleSubmit}>
            <h3>Trip request</h3>

            <label htmlFor="name">Your name</label>
            <input
              id="name"
              required
              placeholder="e.g. Emma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="row">
              <div>
                <label htmlFor="date">Travel date</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="guests">Guests</label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max="30"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="tour">I&apos;m interested in</label>
            <select
              id="tour"
              value={tourChoice}
              onChange={(e) => setTourChoice(e.target.value)}
            >
              {content.tours.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
              <option value="Car or Scooter Rental">Car or Scooter Rental</option>
              <option value="Airport / Harbour Transfer">Airport / Harbour Transfer</option>
            </select>

            <label htmlFor="hotel">Hotel / area (optional)</label>
            <input
              id="hotel"
              placeholder="e.g. Kuta, Senggigi"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
            />

            <label htmlFor="msg">Message</label>
            <textarea
              id="msg"
              placeholder="Tell us anything we should know..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              className="btn b-green"
              type="submit"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <Send size={18} /> Send via WhatsApp
            </button>
            <p className="hint">Opens WhatsApp with your message prefilled.</p>
          </form>
        </div>
      </section>

      {/* Office Section */}
      <section className="alt" id="office">
        <div className="wrap">
          <div className="head">
            <span className="tag">{page.office_section.tag}</span>
            <h2>{page.office_section.heading}</h2>
          </div>
          <div className="loc">
            <div className="card info">
              <h3>{page.office_section.title}</h3>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={15} style={{ color: "var(--red)", flexShrink: 0 }} />
                {content.contact.address}
              </p>
              <ul className="hrs">
                <li>
                  <span>Monday – Saturday</span>
                  <b>08:00 – 20:00</b>
                </li>
                <li>
                  <span>Sunday</span>
                  <b>09:00 – 17:00</b>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <b>Replies all day</b>
                </li>
              </ul>
              <a
                className="btn b-red"
                href={content.contact.maps_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>
            <div className="card mapc">
              <iframe
                className="map"
                title="Office location"
                loading="lazy"
                src={content.contact.map_embed}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <div className="head">
            <span className="tag">{page.faq.tag}</span>
            <h2>{page.faq.heading}</h2>
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
            className="btn b-yellow"
            href={`https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
              "Hi Lombok Travel Diary! I'd like to plan my trip."
            )}`}
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

"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import DynamicIcon from "@/components/DynamicIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Leaf, BookOpen } from "lucide-react";

export default function AboutClient() {
  const { content } = useContent();
  const page = content.about_page;

  const waStory = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like to know more about Lombok Travel Diary."
  )}`;

  const waCta = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    content.cta.button_message
  )}`;

  return (
    <main>
      {/* Hero */}
      <header className="hero">
        <div className="wrap">
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <BookOpen size={14} className="w-3.5 h-3.5 inline" />
            {page.tag}
          </span>
          <h1>
            {page.heading_line_1} <em>{page.heading_highlight}</em>
          </h1>
          <p>{page.subheading}</p>
        </div>
      </header>

      {/* Story */}
      <section>
        <div className="wrap story">
          <div>
            <span className="tag">{page.story.tag}</span>
            <h2>{page.story.heading}</h2>
            <p>{page.story.paragraph_1}</p>
            <p>{page.story.paragraph_2}</p>
            <p>{page.story.paragraph_3}</p>
            <a
              className="btn b-red"
              href={waStory}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
              {page.story.cta_button}
            </a>
          </div>
          <div className="pw">
            <div className="pol">
              <div
                className="pic"
                style={{
                  backgroundImage: `url(${page.story.polaroid_image || '/tanjung-ann.webp'})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <p>{page.story.polaroid_caption}</p>
            </div>
            <div className="pol s">
              <div
                className="pic"
                style={{
                  backgroundImage: `url(${page.story.small_polaroid_image || '/tete-batu-village-tour.jpg'})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="alt" style={{ padding: "50px 0" }}>
        <div className="wrap stats-grid">
          {page.stats.map((st, i) => (
            <div key={i} className={`card stat ${st.color}`}>
              <b>{st.value}</b>
              <span>{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values / Page Rules */}
      <section>
        <div className="wrap">
          <div className="head">
            <span className="tag">{page.values.tag}</span>
            <h2>{page.values.heading}</h2>
            <p>{page.values.subheading}</p>
          </div>
          <div className="grid g4">
            {page.values.items.map((val, i) => (
              <div key={i} className={`card val ${val.color}`}>
                <div className="ic" style={{ display: "grid", placeItems: "center" }}>
                  <DynamicIcon name={val.icon} size={36} className="w-9 h-9" />
                </div>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Chapters */}
      <section className="alt">
        <div className="wrap">
          <div className="head">
            <span className="tag">{page.milestones.tag}</span>
            <h2>{page.milestones.heading}</h2>
          </div>
          <div className="tl" style={{ maxWidth: "760px", margin: "0 auto" }}>
            {page.milestones.items.map((ms, i) => (
              <div key={i} className="ms">
                <div className="card">
                  <time>{ms.chapter}</time>
                  <h3>{ms.title}</h3>
                  <p>{ms.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="alt">
        <div className="wrap">
          <div className="head">
            <span className="tag">{page.promises.tag}</span>
            <h2>{page.promises.heading}</h2>
          </div>
          <div className="pro">
            <div className="card pbox">
              <h3>{page.promises.for_you.title}</h3>
              <ul>
                {page.promises.for_you.items.map((it, i) => (
                  <li key={i}>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card pbox eco">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Leaf size={24} className="text-[var(--green)]" />
                <h3>{page.promises.for_lombok.title}</h3>
              </div>
              <ul>
                {page.promises.for_lombok.items.map((it, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: 0 }}>
                    <Leaf size={14} className="text-[var(--green)] flex-shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>{page.cta.heading}</h2>
          <p>{page.cta.subheading}</p>
          <div className="row">
            <a
              className="btn b-yellow"
              href={waCta}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <WhatsAppIcon size={18} className="w-4 h-4 text-[var(--ink)]" />
              Chat on WhatsApp
            </a>
            <Link className="btn" href="/tour-package">
              Browse Tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Compass, Check, ShieldCheck, HeartHandshake } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function AboutClient() {
  const { content } = useContent();

  const waNumber = content.contact?.whatsapp || "6285138939835";
  const wa = (text: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  return (
    <main>
      {/* 1. HERO BANNER */}
      <section
        className="hero sm"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4, 58, 75, 0.6), rgba(4, 58, 75, 0.82)), url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=70'), linear-gradient(135deg, var(--sea), var(--deep))",
        }}
      >
        <div className="wrap">
          <div className="crumb">
            <Link href="/" style={{ color: "rgba(255,255,255,0.85)" }}>
              Home
            </Link>{" "}
            / About
          </div>
          <h1>Local Team, Island Heart.</h1>
          <p>
            We are Lombok Travel Diary — dedicated to helping you experience the raw beauty and warm spirit of Lombok Island, honestly and unhurriedly.
          </p>
        </div>
      </section>

      {/* 2. STORY SPLIT */}
      <section>
        <div className="wrap split">
          <div
            className="photo"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=70')",
            }}
            role="img"
            aria-label="Peaceful Lombok beach"
          />
          <div>
            <h2>Our Story</h2>
            <p>
              Lombok Travel Diary grew out of a straightforward belief: every traveler deserves a holiday shaped by people who actually live here. No convoluted booking engines, no hidden fees, just personal, direct communication on WhatsApp.
            </p>
            <p>
              Today, we organize 100% customizable private tours, Sembalun hill camping (Pergasingan, Savana Dandaun, Anak Dara, Kondo), snorkeling across untouched Secret Gilis, comfortable vehicle rentals, and airport transfers tailored entirely to your personal schedule.
            </p>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: "20px 0 24px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.95rem" }}>
                <Check size={18} strokeWidth={2.6} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "2px" }} />
                <span>Born-and-raised local guides, certified drivers, and mountain porters</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.95rem" }}>
                <Check size={18} strokeWidth={2.6} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "2px" }} />
                <span>100% customizable itineraries crafted to match your own natural pace</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.95rem" }}>
                <Check size={18} strokeWidth={2.6} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "2px" }} />
                <span>Direct WhatsApp concierge before and during your journey across Lombok</span>
              </li>
            </ul>
            <a
              className="btn btn-primary"
              href={wa("Hello Lombok Travel Diary! I would like to learn more about your team and private tour packages.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat With Our Team
            </a>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE STAND FOR */}
      <section className="why">
        <div className="wrap">
          <div className="head c">
            <h2>What We Stand For</h2>
            <p className="lead">Our guiding principles to guarantee a comfortable, transparent, and respectful journey.</p>
          </div>
          <div className="grid g4">
            <div className="item">
              <div className="ico">
                <Compass size={26} strokeWidth={2} />
              </div>
              <h3>Deep Local Knowledge</h3>
              <p>We know the quietest coves, the cleanest mountain trails, and the optimal times to avoid crowds.</p>
            </div>
            <div className="item">
              <div className="ico">
                <Check size={26} strokeWidth={2.4} style={{ color: "var(--sea)" }} />
              </div>
              <h3>Transparent Pricing</h3>
              <p>Upfront, honest quotes with zero surprise surcharges or forced shopping commissions.</p>
            </div>
            <div className="item">
              <div className="ico">
                <ShieldCheck size={26} strokeWidth={2} />
              </div>
              <h3>Safety &amp; Comfort First</h3>
              <p>Well-maintained air-conditioned vehicles, inspected speedboats, and quality camping equipment.</p>
            </div>
            <div className="item">
              <div className="ico">
                <HeartHandshake size={26} strokeWidth={2} />
              </div>
              <h3>Respectful Tourism</h3>
              <p>Supporting local porters fairly and honoring traditional Sasak customs and natural ecosystems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW TO BOOK (4 STEPS) */}
      <section className="book" id="how-to-book">
        <div className="wrap">
          <div className="head c">
            <h2>Four Simple Steps</h2>
            <p className="lead">Smooth planning from initial idea to your first sunset in Lombok.</p>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Drop Us a Line</h3>
              <p>Say hello anytime directly on WhatsApp.</p>
            </div>
            <div className="step">
              <h3>Share Your Vision</h3>
              <p>Tell us your travel dates, party size, and wishlist spots.</p>
            </div>
            <div className="step">
              <h3>Receive Itinerary</h3>
              <p>A transparent breakdown and honest local quote within hours.</p>
            </div>
            <div className="step">
              <h3>Confirm &amp; Explore</h3>
              <p>Lock in your dates and let us handle all the logistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="cta">
        <div className="wrap">
          <h2>Let Us Plan Your Lombok Experience</h2>
          <p>Send us a message today and receive a complimentary tailor-made itinerary for your dates.</p>
          <a className="btn btn-wa" href={wa("Hello Lombok Travel Diary! I would like to plan my trip to Lombok.")} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp Now
          </a>
        </div>
      </section>
    </main>
  );
}

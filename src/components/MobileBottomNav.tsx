"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  MapPin,
  Menu,
  X,
  Camera,
  Info,
  PhoneCall,
  Car,
  Plane,
  Sparkles,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useContent } from "@/context/ContentContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { content } = useContent();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close more drawer on route change
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  // Lock body scroll when more drawer is open
  useEffect(() => {
    if (moreOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [moreOpen]);

  const waNumber = content.contact?.whatsapp || "6285138939835";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    content.nav?.book_now_message || "Hello Lombok Travel Diary! I would like to plan a trip."
  )}`;

  const isHomeActive = pathname === "/";
  const isPackageActive = pathname.startsWith("/tour-package");
  const isDestActive = pathname.startsWith("/destination");

  return (
    <>
      {/* 1. FIXED BOTTOM NAVBAR */}
      <nav className="mob-bottom-nav" aria-label="Mobile Navigation">
        {/* Menu 1: Home */}
        <Link
          href="/"
          className={`mob-nav-btn ${isHomeActive ? "active" : ""}`}
          aria-label="Home"
        >
          <div className="mob-nav-ico">
            <Home size={22} strokeWidth={isHomeActive ? 2.5 : 2} />
          </div>
          <span>Home</span>
        </Link>

        {/* Menu 2: Package */}
        <Link
          href="/tour-package"
          className={`mob-nav-btn ${isPackageActive ? "active" : ""}`}
          aria-label="Tour Packages"
        >
          <div className="mob-nav-ico">
            <Compass size={22} strokeWidth={isPackageActive ? 2.5 : 2} />
          </div>
          <span>Package</span>
        </Link>

        {/* Menu 3: Destination */}
        <Link
          href="/destination"
          className={`mob-nav-btn ${isDestActive ? "active" : ""}`}
          aria-label="Destinations"
        >
          <div className="mob-nav-ico">
            <MapPin size={22} strokeWidth={isDestActive ? 2.5 : 2} />
          </div>
          <span>Destination</span>
        </Link>

        {/* Menu 4: More */}
        <button
          type="button"
          onClick={() => setMoreOpen(!moreOpen)}
          className={`mob-nav-btn ${moreOpen ? "active" : ""}`}
          aria-label="More navigation options"
          aria-expanded={moreOpen}
        >
          <div className="mob-nav-ico">
            <Menu size={22} strokeWidth={moreOpen ? 2.5 : 2} />
          </div>
          <span>More</span>
        </button>
      </nav>

      {/* 2. MORE MENU DRAWER / BOTTOM SHEET */}
      {moreOpen && (
        <div
          className="mob-more-overlay"
          onClick={() => setMoreOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mob-more-title"
        >
          <div
            className="mob-more-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Handle & Header */}
            <div className="mob-more-handle" />
            <div className="mob-more-header">
              <h3 id="mob-more-title">More Menus &amp; Services</h3>
              <button
                type="button"
                className="mob-more-close"
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2.4} />
              </button>
            </div>

            {/* Menu Links Grid */}
            <div className="mob-more-grid">
              <Link
                href="/#gallery"
                className="mob-more-card"
                onClick={() => setMoreOpen(false)}
              >
                <div className="mm-ico">
                  <Camera size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <b>Moments Gallery</b>
                  <p>Real photo moments across Lombok</p>
                </div>
              </Link>

              <Link
                href="/about"
                className="mob-more-card"
                onClick={() => setMoreOpen(false)}
              >
                <div className="mm-ico">
                  <Info size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <b>About Us</b>
                  <p>Our story &amp; local tour philosophy</p>
                </div>
              </Link>

              <Link
                href="/contact"
                className="mob-more-card"
                onClick={() => setMoreOpen(false)}
              >
                <div className="mm-ico">
                  <PhoneCall size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <b>Contact &amp; Office</b>
                  <p>Direct WhatsApp, email &amp; office map</p>
                </div>
              </Link>

              <Link
                href="/tour-package#custom-builder"
                className="mob-more-card highlight"
                onClick={() => setMoreOpen(false)}
              >
                <div className="mm-ico gold">
                  <Sparkles size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <b>Custom Trip Planner</b>
                  <p>Build tailor-made private itinerary</p>
                </div>
              </Link>

              <Link
                href="/#our-services"
                className="mob-more-card"
                onClick={() => setMoreOpen(false)}
              >
                <div className="mm-ico">
                  <Car size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <b>Car &amp; Scooter Rental</b>
                  <p>Comfortable vehicles with local drivers</p>
                </div>
              </Link>

              <Link
                href="/#our-services"
                className="mob-more-card"
                onClick={() => setMoreOpen(false)}
              >
                <div className="mm-ico">
                  <Plane size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <b>Airport &amp; Harbor Transfer</b>
                  <p>Punctual pick-up &amp; drop-off service</p>
                </div>
              </Link>
            </div>

            {/* Bottom WhatsApp Action in Drawer */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mob-more-wa"
              onClick={() => setMoreOpen(false)}
            >
              <WhatsAppIcon size={20} />
              Chat on WhatsApp Directly
            </a>
          </div>
        </div>
      )}
    </>
  );
}


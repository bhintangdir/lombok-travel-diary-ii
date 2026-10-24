"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import {
  Home,
  Compass,
  MapPin,
  PhoneCall,
  MoreHorizontal,
  X,
  Camera,
  Info,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import LanguageSelector from "@/components/LanguageSelector";

export default function Navbar() {
  const { content } = useContent();
  const [morePopupOpen, setMorePopupOpen] = useState(false);
  const pathname = usePathname();

  // Close popup on path change
  useEffect(() => {
    setMorePopupOpen(false);
  }, [pathname]);

  const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.nav.book_now_message)}`;

  const moreLinks = [
    { name: "Gallery", path: "/#gallery", icon: Camera, desc: "Moments from Lombok roads" },
    { name: "About Us", path: "/about", icon: Info, desc: "Our team, story & promises" },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="wrap nav" style={{ position: "relative" }}>
          {/* Logo */}
          <Link href="/" className="logo" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo-label.png"
              alt="Lombok Travel Diary"
              style={{
                height: "44px",
                width: "auto",
                objectFit: "contain",
                display: "block"
              }}
            />
          </Link>

          {/* Right section: Links (desktop) + Language Switcher + Book Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Desktop Navigation Links */}
            <ul className="links hidden lg:flex" style={{ margin: 0, padding: 0 }}>
              {content.nav.links.map((link, idx) => {
                const isActive =
                  pathname === link.path ||
                  (link.path === "/tour-package" && pathname.startsWith("/tour-package")) ||
                  (link.path === "/destination" && pathname.startsWith("/destination")) ||
                  (link.path === "/about" && pathname === "/about") ||
                  (link.path === "/contact" && pathname === "/contact");

                return (
                  <li key={idx}>
                    <Link href={link.path} className={isActive ? "on" : ""}>
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Language Switcher with Diary theme dropdown */}
            <LanguageSelector />

            {/* Book Now Button */}
            <a
              className="btn b-red inline-flex items-center"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "32px",
                padding: "0 10px",
                borderRadius: "8px",
                border: "2px solid var(--ink)",
                boxShadow: "2px 2px 0 var(--ink)",
                fontSize: "0.76rem",
                fontWeight: 700,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                whiteSpace: "nowrap",
              }}
            >
              <span className="hide-on-mobile-icon hidden sm:inline-flex" style={{ alignItems: "center" }}>
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" size={14} />
              </span>
              <span>{content.nav.book_now_text}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile More Popup Sheet */}
      {morePopupOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(30,42,68,0.35)" }}
            onClick={() => setMorePopupOpen(false)}
          />
          {/* Sheet */}
          <div
            className="fixed left-3 right-3 z-50 lg:hidden rounded-2xl overflow-hidden"
            style={{
              bottom: "calc(70px + env(safe-area-inset-bottom, 0px))",
              maxWidth: "420px",
              margin: "0 auto",
              border: "2.5px solid var(--ink)",
              boxShadow: "6px 6px 0 var(--ink)",
              background: "#fff",
              backgroundImage: "repeating-linear-gradient(transparent 0 27px, var(--line) 27px 28px)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px 10px",
                borderBottom: "2px dashed var(--ink)",
                background: "var(--yellow)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--navy)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <BookOpen size={20} />
                More Pages
              </span>
              <button
                type="button"
                onClick={() => setMorePopupOpen(false)}
                style={{
                  background: "none",
                  border: "2px solid var(--ink)",
                  borderRadius: "8px",
                  padding: "4px 6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "var(--ink)",
                }}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links */}
            <div style={{ padding: "12px" }}>
              {moreLinks.map((item) => {
                const IconComp = item.icon;
                const active = pathname === item.path || (item.path === "/about" && pathname === "/about");
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMorePopupOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: "2px solid var(--ink)",
                      marginBottom: "8px",
                      background: active ? "var(--yellow)" : "#fff",
                      boxShadow: active ? "3px 3px 0 var(--ink)" : "none",
                      color: "var(--ink)",
                      fontWeight: active ? 700 : 500,
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "var(--paper)",
                          border: "2px solid var(--ink)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--navy)",
                          flexShrink: 0,
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: "0.92rem", fontWeight: 700, display: "block", lineHeight: 1.2 }}>{item.name}</span>
                        <span style={{ fontSize: "0.78rem", color: "#4a5873" }}>{item.desc}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} style={{ color: "var(--ink)", flexShrink: 0 }} />
                  </Link>
                );
              })}
            </div>

            {/* WA Button */}
            <div style={{ padding: "0 12px 14px" }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn b-green"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  fontSize: "0.88rem",
                }}
              >
                <WhatsAppIcon size={16} className="text-white" />
                <span>Direct WhatsApp Booking</span>
              </a>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom Fixed Nav Bar */}
      <nav
        id="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          backgroundColor: "var(--navy)",
          borderTop: "3px solid var(--yellow)",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.35)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        className="lg:hidden"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            height: "60px",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          {/* 1. Home */}
          <Link
            href="/"
            onClick={() => setMorePopupOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "100%",
              padding: "6px 0",
              color: pathname === "/" ? "var(--yellow)" : "rgba(255,255,255,0.75)",
              fontWeight: pathname === "/" ? 700 : 400,
              transition: "color 0.15s",
              textDecoration: "none",
            }}
          >
            <Home size={20} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1 }}>Home</span>
          </Link>

          {/* 2. Tour Packages */}
          <Link
            href="/tour-package"
            onClick={() => setMorePopupOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "100%",
              padding: "6px 0",
              color: pathname.startsWith("/tour-package") ? "var(--yellow)" : "rgba(255,255,255,0.75)",
              fontWeight: pathname.startsWith("/tour-package") ? 700 : 400,
              transition: "color 0.15s",
              textDecoration: "none",
            }}
          >
            <Compass size={20} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1 }}>Tours</span>
          </Link>

          {/* 3. Destination */}
          <Link
            href="/destination"
            onClick={() => setMorePopupOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "100%",
              padding: "6px 0",
              color: pathname.startsWith("/destination") ? "var(--yellow)" : "rgba(255,255,255,0.75)",
              fontWeight: pathname.startsWith("/destination") ? 700 : 400,
              transition: "color 0.15s",
              textDecoration: "none",
            }}
          >
            <MapPin size={20} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1 }}>Places</span>
          </Link>

          {/* 4. Contact */}
          <Link
            href="/contact"
            onClick={() => setMorePopupOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "100%",
              padding: "6px 0",
              color: pathname.startsWith("/contact") ? "var(--yellow)" : "rgba(255,255,255,0.75)",
              fontWeight: pathname.startsWith("/contact") ? 700 : 400,
              transition: "color 0.15s",
              textDecoration: "none",
            }}
          >
            <PhoneCall size={20} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1 }}>Contact</span>
          </Link>

          {/* 5. More */}
          <button
            type="button"
            onClick={() => setMorePopupOpen(!morePopupOpen)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "100%",
              padding: "6px 0",
              color: morePopupOpen || pathname.startsWith("/about") ? "var(--yellow)" : "rgba(255,255,255,0.75)",
              fontWeight: morePopupOpen || pathname.startsWith("/about") ? 700 : 400,
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.15s",
            }}
            aria-label="More options"
          >
            <MoreHorizontal size={20} />
            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1 }}>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}

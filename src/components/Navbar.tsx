"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/context/ContentContext";
import LanguageSelector from "@/components/LanguageSelector";
import BrandLogo from "@/components/BrandLogo";

export default function Navbar() {
  const { content } = useContent();
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    content.nav?.book_now_message || "Hi Lombok Travel Diary! I'd like to plan a trip."
  )}`;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tour Package", path: "/tour-package" },
    { name: "Destination", path: "/destination" },
    { name: "Gallery", path: "/#gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`site-header ${solid ? "solid" : ""}`}>
      <div className="wrap nav-wrap">
        {/* Brand Logo: on top uses logo-top, scrolled uses logo-scrolled */}
        <Link href="/" className="site-logo" aria-label="Lombok Travel Diary Home">
          <BrandLogo variant="navbar" scrolled={solid} />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="desktop-menu-links">
          {navLinks.map((link, idx) => {
            const isActive =
              link.path === "/"
                ? pathname === "/"
                : link.path === "/#gallery"
                ? false
                : pathname === link.path || pathname.startsWith(link.path + "/");

            return (
              <li key={idx}>
                <Link
                  href={link.path}
                  className={isActive ? "on" : ""}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    if (link.path === "/#gallery" && pathname === "/") {
                      e.preventDefault();
                      const el = document.getElementById("gallery");
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 190;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Top Navbar Actions (Always visible on Desktop & Mobile): Language Selector + Book Now */}
        <div className="nav-top-actions">
          <LanguageSelector />
          <a
            className="btn btn-sun nav-book-btn"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}

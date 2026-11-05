"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const { content } = useContent();

  const phone = content.contact?.phone || "+62 851-3893-9835";
  const email = content.contact?.email || "lomboktraveldiary@gmail.com";
  const address = content.contact?.address || "Meninting, Batulayar, Lombok Barat";

  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          {/* Column 1: Brand Logo using logo-top */}
          <div>
            <div style={{ marginBottom: "18px" }}>
              <Link href="/" aria-label="Lombok Travel Diary Home">
                <BrandLogo variant="top" />
              </Link>
            </div>
            <p style={{ maxWidth: "300px", lineHeight: 1.6, fontSize: "0.92rem", color: "#a5c2cc" }}>
              Private tours, Sembalun ridge trekking, Gili snorkeling, comfortable vehicle rentals, and tailor-made custom trips across Lombok.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/tour-package">Tour Packages</Link></li>
              <li><Link href="/destination">Destinations &amp; Gems</Link></li>
              <li><Link href="/#gallery">Moments Gallery</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/tour-package#custom-builder">Custom Trip Planner</Link></li>
              <li><Link href="/#our-services">Car &amp; Scooter Rental</Link></li>
              <li><Link href="/#our-services">Airport &amp; Harbor Transfer</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact with Lucide Icons */}
          <div>
            <h4>Contact</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={16} style={{ color: "var(--sea)", flexShrink: 0 }} />
                <span>{phone}</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={16} style={{ color: "var(--sea)", flexShrink: 0 }} />
                <span>{email}</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "3px" }} />
                <span>{address}</span>
              </li>
              <li style={{ marginTop: "6px" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--sun)",
                    fontWeight: 600,
                  }}
                >
                  Contact Us <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy">
          © {new Date().getFullYear()} Lombok Travel Diary. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

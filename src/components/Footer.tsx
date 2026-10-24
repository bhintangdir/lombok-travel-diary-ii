"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import InstagramIcon from "@/components/InstagramIcon";
import TikTokIcon from "@/components/TikTokIcon";
import { MapPin, Mail, Clock, Compass, Phone } from "lucide-react";

export default function Footer() {
  const { content } = useContent();

  const waUrl = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent("Hi Lombok Travel Diary! I'd like to ask about your tour packages and transport services.")}`;

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          {/* Column 1: Brand & Detailed Story */}
          <div>
            <Link href="/" style={{ display: "inline-block" }}>
              <img
                src="/logo-square.png"
                alt="Lombok Travel Diary"
                style={{
                  height: "76px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>
            <p
              style={{
                marginTop: "14px",
                fontSize: "0.88rem",
                lineHeight: "1.6",
                color: "#d0dcf5",
              }}
            >
              {content.footer.about_text}
            </p>

            <div
              style={{
                marginTop: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                border: "1px dashed rgba(247, 197, 72, 0.4)",
                fontSize: "0.82rem",
                color: "#e2ecff",
              }}
            >
              <MapPin size={15} className="text-[var(--yellow)] shrink-0" />
              <span>Meninting, Batulayar, Lombok Barat</span>
            </div>

            <div style={{ marginTop: "14px" }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn b-green"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.82rem",
                  padding: "6px 14px",
                }}
              >
                <WhatsAppIcon size={15} />
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation & Pages */}
          <div>
            <h4>Pages</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/tour-package">Tour Packages</Link>
              </li>
              <li>
                <Link href="/destination">Destinations</Link>
              </li>
              <li>
                <Link href="/#gallery">Diary Snapshots</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Tour Packages */}
          <div>
            <h4>Tour Packages</h4>
            <ul>
              <li>
                <Link href="/tour-package/snorkeling-3-gili">3 Gilis Snorkeling</Link>
              </li>
              <li>
                <Link href="/tour-package/sembalun-sunrise-rinjani">Sembalun &amp; Rinjani</Link>
              </li>
              <li>
                <Link href="/tour-package/mancing-spot-ampenan">Ampenan Fishing (Mar–Sep)</Link>
              </li>
              <li>
                <Link href="/tour-package/mancing-spot-teluk-sepi">Teluk Sepi Fishing (Oct–Mar)</Link>
              </li>
              <li>
                <Link href="/tour-package/mancing-spot-pelangan">Pelangan Fishing (Year-Round)</Link>
              </li>
              <li>
                <Link href="/tour-package/waterfall-lombok-tengah">Benang Kelambu Falls</Link>
              </li>
              <li>
                <Link href="/tour-package#sewa">Car Rental with Driver</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Popular Destinations */}
          <div>
            <h4>Destinations</h4>
            <ul>
              <li>
                <Link href="/destination/gili-islands">Gili Islands</Link>
              </li>
              <li>
                <Link href="/destination/kuta-mandalika">Kuta Mandalika Beach</Link>
              </li>
              <li>
                <Link href="/destination/mount-rinjani">Mount Rinjani</Link>
              </li>
              <li>
                <Link href="/destination/pink-beach">Pink Beach Tangsi</Link>
              </li>
              <li>
                <Link href="/destination/desa-sade">Sade Heritage Village</Link>
              </li>
              <li>
                <Link href="/destination/selong-belanak">Selong Belanak Beach</Link>
              </li>
              <li>
                <Link href="/destination/tetebatu-rice-terraces">Tetebatu Terraces</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct Contact */}
          <div>
            <h4>Contact &amp; Social</h4>
            <ul>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <WhatsAppIcon size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${content.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#fff", fontWeight: 600 }}
                >
                  {content.contact.phone}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Mail size={16} className="text-[var(--yellow)] shrink-0 mt-0.5" />
                <a href={`mailto:${content.contact.email}`} style={{ wordBreak: "break-all" }}>
                  {content.contact.email}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <InstagramIcon size={16} className="text-[#FF7A8A] shrink-0 mt-0.5" />
                <a href={content.contact.instagram_url} target="_blank" rel="noopener noreferrer">
                  {content.contact.instagram}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <TikTokIcon size={16} className="text-[#25F4EE] shrink-0 mt-0.5" />
                <a
                  href={content.contact.tiktok_url || "https://www.tiktok.com/@lomboktraveldiary"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.contact.tiktok || "@lomboktraveldiary"}
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Clock size={16} className="text-[#96e6a1] shrink-0 mt-0.5" />
                <span style={{ fontSize: "0.82rem", color: "#cfd8ec" }}>
                  Daily: 08:00 – 20:00
                  <br />
                  <small style={{ color: "var(--yellow)" }}>WhatsApp available 24/7</small>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="copy">
          <div>{content.footer.copyright}</div>
        </div>
      </div>
    </footer>
  );
}

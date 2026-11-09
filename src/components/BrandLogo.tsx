"use client";

import React from "react";
import Image from "next/image";

export function LogoMark({ size = 42, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`logo-mark-wrap ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        border: "1.5px solid rgba(249, 215, 118, 0.75)",
        position: "relative",
        background: "#043A4B",
      }}
    >
      <Image
        src="/logo-square.png"
        alt="Lombok Travel Diary Emblem"
        width={size}
        height={size}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

interface BrandLogoProps {
  variant?: "navbar" | "square" | "mark" | "top" | "footer" | "scrolled";
  scrolled?: boolean;
  size?: number;
  className?: string;
}

export default function BrandLogo({
  variant = "navbar",
  scrolled = false,
  size,
  className = "",
}: BrandLogoProps) {
  if (variant === "mark") {
    return <LogoMark size={size || 42} className={className} />;
  }

  // Footer / Top Graphic Variant: Menggunakan logo-top (terang untuk background gelap footer)
  if (variant === "top" || variant === "footer") {
    return (
      <div className={`brand-top-graphic ${className}`} style={{ display: "inline-block", position: "relative" }}>
        <Image
          src="/logo-top.png"
          alt="Lombok Travel Diary"
          width={210}
          height={62}
          loading="lazy"
          style={{
            height: size ? `${size}px` : "48px",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

  // Direct Graphic Variant logo-scrolled
  if (variant === "square" || variant === "scrolled") {
    return (
      <div className={`brand-footer-graphic ${className}`} style={{ display: "inline-block", position: "relative" }}>
        <Image
          src="/logo-scrolled.png"
          alt="Lombok Travel Diary"
          width={210}
          height={58}
          loading="lazy"
          style={{
            height: size ? `${size}px` : "50px",
            width: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

  // Navbar Dynamic Variant
  const logoSrc = scrolled ? "/logo-scrolled.png" : "/logo-top.png";
  return (
    <Image
      src={logoSrc}
      alt="Lombok Travel Diary"
      width={210}
      height={60}
      priority={true}
      className={`navbar-brand-logo ${className}`}
      style={{
        height: "44px",
        width: "auto",
        objectFit: "contain",
        display: "block",
        transition: "opacity 0.25s ease",
      }}
    />
  );
}

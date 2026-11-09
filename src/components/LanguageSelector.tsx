"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
];

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: languages.map((lang) => lang.code).join(","),
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element_hidden"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();

    const detectCurrentLanguage = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select && select.value) {
        setCurrentLang(select.value);
        return;
      }
      const googTransCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("googtrans="));
      if (googTransCookie) {
        const parts = googTransCookie.split("/");
        const langCode = parts[2];
        if (langCode && langCode !== currentLang && langCode !== "") {
          setCurrentLang(langCode);
        }
      }
    };

    detectCurrentLanguage();
    const interval = setInterval(detectCurrentLanguage, 1000);

    // Suppress Google Translate banner and forced top padding
    const suppressGoogleBanner = () => {
      if (typeof document !== "undefined" && document.body) {
        document.body.style.top = "0px";
        document.body.style.position = "static";
        const banners = document.querySelectorAll(
          ".goog-te-banner-frame, iframe.goog-te-banner-frame, .VIpgJd-ZVi9od-ORHb-OEVmcd, .VIpgJd-ZVi9od-aZ2wEe-wOHMyf, .VIpgJd-y6EKec-M55qse, #goog-gt-tt"
        );
        banners.forEach((b) => {
          (b as HTMLElement).style.setProperty("display", "none", "important");
          (b as HTMLElement).style.setProperty("visibility", "hidden", "important");
          (b as HTMLElement).style.setProperty("height", "0", "important");
        });
      }
    };

    suppressGoogleBanner();
    const bannerInterval = setInterval(suppressGoogleBanner, 400);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(interval);
      clearInterval(bannerInterval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentLang]);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    const clearGoogleTranslateCookies = () => {
      const cookies = document.cookie.split(";");
      const domain = window.location.hostname;
      cookies.forEach((cookie) => {
        const cookieName = cookie.split("=")[0].trim();
        if (cookieName.startsWith("googtrans") || cookieName === "googtrans") {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
          if (domain.split(".").length > 2) {
            const parentDomain = domain.substring(domain.indexOf("."));
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${parentDomain};`;
          }
        }
      });
    };

    clearGoogleTranslateCookies();

    const setLanguageCookie = () => {
      const domain = window.location.hostname;
      const isSecure = window.location.protocol === "https:";
      const secureFlag = isSecure ? "; secure; samesite=none" : "";
      document.cookie = `googtrans=/en/${langCode}; path=/${secureFlag}`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}${secureFlag}`;
    };

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
      setTimeout(() => { setLanguageCookie(); }, 100);
    } else {
      setLanguageCookie();
      setTimeout(() => { window.location.reload(); }, 100);
    }
  };

  const currentLanguageObj = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left notranslate" translate="no" ref={dropdownRef}>
      {/* Hidden Google Translate Target */}
      <div id="google_translate_element_hidden" className="hidden" style={{ display: "none" }}></div>

      {/* Modern Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="notranslate lang-selector-trigger"
        translate="no"
        aria-label="Change Language"
        aria-expanded={isOpen}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          height: "34px",
          padding: "0 12px",
          borderRadius: "999px",
          border: "1.5px solid var(--line)",
          background: "#fff",
          color: "var(--deep)",
          fontWeight: 600,
          fontSize: "0.82rem",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ocean)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
        }}
      >
        <span className="hidden sm:inline-flex" style={{ alignItems: "center" }}>
          <Globe size={13} style={{ color: "var(--ocean)", flexShrink: 0 }} />
        </span>
        <span style={{ fontSize: "0.95rem", lineHeight: 1 }}>{currentLanguageObj.flag}</span>
        <span style={{ textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--deep)" }} className="notranslate">
          {currentLanguageObj.code.split("-")[0]}
        </span>
        <ChevronDown
          size={12}
          style={{
            color: "var(--muted)",
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {/* Modern Clean Dropdown Menu */}
      {isOpen && (
        <div
          className="notranslate"
          translate="no"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: "210px",
            maxHeight: "320px",
            overflowY: "auto",
            borderRadius: "16px",
            border: "1px solid var(--line)",
            background: "#fff",
            boxShadow: "0 16px 36px rgba(4, 58, 75, 0.12)",
            zIndex: 100,
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Globe size={14} style={{ color: "var(--ocean)", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--sans)",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--deep)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
              className="notranslate"
            >
              Select Language
            </span>
          </div>

          {/* Language list */}
          <div style={{ padding: "6px" }} className="notranslate">
            {languages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className="notranslate"
                  translate="no"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    border: "none",
                    background: isSelected ? "var(--mist)" : "transparent",
                    color: isSelected ? "var(--link)" : "var(--ink)",
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    marginBottom: "2px",
                    transition: "background 0.15s, color 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "var(--mist)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }} className="notranslate">
                    <span style={{ fontSize: "1.15rem", lineHeight: 1 }}>{lang.flag}</span>
                    <span className="notranslate">{lang.name}</span>
                  </span>
                  {isSelected && (
                    <Check size={14} style={{ color: "var(--ocean)", flexShrink: 0 }} strokeWidth={2.5} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

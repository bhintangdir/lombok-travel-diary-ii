"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check, BookMarked } from "lucide-react";

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

    // Completely suppress Google Translate banner and forced top padding on desktop & mobile
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

      {/* Trigger Button — diary-styled */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="notranslate"
        translate="no"
        aria-label="Change Language"
        aria-expanded={isOpen}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          height: "32px",
          padding: "0 10px",
          borderRadius: "8px",
          border: "2px solid var(--ink)",
          background: "var(--paper)",
          color: "var(--ink)",
          fontWeight: 700,
          fontSize: "0.76rem",
          boxShadow: "2px 2px 0 var(--ink)",
          cursor: "pointer",
          transition: "transform 0.1s, box-shadow 0.1s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(1px, 1px)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "1px 1px 0 var(--ink)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 var(--ink)";
        }}
      >
        <span className="hide-on-mobile-icon hidden sm:inline-flex" style={{ alignItems: "center" }}>
          <Globe size={13} style={{ color: "var(--navy)", flexShrink: 0 }} />
        </span>
        <span style={{ fontSize: "0.86rem", lineHeight: 1 }}>{currentLanguageObj.flag}</span>
        <span style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--navy)" }} className="notranslate">
          {currentLanguageObj.code.split("-")[0]}
        </span>
        <ChevronDown
          size={11}
          style={{
            color: "var(--ink)",
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {/* Dropdown — diary notebook themed */}
      {isOpen && (
        <div
          className="notranslate"
          translate="no"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: "220px",
            maxHeight: "320px",
            overflowY: "auto",
            borderRadius: "16px",
            border: "2.5px solid var(--ink)",
            background: "#fff",
            backgroundImage: "repeating-linear-gradient(transparent 0 31px, var(--line) 31px 32px)",
            boxShadow: "6px 6px 0 var(--ink)",
            zIndex: 100,
          }}
        >
          {/* Sticky header */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              padding: "10px 14px 8px",
              borderBottom: "2px solid var(--ink)",
              background: "var(--yellow)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BookMarked size={16} style={{ color: "var(--navy)", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "var(--navy)",
              }}
              className="notranslate"
            >
              Select Language
            </span>
          </div>

          {/* Language list */}
          <div style={{ padding: "8px" }} className="notranslate">
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
                    border: isSelected ? "2px solid var(--ink)" : "2px solid transparent",
                    background: isSelected ? "var(--yellow)" : "transparent",
                    boxShadow: isSelected ? "2px 2px 0 var(--ink)" : "none",
                    color: "var(--ink)",
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    marginBottom: "4px",
                    transition: "all 0.12s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "var(--paper)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }} className="notranslate">
                    <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{lang.flag}</span>
                    <span className="notranslate">{lang.name}</span>
                  </span>
                  {isSelected && (
                    <Check size={15} style={{ color: "var(--red)", flexShrink: 0 }} strokeWidth={3} />
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

"use client";

import React from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import DynamicIcon from "@/components/DynamicIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Star, Check, ArrowRight, MapPin, Clock, Phone, Mail, ChevronLeft, ChevronRight, Compass, X } from "lucide-react";

export default function HomeClient() {
  const { content } = useContent();
  const [openDetailId, setOpenDetailId] = React.useState<string | null>(null);
  const [sliderIndex, setSliderIndex] = React.useState(0);
  const [selectedGalleryItem, setSelectedGalleryItem] = React.useState<any | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGalleryItem(null);
    };
    if (selectedGalleryItem) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryItem]);

  const heroWa = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.hero.button_primary_message)}`;
  const ctaWa = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.cta.button_message)}`;
  const rentalWa = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.services.rental.button_message)}`;
  const transferWa = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(content.services.transfer.button_message)}`;

  const tours = content.tours || [];
  // Number of cards to display per slide: 3 on desktop, 2 on tablet, 1 on mobile
  const maxIndex = Math.max(0, tours.length - 1);

  const prevSlide = () => {
    setSliderIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setSliderIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const destinations = content.destinations?.items || [];
  const [destSliderIndex, setDestSliderIndex] = React.useState(0);
  const maxDestIndex = Math.max(0, destinations.length - 1);

  const prevDestSlide = () => {
    setDestSliderIndex((prev) => Math.max(0, prev - 1));
  };

  const nextDestSlide = () => {
    setDestSliderIndex((prev) => Math.min(maxDestIndex, prev + 1));
  };

  const toggleDetail = (id: string) => {
    setOpenDetailId((prev) => (prev === id ? null : id));
  };

  const getWaLink = (tourName: string) => {
    return `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
      `Hi Lombok Travel Diary! I'd like to book the ${tourName} tour.`
    )}`;
  };

  return (
    <main>
      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="wrap">
          <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <DynamicIcon name={content.hero.tag_icon} size={14} className="w-3.5 h-3.5 inline" />
            {content.hero.tag}
          </span>
          <h1>
            {content.hero.title_line_1} <em>{content.hero.title_highlight}</em> {content.hero.title_line_2}
          </h1>
          <p>{content.hero.subtitle}</p>
          <div className="btns">
            <a
              className="btn b-red"
              href={heroWa}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
              {content.hero.button_primary_label}
            </a>
            <Link className="btn b-yellow" href={content.hero.button_secondary_href}>
              {content.hero.button_secondary_label}
            </Link>
          </div>
        </div>
      </header>

      {/* Recommended Tours Section */}
      <section id="tours">
        <div className="wrap">
          <div className="head" style={{ marginBottom: "32px" }}>
            <span className="tag">{content.home_tours_section.tag}</span>
            <h2>{content.home_tours_section.heading}</h2>
            <p>{content.home_tours_section.subheading}</p>
          </div>

          {/* Slider Navigation Controls */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={prevSlide}
              disabled={sliderIndex === 0}
              className="btn"
              aria-label="Previous tours"
              style={{
                width: "42px",
                height: "42px",
                padding: 0,
                display: "grid",
                placeItems: "center",
                opacity: sliderIndex === 0 ? 0.4 : 1,
                cursor: sliderIndex === 0 ? "not-allowed" : "pointer",
                background: "#fff",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={sliderIndex >= maxIndex}
              className="btn"
              aria-label="Next tours"
              style={{
                width: "42px",
                height: "42px",
                padding: 0,
                display: "grid",
                placeItems: "center",
                opacity: sliderIndex >= maxIndex ? 0.4 : 1,
                cursor: sliderIndex >= maxIndex ? "not-allowed" : "pointer",
                background: "var(--yellow)",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Slider */}
          <div style={{ overflow: "hidden", padding: "16px 8px 30px" }}>
            <div
              style={{
                display: "flex",
                gap: "28px",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: `translateX(calc(-${sliderIndex} * (min(100%, 340px) + 28px)))`,
              }}
            >
              {tours.map((tour, idx) => {
                const isOpen = openDetailId === tour.id;
                // Alternate rotation just like the tour package page
                const rotations = [-1.4, 1.2, -0.5];
                const cardRotation = rotations[idx % 3];

                return (
                  <article
                    key={tour.id}
                    className="tour-card"
                    style={{
                      flex: "0 0 min(100%, 340px)",
                      maxWidth: "340px",
                      margin: 0,
                      transform: `rotate(${cardRotation}deg)`,
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "rotate(0deg) translateY(-4px)";
                      e.currentTarget.style.zIndex = "5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `rotate(${cardRotation}deg)`;
                      e.currentTarget.style.zIndex = "1";
                    }}
                  >
                    <div
                      className={`ph ${tour.height_class || "m"} ${tour.color_class}`}
                      style={{
                        backgroundImage: tour.image ? `url(${tour.image})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      {!tour.image && (
                        <DynamicIcon name={tour.icon} size={48} className="w-12 h-12" />
                      )}
                      <span className="dur" style={{ display: "inline-flex", alignItems: "center", gap: "4px", zIndex: 2 }}>
                        <Clock size={12} /> {tour.duration}
                      </span>
                    </div>

                    <div className="tb">
                      <h3>{tour.name}</h3>
                      <p>{tour.tagline}</p>

                      <h4>Key highlights</h4>
                      <ul className="hl">
                        {tour.highlights.map((h, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Star size={14} className="text-[var(--yellow)] flex-shrink-0" fill="currentColor" stroke="var(--ink)" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <h4>Included</h4>
                      <div className="chips">
                        {tour.inclusions.map((inc, i) => (
                          <span key={i}>{inc}</span>
                        ))}
                      </div>

                      <div
                        className={`more ${isOpen ? "open" : ""}`}
                        dangerouslySetInnerHTML={{ __html: tour.more_detail }}
                      />

                      <div className="acts">
                        <button
                          className="btn"
                          onClick={() => toggleDetail(tour.id)}
                        >
                          {isOpen ? "Close" : "Detail"}
                        </button>
                        <a
                          className="btn b-green"
                          href={getWaLink(tour.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                        >
                          <WhatsAppIcon size={16} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section id="about">
        <div className="wrap about">
          <div>
            <span className="tag">{content.about_summary.tag}</span>
            <h2>{content.about_summary.heading}</h2>
            <p>{content.about_summary.paragraph_1}</p>
            <p>{content.about_summary.paragraph_2}</p>
            <div className="stats">
              {content.about_summary.stats.map((stat, idx) => (
                <div key={idx}>
                  <b>{stat.value}</b>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
          <div className="polaroid">
            <div
              className="pic"
              style={{
                backgroundImage: `url(${content.about_summary.polaroid_image || '/our-service-lombok.jpeg'})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p>{content.about_summary.polaroid_caption}</p>
          </div>
        </div>
      </section>

      {/* How to Book in 4 Easy Steps */}
      <section style={{ background: "#fff", borderTop: "3px dashed var(--ink)", borderBottom: "3px dashed var(--ink)" }}>
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.how_to_book.tag}</span>
            <h2>{content.how_to_book.heading}</h2>
            <p>{content.how_to_book.subheading}</p>
          </div>
          <div className="grid g4 steps">
            {content.how_to_book.steps.map((step, idx) => (
              <div key={idx} className={`card step ${step.color}`}>
                <div className="ic" style={{ display: "grid", placeItems: "center" }}>
                  <DynamicIcon name={step.icon} size={36} className="w-9 h-9" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="svc" id="services">
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.services.tag}</span>
            <h2>{content.services.heading}</h2>
            <p>{content.services.subheading}</p>
          </div>
          <div className="grid g3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
            <div className="card">
              <div className="pad">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <DynamicIcon name={content.services.rental.icon} size={30} className="w-8 h-8 text-[var(--navy)]" />
                  <h3>{content.services.rental.title}</h3>
                </div>
                <p>{content.services.rental.description}</p>
                <ul>
                  {content.services.rental.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
                <div className="mini">
                  <b>{content.services.rental.how_to.title}</b>
                  <ol>
                    {content.services.rental.how_to.steps.map((st, idx) => (
                      <li key={idx}>{st}</li>
                    ))}
                  </ol>
                </div>
                <a
                  className="btn b-green"
                  href={rentalWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
                  {content.services.rental.button_label}
                </a>
              </div>
            </div>

            <div className="card">
              <div className="pad">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <DynamicIcon name={content.services.transfer.icon} size={30} className="w-8 h-8 text-[var(--navy)]" />
                  <h3>{content.services.transfer.title}</h3>
                </div>
                <p>{content.services.transfer.description}</p>
                <ul>
                  {content.services.transfer.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
                <div style={{ height: "40px" }}></div>
                <a
                  className="btn b-red"
                  href={transferWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
                  {content.services.transfer.button_label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destination">
        <div className="wrap">
          <div className="head" style={{ marginBottom: "20px" }}>
            <span className="tag">{content.destinations.tag}</span>
            <h2>{content.destinations.heading}</h2>
            <p>{content.destinations.subheading}</p>
          </div>

          {/* Slider Navigation Controls for Destinations */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={prevDestSlide}
              disabled={destSliderIndex === 0}
              className="btn"
              aria-label="Previous destinations"
              style={{
                width: "42px",
                height: "42px",
                padding: 0,
                display: "grid",
                placeItems: "center",
                opacity: destSliderIndex === 0 ? 0.4 : 1,
                cursor: destSliderIndex === 0 ? "not-allowed" : "pointer",
                background: "#fff",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextDestSlide}
              disabled={destSliderIndex >= maxDestIndex}
              className="btn"
              aria-label="Next destinations"
              style={{
                width: "42px",
                height: "42px",
                padding: 0,
                display: "grid",
                placeItems: "center",
                opacity: destSliderIndex >= maxDestIndex ? 0.4 : 1,
                cursor: destSliderIndex >= maxDestIndex ? "not-allowed" : "pointer",
                background: "var(--yellow)",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Carousel Slider with the same card appearance */}
          <div style={{ overflow: "hidden", padding: "16px 8px 30px" }}>
            <div
              style={{
                display: "flex",
                gap: "24px",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: `translateX(calc(-${destSliderIndex} * (min(100%, 280px) + 24px)))`,
              }}
            >
              {destinations.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/destination/${item.slug || item.id}`}
                  className="card dest"
                  style={{
                    flex: "0 0 min(100%, 280px)",
                    maxWidth: "280px",
                    height: "350px",
                    backgroundImage: `linear-gradient(to bottom, rgba(10,20,40,0.18) 0%, rgba(10,20,40,0.3) 35%, rgba(10,20,40,0.85) 75%, rgba(10,20,40,0.96) 100%), url(${item.image || item.bg_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    textDecoration: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "18px",
                    position: "relative",
                  }}
                >
                  {/* Top Bar: Region and Stamp Badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", zIndex: 2 }}>
                    <span
                      style={{
                        background: "rgba(10, 20, 40, 0.75)",
                        backdropFilter: "blur(6px)",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        border: "1.5px solid rgba(255,255,255,0.35)",
                      }}
                    >
                      <MapPin size={12} className="text-[var(--yellow)]" /> {item.region}
                    </span>
                    <span
                      style={{
                        background: "var(--yellow)",
                        color: "var(--ink)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        border: "1.5px dashed var(--ink)",
                        transform: "rotate(3deg)",
                      }}
                    >
                      {item.badge || "SPOT"}
                    </span>
                  </div>

                  {/* Bottom Content: Category, Title, Tagline, Read Diary Link */}
                  <div style={{ zIndex: 2 }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        color: "var(--yellow)",
                        marginBottom: "4px",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.category_label || item.category || "DESTINATION"}
                    </span>
                    <h3
                      style={{
                        color: "#fff",
                        fontSize: "1.6rem",
                        margin: "0 0 6px",
                        lineHeight: 1.15,
                        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.name || item.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.92)",
                        fontSize: "0.84rem",
                        margin: "0 0 10px",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      {item.tagline}
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "var(--yellow)",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                      }}
                    >
                      <span>Read Diary Page</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Link
              href="/destination"
              className="btn b-yellow"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 22px" }}
            >
              <Compass size={18} />
              <span>Explore All Destinations ({destinations.length})</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: "#fff", borderTop: "3px dashed var(--ink)", borderBottom: "3px dashed var(--ink)" }}>
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.why_choose_us.tag}</span>
            <h2>{content.why_choose_us.heading}</h2>
          </div>
          <div className="grid g4">
            {content.why_choose_us.items.map((why, idx) => (
              <div key={idx} className="card why">
                <div className="ic">
                  <DynamicIcon name={why.icon} size={32} className="w-8 h-8 text-[var(--navy)]" />
                </div>
                <h3>{why.title}</h3>
                <p>{why.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.testimonials.tag}</span>
            <h2>{content.testimonials.heading}</h2>
          </div>
          <div className="grid g3" style={{ paddingTop: "14px" }}>
            {content.testimonials.items.map((testi, idx) => (
              <div key={idx} className="card testi">
                <div className="stars" style={{ display: "flex", gap: "2px", color: "var(--yellow)" }}>
                  {Array.from({ length: testi.stars }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" stroke="var(--ink)" strokeWidth={1.5} />
                  ))}
                </div>
                <p>&ldquo;{testi.quote}&rdquo;</p>
                <b>{testi.author}</b>
                <small>{testi.country}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" style={{ background: "#fff", borderTop: "3px dashed var(--ink)", borderBottom: "3px dashed var(--ink)" }}>
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.gallery.tag}</span>
            <h2>{content.gallery.heading}</h2>
            <p>{content.gallery.subheading}</p>
          </div>
          <div className="gal">
            {content.gallery.items.map((g, idx) => {
              // Scale font size, padding, and badge proportionally based on tile size
              const isLarge = idx === 0;
              const isSmall = idx === 1 || idx === 2;
              const fontSize = isLarge ? "clamp(1.9rem, 2.5vw, 2.5rem)" : isSmall ? "1.25rem" : "clamp(1.4rem, 1.8vw, 1.85rem)";
              const padding = isLarge ? "24px 22px" : isSmall ? "12px 14px" : "16px 20px";
              const iconSize = isLarge ? 24 : isSmall ? 16 : 20;
              const badgeSize = isLarge ? "42px" : isSmall ? "32px" : "36px";

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedGalleryItem(g)}
                  title={`View ${g.title}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(10,20,40,0.1), rgba(10,20,40,0.72)), url(${g.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    overflow: "hidden",
                    padding,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                      fontFamily: "'Caveat', cursive",
                      fontSize,
                      lineHeight: 1.15,
                      textShadow: "1px 2px 4px rgba(0,0,0,0.9)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {g.title}
                  </span>
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                      background: "rgba(255,255,255,0.25)",
                      backdropFilter: "blur(4px)",
                      width: badgeSize,
                      height: badgeSize,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                      flexShrink: 0,
                    }}
                  >
                    <DynamicIcon name={g.icon} size={iconSize} className="text-white" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <div className="head">
            <span className="tag">{content.faq.tag}</span>
            <h2>{content.faq.heading}</h2>
          </div>
          <div className="faq">
            {content.faq.items.map((f, idx) => (
              <details key={idx}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Office */}
      <section id="contact" style={{ background: "#fff", borderTop: "3px dashed var(--ink)" }}>
        <div className="wrap">
          <div className="head">
            <span className="tag">Location office</span>
            <h2>Come Say Hello</h2>
          </div>
          <div className="loc">
            <div className="card info">
              <h3 style={{ fontSize: "2rem" }}>{content.brand.name} Office</h3>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={15} style={{ color: "var(--red)", flexShrink: 0 }} />
                {content.contact.address}
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={15} style={{ color: "var(--navy)", flexShrink: 0 }} />
                {content.contact.operating_hours.weekday}
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={15} style={{ color: "var(--green)", flexShrink: 0 }} />
                WhatsApp: {content.contact.phone}
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={15} style={{ color: "var(--navy)", flexShrink: 0 }} />
                {content.contact.email}
              </p>
              <a
                className="btn b-green"
                style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} className="w-4 h-4 text-white" />
                Message us
              </a>
            </div>
            <div className="card">
              <iframe
                className="map"
                title="Office location"
                loading="lazy"
                src={content.contact.map_embed}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="wrap">
          <h2>{content.cta.heading}</h2>
          <p>{content.cta.subheading}</p>
          <a
            className="btn b-yellow"
            href={ctaWa}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <WhatsAppIcon size={18} className="w-4 h-4 text-[var(--ink)]" />
            {content.cta.button_label}
          </a>
        </div>
      </section>

      {/* Gallery Popup / Modal Lightbox */}
      {selectedGalleryItem && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 20, 40, 0.85)",
            backdropFilter: "blur(8px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div
            style={{
              background: "#fff",
              border: "3px solid var(--ink)",
              borderRadius: "16px",
              boxShadow: "10px 10px 0 var(--ink)",
              maxWidth: "820px",
              width: "100%",
              overflow: "hidden",
              position: "relative",
              transform: "rotate(-0.5deg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedGalleryItem(null)}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#fff",
                border: "2px solid var(--ink)",
                boxShadow: "3px 3px 0 var(--ink)",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1) rotate(6deg)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) rotate(0deg)")}
            >
              <X size={20} className="text-[var(--ink)]" />
            </button>

            {/* Modal Image */}
            <div style={{ position: "relative", width: "100%", maxHeight: "68vh", overflow: "hidden", background: "var(--ink)" }}>
              <img
                src={selectedGalleryItem.image}
                alt={selectedGalleryItem.title}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "68vh",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Modal Caption / Scrapbook footer */}
            <div style={{ padding: "20px 24px 22px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span className="tag" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>
                  Lombok Travel Diary
                </span>
                <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "2.2rem", margin: "4px 0 0", color: "var(--navy)" }}>
                  {selectedGalleryItem.title}
                </h3>
              </div>
              <a
                href={heroWa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn b-yellow"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <WhatsAppIcon size={16} />
                Ask About This Spot
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

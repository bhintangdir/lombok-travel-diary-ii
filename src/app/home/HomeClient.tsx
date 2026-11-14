"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TripAdvisorLogo from "@/components/TripAdvisorLogo";
import {
  MessageCircle,
  Users,
  ShieldCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  ArrowRight,
  Compass,
  Gem,
  X,
  ZoomIn,
  Car,
  Bike,
  Shield,
  Fuel,
  Sparkles,
  Waves,
  Award,
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useContent } from "@/context/ContentContext";

interface GalleryMoment {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  relatedTour: {
    name: string;
    slug: string;
    imageUrl: string;
    category: string;
    duration: string;
    tagline: string;
  };
}

const galleryMoments: GalleryMoment[] = [
  {
    id: "pergasingan",
    title: "Pergasingan Hill Sembalun",
    subtitle: "Sunrise above the clouds & patchwork fields",
    location: "Sembalun, East Lombok",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=75",
    description: "Perched 1,750 meters above sea level directly opposite Mount Rinjani, Pergasingan Hill treats morning hikers to one of Southeast Asia's most awe-inspiring sunrises. Golden sunlight illuminates the vibrant agricultural tapestry below as highland fog drifts silently across Sembalun valley.",
    highlights: [
      "Front-row panoramic vista of Mount Rinjani caldera",
      "Vibrant patchwork carpet of Sembalun agriculture valley",
      "Ideal overnight camping under clear starry night skies",
    ],
    relatedTour: {
      name: "Camping Pergasingan Hill (2D1N)",
      slug: "camping-pergasingan-hill",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=70",
      category: "Sembalun Trekking",
      duration: "2 Days 1 Night",
      tagline: "All-inclusive mountain camping with porter, guide, dome tents, warm meals & hotel transport.",
    },
  },
  {
    id: "gili-islands",
    title: "Gili Islands Marine Sanctuary",
    subtitle: "Swimming alongside green sea turtles",
    location: "Gili Trawangan, Meno & Air",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=75",
    description: "The calm crystal shallows surrounding the Gili archipelago are a world-famous haven for friendly green sea turtles and vibrant coral ecosystems. Snorkel alongside peaceful marine life and visit the submerged human sculptures off Gili Meno on a private chartered boat.",
    highlights: [
      "Guaranteed sea turtle encounters at Turtle Point",
      "Famous underwater human statues of Gili Meno",
      "HD GoPro underwater photos and videos included",
    ],
    relatedTour: {
      name: "Snorkeling 3 Gilis (Trawangan, Meno, Air)",
      slug: "snorkeling-3-gili",
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=70",
      category: "Snorkeling & Islands",
      duration: "Full Day",
      tagline: "Private wooden boat charter across Gili T, Meno & Air with GoPro footage, guide & driver included.",
    },
  },
  {
    id: "savana-dandaun",
    title: "Savana Dandaun Highland",
    subtitle: "Secluded highland campsite & gentle hills",
    location: "Sembalun Valley, East Lombok",
    imageUrl: "/bukit-dandaun.png",
    description: "Nestled within an ancient volcanic crater amphitheater, Savana Dandaun is an untouched sanctuary of rolling green grasslands, grazing mountain cows, and whispering pine hills. A peaceful alternative to crowded summits, offering gentle family-friendly trails.",
    highlights: [
      "Untouched grassy caldera away from crowded summit routes",
      "Cozy campfire dinners beneath brilliant Milky Way stargazing",
      "Gentle scenic trek suitable for beginners and families",
    ],
    relatedTour: {
      name: "Camping Savana Dandaun Hill (2D1N)",
      slug: "camping-savana-dandaun",
      imageUrl: "/bukit-dandaun.png",
      category: "Sembalun Trekking",
      duration: "2 Days 1 Night",
      tagline: "Secluded 2D1N camp with full gear, porters, campfire meals & private hotel transfers.",
    },
  },
  {
    id: "tiu-kelep",
    title: "Tiu Kelep Waterfall",
    subtitle: "Senaru rainforest cascades & natural river pools",
    location: "Senaru, North Lombok",
    imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=75",
    description: "Deep in the verdant jungle on the northern slopes of Mount Rinjani, Tiu Kelep plunges 45 meters over mossy basalt cliffs into a swirling turquoise plunge pool. Follow shallow river crossings shaded by tropical canopies accompanied by our experienced local guide.",
    highlights: [
      "Mighty 45-meter jungle cascade with invigorating spray",
      "Refreshing swim in natural cool mountain spring basins",
      "Combined visit with Sendang Gile Waterfall in one scenic trip",
    ],
    relatedTour: {
      name: "Waterfall North Lombok (KLU Tour)",
      slug: "waterfall-klu",
      imageUrl: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=70",
      category: "Nature & Waterfalls",
      duration: "Full Day",
      tagline: "Guided jungle adventure to Tiu Kelep & Sendang Gile with private AC car & experienced driver.",
    },
  },
  {
    id: "mandalika",
    title: "Pertamina Mandalika Circuit",
    subtitle: "Pit building, track walk & trackday experience",
    location: "Kuta Mandalika, Central Lombok",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=75",
    description: "Experience the pulse of MotoGP at the world's most scenic oceanfront street circuit. Walk the official pit garages, take unforgettable photos along the iconic Sasak batik motif on Turn 10, or join an official trackday session on the asphalt.",
    highlights: [
      "Official guided walking access inside Pit Building and Paddock",
      "Photo stops on the world-famous Turn 10 Sasak batik curve",
      "Panoramic views of the circuit from Bukit Seger headland",
    ],
    relatedTour: {
      name: "Pertamina Mandalika Circuit Tour",
      slug: "mandalika-circuit-tour",
      imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=70",
      category: "Circuit & Motorsport",
      duration: "Full Day",
      tagline: "Official Pit Building & Paddock walk, Turn 10 batik motif photos & trackday booking coordination.",
    },
  },
  {
    id: "gili-kedis",
    title: "Secret Gili Kedis",
    subtitle: "Tiny heart-shaped sandbar islet & calm reefs",
    location: "Sekotong, Southwest Lombok",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=75",
    description: "An idyllic, heart-shaped islet of powdery coral sand sitting in glassy aquamarine waters. Completely uninhabited and free of noise, it feels like your private deserted island in the Indian Ocean. Circle the sandbar in 5 minutes and snorkel with friendly reef fish.",
    highlights: [
      "Pure white sandbar islet surrounded by shallow aquamarine reefs",
      "Hand-feed hundreds of tropical reef fish at neighboring Gili Nanggu",
      "Feast on freshly caught grilled fish under beach shade on Gili Sudak",
    ],
    relatedTour: {
      name: "Snorkeling Secret Gilis (Nanggu, Sudak, Kedis)",
      slug: "snorkeling-secret-gili",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=70",
      category: "Snorkeling & Islands",
      duration: "Full Day",
      tagline: "Private speedboat charter to Nanggu, Sudak & Kedis with GoPro, guide & private driver.",
    },
  },
  {
    id: "bukit-merese",
    title: "Bukit Merese Sunset",
    subtitle: "360° southern coastal sunset panorama",
    location: "Tanjung Aan, South Lombok",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=75",
    description: "Rolling emerald cliffs jutting into the Indian Ocean, overlooking Tanjung Aan's white horseshoe bay on one side and dramatic crashing reef breaks on the other. At twilight, the tropical sky explodes into brilliant shades of amber, violet, and rose.",
    highlights: [
      "Unrivaled 360-degree sunset vista over south Lombok coastline",
      "Gentle cliffside walks with grazing coastal water buffaloes",
      "Conveniently combined with Kuta, Mawun, and Selong Belanak beaches",
    ],
    relatedTour: {
      name: "Tour Beach Lombok & Bukit Merese Sunset",
      slug: "tour-beach-lombok",
      imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=70",
      category: "Beaches & Sunset",
      duration: "Full Day",
      tagline: "Private day trip covering Selong Belanak, Mawun, Kuta, Tanjung Aan & Merese sunset.",
    },
  },
];

export default function HomeClient() {
  const { content } = useContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeMoment, setActiveMoment] = useState<GalleryMoment | null>(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMoment(null);
      }
    };
    if (activeMoment) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMoment]);

  // Handle initial hash scroll with appropriate offset if loaded directly with #hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const scrollToHash = () => {
        const el = document.getElementById(hash);
        if (el) {
          const offset = hash === "tours" ? 25 : hash === "surf-lessons" ? 15 : 230;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
        }
      };
      const t1 = setTimeout(scrollToHash, 80);
      const t2 = setTimeout(scrollToHash, 300);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  const phone = content.contact?.phone || "+62 851-3893-9835";
  const waNumber = content.contact?.whatsapp || "6285138939835";
  const defMsg = "Hello Lombok Travel Diary! I would like to plan a trip to Lombok. Travel dates: ___ Number of guests: ___";
  const waUrl = (msg = defMsg) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  const scrollGallery = (direction: "left" | "right") => {
    if (trackRef.current) {
      const step = 400;
      trackRef.current.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
    }
  };

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="hero" id="home">
        <div className="wrap text-center">
          <h1>
            Your Lombok <span className="text-[#F2A541]">Adventure</span> Starts Here.
          </h1>
          <p>
            From camping above the clouds in Sembalun, snorkeling with sea turtles across the{" "}
            <span className="text-[#F4E9D6] font-medium">3 Gilis &amp; Secret Gilis</span>, lush hidden waterfalls, to the pulse of Mandalika MotoGP Circuit. All private, flexible, and booked directly on WhatsApp.
          </p>
          <div className="row justify-center">
            <a
              className="btn btn-sun"
              href="#tours"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("tours");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 25;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              <Compass className="w-5 h-5" />
              <span>Explore Tour Packages</span>
            </a>
            <Link className="btn btn-ghost" href="/contact">
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="osvc" id="our-services">
        <div className="wrap">
          <div className="head c">
            <h2>Our Travel Services</h2>
            <p className="lead">
              Tailor-made itineraries and reliable private transport to experience Lombok&apos;s volcanic peaks, coral archipelagos, and quiet coastlines.
            </p>
          </div>
          <div className="grid g4">
            {/* 1. Nature & Snorkeling */}
            <div className="sc sc-service">
              <div className="sc-bg-img" aria-hidden="true">
                <Image
                  src="/tour-3-gili-trawangan-air-and-meno.jpg"
                  alt="Island Hopping and Snorkeling"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="sc-overlay" aria-hidden="true" />
              <div className="sc-content">
                <h3>Island Hopping &amp; Snorkeling</h3>
                <p>Private boats to 3 Gilis, Secret Gilis &amp; hidden waterfalls.</p>
                <Link className="more" href="/tour-package?c=nature">
                  Explore snorkeling tours →
                </Link>
              </div>
            </div>

            {/* 2. Trekking */}
            <div className="sc sc-service">
              <div className="sc-bg-img" aria-hidden="true">
                <Image
                  src="/bukit-pergasingan-sembalun.jpg"
                  alt="Sembalun Trekking"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="sc-overlay" aria-hidden="true" />
              <div className="sc-content">
                <h3>Sembalun Trekking</h3>
                <p>Sunrise camping on Pergasingan &amp; Dandaun with gear &amp; porters.</p>
                <Link className="more" href="/tour-package?c=trek">
                  View trekking tours →
                </Link>
              </div>
            </div>

            {/* 3. Fishing Trip */}
            <div className="sc sc-service">
              <div className="sc-bg-img" aria-hidden="true">
                <Image
                  src="/mancing-spot-pelangan.jpg"
                  alt="Lombok Fishing Expeditions"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="sc-overlay" aria-hidden="true" />
              <div className="sc-content">
                <h3>Lombok Fishing Expeditions</h3>
                <p>Offshore charters in Pelangan &amp; Teluk Sepi with full gear.</p>
                <Link className="more" href="/tour-package?c=fishing">
                  Explore fishing trips →
                </Link>
              </div>
            </div>

            {/* 4. Transport */}
            <div className="sc sc-service">
              <div className="sc-bg-img" aria-hidden="true">
                <Image
                  src="/airport-pickup.jpg"
                  alt="Private Transport Lombok"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="sc-overlay" aria-hidden="true" />
              <div className="sc-content">
                <h3>Private Transport</h3>
                <p>Airport transfers, private AC car with driver &amp; scooters.</p>
                <a
                  className="more"
                  href={waUrl("Hello Lombok Travel Diary! I would like to enquire about private car rental with driver or airport transfer.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire transport →
                </a>
              </div>
            </div>
          </div>

          {/* Custom Trip Banner (No Icon, Panorama Card) */}
          <div className="sc custom">
            <div className="sc-bg-img" aria-hidden="true">
              <Image
                src="/custom-trip.jpg"
                alt="Custom Lombok Trips"
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="sc-overlay-custom" aria-hidden="true" />
            <div className="txt">
              <span className="gold-sub">CUSTOM PRIVATE TRIP</span>
              <h3>Custom Lombok Trip Planner</h3>
              <p>
                Design your private Lombok route &amp; get an instant WhatsApp quote.
              </p>
            </div>
            <Link className="btn btn-sun" href="/tour-package#custom-builder">
              Open Custom Trip Planner
            </Link>
          </div>
        </div>
      </section>

      {/* 3. RECOMMENDED TOURS SECTION */}
      <section className="tours" id="tours">
        <div className="wrap">
          <div className="head c">
            <h2>Most Popular Tour Packages</h2>
            <p className="lead">Carefully crafted private itineraries bundling Lombok&apos;s most iconic destinations and pristine hidden gems.</p>
          </div>
          <div className="grid g3">
            {/* Card 1 */}
            <article className="card">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=70"
                  alt="Camping Pergasingan Hill Sembalun"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="body">
                <div className="meta"><span>2D1N</span><span>Sembalun Trekking</span></div>
                <h3>Camping Pergasingan Hill</h3>
                <p>Overnight camp at 1,750m overlooking Sembalun&apos;s geometric patchwork farmlands and an unforgettable Mount Rinjani sunrise. Includes porter, meals, and gear.</p>
                <Link className="more" href="/tour-package/camping-pergasingan-hill">View package details →</Link>
              </div>
            </article>

            {/* Card 2 */}
            <article className="card">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=70"
                  alt="Snorkeling 3 Gilis Lombok"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="body">
                <div className="meta"><span>Full Day</span><span>Snorkeling &amp; Reef</span></div>
                <h3>Snorkeling 3 (Three) Gilis</h3>
                <p>Hop across Gili Trawangan, Gili Meno &amp; Gili Air. Swim with green sea turtles and the iconic Bask underwater statues. Includes speedboat, GoPro, and driver.</p>
                <Link className="more" href="/tour-package/snorkeling-3-gili">View package details →</Link>
              </div>
            </article>

            {/* Card 3 */}
            <article className="card">
              <div className="img">
                <Image
                  src="/bukit-dandaun.png"
                  alt="Camping Savana Dandaun Sembalun"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="body">
                <div className="meta"><span>2D1N</span><span>Hidden Gem Trek</span></div>
                <h3>Camping Savana Dandaun</h3>
                <p>A tranquil, secluded highland savannah nestled at Rinjani&apos;s base. Pure mountain stillness, grazing cattle, campfire warmth, and starlit night skies.</p>
                <Link className="more" href="/tour-package/camping-savana-dandaun">View package details →</Link>
              </div>
            </article>

            {/* Card 4 */}
            <article className="card">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=70"
                  alt="Snorkeling Secret Gilis Sekotong"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="body">
                <div className="meta"><span>Full Day</span><span>Secret Island Sanctuary</span></div>
                <h3>Snorkeling Secret Gilis</h3>
                <p>The peaceful Sekotong archipelago: calm shallow snorkeling at Gili Nanggu, grilled seafood at Gili Sudak, and the tiny sandbar of Gili Kedis.</p>
                <Link className="more" href="/tour-package/snorkeling-secret-gili">View package details →</Link>
              </div>
            </article>

            {/* Card 5 */}
            <article className="card">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=70"
                  alt="North Lombok Waterfalls Tiu Kelep"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="body">
                <div className="meta"><span>Full Day</span><span>Rainforest Waterfalls</span></div>
                <h3>North Lombok Waterfalls (Tiu Kelep)</h3>
                <p>Trek through lush Senaru rainforest along crystal rivers to the thundering 42-meter twin cascades of Tiu Kelep and Sendang Gile.</p>
                <Link className="more" href="/tour-package/north-lombok-waterfalls">View package details →</Link>
              </div>
            </article>

            {/* Card 6 */}
            <article className="card">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=70"
                  alt="Mandalika Circuit Tour and Trackday"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="body">
                <div className="meta"><span>Half/Full Day</span><span>Motorsport &amp; Coast</span></div>
                <h3>Mandalika Circuit Tour &amp; Trackday</h3>
                <p>Access the Pit Building and Paddock of Pertamina Mandalika International Circuit, photo stop at the iconic batik curve, trackday lap option, and Bukit Seger views.</p>
                <Link className="more" href="/tour-package/mandalika-circuit-tour">View package details →</Link>
              </div>
            </article>
          </div>
          <div className="center">
            <Link className="btn btn-primary" href="/tour-package">
              View All Tour Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5 SURFING LESSONS & COACHING SECTION */}
      <section
        id="surf-lessons"
        style={{
          background: "linear-gradient(180deg, #F0F9FB 0%, #FFFFFF 100%)",
          padding: "85px 0 95px",
        }}
      >
        <div className="wrap">
          <div className="head c">
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--ocean)", textTransform: "uppercase", letterSpacing: "1.2px", display: "inline-block", marginBottom: "8px" }}>
              Ride Lombok&apos;s World-Class Waves
            </span>
            <h2>Lombok Surfing Lessons &amp; Coaching</h2>
            <p className="lead" style={{ maxWidth: "660px", margin: "8px auto 0" }}>
              Learn to surf in warm tropical waters with ISA-certified local coaches. Fun, safe, and flexible sessions for beginners to reef riders.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "24px", marginTop: "36px" }}>
            {/* Service Highlight 1: Beginner Surf Lesson (Selong Belanak / Gerupuk) */}
            <div style={{ background: "#ffffff", borderRadius: "20px", padding: "32px 28px", border: "1.5px solid var(--line)", boxShadow: "0 10px 30px rgba(4, 58, 75, 0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(43, 181, 216, 0.12)", color: "var(--ocean)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Waves size={26} strokeWidth={2.2} />
                </div>
                <h3>Beginner Surf Lesson</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.94rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Gentle sandy breaks at Selong Belanak or Gerupuk Bay. Includes 2 hours of private coaching, softboard, rash vest &amp; photos.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--deep)", fontWeight: 500 }}>
                    <Check size={16} strokeWidth={2.6} style={{ color: "var(--sea)" }} />
                    <span>1-on-1 or 1-on-2 dedicated local surf coach</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--deep)", fontWeight: 500 }}>
                    <Check size={16} strokeWidth={2.6} style={{ color: "var(--sea)" }} />
                    <span>Soft-top surfboard, leash, wax &amp; rash vest included</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--deep)", fontWeight: 500 }}>
                    <Check size={16} strokeWidth={2.6} style={{ color: "var(--sea)" }} />
                    <span>Free beach transfer &amp; digital surf action photos</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl("Hello Lombok Travel Diary! I would like to book a Beginner Surf Lesson in Lombok. Dates: ___ Number of surfers: ___ Skill level: First Timer / Beginner")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <WhatsAppIcon size={18} />
                Book Surf
              </a>
            </div>

            {/* Service Highlight 2: Surf Guiding & Intermediate Coaching */}
            <div style={{ background: "#ffffff", borderRadius: "20px", padding: "32px 28px", border: "1.5px solid var(--line)", boxShadow: "0 10px 30px rgba(4, 58, 75, 0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(242, 165, 65, 0.14)", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Award size={26} strokeWidth={2.2} />
                </div>
                <h3>Surf Guiding &amp; Boat Trips</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.94rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  Score Lombok&apos;s best reef breaks with local boat charters, tide analysis, and dedicated in-water wave coaching.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--deep)", fontWeight: 500 }}>
                    <Check size={16} strokeWidth={2.6} style={{ color: "var(--sea)" }} />
                    <span>Private traditional wooden boat charter to reef breaks</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--deep)", fontWeight: 500 }}>
                    <Check size={16} strokeWidth={2.6} style={{ color: "var(--sea)" }} />
                    <span>In-water coaching, wave selection &amp; video analysis</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--deep)", fontWeight: 500 }}>
                    <Check size={16} strokeWidth={2.6} style={{ color: "var(--sea)" }} />
                    <span>Guided by experienced lifelong local Kuta Lombok surfers</span>
                  </li>
                </ul>
              </div>
              <a
                href={waUrl("Hello Lombok Travel Diary! I would like to enquire about Surf Guiding & Boat Trips in Lombok. Dates: ___ Number of surfers: ___ Skill level (Intermediate / Advanced): ___ Preferred spots: ___")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <WhatsAppIcon size={18} />
                Enquire Surf
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT STORY SECTION */}
      <section id="about">
        <div className="wrap split">
          <div className="photo">
            <Image
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=70"
              alt="Traveller enjoying scenic Lombok view"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2>Born on Lombok, Dedicated to Mindful Explorers.</h2>
            <p>
              Lombok Travel Diary is an independent team of locals who know and love this island deeply. We connect you directly with trustworthy private drivers, licensed mountain guides, experienced Sembalun porters, and island boat captains.
            </p>
            <p>
              Every itinerary is completely private or small-group, tailored to your own rhythm and travel style — never rushed, never scripted.
            </p>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: "20px 0 26px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.95rem" }}>
                <Check size={18} strokeWidth={2.6} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "2px" }} />
                <span>Certified, knowledgeable, and genuinely friendly local guides</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.95rem" }}>
                <Check size={18} strokeWidth={2.6} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "2px" }} />
                <span>All logistics (camping equipment, boats, private AC cars, tickets) confirmed in advance</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.95rem" }}>
                <Check size={18} strokeWidth={2.6} style={{ color: "var(--sea)", flexShrink: 0, marginTop: "2px" }} />
                <span>Live WhatsApp concierge support throughout your stay in Lombok</span>
              </li>
            </ul>
            <a className="btn btn-primary" href={waUrl("Hello Lombok Travel Diary! I would like to ask some questions about travelling in Lombok.")} target="_blank" rel="noopener noreferrer">
              Chat With Our Local Team
            </a>
          </div>
        </div>
      </section>

      {/* 5. HOW TO BOOK (4 STEPS) */}
      <section className="book" id="how-to-book">
        <div className="wrap">
          <div className="head c">
            <h2>How to Book Your Trip</h2>
            <p className="lead">Just four simple steps directly on WhatsApp without long forms or complicated checkout.</p>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Say Hello</h3>
              <p>Tap any WhatsApp button to message our local team.</p>
            </div>
            <div className="step">
              <h3>Choose Your Spots</h3>
              <p>Tell us your travel dates, group size, and preferred tours or destinations.</p>
            </div>
            <div className="step">
              <h3>Receive Plan</h3>
              <p>We send a clear personalized plan and local tips directly on WhatsApp.</p>
            </div>
            <div className="step">
              <h3>Confirm &amp; Enjoy</h3>
              <p>Secure your date, and your friendly driver or guide will greet you upon arrival.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POPULAR DESTINATIONS */}
      <section id="destinations" style={{ background: "var(--mist)" }}>
        <div className="wrap">
          <div className="head c">
            <h2>Featured Standalone Destinations in Lombok</h2>
            <p className="lead">
              A Tour is a bundled itinerary, while a Destination is an individual spot in Lombok. Explore these iconic locations and untouched hidden gems!
            </p>
          </div>
          <div className="grid g4">
            <Link className="dest" href="/destination/savana-dandaun">
              <div className="img">
                <Image
                  src="/bukit-dandaun.png"
                  alt="Savana Dandaun Sembalun"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="gem-pill">
                  <Gem size={12} strokeWidth={2.4} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "-1px" }} />
                  Hidden Gem
                </span>
                <h3>Savana Dandaun</h3>
                <p>Secluded green highland valley in Sembalun</p>
              </div>
            </Link>

            <Link className="dest" href="/destination/secret-gili-sekotong">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=70"
                  alt="Secret Gilis Sekotong"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="gem-pill">
                  <Gem size={12} strokeWidth={2.4} style={{ display: "inline-block", marginRight: "4px", verticalAlign: "-1px" }} />
                  Hidden Gem
                </span>
                <h3>Secret Gilis Sekotong</h3>
                <p>Gili Nanggu, Sudak &amp; tiny sandbar Gili Kedis</p>
              </div>
            </Link>

            <Link className="dest" href="/destination/pergasingan-hill">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=70"
                  alt="Pergasingan Hill Sembalun"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3>Pergasingan Hill</h3>
                <p>Patchwork farmlands &amp; Rinjani sunrise vista</p>
              </div>
            </Link>

            <Link className="dest" href="/destination/pertamina-mandalika-circuit">
              <div className="img">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=700&q=70"
                  alt="Pertamina Mandalika International Circuit"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3>Mandalika Circuit</h3>
                <p>World-class MotoGP circuit &amp; trackday</p>
              </div>
            </Link>
          </div>
          <div className="center" style={{ marginTop: "32px" }}>
            <Link className="btn btn-primary" href="/destination">
              View All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="why">
        <div className="wrap">
          <div className="head c">
            <h2>Why Choose Lombok Travel Diary</h2>
          </div>
          <div className="grid g4">
            <div className="item">
              <div className="ico">
                <MessageCircle size={26} strokeWidth={2} />
              </div>
              <h3>Fast WhatsApp Support</h3>
              <p>Direct communication with our local team with zero robotic phone trees or paperwork.</p>
            </div>
            <div className="item">
              <div className="ico">
                <Users size={26} strokeWidth={2} />
              </div>
              <h3>Local Guides &amp; Porters</h3>
              <p>Experienced native Sembalun and Lombok team members who know every trail and reef.</p>
            </div>
            <div className="item">
              <div className="ico">
                <ShieldCheck size={26} strokeWidth={2} />
              </div>
              <h3>Safe &amp; Spotless Fleet</h3>
              <p>Clean, air-conditioned private vehicles, seaworthy boats, and high-quality camping gear.</p>
            </div>
            <div className="item">
              <div className="ico">
                <Clock size={26} strokeWidth={2} />
              </div>
              <h3>Flexible Private Timing</h3>
              <p>Set your own pace. Stay longer at sunset, linger at lunch, or adjust stops on the fly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (TripAdvisor Rating & Reviews) */}
      <section style={{ background: "#f8fafc", padding: "80px 0" }}>
        <div className="wrap">
          <div className="head c">
            {/* TripAdvisor Badge & Rating Header */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "#ffffff",
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(0, 175, 135, 0.25)",
                boxShadow: "0 2px 10px rgba(0, 175, 135, 0.08)",
                marginBottom: "16px",
              }}
            >
              <TripAdvisorLogo width={140} height={30} aria-label="Tripadvisor" />
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ display: "flex", gap: "3px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "#00aa6c",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#475569" }}>5.0 · Excellent (140+ Reviews)</span>
              </div>
            </div>

            <h2>Words from Mindful Explorers</h2>
            <p className="lead" style={{ maxWidth: "620px", margin: "6px auto 0" }}>
              Authentic reviews from independent travellers who explored Lombok on their own terms.
            </p>
          </div>

          <div className="grid g3">
            <div className="quote" style={{ background: "#ffffff", borderRadius: "18px", padding: "26px 24px", border: "1px solid var(--line)", boxShadow: "0 4px 18px rgba(4, 58, 75, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                {/* TripAdvisor 5 Green Bubbles */}
                <div style={{ display: "flex", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "#00aa6c",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TripAdvisorLogo width={76} height={16} aria-label="Tripadvisor" />
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#00aa6c", background: "rgba(0, 170, 108, 0.1)", padding: "3px 8px", borderRadius: "6px" }}>
                    Verified
                  </span>
                </div>
              </div>
              <h4 style={{ fontSize: "1.02rem", color: "var(--deep)", marginBottom: "8px", fontWeight: 700 }}>
                &ldquo;Pure magic in Sembalun!&rdquo;
              </h4>
              <p style={{ fontSize: "0.94rem", lineHeight: 1.6, color: "var(--muted)", marginBottom: "16px" }}>
                Camping on Pergasingan and visiting Savana Dandaun was purely magical! Our porter and guide took such good care of us, serving hot campfire food with panoramic Rinjani views. Everything was completely flexible to our pace.
              </p>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <small style={{ fontWeight: 700, color: "var(--deep)", fontSize: "0.86rem" }}>Clara &amp; Marcus</small>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Melbourne, Australia</span>
              </div>
            </div>

            <div className="quote" style={{ background: "#ffffff", borderRadius: "18px", padding: "26px 24px", border: "1px solid var(--line)", boxShadow: "0 4px 18px rgba(4, 58, 75, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "#00aa6c",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TripAdvisorLogo width={76} height={16} aria-label="Tripadvisor" />
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#00aa6c", background: "rgba(0, 170, 108, 0.1)", padding: "3px 8px", borderRadius: "6px" }}>
                    Verified
                  </span>
                </div>
              </div>
              <h4 style={{ fontSize: "1.02rem", color: "var(--deep)", marginBottom: "8px", fontWeight: 700 }}>
                &ldquo;Secret Gilis without the crowds&rdquo;
              </h4>
              <p style={{ fontSize: "0.94rem", lineHeight: 1.6, color: "var(--muted)", marginBottom: "16px" }}>
                Snorkeling at Secret Gili Nanggu and Kedis was the undisputed highlight of our Indonesia trip. Crystal clear turquoise waters, vibrant coral gardens, and the GoPro footage was sent directly to our phones on WhatsApp!
              </p>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <small style={{ fontWeight: 700, color: "var(--deep)", fontSize: "0.86rem" }}>Sophie &amp; Liam</small>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>London, United Kingdom</span>
              </div>
            </div>

            <div className="quote" style={{ background: "#ffffff", borderRadius: "18px", padding: "26px 24px", border: "1px solid var(--line)", boxShadow: "0 4px 18px rgba(4, 58, 75, 0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "#00aa6c",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <TripAdvisorLogo width={76} height={16} aria-label="Tripadvisor" />
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#00aa6c", background: "rgba(0, 170, 108, 0.1)", padding: "3px 8px", borderRadius: "6px" }}>
                    Verified
                  </span>
                </div>
              </div>
              <h4 style={{ fontSize: "1.02rem", color: "var(--deep)", marginBottom: "8px", fontWeight: 700 }}>
                &ldquo;Exceptional Mandalika &amp; Beach day&rdquo;
              </h4>
              <p style={{ fontSize: "0.94rem", lineHeight: 1.6, color: "var(--muted)", marginBottom: "16px" }}>
                Walking through Mandalika Pit Lane and seeing Turn 10 up close was unbelievable. Our private driver then took us to secluded Tanjung Bloam and an unforgettable sunset at Merese Hill. Outstanding service and local care.
              </p>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <small style={{ fontWeight: 700, color: "var(--deep)", fontSize: "0.86rem" }}>David Tan</small>
                <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Singapore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. MOMENTS FROM LOMBOK (GALLERY SLIDER) */}
      <section
        id="gallery"
        style={{
          background: "var(--mist)",
          position: "relative",
        }}
      >
        <div className="wrap">
          <div className="head c">
            <h2>Moments Across Lombok</h2>
            <p className="lead" style={{ maxWidth: "640px", margin: "8px auto 0" }}>
              Explore real moments from our private travels. Click on any photo to view its story and related tour package!
            </p>
          </div>

          <div className="gallery-slider-container">
            {/* Left Prev Button on side */}
            <button
              type="button"
              className="gallery-nav-btn prev"
              onClick={() => scrollGallery("left")}
              aria-label="Previous photos"
            >
              <ChevronLeft size={24} strokeWidth={2.4} />
            </button>

            {/* Gallery Track */}
            <div className="track" ref={trackRef} tabIndex={0} aria-label="Photo gallery">
              {galleryMoments.map((item) => (
                <figure
                  key={item.id}
                  className="slide"
                  onClick={() => setActiveMoment(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveMoment(item);
                    }
                  }}
                  title="Click to view details and related tour"
                  style={{ cursor: "pointer" }}
                >
                  <div className="img" role="img" aria-label={item.title}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 400px"
                      className="object-cover"
                      loading="lazy"
                    />
                    <span className="slide-zoom-pill">
                      <ZoomIn size={13} strokeWidth={2.4} />
                      Click to view
                    </span>
                  </div>
                  <figcaption>
                    {item.title}
                    <span>{item.subtitle}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Right Next Button on side */}
            <button
              type="button"
              className="gallery-nav-btn next"
              onClick={() => scrollGallery("right")}
              aria-label="Next photos"
            >
              <ChevronRight size={24} strokeWidth={2.4} />
            </button>
          </div>

          {/* View More Gallery Button */}
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link
              href="/gallery"
              className="btn btn-outline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "13px 32px",
                fontSize: "0.98rem",
                fontWeight: 700,
                borderRadius: "999px",
                border: "2px solid var(--ocean)",
                color: "var(--ocean)",
                background: "#ffffff",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 14px rgba(4, 58, 75, 0.08)",
              }}
            >
              View More Gallery Moments
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY POPUP MODAL (Only Title, Description, and Featured Tour Package) */}
      {activeMoment && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setActiveMoment(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
        >
          <div
            className="gallery-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setActiveMoment(null)}
              aria-label="Close details"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Modal Image */}
            <div className="gallery-modal-img">
              <Image
                src={activeMoment.imageUrl}
                alt={activeMoment.title}
                fill
                sizes="(max-width: 900px) 100vw, 860px"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* Modal Content */}
            <div className="gallery-modal-body">
              <h3 id="gallery-modal-title" className="gallery-modal-title">
                {activeMoment.title}
              </h3>
              <p className="gallery-modal-desc">{activeMoment.description}</p>

              {/* Clean & Proper Featured in Tour Package Card */}
              <div className="gallery-featured-card">
                <span className="gfc-eyebrow">Featured in Tour Package:</span>
                <div className="gfc-body">
                  <div className="gfc-thumb">
                    <Image
                      src={activeMoment.relatedTour.imageUrl}
                      alt={activeMoment.relatedTour.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="gfc-details">
                    <div className="gfc-badges">
                      <span className="gfc-badge-cat">{activeMoment.relatedTour.category}</span>
                      <span className="gfc-badge-dur">{activeMoment.relatedTour.duration}</span>
                    </div>
                    <h4 className="gfc-tour-name">{activeMoment.relatedTour.name}</h4>
                    <p className="gfc-tagline">{activeMoment.relatedTour.tagline}</p>
                    <div className="gfc-actions">
                      <Link
                        href={`/tour-package/${activeMoment.relatedTour.slug}`}
                        className="gfc-btn-view"
                        onClick={() => setActiveMoment(null)}
                      >
                        View Tour Package →
                      </Link>
                      <a
                        href={waUrl(`Hello Lombok Travel Diary! I saw ${activeMoment.title} in your gallery and I am interested in the tour package: ${activeMoment.relatedTour.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gfc-btn-wa"
                      >
                        <WhatsAppIcon size={14} />
                        Enquire on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

            {/* FAQ SECTION */}
      <section style={{ background: "#f8fafc", padding: "80px 0" }}>
        <div className="wrap">
          <div className="head c">
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--sea)", textTransform: "uppercase", letterSpacing: "1.2px", display: "inline-block", marginBottom: "8px" }}>
              Frequently Asked Questions
            </span>
            <h2>Common Questions Before Travelling</h2>
            <p className="lead" style={{ maxWidth: "600px", margin: "6px auto 0" }}>
              Helpful answers regarding our private tour service, booking process, and flexible island itineraries.
            </p>
          </div>
          <div className="faq">
            <details>
              <summary>How do I book a private tour or transfer?</summary>
              <p>
                Simply tap any WhatsApp button across our site to message our local team directly. Share your travel dates, group size, and preferred destinations, and we will send a clear itinerary and transparent quote.
              </p>
            </details>
            <details>
              <summary>Are all tours 100% private?</summary>
              <p>
                Yes! Every trip is private exclusively for you, your partner, family, or friends. You will never share a vehicle or boat with strangers, giving you complete freedom to set your own pace.
              </p>
            </details>
            <details>
              <summary>Do you offer hotel, airport, and harbor pickups?</summary>
              <p>
                Yes. Door-to-door hotel pickup across Lombok (Kuta, Mataram, Senggigi, Selong Belanak) is included in all tour packages. We also provide punctual transfers to and from Lombok International Airport (LOP) and all fast boat harbors (Bangsal, Lembar, Teluk Nara).
              </p>
            </details>
            <details>
              <summary>Can I customize or adjust my itinerary on the day?</summary>
              <p>
                Absolutely! Our friendly local drivers and licensed guides are flexible. You can linger longer at a scenic sunset spot, stop for lunch at an authentic local warung, or adjust stops along the way.
              </p>
            </details>
            <details>
              <summary>What is the payment method?</summary>
              <p>
                A small deposit confirms your travel date, and the remaining balance can be settled conveniently via bank transfer or cash in Indonesian Rupiah on the day of your trip.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 10. CTA SECTION */}
      <section className="cta">
        <div className="wrap">
          <h2>Ready to Experience Lombok?</h2>
          <p>Tell us when you are arriving and what you want to see. Our local team will reply with a tailor-made plan and transparent quote.</p>
          <a className="btn btn-wa" href={waUrl()} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp Now
          </a>
        </div>
      </section>
    </main>
  );
}

import React, { useRef } from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import { Search, Camera, MapPin, Star, Check } from "lucide-react"
import AppStoreButton from "../components/AppStoreButton"
import "../styles/global.css"

const GOOGLE_ADS_CONVERSION_ID = "AW-17868363896/HKToCOGo35scEPiwpshC"

const testimonials = [
  {
    name: "Sarah J.",
    role: "Homeowner",
    text: "I used to spend 20 minutes looking for things I KNEW I owned. Now I just search StashDog. Found my passport in 10 seconds.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike C.",
    role: "Dad of 3",
    text: "My garage was a black hole. I've literally bought the same drill bit 4 times. StashDog ended that embarrassing cycle.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily W.",
    role: "Busy Mom",
    text: "The QR codes on storage bins are a game changer. I can see what's inside without opening a single lid. My husband is obsessed.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]

const painPoints = [
  {
    emoji: "🔍",
    headline: "You've torn the house apart looking for it.",
    sub: "Keys, chargers, tools, that one specific cable. Gone. Every time.",
  },
  {
    emoji: "🛒",
    headline: "You've bought the same thing twice. Or four times.",
    sub: "It was in the garage. Under the stairs. In a box you forgot existed.",
  },
  {
    emoji: "📦",
    headline: "You have boxes you haven't opened since you moved in.",
    sub: "Somewhere in there is everything you 'know' you own but can't actually locate.",
  },
]

const features = [
  {
    icon: Camera,
    title: "Snap a photo. StashDog does the rest.",
    desc: "AI identifies and catalogs your stuff automatically. No typing. No spreadsheets. Just point and shoot.",
  },
  {
    icon: Search,
    title: "Natural language search that actually works.",
    desc: 'Type "blue jacket" or "camping stove" and find it instantly, even if you labeled it something different.',
  },
  {
    icon: MapPin,
    title: "Know where everything lives.",
    desc: "Tag items by room, bin, or box. QR code your storage containers. Never dig blindly again.",
  },
]

const FindYourShitPage = () => {
  const hasFiredConversionRef = useRef(false)

  const fireConversion = () => {
    if (
      hasFiredConversionRef.current ||
      typeof window === "undefined" ||
      typeof window.gtag !== "function"
    ) {
      return
    }
    window.gtag("event", "conversion", { send_to: GOOGLE_ADS_CONVERSION_ID })
    hasFiredConversionRef.current = true
  }

  const handleDownloadClick = () => {
    fireConversion()
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "download_click", {
        page: "find-your-shit",
        platform: "ios",
      })
    }
  }

  return (
    <div style={{ background: "var(--bg-dark)", minHeight: "100vh", color: "var(--text-main)" }}>
      <Helmet>
        <html lang="en" />
        <title>Find Your Shit — StashDog Home Inventory App</title>
        <meta
          name="description"
          content="Stop losing your stuff. StashDog is the free iPhone app that catalogs everything you own so you can actually find it. AI-powered, takes 5 minutes to start."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://stashdog.io/find-your-shit/" />
        <link rel="icon" type="image/png" sizes="32x32" href="/round-logo-goggles.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Find Your Shit — StashDog" />
        <meta property="og:description" content="The app that knows where your stuff is. Free for iPhone." />
        <meta property="og:image" content="https://stashdog.io/lab1.png" />
      </Helmet>

      {/* ── Minimal Header ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "0 2rem",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          <img
            src="/round-logo-goggles.png"
            alt="StashDog"
            style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid var(--color-primary)" }}
          />
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-main)" }}>
            StashDog
          </span>
        </Link>
        <AppStoreButton onClick={handleDownloadClick} style={{ transform: "scale(0.8)", transformOrigin: "right center" }} />
      </header>

      {/* ── Hero ── */}
      <section
        style={{
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(252,217,0,0.12)",
            border: "1px solid rgba(252,217,0,0.3)",
            borderRadius: "99px",
            padding: "0.4rem 1.2rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1.5rem",
          }}
        >
          Free iPhone App
        </div>

        <h1
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            color: "var(--text-main)",
          }}
        >
          Find Your{" "}
          <span style={{ color: "var(--color-primary)" }}>Shit.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "var(--text-muted)",
            maxWidth: "580px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.65,
          }}
        >
          StashDog is the free iPhone app that catalogs everything you own —
          so you can actually find it when you need it.
          No spreadsheets. No sticky notes. Just answers.
        </p>

        {/* App Store CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <AppStoreButton onClick={handleDownloadClick} />
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Free to download · iPhone & iPad
          </span>
        </div>

        {/* Social proof bar */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#fcd900" color="#fcd900" />
            ))}
          </div>
          <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
            4.8 on the App Store · 128+ households organized
          </span>
        </div>
      </section>

      {/* ── Hero Image ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto 5rem", padding: "0 2rem" }}>
        <img
          src="/lab1.png"
          alt="StashDog app showing organized home inventory"
          style={{
            width: "100%",
            borderRadius: "24px",
            display: "block",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* ── Pain Points ── */}
      <section style={{ padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            marginBottom: "0.75rem",
          }}
        >
          Sound familiar?
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "3rem",
            fontSize: "1.1rem",
          }}
        >
          You're not disorganized. You're just living without the right tool.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {painPoints.map((p, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                padding: "2rem",
                border: "1px solid var(--glass-border)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{p.emoji}</div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "var(--text-main)",
                }}
              >
                {p.headline}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0 }}>
                {p.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "rgba(252,217,0,0.03)",
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "0.75rem",
            }}
          >
            How StashDog works
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              marginBottom: "3.5rem",
              fontSize: "1.1rem",
            }}
          >
            Set up in 5 minutes. Actually useful forever.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "16px",
                      background: "rgba(252,217,0,0.12)",
                      border: "1px solid rgba(252,217,0,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    <Icon size={28} color="var(--color-primary)" />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                      color: "var(--text-main)",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            marginBottom: "3rem",
          }}
        >
          People who got their shit together
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                padding: "2rem",
                border: "1px solid var(--glass-border)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", gap: "3px" }}>
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} fill="#fcd900" color="#fcd900" />
                ))}
              </div>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-main)",
                  lineHeight: 1.65,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src={t.image}
                  alt={t.name}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    border: "2px solid var(--color-primary)",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600 }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What you get ── */}
      <section
        style={{
          padding: "4rem 2rem",
          background: "var(--bg-card)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", marginBottom: "2.5rem" }}>
            Everything you need. Nothing you don't.
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 3rem", textAlign: "left" }}>
            {[
              "AI-powered photo cataloging",
              "Natural language search",
              "QR codes for boxes & storage bins",
              "Room and location tagging",
              "Family sharing",
              "Insurance-ready inventory export",
              "100% free to start",
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 0",
                  borderBottom: i < 6 ? "1px solid var(--glass-border)" : "none",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                }}
              >
                <Check size={20} color="var(--color-primary)" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          padding: "6rem 2rem",
          textAlign: "center",
          background: "linear-gradient(to bottom, var(--bg-dark), rgba(252,217,0,0.05) 50%, var(--bg-dark))",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Stop losing your stuff.
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "var(--text-muted)",
              marginBottom: "2.5rem",
            }}
          >
            Download StashDog free. Start organizing in 5 minutes.
          </p>
          <AppStoreButton onClick={handleDownloadClick} />
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            Free · iPhone & iPad · No account required to get started
          </p>
        </div>
      </section>

      {/* ── Minimal Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--glass-border)",
          padding: "2rem",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
        }}
      >
        <Link to="/" style={{ color: "var(--text-muted)", marginRight: "1.5rem", textDecoration: "none" }}>
          stashdog.io
        </Link>
        <Link to="/privacy" style={{ color: "var(--text-muted)", marginRight: "1.5rem", textDecoration: "none" }}>
          Privacy
        </Link>
        <Link to="/terms" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          Terms
        </Link>
        <p style={{ marginTop: "1rem", marginBottom: 0, fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Dogfood Lab LLC · Made for people with too much stuff.
        </p>
      </footer>
    </div>
  )
}

export default FindYourShitPage

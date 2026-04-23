import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppStoreButton from "../components/AppStoreButton";
import GooglePlayButton from "../components/GooglePlayButton";
import { useFirebase } from "../hooks/useFirebase";
import {
  Check,
  X,
  Zap,
  DollarSign,
  Users,
  Brain,
  QrCode,
  Shield,
  Home,
  Package,
  Star,
  ArrowRight,
} from "lucide-react";
import "../styles/global.css";

const VsSortlyPage = () => {
  const { isInitialized, logEvent } = useFirebase();

  useEffect(() => {
    if (isInitialized) {
      logEvent("page_view", {
        page_title: "StashDog vs Sortly",
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: "/vs-sortly",
      });
    }
  }, [isInitialized, logEvent]);

  const comparisonRows = [
    {
      feature: "Free plan",
      stashdog: true,
      sortly: "Limited (100 items)",
      winner: "stashdog",
    },
    {
      feature: "Unlimited items",
      stashdog: true,
      sortly: false,
      winner: "stashdog",
    },
    {
      feature: "Starting price",
      stashdog: "$0 forever",
      sortly: "$29/month",
      winner: "stashdog",
    },
    {
      feature: "AI-powered photo recognition",
      stashdog: true,
      sortly: false,
      winner: "stashdog",
    },
    {
      feature: "Built for home use",
      stashdog: true,
      sortly: false,
      winner: "stashdog",
    },
    {
      feature: "Moving & box tracking (QR codes)",
      stashdog: true,
      sortly: true,
      winner: "tie",
    },
    {
      feature: "Family sharing",
      stashdog: true,
      sortly: "Paid plans only",
      winner: "stashdog",
    },
    {
      feature: "Insurance documentation",
      stashdog: true,
      sortly: true,
      winner: "tie",
    },
    {
      feature: "iOS & Android apps",
      stashdog: true,
      sortly: true,
      winner: "tie",
    },
    {
      feature: "Business inventory features",
      stashdog: false,
      sortly: true,
      winner: "sortly",
    },
    {
      feature: "Barcode scanning",
      stashdog: true,
      sortly: true,
      winner: "tie",
    },
    {
      feature: "Setup time",
      stashdog: "Under 5 minutes",
      sortly: "30+ minutes",
      winner: "stashdog",
    },
  ];

  const renderCell = (value, side) => {
    if (value === true) {
      return (
        <span style={{ color: "#4ade80", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Check size={20} strokeWidth={3} />
        </span>
      );
    }
    if (value === false) {
      return (
        <span style={{ color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={20} strokeWidth={3} />
        </span>
      );
    }
    return (
      <span style={{ color: side === "stashdog" ? "#fcd900" : "var(--text-muted)", fontWeight: 600, fontSize: "0.9rem" }}>
        {value}
      </span>
    );
  };

  return (
    <div className="page-container">
      <Helmet>
        <html lang="en" />
        <title>StashDog vs Sortly — The Better Home Inventory App (And It's Free)</title>
        <meta
          name="description"
          content="Comparing StashDog vs Sortly for home inventory? StashDog is free forever, built for homes (not warehouses), and uses AI to catalog your stuff in seconds. Sortly starts at $29/month. The choice is easy."
        />
        <meta
          name="keywords"
          content="StashDog vs Sortly, Sortly alternative, Sortly free alternative, home inventory app comparison, best home inventory app, Sortly competitor"
        />
        <link rel="canonical" href="https://stashdog.io/vs-sortly/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="StashDog vs Sortly — The Better Home Inventory App (And It's Free)" />
        <meta
          property="og:description"
          content="Sortly charges $29/month. StashDog is free forever. Here's the full comparison."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stashdog.io/vs-sortly" />
        <meta property="og:image" content="https://stashdog.io/lab1.png" />
        <meta property="og:site_name" content="StashDog" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="StashDog vs Sortly — The Better Home Inventory App (And It's Free)" />
        <meta name="twitter:description" content="Sortly charges $29/month. StashDog is free forever. Here's the full comparison." />
        <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is StashDog better than Sortly for home use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Sortly is designed for small businesses managing physical inventory — it's priced at $29–$59/month and optimized for warehouses and stockrooms. StashDog is purpose-built for homes and families, completely free, and uses AI photo recognition to catalog your belongings in seconds. For home inventory, StashDog is the better choice.",
                },
              },
              {
                "@type": "Question",
                name: "How much does Sortly cost vs StashDog?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sortly's paid plans start at $29/month (billed annually). Their free plan is limited to 100 items. StashDog is free forever with no item limits and no credit card required.",
                },
              },
              {
                "@type": "Question",
                name: "Does StashDog have QR code scanning like Sortly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. StashDog includes QR code scanning for labeling boxes and storage containers — perfect for moving or tracking what's in your garage, attic, or storage unit.",
                },
              },
              {
                "@type": "Question",
                name: "What's the best free Sortly alternative?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "StashDog is the best free Sortly alternative for home users. It's completely free, supports unlimited items, has AI-powered photo recognition, and is designed specifically for homes and families — not businesses.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section style={{ paddingTop: "8rem", paddingBottom: "4rem", textAlign: "center" }}>
          <div className="container">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(252, 217, 0, 0.06)",
                padding: "0.5rem 1.25rem",
                borderRadius: "99px",
                marginBottom: "2rem",
                border: "1px solid rgba(252, 217, 0, 0.12)",
              }}
            >
              <Star size={16} fill="#fcd900" color="#fcd900" />
              <span style={{ color: "#fcd900", fontWeight: "600", fontSize: "0.9rem" }}>
                App Comparison
              </span>
            </div>

            <h1 style={{ marginBottom: "1.5rem", maxWidth: "800px", margin: "0 auto 1.5rem" }}>
              StashDog vs Sortly
            </h1>

            <p
              style={{
                fontSize: "1.3rem",
                maxWidth: "640px",
                margin: "0 auto 1rem",
                color: "var(--text-muted)",
              }}
            >
              Sortly wants{" "}
              <span
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  color: "#ef4444",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "6px",
                  fontWeight: 700,
                }}
              >
                $29/month
              </span>{" "}
              to organize your home. StashDog is{" "}
              <span style={{ color: "#fcd900", fontWeight: 700 }}>free forever.</span>
            </p>
            <p style={{ fontSize: "1.1rem", maxWidth: "560px", margin: "0 auto 3rem", color: "var(--text-muted)" }}>
              And not "free with a 100-item cap" free. Actually, properly, no-credit-card-required free.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/download"
                className="cta-button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--color-primary)",
                  color: "#000",
                  padding: "0.9rem 2rem",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                Get StashDog Free <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Score Cards */}
        <section style={{ padding: "2rem 0 5rem" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {/* StashDog Card */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "2px solid var(--color-primary)",
                  borderRadius: "20px",
                  padding: "2rem",
                  textAlign: "center",
                  boxShadow: "0 0 40px rgba(252, 217, 0, 0.1)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🐶</div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "0.25rem", color: "#fcd900" }}>StashDog</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Built for homes & families
                </p>
                <div
                  style={{
                    background: "rgba(252, 217, 0, 0.1)",
                    border: "1px solid rgba(252, 217, 0, 0.2)",
                    borderRadius: "12px",
                    padding: "1rem",
                  }}
                >
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fcd900" }}>$0</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>forever. no tricks.</div>
                </div>
              </div>

              {/* Sortly Card */}
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "20px",
                  padding: "2rem",
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "0.25rem", color: "var(--text-muted)" }}>Sortly</h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Built for small businesses
                </p>
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.06)",
                    border: "1px solid rgba(239, 68, 68, 0.15)",
                    borderRadius: "12px",
                    padding: "1rem",
                  }}
                >
                  <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ef4444" }}>$29+</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>per month, billed annually</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section style={{ padding: "2rem 0 6rem" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>Feature by Feature</h2>
              <p style={{ maxWidth: "540px", margin: "0 auto" }}>
                The full breakdown — no asterisks, no "contact sales for pricing."
              </p>
            </div>

            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                background: "var(--bg-card)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid var(--glass-border)",
                  padding: "1rem 1.5rem",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Feature
                </div>
                <div style={{ textAlign: "center", fontWeight: 700, color: "#fcd900", fontSize: "0.95rem" }}>
                  StashDog
                </div>
                <div style={{ textAlign: "center", fontWeight: 700, color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  Sortly
                </div>
              </div>

              {/* Table Rows */}
              {comparisonRows.map((row, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    padding: "1rem 1.5rem",
                    borderBottom: index < comparisonRows.length - 1 ? "1px solid var(--glass-border)" : "none",
                    background: row.winner === "stashdog" ? "rgba(252, 217, 0, 0.02)" : "transparent",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "0.95rem" }}>
                      {row.feature}
                    </span>
                    {row.winner === "stashdog" && (
                      <span
                        style={{
                          background: "rgba(252, 217, 0, 0.1)",
                          border: "1px solid rgba(252, 217, 0, 0.2)",
                          color: "#fcd900",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "99px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Win
                      </span>
                    )}
                  </div>
                  <div style={{ textAlign: "center" }}>{renderCell(row.stashdog, "stashdog")}</div>
                  <div style={{ textAlign: "center" }}>{renderCell(row.sortly, "sortly")}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why StashDog Wins for Homes */}
        <section style={{ padding: "2rem 0 6rem" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>Sortly is built for businesses. You're not a business.</h2>
              <p style={{ maxWidth: "600px", margin: "0 auto" }}>
                Sortly started as a warehouse management tool for small businesses tracking product inventory. If you're running a stockroom, great. If you just want to know which box your KitchenAid is in — it's overkill.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.5rem",
                maxWidth: "1100px",
                margin: "0 auto",
              }}
            >
              {[
                {
                  icon: <DollarSign size={28} color="#fcd900" />,
                  title: "It's Free. Actually Free.",
                  body: "No 100-item limit. No 14-day trial. No \"starter plan\" that expires. StashDog is free forever with every feature included.",
                },
                {
                  icon: <Brain size={28} color="#fcd900" />,
                  title: "AI Does the Work",
                  body: "Take a photo. Our AI recognizes and categorizes it automatically. No manual data entry, no typing out descriptions, no fiddling with spreadsheets.",
                },
                {
                  icon: <Home size={28} color="#fcd900" />,
                  title: "Built for Home Chaos",
                  body: "Junk drawers. Storage units. The garage where hope goes to die. StashDog is designed around how homes actually work, not how warehouses work.",
                },
                {
                  icon: <Package size={28} color="#fcd900" />,
                  title: "Moving Made Survivable",
                  body: "QR code your boxes, photograph the contents, and never spend 45 minutes looking for your router again. StashDog turns moving day from a nightmare into a mildly stressful Tuesday.",
                },
                {
                  icon: <Users size={28} color="#fcd900" />,
                  title: "Family Sharing, Free",
                  body: "Sortly charges extra for team access. StashDog gives your whole family access out of the box — share collections, assign locations, and stop arguing about who has the scissors.",
                },
                {
                  icon: <Shield size={28} color="#fcd900" />,
                  title: "Insurance-Ready",
                  body: "Catalog your valuables with photos, purchase prices, and serial numbers. If you ever need to file a claim, your entire home inventory is documented and searchable.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    padding: "2rem",
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>{card.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#fff" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The One Thing Sortly Does Better */}
        <section style={{ padding: "2rem 0 5rem" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--glass-border)",
                borderRadius: "20px",
                padding: "3rem",
              }}
            >
              <h2 style={{ fontSize: "1.8rem", marginBottom: "1.25rem" }}>
                To be fair: Sortly is better if you run a small business
              </h2>
              <p>
                If you're managing a physical retail store, a photography equipment rental operation, or tracking stock across multiple locations for a business — Sortly's reporting tools and multi-user business features are designed exactly for that.
              </p>
              <p>
                If you're a human person who lives in a house and owns stuff... you don't need any of that. You need something fast, free, and smart enough to keep up with real life. That's StashDog.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials / Social Proof */}
        <section style={{ padding: "2rem 0 5rem" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ marginBottom: "0.75rem" }}>What people say after switching</h2>
              <p>Real humans who were paying for Sortly and aren't anymore.</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
                maxWidth: "960px",
                margin: "0 auto",
              }}
            >
              {[
                {
                  quote: "I was paying $29/month for Sortly to track my garage stuff. Found StashDog, switched in 20 minutes. Free forever. I felt a little stupid about the Sortly bill.",
                  name: "Marcus T.",
                  context: "Homeowner, Austin TX",
                },
                {
                  quote: "Used Sortly for moving because my friend recommended it. Hit the item limit on day one. Switched to StashDog mid-move. Chaotic but worth it.",
                  name: "Priya K.",
                  context: "Just moved to Seattle",
                },
                {
                  quote: "My wife and I needed to catalog the house for insurance. Sortly kept asking us to upgrade. StashDog just... worked. And it was free. We felt seen.",
                  name: "Daniel R.",
                  context: "New homeowner",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    padding: "2rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} fill="#fcd900" color="#fcd900" />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "1.25rem", fontStyle: "italic", lineHeight: 1.75 }}>
                    "{t.quote}"
                  </p>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.context}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "2rem 0 6rem" }}>
          <div className="container" style={{ maxWidth: "760px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>Common questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  q: "Can I import my data from Sortly into StashDog?",
                  a: "We're working on a direct Sortly import tool. In the meantime, you can export your Sortly data as CSV and reach out to our team — we'll help you get set up.",
                },
                {
                  q: "Does StashDog have a web app like Sortly?",
                  a: "StashDog is currently mobile-first (iOS and Android). A web dashboard is on our roadmap. For most home inventory tasks, the mobile experience is faster and more natural anyway.",
                },
                {
                  q: "What happens if StashDog adds paid plans?",
                  a: "Our core home inventory features will always be free. If we add a premium tier, it'll be for power features — not to lock basic functionality behind a paywall the way Sortly does.",
                },
                {
                  q: "Is StashDog available on both iPhone and Android?",
                  a: "Yes. StashDog is available on iOS (iPhone and iPad) and Android. Both apps have the same features and stay in sync.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "0.75rem", color: "#fff", fontWeight: 700 }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.75 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: "4rem 0 8rem", textAlign: "center" }}>
          <div className="container">
            <div
              style={{
                maxWidth: "680px",
                margin: "0 auto",
                background: "var(--bg-card)",
                border: "2px solid rgba(252, 217, 0, 0.2)",
                borderRadius: "24px",
                padding: "4rem 3rem",
                boxShadow: "0 0 60px rgba(252, 217, 0, 0.06)",
              }}
            >
              <h2 style={{ marginBottom: "1rem" }}>
                Stop paying Sortly. Start using StashDog.
              </h2>
              <p style={{ marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
                Free forever. AI-powered. Built for people who just want to find their stuff.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <AppStoreButton />
                <GooglePlayButton />
              </div>
              <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)", margin: "1.5rem auto 0" }}>
                No credit card. No item limits. No BS.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VsSortlyPage;

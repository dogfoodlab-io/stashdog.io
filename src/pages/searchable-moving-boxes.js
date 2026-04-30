import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { ArrowRight, Camera, CheckCircle2, MapPin, PackageSearch, QrCode, Search } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const experiment = "which_box_is_it_in"
const page = "searchable_moving_boxes"

const steps = [
  {
    icon: <PackageSearch size={24} />,
    title: "Create a box record",
    text: "Name the box in plain English: Kitchen essentials, kid winter gear, office cables, documents, or whatever future-you will search for.",
  },
  {
    icon: <Camera size={24} />,
    title: "Add photos and key contents",
    text: "Snap the important stuff before you tape it shut. You do not need a perfect spreadsheet — just enough detail to find things later.",
  },
  {
    icon: <QrCode size={24} />,
    title: "Put a QR label on it",
    text: "Connect the physical box to the digital record so scanning the box shows what is inside.",
  },
  {
    icon: <Search size={24} />,
    title: "Search when chaos hits",
    text: "Type “HDMI cable,” “passport,” “coffee maker,” or “snow pants” and know which box to open first.",
  },
]

const examples = [
  "Router and modem",
  "Passports and closing documents",
  "Kids' first-night pajamas",
  "Coffee maker and filters",
  "Medication and chargers",
  "Winter gloves in storage",
]

const faq = [
  {
    question: "Do I need to inventory every single thing I own?",
    answer: "No. Start with the boxes you will regret opening blindly: essentials, documents, electronics, seasonal gear, fragile items, and anything going into storage.",
  },
  {
    question: "Can I use this after the move?",
    answer: "Yes. That is the point. The same records that help during packing become your home inventory after the boxes land in closets, basement shelves, garage bins, or storage units.",
  },
  {
    question: "Is this better than a spreadsheet?",
    answer: "For a tiny move, a spreadsheet can be enough. StashDog is better when you want photos, QR labels, searchable contents, shared access, and a system that survives unpacking.",
  },
]

const SearchableMovingBoxesPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (!isInitialized) return

    logEvent("page_view", {
      page_title: "Make Every Moving Box Searchable",
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_path: "/searchable-moving-boxes",
      experiment,
      page,
    })
  }, [isInitialized, logEvent])

  const handlePrimaryCta = (ctaLocation) => {
    logEvent("cta_click", {
      cta_text: "Make my boxes searchable",
      cta_location: ctaLocation,
      page,
      experiment,
    })
  }

  const handleDownloadClick = (platform) => {
    logEvent("download_click", {
      platform,
      page,
      source: "searchable_moving_boxes_landing_page",
      experiment,
    })
  }

  return (
    <div className="page-container searchable-moving-boxes-page">
      <Helmet>
        <html lang="en" />
        <title>Make Every Moving Box Searchable | StashDog</title>
        <meta
          name="description"
          content="Use StashDog to label moving boxes with QR codes, add photos of what is inside, and search for the exact box later."
        />
        <link rel="canonical" href="https://stashdog.io/searchable-moving-boxes/" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Make Every Moving Box Searchable" />
        <meta
          property="og:description"
          content="Stop opening every box to find one cable, document, or kitchen item. Label boxes, add contents, and search later with StashDog."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stashdog.io/searchable-moving-boxes/" />
        <meta property="og:image" content="https://stashdog.io/lab1.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <Header />

      <main>
        <section className="smb-hero">
          <div className="container smb-hero-grid">
            <div>
              <div className="smb-badge">
                <QrCode size={16} />
                Moving boxes + QR labels
              </div>
              <h1>Make every moving box searchable.</h1>
              <p className="smb-hero-copy">
                Stop opening the whole cardboard labyrinth to find one cable, coat, document, or kitchen gadget.
                StashDog turns your boxes into a searchable inventory before you seal them.
              </p>
              <div className="smb-cta-row">
                <a
                  href="#download"
                  className="cta-button"
                  onClick={() => handlePrimaryCta("hero")}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                >
                  Make my boxes searchable <ArrowRight size={18} />
                </a>
                <span>Free to start. No credit card required.</span>
              </div>
            </div>

            <div className="smb-search-card glass-panel" aria-label="Example box search card">
              <div className="smb-search-bar">
                <Search size={18} />
                <span>search: “coffee maker”</span>
              </div>
              <div className="smb-result-card">
                <div className="smb-result-icon"><PackageSearch size={28} /></div>
                <div>
                  <strong>Box 14 — Kitchen essentials</strong>
                  <p>Coffee maker, filters, mugs, kettle, first-night snacks</p>
                </div>
              </div>
              <div className="smb-result-card muted">
                <div className="smb-result-icon"><MapPin size={28} /></div>
                <div>
                  <strong>Destination: New kitchen</strong>
                  <p>Priority: unpack first night</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="smb-section">
          <div className="container">
            <div className="smb-section-heading">
              <h2>Pack once. Search later.</h2>
              <p>
                The moving problem is not making a pretty list. It is finding the exact thing you need when half your life is in sealed boxes.
              </p>
            </div>
            <div className="smb-steps-grid">
              {steps.map((step, index) => (
                <article className="glass-panel smb-step" key={step.title}>
                  <div className="smb-step-icon">{step.icon}</div>
                  <span>Step {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="smb-section smb-yellow-band">
          <div className="container smb-two-col">
            <div>
              <h2>Search for the thing, not the box number.</h2>
              <p>
                Box numbers only work if you remember what you put where. StashDog lets you search the contents directly, then open the right box first.
              </p>
            </div>
            <div className="smb-example-list glass-panel">
              {examples.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="smb-section">
          <div className="container smb-two-col">
            <div>
              <div className="smb-badge">After the move</div>
              <h2>Your moving inventory becomes your home inventory.</h2>
              <p>
                Most moving lists die after unpacking. StashDog keeps working when boxes move to the basement, garage, closet, attic, or storage unit.
              </p>
              <Link to="/moving-inventory-app" className="smb-text-link">
                Read the moving inventory guide →
              </Link>
            </div>
            <div className="glass-panel smb-objection-card">
              <h3>Use StashDog when you want to know:</h3>
              <ul>
                <li>Which box contains a specific item</li>
                <li>Which room the box should go to</li>
                <li>What is still in storage months later</li>
                <li>Which important items need photos or notes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="smb-section">
          <div className="container">
            <div className="smb-section-heading">
              <h2>Questions before you start</h2>
            </div>
            <div className="smb-faq-list">
              {faq.map((item) => (
                <details key={item.question} className="glass-panel smb-faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="smb-section smb-final-cta" id="download">
          <div className="container">
            <div className="glass-panel smb-final-panel">
              <h2>Start before the tape goes on.</h2>
              <p>
                Download StashDog and make the boxes you are packing today searchable when you need them later.
              </p>
              <div className="smb-store-buttons">
                <AppStoreButton onClick={handleDownloadClick} />
                <GooglePlayButton onClick={handleDownloadClick} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .searchable-moving-boxes-page main {
          overflow: hidden;
        }

        .smb-hero {
          padding: 7rem 0 5rem;
          background:
            radial-gradient(circle at 20% 20%, rgba(252, 217, 0, 0.18), transparent 30%),
            linear-gradient(135deg, #111 0%, #191919 65%, #0b0b0b 100%);
        }

        .smb-hero-grid,
        .smb-two-col {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 480px);
          gap: clamp(2rem, 5vw, 4rem);
          align-items: center;
        }

        .smb-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.2rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          background: rgba(252, 217, 0, 0.12);
          color: var(--color-primary);
          font-weight: 800;
          font-size: 0.92rem;
        }

        .smb-hero h1 {
          max-width: 760px;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 0.95;
          letter-spacing: -0.07em;
          margin-bottom: 1.5rem;
        }

        .smb-hero-copy {
          max-width: 680px;
          color: var(--text-muted);
          font-size: clamp(1.15rem, 2.2vw, 1.35rem);
          line-height: 1.65;
          margin-bottom: 2rem;
        }

        .smb-cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .smb-cta-row span {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .smb-search-card {
          padding: clamp(1.5rem, 4vw, 2rem);
          border-radius: 28px;
          border: 1px solid rgba(252, 217, 0, 0.22);
          transform: rotate(1deg);
        }

        .smb-search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          margin-bottom: 1rem;
        }

        .smb-result-card {
          display: grid;
          grid-template-columns: 54px 1fr;
          gap: 1rem;
          align-items: start;
          padding: 1rem;
          border-radius: 20px;
          background: rgba(252, 217, 0, 0.12);
          margin-bottom: 1rem;
        }

        .smb-result-card.muted {
          background: rgba(255,255,255,0.06);
          margin-bottom: 0;
        }

        .smb-result-card p {
          margin: 0.35rem 0 0;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .smb-result-icon,
        .smb-step-icon {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          background: rgba(0,0,0,0.22);
        }

        .smb-section {
          padding: 5rem 0;
        }

        .smb-section-heading {
          max-width: 760px;
          margin: 0 auto 2rem;
          text-align: center;
        }

        .smb-section-heading p,
        .smb-two-col p,
        .smb-final-panel p {
          color: var(--text-muted);
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .smb-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .smb-step {
          padding: 1.4rem;
          border-radius: 24px;
        }

        .smb-step span {
          display: block;
          margin-top: 1rem;
          color: var(--color-primary);
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .smb-step h3 {
          margin: 0.35rem 0 0.75rem;
        }

        .smb-step p {
          margin: 0;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .smb-yellow-band {
          background: linear-gradient(135deg, rgba(252, 217, 0, 0.1), rgba(255,255,255,0.02));
          border-top: 1px solid rgba(252, 217, 0, 0.1);
          border-bottom: 1px solid rgba(252, 217, 0, 0.1);
        }

        .smb-example-list,
        .smb-objection-card {
          padding: 1.5rem;
          border-radius: 24px;
        }

        .smb-example-list div {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 0;
          color: #fff;
          font-weight: 700;
        }

        .smb-example-list svg {
          color: var(--color-primary);
          flex: none;
        }

        .smb-text-link {
          color: var(--color-primary);
          font-weight: 800;
          text-decoration: none;
        }

        .smb-objection-card ul {
          margin: 1rem 0 0;
          padding-left: 1.25rem;
          color: var(--text-muted);
          line-height: 1.8;
        }

        .smb-faq-list {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
        }

        .smb-faq-item {
          padding: 1.2rem 1.4rem;
          border-radius: 18px;
        }

        .smb-faq-item summary {
          cursor: pointer;
          font-weight: 800;
          color: #fff;
        }

        .smb-faq-item p {
          color: var(--text-muted);
          line-height: 1.7;
        }

        .smb-final-cta {
          padding-top: 2rem;
        }

        .smb-final-panel {
          text-align: center;
          padding: clamp(2rem, 6vw, 4rem);
          border-radius: 32px;
          border: 1px solid rgba(252, 217, 0, 0.18);
        }

        .smb-store-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        @media (max-width: 920px) {
          .smb-hero-grid,
          .smb-two-col,
          .smb-steps-grid {
            grid-template-columns: 1fr;
          }

          .smb-search-card {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}

export default SearchableMovingBoxesPage

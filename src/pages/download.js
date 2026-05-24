import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const faq = [
  {
    question: "Is StashDog available for iPhone and Android?",
    answer:
      "Yes. StashDog is available on the App Store and Google Play, so households can start a shared inventory from either iPhone or Android.",
  },
  {
    question: "Can I start with the free plan?",
    answer:
      "Yes. The free plan is built for getting started with a lightweight home inventory before you decide whether a paid plan makes sense.",
  },
  {
    question: "What should I inventory first after downloading StashDog?",
    answer:
      "Start with the places where forgotten items cost the most time or money: storage bins, tools, valuables, documents, seasonal items, and anything you rebuy because you cannot find it.",
  },
]

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StashDog",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    url: "https://stashdog.io/download/",
    image: "https://stashdog.io/images/download-hero.png",
    description:
      "StashDog is a home inventory app for documenting items, storage locations, photos, notes, and shared household context.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  },
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stashdog.io/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Download",
        item: "https://stashdog.io/download/",
      },
    ],
  },
]

const DownloadPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  // Log page view when component mounts
  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'Download StashDog',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/download'
      })
    }
  }, [isInitialized, logEvent])

  const handleDownloadClick = (platform) => {
    if (isInitialized) {
      logEvent('download_click', {
        platform: platform,
        page: 'download_page'
      })
    }
  }

  return (
    <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Download StashDog - Get Organized Now</title>
          <meta name="description" content="Download StashDog home inventory app for iPhone and Android. Free smart organization tool with photo tracking, AI search, family sharing. Available on App Store and Google Play." />
          <meta name="keywords" content="StashDog download, iOS app, Android app, home organization, inventory management" />
          <link rel="canonical" href="https://stashdog.io/download/" />
          <meta name="robots" content="index, follow" />
          {/* Open Graph */}
          <meta property="og:title" content="Download StashDog - Get Organized Now" />
          <meta property="og:description" content="Download StashDog for iOS and Android. Stop living like a disaster and get organized." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/download" />
          <meta property="og:image" content="https://stashdog.io/images/social/stashdog-og-v2.png" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Download StashDog - Get Organized Now" />
          <meta name="twitter:description" content="Download StashDog for iOS and Android. Finally get your shit together." />
          <meta name="twitter:image" content="https://stashdog.io/images/social/stashdog-og-v2.png" />
          {/* Favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/round-logo-goggles.png" />
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
          {schema.map((entry, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(entry)}
            </script>
          ))}
        </Helmet>
        <Header />
        <main className="download-page">
          <section className="stashdog-hero">
            <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
              <h1 className="hero-title">Download StashDog</h1>
              <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                borderRadius: '24px',
                overflow: 'hidden'
              }}>
                <img
                  src="/images/download-hero.png"
                  alt=""
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 1.5rem auto' }}>
                Get organized now on iOS and Android.
              </p>
            </div>
          </section>
          <section className="download-options" style={{ paddingTop: 0 }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Latest Release</h3>
                <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)' }}>Get the current version on the App Store</p>
                <div className="download-buttons" style={{ justifyContent: 'center' }}>
                  <AppStoreButton onClick={handleDownloadClick} />
                  <GooglePlayButton onClick={handleDownloadClick} />
                </div>
              </div>

              <div style={{
                background: 'rgba(252, 217, 0, 0.1)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(252, 217, 0, 0.2)',
                textAlign: 'left'
              }}>
                <h3 style={{ color: '#fcd900' }}>Want Product Updates or Setup Help?</h3>
                <p style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                  Optional: tell us what you are organizing and we will send relevant updates or guidance.
                </p>
                <a href="/waitlist" className="cta-button" style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  padding: '0.75rem 2rem'
                }}>
                  Share Your Use Case
                </a>
              </div>
            </div>
          </section>

          <section className="products">
            <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
              <h2>What You Can Do After Downloading StashDog</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '760px' }}>
                StashDog is built for a practical first session: capture a few high-value items, give them locations,
                and make the record useful before you attempt a whole-house inventory.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                {[
                  ['Photograph the item', 'Use the camera first so each record has visual proof and fast recognition.'],
                  ['Add where it lives', 'Attach the room, bin, shelf, storage unit, vehicle, or property where it can be found.'],
                  ['Tag the reason', 'Mark insurance, moving, reseller, tool, document, seasonal, or collection context.'],
                  ['Share what matters', 'Give family, roommates, or helpers access to the items they actually need.'],
                ].map(([title, body]) => (
                  <div key={title} className="glass-panel" style={{ padding: '1.25rem' }}>
                    <h3>{title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="products" style={{ paddingTop: 0 }}>
            <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
              <h2>Common Starting Points</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {[
                  ['/how-to-create-a-home-inventory', 'Create a Home Inventory', 'A room-by-room setup guide for insurance, moving, and everyday retrieval.'],
                  ['/searchable-moving-boxes', 'Searchable Moving Boxes', 'Document boxes before, during, and after a move.'],
                  ['/for/home-insurance/', 'Insurance Inventory', 'Capture proof before you need a claim-ready record.'],
                  ['/features', 'Explore Features', 'Compare photos, locations, sharing, AI assistance, and cloud sync.'],
                ].map(([to, title, body]) => (
                  <Link key={to} to={to} className="glass-panel" style={{ display: 'block', padding: '1.25rem', textDecoration: 'none' }}>
                    <h3>{title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="products" style={{ paddingTop: 0 }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2>Download FAQ</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {faq.map((item) => (
                  <details key={item.question} className="glass-panel" style={{ padding: '1.25rem' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{item.question}</summary>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
  )
}
export default DownloadPage

import React from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AppStoreButton from "../../components/AppStoreButton"
import GooglePlayButton from "../../components/GooglePlayButton"
import { icpPageList } from "../../data/icpLandingPages"
import "../../styles/global.css"
import "../../styles/icp-landing.css"

const ForIndexPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "StashDog Use Cases",
    description:
      "Dedicated StashDog inventory use cases for resellers, contractors, landlords, event businesses, collectors, workshops, nonprofits, storage units, and insurance documentation.",
    url: "https://stashdog.io/for/",
    hasPart: icpPageList.map((page) => ({
      "@type": "WebPage",
      name: page.title,
      url: `https://stashdog.io${page.pagePath}`,
    })),
  }

  return (
    <div className="page-container">
      <Helmet>
        <html lang="en" />
        <title>Inventory App Use Cases for Businesses and People Who Own Valuable Stuff | StashDog</title>
        <meta
          name="description"
          content="Explore StashDog inventory app use cases for resellers, contractors, landlords, event businesses, collectors, workshops, nonprofits, storage units, and home insurance."
        />
        <link rel="canonical" href="https://stashdog.io/for/" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="StashDog Use Cases" />
        <meta
          property="og:description"
          content="Inventory app use cases for people and businesses who need to know what they own, where it is, and what it is worth."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stashdog.io/for/" />
        <meta property="og:image" content="https://stashdog.io/lab1.png" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      <main className="icp-page">
        <section className="icp-hero">
          <div className="container">
            <p className="icp-eyebrow">StashDog use cases</p>
            <h1 style={{ maxWidth: "1050px" }}>A searchable inventory for the valuable stuff you already own.</h1>
            <p className="icp-subheadline">
              StashDog helps people and businesses stop rebuying, losing, forgetting, and underusing the stuff that costs money. Pick the use case closest to your chaos.
            </p>
            <div className="icp-cta-row">
              <AppStoreButton />
              <GooglePlayButton />
            </div>
          </div>
        </section>

        <section className="icp-section">
          <div className="container">
            <div className="icp-related-grid">
              {icpPageList.map((page) => (
                <Link key={page.pagePath} to={page.pagePath} className="icp-related-card glass-panel">
                  <span>{page.eyebrow}</span>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>{page.hero}</h2>
                  <p>{page.metaDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="icp-final-cta">
          <div className="container">
            <div className="icp-final-panel glass-panel">
              <h2>Not sure which workflow fits?</h2>
              <p>
                Download StashDog to start labeling boxes, bins, tools, supplies, and valuables — or bark at us at mail@stashdog.io and tell us what you are trying to track.
              </p>
              <div className="icp-hero-links">
                <Link to="/download/" className="cta-button">Download StashDog</Link>
                <a href="mailto:mail@stashdog.io" className="cta-button outline">Bark at mail@stashdog.io</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ForIndexPage

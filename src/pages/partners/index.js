import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { ArrowRight, Handshake, PackageSearch } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import CommercialLeadForm from "../../components/CommercialLeadForm"
import { useFirebase } from "../../hooks/useFirebase"
import { partnerPages } from "../../data/partnerLandingPages"
import "../../styles/global.css"

const PartnersIndexPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (!isInitialized) return

    logEvent("page_view", {
      page_title: "Partner with StashDog",
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_path: "/partners/",
      page: "partners_index",
      experiment: "partner_directory",
    })
  }, [isInitialized, logEvent])

  const handlePartnerClick = (partner) => {
    logEvent("partner_directory_click", {
      partner_type: partner.partnerType,
      destination: partner.path,
      page: "partners_index",
      experiment: "partner_directory",
    })
  }

  const handlePilotClick = (location) => {
    logEvent("partner_pilot_cta_click", {
      cta_location: location,
      source_path: "/partners/",
      partner_type: "Partner directory",
      lead_type: "partner_pilot",
    })
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Partner with StashDog",
      description: "Partner programs for contractors, restoration companies, movers, storage, organizing, real estate, and insurance businesses.",
      url: "https://stashdog.io/partners/",
      hasPart: partnerPages.map((partner) => ({
        "@type": "WebPage",
        name: partner.title,
        url: `https://stashdog.io${partner.path}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "StashDog",
      url: "https://stashdog.io/",
      logo: "https://stashdog.io/round-logo-goggles.png",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Partnerships",
        email: "partners@stashdog.io",
        url: "https://stashdog.io/partners/",
      },
    },
  ]

  return (
    <div className="page-container partner-page">
      <Helmet>
        <html lang="en" />
        <title>Partner with StashDog | Moving, Storage, Organization, and Home Inventory</title>
        <meta
          name="description"
          content="Partner with StashDog to offer smart QR inventory workflows for contractors, restoration companies, movers, storage facilities, organizers, realtors, and insurance agents."
        />
        <link rel="canonical" href="https://stashdog.io/partners/" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Partner with StashDog" />
        <meta
          property="og:description"
          content="Offer QR-labeled, searchable inventory kits to customers who are moving, storing, organizing, or documenting what they own."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stashdog.io/partners/" />
        <meta property="og:image" content="https://stashdog.io/images/social/stashdog-og-v2.png" />
        <meta name="twitter:card" content="summary_large_image" />
        {schema.map((entry, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(entry)}
          </script>
        ))}
      </Helmet>

      <Header />

      <main>
        <section className="partner-hero partner-index-hero">
          <div className="container partner-index-shell">
            <div className="partner-badge">
              <Handshake size={16} />
              StashDog partnerships
            </div>
            <h1>Partner with StashDog when customers need to find what they own.</h1>
            <p className="partner-subtitle">
              Contractors, restoration teams, movers, storage facilities, organizers, realtors, and insurance agents can offer QR-labeled inventory workflows that make boxes, bins, and belongings searchable.
            </p>
            <div className="partner-cta-row center">
              <a className="cta-button" href="#partner-options">
                Browse partner pages <ArrowRight size={18} />
              </a>
              <a className="cta-button outline" href="#commercial-lead" onClick={() => handlePilotClick("hero")}>
                Start a pilot
              </a>
            </div>
          </div>
        </section>

        <section className="partner-section partner-lead-section" id="commercial-lead">
          <div className="container partner-lead-grid">
            <div>
              <span className="partner-section-kicker">Partner inquiry</span>
              <h2>Tell us which customer workflow you want to test.</h2>
              <p>
                Use this for co-branded kits, referral pilots, customer handoff workflows, or commercial inventory programs.
              </p>
            </div>
            <CommercialLeadForm
              leadType="partner_pilot"
              sourcePage="partners_index"
              sourcePath="/partners/"
              partnerType="Partner directory"
              formLocation="partners_index_hero"
              title="Start a partner pilot"
              description="Share your business type and the customer workflow you want to improve."
              submitLabel="Send partner inquiry"
            />
          </div>
        </section>

        <section className="partner-section" id="partner-options">
          <div className="container">
            <div className="partner-section-heading">
              <span className="partner-section-kicker">Partner paths</span>
              <h2>Choose the collaboration that matches your business.</h2>
              <p>Each page includes a tailored pitch, customer workflow, pilot kit, FAQs, and a clear first test.</p>
            </div>
            <div className="partner-directory-grid">
              {partnerPages.map((partner) => (
                <Link
                  key={partner.slug}
                  to={partner.path}
                  className="glass-panel partner-directory-card"
                  onClick={() => handlePartnerClick(partner)}
                >
                  <div className="partner-directory-icon"><PackageSearch size={24} /></div>
                  <span>{partner.partnerType}</span>
                  <h3>{partner.title}</h3>
                  <p>{partner.subtitle}</p>
                  <strong>View partner page <ArrowRight size={16} /></strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-final-cta">
          <div className="container partner-final-grid">
            <div className="partner-final-card glass-panel">
              <h2>Not sure which partner path fits?</h2>
              <p>Start with a small pilot for customers who are already moving, storing, organizing, documenting, or temporarily relocating belongings.</p>
              <div className="partner-cta-row center">
                <a className="cta-button" href="#commercial-lead" onClick={() => handlePilotClick("final")}>Ask about a pilot</a>
                <Link className="cta-button outline" to="/searchable-moving-boxes/">View customer-facing example</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PartnersIndexPage

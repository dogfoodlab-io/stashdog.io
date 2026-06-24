
import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"
import CommercialLeadForm from "./CommercialLeadForm"
import AppStoreButton from "./AppStoreButton"
import GooglePlayButton from "./GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import { icpPages } from "../data/icpLandingPages"
import "../styles/global.css"
import "../styles/icp-landing.css"

const siteUrl = "https://stashdog.io"
const mailto = "mailto:mail@stashdog.io"
const commercialLeadSlugs = new Set([
  "resellers",
  "contractors",
  "landlords",
  "event-businesses",
  "community-organizations",
  "workshops",
  "storage-units",
])

const IcpLandingPage = ({ page }) => {
  const { isInitialized, logEvent } = useFirebase()
  const canonicalUrl = `${siteUrl}${page.pagePath}`
  const isCommercialLeadPage = commercialLeadSlugs.has(page.slug)
  const relatedPages = (page.related || [])
    .map((slug) => icpPages[slug])
    .filter(Boolean)

  useEffect(() => {
    if (!isInitialized) return

    logEvent("page_view", {
      page_title: page.title,
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_path: page.pagePath,
    })
  }, [isInitialized, logEvent, page.pagePath, page.title])

  const handleDownloadClick = (platform) => {
    if (!isInitialized) return

    logEvent("download_click", {
      platform,
      page: page.pagePath,
      source: "icp_landing_page",
      audience: page.slug,
    })
  }

  const handleCommercialCtaClick = (ctaLocation) => {
    if (!isInitialized) return

    logEvent("partner_pilot_cta_click", {
      cta_location: ctaLocation,
      lead_type: "business_use_case",
      source_path: page.pagePath,
      partner_type: page.audience,
    })
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.metaDescription,
      url: canonicalUrl,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: "StashDog",
        url: siteUrl,
      },
      about: page.primaryKeyword,
      audience: {
        "@type": "Audience",
        audienceType: page.audience,
      },
      publisher: {
        "@type": "Organization",
        name: "StashDog",
        url: siteUrl,
        email: "mail@stashdog.io",
        logo: `${siteUrl}/round-logo-goggles.png`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "StashDog",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "iOS, Android",
      url: `${siteUrl}/download/`,
      description: "A searchable inventory app for valuable stuff, storage locations, boxes, bins, tools, supplies, and collections.",
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/pricing/`,
      },
    },
  ]

  if (page.faq?.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    })
  }

  if (page.workflow?.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to set up StashDog for ${page.audience}`,
      description: page.directAnswer,
      step: page.workflow.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `Step ${index + 1}`,
        text: step,
      })),
    })
  }

  if (isCommercialLeadPage) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "StashDog",
      url: siteUrl,
      logo: `${siteUrl}/round-logo-goggles.png`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Commercial inquiries",
        email: "partners@stashdog.io",
        url: canonicalUrl,
      },
    })
  }

  return (
    <div className="page-container">
      <Helmet>
        <html lang="en" />
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />

        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${siteUrl}/images/social/stashdog-og-v2.png`} />
        <meta property="og:site_name" content="StashDog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${siteUrl}/images/social/stashdog-og-v2.png`} />

        {schema.map((entry, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(entry)}
          </script>
        ))}
      </Helmet>

      <Header />

      <main className="icp-page">
        <section className="icp-hero">
          <div className="container icp-hero-grid">
            <div>
              <p className="icp-eyebrow">{page.eyebrow}</p>
              <h1>{page.hero}</h1>
              <p className="icp-subheadline">{page.subheadline}</p>
              <div className="icp-cta-row">
                <AppStoreButton
                  originPath={page.pagePath}
                  utmContent={`${page.slug}_hero_app_store_badge`}
                  onClick={handleDownloadClick}
                />
                <GooglePlayButton onClick={handleDownloadClick} />
              </div>
              <div className="icp-hero-links">
                <Link to="/download/" className="cta-button">Download StashDog</Link>
                {isCommercialLeadPage ? (
                  <a href="#commercial-lead" className="cta-button outline" onClick={() => handleCommercialCtaClick("hero")}>Talk to us</a>
                ) : (
                  <a href={mailto} className="cta-button outline">Contact us</a>
                )}
              </div>
            </div>

            <aside className="icp-answer-card glass-panel">
              <span>Direct answer</span>
              <p>{page.directAnswer}</p>
              <ul>
                <li>Primary keyword: {page.primaryKeyword}</li>
                <li>Best for: {page.audience}</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="icp-section">
          <div className="container icp-two-column">
            <div>
              <h2>{page.problemTitle}</h2>
              <p>
                StashDog is not a traditional warehouse system. It is a practical inventory app for people and businesses whose valuables, supplies, tools, boxes, bins, and gear are spread across real-world places.
              </p>
            </div>
            <div className="icp-card-list">
              {page.problems.map((problem) => (
                <div key={problem} className="icp-mini-card glass-panel">
                  {problem}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="icp-section icp-section-alt">
          <div className="container">
            <div className="icp-section-heading">
              <p className="icp-eyebrow">Why StashDog</p>
              <h2>{page.outcomesTitle}</h2>
            </div>
            <div className="icp-benefit-grid">
              {page.outcomes.map((outcome) => (
                <article key={outcome} className="icp-benefit-card glass-panel">
                  <h3>{outcome.split(" ").slice(0, 5).join(" ")}</h3>
                  <p>{outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {isCommercialLeadPage && (
          <section className="icp-section icp-commercial-lead-section" id="commercial-lead">
            <div className="container icp-two-column">
              <div>
                <p className="icp-eyebrow">Commercial inquiry</p>
                <h2>Need this for a team, property, storage workflow, or customer program?</h2>
                <p>
                  Tell us what you are trying to track and how many people or locations are involved. We will follow up with a practical setup path.
                </p>
              </div>
              <CommercialLeadForm
                leadType="business_use_case"
                sourcePage={page.slug}
                sourcePath={page.pagePath}
                partnerType={page.audience}
                formLocation="commercial_use_case_page"
                title={`Commercial setup for ${page.primaryKeyword}`}
                description="Use this for team workflows, multi-location inventory, partner kits, or business inventory pilots."
                submitLabel="Send commercial inquiry"
              />
            </div>
          </section>
        )}

        <section className="icp-section">
          <div className="container icp-two-column">
            <div>
              <p className="icp-eyebrow">Setup workflow</p>
              <h2>How to use StashDog for {page.audience}</h2>
              <p>
                Start with the most expensive, most chaotic, or most frequently rebought category. You do not need a perfect inventory on day one — just make the next search easier.
              </p>
            </div>
            <ol className="icp-steps glass-panel">
              {page.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="icp-section icp-section-alt">
          <div className="container">
            <div className="icp-section-heading">
              <p className="icp-eyebrow">Common use cases</p>
              <h2>Search terms and jobs this page is built to answer</h2>
            </div>
            <div className="icp-chip-grid">
              {page.useCases.map((useCase) => (
                <span key={useCase} className="icp-chip">{useCase}</span>
              ))}
            </div>
          </div>
        </section>

        {page.faq?.length > 0 && (
          <section className="icp-section">
            <div className="container">
              <div className="icp-section-heading">
                <p className="icp-eyebrow">FAQ</p>
                <h2>Questions about using StashDog as a {page.primaryKeyword}</h2>
              </div>
              <div className="icp-faq-list">
                {page.faq.map((item) => (
                  <details key={item.question} className="icp-faq-item glass-panel">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="icp-section icp-section-alt">
          <div className="container">
            <div className="icp-section-heading">
              <p className="icp-eyebrow">Related StashDog use cases</p>
              <h2>More ways to make your stuff searchable</h2>
            </div>
            <div className="icp-related-grid">
              {relatedPages.map((related) => (
                <Link key={related.pagePath} to={related.pagePath} className="icp-related-card glass-panel">
                  <span>{related.eyebrow}</span>
                  <h3>{related.hero}</h3>
                  <p>{related.metaDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="icp-final-cta">
          <div className="container">
            <div className="icp-final-panel glass-panel">
              <h2>{page.ctaHeadline}</h2>
              <p>{page.ctaCopy}</p>
              <div className="icp-cta-row">
                <AppStoreButton
                  originPath={page.pagePath}
                  utmContent={`${page.slug}_final_app_store_badge`}
                  onClick={handleDownloadClick}
                />
                <GooglePlayButton onClick={handleDownloadClick} />
              </div>
              <div className="icp-hero-links">
                <Link to="/download/" className="cta-button">Download StashDog</Link>
                {isCommercialLeadPage ? (
                  <a href="#commercial-lead" className="cta-button outline" onClick={() => handleCommercialCtaClick("final")}>Talk to us</a>
                ) : (
                  <a href={mailto} className="cta-button outline">Contact us at mail@stashdog.io</a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default IcpLandingPage

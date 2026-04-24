import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"
import AppStoreButton from "./AppStoreButton"
import GooglePlayButton from "./GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"
import "../styles/ai-seo.css"

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const AiSeoPageLayout = ({
  title,
  metaTitle,
  metaDescription,
  canonicalPath,
  pagePath,
  heroLabel,
  heroImageSrc,
  heroImageAlt,
  intro,
  directAnswer,
  author,
  updatedAt,
  evidence = [],
  faq = [],
  relatedLinks = [],
  itemList = [],
  howToSteps = [],
  children,
}) => {
  const { isInitialized, logEvent } = useFirebase()
  const heroImageUrl = heroImageSrc ? `https://stashdog.io${heroImageSrc}` : "https://stashdog.io/lab1.png"

  useEffect(() => {
    if (!isInitialized) {
      return
    }

    logEvent("page_view", {
      page_title: title,
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_path: pagePath,
    })
  }, [isInitialized, logEvent, pagePath, title])

  const canonicalUrl = `https://stashdog.io${canonicalPath}`

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: metaDescription,
      image: heroImageUrl,
      dateModified: updatedAt,
      datePublished: updatedAt,
      author: {
        "@type": "Person",
        name: author.name,
      },
      publisher: {
        "@type": "Organization",
        name: "StashDog",
        logo: {
          "@type": "ImageObject",
          url: "https://stashdog.io/round-logo-goggles.png",
        },
      },
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
    },
  ]

  if (faq.length > 0) {
    schema.push({
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
    })
  }

  if (itemList.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: itemList.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item,
      })),
    })
  }

  if (howToSteps.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: title,
      description: metaDescription,
      step: howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
      totalTime: "PT2H",
    })
  }

  const handleDownloadClick = (platform) => {
    logEvent("download_click", {
      platform,
      page: pagePath,
      source: "ai_seo_page",
    })
  }

  return (
    <div className="page-container">
      <Helmet>
        <html lang="en" />
        <title>{metaTitle || title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />

        <meta property="og:title" content={metaTitle || title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={heroImageUrl} />
        <meta property="og:site_name" content="StashDog" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle || title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={heroImageUrl} />

        {schema.map((entry, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(entry)}
          </script>
        ))}
      </Helmet>

      <Header />

      <main className="ai-seo-page">
        <section className="ai-seo-hero">
          <div className="container ai-seo-shell">
            {heroLabel && <div className="ai-seo-hero-badge">{heroLabel}</div>}
            <h1>{title}</h1>
            <p className="ai-seo-intro">{intro}</p>

            {heroImageSrc && (
              <div className="ai-seo-hero-image-wrap glass-panel">
                <img className="ai-seo-hero-image" src={heroImageSrc} alt={heroImageAlt || title} />
              </div>
            )}

            <div className="ai-seo-answer-box glass-panel">
              <span className="ai-seo-answer-label">Direct Answer</span>
              <p>{directAnswer}</p>
            </div>

            <div className="ai-seo-meta-row">
              <span>By {author.name}</span>
              <span>{author.role}</span>
              <span>Last updated {formatDate(updatedAt)}</span>
            </div>
          </div>
        </section>

        {evidence.length > 0 && (
          <section className="ai-seo-evidence-section">
            <div className="container ai-seo-shell">
              <div className="ai-seo-section-heading">
                <h2>Source Highlights</h2>
                <p>
                  These pages are written to be extractable by AI systems, but the claims still need
                  source-backed context.
                </p>
              </div>

              <div className="ai-seo-evidence-grid">
                {evidence.map((item) => (
                  <article key={item.title} className="ai-seo-evidence-card glass-panel">
                    <div className="ai-seo-evidence-value">{item.value}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Source: {item.sourceLabel}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="ai-seo-content-section">
          <div className="container ai-seo-shell">
            <article className="ai-seo-content">{children}</article>
          </div>
        </section>

        {faq.length > 0 && (
          <section className="ai-seo-faq-section">
            <div className="container ai-seo-shell">
              <div className="ai-seo-section-heading">
                <h2>FAQ</h2>
                <p>Clear answers to the questions people ask right before they compare tools or start a project.</p>
              </div>

              <div className="ai-seo-faq-list">
                {faq.map((item) => (
                  <details key={item.question} className="ai-seo-faq-item glass-panel">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="ai-seo-related-section">
          <div className="container ai-seo-shell">
            <div className="ai-seo-section-heading">
              <h2>Next Steps</h2>
              <p>Strong internal links make these pages more useful for readers and more legible for AI systems.</p>
            </div>

            <div className="ai-seo-related-grid">
              {relatedLinks.map((item) => (
                <Link key={item.to} to={item.to} className="ai-seo-related-card glass-panel">
                  <span>{item.label}</span>
                  <p>{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ai-seo-cta-section">
          <div className="container ai-seo-shell">
            <div className="ai-seo-cta-panel glass-panel">
              <h2>Build Your Inventory While the Need Is Fresh</h2>
              <p>
                StashDog is strongest when you want a household-first system that helps you remember what you own,
                where it lives, and who else needs access.
              </p>

              <div className="ai-seo-cta-buttons">
                <AppStoreButton onClick={handleDownloadClick} />
                <GooglePlayButton onClick={handleDownloadClick} />
              </div>

              <div className="ai-seo-secondary-links">
                <Link to="/pricing" className="cta-button outline">
                  See Pricing
                </Link>
                <Link to="/features" className="cta-button outline">
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AiSeoPageLayout
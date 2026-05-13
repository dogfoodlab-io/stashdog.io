import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { ArrowRight, CheckCircle2, Handshake, PackageCheck, QrCode, Search, Sparkles } from "lucide-react"
import Header from "./Header"
import Footer from "./Footer"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const PartnerLandingPage = ({ page }) => {
  const { isInitialized, logEvent } = useFirebase()
  const canonicalUrl = `https://stashdog.io${page.path}`

  useEffect(() => {
    if (!isInitialized) return

    logEvent("page_view", {
      page_title: page.metaTitle,
      page_location: typeof window !== "undefined" ? window.location.href : "",
      page_path: page.path,
      page: page.slug,
      experiment: page.experiment,
      partner_type: page.partnerType,
    })
  }, [isInitialized, logEvent, page])

  const handleCtaClick = (ctaLocation, ctaText = page.primaryCta) => {
    logEvent("partner_cta_click", {
      cta_text: ctaText,
      cta_location: ctaLocation,
      page: page.slug,
      experiment: page.experiment,
      partner_type: page.partnerType,
    })
  }

  const faqSchema = {
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
  }

  return (
    <div className="page-container partner-page">
      <Helmet>
        <html lang="en" />
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://stashdog.io/lab1.png" />
        <meta property="og:site_name" content="StashDog" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        <section className="partner-hero">
          <div className="container partner-hero-grid">
            <div className="partner-hero-copy">
              <div className="partner-badge">
                <Handshake size={16} />
                {page.eyebrow}
              </div>
              <h1>{page.title}</h1>
              <p className="partner-subtitle">{page.subtitle}</p>
              <div className="partner-cta-row">
                <a className="cta-button" href="#partner-kit" onClick={() => handleCtaClick("hero")}> 
                  {page.primaryCta} <ArrowRight size={18} />
                </a>
                <a className="cta-button outline" href="#workflow" onClick={() => handleCtaClick("hero_secondary", page.secondaryCta)}>
                  {page.secondaryCta}
                </a>
              </div>
              <div className="partner-trust-row" aria-label="Partnership benefits">
                <span><CheckCircle2 size={16} /> Free pilot available</span>
                <span><CheckCircle2 size={16} /> Co-branded page</span>
                <span><CheckCircle2 size={16} /> Referral-friendly</span>
              </div>
            </div>

            <div className="partner-demo-card glass-panel" aria-label="Example StashDog search result">
              <div className="partner-demo-topline">
                <Sparkles size={18} />
                {page.heroCard.label}
              </div>
              <div className="partner-search-bar">
                <Search size={18} />
                <span>search: “{page.heroCard.query}”</span>
              </div>
              <div className="partner-result-card">
                <div className="partner-result-icon"><PackageCheck size={28} /></div>
                <div>
                  <strong>{page.heroCard.result}</strong>
                  <p>{page.heroCard.detail}</p>
                </div>
              </div>
              <div className="partner-qr-strip">
                <QrCode size={20} />
                QR labels connect physical stuff to searchable records.
              </div>
            </div>
          </div>
        </section>

        <section className="partner-problem-section">
          <div className="container partner-two-column">
            <div>
              <span className="partner-section-kicker">The partner opportunity</span>
              <h2>Your customers already feel this pain.</h2>
            </div>
            <div className="glass-panel partner-copy-card">
              <p>{page.pain}</p>
              <p>{page.offer}</p>
            </div>
          </div>
        </section>

        <section className="partner-section" id="workflow">
          <div className="container">
            <div className="partner-section-heading">
              <span className="partner-section-kicker">Simple workflow</span>
              <h2>How the collaboration works</h2>
              <p>Start lightweight: test the offer with a handful of customers, then turn the best-performing version into a formal partner package.</p>
            </div>
            <div className="partner-steps-grid">
              {page.workflow.map((step, index) => (
                <article className="glass-panel partner-step-card" key={step}>
                  <span>Step {index + 1}</span>
                  <h3>{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-section partner-benefits-section">
          <div className="container partner-benefits-grid">
            {page.benefits.map((benefit) => (
              <article className="glass-panel partner-benefit-card" key={benefit}>
                <CheckCircle2 size={22} />
                <p>{benefit}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="partner-section" id="partner-kit">
          <div className="container partner-kit-grid">
            <div>
              <span className="partner-section-kicker">Partner kit</span>
              <h2>Everything needed for a small pilot.</h2>
              <p>Use this as a practical co-marketing asset, customer perk, or paid add-on — without forcing your team into a heavy software rollout.</p>
              <blockquote>{page.testimonial}</blockquote>
            </div>
            <div className="glass-panel partner-kit-card">
              <h3>Kit includes</h3>
              <ul>
                {page.kitIncludes.map((item) => (
                  <li key={item}><CheckCircle2 size={18} /> {item}</li>
                ))}
              </ul>
              <a className="cta-button" href="mailto:partners@stashdog.io?subject=StashDog%20partner%20pilot" onClick={() => handleCtaClick("partner_kit_email", "Email about partner pilot")}> 
                Ask about a pilot <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="partner-section">
          <div className="container">
            <div className="partner-section-heading compact">
              <span className="partner-section-kicker">Good fit for</span>
              <h2>Best first use cases</h2>
            </div>
            <div className="partner-usecase-row">
              {page.useCases.map((useCase) => (
                <span key={useCase}>{useCase}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-section">
          <div className="container partner-faq-shell">
            <div className="partner-section-heading compact">
              <span className="partner-section-kicker">FAQ</span>
              <h2>Common partner questions</h2>
            </div>
            <div className="partner-faq-list">
              {page.faq.map((item) => (
                <details className="glass-panel partner-faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-final-cta">
          <div className="container partner-final-card glass-panel">
            <h2>Want to test this with 3-5 customers?</h2>
            <p>Start with one co-branded landing page, one customer handoff guide, and one referral-friendly pilot offer.</p>
            <div className="partner-cta-row center">
              <a className="cta-button" href="mailto:partners@stashdog.io?subject=StashDog%20partner%20pilot" onClick={() => handleCtaClick("final_email", "Start a partner pilot")}>Start a partner pilot</a>
              <Link className="cta-button outline" to="/searchable-moving-boxes" onClick={() => handleCtaClick("final_example", "View customer landing page")}>View customer page</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PartnerLandingPage

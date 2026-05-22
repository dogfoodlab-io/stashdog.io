import React, { useEffect, useMemo, useState } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { Check, Sparkles } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import { getSubscriptionPlans } from "../utils/api"
import "../styles/global.css"

const FALLBACK_PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'For getting started with personal inventory',
    price: 0,
    currency: 'usd',
    interval: 'MONTH',
    features: ['Up to 100 items', '1 photo per item', '10 AI actions per month'],
    active: true,
    sort_order: 1,
    stripe_price_id: 'price_free_tier'
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'For power users and collectors',
    price: 499,
    currency: 'usd',
    interval: 'MONTH',
    features: ['Up to 1,000 items', 'Natural language search', 'CSV export'],
    active: true,
    sort_order: 2,
    stripe_price_id: 'price_stashdog_plus_monthly'
  }
]

const money = (cents, currency = 'usd') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: String(currency || 'usd').toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  }).format((Number(cents) || 0) / 100)

const formatInterval = (interval, intervalCount = 1) => {
  const normalized = String(interval || 'MONTH').toLowerCase()
  const unit = normalized === 'year' ? 'year' : 'month'
  return intervalCount > 1 ? `${intervalCount} ${unit}s` : unit
}

const pricingFaq = [
  {
    question: "Does StashDog have a free plan?",
    answer:
      "Yes. StashDog offers a free plan for getting started with personal inventory before upgrading to a paid plan.",
  },
  {
    question: "When should I upgrade from Free to Plus?",
    answer:
      "Upgrade when your inventory grows beyond a starter setup, when natural language search becomes important, or when export and higher item limits save more time than the monthly plan costs.",
  },
  {
    question: "Is StashDog priced for households or businesses?",
    answer:
      "StashDog is household-first, but it also supports practical small-business workflows like resellers, contractors, event gear, landlords, and workshops.",
  },
]

const pricingSchema = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "StashDog",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android, Web",
    url: "https://stashdog.io/pricing/",
    description:
      "StashDog is a home inventory app with free and paid plans for tracking items, photos, locations, documents, and shared inventory context.",
    offers: FALLBACK_PLANS.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: String((plan.price || 0) / 100),
      priceCurrency: String(plan.currency || "usd").toUpperCase(),
      availability: "https://schema.org/InStock",
      url: "https://stashdog.io/pricing/",
      description: plan.description,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaq.map((item) => ({
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
        name: "Pricing",
        item: "https://stashdog.io/pricing/",
      },
    ],
  },
]

const getCheckoutUrl = (plan) => {
  if ((plan.price || 0) <= 0) return '/download'

  const redirect = encodeURIComponent(`/upgrade?price_id=${plan.stripe_price_id}`)
  return `https://app.stashdog.io/sign-up?redirect=${redirect}`
}

const PricingPage = () => {
  const { isInitialized, logEvent } = useFirebase()
  const [plans, setPlans] = useState(FALLBACK_PLANS)
  const [isLoadingPlans, setIsLoadingPlans] = useState(true)

  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Pricing',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/pricing'
      })
    }
  }, [isInitialized, logEvent])

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const rows = await getSubscriptionPlans()
        if (Array.isArray(rows) && rows.length > 0) {
          setPlans(rows)
        }
      } catch (error) {
        console.error('Failed to load subscription plans:', error)
      } finally {
        setIsLoadingPlans(false)
      }
    }

    loadPlans()
  }, [])

  const normalizedPlans = useMemo(
    () => plans
      .filter(plan => plan?.active !== false)
      .sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999) || (a.price ?? 0) - (b.price ?? 0)),
    [plans]
  )

  const handleDownloadClick = (platform) => {
    if (isInitialized) {
      logEvent('download_click', { platform, page: 'pricing' })
    }
  }

  const handlePlanClick = (plan, checkoutUrl) => {
    if (isInitialized) {
      logEvent('pricing_plan_click', {
        page: 'pricing',
        plan_id: plan.id,
        plan_name: plan.name,
        stripe_price_id: plan.stripe_price_id || '',
        checkout_url: checkoutUrl
      })
    }
  }

  return (
    <div className="page-container">
      <Helmet>
        <html lang="en" />
        <title>StashDog Pricing | Free and Plus Home Inventory Plans</title>
        <meta name="description" content="Compare StashDog pricing for free and paid home inventory plans. See item limits, AI actions, search, export, and when each plan makes sense." />
        <link rel="canonical" href="https://stashdog.io/pricing/" />
        <link rel="alternate" type="text/markdown" href="https://stashdog.io/pricing.md" title="StashDog machine-readable pricing" />
        <link rel="alternate" type="text/plain" href="https://stashdog.io/llms.txt" title="StashDog AI context" />
        {pricingSchema.map((entry, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(entry)}
          </script>
        ))}
      </Helmet>

      <Header />

      <section className="stashdog-hero">
        <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          <h1 className="hero-title">Simple Pricing, Powerful Features</h1>
          <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            Start with a free home inventory, then upgrade when your item count, search needs, or export workflow outgrows the starter plan.
          </p>
          <div style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden' }}>
            <img src="/images/hero-pricing.png" alt="Pricing comparison illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {normalizedPlans.map((plan) => {
              const checkoutUrl = getCheckoutUrl(plan)
              const isFeatured = (plan.tier || '').toUpperCase() === 'PERSONAL'

              return (
                <div key={plan.id} className={`pricing-card ${isFeatured ? 'pricing-card-featured' : ''}`}>
                  {isFeatured && (
                    <div className="pricing-card-badge">
                      <Sparkles size={16} />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="pricing-card-header">
                    <h3 className="pricing-card-title">{plan.name}</h3>
                    <div className="pricing-card-price">
                      <span className="price-amount">{money(plan.price, plan.currency)}</span>
                      <span className="price-period">/{formatInterval(plan.interval, plan.interval_count || 1)}</span>
                    </div>
                    {plan.description && <p className="pricing-card-description">{plan.description}</p>}
                  </div>

                  <div className="pricing-card-features">
                    {(Array.isArray(plan.features) ? plan.features : []).map((feature, idx) => (
                      <div key={`${plan.id}-feature-${idx}`} className="pricing-feature">
                        <Check className="feature-check" size={20} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={checkoutUrl}
                    target={checkoutUrl.startsWith('http') ? '_blank' : undefined}
                    rel={checkoutUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`pricing-cta cta-button ${isFeatured ? '' : 'outline'}`}
                    style={{ width: '100%', marginTop: '2rem' }}
                    onClick={() => handlePlanClick(plan, checkoutUrl)}
                  >
                    {(plan.price || 0) <= 0 ? 'Get Started Free' : `Choose ${plan.name}`}
                  </a>
                </div>
              )
            })}
          </div>

          {isLoadingPlans && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
              Loading pricing plans...
            </p>
          )}
        </div>
      </section>

      <section className="products" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <h2>Which StashDog Plan Fits?</h2>
          <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>Need</th>
                  <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>Free</th>
                  <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>Plus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Getting started', 'Good for a first room, closet, bin set, or starter insurance inventory.', 'Good when StashDog becomes the regular place you search before buying.'],
                  ['Item volume', 'Best for a focused inventory of high-value or easy-to-lose items.', 'Better for whole-home, collection, reseller, workshop, or storage-unit coverage.'],
                  ['Search and retrieval', 'Useful when names, photos, notes, and locations are enough.', 'Better when natural language search saves time across a larger inventory.'],
                  ['Exports', 'Good for daily lookup inside the app.', 'Better when CSV export matters for insurance, resale, tax, or operations workflows.'],
                ].map(([need, free, plus]) => (
                  <tr key={need}>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 700 }}>{need}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>{free}</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>{plus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="products" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '980px', margin: '0 auto' }}>
          <h2>Pricing by Workflow</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              ['/for/home-insurance/', 'Insurance inventory', 'Start free for critical items, then upgrade if you document the whole home.'],
              ['/for/resellers/', 'Reseller inventory', 'Plus is usually the better fit once listings, bins, and sourcing piles grow.'],
              ['/for/workshops/', 'Workshop inventory', 'Use Plus when parts, tools, and project leftovers need deeper search.'],
              ['/for/storage-units/', 'Storage unit inventory', 'Free can cover a small unit; Plus fits multi-bin or multi-unit storage.'],
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
          <h2>Pricing FAQ</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {pricingFaq.map((item) => (
              <details key={item.question} className="glass-panel" style={{ padding: '1.25rem' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{item.question}</summary>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Organized?</h2>
          <p>Download StashDog today and start with our free tier.</p>
          <div className="cta-buttons">
            <AppStoreButton onClick={handleDownloadClick} />
            <GooglePlayButton onClick={handleDownloadClick} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PricingPage

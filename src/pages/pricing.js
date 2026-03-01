import React, { useEffect, useMemo, useState } from "react"
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
        <title>Pricing - StashDog: Simple, Powerful Organization</title>
        <meta name="description" content="Choose the StashDog plan that fits your inventory needs." />
        <link rel="canonical" href="https://stashdog.io/pricing/" />
      </Helmet>

      <Header />

      <section className="stashdog-hero">
        <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          <h1 className="hero-title">Simple Pricing, Powerful Features</h1>
          <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            Pricing updates automatically from our live subscription catalog.
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

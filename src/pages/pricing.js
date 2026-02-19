import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import {
  Check, Sparkles, Image, Database, Zap, Mail, Download, Wifi
} from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const PricingPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Pricing',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/pricing'
      })
    }
  }, [isInitialized, logEvent])

  const handleDownloadClick = (platform) => {
    if (isInitialized) {
      logEvent('download_click', {
        platform: platform,
        page: 'pricing'
      })
    }
  }

  return (
    <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Pricing - StashDog: Simple, Powerful Organization</title>
          <meta name="description" content="Start free with up to 100 items. Upgrade to StashDog Plus for unlimited items, unlimited AI features, and advanced organization tools for $4.99/month or $49.99/year." />
          <meta name="keywords" content="home inventory pricing, organization app cost, free inventory app, StashDog pricing, inventory management subscription" />
          <link rel="canonical" href="https://stashdog.io/pricing/" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content="StashDog Pricing - Start Free" />
          <meta property="og:description" content="Start free with up to 100 items. Upgrade to StashDog Plus for unlimited items and AI-powered features for $4.99/month or $49.99/year." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/pricing" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StashDog Pricing - Start Free" />
          <meta name="twitter:description" content="Start free with up to 100 items. Upgrade to StashDog Plus for unlimited items and AI-powered features for $4.99/month or $49.99/year." />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
        </Helmet>

        <Header />

        {/* Hero Section */}
        <section className="stashdog-hero">
          <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
            <h1 className="hero-title">Simple Pricing, Powerful Features</h1>
            <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
              <strong>Early Access Pricing:</strong> Special introductory pricing for our first 10,000 users.
            </p>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <img
                src="/images/hero-pricing.png"
                alt="Pricing comparison illustration"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="products">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>

              {/* Free Tier */}
              <div className="pricing-card">
                <div className="pricing-card-header">
                  <h3 className="pricing-card-title">Free</h3>
                  <div className="pricing-card-price">
                    <span className="price-amount">$0</span>
                    <span className="price-period">/forever</span>
                  </div>
                  <p className="pricing-card-description">
                    Perfect for getting started and trying out StashDog
                  </p>
                </div>

                <div className="pricing-card-features">
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span>Up to <strong>100 items</strong></span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><strong>1GB storage</strong></span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><strong>10 AI completions</strong> per month</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span>Core inventory management</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span>Photo-based tracking</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span>QR code labels</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span>Collections & tags</span>
                  </div>
                </div>

                <a href="/waitlist" className="pricing-cta cta-button outline" style={{ width: '100%', marginTop: '2rem' }}>
                  Get Started Free
                </a>
              </div>

              {/* Plus Tier */}
              <div className="pricing-card pricing-card-featured">
                <div className="pricing-card-badge">
                  <Sparkles size={16} />
                  <span>Early Adopter Special</span>
                </div>

                <div className="pricing-card-header">
                  <h3 className="pricing-card-title">StashDog Plus</h3>
                  <div className="pricing-card-price">
                    <div>
                      <span className="price-amount">$4.99</span>
                      <span className="price-period">/month</span>
                    </div>
                    <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                      or $49.99/year <span style={{ color: '#fcd900' }}>(save 17%)</span>
                    </div>
                  </div>
                  <p className="pricing-card-description">
                    AI-powered inventory intelligence for power users
                  </p>
                </div>

                <div className="pricing-card-features">
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><strong>Unlimited items</strong></span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><strong>Unlimited photos</strong> (20GB soft limit)</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><strong>Unlimited AI features:</strong></span>
                  </div>
                  <div className="pricing-feature-sub">
                    <Sparkles className="feature-icon-small" size={16} />
                    <span>Smart categorization & auto-tagging</span>
                  </div>
                  <div className="pricing-feature-sub">
                    <Zap className="feature-icon-small" size={16} />
                    <span>Advanced AI search & insights</span>
                  </div>
                  <div className="pricing-feature-sub">
                    <Image className="feature-icon-small" size={16} />
                    <span>Duplicate detection & organization</span>
                  </div>
                  <div className="pricing-feature-sub">
                    <Database className="feature-icon-small" size={16} />
                    <span>Predictive analytics</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><Mail size={16} style={{ display: 'inline', marginRight: '0.25rem' }} /> Priority email support</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><Download size={16} style={{ display: 'inline', marginRight: '0.25rem' }} /> Data export capabilities</span>
                  </div>
                  <div className="pricing-feature">
                    <Check className="feature-check" size={20} />
                    <span><Wifi size={16} style={{ display: 'inline', marginRight: '0.25rem' }} /> Offline sync priority</span>
                  </div>
                </div>

                <a href="https://app.stashdog.io/sign-up?redirect=%2Fupgrade" className="pricing-cta cta-button" style={{ width: '100%', marginTop: '2rem' }}>
                  Upgrade to Plus
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="products">
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked Questions</h2>

            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Can I try Plus features before upgrading?</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Yes! The free tier includes 10 AI completions per month so you can experience the power of AI-assisted organization before committing to Plus.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>What happens if I exceed the free tier limits?</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                You can continue using StashDog with your existing items, but you'll need to upgrade to Plus to add more items or use additional AI features. Your data is always safe and accessible.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Can I cancel anytime?</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Absolutely! You can cancel your Plus subscription at any time. If you downgrade, you'll keep all your items but won't be able to add new ones beyond the free tier limit.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>What's the 20GB soft limit for photos?</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Plus members get unlimited photos with a 20GB soft limit. If you need more storage, just reach out and we'll work with you to expand your limit based on your needs.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>What is the Early Access Pricing?</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Our current pricing of $4.99/mo or $49.99/year is a special offer exclusive to our first 10,000 users. Pricing will increase for future users, so join now to take advantage of this special rate.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Get Organized?</h2>
            <p>Download StashDog today and start with our generous free tier.</p>
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

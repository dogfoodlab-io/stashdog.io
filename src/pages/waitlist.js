import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import WaitlistForm from "../components/WaitlistForm"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import { Rocket, Trophy, Banknote } from "lucide-react"
import "../styles/global.css"

const WaitlistPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  // Log page view when component mounts
  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Waitlist',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/waitlist'
      })
    }
  }, [isInitialized, logEvent])

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Join the StashDog Waitlist - Early Access</title>
          <meta name="description" content="Join StashDog's waitlist for early access to the smart home inventory app. Get free premium features, special pricing, and priority support as a beta tester. Sign up now for exclusive benefits." />
          <meta name="keywords" content="StashDog waitlist, early access, home organization, inventory management, sign up" />
          <link rel="canonical" href="https://stashdog.io/waitlist/" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content="Join the StashDog Waitlist - Early Access" />
          <meta property="og:description" content="Be among the first to get your shit together with StashDog. Join our waitlist for early access." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/waitlist" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Join the StashDog Waitlist - Early Access" />
          <meta name="twitter:description" content="Be among the first to get your shit together with StashDog." />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

          {/* Favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/round-logo-goggles.png" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
        </Helmet>

        <Header />

        <main className="waitlist-page">
          <section className="stashdog-hero waitlist-hero" style={{ paddingBottom: '2rem' }}>
            <div className="container">
              <div className="waitlist-grid">
                <div className="hero-content">
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(252, 217, 0, 0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '99px',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(252, 217, 0, 0.2)'
                  }}>
                    <span style={{ color: '#fcd900', fontWeight: '600', fontSize: '0.9rem' }}>
                      Limited Spots Available
                    </span>
                  </div>

                  <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                    Join the Pack
                  </h1>
                  <p className="hero-description">
                    Be among the first to get your hands on StashDog's newest features.
                    No more living like a trash gremlin—early access awaits!
                  </p>

                  <div className="benefits-list" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', color: '#fcd900', display: 'flex' }}>
                        <Rocket size={20} />
                      </div>
                      <div><strong>Early Access</strong> to newest features</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', color: '#fcd900', display: 'flex' }}>
                        <Banknote size={20} />
                      </div>
                      <div>Discounted pricing and extended trials</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '50%', color: '#fcd900', display: 'flex' }}>
                        <Trophy size={20} />
                      </div>
                      <div><strong>VIP Support</strong> & direct access to the team</div>
                    </div>
                  </div>
                </div>

                <div className="hero-form" style={{
                  background: 'var(--bg-card)',
                  padding: '2rem',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </section>

          <section className="stable-release" style={{
            background: '#111',
            padding: '4rem 0',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Just want to get organized now?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                You can still download the stable version of StashDog today and start tracking your items immediately.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <AppStoreButton onClick={() => logEvent('download_click', { platform: 'ios', page: 'waitlist' })} />
                <GooglePlayButton onClick={() => logEvent('download_click', { platform: 'android', page: 'waitlist' })} />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default WaitlistPage 
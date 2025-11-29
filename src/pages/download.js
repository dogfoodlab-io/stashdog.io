import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

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
    <HelmetProvider>
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
          <meta property="og:image" content="https://stashdog.io/lab1.png" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Download StashDog - Get Organized Now" />
          <meta name="twitter:description" content="Download StashDog for iOS and Android. Finally get your shit together." />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />
          {/* Favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/round-logo-goggles.png" />
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
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
              <br /><br />
              <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                Stop living like a trash gremlin. Get organized now!
              </p>
            </div>
          </section>
          <section className="download-options">
            <div className="container">
              <div className="download-buttons">
                <AppStoreButton onClick={handleDownloadClick} />
                <GooglePlayButton onClick={handleDownloadClick} />
              </div>
              {/* <div className="download-info">
                <h2>Finally Get Your Shit Together</h2>
                <p>StashDog helps you organize your crap and find your stuff when you need it. No more living like a disaster!</p>
                <div className="download-features">
                  <div className="feature-item">
                    <h3>🎯 Find Your Stuff Instantly</h3>
                    <p>Stop digging through piles of junk like a raccoon</p>
                  </div>
                  <div className="feature-item">
                    <h3>📦 Track Everything</h3>
                    <p>Know exactly where you put that thing you need</p>
                  </div>
                  <div className="feature-item">
                    <h3>🏠 Organize Your Space</h3>
                    <p>Turn your chaos into something that makes sense</p>
                  </div>
                </div>
              </div> */}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}
export default DownloadPage
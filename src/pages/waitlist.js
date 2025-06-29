import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import WaitlistForm from "../components/WaitlistForm"
import { useFirebase } from "../hooks/useFirebase"
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
          <title>Join the StashDog Waitlist - Early Access</title>
          <meta name="description" content="Be among the first to get access to StashDog. Join our waitlist and stop living like a trash gremlin sooner." />
          <meta name="keywords" content="StashDog waitlist, early access, home organization, inventory management, sign up" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Join the StashDog Waitlist - Early Access" />
          <meta property="og:description" content="Be among the first to get your shit together with StashDog. Join our waitlist for early access." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.app/waitlist" />
          <meta property="og:image" content="https://stashdog.app/lab1.png" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Join the StashDog Waitlist - Early Access" />
          <meta name="twitter:description" content="Be among the first to get your shit together with StashDog." />
          <meta name="twitter:image" content="https://stashdog.app/lab1.png" />
          
          {/* Favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/round-logo-goggles.png" />
          
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
        </Helmet>
        
        <Header />
        
        <main className="waitlist-page">
          <div className="container">
            <div className="waitlist-hero">
              <h1>Join the Pack</h1>
              <p>
                Be among the first to get your hands on StashDog and finally organize your life. 
                No more living like a trash gremlin—early access awaits!
              </p>
            </div>
            
            <div className="waitlist-content">
              <div className="waitlist-benefits">
                <h2>Why Join the Waitlist?</h2>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <h3>🚀 Early Access</h3>
                    <p>Get StashDog before anyone else and start organizing your chaos immediately.</p>
                  </div>
                  <div className="benefit-item">
                    <h3>💰 Special Pricing</h3>
                    <p>Exclusive early-bird pricing and lifetime deals for waitlist members.</p>
                  </div>
                  <div className="benefit-item">
                    <h3>🎯 Shape the Product</h3>
                    <p>Your feedback helps us build the features that matter most to you.</p>
                  </div>
                  <div className="benefit-item">
                    <h3>🏆 VIP Treatment</h3>
                    <p>Priority support and direct access to our team during the beta phase.</p>
                  </div>
                </div>
              </div>
              
              <div className="waitlist-form-section">
                <h2>Ready to Get Organized?</h2>
                <p>Fill out the form below and we'll keep you updated on our progress.</p>
                <WaitlistForm />
              </div>
            </div>
            
            <div className="waitlist-footer-cta">
              <p>
                <Link to="/" className="back-button">
                  ← Back to Home
                </Link>
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default WaitlistPage 
import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const FeaturesPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Features',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/features'
      })
    }
  }, [isInitialized, logEvent])

  const handleFeatureClick = (featureName) => {
    logEvent('feature_interest_click', {
      feature_name: featureName,
      page: 'features'
    })
  }

  const handleCTAClick = (ctaType, buttonText, buttonPosition) => {
    logEvent('cta_click', {
      cta_type: ctaType,
      button_text: buttonText,
      button_position: buttonPosition,
      page: 'features'
    })
    window.location.href = '/waitlist'
  }

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <title>Features - StashDog: Stop Losing Your Shit</title>
          <meta name="description" content="See how StashDog's features help you find your stuff, organize your chaos, and finally get your shit together. Photo inventory, smart search, family sharing, and more." />
          <meta name="keywords" content="home inventory features, photo inventory, smart search, family sharing, organization app features, digital organization tools" />
          
          {/* Open Graph */}
          <meta property="og:title" content="StashDog Features - Stop Losing Your Shit" />
          <meta property="og:description" content="Discover all the ways StashDog helps you organize your chaos and find your stuff when you need it." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.app/features" />
          <meta property="og:image" content="https://stashdog.app/lab1.png" />
          
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
        </Helmet>
        
        <Header />
        
        {/* Hero Section */}
        <section className="stashdog-hero">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <img
                src="/lab1.png"
                alt="StashDog Features"
                style={{ maxWidth: '200px', height: 'auto' }}
              />
            </div>
            <h2>Combining Power and Simplicity to Support Your Laziness</h2>
            <p>
              Here's how StashDog actually helps real people with real messy lives.
            </p>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="products">
          <div className="container">
            
            {/* Photo-Based Inventory */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>📸 Snap a Pic, Never Lose Your Shit Again</h3>
                </div>
              </div>
              <p className="description">
                Take a photo of your stuff. That's it. No complicated forms, no endless categories to pick from. 
                Just point, shoot, and suddenly your crap is trackable. Our AI figures out what it is so you don't have to.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>✨ AI-Powered Recognition:</strong> We'll guess what your junk is so you don't have to think
                </div>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>📱 Multiple Photos:</strong> Take pics from every angle like you're selling it on eBay
                </div>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🏷️ Smart Tagging:</strong> Automatic tags that actually make sense
                </div>
              </div>
              <button 
                onClick={() => handleFeatureClick('photo_inventory')}
                className="cta-button"
              >
                See Photo Features
              </button>
            </div>

            {/* Smart Search */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🔍 Search Through All Your Notes To Help You Find Your Shit</h3>
                </div>
              </div>
              <p className="description">
                Stop rummaging through closets like a goddamn raccoon. Just type "camping gear" 
                and boom - StashDog tells you exactly where you stashed it. Works with voice commands too, 
                because sometimes you're too lazy to type.
              </p>
              <div style={{ 
                backgroundColor: 'rgba(74, 144, 226, 0.1)', 
                padding: '1.5rem', 
                borderRadius: '10px',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#fcd900' }}>Try These Searches:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <p style={{ margin: '0.25rem 0', fontStyle: 'italic', color: '#e0e0e0' }}>"Christmas lights"</p>
                  <p style={{ margin: '0.25rem 0', fontStyle: 'italic', color: '#e0e0e0' }}>"red sweater"</p>
                  <p style={{ margin: '0.25rem 0', fontStyle: 'italic', color: '#e0e0e0' }}>"stuff in the garage"</p>
                  <p style={{ margin: '0.25rem 0', fontStyle: 'italic', color: '#e0e0e0' }}>"power tools"</p>
                </div>
              </div>
              <button 
                onClick={() => handleFeatureClick('smart_search')}
                className="cta-button"
              >
                Try Smart Search
              </button>
            </div>

            {/* Location Tracking */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>📍 GPS for Your Garage (And Everything Else)</h3>
                </div>
              </div>
              <p className="description">
                Create custom locations like "that weird closet under the stairs" or "mom's storage unit." 
                Use our QR codes on boxes so you can scan and quickly see what's inside without having to rummage
                through every box.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🏠 Custom Locations:</strong> "Bedroom closet top shelf" beats "misc storage #47"
                </div>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>📦 QR Code Magic:</strong> Stick codes on boxes, scan to see what's inside
                </div>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🗺️ Visual Maps:</strong> See where all your crap lives at a glance
                </div>
              </div>
              <button 
                onClick={() => handleFeatureClick('location_tracking')}
                className="cta-button"
              >
                Explore Locations
              </button>
            </div>

            {/* Family Sharing */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>👨‍👩‍👧‍👦 Stop Fighting Over Who Moved What</h3>
                </div>
              </div>
              <p className="description">
                Share your inventory with family members so everyone can find (and put back) your shit. 
                Set permissions so the kids can't "accidentally" delete your tool collection from the app.
              </p>
              <div style={{ 
                backgroundColor: 'rgba(38, 194, 129, 0.1)', 
                padding: '1.5rem', 
                borderRadius: '10px',
                border: '1px solid rgba(38, 194, 129, 0.3)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#fcd900' }}>Real Family Scenarios:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#e0e0e0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Dad finally knows where mom put the camping gear</li>
                  <li style={{ marginBottom: '0.5rem' }}>Kids can find their sports equipment without destroying the garage</li>
                  <li style={{ marginBottom: '0.5rem' }}>Everyone can see what's in the holiday decoration boxes</li>
                  <li style={{ marginBottom: '0.5rem' }}>No more "who moved my drill?" arguments</li>
                </ul>
              </div>
              <button 
                onClick={() => handleFeatureClick('family_sharing')}
                className="cta-button"
              >
                See Family Features
              </button>
            </div>

            {/* Voice Integration */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🗣️ Talk to Your House Like It's 2024</h3>
                </div>
              </div>
              <p className="description">
                "Hey Google, ask StashDog where my winter coats are." That's it. Your smart speaker becomes 
                your personal inventory assistant. Works with Alexa too, because we're not picky about which 
                robot overlord you prefer.
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔵</div>
                  <strong style={{ color: '#fcd900' }}>Alexa Integration</strong>
                </div>
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(252, 217, 0, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🟢</div>
                  <strong style={{ color: '#fcd900' }}>Google Assistant</strong>
                </div>
              </div>
              <button 
                onClick={() => handleFeatureClick('voice_integration')}
                className="cta-button"
              >
                Try Voice Commands
              </button>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Stop Living Like a Disaster?</h2>
            <p>Too Bad. Unfortunately, we're not ready to launch yet. There's still a bit of work to do to make sure all of that stuff above doesn't suck. In the meanwhile, you can join the waitlist to be notified for Early Access Programs and what not.</p>
            <div className="cta-buttons">
              <Link to="/waitlist" className="cta-button">Join the Waitlist</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default FeaturesPage
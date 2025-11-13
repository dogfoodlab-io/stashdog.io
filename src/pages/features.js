import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
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

  const handleDownloadClick = (platform) => {
    if (isInitialized) {
      logEvent('download_click', {
        platform: platform,
        page: 'features'
      })
    }
  }

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Features - StashDog: Stop Losing Your Shit</title>
          <meta name="description" content="Discover StashDog's powerful features: photo-based inventory, flexible organization with collections and tags, QR code labels, role-based sharing, friend & group management, document attachments, reminders, activity history, and AI-assisted organization." />
          <meta name="keywords" content="home inventory features, photo inventory, QR code labels, role-based access, document management, item reminders, activity tracking, AI organization, collaborative inventory" />
          <link rel="canonical" href="https://stashdog.io/features/" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph */}
          <meta property="og:title" content="StashDog Features - Stop Losing Your Shit" />
          <meta property="og:description" content="Photo-based inventory, QR code labels, role-based sharing, reminders, activity tracking, and AI-powered organization. Everything you need to finally get organized." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/features" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StashDog Features - Stop Losing Your Shit" />
          <meta name="twitter:description" content="Photo-based inventory, QR code labels, role-based sharing, reminders, activity tracking, and AI-powered organization. Everything you need to finally get organized." />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "StashDog",
              "description": "Photo-based inventory tracking app with flexible organization, QR code labels, role-based sharing, document attachments, reminders, activity tracking, and AI-assisted organization.",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Photo-based inventory tracking",
                "Flexible organization with collections, tags, and containers",
                "QR code labels for printed item lookups",
                "Role-based access control and sharing",
                "Friend and group management for collaborative inventory",
                "Document attachments for receipts, warranties, and manuals",
                "Item reminders for maintenance and deadlines",
                "Activity history tracking",
                "AI-assisted item descriptions and organization"
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Dogfood Lab LLC"
              }
            })}
          </script>
          
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
            <h1>Combining Power and Simplicity to Support Your Laziness</h1>
            <p>
              Here's how StashDog actually helps real people with real messy lives.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
              <a href="/solutions" style={{ color: '#fcd900', textDecoration: 'underline' }}>
                See how StashDog solves real-world organization problems →
              </a>
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
                  <h3>📸 Photo-Based Inventory</h3>
                </div>
              </div>
              <p className="description">
                Take a photo of your stuff. That's it. No complicated forms, no endless categories to pick from.
                Just point, shoot, and suddenly your crap is trackable. Our AI figures out what it is and helps you
                organize it automatically.
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
                  <strong style={{ color: '#fcd900' }}>✨ AI Recognition:</strong> Smart item identification from photos
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>📱 Multiple Photos:</strong> Capture every angle of your items
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🎯 Visual Search:</strong> Find items by what they look like
                </div>
              </div>
            </div>

            {/* Flexible Organization Systems */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🗂️ Flexible Organization Systems</h3>
                </div>
              </div>
              <p className="description">
                Organize your way. Use collections to share groups of items with others, tags to hyper-organize
                by category or purpose, and containers to track exactly where things are physically stored.
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
                  <strong style={{ color: '#fcd900' }}>📚 Collections:</strong> Group and share related items
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🏷️ Tags:</strong> Hyper-organize by any category you want
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>📦 Containers:</strong> Know exactly where things are stored
                </div>
              </div>
            </div>

            {/* QR Code Item Links */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>📱 QR Coded Item Links</h3>
                </div>
              </div>
              <p className="description">
                Print QR code labels for your boxes and containers. Scan them with your phone to instantly
                see what's inside without having to dig through everything. Perfect for storage bins, moving boxes,
                and organizing closets.
              </p>
              <div style={{
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#fcd900' }}>QR Code Magic:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#e0e0e0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Generate unique QR codes for any item or container</li>
                  <li style={{ marginBottom: '0.5rem' }}>Scan to instantly view contents</li>
                  <li style={{ marginBottom: '0.5rem' }}>Print labels directly from the app</li>
                  <li style={{ marginBottom: '0.5rem' }}>Share QR codes with others for quick access</li>
                </ul>
              </div>
            </div>

            {/* Role-Based Access & Sharing */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🔐 Powerful Role-Based Access & Sharing</h3>
                </div>
              </div>
              <p className="description">
                Control who can see and edit your inventory with granular permissions. Give family members view-only
                access, let trusted friends manage specific collections, or keep private items completely to yourself.
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
                  <strong style={{ color: '#fcd900' }}>👁️ View-Only Access:</strong> Let people see without editing
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>✏️ Edit Permissions:</strong> Choose who can modify items
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🔒 Private Items:</strong> Keep personal stuff private
                </div>
              </div>
            </div>

            {/* Friend & Group Management */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>👥 Friend & Group Management</h3>
                </div>
              </div>
              <p className="description">
                Keep your pack in the loop with collaborative item management. Add friends and family to groups,
                share collections, and work together to manage shared items. Perfect for households, roommates,
                and community organizations.
              </p>
              <div style={{
                backgroundColor: 'rgba(38, 194, 129, 0.1)',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(38, 194, 129, 0.3)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#fcd900' }}>Collaboration Features:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#e0e0e0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Create groups for family, roommates, or teams</li>
                  <li style={{ marginBottom: '0.5rem' }}>Share specific collections with different groups</li>
                  <li style={{ marginBottom: '0.5rem' }}>Everyone can add, edit, and organize shared items</li>
                  <li style={{ marginBottom: '0.5rem' }}>See who has what and where it is</li>
                </ul>
              </div>
            </div>

            {/* Document Attachments */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>📄 Document Attachments</h3>
                </div>
              </div>
              <p className="description">
                Attach receipts, warranties, manuals, and other documents directly to your items. Never lose
                important paperwork again. Snap a photo or upload PDFs to keep everything organized in one place.
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
                  <strong style={{ color: '#fcd900' }}>🧾 Receipts:</strong> Track purchases and proof of ownership
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>🛡️ Warranties:</strong> Never miss a warranty claim deadline
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>📖 Manuals:</strong> Quick access to instructions when you need them
                </div>
              </div>
            </div>

            {/* Item Reminders */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>⏰ Item Reminders</h3>
                </div>
              </div>
              <p className="description">
                Set reminders for maintenance tasks, warranty expirations, subscription renewals, or anything else
                time-sensitive. StashDog will notify you so you never miss important deadlines or forget to maintain
                your valuable items.
              </p>
              <div style={{
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#fcd900' }}>Stay On Top Of:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <p style={{ margin: '0.25rem 0', color: '#e0e0e0' }}>🔧 Equipment maintenance</p>
                  <p style={{ margin: '0.25rem 0', color: '#e0e0e0' }}>🛡️ Warranty expirations</p>
                  <p style={{ margin: '0.25rem 0', color: '#e0e0e0' }}>📅 Subscription renewals</p>
                  <p style={{ margin: '0.25rem 0', color: '#e0e0e0' }}>🔄 Seasonal item storage</p>
                </div>
              </div>
            </div>

            {/* Activity History */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>📊 Item Activity History</h3>
                </div>
              </div>
              <p className="description">
                Track every change made to your items. See who moved what, when they moved it, and what changes
                were made. Perfect for shared households where multiple people manage the same inventory.
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
                  <strong style={{ color: '#fcd900' }}>👤 Who:</strong> See which user made changes
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>📝 What:</strong> View exactly what changed
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(252, 217, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(252, 217, 0, 0.3)'
                }}>
                  <strong style={{ color: '#fcd900' }}>⏱️ When:</strong> Track timestamps for all changes
                </div>
              </div>
            </div>

            {/* AI-Assisted Features */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🤖 AI-Assisted Item Descriptions</h3>
                </div>
              </div>
              <p className="description">
                Let AI do the heavy lifting. Our intelligent assistant analyzes your photos and existing item
                properties to automatically generate detailed descriptions, suggest tags, and recommend organization
                strategies. Less typing, more organizing.
              </p>
              <div style={{
                backgroundColor: 'rgba(38, 194, 129, 0.1)',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '1px solid rgba(38, 194, 129, 0.3)',
                marginBottom: '2rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#fcd900' }}>AI Powers:</h4>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#e0e0e0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Automatic item descriptions from photos</li>
                  <li style={{ marginBottom: '0.5rem' }}>Smart tag suggestions based on item properties</li>
                  <li style={{ marginBottom: '0.5rem' }}>Organization recommendations for better findability</li>
                  <li style={{ marginBottom: '0.5rem' }}>Learn from your organization patterns over time</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Stop Living Like a Disaster?</h2>
            <p>StashDog is now available! Download the app and finally get your shit together.</p>
            <div className="cta-buttons">
              <AppStoreButton onClick={handleDownloadClick} />
              <GooglePlayButton onClick={handleDownloadClick} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default FeaturesPage
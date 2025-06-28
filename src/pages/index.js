import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const IndexPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  // Log page view when component mounts
  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Homepage',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/'
      })
    }
  }, [isInitialized, logEvent])

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <title>StashDog - Smart Home Inventory Management</title>
          <meta name="description" content="Never lose track of your stuff again. StashDog helps you organize, find, and manage everything you own with AI-powered inventory management." />
          <meta name="keywords" content="home inventory, organization, smart home, AI assistant, inventory management, home database" />
          
          {/* Open Graph */}
          <meta property="og:title" content="StashDog - Smart Home Inventory Management" />
          <meta property="og:description" content="Turn your home into a smart database. Never lose track of your stuff again with AI-powered inventory management." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.app" />
          <meta property="og:image" content="https://stashdog.app/lab1.png" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StashDog - Smart Home Inventory Management" />
          <meta name="twitter:description" content="Turn your home into a smart database. Never lose track of your stuff again." />
          <meta name="twitter:image" content="https://stashdog.app/lab1.png" />
          
          {/* Favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/round-logo-goggles.png" />
          
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
          
          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "StashDog",
              "description": "Smart home inventory management application",
              "url": "https://stashdog.app",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Dogfood Lab LLC"
              }
            })}
          </script>
        </Helmet>
        
        <Header />
        <Hero />
        <Features />
        <Testimonials />
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default IndexPage
import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Testimonials from "../components/Testimonials"
import FAQ from "../components/FAQ"
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
          <html lang="en" />
          <title>StashDog - Quit Living Like a Trash Gremlin</title>
          <meta name="description" content="StashDog is the smart home inventory management app that helps families organize, track, and find their belongings instantly. Never lose your stuff again with AI-powered organization for moving, storage, and daily life." />
          <meta name="keywords" content="home inventory, organization, get organized, find your stuff, home management, stop losing shit" />
          <link rel="canonical" href="https://stashdog.io/" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph */}
          <meta property="og:title" content="StashDog - Quit Living Like a Trash Gremlin" />
          <meta property="og:description" content="Stop living like a disaster. StashDog helps you organize your crap and find your shit when you need it." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StashDog - Quit Living Like a Trash Gremlin" />
          <meta name="twitter:description" content="Stop living like a disaster. Finally get your shit together with StashDog." />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />
          
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
              "url": "https://stashdog.io",
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
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does StashDog help me organize my stuff?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog uses photo-based inventory tracking with AI recognition. Just take a picture of your items, and our app automatically categorizes and tags them. You can assign storage locations, add notes, and search everything instantly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can my family members access our shared inventory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! StashDog supports family sharing with customizable permissions. You can invite family members to view or edit your inventory, share specific collections, and collaborate on organization projects."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What makes StashDog different from other organization apps?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog eliminates the mental overhead of traditional organization. Instead of forcing you to remember complex filing systems, we let you store things naturally and use AI-powered search to find them later."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is StashDog good for moving and storage?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! StashDog is perfect for moving. Use QR codes on boxes, take photos of contents, and track everything digitally. When you need something specific, just search instead of opening every box."
                  }
                }
              ]
            })}
          </script>
        </Helmet>
        
        <Header />
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default IndexPage
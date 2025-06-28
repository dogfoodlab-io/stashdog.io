import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const PrivacyPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'Privacy Policy',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/privacy'
      })
    }
  }, [isInitialized, logEvent])

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <title>Privacy Policy - StashDog</title>
          <meta name="description" content="StashDog privacy policy and data protection information." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        
        <Header />
        
        <main style={{ padding: '4rem 0', flex: 1 }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ color: '#fcd900', marginBottom: '2rem' }}>Privacy Policy</h1>
              
              <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
                
                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>Information We Collect</h2>
                <p>
                  StashDog is currently in development. When our app launches, we will collect only the information 
                  necessary to provide our inventory management services, including:
                </p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Account information (email, name)</li>
                  <li>Inventory data (item photos, descriptions, locations)</li>
                  <li>Usage analytics to improve our service</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>How We Use Your Information</h2>
                <p>
                  Your data will be used exclusively to:
                </p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Provide inventory management services</li>
                  <li>Improve app functionality and user experience</li>
                  <li>Send important service updates</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your data. All data is encrypted 
                  in transit and at rest. We will never sell your personal information to third parties.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>Contact Us</h2>
                <p>
                  If you have questions about this privacy policy, please contact us at:{" "}
                  <a href="mailto:privacy@dogfoodlab.io" style={{ color: '#fcd900' }}>
                    privacy@dogfoodlab.io
                  </a>
                </p>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                  <Link 
                    to="/" 
                    className="cta-button"
                    onClick={() => logEvent('navigation', { destination: 'home', source: 'privacy' })}
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default PrivacyPage
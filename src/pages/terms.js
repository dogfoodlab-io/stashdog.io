import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const TermsPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'Terms of Service',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/terms'
      })
    }
  }, [isInitialized, logEvent])

  return (
    <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Terms of Service - StashDog</title>
          <meta name="description" content="Read StashDog's terms of service and user agreement." />
          <link rel="canonical" href="https://stashdog.io/terms/" />
          <meta name="robots" content="noindex, follow" />

          <meta property="og:title" content="Terms of Service - StashDog" />
          <meta property="og:description" content="Read StashDog's terms of service and user agreement." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/terms/" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Terms of Service - StashDog" />
          <meta name="twitter:description" content="Read StashDog's terms of service and user agreement." />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />
        </Helmet>

        <Header />

        <main style={{ padding: '4rem 0', flex: 1 }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ color: '#fcd900', marginBottom: '2rem' }}>Terms of Service</h1>

              <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                <p><strong>Effective Date: January 1, 2025</strong></p>

                <p>
                  Welcome to Stashdog ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of the Stashdog mobile application and related services (the "Service").
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>2. Description of Service</h2>
                <p>
                  Stashdog is a personal inventory management application that allows users to catalog, organize, and track their personal belongings through digital collections.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>3. Subscription Services</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.1 Subscription Plans</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Free Plan</strong>: Limited to 100 items, 10 AI Completions per month, and 1GB storage</li>
                  <li><strong>Stashdog+ Monthly</strong>: Unlimited items, unlimited AI completions, unlimited storage, and priority support for $4.99 per month</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.2 Payment Terms</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Subscription fees are charged in advance on a monthly basis</li>
                  <li>Payment will be charged to your chosen payment method through Stripe</li>
                  <li>Prices are in US Dollars and may be subject to applicable taxes</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.3 Automatic Renewal</h3>
                <p>
                  Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date.
                </p>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.4 Cancellation</h3>
                <p>
                  You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period. No refunds will be provided for partial months.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>4. User Accounts</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>4.1 Account Creation</h3>
                <p>
                  You must create an account to use certain features of our Service. You are responsible for maintaining the confidentiality of your account credentials.
                </p>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>4.2 Account Responsibility</h3>
                <p>
                  You are responsible for all activities that occur under your account and for keeping your account secure.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>5. User Content</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>5.1 Ownership</h3>
                <p>
                  You retain ownership of all content you upload to the Service, including photos, descriptions, and other data.
                </p>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>5.2 License to Us</h3>
                <p>
                  By uploading content, you grant us a non-exclusive, worldwide license to use, store, and display your content solely for the purpose of providing the Service.
                </p>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>5.3 Content Guidelines</h3>
                <p>You agree not to upload content that is:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Illegal, harmful, or offensive</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains malware or harmful code</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>6. Usage Limits</h2>
                <p>
                  Free and paid plans have specified usage limits. Exceeding these limits may result in service restrictions or account suspension.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>7. Privacy</h2>
                <p>
                  Your privacy is important to us. Please review our <Link to="/privacy" style={{ color: '#fcd900' }}>Privacy Policy</Link>, which also governs your use of the Service.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>8. Prohibited Uses</h2>
                <p>You may not use our Service:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>For any unlawful purpose or to solicit unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations or laws</li>
                  <li>To transmit or procure sending of advertising or promotional material</li>
                  <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>9. Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>10. Disclaimers</h2>
                <p>
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties, whether express or implied, including implied warranties of merchantability and fitness for a particular purpose.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>11. Limitation of Liability</h2>
                <p>
                  In no event shall Stashdog be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>12. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Stashdog from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>13. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the United States, without regard to conflict of law provisions.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>14. Changes to Terms</h2>
                <p>
                  We reserve the right to update these Terms at any time. We will notify users of significant changes via email or in-app notification.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>15. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Email</strong>: <a href="mailto:support@dogfoodlab.io" style={{ color: '#fcd900' }}>support@dogfoodlab.io</a></li>
                  <li><strong>Website</strong>: <a href="https://stashdog.io" style={{ color: '#fcd900' }}>https://stashdog.io</a></li>
                </ul>

                <p style={{ marginTop: '2rem' }}>
                  By using Stashdog, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
                </p>

                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                  <Link
                    to="/"
                    className="cta-button"
                    onClick={() => logEvent('navigation', { destination: 'home', source: 'terms' })}
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
  )
}

export default TermsPage
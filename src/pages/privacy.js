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
          <html lang="en" />
          <title>Privacy Policy - StashDog</title>
          <meta name="description" content="StashDog privacy policy and data protection information." />
          <link rel="canonical" href="https://stashdog.io/privacy/" />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        
        <Header />
        
        <main style={{ padding: '4rem 0', flex: 1 }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ color: '#fcd900', marginBottom: '2rem' }}>Privacy Policy</h1>
              
              <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                <p><strong>Effective Date: August 12, 2025</strong></p>
                
                <p>
                  DogFood Lab ("we," "our," or "us") operates StashDog, a mobile and web application that helps users organize and manage their personal belongings. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our applications and related services.
                </p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>1. Information We Collect</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>1.1 Personal Information</h3>
                <p>When you create an account with StashDog, we collect:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Name and email address</strong> for account creation and communication</li>
                  <li><strong>Profile picture</strong> (optional) for personalization</li>
                  <li><strong>Authentication credentials</strong> securely managed through Supabase</li>
                  <li><strong>Biometric data</strong> (mobile app only, if enabled) stored locally on your device for secure authentication</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>1.2 Content and Usage Data</h3>
                <p>When you use StashDog, we collect and store:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Item data</strong>: Photos, descriptions, categories, tags, and notes about your belongings</li>
                  <li><strong>Collections</strong>: Organization structures you create to group your items</li>
                  <li><strong>Usage analytics</strong>: App features used, session duration, and interaction patterns</li>
                  <li><strong>Device information</strong>: Device type, operating system, app version, and unique device identifiers</li>
                  <li><strong>Location data</strong>: Only when explicitly granted, for location-based features</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>1.3 Communications Data</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Chat messages</strong>: If you use our AI chat feature, conversations are stored to improve service quality</li>
                  <li><strong>Support communications</strong>: Messages you send to our support team</li>
                  <li><strong>Notifications</strong>: Preferences and delivery status for push notifications (mobile app)</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>1.4 Payment Information</h3>
                <p>For premium subscriptions:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Subscription data</strong>: Plan type, billing cycle, and subscription status</li>
                  <li><strong>Payment processing</strong>: Handled securely by Stripe and RevenueCat (mobile)</li>
                  <li><strong>Transaction records</strong>: Purchase history and receipts (no credit card details stored by us)</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>2. How We Use Your Information</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>2.1 Provide Core Services</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Maintain your account and user profile</li>
                  <li>Store and organize your item data across devices</li>
                  <li>Enable sharing and collaboration features</li>
                  <li>Provide AI-powered item categorization and search</li>
                  <li>Deliver push notifications and updates (mobile app)</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>2.2 Process Payments and Subscriptions</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Process subscription payments through Stripe and RevenueCat</li>
                  <li>Manage subscription status and billing cycles</li>
                  <li>Handle refunds and subscription changes</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>2.3 Improve Our Services</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Develop new features and functionality</li>
                  <li>Perform quality assurance and testing</li>
                  <li>Optimize app performance and reliability</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>2.4 Communication and Support</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Send important service announcements</li>
                  <li>Provide customer support</li>
                  <li>Respond to user inquiries and feedback</li>
                  <li>Send promotional communications (with your consent)</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>2.5 Legal and Security</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and abuse</li>
                  <li>Maintain security and safety of our services</li>
                  <li>Enforce our Terms of Service</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>3. Information Sharing and Disclosure</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.1 We Do Not Sell Your Personal Data</h3>
                <p>StashDog does not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.2 Service Providers and Partners</h3>
                <p>We share information with trusted service providers who help us operate StashDog:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Supabase</strong>: Database hosting and user authentication</li>
                  <li><strong>Stripe</strong>: Payment processing for subscriptions</li>
                  <li><strong>RevenueCat</strong>: Subscription management and analytics (mobile)</li>
                  <li><strong>Google Services</strong>: Authentication (Google Sign-In) and cloud services</li>
                  <li><strong>Apple Services</strong>: Authentication (Apple Sign-In) and app distribution (mobile)</li>
                  <li><strong>Cloud storage providers</strong>: Secure image and data storage</li>
                  <li><strong>Analytics services</strong>: App performance and usage monitoring</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.3 Sharing Features</h3>
                <p>When you choose to share collections or items:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Shared content becomes accessible to recipients you designate</li>
                  <li>Recipients can view shared items and collections based on permissions you set</li>
                  <li>You control what information is shared and with whom</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>3.4 Legal Disclosure</h3>
                <p>We may disclose your information when required by law or when we believe disclosure is necessary to:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Comply with legal process or government requests</li>
                  <li>Protect our rights, property, or safety</li>
                  <li>Protect the rights, property, or safety of our users</li>
                  <li>Investigate fraud or security issues</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>4. Data Security and Protection</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>4.1 Security Measures</h3>
                <p>We implement industry-standard security practices:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Encryption</strong>: Data encrypted in transit (HTTPS/TLS) and at rest</li>
                  <li><strong>Authentication</strong>: Secure user authentication with optional biometric protection (mobile)</li>
                  <li><strong>Access controls</strong>: Strict limitations on who can access user data</li>
                  <li><strong>Regular audits</strong>: Security assessments and vulnerability testing</li>
                  <li><strong>Secure infrastructure</strong>: Hosting with security-certified providers</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>4.2 Biometric Data Protection (Mobile App)</h3>
                <p>If you enable biometric authentication (Face ID, Touch ID):</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Biometric data is processed and stored locally on your device only</li>
                  <li>We never have access to your actual biometric information</li>
                  <li>You can disable biometric authentication at any time in settings</li>
                  <li>Biometric data is not backed up or transmitted to our servers</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>4.3 Data Breach Response</h3>
                <p>In the event of a data breach affecting your personal information:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>We will notify affected users within 72 hours when feasible</li>
                  <li>We will provide details about what information was involved</li>
                  <li>We will outline steps being taken to address the breach</li>
                  <li>We will offer guidance on protective measures you can take</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>5. Data Retention and Deletion</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>5.1 Retention Periods</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Account data</strong>: Retained while your account is active</li>
                  <li><strong>Content data</strong>: Retained according to your subscription plan and preferences</li>
                  <li><strong>Payment data</strong>: Retained as required by financial regulations (typically 7 years)</li>
                  <li><strong>Analytics data</strong>: Aggregated and anonymized data may be retained indefinitely</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>5.2 Account Deletion</h3>
                <p>You can delete your account at any time:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>All personal data will be permanently deleted within 30 days</li>
                  <li>Some information may be retained longer if required by law</li>
                  <li>Anonymized usage data may be retained for analytics purposes</li>
                  <li>Shared collections may remain accessible to other users you've shared with</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>6. Your Privacy Rights and Choices</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>6.1 Access and Control</h3>
                <p>You have the right to:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Access</strong>: View all personal information we have about you</li>
                  <li><strong>Update</strong>: Modify or correct your personal information</li>
                  <li><strong>Delete</strong>: Remove your account and associated data</li>
                  <li><strong>Export</strong>: Download your data in a portable format</li>
                  <li><strong>Restrict</strong>: Limit how we process your information</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>6.2 Communication Preferences</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Opt out of promotional emails while still receiving important service notifications</li>
                  <li>Control push notification settings for different types of updates (mobile app)</li>
                  <li>Manage sharing preferences and visibility settings</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>6.3 Subscription Management</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Cancel subscriptions through the app or your device's subscription settings (mobile) or payment provider (web)</li>
                  <li>View subscription status and billing history</li>
                  <li>Modify subscription plans and features</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>7. Regional Privacy Rights</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>7.1 California Privacy Rights (CCPA/CPRA)</h3>
                <p>California residents have additional rights:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Right to know</strong>: What personal information we collect and how it's used</li>
                  <li><strong>Right to delete</strong>: Request deletion of personal information</li>
                  <li><strong>Right to opt-out</strong>: We don't sell data, but you can opt-out of targeted advertising</li>
                  <li><strong>Right to non-discrimination</strong>: Equal service regardless of privacy choices</li>
                  <li><strong>Right to correct</strong>: Request correction of inaccurate personal information</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>7.2 European Privacy Rights (GDPR)</h3>
                <p>EU residents have rights under GDPR:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Right of access</strong>: Obtain confirmation and details about data processing</li>
                  <li><strong>Right to rectification</strong>: Correct inaccurate personal data</li>
                  <li><strong>Right to erasure</strong>: Delete personal data under certain circumstances</li>
                  <li><strong>Right to data portability</strong>: Receive data in a structured, commonly used format</li>
                  <li><strong>Right to object</strong>: Object to processing for direct marketing or legitimate interests</li>
                  <li><strong>Right to restrict processing</strong>: Limit how we process your data</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>8. AI and Machine Learning</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>8.1 AI Features</h3>
                <p>StashDog uses AI technology to:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Automatically categorize and tag items</li>
                  <li>Provide smart search capabilities</li>
                  <li>Generate item descriptions and suggestions</li>
                  <li>Improve user experience through personalization</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>8.2 AI Data Usage</h3>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>AI features use your item data to provide personalized recommendations</li>
                  <li>Processing may occur on our servers or through third-party AI services</li>
                  <li>No AI training is performed on your personal data without explicit consent</li>
                  <li>You can opt out of AI features while retaining core app functionality</li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>9. Updates to This Privacy Policy</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>9.1 Policy Changes</h3>
                <p>We may update this Privacy Policy to reflect:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Changes in our data practices</li>
                  <li>New features or services</li>
                  <li>Legal or regulatory requirements</li>
                  <li>Industry best practices</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>9.2 Notification of Changes</h3>
                <p>We will notify you of significant changes through:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Email notification to your registered address</li>
                  <li>In-app notification when you next use StashDog (mobile app)</li>
                  <li>Updated effective date at the top of this policy</li>
                  <li>Prominent notice on our website</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>9.3 Continued Use</h3>
                <p>Continued use of StashDog after policy updates constitutes acceptance of the new terms.</p>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>10. Contact Information</h2>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>10.1 Privacy Inquiries</h3>
                <p>For privacy-related questions or concerns:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Email</strong>: <a href="mailto:privacy@dogfoodlab.io" style={{ color: '#fcd900' }}>privacy@dogfoodlab.io</a></li>
                  <li><strong>Subject line</strong>: Include "Privacy Inquiry" for faster response</li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>10.2 Data Protection Officer</h3>
                <p>For GDPR-related requests:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Email</strong>: <a href="mailto:dpo@dogfoodlab.io" style={{ color: '#fcd900' }}>dpo@dogfoodlab.io</a></li>
                </ul>

                <h3 style={{ color: '#fcd900', marginTop: '1.5rem', fontSize: '1.3rem' }}>10.3 General Support</h3>
                <p>For general app support:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li><strong>Email</strong>: <a href="mailto:support@dogfoodlab.io" style={{ color: '#fcd900' }}>support@dogfoodlab.io</a></li>
                  <li><strong>Website</strong>: <a href="https://stashdog.io" style={{ color: '#fcd900' }}>https://stashdog.io</a></li>
                </ul>

                <h2 style={{ color: '#fcd900', marginTop: '2rem' }}>11. Consent and Agreement</h2>

                <p>By creating an account and using StashDog, you:</p>
                <ul style={{ marginLeft: '2rem' }}>
                  <li>Acknowledge that you have read and understood this Privacy Policy</li>
                  <li>Consent to the collection and use of your information as described</li>
                  <li>Agree to the terms outlined in this policy</li>
                  <li>Understand your rights and how to exercise them</li>
                </ul>

                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(252, 217, 0, 0.1)', borderRadius: '8px' }}>
                  <p><strong>Last Updated</strong>: August 12, 2025</p>
                  <p><strong>Version</strong>: 2.0</p>
                  <p style={{ marginTop: '1rem' }}>
                    This Privacy Policy reflects our commitment to protecting your privacy while providing you with the best possible experience using StashDog. We regularly review and update our privacy practices to ensure they meet the highest standards of data protection.
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>
                    For questions about this policy or our privacy practices, please don't hesitate to contact us at{" "}
                    <a href="mailto:privacy@dogfoodlab.io" style={{ color: '#fcd900' }}>privacy@dogfoodlab.io</a>.
                  </p>
                </div>

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
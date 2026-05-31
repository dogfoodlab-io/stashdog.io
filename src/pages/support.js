import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const supportTopics = [
  {
    title: "Account and login help",
    body: "Get help with sign in, subscriptions, account deletion, or changing account details.",
  },
  {
    title: "Inventory setup",
    body: "Ask about adding items, rooms, containers, QR labels, photos, search, imports, or household sharing.",
  },
  {
    title: "Privacy and data requests",
    body: "Request help with privacy questions, exports, deletion, or how StashDog handles your item data.",
  },
]

const SupportPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent("page_view", {
        page_title: "StashDog Support",
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: typeof window !== "undefined" ? window.location.pathname : "/support",
      })
    }
  }, [isInitialized, logEvent])

  const handleSupportClick = () => {
    logEvent("contact_click", { page: "support", destination: "support_email" })
  }

  return (
    <div className="page-container">
      <Helmet>
        <html lang="en" />
        <title>StashDog Support</title>
        <meta
          name="description"
          content="Get support for StashDog account access, subscriptions, inventory setup, privacy requests, and app questions."
        />
        <link rel="canonical" href="https://stashdog.io/support/" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="StashDog Support" />
        <meta
          property="og:description"
          content="Get support for StashDog account access, subscriptions, inventory setup, privacy requests, and app questions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stashdog.io/support/" />
        <meta property="og:image" content="https://stashdog.io/images/social/stashdog-og-v2.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="StashDog Support" />
        <meta
          name="twitter:description"
          content="Get support for StashDog account access, subscriptions, inventory setup, privacy requests, and app questions."
        />
        <meta name="twitter:image" content="https://stashdog.io/images/social/stashdog-og-v2.png" />
      </Helmet>

      <Header />

      <main style={{ padding: "4rem 0", flex: 1 }}>
        <section style={{ padding: "3rem 0 5rem" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <p style={{ color: "var(--color-primary)", fontWeight: 700, marginBottom: "0.75rem" }}>
                Support
              </p>
              <h1 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>
                Need help with StashDog?
              </h1>
              <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                Email support and include the email address on your StashDog account, your device type, and the part of the app where you got stuck.
              </p>

              <a
                className="cta-button"
                href="mailto:support@dogfoodlab.io?subject=StashDog%20support"
                onClick={handleSupportClick}
              >
                Email support@dogfoodlab.io
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "0 0 5rem" }}>
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              {supportTopics.map((topic) => (
                <article className="info-card" key={topic.title}>
                  <h2 className="info-card-title">{topic.title}</h2>
                  <p className="info-card-description">{topic.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "0 0 3rem" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <h2 style={{ color: "var(--color-primary)" }}>Useful links</h2>
              <ul style={{ marginLeft: "1.25rem", lineHeight: 2 }}>
                <li>
                  <Link to="/privacy/" style={{ color: "var(--color-primary)" }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms/" style={{ color: "var(--color-primary)" }}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/download/" style={{ color: "var(--color-primary)" }}>
                    Download StashDog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default SupportPage

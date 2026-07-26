import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
import { Instagram, Twitter, Video } from "lucide-react"
import { activeStashdogStrings } from "../config"
import { openCookiePreferences } from "../utils/trackingConsent"

const Footer = () => {
  const { logEvent } = useFirebase()
  const footerSections = [
    {
      title: "Product",
      links: [
        { to: "/features/", label: "Features" },
        { to: "/solutions/", label: "Solutions" },
        { to: "/pricing/", label: "Pricing" },
        { to: "/download/", label: "Download" },
      ],
    },
    {
      title: "Use Cases",
      links: [
        { to: "/for/", label: "All Use Cases" },
        { to: "/for/resellers/", label: "Resellers" },
        { to: "/for/contractors/", label: "Contractors" },
        { to: "/for/storage-units/", label: "Storage Units" },
      ],
    },
    {
      title: "Partners",
      links: [
        { to: "/partners/", label: "Partner Program" },
        { to: "/partners/contractors/", label: "Contractors & Restoration" },
        { to: "/partners/movers/", label: "Movers" },
        { to: "/partners/storage-facilities/", label: "Storage Facilities" },
        { to: "/partners/professional-organizers/", label: "Organizers" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "mailto:partners@stashdog.io", label: "Commercial Inquiries" },
        { to: "/support/", label: "Support" },
        { to: "/blog/", label: "Blog" },
        { to: "/privacy/", label: "Privacy Policy" },
        { to: "/terms/", label: "Terms of Service" },
      ],
    },
  ]

  const handleContactClick = () => {
    logEvent('contact_click', { page: 'homepage' })
  }

  const handleFooterLinkClick = (destination) => {
    logEvent('navigation', { destination, source: 'footer' })
  }

  return (
    <footer className="footer" style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(0,0,0,0.3)',
      padding: '4rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img
              src="/round-logo-goggles.png"
              alt="StashDog Logo"
              style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--color-primary)' }}
            />

            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', maxWidth: '420px' }}>
              {activeStashdogStrings.thank_you}
            </p>
          </div>

          <nav className="footer-link-columns" aria-label="Footer navigation">
            {footerSections.map((section) => (
              <div className="footer-link-column" key={section.title}>
                <h2>{section.title}</h2>
                {section.links.map((link) => (
                  link.to ? (
                    <Link key={link.to} to={link.to} onClick={() => handleFooterLinkClick(link.to)}>
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.href} href={link.href} onClick={handleContactClick}>
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
            <a
              href="https://www.instagram.com/stashdog_app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@stashdog79?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Video size={24} />
            </a>
            <a
              href="https://x.com/stashdog233"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Twitter size={24} />
            </a>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
            &copy; {new Date().getFullYear()} Dogfood Lab LLC. All rights reserved.
          </p>
          <button type="button" className="footer-cookie-button" onClick={openCookiePreferences}>
            Cookie Preferences
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

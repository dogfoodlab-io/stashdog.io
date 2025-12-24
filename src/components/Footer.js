import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
import { Instagram, Twitter, Video } from "lucide-react"
import { activeStashdogStrings } from "../config"

const Footer = () => {
  const { logEvent } = useFirebase()

  const handleContactClick = () => {
    logEvent('contact_click', { page: 'homepage' })
  }

  const handlePrivacyClick = () => {
    logEvent('navigation', { destination: 'privacy', source: 'footer' })
  }

  return (
    <footer className="footer" style={{
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(0,0,0,0.3)',
      padding: '4rem 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem'
        }}>
          <img
            src="/round-logo-goggles.png"
            alt="StashDog Logo"
            style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--color-primary)' }}
          />

          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', maxWidth: '600px' }}>
            {activeStashdogStrings.thank_you}
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="mailto:mail@dogfoodlab.io"
              onClick={handleContactClick}
              style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              mail@dogfoodlab.io
            </a>
            <Link
              to="/privacy"
              onClick={handlePrivacyClick}
              style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Terms of Service
            </Link>
          </div>

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
        </div>
      </div>
    </footer>
  )
}

export default Footer
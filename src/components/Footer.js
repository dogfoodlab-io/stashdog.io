import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
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
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@stashdog79?lang=en" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.09v8.32c0 .41.01.82-.07 1.23-.48 2.54-2.3 4.45-4.8 4.91-2.68.48-5.5-.63-6.68-3.04-1.18-2.42.06-5.32 2.72-6.31 1.22-.46 2.58-.38 3.75.22v4.06c-.66-.48-1.48-.65-2.28-.48-.96.21-1.67 1.11-1.59 2.1.07.91.86 1.62 1.77 1.58.91-.03 1.66-.79 1.66-1.7v-18.8z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/stashdog233" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
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
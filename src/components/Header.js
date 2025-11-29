import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <nav className="header">
            {/* Logo Section */}
            <Link to="/" className="header-link">
              <img
                className="header-logo"
                src="/round-logo-goggles.png"
                alt="StashDog Logo"
              />
              <div className="header-text">StashDog</div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              <Link to="/features" className="nav-link">Features</Link>
              <Link to="/solutions" className="nav-link">Solutions</Link>
              <Link to="/pricing" className="nav-link">Pricing</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/download" className="cta-button" style={{ textDecoration: 'none' }}>
                Get The App
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        onKeyDown={(e) => e.key === 'Escape' && closeMobileMenu()}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 1001
        }}
      />

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`} style={{
        position: 'fixed',
        top: 0,
        right: isMobileMenuOpen ? 0 : '-100%',
        width: '300px',
        height: '100vh',
        background: 'var(--bg-card)',
        zIndex: 1002,
        transition: 'right 0.3s ease',
        padding: '2rem',
        boxShadow: '-5px 0 20px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="mobile-menu-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <Link to="/" className="mobile-menu-logo" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img
              src="/round-logo-goggles.png"
              alt="StashDog Logo"
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <span style={{ fontFamily: 'Chewy', fontSize: '1.5rem', color: 'var(--color-primary)' }}>StashDog</span>
          </Link>
          <button 
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        <nav className="mobile-menu-nav" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Link to="/features" className="mobile-nav-link" onClick={closeMobileMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            Features
          </Link>
          <Link to="/solutions" className="mobile-nav-link" onClick={closeMobileMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            Solutions
          </Link>
          <Link to="/pricing" className="mobile-nav-link" onClick={closeMobileMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            Pricing
          </Link>
          <Link to="/blog" className="mobile-nav-link" onClick={closeMobileMenu} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            Blog
          </Link>
          <Link to="/download" className="cta-button" onClick={closeMobileMenu} style={{ textAlign: 'center', marginTop: '1rem' }}>
            Download App
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Header
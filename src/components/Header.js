import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
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
          <nav>
            <div className="header">
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
                <Link to="/blog" className="nav-link">Blog</Link>
                <Link to="/download" className="cta-button" style={{ textDecoration: 'none' }}>
                  Download App
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
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileMenu}
          onKeyDown={(e) => e.key === 'Escape' && closeMobileMenu()}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-menu-logo" onClick={closeMobileMenu}>
            <img
              src="/round-logo-goggles.png"
              alt="StashDog Logo"
              className="mobile-menu-logo-img"
            />
            <span>StashDog</span>
          </Link>
          <button 
            className="mobile-menu-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <Link to="/features" className="mobile-nav-link" onClick={closeMobileMenu}>
            Features
          </Link>
          <Link to="/solutions" className="mobile-nav-link" onClick={closeMobileMenu}>
            Solutions
          </Link>
          <Link to="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>
            Blog
          </Link>
          <Link to="/download" className="mobile-nav-cta" onClick={closeMobileMenu}>
            Download App
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Header
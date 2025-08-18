import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
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
            <div className="nav-links">
              <Link to="/features" className="nav-link">Features</Link>
              <Link to="/solutions" className="nav-link">Solutions</Link>
              <a href="https://apps.apple.com/us/app/stashdog/id6743368759" className="cta-button" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                Download App
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
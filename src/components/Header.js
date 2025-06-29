import React from "react"
import { Link } from "gatsby"

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <nav>
          <div className="header">
            <Link to="/" className="header-link">
              <img
                className="header-logo"
                src="/round-logo-goggles.png"
                alt="StashDog Logo"
              />
              <h1 className="header-text">StashDog</h1>
            </Link>
            <div className="nav-links">
              <Link to="/features" className="nav-link">Features</Link>
              <Link to="/solutions" className="nav-link">Solutions</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
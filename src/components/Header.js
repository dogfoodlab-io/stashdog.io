import React from "react"

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <nav>
          <div className="header">
            <img
              className="header-logo"
              src="/round-logo-goggles.png"
              alt="StashDog Logo"
            />
            <h1 className="header-text">StashDog</h1>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
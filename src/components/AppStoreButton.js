import React from "react"

const AppStoreButton = ({ onClick, className = "", style = {} }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick('ios')
    }
  }

  return (
    <a 
      href="https://apps.apple.com/us/app/stashdog/id6743368759" 
      className={`download-badge-link ${className}`}
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Download StashDog for iOS"
      style={style}
    >
      <img 
        src="/app-store-badge.svg" 
        alt="Download on the App Store" 
        className="download-badge app-store-badge"
        loading="lazy"
      />
    </a>
  )
}

export default AppStoreButton
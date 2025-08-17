import React from "react"

const GooglePlayButton = ({ onClick, className = "", style = {} }) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick('android')
    }
  }

  return (
    <a 
      href="https://play.google.com/store/apps/details?id=com.dogfoodlab.stashdog" 
      className={`download-badge-link ${className}`}
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Download StashDog for Android"
      style={style}
    >
      <img 
        src="/google-play-badge.png" 
        alt="Get it on Google Play" 
        className="download-badge google-play-badge"
      />
    </a>
  )
}

export default GooglePlayButton
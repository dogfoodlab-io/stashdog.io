import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
import { activeStashdogStrings } from "../config"

const Hero = () => {
  const { logEvent } = useFirebase()

  const handleCTAClick = (ctaType, buttonText, buttonPosition) => {
    logEvent('cta_click', {
      cta_type: ctaType,
      button_text: buttonText,
      button_position: buttonPosition,
      page: 'homepage'
    })
    
    // Also log as generate_lead for backward compatibility
    logEvent('generate_lead', {
      cta_type: ctaType
    })
  }

  return (
    <section className="stashdog-hero">
      <div className="hero-image-container">
        <img src="hero-1.jpg" alt="Disorganized Home" className="hero-image" />
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">{activeStashdogStrings.welcome.title}</h1>
              <p>{activeStashdogStrings.welcome.description}</p>
              <div className="hero-cta">
                <Link 
                  to="/download" 
                  className="cta-button"
                  onClick={() => handleCTAClick('primary', 'Download Now', 'hero')}
                >
                  Download Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
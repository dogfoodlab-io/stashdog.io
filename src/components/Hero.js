import React, { useEffect } from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
import { useContentSwitcher } from "../hooks/useContentSwitcher"

const Hero = () => {
  const { logEvent } = useFirebase()
  const { content, currentVariant } = useContentSwitcher()

  // Measure header height at runtime and expose as a CSS variable so
  // the hero overlay can be offset precisely to avoid overlapping.
  useEffect(() => {
    const setHeaderHeight = () => {
      const header = document.querySelector('.site-header')
      const h = header ? header.getBoundingClientRect().height : 88
      document.documentElement.style.setProperty('--header-height', `${Math.round(h)}px`)
    }

    // initial set and on resize
    setHeaderHeight()
    window.addEventListener('resize', setHeaderHeight)
    return () => {
      window.removeEventListener('resize', setHeaderHeight)
      document.documentElement.style.removeProperty('--header-height')
    }
  }, [])

  const handleCTAClick = (ctaType, buttonText, buttonPosition) => {
    logEvent('cta_click', {
      cta_type: ctaType,
      button_text: buttonText,
      button_position: buttonPosition,
      page: 'homepage',
      content_variant: currentVariant
    })
    
    // Also log as generate_lead for backward compatibility
    logEvent('generate_lead', {
      cta_type: ctaType,
      content_variant: currentVariant
    })
  }

  return (
    <section className="stashdog-hero">
      <div className="hero-image-container">
        <img src="hero-1.jpg" alt="Disorganized Home" className="hero-image" />
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">{content.welcome.title}</h1>
              <p className="hero-description">{content.welcome.description}</p>
              
              {/* Value Proposition Bullets */}
              {content.welcome.valueBullets && (
                <div className="hero-value-bullets">
                  {content.welcome.valueBullets.map((bullet, index) => (
                    <div key={index} className="value-bullet">
                      <span className="bullet-icon">{bullet.icon}</span>
                      <span className="bullet-text">{bullet.text}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="hero-cta">
                <Link 
                  to="/download" 
                  className="cta-button"
                  onClick={() => handleCTAClick('primary', content.welcome.cta?.buttonText || 'Download Now', 'hero')}
                >
                  {content.welcome.cta?.buttonText || 'Download Now'}
                </Link>
                {content.welcome.cta?.supportingText && (
                  <p className="cta-supporting-text">{content.welcome.cta.supportingText}</p>
                )}
                {content.welcome.cta?.disclaimer && (
                  <p className="cta-disclaimer">{content.welcome.cta.disclaimer}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
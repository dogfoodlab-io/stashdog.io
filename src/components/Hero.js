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
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0rem 2rem'}}>
          <img
            src="/lab1.png"
            alt="StashDog"
            style={{ maxWidth: '200px', height: 'auto' }}
          />
        </div>
        <h2>{activeStashdogStrings.welcome.title}</h2>
        <p>{activeStashdogStrings.welcome.description}</p>
        <div style={{ margin: '2rem 0' }}>
          <Link 
            to="/waitlist" 
            className="cta-button"
            onClick={() => handleCTAClick('primary', activeStashdogStrings.get_started.call_to_action.sign_up, 'hero')}
          >
            {activeStashdogStrings.get_started.call_to_action.sign_up}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
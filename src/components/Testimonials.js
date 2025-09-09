import React from "react"
import { useFirebase } from "../hooks/useFirebase"
import { activeStashdogStrings } from "../config"

const Testimonials = () => {
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
    <div className="testimonials-section">
      <div className="container">
        <div style={{ margin: '3rem 0', width: '100%', maxWidth: '100%' }}>
          <h2 style={{ marginBottom: '2rem' }}>{activeStashdogStrings.testimonials.title}</h2>
          <div className="testimonials-grid">
            {activeStashdogStrings.testimonials.reviews.map((review, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-author">
                  <img 
                    src={review.image ? `/${review.image}` : index === 0 ? "/Face-Young-Woman.webp" : "/Face-Black.webp"} 
                    alt={`${review.author} portrait`}
                    className="testimonial-avatar"
                    loading="lazy"
                  />
                  <p className="testimonial-name">{review.author}</p>
                </div>
                <p className="testimonial-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="cta-section" id="waitlist">
          <h2>{activeStashdogStrings.get_started.title}</h2>
          <p>{activeStashdogStrings.get_started.description}</p>
          <div className="cta-buttons">
            <a 
              href="/download" 
              className="cta-button"
              onClick={() => {
                handleCTAClick('download', 'Download Now', 'footer_cta')
              }}
            >
              Download Now
            </a>
            <a 
              href="/solutions" 
              className="cta-button"
              onClick={(e) => {
                handleCTAClick('learn_more', activeStashdogStrings.get_started.call_to_action.learn_more, 'footer_cta')
              }}
            >
              {activeStashdogStrings.get_started.call_to_action.learn_more}
            </a>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Testimonials
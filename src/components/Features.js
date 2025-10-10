import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
import { useContentSwitcher } from "../hooks/useContentSwitcher"

const Features = () => {
  const { logEvent } = useFirebase()
  const { content, currentVariant } = useContentSwitcher()

  // Enhanced tracking for feature clicks
  const handleFeatureClick = (featureName) => {
    logEvent('feature_click', {
      feature_name: featureName,
      page: 'homepage',
      content_variant: currentVariant
    })
    
    // Also log as select_content for backward compatibility
    logEvent('select_content', {
      content_type: 'feature',
      content_id: featureName,
      content_variant: currentVariant
    })
  }

  // Enhanced tracking for CTA button clicks
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

  const features = [
    {
      key: 'inventory_management',
      image: 'trashpanda.jpeg',
      data: content.discover.features.inventory_management
    },
    {
      key: 'location_tracking',
      image: 'pointydog.jpg',
      data: content.discover.features.location_tracking
    },
    {
      key: 'family_sharing',
      image: 'dogpack.jpg',
      data: content.discover.features.family_sharing
    }
  ]

  return (
    <section className="products discover-features">
      <div className="container">
        <h2>{content.discover.title}</h2>

        <div className="features-grid">
          {features.map(({ key, data, image }) => (
            <div
              key={key}
              className="feature-card"
              onClick={() => handleFeatureClick(key)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') handleFeatureClick(key) }}
            >
              <div className="feature-icon">
                {image ? (
                  <img src={image || `${key}.jpg`} alt={data.title} className="feature-image" />
                ) : (
                  <div className="feature-placeholder" aria-hidden>
                    <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#f3e6a8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 9l5 5 4-4 6 6" stroke="#f3e6a8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              <h3>{data.title}</h3>
              <p className="description">{data.description}</p>
            </div>
          ))}
        </div>

        <div className="explore-wrap">
          <Link
            to="/solutions"
            className="cta-button explore-outline"
            onClick={() => handleCTAClick('explore', 'EXPLORE', 'discover_features')}
          >
            EXPLORE
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Features
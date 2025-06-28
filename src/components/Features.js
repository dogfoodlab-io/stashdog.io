import React from "react"
import { useFirebase } from "../hooks/useFirebase"
import { activeStashdogStrings } from "../config"

const Features = () => {
  const { logEvent } = useFirebase()

  // Enhanced tracking for feature clicks
  const handleFeatureClick = (featureName) => {
    logEvent('feature_click', {
      feature_name: featureName,
      page: 'homepage'
    })
    
    // Also log as select_content for backward compatibility
    logEvent('select_content', {
      content_type: 'feature',
      content_id: featureName
    })
  }

  // Enhanced tracking for CTA button clicks
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

  const features = [
    {
      key: 'inventory_management',
      data: activeStashdogStrings.discover.features.inventory_management
    },
    {
      key: 'location_tracking',
      data: activeStashdogStrings.discover.features.location_tracking
    },
    {
      key: 'retrieval',
      data: activeStashdogStrings.discover.features.retrieval
    },
    {
      key: 'categories',
      data: activeStashdogStrings.discover.features.categories
    },
    {
      key: 'family_sharing',
      data: activeStashdogStrings.discover.features.family_sharing
    },
    {
      key: 'smart_assistant',
      data: activeStashdogStrings.discover.features.smart_assistant
    }
  ]

  return (
    <section className="products">
      <div className="container">
        <h2>{activeStashdogStrings.discover.title}</h2>
        
        {features.map(({ key, data }) => (
          <div key={key} className="product">
            <div className="product-header">
              <div className="product-info">
                <h3>{data.title}</h3>
              </div>
            </div>
            <p className="description">{data.description}</p>
            <a 
              href="#" 
              className="cta-button"
              onClick={(e) => {
                e.preventDefault()
                handleFeatureClick(key)
                handleCTAClick(key, activeStashdogStrings.get_started.call_to_action.learn_more, 'feature_section')
              }}
            >
              {activeStashdogStrings.get_started.call_to_action.learn_more}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
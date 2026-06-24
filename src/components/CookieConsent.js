import React, { useEffect, useState } from "react"
import {
  TRACKING_CONSENT,
  TRACKING_CONSENT_EVENT,
  TRACKING_PREFERENCES_EVENT,
  enableTracking,
  getTrackingConsent,
  hasTrackingConsent,
  requiresExplicitTrackingConsent,
  setTrackingConsent,
} from "../utils/trackingConsent"

const CookieConsent = () => {
  const [consent, setConsent] = useState(null)
  const [requiresOptIn, setRequiresOptIn] = useState(true)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const savedConsent = getTrackingConsent()
    const needsOptIn = requiresExplicitTrackingConsent()
    setConsent(savedConsent)
    setRequiresOptIn(needsOptIn)
    setIsReady(true)

    if (hasTrackingConsent()) {
      enableTracking()
    }

    const handleConsentChange = (event) => {
      setConsent(event.detail?.consent || getTrackingConsent())
    }

    const handleOpenPreferences = () => {
      setIsPreferencesOpen(true)
    }

    window.addEventListener(TRACKING_CONSENT_EVENT, handleConsentChange)
    window.addEventListener(TRACKING_PREFERENCES_EVENT, handleOpenPreferences)

    return () => {
      window.removeEventListener(TRACKING_CONSENT_EVENT, handleConsentChange)
      window.removeEventListener(TRACKING_PREFERENCES_EVENT, handleOpenPreferences)
    }
  }, [])

  const handleChoice = (value) => {
    setTrackingConsent(value)
    setConsent(value)
    setIsPreferencesOpen(false)
  }

  if (!isReady) {
    return null
  }

  const shouldShowBanner = requiresOptIn && !consent && !isPreferencesOpen
  const isTrackingAllowed = hasTrackingConsent()

  return (
    <>
      {shouldShowBanner && (
        <section className="cookie-consent-banner" aria-label="Cookie consent">
          <div>
            <h2>Cookie preferences</h2>
            <p>
              We use necessary storage for site preferences. In your region, we need your
              permission before using analytics and advertising tags to understand visits and
              measure campaigns.
            </p>
          </div>
          <div className="cookie-consent-actions">
            <button type="button" className="cta-button outline" onClick={() => handleChoice(TRACKING_CONSENT.REJECTED)}>
              Reject
            </button>
            <button type="button" className="cta-button" onClick={() => handleChoice(TRACKING_CONSENT.ACCEPTED)}>
              Accept
            </button>
          </div>
        </section>
      )}

      {isPreferencesOpen && (
        <div className="cookie-preferences-backdrop" role="presentation">
          <section className="cookie-preferences-panel" aria-modal="true" role="dialog" aria-labelledby="cookie-preferences-title">
            <h2 id="cookie-preferences-title">Cookie preferences</h2>
            <p>
              {requiresOptIn
                ? "Analytics and advertising tags stay off unless you accept them."
                : "Analytics and advertising tags may run by default in your region, but you can opt out here."}
            </p>
            <div className="cookie-preference-row">
              <div>
                <h3>Strictly necessary storage</h3>
                <p>Required for basic site behavior, including saving this preference.</p>
              </div>
              <span>Always on</span>
            </div>
            <div className="cookie-preference-row">
              <div>
                <h3>Analytics and advertising</h3>
                <p>Allows Google Analytics, Google Ads conversion tracking, and Meta Pixel.</p>
              </div>
              <span>{isTrackingAllowed ? "On" : "Off"}</span>
            </div>
            <div className="cookie-consent-actions">
              <button type="button" className="cta-button outline" onClick={() => handleChoice(TRACKING_CONSENT.REJECTED)}>
                {requiresOptIn ? "Reject" : "Opt out"}
              </button>
              <button type="button" className="cta-button" onClick={() => handleChoice(TRACKING_CONSENT.ACCEPTED)}>
                {requiresOptIn ? "Accept" : "Allow"}
              </button>
            </div>
            <button type="button" className="cookie-preferences-close" onClick={() => setIsPreferencesOpen(false)}>
              Close
            </button>
          </section>
        </div>
      )}
    </>
  )
}

export default CookieConsent

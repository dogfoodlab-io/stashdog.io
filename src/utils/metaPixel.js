import { hasTrackingConsent } from "./trackingConsent"

export const trackMetaEvent = (eventName, payload = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function" || !hasTrackingConsent()) {
    return
  }

  window.fbq("trackCustom", eventName, payload)
}

export const trackMetaStandardEvent = (eventName, payload = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function" || !hasTrackingConsent()) {
    return
  }

  window.fbq("track", eventName, payload)
}

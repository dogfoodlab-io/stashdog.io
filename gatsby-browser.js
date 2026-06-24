import React from "react"
import CookieConsent from "./src/components/CookieConsent"

export const wrapRootElement = ({ element }) => (
  <>
    {element}
    <CookieConsent />
  </>
)

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (!prevLocation || location.pathname.replace(/\/+$/, "") !== "/download") return

  try {
    window.sessionStorage.setItem("stashdog_download_origin", prevLocation.pathname)
  } catch (error) {
    // Session storage can be unavailable in private or locked-down browser contexts.
  }
}

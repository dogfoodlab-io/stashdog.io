import React from "react"
import CookieConsent from "./src/components/CookieConsent"

export const wrapRootElement = ({ element }) => (
  <>
    {element}
    <CookieConsent />
  </>
)

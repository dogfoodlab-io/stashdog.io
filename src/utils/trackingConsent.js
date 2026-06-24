export const TRACKING_CONSENT_STORAGE_KEY = "stashdog_tracking_consent"

export const TRACKING_CONSENT_EVENT = "stashdog-tracking-consent-change"

export const TRACKING_PREFERENCES_EVENT = "stashdog-open-cookie-preferences"

export const TRACKING_CONSENT = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
}

const EXPLICIT_CONSENT_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IS",
  "IE",
  "IT",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "GB",
  "UK",
])

const EXPLICIT_CONSENT_TIME_ZONES = new Set([
  "Atlantic/Azores",
  "Atlantic/Canary",
  "Atlantic/Faroe",
  "Atlantic/Madeira",
  "Arctic/Longyearbyen",
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Guernsey",
  "Europe/Helsinki",
  "Europe/Isle_of_Man",
  "Europe/Jersey",
  "Europe/Lisbon",
  "Europe/Ljubljana",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Zurich",
])

const GA_MEASUREMENT_ID = "G-3HMLS08VFZ"
const GOOGLE_ADS_ID = "AW-17868363896"
const META_PIXEL_ID = process.env.GATSBY_META_PIXEL_ID

const getWindow = () => (typeof window === "undefined" ? null : window)

export const getTrackingConsent = () => {
  const browserWindow = getWindow()

  if (!browserWindow) {
    return null
  }

  try {
    const value = browserWindow.localStorage.getItem(TRACKING_CONSENT_STORAGE_KEY)
    return Object.values(TRACKING_CONSENT).includes(value) ? value : null
  } catch (error) {
    return null
  }
}

const getRegionFromLocale = (locale) => {
  if (!locale || typeof Intl === "undefined" || typeof Intl.Locale !== "function") {
    return null
  }

  try {
    return new Intl.Locale(locale).region || null
  } catch (error) {
    return null
  }
}

export const requiresExplicitTrackingConsent = () => {
  const browserWindow = getWindow()

  if (!browserWindow) {
    return true
  }

  const localeRegions = (browserWindow.navigator.languages || [browserWindow.navigator.language])
    .map(getRegionFromLocale)
    .filter(Boolean)

  if (localeRegions.some((region) => EXPLICIT_CONSENT_COUNTRIES.has(region.toUpperCase()))) {
    return true
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  return EXPLICIT_CONSENT_TIME_ZONES.has(timeZone)
}

export const hasTrackingConsent = () => {
  const consent = getTrackingConsent()

  if (consent === TRACKING_CONSENT.REJECTED) {
    return false
  }

  if (consent === TRACKING_CONSENT.ACCEPTED) {
    return true
  }

  return !requiresExplicitTrackingConsent()
}

const dispatchConsentChange = (value) => {
  const browserWindow = getWindow()

  if (!browserWindow) {
    return
  }

  browserWindow.dispatchEvent(
    new CustomEvent(TRACKING_CONSENT_EVENT, {
      detail: { consent: value },
    })
  )
}

export const setTrackingConsent = (value) => {
  const browserWindow = getWindow()

  if (!browserWindow || !Object.values(TRACKING_CONSENT).includes(value)) {
    return
  }

  try {
    browserWindow.localStorage.setItem(TRACKING_CONSENT_STORAGE_KEY, value)
  } catch (error) {
    return
  }

  if (hasTrackingConsent()) {
    enableTracking()
  } else {
    disableTracking()
  }

  dispatchConsentChange(value)
}

const injectScript = ({ id, src, content }) => {
  const browserWindow = getWindow()

  if (!browserWindow || browserWindow.document.getElementById(id)) {
    return
  }

  const script = browserWindow.document.createElement("script")
  script.id = id

  if (src) {
    script.async = true
    script.src = src
  }

  if (content) {
    script.text = content
  }

  browserWindow.document.head.appendChild(script)
}

export const enableGoogleTags = () => {
  const browserWindow = getWindow()

  if (!browserWindow || browserWindow.__stashdogGoogleTagsEnabled) {
    return
  }

  browserWindow.dataLayer = browserWindow.dataLayer || []
  browserWindow.gtag = function gtag() {
    browserWindow.dataLayer.push(arguments)
  }

  injectScript({
    id: "stashdog-google-tag-src",
    src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
  })

  browserWindow.gtag("js", new Date())
  browserWindow.gtag("config", GA_MEASUREMENT_ID)
  browserWindow.gtag("config", GOOGLE_ADS_ID)
  browserWindow.__stashdogGoogleTagsEnabled = true
}

export const enableMetaPixel = () => {
  const browserWindow = getWindow()

  if (!browserWindow || !META_PIXEL_ID || browserWindow.__stashdogMetaPixelEnabled) {
    return
  }

  injectScript({
    id: "stashdog-meta-pixel",
    content: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
  })

  browserWindow.__stashdogMetaPixelEnabled = true
}

export const enableTracking = () => {
  if (!hasTrackingConsent()) {
    return
  }

  enableGoogleTags()
  enableMetaPixel()
}

export const disableTracking = () => {
  const browserWindow = getWindow()

  if (!browserWindow) {
    return
  }

  if (typeof browserWindow.gtag === "function") {
    browserWindow.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    })
  }
}

export const openCookiePreferences = () => {
  const browserWindow = getWindow()

  if (!browserWindow) {
    return
  }

  browserWindow.dispatchEvent(new CustomEvent(TRACKING_PREFERENCES_EVENT))
}

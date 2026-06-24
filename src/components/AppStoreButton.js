import React, { useEffect, useState } from "react"
import { getAppStoreUrlForOrigin } from "../data/campaigns"

const getBrowserPathname = () => {
  if (typeof window === "undefined") return undefined
  return `${window.location.pathname}${window.location.search}`
}

const getBrowserReferrer = () => {
  if (typeof document === "undefined") return undefined
  return document.referrer
}

const AppStoreButton = ({
  onClick,
  className = "",
  style = {},
  href,
  originPath,
  utmContent = "app_store_badge",
}) => {
  const [resolvedHref, setResolvedHref] = useState(() =>
    href || getAppStoreUrlForOrigin({ pathname: originPath, utmContent })
  )

  useEffect(() => {
    if (href) {
      setResolvedHref(href)
      return
    }

    setResolvedHref(
      getAppStoreUrlForOrigin({
        pathname: originPath || getBrowserPathname(),
        referrer: getBrowserReferrer(),
        utmContent,
      })
    )
  }, [href, originPath, utmContent])

  const handleClick = (e) => {
    if (onClick) {
      onClick('ios')
    }
  }

  return (
    <a 
      href={resolvedHref}
      className={`download-badge-link ${className}`}
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Download StashDog for iOS"
      style={style}
    >
      <img 
        src="/app-store-badge.svg" 
        alt="Download on the App Store" 
        className="download-badge app-store-badge"
        loading="lazy"
      />
    </a>
  )
}

export default AppStoreButton

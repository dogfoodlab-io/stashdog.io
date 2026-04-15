import { useCallback, useEffect, useState } from 'react'

export const useFirebase = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsInitialized(true)
    }
  }, [])

  const logEvent = useCallback((eventName, parameters = {}) => {
    if (typeof window === 'undefined') {
      return
    }

    const payload = {
      ...parameters,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload)
      return
    }

    // Fallback while tags are blocked or unavailable in development.
    console.log('Analytics Event:', eventName, payload)
  }, [])

  // Remote content variants are currently disabled on the website.
  const getContentVariant = useCallback(async () => null, [])

  return {
    isInitialized,
    logEvent,
    firestore: null,
    getContentVariant,
  }
}

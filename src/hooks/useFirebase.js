import { useEffect, useState } from 'react'

export const useFirebase = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    const initFirebase = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { initializeApp } = await import('firebase/app')
          const { getAnalytics, logEvent: firebaseLogEvent } = await import('firebase/analytics')
          
          const firebaseConfig = {
            apiKey: process.env.GATSBY_FIREBASE_API_KEY,
            authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
            storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.GATSBY_FIREBASE_APP_ID,
            measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
          }
          
          const app = initializeApp(firebaseConfig)
          const analyticsInstance = getAnalytics(app)
          
          setAnalytics(analyticsInstance)
          setIsInitialized(true)
        } catch (error) {
          console.error('Firebase initialization error:', error)
        }
      }
    }
    
    initFirebase()
  }, [])

  const logEvent = (eventName, parameters = {}) => {
    if (isInitialized && analytics) {
      import('firebase/analytics').then(({ logEvent: firebaseLogEvent }) => {
        firebaseLogEvent(analytics, eventName, {
          ...parameters,
          timestamp: new Date().toISOString(),
          page_url: window.location.href
        })
      })
    } else {
      // Fallback for development
      console.log('Analytics Event:', eventName, parameters)
    }
  }

  return { isInitialized, logEvent }
}
import { useCallback, useEffect, useState } from 'react'

export const useFirebase = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [analytics, setAnalytics] = useState(null)
  const [firestore, setFirestore] = useState(null)

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
          
          // Initialize Firestore for future content storage (optional)
          try {
            const { getFirestore } = await import('firebase/firestore')
            const firestoreInstance = getFirestore(app)
            setFirestore(firestoreInstance)
          } catch (error) {
            console.log('Firestore not available:', error.message)
          }
          
          setAnalytics(analyticsInstance)
          setIsInitialized(true)
        } catch (error) {
          console.error('Firebase initialization error:', error)
        }
      }
    }
    
    initFirebase()
  }, [])

  const logEvent = useCallback((eventName, parameters = {}) => {
    if (isInitialized && analytics) {
      import('firebase/analytics').then(({ logEvent: firebaseLogEvent }) => {
        firebaseLogEvent(analytics, eventName, {
          ...parameters,
          timestamp: new Date().toISOString(),
          page_url: typeof window !== 'undefined' ? window.location.href : ''
        })
      })
    } else {
      // Fallback for development
      console.log('Analytics Event:', eventName, parameters)
    }
  }, [isInitialized, analytics])

  // Function to fetch content from Firestore (future enhancement)
  const getContentVariant = useCallback(async (variant) => {
    if (firestore) {
      try {
        const { doc, getDoc } = await import('firebase/firestore')
        const docRef = doc(firestore, 'content_variants', variant)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          return docSnap.data()
        }
      } catch (error) {
        console.log('Error fetching content from Firestore:', error)
      }
    }
    return null
  }, [firestore])

  return { 
    isInitialized, 
    logEvent, 
    firestore,
    getContentVariant 
  }
}
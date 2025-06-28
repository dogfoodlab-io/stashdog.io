import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"
import { activeStashdogStrings } from "../config"

const Footer = () => {
  const { logEvent } = useFirebase()

  const handleContactClick = () => {
    logEvent('contact_click', { page: 'homepage' })
  }

  const handlePrivacyClick = () => {
    logEvent('navigation', { destination: 'privacy', source: 'footer' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <p>{activeStashdogStrings.thank_you}</p>
        <p>
          Contact us at:{" "}
          <a 
            href="mailto:mail@dogfoodlab.io"
            onClick={handleContactClick}
          >
            mail@dogfoodlab.io
          </a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} Dogfood Lab LLC. All rights
          reserved.{" "}
          <Link 
            to="/privacy" 
            style={{ color: '#fcd900', marginLeft: '10px' }} 
            onClick={handlePrivacyClick}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
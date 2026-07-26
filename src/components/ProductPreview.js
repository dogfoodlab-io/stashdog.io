import React, { useRef } from "react"
import { Link } from "gatsby"
import { ArrowRight, Play, Volume2 } from "lucide-react"
import { useFirebase } from "../hooks/useFirebase"

const ProductPreview = () => {
  const { logEvent } = useFirebase()
  const hasLoggedPlay = useRef(false)

  const handlePlay = () => {
    if (hasLoggedPlay.current) return

    hasLoggedPlay.current = true
    logEvent("video_play", {
      video_name: "stashdog_landscape_app_preview",
      video_length_seconds: 30,
      page: "homepage",
      placement: "homepage_product_preview"
    })
  }

  const handleFeaturesClick = () => {
    logEvent("cta_click", {
      cta_type: "secondary",
      button_text: "Explore every feature",
      button_position: "homepage_product_preview",
      page: "homepage"
    })
  }

  return (
    <section className="product-preview-section" aria-labelledby="product-preview-title">
      <div className="product-preview-orbit product-preview-orbit-one" aria-hidden="true" />
      <div className="product-preview-orbit product-preview-orbit-two" aria-hidden="true" />

      <div className="container product-preview-container">
        <div className="product-preview-heading">
          <div className="product-preview-kicker">
            <Play size={15} fill="currentColor" aria-hidden="true" />
            30-second product tour
          </div>
          <h2 id="product-preview-title">
            Your house has a <span>search bar now.</span>
          </h2>
          <p>
            See how StashDog turns garages, workshops, storage units, and collections
            into one inventory you can actually search.
          </p>
        </div>

        <div className="product-preview-stage">
          <div className="product-preview-corner product-preview-corner-top" aria-hidden="true" />
          <div className="product-preview-corner product-preview-corner-bottom" aria-hidden="true" />

          <video
            className="product-preview-video"
            controls
            playsInline
            preload="metadata"
            poster="/images/product-preview/stashdog-landscape-preview-poster.jpg"
            onPlay={handlePlay}
            aria-describedby="product-preview-description"
          >
            <source
              src="/videos/stashdog-app-preview-landscape.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video. You can still explore
            StashDog’s features from the link below.
          </video>
        </div>

        <div className="product-preview-footer" id="product-preview-description">
          <div className="product-preview-details">
            <span>
              <Volume2 size={16} aria-hidden="true" />
              Natural voiceover + on-screen captions
            </span>
            <span aria-hidden="true">Search</span>
            <span aria-hidden="true">Documents</span>
            <span aria-hidden="true">Reminders</span>
            <span aria-hidden="true">Sharing</span>
            <span aria-hidden="true">Reports</span>
          </div>

          <Link
            to="/features"
            className="product-preview-link"
            onClick={handleFeaturesClick}
          >
            Explore every feature <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductPreview

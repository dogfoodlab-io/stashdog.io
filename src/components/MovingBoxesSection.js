import React from "react"
import { Link } from "gatsby"
import { PackageSearch, QrCode, Search, ArrowRight } from "lucide-react"
import { useFirebase } from "../hooks/useFirebase"

const MovingBoxesSection = () => {
  const { logEvent } = useFirebase()

  const handleCtaClick = () => {
    logEvent("cta_click", {
      cta_text: "Make my boxes searchable",
      cta_location: "moving_boxes_section",
      page: "homepage",
      experiment: "which_box_is_it_in"
    })
  }

  const steps = [
    {
      icon: <PackageSearch size={22} />,
      title: "Pack the box",
      text: "Snap what goes in before the tape goes on. No spreadsheet ritual required."
    },
    {
      icon: <QrCode size={22} />,
      title: "Label it with a QR code",
      text: "Give each box a searchable identity instead of another Sharpie mystery."
    },
    {
      icon: <Search size={22} />,
      title: "Search later",
      text: "Type “winter gloves,” “HDMI cable,” or “kid snow pants” and know which box to open."
    }
  ]

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "linear-gradient(135deg, rgba(252, 217, 0, 0.08), rgba(255,255,255,0.02))",
        borderTop: "1px solid rgba(252, 217, 0, 0.12)",
        borderBottom: "1px solid rgba(252, 217, 0, 0.12)"
      }}
    >
      <div className="container">
        <div
          className="glass-panel"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 420px)",
            gap: "2rem",
            alignItems: "center",
            borderRadius: "32px",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            border: "1px solid rgba(252, 217, 0, 0.18)"
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
                padding: "0.45rem 0.9rem",
                borderRadius: "999px",
                background: "rgba(252, 217, 0, 0.1)",
                color: "var(--color-primary)",
                fontWeight: 800,
                fontSize: "0.9rem"
              }}
            >
              <QrCode size={16} />
              Moving boxes + QR labels
            </div>

            <h2 style={{ marginBottom: "1rem", maxWidth: "720px" }}>
              Which box is it in?
            </h2>

            <p
              style={{
                marginBottom: "1.5rem",
                maxWidth: "680px",
                color: "var(--text-muted)",
                fontSize: "1.15rem",
                lineHeight: 1.7
              }}
            >
              Stop unpacking the whole cardboard labyrinth just to find one cable, coat, or kitchen gadget.
              StashDog lets you make every moving box searchable before you seal it.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                to="/searchable-moving-boxes"
                className="cta-button"
                onClick={handleCtaClick}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                Make my boxes searchable <ArrowRight size={18} />
              </Link>
              <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Free to start. No credit card required.
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "1rem"
            }}
          >
            {steps.map((step, index) => (
              <div
                key={step.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: "1rem",
                  alignItems: "start",
                  padding: "1rem",
                  borderRadius: "20px",
                  background: "rgba(0,0,0,0.18)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-primary)",
                    background: "rgba(252, 217, 0, 0.1)",
                    fontWeight: 800
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 800, marginBottom: "0.25rem" }}>
                    {index + 1}. {step.title}
                  </div>
                  <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovingBoxesSection

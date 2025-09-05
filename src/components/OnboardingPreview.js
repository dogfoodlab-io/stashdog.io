import React, { useState } from "react"
import { useFirebase } from "../hooks/useFirebase"

const OnboardingPreview = () => {
  const { logEvent } = useFirebase()
  const [activeStep, setActiveStep] = useState(null)

  const steps = [
    {
      number: 1,
      title: "Snap a photo",
      summary: "Take a quick photo of an item",
      details: ["Open the app", "Tap the camera", "Snap a clear photo"]
    },
    {
      number: 2,
      title: "AI tags it",
      summary: "Automatic recognition and suggestions",
      details: ["Auto-categorize", "Suggest location", "Add notes automatically"]
    },
    {
      number: 3,
      title: "Find it later",
      summary: "Search or ask to locate items instantly",
      details: ["Search by name or photo", "Voice search support", "Share with family"]
    }
  ]

  const toggleStep = (num) => {
    const next = activeStep === num ? null : num
    setActiveStep(next)
    logEvent && logEvent('onboarding_step_toggled', { step: num, open: next === num })
  }

  const handleGetStartedClick = () => {
    logEvent && logEvent('onboarding_get_started')
  }

  return (
    <section id="onboarding-preview" className="onboarding-preview-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How it works — in 3 painless steps</h2>
          <p className="section-subtitle">Simple flow. Fast results. No organization degree required.</p>
        </div>

        <div className="timeline">
          {steps.map((step) => (
            <div className="timeline-step" key={step.number}>
              <div className="step-card" onClick={() => toggleStep(step.number)}>
                <div className="step-left">
                  <div className="step-number">{step.number}</div>
                </div>
                <div className="step-main">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-summary">{step.summary}</p>
                </div>
                <div className="step-right">
                  <div className="expand-indicator">
                    <span className={`arrow ${activeStep === step.number ? 'expanded' : ''}`}>
                      ↓
                    </span>
                  </div>
                </div>
              </div>

              {activeStep === step.number && (
                <div className="step-details">
                  <div className="details-content">
                    <h4>What you'll do:</h4>
                    <ul className="details-list">
                      {step.details.map((detail, index) => (
                        <li key={index} className="detail-item">
                          <span className="detail-check">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {step.number < steps.length && (
                <div className="timeline-connector" />
              )}
            </div>
          ))}
        </div>

        <div className="onboarding-footer">
          <div className="footer-content">
            <p className="footer-text">
              <strong>Then sit back and enjoy never playing hide-and-seek with your stuff again.</strong>
            </p>
            <p className="footer-subtext">
              No complex systems — just take photos and let AI do the thinking.
            </p>

            <div className="footer-cta">
              <a
                href="/download"
                className="cta-button primary"
                onClick={handleGetStartedClick}
              >
                Start Your 10-Minute Transformation
              </a>
              <p className="cta-subtext">Free to try • No credit card required • Instant satisfaction guaranteed*</p>
              <p className="disclaimer">*Satisfaction not actually guaranteed, but pretty likely</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OnboardingPreview

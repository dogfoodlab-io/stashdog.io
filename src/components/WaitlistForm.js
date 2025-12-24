import React, { useState } from "react"
import { PartyPopper } from "lucide-react"
import { submitWaitlistEntry } from "../utils/api"

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    useCase: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Transform form data to match API schema
      const waitlistEntry = {
        email: formData.email,
        name: formData.name || undefined,
        country: formData.country || undefined,
        source: "waitlist_page",
        form_data: {
          use_case: formData.useCase || "",
          question: "How do you plan to use StashDog?",
          answer: formData.useCase || ""
        },
        metadata: {
          submitted_at: new Date().toISOString(),
          user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
          form_version: "1.0"
        }
      }

      // Temporary debug logging - remove after testing
      console.log('=== WAITLIST FORM SUBMISSION DEBUG ===')
      console.log('Raw form data:', formData)
      console.log('Use case value:', `"${formData.useCase}"`)
      console.log('Use case length:', formData.useCase.length)
      console.log('Full payload being sent:', JSON.stringify(waitlistEntry, null, 2))
      console.log('=======================================')

      await submitWaitlistEntry(waitlistEntry)
      setSubmitStatus('success')

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        country: "",
        useCase: ""
      })
    } catch (error) {
      console.error('Failed to submit waitlist entry:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="waitlist-form-container">
        <div className="waitlist-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PartyPopper size={48} color="var(--color-primary)" style={{ marginBottom: '1.5rem' }} />
          <h3>You're on the list!</h3>
          <p>Thanks for joining the StashDog Early Access Program. We'll be in touch soon with your exclusive access details.</p>
          <button
            className="cta-button"
            onClick={() => setSubmitStatus(null)}
          >
            Submit Another Entry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="waitlist-form-container">
      <style>{`
        .waitlist-form .form-group {
          margin-bottom: 1.25rem;
        }
        .waitlist-form label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .waitlist-form input,
        .waitlist-form textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.875rem 1rem;
          color: white;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        .waitlist-form input:focus,
        .waitlist-form textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(252, 217, 0, 0.1);
        }
        .waitlist-form input::placeholder,
        .waitlist-form textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .waitlist-submit {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1.1rem;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="waitlist-form">
        <div className="form-group">
          <label htmlFor="email">Email Address <span style={{ color: 'var(--color-primary)' }}>*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="name@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. United States"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="useCase">How will you use StashDog?</label>
          <textarea
            id="useCase"
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
            placeholder="I need to organize my..."
            rows={3}
            disabled={isSubmitting}
            style={{ resize: 'vertical', minHeight: '80px' }}
          />
        </div>

        {submitStatus === 'error' && (
          <div className="form-error" style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          className="cta-button waitlist-submit"
          disabled={isSubmitting || !formData.email}
        >
          {isSubmitting ? 'Joining...' : 'Join Early Access'}
        </button>
      </form>
    </div>
  )
}

export default WaitlistForm 
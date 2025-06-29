import React, { useState } from "react"
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
        <div className="waitlist-success">
          <h3>🎉 You're on the list!</h3>
          <p>Thanks for joining the StashDog waitlist. We'll be in touch soon with updates and early access opportunities.</p>
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
      <form onSubmit={handleSubmit} className="waitlist-form">
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
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
            placeholder="United States"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="useCase">How do you plan to use StashDog?</label>
          <textarea
            id="useCase"
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
            placeholder="Tell us about your organization challenges and how you think StashDog could help..."
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        {submitStatus === 'error' && (
          <div className="form-error">
            <p>Something went wrong. Please try again or contact support.</p>
          </div>
        )}

        <button 
          type="submit" 
          className="cta-button waitlist-submit"
          disabled={isSubmitting || !formData.email}
        >
          {isSubmitting ? 'Joining Waitlist...' : 'Join the Waitlist'}
        </button>
      </form>
    </div>
  )
}

export default WaitlistForm 
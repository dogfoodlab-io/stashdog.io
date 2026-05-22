import React, { useEffect, useState } from "react"
import { CheckCircle2, Send } from "lucide-react"
import { submitCommercialLead } from "../utils/api"
import { useFirebase } from "../hooks/useFirebase"

const getUtmAttribution = () => {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  return ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .reduce((utm, key) => {
      const value = params.get(key)
      if (value) utm[key] = value
      return utm
    }, {})
}

const getCurrentPath = () => {
  if (typeof window === "undefined") return ""
  return window.location.pathname
}

const initialFormData = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  companySize: "",
  role: "",
  useCase: "",
  message: "",
}

const CommercialLeadForm = ({
  leadType = "general_commercial",
  sourcePage = "",
  sourcePath,
  partnerType = "",
  planInterest = "",
  formLocation = "commercial_form",
  title = "Talk to StashDog",
  description = "Tell us what you want to track and we will follow up with the right next step.",
  submitLabel = "Send inquiry",
  compact = false,
}) => {
  const { isInitialized, logEvent } = useFirebase()
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const resolvedSourcePath = sourcePath || getCurrentPath()

  useEffect(() => {
    if (!isInitialized) return

    logEvent("commercial_lead_form_view", {
      lead_type: leadType,
      source_page: sourcePage,
      source_path: resolvedSourcePath,
      partner_type: partnerType,
      plan_interest: planInterest,
      form_location: formLocation,
      ...getUtmAttribution(),
    })
  }, [formLocation, isInitialized, leadType, logEvent, partnerType, planInterest, resolvedSourcePath, sourcePage])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage("")

    const eventContext = {
      lead_type: leadType,
      source_page: sourcePage,
      source_path: resolvedSourcePath,
      partner_type: partnerType,
      plan_interest: planInterest,
      form_location: formLocation,
      ...getUtmAttribution(),
    }

    if (isInitialized) {
      logEvent("commercial_lead_submit_started", eventContext)
    }

    try {
      const payload = {
        lead_type: leadType,
        source_page: sourcePage || null,
        source_path: resolvedSourcePath || null,
        partner_type: partnerType || null,
        plan_interest: planInterest || null,
        business_name: formData.businessName || null,
        contact_name: formData.contactName || null,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone || null,
        website: formData.website || null,
        company_size: formData.companySize || null,
        role: formData.role || null,
        use_case: formData.useCase || null,
        message: formData.message || null,
        utm: getUtmAttribution(),
        metadata: {
          submitted_at: new Date().toISOString(),
          user_agent: typeof window !== "undefined" ? window.navigator.userAgent : null,
          form_version: "1.0",
          form_location: formLocation,
          page_url: typeof window !== "undefined" ? window.location.href : null,
        },
      }

      await submitCommercialLead(payload)
      setSubmitStatus("success")
      setFormData(initialFormData)

      if (isInitialized) {
        logEvent("commercial_lead_submit_success", eventContext)
      }
    } catch (error) {
      console.error("Failed to submit commercial lead:", error)
      setSubmitStatus("error")
      setErrorMessage("Something went wrong. Please try again or email partners@stashdog.io.")

      if (isInitialized) {
        logEvent("commercial_lead_submit_error", {
          ...eventContext,
          error_message: error instanceof Error ? error.message : "Unknown error",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className={`commercial-lead-form glass-panel ${compact ? "compact" : ""}`}>
        <div className="commercial-lead-success">
          <CheckCircle2 size={42} />
          <h3>Inquiry received</h3>
          <p>Thanks. We will review the details and follow up with the best next step for your workflow.</p>
          <button type="button" className="cta-button outline" onClick={() => setSubmitStatus(null)}>
            Submit another inquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className={`commercial-lead-form glass-panel ${compact ? "compact" : ""}`} onSubmit={handleSubmit}>
      <div className="commercial-lead-heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="commercial-form-grid">
        <label>
          Business name
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Company or organization"
            disabled={isSubmitting}
          />
        </label>
        <label>
          Your name
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Jane Smith"
            disabled={isSubmitting}
          />
        </label>
        <label>
          Work email <span>*</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            required
            disabled={isSubmitting}
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Optional"
            disabled={isSubmitting}
          />
        </label>
        <label>
          Website
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://"
            disabled={isSubmitting}
          />
        </label>
        <label>
          Team size
          <select name="companySize" value={formData.companySize} onChange={handleChange} disabled={isSubmitting}>
            <option value="">Select one</option>
            <option value="solo">Solo</option>
            <option value="2-5">2-5</option>
            <option value="6-20">6-20</option>
            <option value="21-100">21-100</option>
            <option value="100+">100+</option>
          </select>
        </label>
      </div>

      <label>
        Role
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Owner, operations, partnerships, etc."
          disabled={isSubmitting}
        />
      </label>

      <label>
        What do you want to track?
        <input
          type="text"
          name="useCase"
          value={formData.useCase}
          onChange={handleChange}
          placeholder="Tools, boxes, event gear, storage units, customer kits..."
          disabled={isSubmitting}
        />
      </label>

      <label>
        Notes
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about the workflow, number of users, partner idea, or pilot you want to run."
          rows={4}
          disabled={isSubmitting}
        />
      </label>

      {submitStatus === "error" && <p className="commercial-form-error">{errorMessage}</p>}

      <button type="submit" className="cta-button commercial-submit" disabled={isSubmitting || !formData.email}>
        <Send size={17} />
        {isSubmitting ? "Sending..." : submitLabel}
      </button>
    </form>
  )
}

export default CommercialLeadForm

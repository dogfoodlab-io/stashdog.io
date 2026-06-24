import React from "react"
import { Link } from "gatsby"
import { ArrowRight } from "lucide-react"
import AppStoreButton from "./AppStoreButton"

const CampaignCta = ({
  eyebrow,
  title,
  body,
  appStoreHref,
  secondaryHref,
  secondaryLabel,
  onAppStoreClick,
  className = "",
}) => (
  <aside className={`campaign-cta glass-panel ${className}`.trim()}>
    {eyebrow && <div className="campaign-cta-eyebrow">{eyebrow}</div>}
    <h2>{title}</h2>
    <p>{body}</p>
    <div className="campaign-cta-actions">
      <AppStoreButton href={appStoreHref} onClick={onAppStoreClick} />
      {secondaryHref && secondaryLabel && (
        <Link to={secondaryHref} className="campaign-cta-link">
          {secondaryLabel} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  </aside>
)

export default CampaignCta

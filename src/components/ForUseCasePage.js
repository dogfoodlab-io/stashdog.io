import React from "react"
import { Link } from "gatsby"
import AiSeoPageLayout from "./AiSeoPageLayout"
import CommercialLeadForm from "./CommercialLeadForm"
import { getIcpAppStoreUrl, getIcpCampaign } from "../data/campaigns"
import { forUseCases } from "../data/forUseCases"

const author = { name: "StashDog Editorial Team", role: "Dogfood Lab LLC" }
const updatedAt = "2026-05-12"

const baseRelatedLinks = [
  {
    to: "/features",
    label: "Explore Features",
    description: "See the photo, search, sharing, and location tools behind these workflows.",
  },
  {
    to: "/download",
    label: "Download StashDog",
    description: "Start capturing the items you already know you need to track.",
  },
  {
    to: "/pricing",
    label: "Compare Pricing",
    description: "Check whether the free plan or a paid plan fits the size of the inventory.",
  },
]

const wedgeAnalyticsBySlug = {
  resellers: {
    wedge_key: "resellers",
    experiment_variant: "resellers",
    utm_campaign: "wedge_resellers_search_smoke",
  },
  contractors: {
    wedge_key: "contractors",
    experiment_variant: "contractors",
    utm_campaign: "wedge_contractors_search_smoke",
  },
  landlords: {
    wedge_key: "landlords",
    experiment_variant: "landlords",
    utm_campaign: "wedge_landlords_search_smoke",
  },
}

const commercialLeadSlugs = new Set([
  "resellers",
  "contractors",
  "landlords",
  "event-businesses",
  "community-organizations",
  "workshops",
  "storage-units",
])

const ForUseCasePage = ({ page }) => {
  const useCaseLabel = page.slug.replace(/-/g, " ")
  const campaign = getIcpCampaign(page.slug)
  const isCommercialLeadPage = commercialLeadSlugs.has(page.slug)
  const firstTrackItems = [
    "High-value items that would be expensive to replace.",
    "Items stored away from daily view in bins, closets, garages, or storage units.",
    "Documents, receipts, warranties, serial numbers, or manuals tied to physical items.",
    "Shared items that other people ask about or need to find without you.",
  ]

  const relatedLinks = [
    {
      to: "/for/",
      label: "All Use Cases",
      description: "Compare the other ways people use StashDog to track physical stuff.",
    },
    ...baseRelatedLinks,
  ]

  const faq = [
    {
      question: `Can StashDog work for ${useCaseLabel}?`,
      answer: page.directAnswer,
    },
    {
      question: "Do I need to organize everything perfectly first?",
      answer:
        "No. StashDog works best when you capture items, bins, rooms, or storage spots as they are. You can add more detail later.",
    },
    {
      question: "Can I use photos and locations together?",
      answer:
        "Yes. StashDog is designed around item photos, notes, tags, containers, and locations so retrieval does not depend on memory.",
    },
    {
      question: "How is this different from a spreadsheet?",
      answer:
        "A spreadsheet can track rows, but StashDog keeps photos, locations, containers, documents, sharing, and search together in the same item record.",
    },
    {
      question: "What should I capture first?",
      answer:
        "Start with the items that are expensive, hard to replace, shared with other people, stored out of sight, or repeatedly rebought because they are hard to find.",
    },
  ]

  const analyticsContext = campaign
    ? {
        wedge_key: page.slug,
        experiment_variant: page.slug,
        campaign_id: campaign.campaignId,
        meta_campaign_name: campaign.metaCampaignName,
        utm_campaign: campaign.utm.utm_campaign,
      }
    : wedgeAnalyticsBySlug[page.slug]

  const howToSteps = (page.setupSteps || []).map((step, index) => ({
    name: `Step ${index + 1}`,
    text: step,
  }))

  return (
    <AiSeoPageLayout
      title={page.title}
      metaTitle={page.metaTitle}
      metaDescription={page.metaDescription}
      canonicalPath={`/for/${page.slug}/`}
      pagePath={`/for/${page.slug}`}
      heroLabel="Use Case"
      heroImageSrc={page.heroImageSrc}
      heroImageAlt={page.heroImageAlt}
      intro={page.intro}
      directAnswer={page.directAnswer}
      author={author}
      updatedAt={updatedAt}
      faq={faq}
      relatedLinks={relatedLinks}
      itemList={firstTrackItems}
      howToSteps={howToSteps}
      analyticsContext={analyticsContext}
      appStoreHref={campaign ? getIcpAppStoreUrl(page.slug, `${page.slug}_landing_app_store_badge`) : null}
    >
      {page.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.list && (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {page.roiBullets?.length > 0 && (
        <section>
          <h2>Where the Money Leaks</h2>
          <p>
            This page is built around the moments where poor visibility turns into real cost: duplicate purchases,
            lost assets, delayed retrieval, and records that are missing when they matter.
          </p>
          <ul>
            {page.roiBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {page.setupSteps?.length > 0 && (
        <section>
          <h2>Setup Workflow</h2>
          <ol>
            {page.setupSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2>What to Track First</h2>
        <p>
          The fastest StashDog setup is not a perfect inventory. It is a useful inventory that starts
          with the items most likely to cost time, money, or stress when they go missing.
        </p>
        <ul>
          {firstTrackItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Choosing a Tool for {useCaseLabel}</h2>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Works When</th>
              <th>Breaks When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Memory</td>
              <td>Only one person owns the items and the inventory is tiny.</td>
              <td>Items move, helpers need access, or replacement cost matters.</td>
            </tr>
            <tr>
              <td>Spreadsheet</td>
              <td>You mostly need a simple list and can keep it updated manually.</td>
              <td>Photos, documents, containers, and shared retrieval become the real work.</td>
            </tr>
            <tr>
              <td>StashDog</td>
              <td>You need searchable photos, locations, tags, containers, documents, and sharing in one place.</td>
              <td>You need heavy enterprise purchasing, barcode warehouse operations, or accounting-native inventory.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>How StashDog Helps</h2>
        <div className="for-feature-grid">
          <div className="for-feature-card glass-panel">
            <h3>Photos</h3>
            <p>Capture what the item, box, kit, or shelf looks like before details fade.</p>
          </div>
          <div className="for-feature-card glass-panel">
            <h3>Locations</h3>
            <p>Connect belongings to rooms, bins, units, properties, vehicles, or storage spots.</p>
          </div>
          <div className="for-feature-card glass-panel">
            <h3>Search</h3>
            <p>Find items by what they are, where they are, or the words you remember later.</p>
          </div>
          <div className="for-feature-card glass-panel">
            <h3>Sharing</h3>
            <p>Let the right people find shared items without turning one person into the inventory desk.</p>
          </div>
        </div>
      </section>

      {isCommercialLeadPage && (
        <section id="commercial-lead">
          <h2>Need StashDog for a Team or Commercial Workflow?</h2>
          <p>
            Tell us what you need to track, how many people or locations are involved, and whether this is for internal operations or a customer-facing program.
          </p>
          <CommercialLeadForm
            leadType="business_use_case"
            sourcePage={page.slug}
            sourcePath={`/for/${page.slug}/`}
            partnerType={useCaseLabel}
            formLocation="for_use_case_page"
            title={`Commercial setup for ${useCaseLabel}`}
            description="Use this for team inventory, multi-location workflows, partner kits, or business pilots."
            submitLabel="Send commercial inquiry"
          />
        </section>
      )}

      <section>
        <h2>Where to Go Next</h2>
        <p>
          If this use case sounds close, compare the full <Link to="/features">StashDog feature set</Link>,
          check <Link to="/pricing">current pricing</Link>, or start with the <Link to="/download">download page</Link>.
        </p>
      </section>

      <section>
        <h2>Other StashDog Use Cases</h2>
        <div className="for-use-case-grid">
          {forUseCases
            .filter((item) => item.slug !== page.slug)
            .slice(0, 6)
            .map((item) => (
              <Link key={item.slug} to={`/for/${item.slug}/`} className="for-use-case-card glass-panel">
                <img src={item.heroImageSrc} alt="" loading="lazy" />
                <span>{item.title}</span>
              </Link>
            ))}
        </div>
      </section>
    </AiSeoPageLayout>
  )
}

export default ForUseCasePage

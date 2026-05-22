import React from "react"
import { Link } from "gatsby"
import AiSeoPageLayout from "../../components/AiSeoPageLayout"
import { forOverview, forUseCases } from "../../data/forUseCases"

const ForIndexPage = () => (
  <AiSeoPageLayout
    title={forOverview.title}
    metaTitle={forOverview.metaTitle}
    metaDescription={forOverview.metaDescription}
    canonicalPath="/for/"
    pagePath="/for"
    heroLabel="Use Cases"
    heroImageSrc={forOverview.heroImageSrc}
    heroImageAlt={forOverview.heroImageAlt}
    intro={forOverview.intro}
    directAnswer={forOverview.directAnswer}
    author={{ name: "StashDog Editorial Team", role: "Dogfood Lab LLC" }}
    updatedAt="2026-05-12"
    relatedLinks={[
      {
        to: "/features",
        label: "Explore Features",
        description: "See the product capabilities behind the use cases.",
      },
      {
        to: "/solutions",
        label: "StashDog Solutions",
        description: "Read the broader organization philosophy behind StashDog.",
      },
      {
        to: "/pricing",
        label: "Pricing",
        description: "See the plan options for personal and shared inventories.",
      },
      {
        to: "/download",
        label: "Download",
        description: "Start building a searchable inventory from your phone.",
      },
    ]}
    faq={[
      {
        question: "What is StashDog for?",
        answer:
          "StashDog is for tracking physical belongings that need photos, locations, notes, search, and sharing instead of another fragile spreadsheet.",
      },
      {
        question: "Can StashDog handle both home and business use cases?",
        answer:
          "Yes. StashDog is useful for household inventory, collections, storage units, and lightweight business inventory where finding physical items matters.",
      },
    ]}
  >
    <section>
      <h2>Choose Your Use Case</h2>
      <p>
        Different people lose track of different things. The pattern is the same:
        valuable physical stuff gets spread across rooms, bins, shelves, closets,
        vehicles, properties, and storage spaces. StashDog makes those things searchable.
      </p>
      <div className="for-use-case-grid">
        {forUseCases.map((item) => (
          <Link key={item.slug} to={`/for/${item.slug}/`} className="for-use-case-card glass-panel">
            <img src={item.heroImageSrc} alt="" loading="lazy" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  </AiSeoPageLayout>
)

export default ForIndexPage

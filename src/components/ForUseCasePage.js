import React from "react"
import { Link } from "gatsby"
import AiSeoPageLayout from "./AiSeoPageLayout"
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
]

const ForUseCasePage = ({ page }) => {
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
      question: `Can StashDog work for ${page.slug.replace(/-/g, " ")}?`,
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
  ]

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

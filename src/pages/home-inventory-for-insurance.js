import React from "react"
import { Link } from "gatsby"
import AiSeoPageLayout from "../components/AiSeoPageLayout"

const evidence = [
  {
    value: "Every room",
    title: "Insurance inventories should be comprehensive",
    description:
      "NAIC guidance recommends going through every room and documenting belongings before a disaster happens, not only listing obvious valuables.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Photos",
    title: "Visual proof matters",
    description:
      "The NAIC recommends documenting valuables with photos or video so a claim record is not forced to depend on memory alone.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Annual",
    title: "Inventories need updates",
    description:
      "The NAIC recommends reviewing and updating a home inventory annually and whenever new items are purchased.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
]

const faq = [
  {
    question: "What should be in a home inventory for insurance?",
    answer:
      "Include item names, photos, rooms or storage locations, purchase details, receipts, serial numbers, model numbers, appraisals, condition notes, and anything that would help prove ownership or replacement value.",
  },
  {
    question: "Is a home inventory useful for renters insurance?",
    answer:
      "Yes. Renters still need to document personal property such as furniture, electronics, clothing, tools, sports gear, jewelry, and stored belongings if they ever need to support a claim.",
  },
  {
    question: "How often should I update an insurance inventory?",
    answer:
      "Review it at least once a year and update it after major purchases, moves, renovations, collection changes, or any event that changes what you own or where it lives.",
  },
  {
    question: "Can StashDog replace a spreadsheet for insurance records?",
    answer:
      "Yes. StashDog is a better fit when you want photos, item details, receipts, serial numbers, locations, and shared access tied to the same searchable item record.",
  },
]

const relatedLinks = [
  {
    to: "/home-inventory-checklist",
    label: "Home Inventory Checklist",
    description: "Use a room-by-room checklist to decide what to document first.",
  },
  {
    to: "/how-to-create-a-home-inventory",
    label: "How to Create a Home Inventory",
    description: "Follow the full setup workflow for insurance, moving, and daily retrieval.",
  },
  {
    to: "/for/home-insurance",
    label: "Insurance Use Case",
    description: "See how StashDog supports homeowners and renters insurance workflows.",
  },
  {
    to: "/pricing",
    label: "Pricing",
    description: "Check current Free, Plus, and Pro / Team plan details.",
  },
]

const howToSteps = [
  {
    name: "Start with high-value rooms",
    text: "Document bedrooms, living areas, offices, garages, and storage spaces before low-value clutter.",
  },
  {
    name: "Photograph the item and identifiers",
    text: "Capture the item, condition, model number, serial number, receipt, appraisal, or warranty detail when available.",
  },
  {
    name: "Record location and ownership context",
    text: "Save the room, container, storage unit, or shelf where the item lives, plus any notes that would matter during a claim.",
  },
  {
    name: "Share or export the record",
    text: "Make sure the inventory is accessible outside your own memory and available when a claim, move, or emergency happens.",
  },
]

const HomeInventoryInsurancePage = () => (
  <AiSeoPageLayout
    title="Home Inventory App for Insurance Claims and Personal Property Records"
    metaTitle="Home Inventory App for Insurance Claims | StashDog"
    metaDescription="Create a home inventory for insurance with photos, receipts, serial numbers, item locations, and searchable personal property records before a theft, fire, flood, or move."
    canonicalPath="/home-inventory-for-insurance/"
    pagePath="/home-inventory-for-insurance"
    heroLabel="Insurance Inventory"
    heroImageSrc="/images/ai-seo-home-inventory-guide-hero.png"
    heroImageAlt="Home inventory records with photos, receipts, and insurance documentation"
    intro="Insurance inventories are easiest to build before something happens. The point is not perfection; the point is having enough proof, context, and access that you are not rebuilding your life from memory."
    directAnswer="A home inventory for insurance should document what you own, where it lives, what it looks like, and what proof supports ownership or replacement value. StashDog helps by keeping photos, receipts, serial numbers, notes, and storage locations tied to searchable item records."
    author={{ name: "StashDog Editorial Team", role: "Dogfood Lab LLC" }}
    updatedAt="2026-07-08"
    evidence={evidence}
    faq={faq}
    relatedLinks={relatedLinks}
    howToSteps={howToSteps}
  >
    <section>
      <h2>What Makes an Inventory Insurance-Ready</h2>
      <p>
        An insurance-ready inventory is more than a list of expensive things. It connects the item, the photo, the location, and the proof that would help someone understand what was lost or damaged.
      </p>
      <table>
        <thead>
          <tr>
            <th>Record</th>
            <th>Why it helps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Photos or video</td>
            <td>Shows condition, existence, and identifying details.</td>
          </tr>
          <tr>
            <td>Receipts or values</td>
            <td>Supports replacement-cost and ownership context.</td>
          </tr>
          <tr>
            <td>Serial and model numbers</td>
            <td>Helps identify electronics, appliances, tools, and gear.</td>
          </tr>
          <tr>
            <td>Storage location</td>
            <td>Shows where the item lived before a move, theft, or loss.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Use StashDog Before the Claim</h2>
      <p>
        The hardest time to build an inventory is after a fire, theft, flood, or major move. Use StashDog while the item is in front of you, then improve the record over time as receipts, appraisals, warranties, or serial numbers become available.
      </p>
      <p>
        If you are starting from zero, use the <Link to="/home-inventory-checklist">home inventory checklist</Link> first and then read the broader <Link to="/how-to-create-a-home-inventory">home inventory setup guide</Link>.
      </p>
    </section>
  </AiSeoPageLayout>
)

export default HomeInventoryInsurancePage

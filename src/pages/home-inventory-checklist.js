import React from "react"
import { Link } from "gatsby"
import AiSeoPageLayout from "../components/AiSeoPageLayout"

const evidence = [
  {
    value: "Room by room",
    title: "A checklist should follow the home",
    description:
      "NAIC guidance recommends going through every room, which makes a room-by-room checklist the clearest way to start.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Photos",
    title: "Checklist items need proof",
    description:
      "Photos or video are especially useful for valuables and belongings that would be hard to describe from memory after a loss.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Update",
    title: "A checklist is a living record",
    description:
      "The best inventory checklist gets revisited after purchases, moves, cleanouts, or storage changes.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
]

const faq = [
  {
    question: "What should I put on a home inventory checklist?",
    answer:
      "Include furniture, electronics, appliances, tools, jewelry, collectibles, documents, clothing, sports gear, seasonal items, storage boxes, and anything with meaningful replacement value.",
  },
  {
    question: "Should I inventory every item in my home?",
    answer:
      "Eventually, more coverage is better, but start with high-value, hard-to-replace, or often-lost items. A useful first pass is better than an abandoned perfect plan.",
  },
  {
    question: "What fields should each checklist item include?",
    answer:
      "Record item name, photo, room or storage location, estimated value, receipt or proof, model or serial number, condition, and notes.",
  },
  {
    question: "Can I use this checklist for moving too?",
    answer:
      "Yes. Add box, bin, destination room, priority, fragile status, and unpacking notes to turn the home inventory checklist into a moving checklist.",
  },
]

const relatedLinks = [
  {
    to: "/home-inventory-for-insurance",
    label: "Insurance Inventory",
    description: "Turn the checklist into a claim-ready record.",
  },
  {
    to: "/how-to-create-a-home-inventory",
    label: "Full Setup Guide",
    description: "Use the checklist inside a repeatable inventory workflow.",
  },
  {
    to: "/moving-inventory-app",
    label: "Moving Inventory",
    description: "Adapt the checklist for boxes, bins, and unpacking.",
  },
  {
    to: "/download",
    label: "Download StashDog",
    description: "Capture checklist items directly in a searchable app.",
  },
]

const howToSteps = [
  {
    name: "Choose one area",
    text: "Start with a room, closet, garage zone, storage unit, or box category.",
  },
  {
    name: "Capture important items first",
    text: "Prioritize valuables, electronics, tools, documents, collections, and hard-to-replace items.",
  },
  {
    name: "Add proof and location",
    text: "Attach photos, receipts, serial numbers, and the exact room, box, shelf, or container location.",
  },
  {
    name: "Repeat monthly or quarterly",
    text: "Refresh the inventory after purchases, moves, cleanouts, or storage changes.",
  },
]

const HomeInventoryChecklistPage = () => (
  <AiSeoPageLayout
    title="Home Inventory Checklist: What to Document Room by Room"
    metaTitle="Home Inventory Checklist for Insurance, Moving, and Storage | StashDog"
    metaDescription="Use this home inventory checklist to document rooms, boxes, photos, receipts, values, serial numbers, storage locations, and insurance-ready personal property records."
    canonicalPath="/home-inventory-checklist/"
    pagePath="/home-inventory-checklist"
    heroLabel="Checklist"
    heroImageSrc="/images/ai-seo-home-inventory-guide-hero.png"
    heroImageAlt="Room-by-room home inventory checklist"
    intro="A home inventory checklist should be simple enough to start today and structured enough to help during a claim, move, or storage search."
    directAnswer="A useful home inventory checklist should cover every major room and storage area, then capture each important item's photo, name, location, estimated value, receipt, serial number, and notes. Start with valuables and hard-to-replace belongings before expanding to lower-value everyday items."
    author={{ name: "StashDog Editorial Team", role: "Dogfood Lab LLC" }}
    updatedAt="2026-07-08"
    evidence={evidence}
    faq={faq}
    relatedLinks={relatedLinks}
    howToSteps={howToSteps}
    itemList={["Living room", "Bedrooms", "Kitchen", "Garage", "Storage units", "Boxes and bins"]}
  >
    <section>
      <h2>Core Checklist Fields</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Use it for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item name</td>
            <td>Search and identification.</td>
          </tr>
          <tr>
            <td>Photo</td>
            <td>Visual proof and faster recognition.</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>Room, closet, shelf, storage unit, box, or bin.</td>
          </tr>
          <tr>
            <td>Value or receipt</td>
            <td>Insurance, replacement, and budgeting context.</td>
          </tr>
          <tr>
            <td>Model or serial number</td>
            <td>Electronics, appliances, tools, bikes, and gear.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Room-by-Room Checklist</h2>
      <h3>Living areas</h3>
      <p>Furniture, TVs, speakers, game consoles, art, rugs, lamps, decor, books, and media equipment.</p>
      <h3>Bedrooms and closets</h3>
      <p>Clothing, jewelry, watches, bags, shoes, furniture, electronics, documents, and stored seasonal items.</p>
      <h3>Kitchen and dining</h3>
      <p>Appliances, cookware, specialty tools, dishes, glassware, small electronics, and heirloom pieces.</p>
      <h3>Garage, attic, basement, and shed</h3>
      <p>Tools, bikes, sports gear, lawn equipment, holiday decor, storage bins, spare parts, and project supplies.</p>
      <h3>Offsite storage</h3>
      <p>Boxes, bins, furniture, archives, seasonal gear, business supplies, collections, and anything you would forget after six months.</p>
    </section>

    <section>
      <h2>Turn the Checklist Into a Searchable Record</h2>
      <p>
        A checklist is the starting point. The durable system is the searchable record that ties the checklist item to photos, locations, and proof. That is where <Link to="/download">StashDog</Link> is more useful than a one-time document.
      </p>
    </section>
  </AiSeoPageLayout>
)

export default HomeInventoryChecklistPage

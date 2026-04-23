import React from "react"
import { Link } from "gatsby"
import AiSeoPageLayout from "../components/AiSeoPageLayout"

const evidence = [
  {
    value: "Damaged property",
    title: "Claims start with a list",
    description:
      "NAIC homeowners-claim guidance says you will need a list of damaged property, plus photos and videos, when you file a claim after a covered loss.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Every room",
    title: "NAIC recommends room-by-room documentation",
    description:
      "The NAIC advises going through every room, inventorying everything, and documenting valuables with photos or video before a disaster happens.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Annual",
    title: "Update cadence matters",
    description:
      "The same NAIC guidance recommends reviewing and updating your inventory annually and whenever you buy new items.",
    sourceLabel: "NAIC homeowners claim guidance",
    sourceUrl: "https://content.naic.org/article/what-you-need-know-when-filing-homeowners-claim",
  },
  {
    value: "Photos + export",
    title: "Home inventory tools need proof built in",
    description:
      "NAIC's own home inventory app emphasizes grouping belongings, exporting photos, and reviewing claim information. Those are the features that make a record useful later.",
    sourceLabel: "NAIC home inventory app article",
    sourceUrl: "https://content.naic.org/article/naic-home-inventory-app-downloads-ticking",
  },
]

const faq = [
  {
    question: "What should be included in a home inventory?",
    answer:
      "Include the item name, a short description, photos, where it is stored, approximate value or receipt information, model or serial numbers when relevant, and any notes that would matter during a move or claim.",
  },
  {
    question: "How long does it take to create a home inventory?",
    answer:
      "A useful first version usually takes one focused afternoon if you start with high-value rooms and categories. You do not need to catalog your entire life in one sitting to get meaningful value.",
  },
  {
    question: "Is a spreadsheet okay for a home inventory?",
    answer:
      "It can work, but it becomes brittle once photos, changing storage locations, receipts, and multiple household members enter the picture. Apps are usually easier to keep current.",
  },
  {
    question: "How often should I update my home inventory?",
    answer:
      "At minimum, review it once a year. Update it sooner after major purchases, moves, renovations, or any event that changes what you own or where it lives.",
  },
]

const relatedLinks = [
  {
    to: "/moving-inventory-app",
    label: "Moving Inventory App",
    description: "Use the same inventory workflow for boxes, bins, and unpacking.",
  },
  {
    to: "/home-inventory-app-vs-spreadsheet",
    label: "Home Inventory App vs Spreadsheet",
    description: "See the tradeoffs before you commit to the wrong setup method.",
  },
  {
    to: "/sortly-alternative-for-home-use",
    label: "Sortly Alternative for Home Use",
    description: "Compare home-first and business-first inventory products.",
  },
  {
    to: "/download",
    label: "Download StashDog",
    description: "Start building your inventory immediately on iPhone or Android.",
  },
]

const howToSteps = [
  {
    name: "Choose your tool",
    text: "Pick an inventory method that can store photos, locations, and notes without creating manual upkeep you will abandon.",
  },
  {
    name: "Start with high-value rooms",
    text: "Begin with bedrooms, living spaces, offices, kitchens, and any area that contains expensive or hard-to-replace items.",
  },
  {
    name: "Photograph and name items",
    text: "Capture clear photos, record useful identifiers, and give each item a recognizable name.",
  },
  {
    name: "Add location and proof",
    text: "Record where the item lives, plus receipts, serial numbers, warranty details, or replacement-value notes when relevant.",
  },
  {
    name: "Share and update it",
    text: "Store the inventory somewhere accessible, share it with the household if needed, and revisit it after major purchases or moves.",
  },
]

const HomeInventoryGuidePage = () => (
  <AiSeoPageLayout
    title="How to Create a Home Inventory for Insurance, Moving, and Daily Life"
    metaTitle="How to Create a Home Inventory for Insurance, Moving, and Daily Life"
    metaDescription="A practical step-by-step guide to creating a home inventory for insurance, moving, and everyday organization, including what to document and whether an app beats a spreadsheet."
    canonicalPath="/how-to-create-a-home-inventory/"
    pagePath="/how-to-create-a-home-inventory"
    heroLabel="Flagship Guide"
    heroImageSrc="/images/ai-seo-home-inventory-guide-hero.png"
    heroImageAlt="Illustration for how to create a home inventory"
    intro="A home inventory sounds boring right up until you need it. Then it becomes the fastest way to prove what you own, find what you packed, or stop buying duplicates of things already sitting in storage."
    directAnswer="To create a home inventory, document your belongings room by room, attach photos and useful details, record where each item lives, and store the record somewhere accessible outside your own memory. An app usually works better than a spreadsheet because photos, locations, receipts, and updates stay tied to the item."
    author={{ name: "StashDog Editorial Team", role: "Dogfood Lab LLC" }}
    updatedAt="2026-04-22"
    evidence={evidence}
    faq={faq}
    relatedLinks={relatedLinks}
    howToSteps={howToSteps}
  >
    <section>
      <h2>What a Home Inventory Actually Is</h2>
      <p>
        A home inventory is a structured record of what you own. At minimum, it should tell you what the item is, what it looks like, where it lives, and what proof you have that it belongs to you.
      </p>
      <p>
        That record becomes useful in three recurring situations:
      </p>
      <ul>
        <li>Insurance claims, when you need evidence instead of memory.</li>
        <li>Moving, when you need to know what is in each box and where it should land.</li>
        <li>Daily life, when you simply want to find things faster.</li>
      </ul>
    </section>

    <section>
      <h2>What to Document for Each Item</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item name</td>
            <td>Makes search practical later.</td>
          </tr>
          <tr>
            <td>Photo or short video</td>
            <td>Provides fast visual proof for claims, moves, and everyday retrieval.</td>
          </tr>
          <tr>
            <td>Storage location</td>
            <td>Turns the inventory into a retrieval system instead of a static list.</td>
          </tr>
          <tr>
            <td>Approximate value or receipt</td>
            <td>Helps with claims, budgeting, and replacement decisions.</td>
          </tr>
          <tr>
            <td>Model or serial number</td>
            <td>Useful for electronics, appliances, tools, and warranty support.</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>Capture condition, purchase date, shared access, or related documents.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>The 5-Step Process</h2>
      <h3>1. Decide on your tool first</h3>
      <p>
        Do not start by walking room to room with no system. Decide whether you are using a spreadsheet or an app before you document your first item.
      </p>

      <h3>2. Start where the value is highest</h3>
      <p>
        Begin with electronics, jewelry, appliances, office gear, tools, or collectibles. You can document junk drawers later. Early wins matter more than total coverage.
      </p>

      <h3>3. Photograph everything while it is visible</h3>
      <p>
        Capture the item, its condition, and any model or serial details that would matter later. If a receipt is nearby, attach that too.
      </p>

      <h3>4. Add location and context immediately</h3>
      <p>
        If you skip location during setup, you will end up with a list that proves ownership but does not help you find anything.
      </p>

      <h3>5. Store it somewhere the disaster cannot take it</h3>
      <p>
        The NAIC explicitly warns against keeping the only copy of your inventory inside the same home. Cloud storage or an externally accessible record is the safe default.
      </p>
    </section>

    <section>
      <h2>Spreadsheet vs App</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Spreadsheet</th>
            <th>Inventory app</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fast to start</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Photos attached to item records</td>
            <td>Clunky</td>
            <td>Native</td>
          </tr>
          <tr>
            <td>Location tracking</td>
            <td>Manual</td>
            <td>Built for it</td>
          </tr>
          <tr>
            <td>Household collaboration</td>
            <td>Easy to break</td>
            <td>Usually cleaner</td>
          </tr>
          <tr>
            <td>Long-term upkeep</td>
            <td>Usually poor</td>
            <td>Usually better</td>
          </tr>
        </tbody>
      </table>
      <p>
        If the goal is simply to prove ownership for a few valuables, a spreadsheet can survive. If the goal is to use the inventory weekly for moving, storage, or retrieval, an app is almost always worth it.
      </p>
    </section>

    <section>
      <h2>Common Mistakes</h2>
      <ul>
        <li>Starting with low-value clutter instead of high-value rooms.</li>
        <li>Capturing names but not photos.</li>
        <li>Saving receipts separately from the item record.</li>
        <li>Skipping storage location details.</li>
        <li>Never updating the inventory after a move or purchase.</li>
      </ul>
      <p>
        If you want the setup process to stay lightweight, start with <Link to="/download">StashDog</Link> and document the rooms that would hurt the most to recreate from memory.
      </p>
    </section>
  </AiSeoPageLayout>
)

export default HomeInventoryGuidePage
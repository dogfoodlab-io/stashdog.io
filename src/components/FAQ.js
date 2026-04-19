import React, { useState } from "react"
import { useFirebase } from "../hooks/useFirebase"

const FAQ = () => {
  const { logEvent } = useFirebase()
  const [openFAQ, setOpenFAQ] = useState(0)

  const handleFAQClick = (questionIndex) => {
    logEvent('faq_interaction', {
      question_index: questionIndex,
      action: openFAQ === questionIndex ? 'close' : 'open'
    })
    setOpenFAQ(openFAQ === questionIndex ? null : questionIndex)
  }

  const faqs = [
    {
      question: "What is StashDog?",
      answer:
        "StashDog is a home inventory app that helps you catalog what you own, save where it lives, and find it fast later. Instead of relying on memory, random notes, or spreadsheets, you can search your stuff like a database."
    },
    {
      question: "Who is it for?",
      answer:
        "StashDog is best for people who keep things in closets, bins, garages, basements, storage units, shared spaces, or moving boxes and want an easier way to find them later. It's especially useful for families, movers, collectors, roommates, hosts, and anyone managing a lot of household gear."
    },
    {
      question: "How does it work?",
      answer:
        "Add an item with a photo, give it a name or details, and save where it lives. You can organize by room, bin, shelf, tag, or collection, then search by item, location, or keyword when you need something back."
    },
    {
      question: "Why not just use notes or a spreadsheet?",
      answer:
        "You can, but most people stop maintaining those systems because they're tedious, don't accurately model real-life relationships between items, and are hard to share. StashDog is built specifically for item-plus-location tracking, which makes it much easier to keep useful over time."
    },
    {
      question: "How much does it cost?",
      answer:
        "StashDog is free for up to 100 items. Paid plans unlock more items, more photos, and premium features, and you can upgrade only if the app becomes useful enough to justify it."
    },
    {
      question: "Can I share it with family or roommates?",
      answer:
        "Yes. You can share items and collections with family members, roommates, guests, or helpers so everyone can see what exists and where it belongs without asking the same questions over and over."
    },
    {
      question: "Will this actually help me get organized?",
      answer:
        "StashDog won't clean your house for you, but it does remove the biggest frustration: not knowing what you have or where it is. When retrieval gets easier, staying organized becomes much more practical."
    },
    {
      question: "Is it useful for moving?",
      answer:
        "Yes. It's one of the strongest use cases. Track what goes into each box, tag items by room or priority, and search digitally instead of opening every container when you need one specific thing."
    },
    {
      question: "What about privacy?",
      answer:
        "Your inventory belongs to you. StashDog uses secure storage and lets you control who can see shared collections. We don't sell your information or turn your household inventory into ad fodder."
    },
    {
      question: "What happens if I cancel?",
      answer:
        "If you cancel a paid plan, you keep access to the free tier. If you have more than the free limit, your extra items remain visible in read-only mode until you upgrade again or reduce the count."
    }
  ]

  return (
    <section className="faq-section" style={{ padding: '4rem 0', backgroundColor: 'rgba(252, 217, 0, 0.05)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: '#fcd900', fontSize: '2.5rem', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#e0e0e0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to know about getting organized with StashDog
          </p>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              style={{
                marginBottom: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                border: '1px solid rgba(252, 217, 0, 0.1)'
              }}
            >
              <button
                onClick={() => handleFAQClick(index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fcd900',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'inherit'
                }}
              >
                <span>{faq.question}</span>
                <span 
                  style={{ 
                    fontSize: '1.5rem', 
                    transform: openFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  +
                </span>
              </button>
              {openFAQ === index && (
                <div 
                  style={{
                    /* add some top padding so the description doesn't sit flush against the divider */
                    padding: '0.75rem 1.5rem 1.5rem 1.5rem',
                    color: '#e0e0e0',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    borderTop: '1px solid rgba(252, 217, 0, 0.1)'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#e0e0e0', marginBottom: '1rem' }}>
            Still have questions? We're here to help!
          </p>
          <a
            href="mailto:mail@dogfoodlab.io"
            className="cta-button"
            onClick={() => logEvent('support_contact', { source: 'faq_section' })}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
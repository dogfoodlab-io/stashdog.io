import React, { useState } from "react"
import { useFirebase } from "../hooks/useFirebase"

const FAQ = () => {
  const { logEvent } = useFirebase()
  const [openFAQ, setOpenFAQ] = useState(null)

  const handleFAQClick = (questionIndex) => {
    logEvent('faq_interaction', {
      question_index: questionIndex,
      action: openFAQ === questionIndex ? 'close' : 'open'
    })
    setOpenFAQ(openFAQ === questionIndex ? null : questionIndex)
  }

  const faqs = [
    {
      question: "How does StashDog help me organize my stuff?",
      answer: "StashDog uses photo-based inventory tracking with AI recognition. Just take a picture of your items, and our app automatically categorizes and tags them. You can assign storage locations, add notes, and search everything instantly. No complex organizational systems to learn or maintain."
    },
    {
      question: "Can my family members access our shared inventory?",
      answer: "Yes! StashDog supports family sharing with customizable permissions. You can invite family members to view or edit your inventory, share specific collections, and collaborate on organization projects. Everyone stays in sync automatically."
    },
    {
      question: "What makes StashDog different from other organization apps?",
      answer: "StashDog eliminates the mental overhead of traditional organization. Instead of forcing you to remember complex filing systems, we let you store things naturally and use AI-powered search to find them later. Plus, we integrate with voice assistants like Alexa and Google Home."
    },
    {
      question: "Is StashDog good for moving and storage?",
      answer: "Absolutely! StashDog is perfect for moving. Use QR codes on boxes, take photos of contents, and track everything digitally. When you need something specific, just search instead of opening every box. Great for storage units, seasonal items, and long-term organization."
    },
    {
      question: "Does StashDog work with smart home devices?",
      answer: "Yes! StashDog integrates with Amazon Alexa and Google Assistant. You can ask your smart speaker \"Where are my Christmas lights?\" or \"Find my camping gear\" and get instant answers from your inventory."
    },
    {
      question: "Is my data secure with StashDog?",
      answer: "Security is our priority. All data is encrypted in transit and at rest. Photos and inventory information are stored securely in the cloud with enterprise-grade protection. You control what you share and with whom. We never sell your personal data."
    },
    {
      question: "How much does StashDog cost?",
      answer: "StashDog offers a free tier with basic features for small inventories. Premium plans include unlimited items, advanced AI features, family sharing, and voice integration. Early users get special pricing and free premium access during beta."
    },
    {
      question: "Can I use StashDog for business inventory?",
      answer: "While StashDog is designed for home and personal use, many small businesses, artists, and collectors use it for inventory management. The photo-based system works great for tracking tools, supplies, artwork, collectibles, and equipment."
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
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    color: '#e0e0e0',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    borderTop: '1px solid rgba(252, 217, 0, 0.1)',
                    marginTop: '-1px'
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
            href="mailto:support@dogfoodlab.io"
            className="cta-button"
            onClick={() => logEvent('support_contact', { source: 'faq_section' })}
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
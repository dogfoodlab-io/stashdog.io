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
      question: "What is StashDog?",
      answer:
        "StashDog is your digital inventory assistant that helps you keep track of all your stuff. Take photos, add notes, assign locations, and finally know what you have and where it is. No more digging through boxes or buying duplicates of things you already own."
    },
    {
      question: "Who should use StashDog?",
      answer:
        "Anyone who has stuff! Whether you're living in a mess, moving, sharing a space with roommates, managing a household with kids, running an Airbnb, or just want to get organized, StashDog works for people who are ready to transform their chaos into something manageable."
    },
    {
      question: "How does it work?",
      answer:
        "Simple: snap a photo, add some details, and assign a location. Add tags and categories to help organize everything, or ask StashDog to do it for you. Search for items by name, location, or tags. Share collections with partners, family members, roommates, guests, or cleaning staff so everyone knows where things are."
    },
    {
      question: "Do I really need an app to organize my stuff?",
      answer:
        "Look, you've probably tried notes, lists, spreadsheets, or just 'remembering better.' How's that working out? StashDog turns your phone into a searchable catalog of everything you own. Instead of physically digging through storage, you search digitally and go straight to what you need."
    },
    {
      question: "What makes StashDog different from other organization apps?",
      answer:
        "We actually understand that life is messy. StashDog doesn't judge your chaos – it just helps you manage it. Plus, you can share your stuff with family or roommates, guests, or staff, so everyone can find what they need without playing 20 questions."
    },
    {
      question: "How much does it cost?",
      answer:
        "StashDog is free to use with up to 100 items. Upgrade to StashDog Plus for unlimited items, photos, and premium features. No contracts, cancel anytime."
    },
    {
      question: "Can I share items with my family?",
      answer:
        "Absolutely! Create collections and share them with family members, roommates, Airbnb guests, cleaning staff, or anyone else who needs access. Set different permission levels – some people can just view, others can edit."
    },
    {
      question: "How does StashDog help with Airbnb properties?",
      answer:
        "Game changer for hosts! Create digital guides showing guests where everything is - from extra towels to the coffee maker manual. Share property collections with your cleaning crew so they know exactly what should be where. No more 'Where's the hair dryer?' messages at midnight."
    },
    {
      question: "Can rental property managers use this?",
      answer:
        "Absolutely. Track furniture, appliances, and amenities across multiple properties. Share access with tenants, maintenance staff, or property managers. When something breaks or goes missing, you have photos and documentation ready to go."
    },
    {
      question: "What if I'm not tech-savvy?",
      answer:
        "If you can take a photo with your phone, you can use StashDog. The interface is designed to be simple and intuitive. Most people are adding their first items within minutes of signing up."
    },
    {
      question: "Will this actually help me get organized?",
      answer:
        "Here's the thing: StashDog doesn't magically clean your space. But it does solve the 'where the hell did I put that?' problem. When you know exactly where your stuff is, you spend less time searching and more time actually using what you own."
    },
    {
      question: "What about my privacy?",
      answer:
        "Your stuff is your stuff. We use secure cloud storage with AES-256 encryption at rest and TLS in transit to keep your data safe, and you control who sees what. We don't sell your information or spam you with ads about organizing products."
    },
    {
      question: "Can I use it for my business?",
      answer:
        "Many small business owners use StashDog to track inventory, tools, or supplies. Property managers love it for tracking assets across units. If you're selling online, crafting, or running any kind of business from home, StashDog can help you stay on top of what you have."
    },
    {
      question: "What if I have thousands of items?",
      answer:
        "Start small – maybe with one room or category. You don't need to catalog everything at once. Most people find that once they start, they naturally want to add more because it's actually useful."
    },
    {
      question: "Does it work offline?",
      answer:
        "StashDog syncs when you have internet, but you can still browse your items and add new ones offline. Everything syncs up once you're connected again."
    },
    {
      question: "What happens to my stuff if I cancel?",
      answer:
        "If you cancel your subscription, you keep access to your basic account with up to 100 items. If you have more than 100 items, you can still browse them in read-only mode, but will not be able to add any more things. You can export your data anytime. We're not holding your inventory hostage."
    },
    {
      question: "I'm moving soon – how can StashDog help?",
      answer:
        "This is where StashDog really shines. Create collections for each room, tag items by priority or fragility, and share moving lists with helpers. When you're unpacking, you'll know exactly what's in each box and where it should go."
    },
    {
      question: "How do cleaning services use StashDog?",
      answer:
        "Smart cleaning crews use StashDog to know exactly what should be in each room and where it belongs. No more guessing where the remote goes or whether that expensive vase was already broken. Everything's documented with photos."
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
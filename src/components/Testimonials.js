import React, { useState, useEffect, useCallback } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useContentSwitcher } from "../hooks/useContentSwitcher"

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sarah J",
    role: "Home Organizer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The AI auto-fill saved me hours cataloging my collection. I just snapped photos and it did the rest. It's like having a professional organizer in my pocket.",
    rating: 5
  },
  {
    id: 2,
    name: "Mike C",
    role: "Outdoor Enthusiast",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I found my camping gear in seconds. No more digging through boxes in the garage wondering where I put the tent stakes. StashDog is a lifesaver.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily W",
    role: "Busy Mom",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Finally, my garage makes sense. The QR codes are a game changer for storage bins. I can see what's inside without opening a single lid.",
    rating: 5
  },
  {
    id: 4,
    name: "David M",
    role: "Collector",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    text: "Having my inventory in my pocket is invaluable for insurance purposes. Peace of mind is worth it. Plus, it's actually fun to catalog things now.",
    rating: 5
  },
  {
    id: 5,
    name: "Jessica R",
    role: "Recent Mover",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    text: "StashDog is the best thing to happen to my moving process. I knew exactly what was in every box before we even loaded the truck.",
    rating: 5
  }
]

const Testimonials = () => {
  const { content } = useContentSwitcher()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
  }

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <section className="testimonials-section" style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>{content.testimonials.title}</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            Join thousands of people who stopped living like trash gremlins.
          </p>
        </div>

        <div 
          className="carousel-container"
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            position: 'relative',
            padding: '0 1rem'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Card */}
          <div 
            className="testimonial-card"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '1.5rem',
              padding: '3rem 2rem',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <Quote 
              size={60} 
              color="var(--color-primary)" 
              style={{ opacity: 0.1, position: 'absolute', top: '2rem', left: '2rem' }} 
            />
            
            <div style={{ 
              marginBottom: '2rem',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--color-primary)',
                margin: '0 auto 1.5rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }}>
                <img 
                  src={TESTIMONIALS_DATA[currentIndex].image} 
                  alt={TESTIMONIALS_DATA[currentIndex].name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#fcd900" color="#fcd900" />
                ))}
              </div>
            </div>

            <p style={{ 
              fontSize: '1.35rem', 
              fontStyle: 'italic', 
              marginBottom: '2rem', 
              color: 'var(--text-main)',
              lineHeight: '1.6',
              maxWidth: '80%',
              margin: '0 auto 2rem'
            }}>
              "{TESTIMONIALS_DATA[currentIndex].text}"
            </p>

            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {TESTIMONIALS_DATA[currentIndex].name}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {TESTIMONIALS_DATA[currentIndex].role}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            style={{
              position: 'absolute',
              top: '50%',
              left: '-20px',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-20px',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-main)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentIndex ? 'var(--color-primary)' : 'var(--glass-border)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
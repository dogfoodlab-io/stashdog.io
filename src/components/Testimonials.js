import React from "react"
import { Quote, Star } from "lucide-react"
import { useFirebase } from "../hooks/useFirebase"
import { useContentSwitcher } from "../hooks/useContentSwitcher"

const Testimonials = () => {
  const { content } = useContentSwitcher()

  return (
    <section className="testimonials-section" style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>{content.testimonials.title}</h2>
          <p>Join thousands of people who stopped living like trash gremlins.</p>
        </div>

        <div className="testimonials-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {content.testimonials.reviews.slice(0, 3).map((review, index) => (
            <div 
              key={index} 
              className="testimonial-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
              }}
            >
              <Quote 
                size={40} 
                color="var(--color-primary)" 
                style={{ opacity: 0.2, position: 'absolute', top: '1.5rem', right: '1.5rem' }} 
              />
              
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fcd900" color="#fcd900" />
                ))}
              </div>

              <p style={{ 
                fontSize: '1.1rem', 
                fontStyle: 'italic', 
                marginBottom: '2rem', 
                flex: 1,
                color: 'var(--text-main)',
                lineHeight: '1.6'
              }}>
                "{review.text}"
              </p>

              <div className="testimonial-author" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '1.5rem',
                marginTop: 'auto'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fcd900 0%, #ff4d4d 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.2rem'
                }}>
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{review.author}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified User</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
import React from "react"
import { Link } from "gatsby"
import { ArrowRight, Star } from "lucide-react"
import { useFirebase } from "../hooks/useFirebase"
import { useContentSwitcher } from "../hooks/useContentSwitcher"

const Hero = () => {
  const { logEvent } = useFirebase()
  const { content, currentVariant } = useContentSwitcher()

  const handleCTAClick = (ctaType, buttonText, buttonPosition) => {
    logEvent('cta_click', {
      cta_type: ctaType,
      button_text: buttonText,
      button_position: buttonPosition,
      page: 'homepage',
      content_variant: currentVariant
    })
  }

  return (
    <section className="stashdog-hero">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          {/* Left Content */}
          <div className="hero-content animate-fade-in">
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'rgba(252, 217, 0, 0.1)', 
              padding: '0.5rem 1rem', 
              borderRadius: '99px', 
              marginBottom: '1.5rem',
              border: '1px solid rgba(252, 217, 0, 0.2)'
            }}>
              <Star size={16} fill="#fcd900" color="#fcd900" />
              <span style={{ color: '#fcd900', fontWeight: '600', fontSize: '0.9rem' }}>
                #1 App for Messy Humans
              </span>
            </div>

            <h1 style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
              {content.welcome.title}
            </h1>
            
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '540px' }}>
              {content.welcome.description}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link 
                to="/download" 
                className="cta-button"
                onClick={() => handleCTAClick('primary', 'Get Started', 'hero_main')}
              >
                Get Started Free
              </Link>
              <Link 
                to="/solutions" 
                className="cta-button outline"
                onClick={() => handleCTAClick('secondary', 'See How It Works', 'hero_secondary')}
              >
                See How It Works
              </Link>
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', opacity: 0.7 }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>10k+</div>
                <div style={{ fontSize: '0.9rem' }}>Items Stashed</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>4.9/5</div>
                <div style={{ fontSize: '0.9rem' }}>User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s', position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Back Phone - Items List (Nano Banana) */}
            <div className="glass-panel" style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-65%, -60%) rotate(-6deg)',
              borderRadius: '32px', 
              padding: '0.5rem',
              width: '280px',
              zIndex: 1,
              background: 'rgba(23, 23, 23, 0.8)',
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src="/nano-banana.jpg" 
                alt="StashDog Items List" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  display: 'block',
                  opacity: 0.8
                }} 
              />
            </div>

            {/* Front Phone - Item Details (iPhone 16 Plus) */}
            <div className="glass-panel" style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-35%, -40%) rotate(0deg)',
              borderRadius: '32px', 
              padding: '0.75rem',
              width: '300px',
              zIndex: 2,
              background: 'rgba(23, 23, 23, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img 
                src="/app-screenshot-1.png" 
                alt="StashDog Item Details" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  borderRadius: '24px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  display: 'block'
                }} 
              />
            </div>
            
            {/* Floating Badge - Generic Value Prop */}
            <div className="glass-panel" style={{
              position: 'absolute',
              bottom: '100px',
              right: '0',
              padding: '1rem 1.5rem',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              maxWidth: '280px',
              animation: 'float 6s ease-in-out infinite',
              background: 'rgba(23, 23, 23, 0.9)',
              zIndex: 3,
              border: '1px solid rgba(252, 217, 0, 0.2)'
            }}>
              <div style={{ 
                background: '#fcd900', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ArrowRight color="black" size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', color: 'white', fontSize: '0.95rem' }}>Organize Everything</div>
                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>From collections to chaos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @media (max-width: 968px) {
          .container > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-visual {
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
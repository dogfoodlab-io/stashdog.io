import React from "react"
import { Link } from "gatsby"
import { ArrowRight, Star, Search, Camera, MapPinned, CheckCircle2 } from "lucide-react"
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
        <div className="hero-layout" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div className="hero-content animate-fade-in">
            <div className="hero-badge" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(252, 217, 0, 0.06)',
              padding: '0.5rem 1rem',
              borderRadius: '99px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(252, 217, 0, 0.12)'
            }}>
              <Star size={16} fill="#fcd900" color="#fcd900" />
              <span style={{ color: '#fcd900', fontWeight: '600', fontSize: '0.9rem' }}>
                Free Forever • No Credit Card Required
              </span>
            </div>

            <h1 className="hero-title" style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
              {content.welcome.title}
            </h1>

            <p className="hero-description" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '540px' }}>
              {content.welcome.description}
            </p>

            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/download"
                className="cta-button"
                onClick={() => handleCTAClick('primary', content.welcome.cta.buttonText, 'hero_main')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {content.welcome.cta.buttonText} <ArrowRight size={18} />
              </Link>
              <Link
                to="/solutions"
                className="cta-button outline"
                onClick={() => handleCTAClick('secondary', 'See How It Works', 'hero_secondary')}
              >
                See How It Works
              </Link>
            </div>

            <div className="hero-trust-list" style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginTop: '1rem',
              marginBottom: '2rem'
            }}>
              {[
                'Start free with up to 100 items',
                'iPhone + Android',
                'Share with family and roommates'
              ].map((item) => (
                <div
                  key={item}
                  className="hero-trust-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '999px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                  }}
                >
                  <CheckCircle2 size={16} color="#fcd900" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="hero-step-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              width: '100%',
              maxWidth: '640px'
            }}>
              {[
                {
                  title: 'Snap photos',
                  description: 'Add items as you go instead of building a spreadsheet from scratch.',
                  icon: <Camera size={18} color="#fcd900" />
                },
                {
                  title: 'Save locations',
                  description: 'Track the exact room, bin, shelf, or box so retrieval is easy later.',
                  icon: <MapPinned size={18} color="#fcd900" />
                },
                {
                  title: 'Search instantly',
                  description: 'Find what you own fast and stop buying duplicates or tearing the house apart.',
                  icon: <Search size={18} color="#fcd900" />
                }
              ].map((step) => (
                <div
                  key={step.title}
                  className="glass-panel hero-step-card"
                  style={{
                    padding: '1rem',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', fontWeight: '700', color: 'white' }}>
                    {step.icon}
                    <span>{step.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s', position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Back Phone - Items List (Nano Banana) */}
            <div className="glass-panel hero-visual-back" style={{
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
            <div className="glass-panel hero-visual-front" style={{
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
            <div className="glass-panel hero-visual-badge" style={{
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
          .hero-layout {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 3rem !important;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-actions,
          .hero-trust-list {
            justify-content: center;
          }
          .hero-step-grid {
            width: 100%;
            max-width: 100% !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .hero-visual {
            margin-top: 2rem;
            width: min(100%, 440px);
            height: 480px !important;
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media (max-width: 720px) {
          .hero-layout {
            gap: 2.5rem !important;
          }
          .hero-badge {
            width: 100%;
            justify-content: center;
            text-align: center;
            padding: 0.75rem 1rem !important;
          }
          .hero-title {
            font-size: clamp(2.8rem, 12vw, 4rem);
          }
          .hero-description {
            font-size: 1.05rem !important;
            line-height: 1.7;
            margin-bottom: 2rem !important;
          }
          .hero-actions {
            width: 100%;
            flex-direction: column;
          }
          .hero-actions .cta-button {
            width: 100%;
          }
          .hero-trust-list {
            width: 100%;
            flex-direction: column;
          }
          .hero-trust-pill {
            width: 100%;
            justify-content: flex-start;
          }
          .hero-step-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-visual {
            width: 100%;
            max-width: 340px;
            height: 360px !important;
          }
          .hero-visual-back {
            width: 54% !important;
            transform: translate(-68%, -56%) rotate(-6deg) !important;
          }
          .hero-visual-front {
            width: 58% !important;
            transform: translate(-30%, -42%) rotate(0deg) !important;
          }
          .hero-visual-badge {
            left: 50%;
            right: auto !important;
            bottom: 0 !important;
            transform: translateX(-50%);
            width: min(100%, 280px);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
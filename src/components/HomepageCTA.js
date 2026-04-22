import React from "react"
import { Link } from "gatsby"
import { ArrowRight, CheckCircle2, Search, Users } from "lucide-react"
import { useFirebase } from "../hooks/useFirebase"

const HomepageCTA = () => {
  const { logEvent } = useFirebase()

  const handleClick = (ctaType) => {
    logEvent('homepage_final_cta_click', {
      cta_type: ctaType,
      page: 'homepage'
    })
  }

  return (
    <section style={{ padding: '2rem 0 6rem' }}>
      <div className="container">
        <div
          className="glass-panel"
          style={{
            borderRadius: '32px',
            padding: '3rem',
            border: '1px solid rgba(252, 217, 0, 0.18)',
            background: 'linear-gradient(135deg, rgba(252, 217, 0, 0.08), rgba(255, 255, 255, 0.03))'
          }}
        >
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              background: 'rgba(252, 217, 0, 0.08)',
              border: '1px solid rgba(252, 217, 0, 0.16)',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}>
              <CheckCircle2 size={16} />
              Free to start • No credit card required
            </div>

            <h2 style={{ marginBottom: '1rem' }}>Stop losing track of your stuff</h2>
            <p style={{ maxWidth: '640px', margin: '0 auto 2rem', fontSize: '1.1rem', color: 'var(--text-muted)' }}>
              StashDog helps you catalog what you own, save where it lives, and find it fast the next time you need it.
              Better than spreadsheets, random notes, and hoping somebody remembers where the thing went.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              {[
                { icon: <Search size={18} />, title: 'Find items fast', text: 'Search by item, tag, or location instead of digging through bins.' },
                { icon: <CheckCircle2 size={18} />, title: 'Start with 100 free items', text: 'Get useful fast without committing to a giant setup project.' },
                { icon: <Users size={18} />, title: 'Share the household memory', text: 'Give family members and roommates one source of truth.' }
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: '1rem 1.1rem',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/download"
                className="cta-button"
                onClick={() => handleClick('primary')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Download Free <ArrowRight size={18} />
              </Link>
              <Link
                to="/pricing"
                className="cta-button outline"
                onClick={() => handleClick('secondary')}
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomepageCTA

import React from "react"
import { Link } from "gatsby"
import { Box, MapPin, Users, ArrowRight } from "lucide-react"
import { useFirebase } from "../hooks/useFirebase"
import { useContentSwitcher } from "../hooks/useContentSwitcher"

const Features = () => {
  const { logEvent } = useFirebase()
  const { content, currentVariant } = useContentSwitcher()

  const handleFeatureClick = (featureName) => {
    logEvent('feature_click', {
      feature_name: featureName,
      page: 'homepage',
      content_variant: currentVariant
    })
  }

  // Map keys to Lucide icons for a cleaner look than images
  const getIcon = (key) => {
    switch(key) {
      case 'inventory_management': return <Box size={32} />;
      case 'location_tracking': return <MapPin size={32} />;
      case 'family_sharing': return <Users size={32} />;
      default: return <Box size={32} />;
    }
  }

  const features = [
    {
      key: 'inventory_management',
      data: content.discover.features.inventory_management,
      link: '/features'
    },
    {
      key: 'location_tracking',
      data: content.discover.features.location_tracking,
      link: '/features'
    },
    {
      key: 'family_sharing',
      data: content.discover.features.family_sharing,
      link: '/features'
    }
  ]

  return (
    <section className="discover-features" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(252, 217, 0, 0.05) 0%, transparent 70%)',
        zIndex: -1
      }} />

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>{content.discover.title}</h2>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: 'var(--text-muted)' }}>
            StashDog helps you catalog what you own, remember exactly where it lives, and give everyone in the household a faster way to find things.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          {features.map(({ key, data, link }) => (
            <Link
              key={key}
              to={link}
              className="feature-card group"
              onClick={() => handleFeatureClick(key)}
              style={{ cursor: 'pointer', position: 'relative', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="feature-icon">
                {getIcon(key)}
              </div>

              <h3 style={{ marginBottom: '1rem' }}>{data.title}</h3>
              <p style={{ marginBottom: '2rem' }}>{data.description}</p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'var(--color-primary)', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                See all features <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/solutions"
            className="cta-button outline"
            style={{ padding: '1rem 3rem' }}
          >
            Explore All Features
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Features
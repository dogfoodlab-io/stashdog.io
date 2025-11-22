import React from 'react';
import { Link } from 'gatsby';
import { Package, Target, Users, Home, Brain, ArrowRight } from 'lucide-react';

const UseCaseSelector = () => {
  const useCases = [
    {
      id: 'moving',
      title: 'Moving House',
      icon: <Package size={32} />,
      description: 'Pack without planning. Find without unpacking.',
      link: '/solutions#moving',
      color: '#e8491d'
    },
    {
      id: 'family',
      title: 'Family Chaos',
      icon: <Users size={32} />,
      description: 'Coordinate the household without the arguments.',
      link: '/solutions#family',
      color: '#667eea'
    },
    {
      id: 'collectors',
      title: 'Collectors',
      icon: <Target size={32} />,
      description: 'Track value and inventory without spreadsheets.',
      link: '/solutions#collectors',
      color: '#764ba2'
    },
    {
      id: 'roommates',
      title: 'Shared Living',
      icon: <Home size={32} />,
      description: 'Stop fighting about whose stuff is whose.',
      link: '/solutions#roommates',
      color: '#43e97b'
    },
    {
      id: 'general',
      title: 'Just Overwhelmed',
      icon: <Brain size={32} />,
      description: 'For when your brain just can\'t deal with the mess.',
      link: '/solutions#general',
      color: '#fcd900'
    }
  ];

  return (
    <section className="use-case-selector" style={{ padding: '2rem 0 6rem', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            What's Your Mess?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            StashDog adapts to your specific brand of chaos. Choose your fighter.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          justifyContent: 'center'
        }}>
          {useCases.map((useCase) => (
            <Link 
              key={useCase.id} 
              to={useCase.link}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '2rem',
                textDecoration: 'none',
                color: 'var(--text-main)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = useCase.color;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${useCase.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
              }}
            >
              <div 
                style={{ 
                  marginBottom: '1.5rem', 
                  color: useCase.color,
                  background: `rgba(255, 255, 255, 0.03)`,
                  padding: '1rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {useCase.icon}
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{useCase.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', flex: 1 }}>
                {useCase.description}
              </p>
              
              <div style={{
                marginTop: '1.5rem',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: useCase.color,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                See Solution <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseSelector;

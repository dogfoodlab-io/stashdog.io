import React from 'react';
import { useContentSwitcher } from '../hooks/useContentSwitcher';

/**
 * Development utility component to test content switching
 * This should only be used in development or by admins
 */
const ContentSwitcherControls = ({ showControls = false }) => {
  const { currentVariant, switchContent, availableVariants } = useContentSwitcher();

  if (!showControls) {
    return null;
  }

  const handleVariantChange = (variant) => {
    switchContent(variant);
    // Reload the page to see changes across all components
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <div style={{ marginBottom: '5px' }}>
        <strong>Content Variant:</strong> {currentVariant}
      </div>
      <div>
        {availableVariants.map(variant => (
          <button
            key={variant}
            onClick={() => handleVariantChange(variant)}
            style={{
              margin: '2px',
              padding: '4px 8px',
              background: variant === currentVariant ? '#fcd900' : '#333',
              color: variant === currentVariant ? '#000' : '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            {variant}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentSwitcherControls;
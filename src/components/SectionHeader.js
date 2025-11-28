import React from 'react';

const SectionHeader = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}) => {
  return (
    <div className={`section-header align-${align} ${className}`}>
      <h2 className="section-header-title">
        {title}
      </h2>
      {subtitle && (
        <p className="section-header-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;

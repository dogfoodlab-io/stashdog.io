import React from 'react';
import { ArrowRight } from 'lucide-react';

const InfoCard = ({ 
  icon: Icon, 
  title, 
  description, 
  variant = 'default', 
  children,
  className = '',
  actionLink,
  actionText = 'Learn more'
}) => {
  return (
    <div className={`info-card variant-${variant} ${className}`}>
      <div className="info-card-header">
        {Icon && (
          <div className="info-card-icon">
            <Icon size={24} />
          </div>
        )}
        <div>
          <h3 className="info-card-title">{title}</h3>
          {description && (
            <p className="info-card-description">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {children && (
        <div className="info-card-content">
          {children}
        </div>
      )}

      {actionLink && (
        <div className="info-card-action">
          <a 
            href={actionLink} 
            className="info-card-link"
          >
            {actionText} <ArrowRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
};

export default InfoCard;

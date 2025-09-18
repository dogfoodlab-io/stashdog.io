import { useState, useEffect } from 'react';
import { contentVariants } from '../config';

/**
 * Hook for dynamically switching content based on URL parameters or other criteria
 * Supports different market segments: default, professional, family
 */
export const useContentSwitcher = () => {
  const [currentVariant, setCurrentVariant] = useState('default');
  const [content, setContent] = useState(contentVariants.default);

  useEffect(() => {
    const determineContentVariant = () => {
      // Check URL parameters first
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const variant = urlParams.get('content') || urlParams.get('segment');
        
        if (variant && contentVariants[variant]) {
          return variant;
        }
        
        // Check for subdomain-based routing (e.g., professional.stashdog.io)
        const subdomain = window.location.hostname.split('.')[0];
        if (subdomain && contentVariants[subdomain] && subdomain !== 'www') {
          return subdomain;
        }
        
        // Check for path-based routing (e.g., /professional, /family)
        const pathSegment = window.location.pathname.split('/')[1];
        if (pathSegment && contentVariants[pathSegment]) {
          return pathSegment;
        }
        
        // Check localStorage for user preference
        const savedVariant = localStorage.getItem('stashdog_content_variant');
        if (savedVariant && contentVariants[savedVariant]) {
          return savedVariant;
        }
      }
      
      return 'default';
    };

    const variant = determineContentVariant();
    setCurrentVariant(variant);
    setContent(contentVariants[variant]);
  }, []);

  // Function to manually switch content variant
  const switchContent = (variant) => {
    if (contentVariants[variant]) {
      setCurrentVariant(variant);
      setContent(contentVariants[variant]);
      
      // Save preference to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('stashdog_content_variant', variant);
      }
      
      return true;
    }
    return false;
  };

  // Get all available variants
  const getAvailableVariants = () => {
    return Object.keys(contentVariants);
  };

  return {
    content,
    currentVariant,
    switchContent,
    availableVariants: getAvailableVariants()
  };
};
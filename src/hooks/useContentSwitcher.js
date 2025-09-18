import { useState, useEffect } from 'react';
import { contentVariants } from '../config';
import { useFirebase } from './useFirebase';

/**
 * Hook for dynamically switching content based on URL parameters or other criteria
 * Supports different market segments: default, professional, family
 * Can optionally load content from Firebase Firestore for remote management
 */
export const useContentSwitcher = () => {
  const [currentVariant, setCurrentVariant] = useState('default');
  const [content, setContent] = useState(contentVariants.default);
  const [isLoading, setIsLoading] = useState(false);
  const { getContentVariant } = useFirebase();

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

    const loadContent = async (variant) => {
      setIsLoading(true);
      
      // Try to load from Firestore first (for remote content management)
      const remoteContent = await getContentVariant(variant);
      
      if (remoteContent) {
        setContent(remoteContent);
      } else {
        // Fallback to local content variants
        setContent(contentVariants[variant] || contentVariants.default);
      }
      
      setIsLoading(false);
    };

    const variant = determineContentVariant();
    setCurrentVariant(variant);
    loadContent(variant);
  }, [getContentVariant]);

  // Function to manually switch content variant
  const switchContent = async (variant) => {
    if (contentVariants[variant]) {
      setCurrentVariant(variant);
      setIsLoading(true);
      
      // Try to load from Firestore first
      const remoteContent = await getContentVariant(variant);
      
      if (remoteContent) {
        setContent(remoteContent);
      } else {
        setContent(contentVariants[variant]);
      }
      
      setIsLoading(false);
      
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
    isLoading,
    switchContent,
    availableVariants: getAvailableVariants()
  };
};
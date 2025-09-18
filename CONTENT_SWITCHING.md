# Dynamic Content Switching Feature

This feature allows the StashDog website to dynamically switch between different content variants based on URL parameters, subdomains, or user preferences. This enables targeted messaging for different market segments.

## Content Variants

### 1. Default (`default`)
- **Target Audience**: Original StashDog users who appreciate edgy, humorous content
- **Tone**: Casual, humorous, uses profanity
- **Example**: "Quit Living Like a Trash Gremlin: Say Hello to StashDog"

### 2. Professional (`professional`)
- **Target Audience**: Business professionals, corporate users
- **Tone**: Clean, business-appropriate, professional
- **Example**: "Professional Home Inventory Management: Meet StashDog"

### 3. Family (`family`)
- **Target Audience**: Families with children, parents
- **Tone**: Family-friendly, wholesome, focuses on family benefits
- **Example**: "Family-Friendly Home Organization: Welcome to StashDog"

## How to Switch Content

### 1. URL Parameters
- `?content=professional` - Switches to professional content
- `?segment=family` - Switches to family-friendly content
- `?content=default` - Switches to original content

### 2. Subdomain Routing
- `professional.stashdog.io` - Professional content
- `family.stashdog.io` - Family-friendly content
- `www.stashdog.io` or `stashdog.io` - Default content

### 3. Path-based Routing
- `/professional` - Professional content
- `/family` - Family-friendly content
- `/` - Default content

### 4. Persistent Preferences
- User selections are saved to localStorage
- Preference persists across sessions until manually changed

## Implementation Details

### Core Files
- `src/config.js` - Contains all content variants
- `src/hooks/useContentSwitcher.js` - Main content switching logic
- `src/hooks/useFirebase.js` - Enhanced with Firestore support for remote content
- `src/components/ContentSwitcherControls.js` - Development testing UI

### Updated Components
- `src/components/Hero.js` - Uses dynamic content
- `src/components/Features.js` - Uses dynamic content
- `src/components/Testimonials.js` - Uses dynamic content
- `src/pages/index.js` - Tracks content variants in analytics

### Analytics Integration
All content variant switches and user interactions are tracked in Firebase Analytics with the `content_variant` parameter for A/B testing insights.

## Usage Examples

### Basic Usage in Components
```javascript
import { useContentSwitcher } from '../hooks/useContentSwitcher';

const MyComponent = () => {
  const { content, currentVariant } = useContentSwitcher();
  
  return (
    <div>
      <h1>{content.welcome.title}</h1>
      <p>{content.welcome.description}</p>
    </div>
  );
};
```

### Manual Content Switching
```javascript
const { switchContent } = useContentSwitcher();

// Switch to professional content
switchContent('professional');
```

### Development Testing
Add `?dev=true` to any URL to see content switching controls in development.

## Future Enhancements

### Firebase Firestore Integration
The system is ready for remote content management via Firestore:
- Content can be stored in Firestore collections
- Real-time content updates without code deployments
- A/B testing with remote content variations
- Content personalization based on user behavior

### Analytics and Optimization
- Track conversion rates by content variant
- Implement automatic content optimization based on performance
- User segmentation based on content preferences

## Testing

Use the demo file at `/tmp/content-switching-demo.html` to see how content switching works across all variants.

## Configuration

Content variants are defined in `src/config.js`. Each variant should have the same structure:

```javascript
{
  welcome: { title, description },
  discover: { title, features: { ... } },
  testimonials: { title, reviews: [...] },
  get_started: { title, description, call_to_action: { ... } }
}
```

Add new variants by extending the `contentVariants` object and adding the new key to the routing logic in `useContentSwitcher.js`.
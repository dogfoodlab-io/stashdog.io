# StashDog Website

The official marketing website for StashDog - Smart Home Inventory Management.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo-url>
cd stashdog.io
yarn install

# Copy environment variables
cp .env.example .env
# Edit .env with your Firebase config

# Start development server
yarn develop
```

Visit `http://localhost:8000` to see the site.

## 📁 Project Structure

```
stashdog.io/
├── src/
│   ├── components/          # React components
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Features.js
│   │   ├── Testimonials.js
│   │   └── Footer.js
│   ├── pages/              # Gatsby pages
│   │   ├── index.js        # Homepage
│   │   └── privacy.js      # Privacy policy
│   ├── styles/
│   │   └── global.css      # Global styles
│   ├── hooks/
│   │   └── useFirebase.js  # Firebase analytics
│   └── config.js           # Content configuration
├── static/                 # Static assets
│   ├── lab1.png           # StashDog logo
│   ├── Face-*.webp        # Testimonial images
│   └── round-logo-goggles.png
├── firebase.json           # Firebase hosting config
└── gatsby-config.js        # Gatsby configuration
```

## 🔧 Development

```bash
# Start development server
yarn develop

# Build for production
yarn build

# Serve production build locally
yarn serve

# Clean cache and build
yarn clean
```

## 🚀 Deployment

### Setup Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Set public directory to `public`
   - Configure as single-page app: `No`

3. **Deploy**
   ```bash
   yarn deploy
   # or use the deployment script
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Environment Variables

Create `.env` file with your Firebase configuration:

```bash
GATSBY_FIREBASE_API_KEY=your_api_key
GATSBY_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
GATSBY_FIREBASE_PROJECT_ID=your_project_id
GATSBY_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
GATSBY_FIREBASE_MESSAGING_SENDER_ID=123456789
GATSBY_FIREBASE_APP_ID=1:123456789:web:abcdef
GATSBY_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Custom Domain Setup

1. In Firebase Console → Hosting → Add custom domain
2. Follow DNS configuration instructions
3. Add A records pointing to Firebase hosting IPs

## 📊 Analytics

The site includes Firebase Analytics tracking for:
- Page views
- Feature clicks
- CTA button clicks
- Contact interactions
- Navigation events

Analytics events are logged through the `useFirebase` hook.

## 🎨 Customization

### Content Updates

Edit `src/config.js` to update:
- Welcome messages
- Feature descriptions
- Testimonials
- Call-to-action text

### Styling

- Global styles: `src/styles/global.css`
- Component-specific styles: Inline or add CSS modules

### Adding Pages

1. Create new file in `src/pages/`
2. Follow Gatsby page component pattern
3. Add navigation links as needed

## 🔍 SEO

The site includes:
- Meta tags and Open Graph data
- Structured data for search engines
- Sitemap generation
- Robots.txt

## 📱 Performance

Optimizations included:
- Image optimization through Gatsby
- Font preloading
- CSS minification
- Firebase CDN hosting
- Lazy loading for components

## 🔒 Security

- Firebase hosting with SSL
- Content Security Policy headers
- No sensitive data in client code
- Environment variables for configuration

## 📞 Support

For questions or issues:
- Email: mail@dogfoodlab.io
- Create an issue in this repository

## 📄 License

© 2025 Dogfood Lab LLC. All rights reserved.
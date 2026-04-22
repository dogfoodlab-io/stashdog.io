import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Hero from "../components/Hero";
import UseCaseSelector from "../components/UseCaseSelector";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import HomepageCTA from "../components/HomepageCTA";
import Footer from "../components/Footer";
import ContentSwitcherControls from "../components/ContentSwitcherControls";
import { useFirebase } from "../hooks/useFirebase";
import { useContentSwitcher } from "../hooks/useContentSwitcher";
import "../styles/global.css";

const IndexPage = () => {
  const { isInitialized, logEvent } = useFirebase();
  const { currentVariant } = useContentSwitcher();

  // Check if we should show content switcher controls (for development/testing)
  const showControls = typeof window !== "undefined" &&
    (window.location.search.includes('dev=true') || window.location.hostname === 'localhost');

  // Log page view when component mounts
  useEffect(() => {
    if (isInitialized) {
      logEvent("page_view", {
        page_title: "StashDog Homepage",
        page_location:
          typeof window !== "undefined" ? window.location.href : "",
        page_path:
          typeof window !== "undefined" ? window.location.pathname : "/",
        content_variant: currentVariant
      });
    }
  }, [isInitialized, logEvent, currentVariant]);

  return (
    <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>StashDog — Home Inventory App | Track & Find Everything You Own</title>
          <meta
            name="description"
            content="StashDog is the free home inventory app that helps you track, organize, and find your belongings instantly. Perfect for moving, insurance documentation, and daily life. AI-powered. No credit card required."
          />
          <meta
            name="keywords"
            content="home inventory app, track belongings, home inventory, moving inventory app, home organization app, AI home inventory, family inventory tracker, free inventory app"
          />
          <link rel="canonical" href="https://stashdog.io/" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta
            property="og:title"
            content="StashDog — Home Inventory App | Track & Find Everything You Own"
          />
          <meta
            property="og:description"
            content="Catalog what you own, save where it lives, and find it instantly with StashDog's searchable home inventory app."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />
          <meta property="og:site_name" content="StashDog" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@stashdogapp" />
          <meta
            name="twitter:title"
            content="StashDog — Home Inventory App | Track & Find Everything You Own"
          />
          <meta
            name="twitter:description"
            content="Track what you own, organize where it lives, and find it fast with StashDog."
          />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

          {/* Favicon */}
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/round-logo-goggles.png"
          />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap"
            rel="stylesheet"
          />

          {/* Structured Data — Organization */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dogfood Lab LLC",
              url: "https://stashdog.io",
              logo: "https://stashdog.io/round-logo-goggles.png",
              sameAs: [
                "https://apps.apple.com/app/stashdog/id6743378048",
                "https://play.google.com/store/apps/details?id=com.dogfoodlab.stashdog"
              ],
            })}
          </script>

          {/* Structured Data — SoftwareApplication */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "StashDog",
              description: "Free home inventory app that helps you track, organize, and find your belongings instantly. AI-powered photo recognition, QR code scanning, and family sharing for moving, insurance documentation, and daily organization.",
              url: "https://stashdog.io",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "iOS, Android",
              downloadUrl: [
                "https://apps.apple.com/app/stashdog/id6743378048",
                "https://play.google.com/store/apps/details?id=com.dogfoodlab.stashdog"
              ],
              featureList: [
                "AI-powered item recognition",
                "Photo-based home inventory",
                "QR code box labeling for moving",
                "Family sharing and collaboration",
                "Insurance documentation",
                "Instant search across all belongings",
                "Storage location tracking"
              ],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "Dogfood Lab LLC",
                url: "https://stashdog.io",
              },
            })}
          </script>

          {/* Structured Data — FAQPage */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a home inventory app?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A home inventory app is a digital tool that helps you catalog, photograph, and track everything you own. StashDog lets you take photos of your items, assign storage locations, add notes, and search your entire inventory instantly — so you always know what you have and exactly where it is.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is StashDog free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — StashDog is free forever with no credit card required. You get full access to photo inventory, AI-powered search, QR code scanning, and family sharing at no cost.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does StashDog help me organize my home inventory?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "StashDog uses photo-based inventory tracking with AI recognition. Take a picture of your items and the app automatically categorizes and tags them. You can assign precise storage locations, add notes, and search everything instantly — eliminating the mental overhead of remembering where things are.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use StashDog for moving?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. StashDog is built for moving. Scan or photograph your items as you pack, attach QR codes to boxes, and track the exact contents of every box digitally. When you arrive at your new place, just search for what you need instead of opening every box.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use StashDog for home insurance documentation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. StashDog is ideal for home insurance inventory. Photograph and catalog your valuables, record purchase prices and serial numbers, and keep a searchable digital record of your belongings. If you ever need to file a claim, you'll have everything documented and ready.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can my family members access our shared inventory?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. StashDog supports family sharing with customizable permissions. Invite family members to view or edit your inventory, share specific collections, and stop arguing about who has what and where it lives.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What makes StashDog different from Sortly or other inventory apps?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "StashDog is built for real people with real chaos — not warehouses or businesses. Unlike Sortly (which is priced for small businesses) or other apps with cluttered UX, StashDog is free, fast to set up, and designed for home use. The AI-powered photo recognition means you spend seconds cataloging instead of minutes typing.",
                  },
                },
              ],
            })}
          </script>
        </Helmet>

        <Header />
        <Hero />
        <UseCaseSelector />
        <Features />
        <Testimonials />
        <FAQ />
        <HomepageCTA />
        <Footer />

        {<ContentSwitcherControls showControls={showControls} />}
      </div>
  );
};

export default IndexPage;

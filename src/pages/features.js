import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import {
  Camera, Sparkles, Smartphone, Target, FolderOpen, Library, Tag, Package,
  Lock, Eye, PencilLine, Users, FileText, Receipt, Shield, BookOpen,
  Bell, Wrench, Calendar, RefreshCw, BarChart, User, FileEdit, Clock, Bot, Cloud,
  ArrowRight
} from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import AppStoreButton from "../components/AppStoreButton"
import GooglePlayButton from "../components/GooglePlayButton"
import InfoCard from "../components/InfoCard"
import SectionHeader from "../components/SectionHeader"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const FeaturesPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Features',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/features'
      })
    }
  }, [isInitialized, logEvent])

  const handleDownloadClick = (platform) => {
    if (isInitialized) {
      logEvent('download_click', {
        platform: platform,
        page: 'features'
      })
    }
  }

  return (
    <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Features - StashDog: Stop Losing Your Shit</title>
          <meta name="description" content="Discover StashDog's powerful features: photo-based inventory, flexible organization with collections and tags, QR code labels, role-based sharing, friend & group management, document attachments, reminders, activity history, AI-assisted organization, and cloud sync across all devices." />
          <meta name="keywords" content="home inventory features, photo inventory, QR code labels, role-based access, document management, item reminders, activity tracking, AI organization, collaborative inventory, cloud sync, cross-platform sync" />
          <link rel="canonical" href="https://stashdog.io/features/" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content="StashDog Features - Stop Losing Your Shit" />
          <meta property="og:description" content="Photo-based inventory, QR code labels, role-based sharing, reminders, activity tracking, AI-powered organization, and cloud sync. Everything you need to finally get organized." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/features" />
          <meta property="og:image" content="https://stashdog.io/images/hero-features.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="StashDog Features - Stop Losing Your Shit" />
          <meta name="twitter:description" content="Photo-based inventory, QR code labels, role-based sharing, reminders, activity tracking, AI-powered organization, and cloud sync. Everything you need to finally get organized." />
          <meta name="twitter:image" content="https://stashdog.io/images/hero-features.png" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
        </Helmet>

        <Header />

        {/* Hero Section */}
        <section className="stashdog-hero">
          <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
            <h1 className="hero-title">Combining Power and Simplicity to Get Your Shit Together</h1>
            <div style={{
              maxWidth: '900px',
              margin: '3rem auto',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <img
                src="/images/features-hero.png"
                alt=""
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>

            <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '3rem auto' }}>
              Here's how StashDog actually helps real people with real messy lives.
            </p>
            <p style={{ marginBottom: '4rem', fontSize: '1.1rem' }}>
              <a href="/solutions" style={{ color: '#fcd900', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                See how StashDog solves your organization problems <ArrowRight size={16} />
              </a>
            </p>
          </div>

        </section>

        {/* Main Features Section */}
        <section className="products">
          <div className="container">

            {/* Photo-Based Inventory */}
            <div className="mb-24">
              <SectionHeader
                title="Photo-Based Inventory"
                subtitle="Take a photo of your stuff. That's it. No complicated forms, no endless categories to pick from. Just point, shoot, and suddenly your crap is trackable."
                align="left"
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <InfoCard
                  icon={Sparkles}
                  title="AI Recognition"
                  description="Smart item identification from photos. Our AI figures out what it is and helps you organize it automatically."
                  variant="highlight"
                />
                <InfoCard
                  icon={Smartphone}
                  title="Multiple Photos"
                  description="Capture every angle of your items. Document condition, serial numbers, and accessories."
                  variant="highlight"
                />
                <InfoCard
                  icon={Target}
                  title="Visual Search"
                  description="Find items by what they look like. Don't remember the name? Just describe it or search visually."
                  variant="highlight"
                />
              </div>
            </div>

            {/* Flexible Organization Systems */}
            <div className="mb-24">
              <SectionHeader
                title="Flexible Organization Systems"
                subtitle="Organize your way. Use collections to share groups of items with others, tags to hyper-organize by category or purpose, and containers to track exactly where things are physically stored."
                align="left"
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <InfoCard
                  icon={Library}
                  title="Collections"
                  description="Group and share related items. Perfect for sharing specific sets of items with different people."
                  variant="highlight"
                />
                <InfoCard
                  icon={Tag}
                  title="Tags"
                  description="Hyper-organize by any category you want. Add as many tags as you need to find things your way."
                  variant="highlight"
                />
                <InfoCard
                  icon={Package}
                  title="Containers"
                  description="Know exactly where things are stored. Create nested containers to model your real-world storage."
                  variant="highlight"
                />
              </div>
            </div>

            {/* QR Code Item Links */}
            <div className="mb-24">
              <SectionHeader
                title="QR Coded Item Links"
                subtitle="Print QR code labels for your boxes and containers. Scan them with your phone to instantly see what's inside without having to dig through everything."
                align="left"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard
                  icon={Smartphone}
                  title="Scan to View"
                  description="Instantly view item details or container contents by scanning the label."
                  variant="default"
                />
                <InfoCard
                  icon={Target}
                  title="Printable Labels"
                  description="Generate and print unique QR codes for any item or container in your inventory."
                  variant="default"
                />
              </div>
            </div>

            {/* Role-Based Access & Sharing */}
            <div className="mb-24">
              <SectionHeader
                title="Powerful Role-Based Access"
                subtitle="Control who can see and edit your inventory with granular permissions. Give family members view-only access, let trusted friends manage specific collections, or keep private items completely to yourself."
                align="left"
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <InfoCard
                  icon={Eye}
                  title="View-Only Access"
                  description="Let people see without editing. Perfect for showing off your collection or letting guests find things."
                  variant="highlight"
                />
                <InfoCard
                  icon={PencilLine}
                  title="Edit Permissions"
                  description="Choose who can modify items. Collaborate on shared inventories with trusted family and friends."
                  variant="highlight"
                />
                <InfoCard
                  icon={Lock}
                  title="Private Items"
                  description="Keep personal stuff private. Mark items as private so only you can see them, even in shared collections."
                  variant="highlight"
                />
              </div>
            </div>

            {/* Friend & Group Management */}
            <div className="mb-24">
              <SectionHeader
                title="Friend & Group Management"
                subtitle="Keep your pack in the loop with collaborative item management. Add friends and family to groups, share collections, and work together to manage shared items."
                align="left"
              />
              <InfoCard
                icon={Users}
                title="Collaboration Features"
                description="Create groups for family, roommates, or teams. Share specific collections with different groups. Everyone can add, edit, and organize shared items. See who has what and where it is."
                variant="success"
              />
            </div>

            {/* Document Attachments */}
            <div className="mb-24">
              <SectionHeader
                title="Document Attachments"
                subtitle="Attach receipts, warranties, manuals, and other documents directly to your items. Never lose important paperwork again."
                align="left"
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <InfoCard
                  icon={Receipt}
                  title="Receipts"
                  description="Track purchases and proof of ownership. Great for insurance and returns."
                  variant="highlight"
                />
                <InfoCard
                  icon={Shield}
                  title="Warranties"
                  description="Never miss a warranty claim deadline. Keep all your warranty info attached to the item."
                  variant="highlight"
                />
                <InfoCard
                  icon={BookOpen}
                  title="Manuals"
                  description="Quick access to instructions when you need them. No more digging through the junk drawer."
                  variant="highlight"
                />
              </div>
            </div>

            {/* Item Reminders */}
            <div className="mb-24">
              <SectionHeader
                title="Item Reminders"
                subtitle="Set reminders for maintenance tasks, warranty expirations, subscription renewals, or anything else time-sensitive."
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard icon={Wrench} title="Maintenance" variant="default" />
                <InfoCard icon={Shield} title="Warranties" variant="default" />
                <InfoCard icon={Calendar} title="Renewals" variant="default" />
                <InfoCard icon={RefreshCw} title="Seasonal" variant="default" />
              </div>
            </div>

            {/* Activity History */}
            <div className="mb-24">
              <SectionHeader
                title="Item Activity History"
                subtitle="Track every change made to your items. See who moved what, when they moved it, and what changes were made."
                align="left"
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <InfoCard
                  icon={User}
                  title="Who"
                  description="See which user made changes to shared items."
                  variant="highlight"
                />
                <InfoCard
                  icon={FileEdit}
                  title="What"
                  description="View exactly what changed - location, status, or details."
                  variant="highlight"
                />
                <InfoCard
                  icon={Clock}
                  title="When"
                  description="Track timestamps for all changes to keep a complete history."
                  variant="highlight"
                />
              </div>
            </div>

            {/* AI-Assisted Features */}
            <div className="mb-24">
              <SectionHeader
                title="AI-Assisted Organization"
                subtitle="Let AI do the heavy lifting. Our intelligent assistant analyzes your photos and existing item properties to automatically generate detailed descriptions."
                align="left"
              />
              <InfoCard
                icon={Bot}
                title="AI Powers"
                description="Automatic item descriptions from photos. Smart tag suggestions based on item properties. Organization recommendations for better findability. Learns from your organization patterns over time."
                variant="success"
              />
            </div>

            {/* Cloud Sync */}
            <div className="mb-24">
              <SectionHeader
                title="Cloud Sync Everywhere"
                subtitle="Access your inventory anywhere, anytime. All your data automatically syncs across your phone, tablet, and web browser in real-time."
                align="left"
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <InfoCard
                  icon={RefreshCw}
                  title="Real-Time Sync"
                  description="Changes appear instantly on all devices."
                  variant="highlight"
                />
                <InfoCard
                  icon={Smartphone}
                  title="Cross-Platform"
                  description="iOS, Android, and web all in sync."
                  variant="highlight"
                />
                <InfoCard
                  icon={Cloud}
                  title="Secure Backup"
                  description="Your data is safely backed up in the cloud."
                  variant="highlight"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Stop Living Like a Disaster?</h2>
            <p>StashDog is now available! Download the app and finally get your shit together.</p>
            <div className="cta-buttons">
              <AppStoreButton onClick={handleDownloadClick} />
              <GooglePlayButton onClick={handleDownloadClick} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
  )
}

export default FeaturesPage
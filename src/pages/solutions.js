import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppStoreButton from "../components/AppStoreButton";
import GooglePlayButton from "../components/GooglePlayButton";
import InfoCard from "../components/InfoCard";
import SectionHeader from "../components/SectionHeader";
import { useFirebase } from "../hooks/useFirebase";
import "../styles/global.css";
import { Brain, Package, Users, Home, Target, Siren, Shield } from "lucide-react";

const SolutionsPage = () => {
  const { isInitialized, logEvent } = useFirebase();

  // Log page view when component mounts
  useEffect(() => {
    if (isInitialized) {
      logEvent("page_view", {
        page_title: "StashDog Solutions",
        page_location:
          typeof window !== "undefined" ? window.location.href : "",
        page_path:
          typeof window !== "undefined"
            ? window.location.pathname
            : "/solutions",
      });
    }
  }, [isInitialized, logEvent]);

  const handleDownloadClick = (platform) => {
    if (isInitialized) {
      logEvent('download_click', {
        platform: platform,
        page: 'solutions'
      })
    }
  }

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Home Organization Solutions - Stop Losing Your Shit with StashDog</title>
          <meta
            name="description"
            content="StashDog solutions for moving stress, family organization chaos, roommate coordination, emergency preparedness, and collector management. Transform physical clutter into digital clarity with zero mental overhead."
          />
          <meta
            name="keywords"
            content="home organization solutions, inventory management, moving organization, family organization, roommate coordination, emergency preparedness, collector management, digital organization, photo inventory, smart search"
          />
          <link rel="canonical" href="https://stashdog.io/solutions/" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content="Solutions - StashDog" />
          <meta
            property="og:description"
            content="Turn physical chaos into digital clarity with StashDog's proven organizational solutions."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/solutions" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Solutions - StashDog" />
          <meta
            name="twitter:description"
            content="Turn physical chaos into digital clarity with proven organizational solutions."
          />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does StashDog help with general home organization?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog eliminates the mental overhead of traditional organization by making your stuff findable no matter where you put it. Put things anywhere, snap a photo, and find them instantly when needed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does StashDog help with moving?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog makes moving stress-free by allowing you to pack however you want, using QR codes on boxes, and finding items instantly during unpacking without any planning required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does StashDog help with family organization?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog enables family coordination without coordination by allowing everyone to store their way, building a collective inventory automatically, and providing voice-powered finding capabilities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does StashDog help with shared living situations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog eliminates roommate politics by automatically tracking ownership, managing shared items, and making move-out easy with clear item identification."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does StashDog help collectors?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog helps collectors track their items without cataloging by snapping photos as items are acquired, recognizing valuable pieces automatically, and preventing duplicate purchases."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does StashDog help with emergency preparedness?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "StashDog makes emergency preparedness effortless by organizing crisis collections, using smart tagging for urgency, and providing instant access to critical items during emergencies."
                  }
                }
              ]
            })}
          </script>

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
        </Helmet>

        <Header />

        {/* Hero Section */}
        <section className="stashdog-hero">
          <div className="container" style={{ textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
            <h1 className="hero-title">Never Think About Where to Put Something Ever Again</h1>
            <div style={{ 
              maxWidth: '900px', 
              margin: '0 auto',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <img
                src="/solutions-hero.png"
                alt=""
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
            <br/><br/>
            <p className="hero-description" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
              Stop organizing. Start living. StashDog eliminates the mental
              overhead of traditional organization by making your stuff findable
              no matter where you put it.
            </p>
            <p style={{ marginTop: '-2rem', marginBottom: '3rem', fontSize: '1.1rem' }}>
              <Link to="/features" style={{ color: '#fcd900', textDecoration: 'underline' }}>
                Explore StashDog's powerful features →
              </Link>
            </p>
          </div>
        </section>
        {/* Core Principles Section */}
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
            borderTop: "1px solid rgba(252, 217, 0, 0.1)",
            borderBottom: "1px solid rgba(252, 217, 0, 0.1)",
          }}
        >
          <div className="container">
            <SectionHeader 
              title="The StashDog Philosophy" 
              subtitle="Three principles that make organization sustainable for humans who have better things to do"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "2rem",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid rgba(252, 217, 0, 0.2)",
                }}
              >
                <img
                  src="/solution1.png"
                  alt="Liberation of Just Put It Anywhere"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Liberation of "Just Put It Anywhere"
                </h3>
                <p style={{ color: "#e0e0e0" }}>
                  Traditional organization forces you to think about retrieval
                  at storage time. We separate those completely - put things
                  wherever makes sense in the moment, find them instantly when
                  needed.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "2rem",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid rgba(252, 217, 0, 0.2)",
                }}
              >
                <img
                  src="/solution2.png"
                  alt="Cognitive Load Transfer"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Cognitive Load Transfer
                </h3>
                <p style={{ color: "#e0e0e0" }}>
                  Instead of making you remember organizational systems, we
                  remember everything for you. Your brain is freed up for more
                  important things than being a human filing cabinet.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "2rem",
                  borderRadius: "10px",
                  textAlign: "center",
                  border: "1px solid rgba(252, 217, 0, 0.2)",
                }}
              >
                <img
                  src="/solution3.png"
                  alt="Smart Enough to Be Lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.3rem",
                  }}
                >
                  Smart Enough to Be Lazy
                </h3>
                <p style={{ color: "#e0e0e0" }}>
                  The effort goes into the technology, not your behavior. Be as
                  disorganized as you want - our AI gets smarter while your
                  habits stay exactly the same.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="products">
          <div className="container">
            <SectionHeader 
              title="Real Solutions for Real Disasters" 
              subtitle="Each solution transforms exhausting physical problems into simple information lookups. Put things anywhere - we'll help you find them everywhere."
            />

            {/* Getting Started Solution */}
            <div id="general" className="mb-24">
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard 
                  icon={Brain}
                  title="The Mental Load"
                  description="Your ADHD is overpowering your OCD and it's exhausting. Every time you put something away, you have to think about where it should go. That's hundreds of micro-decisions draining your brain every single day."
                  variant="warning"
                >
                  <div className="mt-4 text-sm text-gray-400 uppercase tracking-wider font-bold">The Problem</div>
                </InfoCard>

                <InfoCard 
                  icon={Target}
                  title="The Zero-System System"
                  description="No categories to remember, no systems to maintain. Just put stuff away and trust that you can find it later."
                  variant="success"
                  actionLink="/download"
                  actionText="Stop Thinking, Start Storing"
                >
                  <div className="mt-4">
                    <h4 className="text-primary font-bold mb-2">How StashDog Helps:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Put It Anywhere: Drawer, box, shelf - wherever feels right</li>
                      <li>Snap & Forget: Quick photo captures what and where</li>
                      <li>AI Remembers Everything: Learns your patterns automatically</li>
                      <li>Ask When You Need It: Instant answers to 'Where's my stuff?'</li>
                    </ul>
                  </div>
                </InfoCard>
              </div>
            </div>

            {/* Moving Solution */}
            <div id="moving" className="mb-24">
              <SectionHeader 
                title="Moving Without the Breakdown" 
                subtitle="Life Transition Solution"
                align="left"
                className="mb-8"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard 
                  icon={Package}
                  title="The Moving Nightmare"
                  description="You have to remember what's in every box, where each box should go, and what you need to unpack first. Your brain becomes a filing cabinet you can't trust."
                  variant="warning"
                />

                <InfoCard 
                  icon={Target}
                  title="Move Like a Genius"
                  description="No box labeling strategies, no room planning, no unpacking schedules. Just pack, move, and find what you need when you need it."
                  variant="success"
                  actionLink="/download"
                  actionText="Get Moving"
                >
                  <div className="mt-4">
                    <h4 className="text-primary font-bold mb-2">The Solution:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Pack However You Want: Random stuff in boxes? Perfect.</li>
                      <li>QR Code Magic: Stick codes on boxes, forget what's inside.</li>
                      <li>Smart Unpacking: Find exactly what you need instantly.</li>
                      <li>No Planning Required: Unpack based on need, not systems.</li>
                    </ul>
                  </div>
                </InfoCard>
              </div>
            </div>

            {/* Family Chaos Solution */}
            <div id="family" className="mb-24">
              <SectionHeader 
                title="Family Coordination" 
                subtitle="Household Management Solution"
                align="left"
                className="mb-8"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard 
                  icon={Users}
                  title="The Family Feud"
                  description="You have to remember where everyone puts everything, teach family members your system, and coordinate who's responsible for what. It's like being the household's Google."
                  variant="warning"
                />

                <InfoCard 
                  icon={Home}
                  title="Harmony Restored"
                  description="No family organization training, no systems to maintain, no one person keeping track of everything. Chaos that just works."
                  variant="success"
                  actionLink="/download"
                  actionText="Organize Your Chaos"
                >
                  <div className="mt-4">
                    <h4 className="text-primary font-bold mb-2">The Solution:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Everyone Stores Their Way: Kids shove toys wherever - it's fine.</li>
                      <li>Collective Intelligence: Inventory builds automatically.</li>
                      <li>Voice-Powered Finding: 'Hey Google, where are the keys?'</li>
                      <li>No Rules to Enforce: No teaching or training required.</li>
                    </ul>
                  </div>
                </InfoCard>
              </div>
            </div>

            {/* Roommate Solution */}
            <div id="roommates" className="mb-24">
              <SectionHeader 
                title="Shared Living" 
                subtitle="Collaborative Organization Solution"
                align="left"
                className="mb-8"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard 
                  icon={Home}
                  title="Roommate Politics"
                  description="Remembering what belongs to whom, coordinating shared items, and navigating different styles. Plus the constant 'who took my...' investigations."
                  variant="warning"
                />

                <InfoCard 
                  icon={Users}
                  title="Share Without Stress"
                  description="No shared organization rules, no house meetings about storage, no one person managing everyone else's stuff."
                  variant="success"
                  actionLink="/download"
                  actionText="Start Sharing"
                >
                  <div className="mt-4">
                    <h4 className="text-primary font-bold mb-2">The Solution:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Automatic Ownership: Tracks who added what.</li>
                      <li>Shared Item Autopilot: Find communal stuff instantly.</li>
                      <li>Borrowing Without Drama: Digital check-out system.</li>
                      <li>Move-Out Made Easy: Know exactly what's yours.</li>
                    </ul>
                  </div>
                </InfoCard>
              </div>
            </div>

            {/* Collector Solution */}
            <div id="collectors" className="mb-24">
              <SectionHeader 
                title="Collecting Without Cataloging" 
                subtitle="Hobby & Collection Solution"
                align="left"
                className="mb-8"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard 
                  icon={Target}
                  title="The Collector's Burden"
                  description="Remembering what you own, where you stored it, condition, and cost. Your collection becomes a memory test instead of a joy."
                  variant="warning"
                />

                <InfoCard 
                  icon={Package}
                  title="Collect Like a Pro"
                  description="No spreadsheets to maintain, no database management, no constant value research. Just collect and enjoy."
                  variant="success"
                  actionLink="/download"
                  actionText="Start Collecting"
                >
                  <div className="mt-4">
                    <h4 className="text-primary font-bold mb-2">The Solution:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Snap as You Acquire: Quick photo when you get it.</li>
                      <li>AI Knows Your Collection: Recognizes valuable pieces.</li>
                      <li>Duplicate Prevention: Warnings before you buy again.</li>
                      <li>Value Tracking: Watch your collection's worth grow.</li>
                    </ul>
                  </div>
                </InfoCard>
              </div>
            </div>

            {/* Emergency Prep Solution */}
            <div className="mb-24">
              <SectionHeader 
                title="Emergency Preparedness" 
                subtitle="Crisis Management Solution"
                align="left"
                className="mb-8"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard 
                  icon={Siren}
                  title="The Panic Factor"
                  description="In an emergency, you can't remember where the batteries, first aid kit, or important documents are. Panic makes you forget everything."
                  variant="warning"
                />

                <InfoCard 
                  icon={Shield}
                  title="Ready for Anything"
                  description="Instant access to critical items when seconds count. Know exactly where your emergency supplies are without searching."
                  variant="success"
                  actionLink="/download"
                  actionText="Get Prepared"
                >
                  <div className="mt-4">
                    <h4 className="text-primary font-bold mb-2">The Solution:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Crisis Collections: Group emergency items together.</li>
                      <li>Smart Tagging: Mark items for rapid retrieval.</li>
                      <li>Expiry Alerts: Know when to replace meds/food.</li>
                      <li>Offline Access: Works even when the internet is down.</li>
                    </ul>
                  </div>
                </InfoCard>
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
    </HelmetProvider>
  );
};

export default SolutionsPage;

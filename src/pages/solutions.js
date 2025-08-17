import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppStoreButton from "../components/AppStoreButton";
import GooglePlayButton from "../components/GooglePlayButton";
import { useFirebase } from "../hooks/useFirebase";
import "../styles/global.css";

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
          <title>Solutions - StashDog</title>
          <meta
            name="description"
            content="Discover how StashDog transforms your physical chaos into searchable, manageable information systems. Real solutions for real organizational problems."
          />
          <meta
            name="keywords"
            content="home organization solutions, inventory management, moving organization, family organization, business inventory"
          />

          {/* Open Graph */}
          <meta property="og:title" content="Solutions - StashDog" />
          <meta
            property="og:description"
            content="Turn physical chaos into digital clarity with StashDog's proven organizational solutions."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.app/solutions" />
          <meta property="og:image" content="https://stashdog.app/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Solutions - StashDog" />
          <meta
            name="twitter:description"
            content="Turn physical chaos into digital clarity with proven organizational solutions."
          />
          <meta name="twitter:image" content="https://stashdog.app/lab1.png" />

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
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <img
                src="/lab1.png"
                alt="StashDog Solutions"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            </div>
            <h2>Never Think About Where to Put Something Ever Again</h2>
            <p>
              Stop organizing. Start living. StashDog eliminates the mental
              overhead of traditional organization by making your stuff findable
              no matter where you put it.
            </p>
          </div>
        </section>
        {/* Core Principles Section */}
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
            padding: "4rem 0",
            borderTop: "1px solid rgba(252, 217, 0, 0.1)",
            borderBottom: "1px solid rgba(252, 217, 0, 0.1)",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ color: "#fcd900", marginBottom: "1rem" }}>
                The StashDog Philosophy
              </h2>
              <p
                style={{
                  color: "#e0e0e0",
                  fontSize: "1.2rem",
                  maxWidth: "700px",
                  margin: "0 auto",
                }}
              >
                Three principles that make organization sustainable for humans
                who have better things to do
              </p>
            </div>

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
            <h2>Real Solutions for Real Disasters</h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                color: "#e0e0e0",
                maxWidth: "700px",
                margin: "0 auto 3rem auto",
              }}
            >
              Each solution transforms exhausting physical problems into simple
              information lookups. Put things anywhere - we'll help you find
              them everywhere.
            </p>

            {/* Getting Started Solution */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🤯 Drowning in Your Own Stuff?</h3>
                  <div
                    style={{
                      color: "#fcd900",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    The Zero-System Organization System
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(232, 73, 29, 0.1)",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  borderLeft: "3px solid #e8491d",
                }}
              >
                <strong style={{ color: "#fcd900" }}>The Mental Load:</strong>{" "}
                Your ADHD is overpowering your OCD and it's exhausting. Every
                time you put something away, you have to think about where it
                should go, what category it belongs in, and how you'll remember
                to find it later. That's hundreds of micro-decisions draining
                your brain every single day.
              </div>

              <div style={{ margin: "1.5rem 0" }}>
                <h4
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  How StashDog Eliminates the Thinking:
                </h4>
                <ol style={{ marginLeft: "1.5rem", color: "#e0e0e0" }}>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Put It Anywhere:</strong> Literally anywhere.
                    Drawer, box, shelf - wherever feels right in the moment
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Snap & Forget:</strong> Quick photo captures what
                    and where, then forget about it completely
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>AI Remembers Everything:</strong> The system learns
                    your natural patterns without you teaching it
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Ask When You Need It:</strong> "Where's my phone
                    charger?" gets an instant answer
                  </li>
                </ol>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  border: "1px solid rgba(252, 217, 0, 0.3)",
                }}
              >
                <strong style={{ color: "#fcd900" }}>
                  Zero Mental Overhead:
                </strong>{" "}
                No categories to remember, no systems to maintain, no
                coordination with others. Just put stuff away and trust that you
                can find it later.
              </div>

              <Link to="/download" className="cta-button">
                Stop Thinking, Start Storing →
              </Link>
            </div>

            {/* Moving Solution */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>📦 Moving Without the Mental Breakdown</h3>
                  <div
                    style={{
                      color: "#fcd900",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Life Transition Solution
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(232, 73, 29, 0.1)",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  borderLeft: "3px solid #e8491d",
                }}
              >
                <strong style={{ color: "#fcd900" }}>The Mental Load:</strong>{" "}
                You have to remember what's in every box, where each box should
                go in the new place, and what you need to unpack first. Your
                brain becomes a filing cabinet you can't trust.
              </div>

              <div style={{ margin: "1.5rem 0" }}>
                <h4
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  How StashDog Eliminates the Remembering:
                </h4>
                <ol style={{ marginLeft: "1.5rem", color: "#e0e0e0" }}>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Pack However You Want:</strong> Random stuff in
                    boxes? Perfect. StashDog doesn't care about logic
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>QR Code Magic:</strong> Stick codes on boxes, forget
                    what's inside - the system remembers
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Smart Unpacking:</strong> "Find me something to eat
                    dinner with" locates the right box instantly
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>No Planning Required:</strong> Unpack based on need,
                    not on some imaginary organizational system
                  </li>
                </ol>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  border: "1px solid rgba(252, 217, 0, 0.3)",
                }}
              >
                <strong style={{ color: "#fcd900" }}>
                  Zero Mental Overhead:
                </strong>{" "}
                No box labeling strategies, no room planning, no unpacking
                schedules. Just pack, move, and find what you need when you need
                it.
              </div>

              <Link to="/download" className="cta-button">
                Move Like a Genius →
              </Link>
            </div>

            {/* Family Chaos Solution */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>👨‍👩‍👧‍👦 Family Coordination Without Coordination</h3>
                  <div
                    style={{
                      color: "#fcd900",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Household Management Solution
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(232, 73, 29, 0.1)",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  borderLeft: "3px solid #e8491d",
                }}
              >
                <strong style={{ color: "#fcd900" }}>The Mental Load:</strong>{" "}
                You have to remember where everyone puts everything, teach
                family members your organizational system, and coordinate who's
                responsible for what. It's like being the household's Google
                search engine.
              </div>

              <div style={{ margin: "1.5rem 0" }}>
                <h4
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  How StashDog Eliminates the Coordination:
                </h4>
                <ol style={{ marginLeft: "1.5rem", color: "#e0e0e0" }}>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Everyone Stores Their Way:</strong> Kids shove toys
                    wherever, adults have different systems - all fine
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Collective Intelligence:</strong> Family inventory
                    builds automatically as everyone adds stuff
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Voice-Powered Finding:</strong> "Hey Google, where
                    are the Christmas lights?" actually works
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>No Rules to Enforce:</strong> No teaching, training,
                    or family meetings about organization
                  </li>
                </ol>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  border: "1px solid rgba(252, 217, 0, 0.3)",
                }}
              >
                <strong style={{ color: "#fcd900" }}>
                  Zero Mental Overhead:
                </strong>{" "}
                No family organization training, no systems to maintain, no one
                person keeping track of everything. Chaos that just works.
              </div>

              <Link to="/download" className="cta-button">
                Organize Your Chaos →
              </Link>
            </div>

            {/* Roommate Solution */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🏠 Shared Living Without Shared Systems</h3>
                  <div
                    style={{
                      color: "#fcd900",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Collaborative Organization Solution
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(232, 73, 29, 0.1)",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  borderLeft: "3px solid #e8491d",
                }}
              >
                <strong style={{ color: "#fcd900" }}>The Mental Load:</strong>{" "}
                You need to remember what belongs to whom, coordinate shared
                items, and navigate everyone's different organizational styles.
                Plus the constant "who took my..." investigations.
              </div>

              <div style={{ margin: "1.5rem 0" }}>
                <h4
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  How StashDog Eliminates the Politics:
                </h4>
                <ol style={{ marginLeft: "1.5rem", color: "#e0e0e0" }}>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Automatic Ownership:</strong> System tracks who
                    added what without anyone declaring territory
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Shared Item Autopilot:</strong> Communal stuff gets
                    found regardless of who moved it
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Borrowing Without Drama:</strong> "Check out" items
                    digitally to avoid the awkward conversations
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Move-Out Made Easy:</strong> Everyone knows exactly
                    what belongs to them
                  </li>
                </ol>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  border: "1px solid rgba(252, 217, 0, 0.3)",
                }}
              >
                <strong style={{ color: "#fcd900" }}>
                  Zero Mental Overhead:
                </strong>{" "}
                No shared organization rules, no house meetings about storage,
                no one person managing everyone else's stuff.
              </div>

              <Link to="/download" className="cta-button">
                Share Without the Stress →
              </Link>
            </div>

            {/* Collector Solution */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🎯 Collecting Without Cataloging</h3>
                  <div
                    style={{
                      color: "#fcd900",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Hobby & Collection Solution
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(232, 73, 29, 0.1)",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  borderLeft: "3px solid #e8491d",
                }}
              >
                <strong style={{ color: "#fcd900" }}>The Mental Load:</strong>{" "}
                You have to remember what you own, where you stored it, what
                condition it's in, and what you paid for it. Your collection
                becomes a memory test instead of a joy.
              </div>

              <div style={{ margin: "1.5rem 0" }}>
                <h4
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  How StashDog Eliminates the Tracking:
                </h4>
                <ol style={{ marginLeft: "1.5rem", color: "#e0e0e0" }}>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Snap as You Acquire:</strong> Quick photo when you
                    get something new, then store wherever
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>AI Knows Your Collection:</strong> System recognizes
                    valuable pieces and suggests details automatically
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Duplicate Prevention:</strong> "You already have
                    this" warnings before expensive mistakes
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Value Tracking Without Spreadsheets:</strong> Watch
                    your collection's worth without manual updating
                  </li>
                </ol>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  border: "1px solid rgba(252, 217, 0, 0.3)",
                }}
              >
                <strong style={{ color: "#fcd900" }}>
                  Zero Mental Overhead:
                </strong>{" "}
                No spreadsheets to maintain, no database management, no constant
                value research. Just collect and enjoy.
              </div>

              <Link to="/download" className="cta-button">
                Collect Like a Pro →
              </Link>
            </div>

            {/* Emergency Prep Solution */}
            <div className="product">
              <div className="product-header">
                <div className="product-info">
                  <h3>🚨 Emergency Ready Without the Planning</h3>
                  <div
                    style={{
                      color: "#fcd900",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Crisis Management Solution
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(232, 73, 29, 0.1)",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  borderLeft: "3px solid #e8491d",
                }}
              >
                <strong style={{ color: "#fcd900" }}>The Mental Load:</strong>{" "}
                You need to remember where important documents are, what's in
                your emergency kit, and when supplies expire. Plus the stress of
                trying to find critical items when you're panicked.
              </div>

              <div style={{ margin: "1.5rem 0" }}>
                <h4
                  style={{
                    color: "#fcd900",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  How StashDog Eliminates the Panic:
                </h4>
                <ol style={{ marginLeft: "1.5rem", color: "#e0e0e0" }}>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Crisis Collections:</strong> Group items by
                    emergency type - earthquake kit, power outage supplies,
                    medical emergency docs
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Smart Tagging System:</strong> "Critical,"
                    "Evacuate," "First Aid" tags automatically organize by
                    urgency
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Instant Crisis Mode:</strong> "Find my passport NOW"
                    gets immediate location info
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Backup Without Thinking:</strong> Important docs
                    automatically backed up to secure cloud
                  </li>
                  <li style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                    <strong>Expiration Awareness:</strong> Gentle reminders when
                    emergency supplies need replacing
                  </li>
                </ol>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  margin: "1rem 0",
                  border: "1px solid rgba(252, 217, 0, 0.3)",
                }}
              >
                <strong style={{ color: "#fcd900" }}>
                  Zero Mental Overhead:
                </strong>{" "}
                No emergency planning sessions, no document filing systems, no
                manual inventory management. Ready when you need to be.
              </div>

              <Link to="/download" className="cta-button">
                Prepare Without the Stress →
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Stop Living Like a Disaster?</h2>
            <p>
              StashDog is now available! Download the app and finally get your shit together.
            </p>
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

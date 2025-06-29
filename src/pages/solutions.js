import React, { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"

const SolutionsPage = () => {
  const { isInitialized, logEvent } = useFirebase()

  // Log page view when component mounts
  useEffect(() => {
    if (isInitialized) {
      logEvent('page_view', {
        page_title: 'StashDog Solutions',
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : '/solutions'
      })
    }
  }, [isInitialized, logEvent])

  return (
    <HelmetProvider>
      <div style={{ fontFamily: "'Gabarito', Arial, sans-serif", lineHeight: 1.6, color: '#333', background: '#f9f9f9', margin: 0, padding: 0 }}>
        <Helmet>
          <title>Solutions - StashDog</title>
          <meta name="description" content="Discover how StashDog transforms your physical chaos into searchable, manageable information systems. Real solutions for real organizational problems." />
          <meta name="keywords" content="home organization solutions, inventory management, moving organization, family organization, business inventory" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Solutions - StashDog" />
          <meta property="og:description" content="Turn physical chaos into digital clarity with StashDog's proven organizational solutions." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.app/solutions" />
          <meta property="og:image" content="https://stashdog.app/lab1.png" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Solutions - StashDog" />
          <meta name="twitter:description" content="Turn physical chaos into digital clarity with proven organizational solutions." />
          <meta name="twitter:image" content="https://stashdog.app/lab1.png" />
          
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Gabarito:wght@400..900&display=swap" rel="stylesheet" />
          
          <style>
            {`
              /* Reset and Base Styles */
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Gabarito', Arial, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                background: #f9f9f9; 
              }
              .container { 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 0 2rem; 
              }
              
              /* Header */
              .solutions-site-header {
                background: #35424a;
                color: #fff;
                padding: 1rem 0;
                position: sticky;
                top: 0;
                z-index: 100;
              }
              .solutions-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .solutions-header-logo {
                width: 40px;
                height: 40px;
                margin-right: 10px;
              }
              .solutions-logo-section {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: white;
              }
              .solutions-header-text {
                font-family: 'Chewy', cursive;
                font-size: 1.5rem;
                margin: 0;
              }
              .solutions-nav-link {
                color: #fcd900;
                text-decoration: none;
                font-weight: 500;
                transition: opacity 0.3s;
              }
              .solutions-nav-link:hover {
                opacity: 0.8;
              }
              
              /* Hero Section */
              .solutions-hero {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 4rem 0;
                text-align: center;
              }
              .solutions-hero h1 {
                font-family: 'Chewy', cursive;
                font-size: 3rem;
                margin-bottom: 1rem;
              }
              .solutions-hero p {
                font-size: 1.3rem;
                max-width: 800px;
                margin: 0 auto 2rem;
                opacity: 0.9;
              }
              
              /* Solutions Grid */
              .solutions-section {
                padding: 4rem 0;
              }
              .section-header {
                text-align: center;
                margin-bottom: 3rem;
              }
              .section-header h2 {
                font-family: 'Chewy', cursive;
                font-size: 2.5rem;
                color: #35424a;
                margin-bottom: 1rem;
              }
              .section-header p {
                font-size: 1.2rem;
                color: #666;
                max-width: 700px;
                margin: 0 auto;
              }
              
              .solutions-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-top: 3rem;
              }
              
              .solution-card {
                background: white;
                border-radius: 15px;
                padding: 2rem;
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border-left: 5px solid #fcd900;
              }
              .solution-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 12px 35px rgba(0,0,0,0.15);
              }
              
              .solution-header {
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
              }
              .solution-icon {
                font-size: 2.5rem;
                margin-right: 1rem;
              }
              .solution-card h3 {
                font-size: 1.5rem;
                color: #35424a;
                margin-bottom: 0.5rem;
              }
              .solution-subtitle {
                color: #e8491d;
                font-weight: 600;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              
              .problem-statement {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                border-left: 3px solid #e8491d;
              }
              .problem-statement strong {
                color: #e8491d;
              }
              
              .solution-steps {
                margin: 1.5rem 0;
              }
              .solution-steps h4 {
                color: #35424a;
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
              }
              .solution-steps ol {
                margin-left: 1.5rem;
              }
              .solution-steps li {
                margin-bottom: 0.5rem;
                line-height: 1.5;
              }
              
              .ai-highlight {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
              }
              .ai-highlight strong {
                color: #fcd900;
              }
              
              .solutions-cta-button {
                display: inline-block;
                background: #e8491d;
                color: white;
                padding: 0.8rem 1.5rem;
                text-decoration: none;
                border-radius: 25px;
                font-weight: 600;
                transition: all 0.3s ease;
                margin-top: 1rem;
              }
              .solutions-cta-button:hover {
                background: #d63916;
                transform: translateY(-2px);
              }
              
              /* Principles Section */
              .principles-section {
                background: #35424a;
                color: white;
                padding: 4rem 0;
              }
              .principles-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-top: 2rem;
              }
              .principle-card {
                background: rgba(255,255,255,0.1);
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
              }
              .principle-card h3 {
                color: #fcd900;
                margin-bottom: 1rem;
                font-size: 1.3rem;
              }
              
              /* CTA Section */
              .final-cta {
                background: linear-gradient(135deg, #fcd900, #f4c430);
                color: #35424a;
                padding: 4rem 0;
                text-align: center;
              }
              .final-cta h2 {
                font-family: 'Chewy', cursive;
                font-size: 2.5rem;
                margin-bottom: 1rem;
              }
              .cta-primary {
                background: #35424a;
                color: white;
                padding: 1rem 2rem;
                font-size: 1.2rem;
                margin: 0 0.5rem;
                text-decoration: none;
                border-radius: 25px;
                display: inline-block;
                font-weight: 600;
                transition: all 0.3s ease;
              }
              .cta-secondary {
                background: transparent;
                color: #35424a;
                border: 2px solid #35424a;
                padding: 1rem 2rem;
                font-size: 1.2rem;
                margin: 0 0.5rem;
                text-decoration: none;
                border-radius: 25px;
                display: inline-block;
                font-weight: 600;
                transition: all 0.3s ease;
              }
              .cta-primary:hover, .cta-secondary:hover {
                transform: translateY(-2px);
              }
              
              /* Responsive */
              @media (max-width: 768px) {
                .solutions-hero h1 { font-size: 2rem; }
                .solutions-hero p { font-size: 1.1rem; }
                .solutions-grid { grid-template-columns: 1fr; }
                .container { padding: 0 1rem; }
                .cta-primary, .cta-secondary { 
                  display: block; 
                  margin: 0.5rem 0; 
                  width: 100%; 
                }
              }
            `}
          </style>
        </Helmet>

        {/* Header */}
        <header className="solutions-site-header">
          <div className="container">
            <div className="solutions-header">
              <Link to="/" className="solutions-logo-section">
                <img className="solutions-header-logo" src="/round-logo-goggles.png" alt="StashDog Logo" />
                <p className="solutions-header-text">StashDog</p>
              </Link>
              <nav>
                <Link to="/" className="solutions-nav-link">Home</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="solutions-hero">
          <div className="container">
            <h1>Never Think About Where to Put Something Ever Again</h1>
            <p>Stop organizing. Start living. StashDog eliminates the mental overhead of traditional organization by making your stuff findable no matter where you put it.</p>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="solutions-section">
          <div className="container">
            <div className="section-header">
              <h2>Real Solutions for Real Disasters</h2>
              <p>Each solution transforms exhausting physical problems into simple information lookups. Put things anywhere - we'll help you find them everywhere.</p>
            </div>

            <div className="solutions-grid">
              {/* Getting Started Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🤯</div>
                  <div>
                    <h3>Drowning in Your Own Stuff?</h3>
                    <div className="solution-subtitle">The Zero-System Organization System</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Mental Load:</strong> Your ADHD is overpowering your OCD and it's exhausting. Every time you put something away, you have to think about where it should go, what category it belongs in, and how you'll remember to find it later. That's hundreds of micro-decisions draining your brain every single day.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Eliminates the Thinking:</h4>
                  <ol>
                    <li><strong>Put It Anywhere:</strong> Literally anywhere. Drawer, box, shelf - wherever feels right in the moment</li>
                    <li><strong>Snap & Forget:</strong> Quick photo captures what and where, then forget about it completely</li>
                    <li><strong>AI Remembers Everything:</strong> The system learns your natural patterns without you teaching it</li>
                    <li><strong>Ask When You Need It:</strong> "Where's my phone charger?" gets an instant answer</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>Zero Mental Overhead:</strong> No categories to remember, no systems to maintain, no coordination with others. Just put stuff away and trust that you can find it later.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">Stop Thinking, Start Storing →</Link>
              </div>

              {/* Moving Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">📦</div>
                  <div>
                    <h3>Moving Without the Mental Breakdown</h3>
                    <div className="solution-subtitle">Life Transition Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Mental Load:</strong> You have to remember what's in every box, where each box should go in the new place, and what you need to unpack first. Your brain becomes a filing cabinet you can't trust.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Eliminates the Remembering:</h4>
                  <ol>
                    <li><strong>Pack However You Want:</strong> Random stuff in boxes? Perfect. StashDog doesn't care about logic</li>
                    <li><strong>QR Code Magic:</strong> Stick codes on boxes, forget what's inside - the system remembers</li>
                    <li><strong>Smart Unpacking:</strong> "Find me something to eat dinner with" locates the right box instantly</li>
                    <li><strong>No Planning Required:</strong> Unpack based on need, not on some imaginary organizational system</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>Zero Mental Overhead:</strong> No box labeling strategies, no room planning, no unpacking schedules. Just pack, move, and find what you need when you need it.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">Move Like a Genius →</Link>
              </div>

              {/* Family Chaos Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">👨‍👩‍👧‍👦</div>
                  <div>
                    <h3>Family Coordination Without Coordination</h3>
                    <div className="solution-subtitle">Household Management Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Mental Load:</strong> You have to remember where everyone puts everything, teach family members your organizational system, and coordinate who's responsible for what. It's like being the household's Google search engine.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Eliminates the Coordination:</h4>
                  <ol>
                    <li><strong>Everyone Stores Their Way:</strong> Kids shove toys wherever, adults have different systems - all fine</li>
                    <li><strong>Collective Intelligence:</strong> Family inventory builds automatically as everyone adds stuff</li>
                    <li><strong>Voice-Powered Finding:</strong> "Hey Google, where are the Christmas lights?" actually works</li>
                    <li><strong>No Rules to Enforce:</strong> No teaching, training, or family meetings about organization</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>Zero Mental Overhead:</strong> No family organization training, no systems to maintain, no one person keeping track of everything. Chaos that just works.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">Organize Your Chaos →</Link>
              </div>

              {/* Roommate Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🏠</div>
                  <div>
                    <h3>Shared Living Without Shared Systems</h3>
                    <div className="solution-subtitle">Collaborative Organization Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Mental Load:</strong> You need to remember what belongs to whom, coordinate shared items, and navigate everyone's different organizational styles. Plus the constant "who took my..." investigations.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Eliminates the Politics:</h4>
                  <ol>
                    <li><strong>Automatic Ownership:</strong> System tracks who added what without anyone declaring territory</li>
                    <li><strong>Shared Item Autopilot:</strong> Communal stuff gets found regardless of who moved it</li>
                    <li><strong>Borrowing Without Drama:</strong> "Check out" items digitally to avoid the awkward conversations</li>
                    <li><strong>Move-Out Made Easy:</strong> Everyone knows exactly what belongs to them</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>Zero Mental Overhead:</strong> No shared organization rules, no house meetings about storage, no one person managing everyone else's stuff.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">Share Without the Stress →</Link>
              </div>

              {/* Collector Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🎯</div>
                  <div>
                    <h3>Collecting Without Cataloging</h3>
                    <div className="solution-subtitle">Hobby & Collection Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Mental Load:</strong> You have to remember what you own, where you stored it, what condition it's in, and what you paid for it. Your collection becomes a memory test instead of a joy.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Eliminates the Tracking:</h4>
                  <ol>
                    <li><strong>Snap as You Acquire:</strong> Quick photo when you get something new, then store wherever</li>
                    <li><strong>AI Knows Your Collection:</strong> System recognizes valuable pieces and suggests details automatically</li>
                    <li><strong>Duplicate Prevention:</strong> "You already have this" warnings before expensive mistakes</li>
                    <li><strong>Value Tracking Without Spreadsheets:</strong> Watch your collection's worth without manual updating</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>Zero Mental Overhead:</strong> No spreadsheets to maintain, no database management, no constant value research. Just collect and enjoy.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">Collect Like a Pro →</Link>
              </div>

              {/* Emergency Prep Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🚨</div>
                  <div>
                    <h3>Emergency Ready Without the Planning</h3>
                    <div className="solution-subtitle">Crisis Management Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Mental Load:</strong> You need to remember where important documents are, what's in your emergency kit, and when supplies expire. Plus the stress of trying to find critical items when you're panicked.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Eliminates the Panic:</h4>
                  <ol>
                    <li><strong>Crisis Collections:</strong> Group items by emergency type - earthquake kit, power outage supplies, medical emergency docs</li>
                    <li><strong>Smart Tagging System:</strong> "Critical," "Evacuate," "First Aid" tags automatically organize by urgency</li>
                    <li><strong>Instant Crisis Mode:</strong> "Find my passport NOW" gets immediate location info</li>
                    <li><strong>Backup Without Thinking:</strong> Important docs automatically backed up to secure cloud</li>
                    <li><strong>Expiration Awareness:</strong> Gentle reminders when emergency supplies need replacing</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>Zero Mental Overhead:</strong> No emergency planning sessions, no document filing systems, no manual inventory management. Ready when you need to be.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">Prepare Without the Stress →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles Section */}
        <section className="principles-section">
          <div className="container">
            <div className="section-header">
              <h2 style={{color: 'white'}}>The StashDog Philosophy</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Three principles that make organization sustainable for humans who have better things to do</p>
            </div>
            
            <div className="principles-grid">
              <div className="principle-card">
                <h3>Liberation of "Just Put It Anywhere"</h3>
                <p>Traditional organization forces you to think about retrieval at storage time. We separate those completely - put things wherever makes sense in the moment, find them instantly when needed.</p>
              </div>
              
              <div className="principle-card">
                <h3>Cognitive Load Transfer</h3>
                <p>Instead of making you remember organizational systems, we remember everything for you. Your brain is freed up for more important things than being a human filing cabinet.</p>
              </div>
              
              <div className="principle-card">
                <h3>Smart Enough to Be Lazy</h3>
                <p>The effort goes into the technology, not your behavior. Be as disorganized as you want - our AI gets smarter while your habits stay exactly the same.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="container">
            <h2>Ready to Stop Living Like a Disaster?</h2>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>Pick a solution that matches your chaos level and start turning your physical problems into solvable information problems.</p>
            
            <div>
              <Link to="/waitlist" className="cta-primary">Download StashDog</Link>
              <Link to="/" className="cta-secondary">See More Examples</Link>
            </div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  )
}

export default SolutionsPage 
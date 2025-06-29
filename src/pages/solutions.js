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
            <h1>Turn Physical Chaos Into Digital Clarity</h1>
            <p>Stop digging through boxes and drawers like a confused raccoon. These proven solutions transform your organizational nightmares into searchable, manageable information systems.</p>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="solutions-section">
          <div className="container">
            <div className="section-header">
              <h2>Real Solutions for Real Disasters</h2>
              <p>Each solution transforms a physical mess into an information problem that's actually solvable. Pick your chaos level and let's fix this shit.</p>
            </div>

            <div className="solutions-grid">
              {/* Moving Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">📦</div>
                  <div>
                    <h3>Moving Without Losing Your Mind</h3>
                    <div className="solution-subtitle">Life Transition Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Problem:</strong> You're moving and have 47 boxes labeled "miscellaneous" and zero idea what's in any of them. Your new place looks like a storage unit exploded.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Fixes This:</h4>
                  <ol>
                    <li><strong>Pre-Move Inventory:</strong> Photo everything before you pack it</li>
                    <li><strong>Smart Box Labeling:</strong> Generate QR codes for each box with complete contents</li>
                    <li><strong>Location Updates:</strong> Track boxes from old house → truck → new rooms</li>
                    <li><strong>Unpacking Priority:</strong> Search "kitchen essentials" to find the box with your coffee maker first</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>AI Magic:</strong> Takes your terrible box photos and auto-generates detailed inventories. Recognizes "that kitchen stuff" and suggests better organization.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">See Moving Workflow →</Link>
              </div>

              {/* Family Chaos Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">👨‍👩‍👧‍👦</div>
                  <div>
                    <h3>Taming Family Chaos</h3>
                    <div className="solution-subtitle">Household Management Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Problem:</strong> Your house is a tornado of kids' toys, seasonal decorations, and random crap nobody claims ownership of. Finding anything requires a family-wide investigation.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Fixes This:</h4>
                  <ol>
                    <li><strong>Shared Family Inventory:</strong> Everyone can add and search the same database</li>
                    <li><strong>Voice Integration:</strong> "Hey Google, where are the Christmas lights?" actually works</li>
                    <li><strong>Responsibility Tracking:</strong> See who put what where (and make them go get it)</li>
                    <li><strong>Seasonal Swaps:</strong> Find winter clothes when it actually gets cold</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>AI Magic:</strong> Recognizes "kids' stuff" vs "adult stuff" and suggests family-friendly organization systems that actually work with chaos.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">See Family Setup →</Link>
              </div>

              {/* Small Business Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🏪</div>
                  <div>
                    <h3>Small Business Inventory That Works</h3>
                    <div className="solution-subtitle">Business Organization Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Problem:</strong> You're running an Etsy shop from your spare room and can't find your inventory half the time. Orders are backing up because you can't locate the damn products.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Fixes This:</h4>
                  <ol>
                    <li><strong>Product Location Tracking:</strong> Know exactly where each item lives</li>
                    <li><strong>Stock Level Monitoring:</strong> See what you're running low on at a glance</li>
                    <li><strong>Batch Processing:</strong> Organize restocking and fulfillment by location</li>
                    <li><strong>Customer Communication:</strong> Actually know if you have something in stock</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>AI Magic:</strong> Learns your business patterns and suggests optimal storage layouts. Predicts what you'll need based on seasonal trends.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">See Business Tools →</Link>
              </div>

              {/* Roommate Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🏠</div>
                  <div>
                    <h3>Shared Living Sanity</h3>
                    <div className="solution-subtitle">Collaborative Organization Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Problem:</strong> Living with roommates means constant confusion about who owns what, where shared items are, and why the good scissors always disappear.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Fixes This:</h4>
                  <ol>
                    <li><strong>Ownership Clarity:</strong> Tag items by owner so everyone knows what's whose</li>
                    <li><strong>Shared Item Tracking:</strong> Communal stuff gets its own category</li>
                    <li><strong>Borrowing System:</strong> Check out items to avoid the "who took my drill" drama</li>
                    <li><strong>Move-Out Logistics:</strong> When someone leaves, everyone knows what goes with them</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>AI Magic:</strong> Suggests fair sharing systems and reminds people to return borrowed items before roommate wars start.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">See Sharing Features →</Link>
              </div>

              {/* Collector Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🎯</div>
                  <div>
                    <h3>Collector's Database</h3>
                    <div className="solution-subtitle">Hobby & Collection Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Problem:</strong> You collect vintage cameras/action figures/vinyl records and can't remember what you have, where it is, or what you paid for it. Buying duplicates is becoming expensive.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Fixes This:</h4>
                  <ol>
                    <li><strong>Collection Cataloging:</strong> Photo and detail every piece in your collection</li>
                    <li><strong>Value Tracking:</strong> Record purchase prices and current values</li>
                    <li><strong>Condition Documentation:</strong> Visual history of each item's condition</li>
                    <li><strong>Shopping Prevention:</strong> Search before you buy to avoid duplicates</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>AI Magic:</strong> Recognizes specific collectible details and suggests market values. Warns you when you're about to buy something you already own.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">See Collection Tools →</Link>
              </div>

              {/* Emergency Prep Solution */}
              <div className="solution-card">
                <div className="solution-header">
                  <div className="solution-icon">🚨</div>
                  <div>
                    <h3>Emergency Preparedness</h3>
                    <div className="solution-subtitle">Crisis Management Solution</div>
                  </div>
                </div>
                
                <div className="problem-statement">
                  <strong>The Problem:</strong> Natural disaster hits or you need to evacuate. You have 15 minutes to grab important documents and essentials, but you can't remember where anything is.
                </div>
                
                <div className="solution-steps">
                  <h4>How StashDog Fixes This:</h4>
                  <ol>
                    <li><strong>Critical Item Tagging:</strong> Mark passports, insurance docs, medications as priority</li>
                    <li><strong>Go-Bag Inventory:</strong> Track what's in your emergency kit and when to replace it</li>
                    <li><strong>Document Backup:</strong> Photos of important papers stored securely in the cloud</li>
                    <li><strong>Quick Location Access:</strong> Find critical items even when stressed and panicked</li>
                  </ol>
                </div>
                
                <div className="ai-highlight">
                  <strong>AI Magic:</strong> Suggests emergency prep improvements based on your actual inventory and reminds you when supplies expire.
                </div>
                
                <Link to="/waitlist" className="solutions-cta-button">See Safety Features →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles Section */}
        <section className="principles-section">
          <div className="container">
            <div className="section-header">
              <h2 style={{color: 'white'}}>The StashDog Philosophy</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Three core principles that make organization actually sustainable for normal humans</p>
            </div>
            
            <div className="principles-grid">
              <div className="principle-card">
                <h3>Physical → Information</h3>
                <p>Every organizational problem is really an information problem. Instead of building perfect physical systems, we build searchable digital ones that work with your chaos.</p>
              </div>
              
              <div className="principle-card">
                <h3>Flexible, Not Rigid</h3>
                <p>We don't force you into Marie Kondo perfection. StashDog adapts to however you actually live, work, and organize (or don't organize).</p>
              </div>
              
              <div className="principle-card">
                <h3>AI That Actually Helps</h3>
                <p>Our AI doesn't judge your mess or demand perfection. It learns your patterns and makes your existing chaos more searchable and manageable.</p>
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
import { useEffect, useState } from 'react'

function App() {
  const [theme, setTheme] = useState('light')
  const [view, setView] = useState('dashboard')

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const NavButton = ({ id, label }) => (
    <button className={view === id ? 'active' : ''} onClick={() => setView(id)}>
      {label}
    </button>
  )

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="HelpDeskPro logo">
              <path d="M5 12h6" /><path d="M13 12h6" /><path d="M8 8l-3 4 3 4" /><path d="M16 8l3 4-3 4" />
            </svg>
          </div>
          <div>
            <h1>HelpDeskPro</h1>
            <p>RAG support copilot for e-commerce</p>
          </div>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          <NavButton id="dashboard" label="Dashboard" />
          <NavButton id="storefront" label="Customer chat" />
          <NavButton id="flows" label="Lifecycle flow" />
        </nav>
        <div className="sidebar-card">
          <h3>Prototype scope</h3>
          <p>Simulated RAG, policy-grounded answers, deflection metrics, and unanswered-question tracking in one static demo.</p>
        </div>
        <div className="sidebar-card">
          <h3>Workshop fit</h3>
          <p>Useful for showing end-user flow, admin visibility, honest fallback behavior, and where a real vector pipeline would plug in.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>AI support that stays grounded in store policy</h2>
            <p>HelpDeskPro answers repeat customer questions using your own shipping, return, and product documents, then surfaces deflection, satisfaction, and documentation gaps to the store owner.</p>
          </div>
          <div className="actions">
            <button className="btn ghost" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☀️ Theme' : '🌙 Theme'}
            </button>
            <button className="btn primary" onClick={() => setView('storefront')}>Open live chat demo</button>
          </div>
        </header>

        {view === 'dashboard' && (
          <section className="view-block">
            <div className="hero-grid">
              <article className="card hero-card">
                <span className="eyebrow">Grounded answers • Honest fallback • Admin visibility</span>
                <h3>Reduce repetitive tickets before they become human support work.</h3>
                <p>This prototype shows the full loop: an owner uploads policy content, the customer asks in natural language, the bot responds with concise document-backed guidance, and feedback rolls into dashboard metrics plus unanswered-question review.</p>
                <div className="hero-bullets">
                  <span>Return policy citations</span>
                  <span>Shipping FAQ deflection</span>
                  <span>Fallback when docs are missing</span>
                </div>
              </article>
              <article className="card panel">
                <div className="section-title">
                  <div>
                    <h3>Prototype checklist</h3>
                    <p>What this demo validates today.</p>
                  </div>
                  <span className="badge">Workshop 1</span>
                </div>
                <div className="list">
                  <div className="list-item"><h4>Customer flow</h4><p>Floating widget, quick prompts, cited answers, and thumbs feedback all behave like a small-store storefront assistant.</p></div>
                  <div className="list-item"><h4>Admin flow</h4><p>Metrics for chats, handoffs, deflection, and CSAT are visible in one glance, along with an unanswered-question queue.</p></div>
                  <div className="list-item"><h4>Roadmap readiness</h4><p>UI leaves clean integration points for embeddings, vector search, latency tracking, and a hosted LLM API.</p></div>
                </div>
              </article>
            </div>

            <div className="metrics-grid">
              <article className="card metric"><small>Total chats today</small><strong>148</strong><div className="delta green">↑ 12% vs yesterday</div></article>
              <article className="card metric"><small>Deflected conversations</small><strong>103</strong><div className="delta green">69.6% resolved without handoff</div></article>
              <article className="card metric"><small>Human handoffs</small><strong>45</strong><div className="delta orange">30.4% routed to support</div></article>
              <article className="card metric"><small>CSAT score</small><strong>84%</strong><div className="delta blue">Based on thumbs feedback</div></article>
            </div>

            <div className="analytics-grid">
              <article className="card chart-area">
                <div className="section-title">
                  <div>
                    <h3>Daily deflection trend</h3>
                    <p>Simple simulated activity for the last 7 days.</p>
                  </div>
                  <span className="badge">Deflection</span>
                </div>
                <div className="bars" aria-label="Deflection chart">
                  {[
                    ['Mon', '61%', 45], ['Tue', '66%', 58], ['Wed', '64%', 54],
                    ['Thu', '70%', 72], ['Fri', '68%', 66], ['Sat', '73%', 82], ['Sun', '69%', 70],
                  ].map(([day, pct, height]) => (
                    <div className="bar-wrap" key={day}>
                      <b>{pct}</b>
                      <div className="bar" style={{ height: `${height}%` }}></div>
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="card panel">
                <div className="section-title">
                  <div>
                    <h3>Unanswered questions</h3>
                    <p>Signals where documentation needs work.</p>
                  </div>
                  <span className="badge">Needs content</span>
                </div>
                <div className="list">
                  <div className="list-item"><h4>"Do you price match items bought during influencer live streams?"</h4><p>No matching policy snippet found. Suggested action: add a promotion exceptions section.</p></div>
                  <div className="list-item"><h4>"Can I return skincare if the seal is broken?"</h4><p>Product safety rules are missing in the current return article.</p></div>
                  <div className="list-item"><h4>"How long does custom engraving add to delivery?"</h4><p>Personalization lead times are not documented in shipping FAQs.</p></div>
                </div>
              </article>
            </div>
          </section>
        )}

        {view === 'storefront' && (
          <section className="view-block">
            <div className="hero-grid">
              <article className="card chat-preview">
                <div className="section-title">
                  <div>
                    <h3>Storefront chat widget</h3>
                    <p>Simulated customer experience with grounded responses.</p>
                  </div>
                  <span className="badge">Customer side</span>
                </div>
                <div className="storefront">
                  <div>
                    <div className="eyebrow">Mock storefront</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 1.25rem + 1vw, 2.3rem)', lineHeight: 1.08, marginBottom: '.75rem' }}>
                      Weekend sale on wellness and home essentials.
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '56ch' }}>
                      Customers can browse products and ask questions in the floating HelpDeskPro widget without leaving the page.
                    </p>
                  </div>
                  <div className="product-strip">
                    <div className="product"><span className="badge">Best seller</span><strong>Organic Face Serum</strong><p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>$29 • Ships in 2 days</p></div>
                    <div className="product"><span className="badge">New</span><strong>Weighted Blanket</strong><p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>$69 • 30-day return</p></div>
                    <div className="product"><span className="badge">Bundle</span><strong>Travel Kit Set</strong><p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>$42 • Gift-ready</p></div>
                  </div>
                  <div className="chat-window" aria-label="Chat widget preview">
                    <div className="chat-header">
                      <div><strong>HelpDeskPro Assistant</strong><span style={{ fontSize: 'var(--text-xs)', opacity: 0.88 }}>Grounded in your policy docs</span></div>
                      <span aria-hidden="true">●</span>
                    </div>
                    <div className="chat-body">
                      <div className="bubble user">Can I return a blanket if I opened the packaging?</div>
                      <div className="bubble bot">
                        Yes. The return policy says unopened or gently used home items can be returned within 30 days, as long as they are clean and include the original order number.
                        <span className="cite">Source: Returns Policy §2.1</span>
                      </div>
                      <div className="bubble user">What if the blanket was customized?</div>
                      <div className="bubble bot">
                        I couldn't find a policy section about customized blanket returns in the uploaded documents. Please contact support or add that policy to the store knowledge base.
                        <span className="cite">Fallback triggered</span>
                      </div>
                    </div>
                    <div className="chat-input">
                      <div className="input-row">
                        <input defaultValue="Ask about shipping, returns, or product details…" aria-label="Chat input" readOnly />
                        <button className="btn primary">Send</button>
                      </div>
                      <div className="thumbs">
                        <div className="thumb">👍 Helpful</div>
                        <div className="thumb">👎 Needs work</div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <article className="card panel">
                <div className="section-title">
                  <div>
                    <h3>Why this flow matters</h3>
                    <p>What a professor or evaluator can look for.</p>
                  </div>
                  <span className="badge">Evaluation</span>
                </div>
                <div className="list">
                  <div className="list-item"><h4>Intuitive interaction</h4><p>The chat opens from a recognizable floating widget and keeps the experience lightweight and familiar.</p></div>
                  <div className="list-item"><h4>Trustworthy grounding</h4><p>Answers stay short and point to named policy sections instead of sounding like unsupported generic AI text.</p></div>
                  <div className="list-item"><h4>Honest fallback</h4><p>When documentation is missing, the assistant explicitly says it cannot find support in the uploaded content.</p></div>
                </div>
              </article>
            </div>
          </section>
        )}

        {view === 'flows' && (
          <section className="view-block">
            <div className="split">
              <article className="card panel">
                <div className="section-title">
                  <div>
                    <h3>Lifecycle plan</h3>
                    <p>Current prototype to production path.</p>
                  </div>
                  <span className="badge">Roadmap</span>
                </div>
                <div className="list">
                  <div className="list-item"><h4>1. Document ingestion</h4><p>Upload return, shipping, and product policies; split into chunks; store embeddings in a vector database.</p></div>
                  <div className="list-item"><h4>2. Retrieval layer</h4><p>Find the top matching chunks for each customer question and package them into a grounded prompt.</p></div>
                  <div className="list-item"><h4>3. Response generation</h4><p>Use an LLM API to produce concise answers with quoted evidence, safety rules, and fallback handling.</p></div>
                  <div className="list-item"><h4>4. Evaluation loop</h4><p>Track latency, retrieval hit quality, fallback rate, CSAT, and deflection to improve both docs and prompts.</p></div>
                </div>
              </article>
              <article className="card panel">
                <div className="section-title">
                  <div>
                    <h3>Known limitations</h3>
                    <p>What is simulated in this demo.</p>
                  </div>
                  <span className="badge">Current state</span>
                </div>
                <div className="list">
                  <div className="list-item"><h4>No live backend</h4><p>Chat responses and metrics are mocked to demonstrate flow and interface design.</p></div>
                  <div className="list-item"><h4>No vector DB yet</h4><p>Embeddings, retrieval ranking, and semantic search are represented conceptually rather than executed live.</p></div>
                  <div className="list-item"><h4>No production monitoring</h4><p>Latency, retrieval precision, API cost, and observability are not yet wired into this prototype.</p></div>
                </div>
              </article>
            </div>
            <article className="card footer-note">
              This single-file prototype is designed so you can demo the concept immediately, then hand it to Vercel v0, Cursor, or another coding assistant as the front-end reference for a full-stack version.
            </article>
          </section>
        )}

        <nav className="mobile-tabs" aria-label="Mobile tabs">
          <NavButton id="dashboard" label="Dashboard" />
          <NavButton id="storefront" label="Chat" />
          <NavButton id="flows" label="Flow" />
        </nav>
      </main>
    </div>
  )
}

export default App

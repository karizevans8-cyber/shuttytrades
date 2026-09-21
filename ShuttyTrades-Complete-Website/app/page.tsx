import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Smartphone, Zap, Headphones, Globe2 } from "lucide-react";

const features = [
  ["Live-style market quotes", "Follow major forex pairs in a clean, fast interface.", BarChart3],
  ["Simple demo trading", "Practice BUY and SELL orders with a virtual balance.", Zap],
  ["Risk controls", "Use stop-loss and take-profit fields while learning.", ShieldCheck],
  ["Any device", "Responsive layouts for phone, tablet and laptop.", Smartphone],
  ["Trader support", "Built-in help, FAQ and support request interface.", Headphones],
  ["Global markets", "Track major currency pairs from one dashboard.", Globe2]
] as const;

export default function Home() {
  return (
    <main>
      <nav className="public-nav">
        <Link href="/" className="brand"><span className="brand-mark">↗</span>Shutty<span>Trades</span></Link>
        <div className="nav-links">
          <a href="#features">Features</a><a href="#markets">Markets</a><a href="#about">About</a>
          <Link href="/login" className="nav-login">Log in</Link>
          <Link href="/register" className="btn btn-primary">Open demo account</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot"/> DEMO TRADING PLATFORM</div>
          <h1>Trade smarter.<br/><span>Not harder.</span></h1>
          <p className="hero-text">A modern forex trading experience built for learning, practice and disciplined decision-making.</p>
          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary btn-lg">Start demo trading <ArrowRight size={18}/></Link>
            <Link href="/markets" className="btn btn-ghost btn-lg">Explore markets</Link>
          </div>
          <div className="trust-row"><span>✓ Virtual $10,000 balance</span><span>✓ No real-money deposits</span><span>✓ Mobile ready</span></div>
        </div>
        <div className="hero-terminal">
          <div className="terminal-top"><span className="terminal-dot"></span><span>ShuttyTrades Terminal</span><span className="demo-pill">DEMO</span></div>
          <div className="terminal-body">
            <div className="mini-sidebar"><b>ST</b><i>⌂</i><i>↗</i><i>◫</i><i>◌</i><i>⚙</i></div>
            <div className="chart-area">
              <div className="chart-head"><div><small>EUR/USD</small><strong>1.0852</strong><em>+0.19%</em></div><span>1m&nbsp;&nbsp;5m&nbsp;&nbsp;15m&nbsp;&nbsp;1h&nbsp;&nbsp;4h</span></div>
              <div className="fake-chart">
                <svg viewBox="0 0 700 240" preserveAspectRatio="none"><polyline points="0,180 35,160 70,174 105,130 140,145 175,105 210,125 245,90 280,118 315,72 350,102 385,64 420,82 455,52 490,70 525,42 560,60 595,30 630,54 665,38 700,44" fill="none" stroke="currentColor" strokeWidth="4"/></svg>
              </div>
              <div className="order-row"><button className="buy">BUY&nbsp; 1.0852</button><button className="sell">SELL&nbsp; 1.0850</button></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-title"><div className="eyebrow">WHY SHUTTYTRADES</div><h2>Everything you need to practise trading.</h2><p>Designed around clarity, risk awareness and a smooth trading workflow.</p></div>
        <div className="feature-grid">{features.map(([title, desc, Icon]) => <div className="feature-card" key={title}><div className="icon-box"><Icon size={22}/></div><h3>{title}</h3><p>{desc}</p></div>)}</div>
      </section>

      <section id="markets" className="section market-section">
        <div className="section-title"><div className="eyebrow">MARKETS</div><h2>Major pairs at a glance.</h2></div>
        <div className="market-strip">{[["EUR/USD","1.0852","+0.19%"],["GBP/USD","1.2724","+0.16%"],["USD/JPY","149.36","+0.23%"],["AUD/USD","0.6587","+0.12%"],["USD/CAD","1.3678","+0.18%"]].map(x=><div className="market-chip" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><em>{x[2]}</em></div>)}</div>
      </section>

      <section id="about" className="section split-section">
        <div><div className="eyebrow">BUILT FOR PRACTICE</div><h2>Learn the workflow before real capital is involved.</h2><p>ShuttyTrades currently operates as a demo-only environment. Accounts use virtual funds, and deposit/withdrawal functionality is deliberately disabled.</p><Link href="/dashboard" className="text-link">Open the demo dashboard <ArrowRight size={16}/></Link></div>
        <div className="compliance-card"><ShieldCheck size={28}/><h3>Real money inactive</h3><p>Demo balances only. No payment gateway, custody, broker execution or live client funds are connected in this build.</p></div>
      </section>

      <footer className="footer"><div><Link href="/" className="brand">Shutty<span>Trades</span></Link><p>Trade • Grow • Succeed</p></div><div className="footer-links"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/risk">Risk disclosure</Link><Link href="/faq">FAQ</Link><Link href="/support">Support</Link></div><small>© 2026 ShuttyTrades. Demo environment.</small></footer>
    </main>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Mark, Wordmark } from '../ui/Brand.jsx';
import { Arrow } from '../ui/Icon.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { NAV, EMAIL } from '../../lib/content.js';
import { reduced, setReady } from '../../lib/hooks.js';
import { initScroll, lockScroll, scrollToHashWhenReady } from '../../lib/scroll.js';

const session = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

/* Fixed header. mix-blend-mode: difference keeps it legible on white, black and the animated hero. */
export function Header({ page }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y > last + 6 && y > 160) setHidden(true);
        else if (y < last - 6 || y < 160) setHidden(false);
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <header className={`hdr ${hidden ? 'is-hidden' : ''}`}>
      <a className="hdr__logo" href="/" aria-label="Hydris AI, home">
        <Mark className="hdr__mark" />
        <Wordmark className="hdr__word" />
      </a>
      <nav className="hdr__nav" aria-label="Primary">
        {NAV.map((n, i) => (
          <span key={n.key}>
            <a href={n.href} aria-current={page === n.key ? 'page' : undefined}>{n.label}</a>
            {i < NAV.length - 1 && <span aria-hidden="true">,&nbsp;</span>}
          </span>
        ))}
      </nav>
      <a className="hdr__cta" href="/contact/">Early access <Arrow /></a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr__top grid">
        <div className="ftr__brand">
          <Mark className="ftr__icon" />
          <p className="ftr__lead">Capture knowledge, guide decisions, and strengthen operations.</p>
        </div>
        <div className="ftr__col">
          <p className="ftr__h">Navigation</p>
          <a href="/">Index</a><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/404.html">404</a>
        </div>
        <div className="ftr__col">
          <p className="ftr__h">Platform</p>
          <a href="/#services">Services</a><a href="/#process">Process</a><a href="/#benefits">Benefits</a>
        </div>
        <div className="ftr__col">
          <p className="ftr__h">Contact</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="/contact/">Request early access</a>
        </div>
        <div className="ftr__col">
          <p className="ftr__h">Company</p>
          <span>Hydris Inc.</span><span>Water intelligence</span>
        </div>
      </div>
      <div className="ftr__mark" aria-hidden="true"><Wordmark /></div>
      <div className="ftr__bottom">
        <span>Hydris Inc. &copy; 2026</span>
        <span>All rights reserved</span>
        <a href="#main" data-top="">Back to top <Arrow dir="up" /></a>
      </div>
    </footer>
  );
}

/* Counter preloader, shown once per session on the home page */
export function Preloader() {
  const skip = useMemo(() => reduced || session.get('hydris:intro') === '1', []);
  const [p, setP] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(skip);

  useEffect(() => {
    if (skip) { setReady(); scrollToHashWhenReady(); return undefined; }
    lockScroll(true);
    let fontsOk = false;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { fontsOk = true; });
    const t0 = performance.now();
    const dur = 1100;
    let raf;
    const finish = () => {
      setTimeout(() => {
        setDone(true);
        session.set('hydris:intro', '1');
        setTimeout(() => { lockScroll(false); setReady(); scrollToHashWhenReady(); }, 380);
        setTimeout(() => setGone(true), 1300);
      }, 120);
    };
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      let v = 1 - Math.pow(1 - t, 3);
      if (!fontsOk && now - t0 < 4000) v = Math.min(v, 0.92);
      setP(Math.round(v * 100));
      if (v < 1) raf = requestAnimationFrame(tick); else finish();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [skip]);

  if (gone) return null;
  return (
    <div className={`loader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="loader__top">
        <span className="loader__brand"><Mark className="loader__mark" /> Hydris AI</span>
        <span>The intelligence layer for water</span>
      </div>
      <div className="loader__bottom">
        <span className="loader__count">{p}</span>
        <span className="loader__note">Calibrating</span>
      </div>
      <div className="loader__line"><i style={{ transform: `scaleX(${p / 100})` }} /></div>
    </div>
  );
}

export function Site({ page, children }) {
  useEffect(() => {
    initScroll();
    if (page !== 'home') { setReady(); scrollToHashWhenReady(); }
  }, [page]);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {page === 'home' && <Preloader />}
      <Header page={page} />
      <main id="main">{children}</main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

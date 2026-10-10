import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MetallicPaint from '../reactbits/MetallicPaint/MetallicPaint.jsx';
import Waves from '../reactbits/Waves/Waves.jsx';
import CountUp from '../reactbits/CountUp/CountUp.jsx';
import { Mark } from '../ui/Brand.jsx';
import { Photo } from '../ui/Photo.jsx';
import { Arrow, Reveal, Visible, Words } from '../ui/Primitives.jsx';
import { PHOTOS } from '../../lib/photos.js';
import { FACTS, HERO_TOP } from '../../lib/content.js';
import { hasWebGL2, reduced, useInView, useReady } from '../../lib/hooks.js';

gsap.registerPlugin(ScrollTrigger);

/* Hairline water field that bends around the cursor (React Bits Waves). Used on inner pages and the 404. */
export function InkField({ color = 'rgba(0, 0, 0, 0.2)', xGap = 11, yGap = 34 }) {
  if (reduced) return null;
  return (
    <Waves lineColor={color} backgroundColor="transparent" waveSpeedX={0.008} waveSpeedY={0.004}
      waveAmpX={36} waveAmpY={18} xGap={xGap} yGap={yGap} friction={0.92} tension={0.006} maxCursorMove={110} />
  );
}

/* The Hydris mark rendered as liquid metal (React Bits MetallicPaint), monochrome. */
export function LiquidMark() {
  if (!hasWebGL2 || reduced) return <Mark className="liquid__fallback" />;
  return (
    <MetallicPaint imageSrc="/brand/mark-field.png" preprocessed grayscale seed={21} scale={3} refraction={0} blur={0.012}
      liquid={0.42} speed={0.2} brightness={1.12} contrast={1} angle={24} fresnel={0.8} lightColor="#8a8a8a"
      darkColor="#000000" tintColor="#ffffff" patternSharpness={1} waveAmplitude={0.8} noiseScale={0.5}
      chromaticSpread={0} mouseAnimation={false} distortion={0.6} contour={0.45} />
  );
}

const SCAN = 7; // seconds for one pass of the scan line
const lineSet = (name) => [1024, 1600, 2000].map((w) => `/photos/${name}-lines-${w}.webp ${w}w`).join(', ');

/* ---------------------------------------------------------------------------------------------
   The plant figure. The photograph is laid out like object-fit: cover (anchored at focusX), and
   every overlay lives in the photograph's own coordinates, so rings and readings stay on the tanks
   at any screen size.
   --------------------------------------------------------------------------------------------- */
function PlantFigure({ H, ready }) {
  const p = PHOTOS[H.photo];
  const frame = useRef(null);
  const stage = useRef(null);
  const lensUi = useRef(null);
  const coord = useRef(null);
  const [oxygen, setOxygen] = useState(H.probe.value);
  const [ref, inView] = useInView({ threshold: 0.05 });

  /* Cover layout */
  useEffect(() => {
    const f = frame.current;
    const s = stage.current;
    const ratio = p.W / p.H;
    const fit = () => {
      const fw = f.clientWidth; const fh = f.clientHeight;
      let bw; let bh;
      if (fw / fh > ratio) { bw = fw; bh = fw / ratio; } else { bh = fh; bw = fh * ratio; }
      const left = (fw - bw) * H.focusX;
      const top = (fh - bh) * 0.5;
      Object.assign(s.style, { width: `${bw}px`, height: `${bh}px`, left: `${left}px`, top: `${top}px` });
      s.dataset.left = left; s.dataset.top = top;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    return () => ro.disconnect();
  }, [H.focusX, p.H, p.W]);

  /* The lens: follows a mouse; otherwise drifts slowly across the plant on its own */
  useEffect(() => {
    if (reduced || !inView) return undefined;
    const f = frame.current;
    const s = stage.current;
    let tx = null; let ty = null; let x = f.clientWidth * 0.32; let y = f.clientHeight * 0.4;
    let raf = 0; let idleT = 0; let last = performance.now(); let hover = false;
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = f.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top; hover = true;
    };
    const onLeave = () => { hover = false; };
    const tick = (now) => {
      const dt = Math.min(64, now - last); last = now;
      const w = f.clientWidth; const h = f.clientHeight;
      if (!hover) {
        idleT += dt / 1000;
        tx = w * (0.5 + 0.3 * Math.sin(idleT * 0.31)); ty = h * (0.5 + 0.28 * Math.sin(idleT * 0.47 + 1.3));
      }
      const k = 1 - Math.pow(0.0025, dt / 1000);
      x += (tx - x) * k; y += (ty - y) * k;
      const sx = x - Number(s.dataset.left || 0); const sy = y - Number(s.dataset.top || 0);
      s.style.setProperty('--lx', `${sx.toFixed(1)}px`);
      s.style.setProperty('--ly', `${sy.toFixed(1)}px`);
      lensUi.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      lensUi.current.classList.toggle('is-flip', x > w - 230);
      lensUi.current.classList.toggle('is-low', y < 90);
      if (coord.current) {
        coord.current.textContent = `${(sx / s.clientWidth).toFixed(3)}  ${(sy / s.clientHeight).toFixed(3)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    f.addEventListener('pointermove', onMove);
    f.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); f.removeEventListener('pointermove', onMove); f.removeEventListener('pointerleave', onLeave); };
  }, [inView]);

  /* The oxygen reading drifts a little, like a live value */
  useEffect(() => {
    if (reduced || !inView || !ready) return undefined;
    const id = setInterval(() => {
      setOxygen((v) => Math.round(Math.min(4.6, Math.max(3.9, v + (Math.random() - 0.5) * 0.2)) * 10) / 10);
    }, 2400);
    return () => clearInterval(id);
  }, [inView, ready]);

  const VW = 2000; const VH = Math.round(2000 / (p.W / p.H));
  return (
    <figure ref={ref} className="pfig">
      <div className="pfig__frame" ref={frame}>
        <div className="pfig__stage" ref={stage} style={{ backgroundImage: `url("${p.lqip}")` }}>
          <Photo name={H.photo} sizes="(min-width: 901px) 60vw, 100vw" priority className="pfig__img" />
          {!reduced && (
            <img className="pfig__lines" srcSet={lineSet(H.photo)} src={`/photos/${H.photo}-lines-1024.webp`}
              sizes="(min-width: 901px) 60vw, 100vw" alt="" aria-hidden="true" decoding="async" draggable="false" />
          )}

          <svg className="pfig__svg" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" aria-hidden="true">
            {H.rings.map((r, i) => {
              const cx = r.x * VW; const cy = r.y * VH; const rr = r.r * VW;
              return (
                <g className={`ring ${r.alert ? 'ring--alert' : ''}`} key={r.tag} style={{ '--i': i }}>
                  <circle className="ring__c" cx={cx} cy={cy} r={rr} pathLength="1" />
                  <circle className="ring__o" cx={cx} cy={cy} r={rr * 1.07} style={{ transformOrigin: `${cx}px ${cy}px` }} />
                  <g className="ring__rake" style={{ transformOrigin: `${cx}px ${cy}px` }}>
                    <line x1={cx} y1={cy} x2={cx + rr} y2={cy} />
                  </g>
                  <path className="ring__x" d={`M${cx - 26} ${cy}H${cx + 26}M${cx} ${cy - 26}V${cy + 26}`} />
                </g>
              );
            })}
            {H.points.map((pt, i) => (
              <g className="pt" key={i} style={{ animationDelay: `${(((pt.y + 0.02) / 1.04) * SCAN).toFixed(2)}s` }}>
                <circle cx={pt.x * VW} cy={pt.y * VH} r="7" />
                <circle className="pt__halo" cx={pt.x * VW} cy={pt.y * VH} r="7" style={{ transformOrigin: `${pt.x * VW}px ${pt.y * VH}px`, animationDelay: `${(((pt.y + 0.02) / 1.04) * SCAN).toFixed(2)}s` }} />
              </g>
            ))}
          </svg>

          <span className="pfig__scan" aria-hidden="true" />

          {H.rings.map((r, i) => (
            <span className={`ptag ${r.alert ? 'ptag--alert' : ''}`} key={r.tag} aria-hidden="true"
              style={{ left: `${(r.x + r.r * 0.78) * 100}%`, top: `${(r.y - (r.r * VW / VH) * 0.78) * 100}%`, '--i': i }}>
              <b>{r.tag}</b><span>{r.state}</span>
            </span>
          ))}
          <span className="ptag ptag--probe" aria-hidden="true"
            style={{ left: `${H.probe.x * 100}%`, top: `${H.probe.y * 100}%`, '--i': 2 }}>
            <b>{H.probe.tag}</b><span>{H.probe.label} <em key={oxygen}>{oxygen.toFixed(1)}</em></span>
          </span>
        </div>

        <div className="pfig__guides" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => <i key={`v${n}`} style={{ left: `${n * (100 / 6)}%`, '--i': n }} />)}
          {[1, 2, 3].map((n) => <b key={`h${n}`} style={{ top: `${n * 25}%`, '--i': n }} />)}
        </div>

        {!reduced && (
          <div className="pfig__lens" ref={lensUi} aria-hidden="true">
            <span className="pfig__lensring" />
            <span className="pfig__lenslbl">{H.lens}<em ref={coord} /></span>
          </div>
        )}
        <span className="pfig__corner pfig__corner--tl" aria-hidden="true" />
        <span className="pfig__corner pfig__corner--br" aria-hidden="true" />
      </div>
      <figcaption className="pfig__cap">{H.caption}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------------------------------
   Home hero: one line on what Hydris is, one line on what it does, and the plant itself.
   --------------------------------------------------------------------------------------------- */
export default function Hero() {
  const ready = useReady();
  const H = HERO_TOP;
  const root = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (reduced || !root.current) return undefined;
    const ctx = gsap.context(() => {
      const trigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(text.current, { yPercent: -12, opacity: 0.2, ease: 'none', scrollTrigger: trigger });
      gsap.to('.pfig__stage', { scale: 1.07, ease: 'none', scrollTrigger: trigger });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`top ${ready ? 'is-in' : ''}`} aria-label="Hydris">
      <div className="top__grid grid">
        <div className="top__text" ref={text}>
          <Reveal as="p" className="label top__label">{H.label}</Reveal>
          {/* The Hydris mark in liquid metal fills the open space above the headline */}
          <div className="top__mark" aria-hidden="true">
            <div className="top__markbox"><Visible rootMargin="0px"><LiquidMark /></Visible></div>
          </div>
          <Words as="h1" text={H.title} className="top__title" delay={0.1} />
          <Reveal as="p" className="top__sub" delay={0.55}>{H.sub}</Reveal>
          <Reveal className="top__cta" delay={0.7}>
            <a className="pill" href="#how">How it works <Arrow dir="down" /></a>
            <a className="link-u" href="/contact/">Talk to us <Arrow /></a>
          </Reveal>
        </div>
        <div className="top__figure"><PlantFigure H={H} ready={ready} /></div>
      </div>
    </section>
  );
}

/* Key figures, set as a Swiss table: large numerals, short labels, hairline columns */
export function Facts({ items = FACTS }) {
  return (
    <section className="facts" aria-label="Hydris in figures">
      <dl className="facts__row grid">
        {items.map((f, i) => (
          <Reveal className="facts__cell" key={f.label} delay={i * 0.08}>
            <dt className="facts__n">
              {typeof f.n === 'number'
                ? (f.n === 0
                  ? <CountUp from={0} to={12} direction="down" duration={1.6} startWhen />
                  : <CountUp from={0} to={f.n} duration={1.8} startWhen />)
                : f.n}
              {f.unit && <span className="facts__u">{f.unit}</span>}
            </dt>
            <dd className="facts__l">{f.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}


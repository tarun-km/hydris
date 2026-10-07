import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotGrid from '../reactbits/DotGrid/DotGrid.jsx';
import Threads from '../reactbits/Threads/Threads.jsx';
import Magnet from '../reactbits/Magnet/Magnet.jsx';
import ScrollVelocity from '../reactbits/ScrollVelocity/ScrollVelocity.jsx';
import { LogoLoop } from '../reactbits/LogoLoop/LogoLoop.jsx';
import SpotlightCard from '../reactbits/SpotlightCard/SpotlightCard.jsx';
import CountUp from '../reactbits/CountUp/CountUp.jsx';
import { WIDGETS } from '../widgets/Widgets.jsx';
import { Accordion, Arrow, Heading, Reveal, Visible } from '../ui/Primitives.jsx';
import Icon from '../ui/Icon.jsx';
import { BENEFITS, EMAIL, STACK, STEPS } from '../../lib/content.js';
import { reduced, useInView, useMedia } from '../../lib/hooks.js';
import { scrollToY } from '../../lib/scroll.js';

/* A quiet grey "drafting table" panel that hosts one live widget */
export function Panel({ name, on }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const W = WIDGETS[name];
  const active = inView && (on === undefined ? true : on);
  return (
    <div ref={ref} className="panel">
      <span className="panel__grid" aria-hidden="true" />
      <W active={active} />
    </div>
  );
}

/* Interactive dot field used as a background in open space (React Bits DotGrid) */
export function Dots({ className = '' }) {
  if (reduced) return null;
  return (
    <div className={`dots ${className}`} aria-hidden="true">
      <Visible>
        <DotGrid dotSize={3} gap={26} baseColor="#dcdcdc" activeColor="#111111" proximity={140}
          shockRadius={220} shockStrength={4} resistance={750} returnDuration={1.5} />
      </Visible>
    </div>
  );
}

/* Process: pinned stepper on desktop, stacked on small screens */
export function Process() {
  const desktop = useMedia('(min-width: 901px)');
  const trackRef = useRef(null);
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!desktop || !trackRef.current) return undefined;
    const st = ScrollTrigger.create({
      trigger: trackRef.current, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        if (listRef.current) listRef.current.style.setProperty('--p', self.progress.toFixed(4));
        setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length * 0.9999)));
      },
    });
    return () => st.kill();
  }, [desktop]);

  const go = (i) => {
    const el = trackRef.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + (el.offsetHeight - window.innerHeight) * ((i + 0.5) / STEPS.length));
  };

  if (!desktop) {
    return (
      <div className="process-m">
        {STEPS.map((s, i) => (
          <article className="process-m__step" key={s.title}>
            <Reveal as="p" className="s-label">{String(i + 1).padStart(2, '0')}</Reveal>
            <Heading as="h3" text={s.title} className="t-s" />
            <Reveal as="p" className="body mute">{s.text}</Reveal>
            <Reveal><Panel name={s.widget} /></Reveal>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="process__track" ref={trackRef}>
      <div className="process__sticky">
        <Dots />
        <div className="process__grid grid">
          <ol className="psteps" ref={listRef}>
            {STEPS.map((s, i) => (
              <li className={`pstep ${i === active ? 'is-active' : ''}`} key={s.title}>
                <button className="pstep__head" type="button" onClick={() => go(i)}>
                  <span className="pstep__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pstep__t">{s.title}</span>
                </button>
                <div className="pstep__body"><div><p>{s.text}</p></div></div>
              </li>
            ))}
          </ol>
          <div className="process__stage">
            {STEPS.map((s, i) => (
              <div className={`pstage ${i === active ? 'is-active' : ''}`} key={s.title}>
                <Panel name={s.widget} on={i === active} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Big marquee band that speeds up with scroll (React Bits ScrollVelocity) */
export function Velocity({ texts }) {
  return (
    <section className="velo" aria-hidden="true">
      <ScrollVelocity texts={texts} velocity={34} numCopies={4} damping={50} stiffness={400}
        className="velo__txt" parallaxClassName="velo__row" scrollerClassName="velo__scroller" />
    </section>
  );
}

/* Systems Hydris works with (React Bits LogoLoop) */
export function StackLoop() {
  const logos = STACK.map((n) => ({ node: <span className="stack__item"><i />{n}</span>, title: n }));
  return (
    <section className="stack" aria-label="Systems Hydris works with">
      <div className="grid stack__head">
        <Reveal as="p" className="s-label stack__label">Works with your stack</Reveal>
        <Reveal as="p" className="lead stack__text" delay={0.1}>Hydris connects to the systems already on site, with no disruption to the way your plant runs.</Reveal>
      </div>
      <LogoLoop logos={logos} speed={46} direction="left" logoHeight={64} gap={64} pauseOnHover fadeOut fadeOutColor="#ffffff" ariaLabel="Systems Hydris works with" />
    </section>
  );
}

/* Stats (React Bits CountUp) */
export function Stats() {
  return (
    <div className="stats">
      <Reveal className="stat">
        <span className="stat__n"><small>up to</small><CountUp to={95} duration={2.2} />%</span>
        <span className="stat__l">Faster resolution of plant issues with guided, real time insights</span>
      </Reveal>
      <Reveal className="stat" delay={0.1}>
        <span className="stat__n">24/7</span>
        <span className="stat__l">Guidance that runs around the clock, without downtime</span>
      </Reveal>
      <Reveal className="stat" delay={0.2}>
        <span className="stat__n"><CountUp to={100} duration={2.2} />+</span>
        <span className="stat__l">Automations for repetitive plant tasks</span>
      </Reveal>
    </div>
  );
}

/* Benefits grid (React Bits SpotlightCard) */
export function Benefits() {
  return (
    <div className="bento">
      {BENEFITS.map((b, i) => (
        <Reveal className="bento__cell" key={b.title} delay={(i % 3) * 0.06}>
          <SpotlightCard className="benefit" spotlightColor="rgba(0, 0, 0, 0.08)">
            <span className="benefit__n">{String(i + 1).padStart(2, '0')}</span>
            <Icon name={b.icon} className="benefit__ico" />
            <h3 className="benefit__t">{b.title}</h3>
            <p className="benefit__p">{b.text}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}

export function Faq({ index, items }) {
  return (
    <section className="sec faq" id="faq">
      <div className="grid">
        <div className="faq__aside">
          <Reveal as="p" className="s-label">({index}) FAQs</Reveal>
          <Heading text="We've got the answers you're looking for" className="t-m" />
          <Reveal as="p" className="body mute faq__note" delay={0.1}>
            Quick answers to your AI automation questions. Still curious? <a className="link-u" href={`mailto:${EMAIL}`}>Write to us</a>.
          </Reveal>
        </div>
        <div className="faq__list"><Accordion items={items} /></div>
      </div>
    </section>
  );
}

/* Dark closing band (React Bits Threads + Magnet) */
export function Cta() {
  return (
    <section className="cta" aria-label="Request early access">
      <div className="cta__bg" aria-hidden="true">{!reduced && <Visible><Threads color={[1, 1, 1]} amplitude={1.1} distance={0.05} enableMouseInteraction /></Visible>}</div>
      <div className="cta__inner">
        <Reveal as="p" className="s-label cta__label">Early access</Reveal>
        <Heading text="Bring expert knowledge to every shift." className="t-l cta__title" center />
        <Reveal className="cta__actions" delay={0.2}>
          <Magnet padding={90} magnetStrength={3}>
            <a className="round" href="/contact/"><span>Request<br />early access</span></a>
          </Magnet>
          <a className="link-u cta__mail" href={`mailto:${EMAIL}`}>{EMAIL} <Arrow /></a>
        </Reveal>
      </div>
    </section>
  );
}

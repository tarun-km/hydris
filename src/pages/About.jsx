import ScrollReveal from '../components/reactbits/ScrollReveal/ScrollReveal.jsx';
import Threads from '../components/reactbits/Threads/Threads.jsx';
import CountUp from '../components/reactbits/CountUp/CountUp.jsx';
import { Cta, Dots, Faq } from '../components/sections/Blocks.jsx';
import { Mark } from '../components/ui/Brand.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Heading, Reveal, SecHead, Visible } from '../components/ui/Primitives.jsx';
import { ABOUT_FAQ, AUTO, MANUAL, TEAM, VALUES, WHO } from '../lib/content.js';
import { reduced } from '../lib/hooks.js';

export default function About() {
  return (
    <>
      <section className="phero">
        {!reduced && (
          <div className="phero__bg" aria-hidden="true">
            <Visible>
              <Threads color={[0, 0, 0]} amplitude={1.2} distance={0.1} enableMouseInteraction />
            </Visible>
          </div>
        )}
        <div className="phero__inner grid">
          <Reveal as="p" className="s-label phero__label">(About) Hydris AI</Reveal>
          <Heading as="h1" text="Helping water teams grow" className="t-xl phero__title" delay={70} />
          <Reveal as="p" className="lead phero__lead" delay={0.3}>
            We help water teams grow by strengthening their operations, reducing downtime, and empowering every operator with faster, smarter decisions.
          </Reveal>
        </div>
      </section>

      <section className="sec info" id="who">
        <div className="grid">
          <Reveal as="p" className="s-label info__label">(01) Who we are</Reveal>
          <div className="info__main">
            <ScrollReveal as="p" textClassName="statement" baseOpacity={0.12} enableBlur blurStrength={5} baseRotation={1.5}>
              We are a team building intelligent systems that capture expert knowledge and strengthen the way water operations run. Our mission is to support operators, simplify complex processes, and create smarter, safer, and more resilient water systems.
            </ScrollReveal>
          </div>
        </div>
        <div className="cols3 grid">
          {WHO.map((w, i) => (
            <Reveal className="col3" key={w.title} delay={i * 0.08}>
              <span className="col3__n">{String(i + 1).padStart(2, '0')}</span>
              {i === 2 ? <span className="col3__big"><small>up to</small><CountUp to={95} duration={2.2} />%</span> : <span className="col3__big col3__big--icon"><Icon name={i === 0 ? 'book' : 'filter'} /></span>}
              <h3 className="col3__t">{w.title}</h3>
              <p className="body mute">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec values" id="values">
        <SecHead index="02" label="Values" title="The values behind Hydris AI"
          text="We believe in empowering operators, simplifying complex processes, and preserving knowledge that strengthens water systems." />
        <div className="vgrid">
          {VALUES.map((v, i) => (
            <Reveal className="vcell" key={v.title} delay={(i % 2) * 0.08}>
              <span className="vcell__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-s">{v.title}</h3>
              <p className="body mute">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec" id="why">
        <SecHead index="03" label="Why us" title="What makes us stand out in the industry"
          text="Deep operational expertise and advanced AI, together. Clarity, speed, and reliability so teams work smarter and plants run stronger." />
        <div className="compare grid">
          <Reveal className="compare__col">
            <p className="compare__h"><span>Manual work</span><small>Today</small></p>
            <ul>{MANUAL.map((m) => <li key={m}><Icon name="x" />{m}</li>)}</ul>
          </Reveal>
          <Reveal className="compare__col compare__col--dark" delay={0.12}>
            <p className="compare__h"><span><Mark className="compare__mark" />Hydris AI automation</span><small>With Hydris</small></p>
            <ul>{AUTO.map((m) => <li key={m}><Icon name="check" />{m}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <section className="sec team" id="team">
        <Dots className="dots--soft" />
        <SecHead index="04" label="Team" title="The minds behind Hydris AI"
          text="A team of industry experts, engineers, and designers united to build smarter, safer, and more resilient water operations." />
        <div className="tiles grid">
          {TEAM.map((t, i) => (
            <Reveal className="tile" key={t.title} delay={i * 0.08}>
              <span className="tile__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-s">{t.title}</h3>
              <p className="body mute">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Faq index="05" items={ABOUT_FAQ} />
      <Cta />
    </>
  );
}

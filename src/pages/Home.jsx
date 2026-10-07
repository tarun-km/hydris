import ScrollReveal from '../components/reactbits/ScrollReveal/ScrollReveal.jsx';
import Hero from '../components/sections/Hero.jsx';
import { Benefits, Cta, Faq, Panel, Process, StackLoop, Stats, Velocity } from '../components/sections/Blocks.jsx';
import { Heading, Reveal, SecHead } from '../components/ui/Primitives.jsx';
import { HOME_FAQ, SERVICES } from '../lib/content.js';

function Service({ s, i }) {
  return (
    <article className="svc grid">
      <Reveal as="p" className="svc__n">{String(i + 1).padStart(2, '0')}</Reveal>
      <div className="svc__text">
        <Reveal as="p" className="s-label">{s.tag}</Reveal>
        <Heading as="h3" text={s.title} className="t-s" />
        <Reveal as="p" className="body mute svc__p" delay={0.1}>{s.text}</Reveal>
        <Reveal as="p" className="svc__tags" delay={0.15}>{s.tags.join(', ')}</Reveal>
      </div>
      <Reveal className="svc__panel" delay={0.1}><Panel name={s.widget} /></Reveal>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="title" id="intro">
        <Heading as="h2" text="Advanced intelligence for water teams" className="t-xl title__h" center delay={70} />
        <div className="title__caps grid">
          <Reveal as="p" className="cap cap--a">Hydris AI brings expert knowledge to your team with clarity.</Reveal>
          <Reveal as="p" className="cap cap--b" delay={0.1}>Capture knowledge, guide decisions, and strengthen operations.</Reveal>
        </div>
      </section>

      <section className="sec info">
        <div className="grid">
          <dl className="info__dl">
            <Reveal className="info__row"><dt className="s-label">Company</dt><dd>Hydris Inc.</dd></Reveal>
            <Reveal className="info__row" delay={0.05}><dt className="s-label">Focus</dt><dd>Water and wastewater operations</dd></Reveal>
            <Reveal className="info__row" delay={0.1}><dt className="s-label">Platform</dt><dd>An AI layer that captures expert knowledge and delivers it to every shift</dd></Reveal>
          </dl>
          <div className="info__main">
            <ScrollReveal as="p" textClassName="statement" baseOpacity={0.12} enableBlur blurStrength={5} baseRotation={1.5}>
              Hydris captures how your most experienced operators solve problems, then delivers that knowledge to every shift as clear, step by step guidance. Fewer guesses, faster answers, safer water.
            </ScrollReveal>
          </div>
        </div>
        <Stats />
      </section>

      <Velocity texts={['Capture knowledge · Guide decisions · Strengthen operations ·', 'Workflow automation · AI assistant · Operations · Custom projects ·']} />

      <section className="sec" id="services">
        <SecHead index="02" label="Services" title="AI solutions that elevate water operations to the next level"
          text="We craft intelligent solutions that elevate water operations and empower every team." />
        <div className="services">{SERVICES.map((s, i) => <Service s={s} i={i} key={s.title} />)}</div>
      </section>

      <section className="sec sec--process" id="process">
        <SecHead index="03" label="Process" title="Our simple, smart, and scalable process"
          text="We design, develop, and implement automation tools that help you work smarter, not harder." />
        <Process />
      </section>

      <StackLoop />

      <section className="sec" id="benefits">
        <SecHead index="04" label="Benefits" title="The key benefits of Hydris AI for your operational growth"
          text="Discover how Hydris AI enhances efficiency, reduces costs, and drives growth with smarter, faster processes." />
        <Benefits />
      </section>

      <Faq index="05" items={HOME_FAQ} />
      <Cta />
    </>
  );
}

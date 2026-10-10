import { Cta, Definition, IconCards, Nots, Panel, Products, RowList, SystemsLoop } from '../components/sections/Blocks.jsx';
import { InkField } from '../components/sections/Hero.jsx';
import { LayerStack } from '../components/sections/Sections.jsx';
import { Band, Mosaic, Texture } from '../components/sections/Imagery.jsx';
import { Reveal, SecHead, Visible, Words } from '../components/ui/Primitives.jsx';
import { CATEGORY, IMAGERY, MATTERS, MISSING, PLATFORM, PRODUCTS } from '../lib/content.js';
import { reduced } from '../lib/hooks.js';

/* The platform in detail: the bet, the products, where it sits, how it is built, and what changes */
export default function Platform() {
  const P = PLATFORM;
  return (
    <>
      <section className="phero">
        {!reduced && (
          <div className="phero__bg phero__bg--ink" aria-hidden="true">
            <Visible rootMargin="0px"><InkField /></Visible>
          </div>
        )}
        <div className="phero__inner grid">
          <Reveal as="p" className="s-label phero__label">Platform</Reveal>
          <Words as="h1" text={P.title} className="t-xl phero__title" delay={0.1} />
          <Reveal as="p" className="lead phero__lead" delay={0.5}>{P.lead}</Reveal>
        </div>
      </section>

      <Band {...IMAGERY.bands.platform} />

      <section className="sec alt" id="bet">
        <SecHead index="01" label={P.bet.eyebrow} title={P.bet.title} />
        <Definition term={P.bet.term} d1={P.bet.d1} d2={P.bet.d2} />
        <Nots items={CATEGORY.nots} />
      </section>

      <section className="sec" id="products">
        <SecHead index="02" label={P.products.eyebrow} title={P.products.title} text={P.products.lead} />
        <Products items={PRODUCTS} />
      </section>

      <section className="sec dark" id="layer">
        <Texture name="water-night" />
        <SecHead index="03" label={MISSING.eyebrow} title={MISSING.title} text={MISSING.lead} tone="dark" />
        <LayerStack items={MISSING.stack} />
        <Reveal as="p" className="s-label layer__note">{MISSING.note}</Reveal>
        <Reveal as="p" className="t-s layer__foot" delay={0.1}>{MISSING.foot}</Reveal>
      </section>

      <SystemsLoop />

      <section className="sec alt" id="technology">
        <SecHead index="04" label={P.tech.eyebrow} title={P.tech.title} text={P.tech.lead} />
        <IconCards items={P.tech.items} cols={3} variant="icards--tech" />
      </section>

      <section className="sec" id="gets">
        <SecHead index="05" label={P.gets.eyebrow} title={P.gets.title} text={P.gets.lead} />
        <RowList rows={P.gets.rows.map((r) => ({ ...r, a: r.verb }))} variant="rows--verb" />
      </section>

      <section className="sec alt" id="matters">
        <SecHead index="06" label={MATTERS.eyebrow} title={MATTERS.title} />
        <div className="matters grid">
          {MATTERS.principles.map((p, i) => (
            <Reveal className="matters__col hl" key={p.title} delay={i * 0.1}>
              <span className="matters__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-s">{p.title}</h3>
              <p className="body mute">{p.text}</p>
            </Reveal>
          ))}
        </div>
        <RowList rows={MATTERS.levers.map((l, i) => ({ ...l, a: String(i + 1).padStart(2, '0') }))} />
        <div className="matters__notes grid">
          <Reveal as="p" className="body mute matters__note">{MATTERS.note}</Reveal>
          <Reveal as="p" className="lead matters__strong" delay={0.1}>{MATTERS.strong}</Reveal>
        </div>
      </section>

      <section className="sec dark" id="principles">
        <Texture name="water-deep" />
        <SecHead index="07" label={P.principles.eyebrow} title={P.principles.title} tone="dark" />
        <div className="matters matters--dark grid">
          {P.principles.items.map((p, i) => (
            <Reveal className="matters__col hl" key={p.title} delay={i * 0.1}>
              <span className="matters__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-s">{p.title}</h3>
              <p className="body">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec idea" id="idea">
        <SecHead index="08" label={P.idea.eyebrow} title={P.idea.title} />
        <div className="idea__grid grid">
          <div className="idea__text">
            <Reveal as="p" className="lead">{P.idea.lede}</Reveal>
            {P.idea.paras.map((t, i) => <Reveal as="p" className="body mute" key={i} delay={0.1 + i * 0.1}>{t}</Reveal>)}
          </div>
          <Reveal className="idea__viz" delay={0.1}><Panel name="days" /></Reveal>
        </div>
      </section>

      <section className="sec alt" id="reach">
        <SecHead index="09" label={P.reach.eyebrow} title={P.reach.title} text={P.reach.lead} />
        <RowList rows={P.reach.rows.map((r) => ({ ...r, a: r.verb }))} variant="rows--verb" />
        <Mosaic items={IMAGERY.reach} />
      </section>

      <section className="sec" id="start">
        <SecHead index="10" label={P.start.eyebrow} title={P.start.title} />
        <RowList rows={P.start.rows.map((r) => ({ a: r.k, text: r.v, k: r.k }))} variant="rows--kit" />
      </section>

      <Cta short />
    </>
  );
}

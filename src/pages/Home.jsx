import Hero, { Facts } from '../components/sections/Hero.jsx';
import {
  Cta, Definition, Faq, IconCards, Oneline, Process, Products, RowList, Timeline,
} from '../components/sections/Blocks.jsx';
import { Capture, Proof, Readout, ResultStrip } from '../components/sections/Sections.jsx';
import { Band, Hotspots, Stages } from '../components/sections/Imagery.jsx';
import { KnowledgeBase } from '../components/widgets/Widgets.jsx';
import { Frame } from '../components/ui/Photo.jsx';
import { Arrow, Parallax, Reveal, SecHead } from '../components/ui/Primitives.jsx';
import {
  AUDIENCE, CATEGORY, HOME_FAQ, HOW, IMAGERY, IMPL, KNOWLEDGE, LOOKS, PLATFORM_HOME, PRODUCTS, PROBLEM, PROOF, WHY,
} from '../lib/content.js';

const IMG = IMAGERY;

/* The home page answers three things, in order: what Hydris is, how it works, and why it can be trusted. */
export default function Home() {
  return (
    <>
      <Hero />
      <Facts />

      {/* 01 What Hydris does: the problem, then the category it creates */}
      <section className="sec does" id="does">
        <SecHead index="01" label="What Hydris does" title={PROBLEM.title} />
        <div className="does__grid grid">
          <Reveal as="p" className="lead does__lede">{PROBLEM.lede}</Reveal>
          {PROBLEM.points.map((p, i) => (
            <Reveal className="does__pt" key={p.title} delay={0.08 + i * 0.1}>
              <h3 className="t-row">{p.title}</h3>
              <p className="body mute">{p.text}</p>
            </Reveal>
          ))}
          <Frame name={IMG.problem.name} ratio="4 / 5" position="36% 50%" sizes="(min-width: 901px) 24vw, 100vw"
            drift={0.12} className="does__photo">
            <figcaption className="s-label frame__cap">{IMG.problem.caption}</figcaption>
          </Frame>
        </div>
        <Definition term={CATEGORY.title} d1={CATEGORY.d1} d2={CATEGORY.d2} />
      </section>

      {/* 02 How it works */}
      <section className="sec sec--process alt" id="how">
        <SecHead index="02" label={HOW.eyebrow} title={HOW.title} text={HOW.lead} />
        <Process steps={HOW.steps} />
        <ResultStrip items={HOW.result} />
      </section>

      {/* 03 Where it reads: every stage of the plant */}
      <Stages index="03" {...IMG.stages} />

      {/* 04 What it runs on */}
      <section className="sec kbsec" id="knowledge">
        <SecHead index="04" label={KNOWLEDGE.eyebrow} title={KNOWLEDGE.title} />
        <div className="kbsec__grid grid">
          <div className="kbsec__text">
            <Reveal as="p" className="lead">{KNOWLEDGE.lead}</Reveal>
            <Reveal as="p" className="body mute" delay={0.08}>{KNOWLEDGE.text}</Reveal>
            <Reveal as="p" className="body kbsec__not" delay={0.16}>{KNOWLEDGE.not}</Reveal>
          </div>
          <Reveal className="kbsec__viz" delay={0.1}><KnowledgeBase layers={KNOWLEDGE.layers} /></Reveal>
        </div>
      </section>

      {/* 05 The platform */}
      <section className="sec alt" id="platform">
        <SecHead index="05" label={PLATFORM_HOME.eyebrow} title={PLATFORM_HOME.title} text={PLATFORM_HOME.lead} />
        <Products items={PRODUCTS} />
        <Reveal className="sec__action sec__action--start" delay={0.1}>
          <a className="link-u" href="/platform/">See the platform in detail <Arrow /></a>
        </Reveal>
      </section>

      {/* 06 What it looks like */}
      <section className="sec" id="looks">
        <SecHead index="06" label={LOOKS.eyebrow} title={LOOKS.title} text={LOOKS.lead} />
        <Hotspots name={IMG.spots.name} items={IMG.spots.items} caption={IMG.spots.caption} />
        <div className="looks looks--overlap grid">
          <Parallax amount={18} className="looks__card"><Readout /></Parallax>
          <div className="looks__copy">
            <Reveal as="p" className="lead" delay={0.1}>{LOOKS.copy[1]}</Reveal>
            <Reveal as="p" className="body mute" delay={0.2}>{LOOKS.copy[2]}</Reveal>
          </div>
        </div>
      </section>

      {/* 07 Why Hydris */}
      <section className="sec alt" id="why">
        <SecHead index="07" label={WHY.eyebrow} title={WHY.title} text={WHY.lead} />
        <Band {...IMG.control} ratio="21 / 8" position="50% 42%" className="band--inset" />
        <IconCards items={WHY.items} cols={3} />
      </section>

      {/* 08 How you get it in */}
      <section className="sec" id="implementation">
        <SecHead index="08" label={IMPL.eyebrow} title={IMPL.title} text={IMPL.lead} />
        <Timeline steps={IMPL.steps} />
        <Oneline parts={IMPL.close} />
      </section>

      {/* 09 Where we are today */}
      <section className="sec alt sec--proof" id="proof">
        <SecHead index="09" label={PROOF.eyebrow} title={PROOF.title} text={PROOF.lead} />
        <Proof big={PROOF.big} unit={PROOF.unit} note={PROOF.note} sweep={IMG.sweep} />
      </section>

      {/* 10 Who it is for */}
      <section className="sec" id="audience">
        <SecHead index="10" label={AUDIENCE.eyebrow} title={AUDIENCE.title} text={AUDIENCE.lead} />
        <RowList rows={AUDIENCE.rows} variant="rows--icons" />
        <div className="verts grid">
          <div className="verts__chips">
            {AUDIENCE.verticals.map((v, i) => <Reveal as="span" className="chip" key={v} delay={i * 0.08}>{v}</Reveal>)}
          </div>
          <Reveal as="p" className="body mute verts__note" delay={0.2}>{AUDIENCE.note}</Reveal>
        </div>
      </section>

      <Faq index="11" items={HOME_FAQ} />
      <Capture />
      <Cta />
    </>
  );
}

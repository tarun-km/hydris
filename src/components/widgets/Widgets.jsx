import { useEffect, useRef, useState } from 'react';
import TextType from '../reactbits/TextType/TextType.jsx';
import { Mark } from '../ui/Brand.jsx';
import Icon from '../ui/Icon.jsx';
import { STACK } from '../../lib/content.js';
import { reduced, sleep, useLoop } from '../../lib/hooks.js';

/* Illustrative product moments. Decorative (aria-hidden): the copy beside each one describes it. */

const Tick = () => <span className="tick"><Icon name="check" /></span>;
const Cross = () => <span className="tick tick--off"><Icon name="x" /></span>;
const Spin = () => <span className="spin" />;

/* ---------- Workflow automation: endless task list ---------- */
const ALL = [
  { i: 'alert', t: 'Plant issue management', s: '2 days ago', e: 'spin' },
  { i: 'doc', t: 'Incident log updates', s: 'Cancelled by lead operator', e: 'x' },
  { i: 'book', t: 'Knowledge entry list', s: '70% prepared', e: 'spin' },
  { i: 'cal', t: 'Payroll management', s: 'Due on 2nd July', e: 'ok' },
  { i: 'mail', t: 'Payment reminder', s: 'Sent to selected clients', e: 'ok' },
  { i: 'check', t: 'Daily rounds checklist', s: 'Sent to night crew', e: 'ok' },
];
const WAIT = [
  { i: 'drop', t: 'Chemical order', s: 'Hypochlorite, 2 totes', e: 'approve' },
  { i: 'users', t: 'Overtime request', s: 'Night shift, 2 operators', e: 'approve' },
  { i: 'doc', t: 'Compliance report draft', s: 'Ready for review', e: 'approve' },
  { i: 'flow', t: 'SOP update, clarifier 2', s: 'Edited by senior operator', e: 'approve' },
];
const End = ({ e }) => (e === 'ok' ? <Tick /> : e === 'x' ? <Cross /> : e === 'spin' ? <Spin /> : <span className="ui__btn">Approve</span>);

export function TaskList({ active }) {
  const [tab, setTab] = useState(0);
  useLoop(active, async (alive) => { await sleep(4800); if (alive()) setTab((t) => 1 - t); });
  return (
    <div className="ui w-tasks" aria-hidden="true">
      <div className="ui__head">
        <div className="tabs"><span className={tab === 0 ? 'on' : ''}>All tasks</span><span className={tab === 1 ? 'on' : ''}>Waiting for approval</span></div>
        <span className="ui__meta">{tab === 0 ? ALL.length : WAIT.length} items</span>
      </div>
      <div className="w-tasks__view">
        {[ALL, WAIT].map((list, k) => (
          <div key={k} className={`w-tasks__list ${k === tab ? '' : 'is-off'} ${active ? '' : 'is-paused'}`}>
            {[...list, ...list].map((x, j) => (
              <div className="row" key={j}>
                <span className="row__ico"><Icon name={x.i} /></span>
                <span className="row__txt"><b>{x.t}</b><small>{x.s}</small></span>
                <span className="row__end"><End e={x.e} /></span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- AI assistant: prompt typing (React Bits TextType) ---------- */
const PROMPTS = [
  'Help me troubleshoot a rising sludge blanket in clarifier 2',
  "Summarize last night's shift log",
  "Schedule tomorrow's filter backwash",
  "Draft this month's compliance report",
];
export function Assistant({ active }) {
  return (
    <div className="ui w-assist" aria-hidden="true">
      <div className="ripple"><i /><i /><i /><Mark className="ripple__mark" /></div>
      <p className="w-assist__h">What can I help with?</p>
      <p className="w-assist__p">Ask about a process, a procedure, or a problem on the floor.</p>
      <div className="w-assist__input">
        {active && !reduced
          ? <TextType text={PROMPTS} typingSpeed={38} deletingSpeed={14} pauseDuration={1900} loop showCursor cursorCharacter="|" className="w-assist__type" cursorClassName="w-assist__cursor" />
          : <span className="w-assist__type">{PROMPTS[0]}</span>}
        <span className="w-assist__send"><Icon name="send" /></span>
      </div>
      <div className="w-assist__tags"><span>Analyze</span><span>Troubleshoot</span><span>Research</span><span>+ Add document</span></div>
    </div>
  );
}

/* ---------- Operations: a troubleshooting ticket moving through its stages ---------- */
const PEOPLE = [
  { av: 'LO', name: 'Lead operator', role: 'Plant 2, day shift', a: 'Rising sludge blanket', b: 'Clarifier 2' },
  { av: 'LA', name: 'Lab analyst', role: 'Laboratory, LIMS', a: 'Ammonia above target', b: 'Aeration basin 3' },
  { av: 'PS', name: 'Plant supervisor', role: 'Operations', a: 'Blower 3 surge', b: 'Blower building' },
];
const SOURCES = ['Spreadsheet', 'LIMS', 'Compliance'];
export function Ticket({ active }) {
  const [k, setK] = useState(0);
  const [stage, setStage] = useState(reduced ? 2 : 0);
  const [out, setOut] = useState(false);
  useLoop(active, async (alive) => {
    setOut(false);
    setStage(0);
    await sleep(1500); if (!alive()) return;
    setStage(1);
    await sleep(1500); if (!alive()) return;
    setStage(2);
    await sleep(2100); if (!alive()) return;
    setOut(true);
    await sleep(380); if (!alive()) return;
    setK((x) => (x + 1) % PEOPLE.length);
    setOut(false);
  });
  const p = PEOPLE[k];
  return (
    <div className="ui w-ticket" aria-hidden="true">
      <div className="ui__head"><b>Troubleshooting</b><Spin /></div>
      <div className="w-ticket__src">{SOURCES.map((s, i) => <span key={s} className={i === k % SOURCES.length ? 'on' : ''}>{s}</span>)}</div>
      <div className={`w-ticket__who ${out ? 'is-out' : ''}`}>
        <span className="avatar">{p.av}</span>
        <span className="row__txt"><b>{p.name}</b><small>{p.role}</small></span>
        <span className={`w-ticket__state ${stage === 2 ? 'ok' : ''}`}>{stage === 2 ? 'Verified' : 'Open'}</span>
      </div>
      <dl className={`w-ticket__meta ${out ? 'is-out' : ''}`}><div><dt>Issue</dt><dd>{p.a}</dd></div><div><dt>Area</dt><dd>{p.b}</dd></div></dl>
      <div className="track" style={{ '--k': stage / 2 }}>
        <i className="track__fill" />
        {['Draft', 'Schedule', 'Sent'].map((s, i) => <span key={s} className={i <= stage ? 'on' : ''}>{s}</span>)}
      </div>
    </div>
  );
}

/* ---------- Custom projects: schedule with a progressing project ---------- */
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export function Schedule({ active }) {
  const [day, setDay] = useState(0);
  const [pct, setPct] = useState(reduced ? 90 : 0);
  const filled = useRef(reduced);
  useEffect(() => {
    if (!active || filled.current) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / 1600);
      setPct(Math.round(90 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
      else filled.current = true;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);
  useLoop(active, async (alive) => { await sleep(1400); if (alive()) setDay((d) => (d + 1) % 5); });
  return (
    <div className="ui w-sched" aria-hidden="true">
      <div className="ui__head"><b>Good morning, team</b><span className="ui__meta">Week 41</span></div>
      <div className="w-sched__project">
        <span className="row__txt"><small>Ongoing project</small><b>Operator support assistant</b></span>
        <span className="w-sched__pct">{pct}%</span>
      </div>
      <div className="bar"><i style={{ width: `${pct}%` }} /></div>
      <div className="week" style={{ '--day': day }}>
        <i className="week__pill" />
        {DAYS.map((d, i) => <span key={d} className={i === day ? 'on' : ''}>{d}</span>)}
      </div>
      <div className="slot"><b>Daily troubleshooting</b><small>10:00 to 10:30 am</small></div>
      <div className="slot"><b>Custom automation</b><small>06:00 to 06:30 pm</small></div>
    </div>
  );
}

/* ---------- Step 1: radar sweep with sequential checks ---------- */
const CHECKS = ['System check', 'Process check', 'Speed check', 'Manual work', 'Repetitive task'];
export function Radar({ active }) {
  const [n, setN] = useState(reduced ? CHECKS.length : -1);
  useLoop(active, async (alive) => {
    for (let i = 0; i <= CHECKS.length; i++) {
      setN(i);
      await sleep(i === CHECKS.length ? 1800 : 950);
      if (!alive()) return;
    }
    setN(-1);
    await sleep(300);
  });
  return (
    <div className="w-radar" aria-hidden="true">
      <div className="radar"><span className="radar__sweep" /><i style={{ left: '64%', top: '30%' }} /><i style={{ left: '28%', top: '58%', animationDelay: '1.1s' }} /><i style={{ left: '70%', top: '70%', animationDelay: '2.1s' }} /></div>
      <ul className="checks">
        {CHECKS.map((c, i) => (
          <li key={c} className={i < n ? 'done' : i === n ? 'on' : ''}>
            <span>{c}</span>{i < n ? <Tick /> : i === n ? <Spin /> : <span className="dot" />}
          </li>
        ))}
      </ul>
      <p className="radar__cap">Analyzing current workflow</p>
    </div>
  );
}

/* ---------- Step 2: code typing ---------- */
const CODE = [
  [['c', '// Turn operator know-how into guidance']],
  [['k', 'const '], ['', 'plant = '], ['k', 'await '], ['f', 'hydris.connect'], ['', '('], ['s', "'wwtp-north'"], ['', ');']],
  [['k', 'const '], ['', 'notes = '], ['k', 'await '], ['f', 'plant.knowledge.capture'], ['', '({']],
  [['', "  source: "], ['s', "'operator-logs'"], ['', ', verified: '], ['k', 'true']],
  [['', '});']],
  [['f', 'plant.on'], ['', '('], ['s', "'alarm'"], ['', ', '], ['k', 'async '], ['', '(event) => {']],
  [['k', '  const '], ['', 'guide = '], ['k', 'await '], ['f', 'hydris.guide'], ['', '(event, notes);']],
  [['f', '  shift.notify'], ['', '(guide.steps);']],
  [['', '});']],
];
const TOTAL = CODE.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0);
export function CodeTyping({ active }) {
  const [count, setCount] = useState(reduced ? TOTAL : 0);
  useLoop(active, async (alive) => {
    for (let c = 0; c <= TOTAL; c++) {
      if (!alive()) return;
      setCount(c);
      await sleep(18 + Math.random() * 20);
    }
    await sleep(2600);
    if (alive()) setCount(0);
  });
  let left = count;
  return (
    <div className="code" aria-hidden="true">
      <div className="code__bar"><i /><i /><i /><span>hydris-guide.js</span></div>
      <div className="code__body">
        <div className="code__gutter">{CODE.map((_, i) => <span key={i}>{i + 1}</span>)}</div>
        <pre className="code__text">
          {CODE.map((line, li) => {
            if (left <= 0) return null;
            const parts = line.map(([cls, txt], pi) => {
              if (left <= 0) return null;
              const shown = txt.slice(0, left);
              left -= txt.length;
              return <span key={pi} className={cls ? `tk-${cls}` : undefined}>{shown}</span>;
            });
            left -= 1;
            return <span key={li}>{parts}{left >= 0 ? '\n' : null}</span>;
          })}
          <span className="code__caret" />
        </pre>
      </div>
    </div>
  );
}

/* ---------- Step 3: integration with the existing stack ---------- */
export function Integration({ active }) {
  const [i, setI] = useState(0);
  useLoop(active, async (alive) => { await sleep(1600); if (alive()) setI((x) => (x + 1) % STACK.length); });
  return (
    <div className="w-int" aria-hidden="true">
      <div className="node"><span className="node__box node__box--brand"><Mark /></span><small>Hydris</small></div>
      <div className="pipes"><span><i /></span><span><i /></span><span><i /></span></div>
      <div className="node">
        <span className="node__box"><span className="node__stack">{STACK.map((s, k) => <b key={s} className={k === i ? 'on' : ''}>{s}</b>)}</span></span>
        <small>Your stack</small>
      </div>
    </div>
  );
}

/* ---------- Step 4: continuous optimization ---------- */
export function Optimize({ active }) {
  const [st, setSt] = useState(reduced ? 2 : 0);
  useLoop(active, async (alive) => {
    setSt(0); await sleep(1800); if (!alive()) return;
    setSt(1); await sleep(2200); if (!alive()) return;
    setSt(2); await sleep(2400);
  });
  return (
    <div className="ui w-opt" aria-hidden="true">
      <div className="row"><span className="row__ico"><Icon name="chat" /></span><span className="row__txt"><b>Chatbot system</b><small>Efficiency will increase by 20%</small></span><span className="row__end"><Spin /></span></div>
      <div className="row">
        <span className="row__ico"><Icon name="flow" /></span>
        <span className="row__txt"><b>Workflow system</b><small>{st === 0 ? 'Update available' : st === 1 ? 'Updating' : 'Up to date'}</small></span>
        <span className="row__end">{st === 0 ? <span className="ui__btn">Update</span> : st === 1 ? <span className="mini"><i /></span> : <Tick />}</span>
      </div>
      <div className="row"><span className="row__ico"><Icon name="filter" /></span><span className="row__txt"><b>Operator support system</b><small>Up to date</small></span><span className="row__end"><Tick /></span></div>
    </div>
  );
}

export const WIDGETS = { tasks: TaskList, assist: Assistant, ticket: Ticket, sched: Schedule, radar: Radar, code: CodeTyping, int: Integration, opt: Optimize };

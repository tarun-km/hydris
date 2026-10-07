import { useState } from 'react';
import Magnet from '../components/reactbits/Magnet/Magnet.jsx';
import { Dots } from '../components/sections/Blocks.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Arrow, Heading, Reveal, SecHead } from '../components/ui/Primitives.jsx';
import { EMAIL, FACILITIES, STEPS } from '../lib/content.js';

const RULES = {
  name: (v) => (v.trim().length > 1 ? '' : 'Please enter your name.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid e-mail address.'),
  message: (v) => (v.trim().length > 9 ? '' : 'Please tell us a little more (at least 10 characters).'),
};

function Field({ id, label, optional, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}{optional && <span className="mute"> (optional)</span>}</label>
      {children}
      <span className="field__err" aria-live="polite">{error}</span>
    </div>
  );
}

function ContactForm() {
  const [v, setV] = useState({ name: '', email: '', org: '', facility: '', message: '' });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => {
    const val = e.target.value;
    setV((s) => ({ ...s, [k]: val }));
    if (err[k]) setErr((s) => ({ ...s, [k]: RULES[k](val) }));
  };
  const blur = (k) => () => RULES[k] && setErr((s) => ({ ...s, [k]: RULES[k](v[k]) }));

  const submit = (e) => {
    e.preventDefault();
    const next = Object.fromEntries(Object.keys(RULES).map((k) => [k, RULES[k](v[k])]));
    setErr(next);
    const first = Object.keys(next).find((k) => next[k]);
    if (first) { document.getElementById(`f-${first}`)?.focus(); return; }
    const subject = `Early access request${v.org ? `: ${v.org}` : ''}`;
    const body = [`Name: ${v.name}`, `E-mail: ${v.email}`, v.org && `Organization: ${v.org}`, v.facility && `Facility type: ${v.facility}`, '', v.message]
      .filter((l) => l !== false && l !== undefined && l !== null).join('\n');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" noValidate onSubmit={submit}>
      <p className="form__h">Request early access</p>
      <Field id="f-name" label="Full name" error={err.name}>
        <input id="f-name" autoComplete="name" value={v.name} onChange={set('name')} onBlur={blur('name')} aria-invalid={!!err.name} />
      </Field>
      <Field id="f-email" label="Work e-mail" error={err.email}>
        <input id="f-email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={set('email')} onBlur={blur('email')} aria-invalid={!!err.email} />
      </Field>
      <Field id="f-org" label="Organization" optional>
        <input id="f-org" autoComplete="organization" value={v.org} onChange={set('org')} />
      </Field>
      <Field id="f-facility" label="Facility type" optional>
        <select id="f-facility" value={v.facility} onChange={set('facility')}>
          <option value="">Select a facility type</option>
          {FACILITIES.map((f) => <option key={f}>{f}</option>)}
        </select>
      </Field>
      <Field id="f-message" label="How can we help?" error={err.message}>
        <textarea id="f-message" rows={4} value={v.message} onChange={set('message')} onBlur={blur('message')} aria-invalid={!!err.message}
          placeholder="Tell us about your facility and what you would like Hydris to help with." />
      </Field>
      <div className="form__foot">
        <p className="form__note" aria-live="polite">
          {sent ? `Your e-mail app should now be open with your message ready to send. Nothing opened? Write to ${EMAIL}.` : 'Sending opens your e-mail app with your message ready to go.'}
        </p>
        <Magnet padding={60} magnetStrength={4}>
          <button className="pill" type="submit">Send message <Arrow /></button>
        </Magnet>
      </div>
    </form>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch { /* clipboard unavailable */ }
    setDone(true);
    setTimeout(() => setDone(false), 2200);
  };
  return <button className="copy" type="button" onClick={copy}><Icon name={done ? 'check' : 'copy'} />{done ? 'Copied' : 'Copy'}</button>;
}

export default function Contact() {
  return (
    <>
      <section className="phero phero--contact">
        <Dots className="dots--right" />
        <div className="phero__inner grid">
          <div className="contact__left">
            <Reveal as="p" className="s-label">(Contact) Hydris AI</Reveal>
            <Heading as="h1" text="Get in touch with us" className="t-xl contact__title" delay={70} />
            <Reveal as="p" className="lead contact__lead" delay={0.2}>Have questions or need AI solutions? Let us know by mailing us, and we will be in touch.</Reveal>
            <Reveal className="mail" delay={0.3}>
              <span className="s-label">E-mail</span>
              <span className="mail__row"><a className="mail__addr" href={`mailto:${EMAIL}`}>{EMAIL}</a><CopyEmail /></span>
            </Reveal>
          </div>
          <Reveal className="contact__right" delay={0.2}><ContactForm /></Reveal>
        </div>
      </section>

      <section className="sec next">
        <SecHead index="01" label="What happens next" title="From first conversation to a smarter plant" />
        <ol className="nlist grid">
          {STEPS.map((s, i) => (
            <Reveal as="li" className="nitem" key={s.title} delay={i * 0.07}>
              <span className="nitem__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-s">{s.title}</h3>
              <p className="body mute">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}

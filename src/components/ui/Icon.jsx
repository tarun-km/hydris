// Thin line icons on a 24px grid, drawn for this site.
const P = {
  arrow: <path d="M7 17L17 7M9 7h8v8" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bolt: <path d="M13 2.5L4.5 13.5h6.5l-1 8 8.5-11h-6.5l1-8z" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.7c1.9.8 3.1 2.6 3.5 5.3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  coins: <><ellipse cx="9" cy="6.5" rx="6" ry="2.5" /><path d="M3 6.5v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5M3 11.5v5c0 1.4 2.7 2.5 6 2.5 1 0 2-.1 2.8-.3M15 13.5c3.3 0 6 1.1 6 2.5s-2.7 2.5-6 2.5" /></>,
  book: <path d="M4 19V5a2 2 0 0 1 2-2h14v14H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h14M9 7.5h7M9 11h5" />,
  chart: <path d="M3.5 20.5h17M6.5 17v-5M11 17V7M15.5 17v-7.5M20 17V4" />,
  alert: <path d="M12 3.5l9 16H3zM12 10v4M12 17.2v.1" />,
  doc: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.8 6.8L12 13l8.2-6.2" /></>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="1.5" /><path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5" /></>,
  flow: <><rect x="3" y="3" width="6.5" height="6.5" /><rect x="14.5" y="14.5" width="6.5" height="6.5" /><path d="M9.5 6.2h3.8a3 3 0 0 1 3 3v5.3" /></>,
  chat: <path d="M20.5 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.4-4.6A8.5 8.5 0 1 1 20.5 12z" />,
  filter: <path d="M4 5h16l-6 7.5V19l-4 2v-8.5z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20.5 20.5L16 16" /></>,
  cal: <><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  drop: <path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z" />,
  send: <path d="M12 19V5M6 11l6-6 6 6" />,
  refresh: <path d="M20 11a8 8 0 0 0-14.7-4.4L4 8M4 3.5V8h4.5M4 13a8 8 0 0 0 14.7 4.4L20 16M20 20.5V16h-4.5" />,
};

export default function Icon({ name, className = '' }) {
  return (
    <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {P[name]}
    </svg>
  );
}

export function Arrow({ dir = 'arrow' }) {
  return <Icon name={dir} className="arrow" />;
}

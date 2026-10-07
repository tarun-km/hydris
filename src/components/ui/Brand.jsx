import { MARK, WORDMARK } from './brandPaths.js';

export function Mark({ className = '', title }) {
  return (
    <svg className={className} viewBox={MARK.viewBox} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path fill="currentColor" fillRule="evenodd" d={MARK.d} />
    </svg>
  );
}

export function Wordmark({ className = '', title }) {
  return (
    <svg className={className} viewBox={WORDMARK.viewBox} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path fill="currentColor" fillRule="evenodd" d={WORDMARK.d} />
    </svg>
  );
}

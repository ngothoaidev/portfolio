import Link from 'next/link';
export default function NotFound() {
  return <main id="main" className="page-frame not-found"><p className="eyebrow">404 / Page not found</p><h1>A missing page.</h1><p>This address does not lead to a page in this portfolio.</p><Link className="text-link" href="/">Return to the portfolio ↗</Link></main>;
}

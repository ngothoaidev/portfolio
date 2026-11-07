import { site } from '../../content/site';
import { Eyebrow } from '../ui/typography';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>{site.role}</p>
      <Eyebrow>Interfaces / APIs / Systems</Eyebrow>
    </footer>
  );
}

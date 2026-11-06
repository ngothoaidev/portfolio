import { site } from '@/content/site';
export function SiteFooter() {
  return (<footer className="site-footer flex flex-wrap justify-between gap-4"><p>{site.role}</p><p className="eyebrow">Portfolio / Foundation edition</p></footer>);
}

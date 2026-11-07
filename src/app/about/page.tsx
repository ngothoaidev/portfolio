import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/site-shell';
import { DisplayHeading, Eyebrow, SectionHeading } from '@/components/ui/typography';
import { TextLink } from '@/components/ui/text-link';
import { ExperienceList } from '@/components/about/experience-list';
import { expertise, getVerifiedExpertise } from '@/content/expertise';
import { profile, publishedText, experiences } from '@/content/profile';
import { getContactLinks, site } from '@/content/site';
export const metadata: Metadata = { title: 'About', description: 'Engineering focus across frontend interfaces, backend systems, and AI-assisted workflows. Explore the work and its supporting evidence.' };
export default function AboutPage() {
  const name = publishedText(profile.name);
  const bio = publishedText(profile.bio);
  const links = getContactLinks(site);
  return <SiteShell>
    <header className="about-opening editorial-grid">
      <Eyebrow className="hero-meta">About / Engineering focus</Eyebrow>
      <div className="hero-body">
        <DisplayHeading>Interfaces.<br />Systems.<br /><em className="accent">The connections between.</em></DisplayHeading>
        <div className="prose">{name && <p>{name}</p>}<p>{bio ?? site.introduction}</p></div>
        <TextLink href="/work/" arrow="↗">Explore the work</TextLink>
      </div>
    </header>
    <section className="about-focus" aria-labelledby="focus-heading">
      <Eyebrow>01 / Engineering focus</Eyebrow>
      <SectionHeading id="focus-heading">Three connected disciplines.</SectionHeading>
      <ul className="about-focus-grid">{getVerifiedExpertise(expertise).map(area => <li key={area.id}>
        <SectionHeading as="h3">{area.title}</SectionHeading><p>{area.summary}</p>
        <p className="eyebrow">{area.technologies.join(' / ')}</p>
      </li>)}</ul>
    </section>
    <section className="content-section editorial-grid" aria-labelledby="approach-heading">
      <Eyebrow className="section-label">02 / Read the work</Eyebrow>
      <div className="section-body"><SectionHeading id="approach-heading">Decisions, with context.</SectionHeading>
        <div className="prose"><p>The case studies connect technical decisions to source evidence, verification, and limitations. Start with Online-Auction for a closer look at transaction boundaries, proxy bidding, and event delivery.</p></div>
        <TextLink href="/work/online-auction/" arrow="↗">Read the Online-Auction case study</TextLink>
      </div>
    </section>
    <ExperienceList entries={experiences} />
    {links.length > 0 && <section className="content-section editorial-grid" aria-labelledby="about-contact-heading">
      <Eyebrow className="section-label">Continue the conversation</Eyebrow>
      <div className="section-body"><SectionHeading id="about-contact-heading">Take a closer look.</SectionHeading>
        <p className="contact-introduction">Explore the source and connect through the published profile.</p>
        <ul className="contact-links">{links.map(link => <li key={link.href}><TextLink href={link.href} arrow="↗">{link.label}</TextLink></li>)}</ul>
      </div>
    </section>}
  </SiteShell>;
}

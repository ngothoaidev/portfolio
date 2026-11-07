import { getContactLinks, type SiteProfile } from '../../content/site';
import { Section } from '../layout/section';
import { SectionHeading } from '../ui/typography';
import { TextLink } from '../ui/text-link';

export function Contact({ profile }: { profile: SiteProfile }) {
  const links = getContactLinks(profile);
  if (links.length === 0) return null;
  return (
    <Section id="contact" headingId="contact-heading" label="03 / Get in touch">
      <SectionHeading id="contact-heading">Continue the conversation.</SectionHeading>
      <p className="contact-introduction">Find me through the links below.</p>
      <ul className="contact-links" aria-label="Contact and profiles">
        {links.map((link) => (
          <li key={link.href}><TextLink href={link.href} arrow="↗">{link.label}</TextLink></li>
        ))}
      </ul>
    </Section>
  );
}

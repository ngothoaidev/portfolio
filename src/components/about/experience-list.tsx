import { getApprovedExperience, type ExperienceEntry } from '../../content/profile';
import { SectionHeading } from '../ui/typography';
import { TextLink } from '../ui/text-link';
function month(value: string) {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
}
export function ExperienceList({ entries }: { entries: readonly ExperienceEntry[] }) {
  const approved = getApprovedExperience(entries);
  if (!approved.length) return null;
  return <section className="about-experience" aria-labelledby="experience-heading" id="experience">
    <SectionHeading id="experience-heading">Experience</SectionHeading>
    <ol className="experience-list">{approved.map(entry => <li key={entry.id}>
      <SectionHeading as="h3">{entry.role} · {entry.organization}</SectionHeading>
      <p className="experience-period"><time dateTime={entry.startDate}>{month(entry.startDate)}</time> – {entry.endDate === 'present' ? 'Present' : <time dateTime={entry.endDate}>{month(entry.endDate)}</time>}{entry.location && <> · {entry.location}</>}</p>
      <p>{entry.summary}</p>
      {entry.contributions.length > 0 && <ul>{entry.contributions.map(item => <li key={item}>{item}</li>)}</ul>}
      {entry.technologies.length > 0 && <p>{entry.technologies.join(' · ')}</p>}
      {entry.evidence?.map(link => <TextLink key={link.url} href={link.url}>{link.label}</TextLink>)}
    </li>)}</ol>
  </section>;
}

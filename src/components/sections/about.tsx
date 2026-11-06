import Introduction from '@/content/introduction.mdx';
import { Section } from '../layout/section';
import { SectionHeading } from '../ui/typography';

export function About() {
  return (
    <Section id="about" headingId="about-heading" label="02 / About this space">
      <div className="prose">
        <Introduction components={{ h2: (props) => <SectionHeading {...props} id="about-heading" /> }} />
      </div>
    </Section>
  );
}

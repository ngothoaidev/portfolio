import { SiteShell } from '@/components/layout/site-shell';
import { Hero } from '@/components/sections/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { EngineeringExpertise } from '@/components/sections/engineering-expertise';
import { Contact } from '@/components/sections/contact';
import Introduction from '@/content/introduction.mdx';
import { projects } from '@/content/projects';
import { expertise } from '@/content/expertise';
import { site } from '@/content/site';

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <SelectedWork projects={projects} />
      <EngineeringExpertise areas={expertise} introduction={<Introduction />} />
      <Contact profile={site} />
    </SiteShell>
  );
}

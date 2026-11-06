import { SiteShell } from '@/components/layout/site-shell';
import { Hero } from '@/components/sections/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { About } from '@/components/sections/about';
import { projects } from '@/content/projects';

export default function Home() {
  return <SiteShell><Hero /><SelectedWork projects={projects} /><About /></SiteShell>;
}

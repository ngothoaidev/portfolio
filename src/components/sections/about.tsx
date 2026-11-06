import Introduction from '@/content/introduction.mdx';
export function About() {
  return (<section id="about" className="content-section editorial-grid" aria-labelledby="about-heading">
          <p className="eyebrow section-label">02 / About this space</p>
          <div className="section-body prose"><Introduction components={{ h2: (props) => <h2 id="about-heading" {...props} /> }} /></div>
        </section>);
}

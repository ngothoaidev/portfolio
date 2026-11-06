import { Container } from '@/components/layout/container';
import { DisplayHeading, Eyebrow } from '@/components/ui/typography';
import { TextLink } from '@/components/ui/text-link';

export default function NotFound() {
  return (
    <Container as="main" id="main" tabIndex={-1} className="not-found">
      <Eyebrow>404 / Page not found</Eyebrow>
      <DisplayHeading>A missing page.</DisplayHeading>
      <p>This address does not lead to a page in this portfolio.</p>
      <TextLink href="/" arrow="↗">Return to the portfolio</TextLink>
    </Container>
  );
}

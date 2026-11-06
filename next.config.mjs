import { fileURLToPath } from 'node:url';
import createMDX from '@next/mdx';
const withMDX = createMDX({});
export default withMDX({
  output: 'export',
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

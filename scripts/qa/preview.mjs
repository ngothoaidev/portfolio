export async function startPreview() {
  const { createStaticServer } = await import('./static-server.mjs');
  const server = createStaticServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { origin: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())) };
}
export const routes = ['/', '/about/', '/work/', '/work/online-auction/', '/404.html'];
export const labelFor = route => route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '');

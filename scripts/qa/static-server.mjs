import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
const mime = { '.html': 'text/html; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };
// Loopback production-export simulation only. No backend or deployed security-header assertion.
export function createStaticServer(root = resolve('out')) {
  return createServer(async (req, res) => {
    try {
      if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
      const url = new URL(req.url, 'http://localhost');
      let file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
      if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403); res.end(); return; }
      let info = await stat(file).catch(() => null);
      if (info?.isDirectory()) {
        if (!url.pathname.endsWith('/')) { res.writeHead(308, { Location: url.pathname + '/' + url.search }); res.end(); return; }
        file = resolve(file, 'index.html'); info = await stat(file).catch(() => null);
      }
      const status = info?.isFile() ? 200 : 404;
      if (status === 404) file = resolve(root, '404.html');
      let body = await readFile(file);
      const headers = { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream', 'Cache-Control': /[/\\]_next[/\\]static[/\\]/.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache', Vary: 'Accept-Encoding' };
      if (/gzip/.test(req.headers['accept-encoding'] ?? '') && /\.(html|css|js|svg|json|txt)$/.test(file)) { body = gzipSync(body); headers['Content-Encoding'] = 'gzip'; }
      headers['Content-Length'] = body.length;
      res.writeHead(status, headers); res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(400); res.end('Bad request'); }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT ?? 3007);
  createStaticServer().listen(port, '127.0.0.1', () => console.log(`Production out/ preview: http://127.0.0.1:${port}`));
}

import { readdir, copyFile } from 'node:fs/promises';
import { resolve, join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

// Next 16.4.5 flattens forward slashes in RSC segment names. On Windows its
// exporter retains backslashes as directories. Add the filenames the router requests.
// Do not rewrite payload bytes or remove the original export.
export async function normalizeExport(root = resolve('out')) {
  let aliases = 0;
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === '_next') continue;
      const child = join(directory, entry.name);
      if (entry.name.startsWith('__next.')) await flatten(child, directory);
      else await walk(child);
    }
  }
  async function flatten(directory, routeRoot) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) await flatten(file, routeRoot);
      else if (entry.name.endsWith('.txt')) {
        const target = join(routeRoot, relative(routeRoot, file).split(sep).join('.'));
        await copyFile(file, target); aliases++;
      }
    }
  }
  await walk(root);
  return aliases;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  normalizeExport().then(aliases => console.log(`Static router payload aliases: ${aliases}`));
}

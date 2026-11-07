import localFont from 'next/font/local';

// Same approved local Latin font files; preload and metric-adjusted fallback reduce swap shifts.
export const geist = localFont({
  src: [
    { path: '../../node_modules/@fontsource/geist/files/geist-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/geist/files/geist-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-geist', display: 'swap', adjustFontFallback: 'Arial',
});
export const instrument = localFont({
  src: [
    { path: '../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument', display: 'swap', adjustFontFallback: 'Times New Roman',
});
export const mono = localFont({
  src: '../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
  weight: '400', style: 'normal', variable: '--font-plex', display: 'swap', adjustFontFallback: 'Arial',
});

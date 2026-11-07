import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getContactLinks, type SiteProfile } from './site';
export function validateResume(profile: SiteProfile, publicRoot = resolve('public')) {
  if (!profile.resumePath) return;
  if (!getContactLinks(profile).some(link => link.href === profile.resumePath)) throw new Error('Resume requires publication approval, privacy review and a safe local PDF path');
  const pdf = readFileSync(resolve(publicRoot, profile.resumePath.slice(1)));
  if (pdf.subarray(0, 5).toString() !== '%PDF-' || !pdf.toString('latin1').includes('%%EOF')) throw new Error('Resume must be a valid reviewed PDF');
}

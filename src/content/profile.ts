export type Approved<T> = { value: T; publicationStatus: 'draft' | 'approved'; approval: string };
export type Profile = { name: Approved<string> | null; bio: Approved<string> | null };
export const profile: Profile = { name: null, bio: null };
export function publishedText(record: Approved<string> | null): string | null {
  return record?.publicationStatus === 'approved' && record.approval.trim() && record.value.trim() ? record.value : null;
}
export type ExperienceEntry = {
  id: string; organization: string; role: string; startDate: string; endDate: string | 'present';
  location?: string; summary: string; contributions: readonly string[]; technologies: readonly string[];
  evidence?: readonly { label: string; url: string }[];
  publicationStatus: 'draft' | 'approved'; approval: string;
};
export const experiences: readonly ExperienceEntry[] = [];
function validMonth(value: string) { return /^\d{4}-(0[1-9]|1[0-2])$/.test(value); }
export function getApprovedExperience(records: readonly ExperienceEntry[]): readonly ExperienceEntry[] {
  const ids = new Set<string>();
  return records.filter(record => record.publicationStatus === 'approved').map(record => {
    if (ids.has(record.id) || ![record.id, record.organization, record.role, record.summary, record.approval, ...record.contributions, ...record.technologies].every(value => value.trim())) throw new Error('Invalid experience text or duplicate ID');
    ids.add(record.id);
    if (!validMonth(record.startDate) || (record.endDate !== 'present' && (!validMonth(record.endDate) || record.endDate < record.startDate))) throw new Error('Invalid experience dates');
    for (const link of record.evidence ?? []) {
      const url = new URL(link.url);
      if (url.protocol !== 'https:' || url.username || url.password || !link.label.trim()) throw new Error('Invalid experience evidence');
    }
    return record;
  }).sort((a,b) => b.startDate.localeCompare(a.startDate));
}

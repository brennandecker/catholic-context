import type { SearchDocument } from './types';

function normalize(value: string): string {
  return value.toLowerCase().normalize('NFKD');
}

function scoreDocument(doc: SearchDocument, query: string): number {
  const q = normalize(query.trim());
  if (!q) return 0;

  const title = normalize(doc.title);
  const summary = normalize(doc.summary);
  const id = normalize(doc.id);
  const slug = normalize(doc.slug);
  const sources = normalize(doc.sources.join(' '));
  const related = normalize(doc.related.join(' '));
  const entity = normalize(doc.entity_type);
  const claim = normalize(doc.claim_type ?? '');

  let score = 0;
  if (title === q || id === q || slug === q) score += 100;
  if (title.startsWith(q)) score += 60;
  if (title.includes(q)) score += 40;
  if (id.includes(q) || slug.includes(q)) score += 35;
  if (sources.includes(q)) score += 30;
  if (entity.includes(q) || claim.includes(q)) score += 20;
  if (related.includes(q)) score += 15;
  if (summary.includes(q)) score += 10;

  // Token boost for multi-word natural-language queries
  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  for (const token of tokens) {
    if (title.includes(token)) score += 8;
    if (summary.includes(token)) score += 3;
    if (sources.includes(token)) score += 4;
  }

  return score;
}

export function searchKnowledge(
  documents: SearchDocument[],
  query: string,
): SearchDocument[] {
  const q = query.trim();
  if (!q) return documents;

  return documents
    .map((doc) => ({ doc, score: scoreDocument(doc, q) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .map((row) => row.doc);
}

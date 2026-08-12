#!/usr/bin/env node
/**
 * Import published My Catholic Guide / Catholic Guidance entity tables from Supabase
 * into Catholic Context YAML under context/.
 *
 * Does NOT import explore_topics / live_topics (narrative product content).
 * Skips files that already exist (preserves hand-authored seeds).
 *
 * Usage:
 *   PUBLIC_SUPABASE_URL=... PUBLIC_SUPABASE_ANON_KEY=... node scripts/import-mcg-entities.mjs
 */

import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stringify } from '../website/node_modules/yaml/dist/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const URL_BASE = process.env.PUBLIC_SUPABASE_URL || 'https://ewpehbytlngdgbylwgcz.supabase.co';
const ANON =
  process.env.PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3cGVoYnl0bG5nZGdieWx3Z2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NDkwNTksImV4cCI6MjA5MDMyNTA1OX0.RoqkWYARQdfHIXUR7fUHpuj4aU-LxqTLECgMH9RiONc';

const NOW = new Date().toISOString();

function cleanSlug(slug) {
  return String(slug || '')
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/\.+/g, '.');
}

function summarize(text, fallback) {
  const value = (text || '').replace(/\s+/g, ' ').trim();
  if (value) return value.length > 600 ? `${value.slice(0, 597).trim()}…` : value;
  return fallback;
}

async function fetchAll(table, select) {
  const pageSize = 1000;
  let from = 0;
  const rows = [];
  for (;;) {
    const to = from + pageSize - 1;
    const res = await fetch(
      `${URL_BASE}/rest/v1/${table}?select=${encodeURIComponent(select)}&is_published=eq.true&order=slug.asc`,
      {
        headers: {
          apikey: ANON,
          Authorization: `Bearer ${ANON}`,
          Prefer: 'count=exact',
          Range: `${from}-${to}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(`${table} fetch failed: ${res.status} ${await res.text()}`);
    }
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return rows;
}

function baseObject({ id, title, entityType, summary, claimType, sourceNote, related = [] }) {
  return {
    id,
    title,
    entity_type: entityType,
    classification: claimType
      ? {
          claim_type: claimType,
          certainty: 'not-applicable',
          note: null,
        }
      : null,
    summary,
    review: {
      status: 'draft',
      reviewed_by: null,
      reviewed_at: null,
      review_commit: null,
    },
    sources: [
      {
        source_type: 'other',
        reference: 'My Catholic Guide / Catholic Guidance (Supabase)',
        url: null,
        note: sourceNote,
      },
    ],
    relationships: {
      broader: [],
      narrower: [],
      related,
    },
    notes:
      'Imported as draft entity metadata from Supabase. Not a narrative product import. Requires source enrichment and theological review before promotion.',
    source_fidelity: {
      representation: 'entity-metadata',
      confidence: 0.55,
      needs_theological_review: true,
      linkable_sources: false,
      assessed_by: 'import-mcg-entities',
      assessed_at: NOW,
      rationale:
        'Bulk-imported entity metadata. Confidence is provisional until official source links are attached.',
      unresolved_issues: ['Needs resolvable official source URLs', 'Draft import pending human review'],
    },
  };
}

function writeYaml(relPath, object) {
  const abs = join(ROOT, relPath);
  if (existsSync(abs)) return 'skipped';
  mkdirSync(dirname(abs), { recursive: true });
  const body = `# DRAFT — imported from Supabase; theological review pending\n${stringify(object, {
    lineWidth: 96,
  })}`;
  writeFileSync(abs, body, 'utf8');
  return 'wrote';
}

function relatedFromSlugs(slugs, prefix) {
  if (!Array.isArray(slugs)) return [];
  return slugs
    .filter(Boolean)
    .slice(0, 8)
    .map((slug) => `${prefix}.${cleanSlug(slug)}`);
}

async function main() {
  const stats = { wrote: 0, skipped: 0 };

  const saints = await fetchAll(
    'saints',
    'slug,name,summary,feast_day,era,source',
  );
  for (const row of saints) {
    const slug = cleanSlug(row.slug);
    if (!slug || !row.name) continue;
    const feast = row.feast_day ? ` Feast day: ${row.feast_day}.` : '';
    const era = row.era ? ` Era: ${row.era}.` : '';
    const object = baseObject({
      id: `person.${slug}`,
      title: row.name,
      entityType: 'person',
      summary: summarize(
        row.summary,
        `${row.name} is commemorated as a saint in the Catholic tradition.${feast}${era}`,
      ),
      claimType: null,
      sourceNote: `Imported from saints.${slug}`,
    });
    const result = writeYaml(`context/persons/${slug}.yaml`, object);
    stats[result] += 1;
  }

  const popes = await fetchAll(
    'popes',
    'slug,papal_name,birth_name,summary,reign_start,reign_end,associated_saint_slugs',
  );
  for (const row of popes) {
    const slug = cleanSlug(row.slug);
    if (!slug || !row.papal_name) continue;
    const reign =
      row.reign_start || row.reign_end
        ? ` Pontificate: ${[row.reign_start, row.reign_end].filter(Boolean).join('–')}.`
        : '';
    const object = baseObject({
      id: `person.${slug}`,
      title: row.papal_name,
      entityType: 'person',
      summary: summarize(
        row.summary,
        `${row.papal_name}${row.birth_name ? ` (born ${row.birth_name})` : ''} served as Bishop of Rome.${reign}`,
      ),
      claimType: null,
      sourceNote: `Imported from popes.${slug}`,
      related: relatedFromSlugs(row.associated_saint_slugs, 'person'),
    });
    const result = writeYaml(`context/persons/${slug}.yaml`, object);
    stats[result] += 1;
  }

  const events = await fetchAll(
    'key_events',
    'slug,title,summary,event_date,era,category,significance,associated_saint_slugs,associated_pope_slugs',
  );
  for (const row of events) {
    const slug = cleanSlug(row.slug);
    if (!slug || !row.title) continue;
    const when = row.event_date ? ` (${row.event_date})` : '';
    const object = baseObject({
      id: `event.${slug}`,
      title: row.title,
      entityType: 'event',
      summary: summarize(
        row.summary || row.significance,
        `${row.title}${when} is recorded as a significant event in Catholic history.`,
      ),
      claimType: 'historical-claim',
      sourceNote: `Imported from key_events.${slug}`,
      related: [
        ...relatedFromSlugs(row.associated_saint_slugs, 'person'),
        ...relatedFromSlugs(row.associated_pope_slugs, 'person'),
      ],
    });
    const result = writeYaml(`context/events/${slug}.yaml`, object);
    stats[result] += 1;
  }

  const churches = await fetchAll(
    'churches',
    'slug,name,summary,location_name,diocese,founding_year,associated_saint_slugs',
  );
  for (const row of churches) {
    const slug = cleanSlug(row.slug);
    if (!slug || !row.name) continue;
    const where = row.location_name ? ` in ${row.location_name}` : '';
    const object = baseObject({
      id: `institution.${slug}`,
      title: row.name,
      entityType: 'institution',
      summary: summarize(
        row.summary,
        `${row.name} is a Catholic church${where}.`,
      ),
      claimType: null,
      sourceNote: `Imported from churches.${slug}`,
      related: relatedFromSlugs(row.associated_saint_slugs, 'person'),
    });
    const result = writeYaml(`context/places/${slug}.yaml`, object);
    stats[result] += 1;
  }

  console.log(
    JSON.stringify(
      {
        fetched: {
          saints: saints.length,
          popes: popes.length,
          events: events.length,
          churches: churches.length,
        },
        ...stats,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml, stringify } from '../website/node_modules/yaml/dist/index.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTEXT = join(ROOT, 'context');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.yaml')) out.push(full);
  }
  return out;
}

function isProductAttribution(source) {
  const blob = `${source?.reference || ''} ${source?.note || ''}`.toLowerCase();
  return (
    blob.includes('my catholic guide') ||
    blob.includes('catholic guidance') ||
    blob.includes('supabase') ||
    /imported from (saints|popes|key_events|churches)\./i.test(blob)
  );
}

const pendingSource = {
  source_type: 'other',
  reference: 'Approved source locator pending',
  url: null,
  note:
    'Draft entity awaiting a resolvable Vatican, Scriptural, catechetical, liturgical, or public-domain scholarly locator. Product databases are not citable sources.',
};

let changed = 0;
for (const file of walk(CONTEXT)) {
  const raw = readFileSync(file, 'utf8');
  const doc = parseYaml(raw);
  if (!doc || typeof doc !== 'object') continue;

  let dirty = false;
  const sources = Array.isArray(doc.sources) ? [...doc.sources] : [];
  const cleaned = sources.filter((s) => !isProductAttribution(s));
  if (cleaned.length !== sources.length) dirty = true;
  if (cleaned.length === 0) {
    cleaned.push({ ...pendingSource });
    dirty = true;
  }
  doc.sources = cleaned;

  if (typeof doc.notes === 'string') {
    const n = doc.notes.toLowerCase();
    if (
      n.includes('my catholic guide') ||
      n.includes('supabase') ||
      n.includes('catholic guidance') ||
      n.includes('imported as draft entity metadata')
    ) {
      doc.notes =
        'Draft entity metadata. Requires approved public source locators and theological review before promotion. Catholic Context does not cite product databases as sources.';
      dirty = true;
    }
  }

  if (doc.source_fidelity && typeof doc.source_fidelity === 'object') {
    const hasUrl = doc.sources.some((s) => typeof s.url === 'string' && /^https?:\/\//.test(s.url));
    if (doc.source_fidelity.linkable_sources && !hasUrl) {
      doc.source_fidelity.linkable_sources = false;
      dirty = true;
    }
    if (doc.source_fidelity.assessed_by === 'import-mcg-entities') {
      doc.source_fidelity.assessed_by = 'entity-bootstrap';
      dirty = true;
    }
    if (
      typeof doc.source_fidelity.rationale === 'string' &&
      /bulk-imported|supabase|my catholic guide/i.test(doc.source_fidelity.rationale)
    ) {
      doc.source_fidelity.rationale =
        'Entity draft pending approved public locators. The Church’s teaching and historical record stand on their own authority; this score only grades Catholic Context’s sourcing.';
      dirty = true;
    }
  }

  if (!dirty && !/^# DRAFT — imported from Supabase/m.test(raw)) continue;
  if (!dirty && /^# DRAFT — imported from Supabase/m.test(raw)) dirty = true;
  if (!dirty) continue;

  writeFileSync(
    file,
    `# DRAFT — source locators pending; theological review pending\n${stringify(doc, {
      lineWidth: 96,
    })}`,
    'utf8',
  );
  changed += 1;
}

console.log(JSON.stringify({ changed }, null, 2));

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js';
import type {
  KnowledgeEntry,
  KnowledgeObject,
  RegistrySource,
  SearchDocument,
} from './types';

function resolveRepoRoot(): string {
  if (process.env.CATHOLIC_CONTEXT_ROOT) {
    return resolve(process.env.CATHOLIC_CONTEXT_ROOT);
  }

  // Build/dev commands run from website/, so the monorepo root is one level up.
  // Also walk upward in case the working directory differs.
  let current = resolve(process.cwd());
  for (let i = 0; i < 6; i += 1) {
    if (existsSync(join(current, 'schema/catholic-context.schema.json'))) {
      return current;
    }
    const parent = resolve(current, '..');
    if (parent === current) break;
    current = parent;
  }

  throw new Error(
    'Unable to locate Catholic Context repository root (schema/catholic-context.schema.json).',
  );
}

export const REPO_ROOT = resolveRepoRoot();
const CONTEXT_DIR = join(REPO_ROOT, 'context');
const SCHEMA_PATH = join(REPO_ROOT, 'schema/catholic-context.schema.json');
const SOURCE_REGISTRY_PATH = join(REPO_ROOT, 'sources/source-registry.yaml');
const EVAL_FIXTURE_DIRS = [
  join(REPO_ROOT, 'evals/fixtures'),
  join(REPO_ROOT, 'evals/humanitas'),
];

function walkYamlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkYamlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.yaml')) {
      results.push(full);
    }
  }
  return results;
}

function loadSchemaValidator() {
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  return ajv.compile(schema);
}

function pathToSlug(repoPath: string): string {
  // context/sacraments/eucharist/real-presence.yaml -> sacraments/eucharist/real-presence
  return repoPath
    .replace(/^context\//, '')
    .replace(/\.ya?ml$/, '');
}

function slugToCrumbs(slug: string): string[] {
  return slug.split('/').filter(Boolean);
}

let cachedEntries: KnowledgeEntry[] | null = null;

export function loadKnowledgeEntries(): KnowledgeEntry[] {
  if (cachedEntries) return cachedEntries;

  const validate = loadSchemaValidator();
  const files = walkYamlFiles(CONTEXT_DIR);
  const entries: KnowledgeEntry[] = [];

  for (const file of files) {
    const raw = readFileSync(file, 'utf8');
    const data = parseYaml(raw) as KnowledgeObject;
    const valid = validate(data);
    if (!valid) {
      const details = (validate.errors ?? [])
        .map((e) => `${e.instancePath || '/'} ${e.message}`)
        .join('; ');
      throw new Error(`Invalid knowledge object at ${file}: ${details}`);
    }

    const repoPath = relative(REPO_ROOT, file).replaceAll('\\', '/');
    const slug = pathToSlug(repoPath);
    entries.push({
      object: data,
      repoPath,
      slug,
      crumbs: slugToCrumbs(slug),
      lastModified: statSync(file).mtime.toISOString(),
    });
  }

  entries.sort((a, b) => a.object.title.localeCompare(b.object.title));
  cachedEntries = entries;
  return entries;
}

export function getKnowledgeBySlug(slug: string): KnowledgeEntry | undefined {
  return loadKnowledgeEntries().find((e) => e.slug === slug);
}

export function getKnowledgeById(id: string): KnowledgeEntry | undefined {
  return loadKnowledgeEntries().find((e) => e.object.id === id);
}

export function buildSearchDocuments(): SearchDocument[] {
  return loadKnowledgeEntries().map((entry) => ({
    id: entry.object.id,
    title: entry.object.title,
    summary: entry.object.summary,
    slug: entry.slug,
    entity_type: entry.object.entity_type,
    claim_type: entry.object.classification?.claim_type ?? null,
    review_status: entry.object.review.status,
    sources: entry.object.sources.map((s) => s.reference),
    related: [
      ...(entry.object.relationships?.broader ?? []),
      ...(entry.object.relationships?.narrower ?? []),
      ...(entry.object.relationships?.related ?? []),
    ],
  }));
}

export function loadSourceRegistry(): RegistrySource[] {
  if (!existsSync(SOURCE_REGISTRY_PATH)) return [];
  const raw = parseYaml(readFileSync(SOURCE_REGISTRY_PATH, 'utf8')) as {
    sources?: RegistrySource[];
  };
  return raw.sources ?? [];
}

export function reviewLabel(status: string): string {
  switch (status) {
    case 'draft':
      return 'DRAFT — THEOLOGICAL REVIEW PENDING';
    case 'community-reviewed':
      return 'COMMUNITY REVIEWED';
    case 'theologically-reviewed':
      return 'THEOLOGICALLY REVIEWED';
    default:
      return status.toUpperCase();
  }
}

export function formatClaimType(claim: string | null | undefined): string | null {
  if (!claim) return null;
  return claim.replace(/-/g, ' ').toUpperCase();
}

export function readRepoMarkdown(relativePath: string): string {
  const full = join(REPO_ROOT, relativePath);
  if (!existsSync(full)) return '';
  return readFileSync(full, 'utf8');
}

export function loadHarnessPrinciples(): {
  document: Record<string, unknown>;
  status: Record<string, unknown>;
  principles: Array<Record<string, unknown>>;
} {
  const path = join(REPO_ROOT, 'harness/principles/magnifica-humanitas.yaml');
  const data = parseYaml(readFileSync(path, 'utf8')) as {
    document: Record<string, unknown>;
    status: Record<string, unknown>;
    principles: Array<Record<string, unknown>>;
  };
  return data;
}

export interface EvalCase {
  id: string;
  family: string;
  prompt: string;
  status: string;
  severity: string;
  principle?: string | null;
  knowledge_ids?: string[];
  expected: { must: string[]; must_not: string[] };
}

export function loadEvalCases(): EvalCase[] {
  const cases: EvalCase[] = [];
  for (const dir of EVAL_FIXTURE_DIRS) {
    for (const file of walkYamlFiles(dir)) {
      const data = parseYaml(readFileSync(file, 'utf8')) as EvalCase;
      if (data?.id && data?.prompt) cases.push(data);
    }
  }
  cases.sort((a, b) => a.id.localeCompare(b.id));
  return cases;
}

export function loadHarnessProfile(): Record<string, unknown> {
  const path = join(REPO_ROOT, 'harness/implementations/default-v0.yaml');
  if (!existsSync(path)) return {};
  return parseYaml(readFileSync(path, 'utf8')) as Record<string, unknown>;
}

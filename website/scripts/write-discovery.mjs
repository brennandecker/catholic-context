#!/usr/bin/env node
/**
 * Write static discovery files into website/public so crawlers never hit
 * a runtime Worker that cannot read context/*.yaml (the live sitemap 500).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const websiteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(websiteRoot, '..');
const contextDir = join(repoRoot, 'context');
const publicDir = join(websiteRoot, 'public');
const SITE = 'https://catholiccontext.org';

const STATIC_ROUTES = [
  '/',
  '/search',
  '/knowledge',
  '/sources',
  '/harness',
  '/evals',
  '/governance',
  '/developers',
  '/open',
  '/about',
  '/contribute',
  '/llms.txt',
];

function walkYaml(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkYaml(full));
    else if (entry.isFile() && entry.name.endsWith('.yaml')) out.push(full);
  }
  return out;
}

function isoDay(file) {
  return statSync(file).mtime.toISOString().slice(0, 10);
}

function loadEntries() {
  return walkYaml(contextDir).map((file) => {
    const data = parseYaml(readFileSync(file, 'utf8'));
    const repoPath = relative(repoRoot, file).replaceAll('\\', '/');
    const slug = repoPath.replace(/^context\//, '').replace(/\.ya?ml$/, '');
    return {
      slug,
      title: data.title || slug,
      summary: String(data.summary || '').replace(/\s+/g, ' ').trim(),
      lastmod: isoDay(file),
      status: data.review?.status || 'draft',
    };
  });
}

function xmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function writeSitemap(entries) {
  const urls = [
    ...STATIC_ROUTES.map((path) => ({
      loc: path === '/' ? SITE : `${SITE}${path}`,
      lastmod: isoDay(join(repoRoot, 'website/src/pages')),
    })),
    ...entries.map((entry) => ({
      loc: `${SITE}/knowledge/${entry.slug}`,
      lastmod: entry.lastmod,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${xmlEscape(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
  writeFileSync(join(publicDir, 'sitemap.xml'), body);
}

function writeLlmsTxt(entries) {
  const drafts = entries.filter((e) => e.status === 'draft').length;
  const lines = [
    '# Catholic Context',
    '',
    `> ${SITE.replace('https://', '')} — open Catholic knowledge for humans and AI.`,
    '',
    'Catholic Context is independent open infrastructure. It does not speak for the Magisterium, administer sacraments, or discern God\'s particular will for a person.',
    '',
    `Every knowledge object currently in this corpus is labeled with an honest review status. ${drafts} of ${entries.length} objects are still \`draft\`. Do not treat draft summaries as theologically reviewed, Church-approved, or a substitute for the cited sources.`,
    '',
    'The Git repository is the canonical record: https://github.com/brennandecker/catholic-context',
    '',
    '## Knowledge',
    '',
    ...entries
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(
        (entry) =>
          `- [${entry.title}](${SITE}/knowledge/${entry.slug}): ${entry.summary.slice(0, 240)}${entry.summary.length > 240 ? '…' : ''} (${entry.status})`,
      ),
    '',
    '## Project surfaces',
    '',
    `- [Home](${SITE}/)`,
    `- [Knowledge index](${SITE}/knowledge)`,
    `- [Sources](${SITE}/sources)`,
    `- [Harness](${SITE}/harness)`,
    `- [Magnifica Humanitas presentation](https://www.youtube.com/watch?v=O244WhIpdLg) — EWTN News recording of the official Vatican presentation film, embedded on the home page`,
    `- [Pope Leo XIV full speech](https://www.youtube.com/watch?v=q_mUHi2mpIQ) — full address at the Magnifica Humanitas Vatican launch, embedded on /harness`,
    `- [Evals](${SITE}/evals)`,
    `- [Governance](${SITE}/governance)`,
    `- [Schema](https://github.com/brennandecker/catholic-context/blob/main/schema/catholic-context.schema.json)`,
    `- [Contribute / corrections](${SITE}/contribute)`,
    '',
    '## Optional',
    '',
    `- [Sitemap](${SITE}/sitemap.xml)`,
    `- [Robots](${SITE}/robots.txt)`,
  ];
  writeFileSync(join(publicDir, 'llms.txt'), `${lines.join('\n')}\n`);
}

function writeRobots() {
  const body = `User-agent: *
Allow: /

# Account and reviewer consoles are not the public commons.
Disallow: /login
Disallow: /account
Disallow: /auth/
Disallow: /propose
Disallow: /review/proposal
Disallow: /api/

Sitemap: ${SITE}/sitemap.xml
`;
  writeFileSync(join(publicDir, 'robots.txt'), body);
}

mkdirSync(publicDir, { recursive: true });
mkdirSync(join(publicDir, '.well-known'), { recursive: true });
const entries = loadEntries();
writeSitemap(entries);
writeLlmsTxt(entries);
writeRobots();
writeFileSync(join(publicDir, '.well-known/llms.txt'), readFileSync(join(publicDir, 'llms.txt')));
console.log(`Wrote discovery files for ${entries.length} knowledge objects.`);

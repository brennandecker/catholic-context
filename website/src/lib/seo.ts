import { SITE } from './site';
import type { KnowledgeEntry } from './types';

export const OG_IMAGE_PATH = '/og.jpg';

export function absoluteUrl(path: string): string {
  const normalized =
    path === '/' || path === ''
      ? '/'
      : path.startsWith('/')
        ? path
        : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}

export function ogImageUrl(): string {
  return absoluteUrl(OG_IMAGE_PATH);
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        logo: absoluteUrl('/favicon.svg'),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: 'en',
        publisher: { '@id': `${SITE.url}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE.url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function knowledgeJsonLd(entry: KnowledgeEntry) {
  const url = absoluteUrl(`/knowledge/${entry.slug}`);
  const sources = entry.object.sources
    .filter((source) => source.url)
    .map((source) => ({
      '@type': 'CreativeWork',
      name: source.reference,
      url: source.url,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.object.title,
    description: entry.object.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en',
    dateModified: entry.lastModified,
    creativeWorkStatus: reviewStatusToCreativeWorkStatus(entry.object.review.status),
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      '@type': 'Thing',
      name: entry.object.title,
    },
    ...(sources.length > 0 ? { isBasedOn: sources } : {}),
    copyrightNotice:
      'Catholic Context is an independent open-source project. It does not claim official endorsement by the Holy See or another ecclesiastical authority.',
  };
}

function reviewStatusToCreativeWorkStatus(status: string): string {
  if (status === 'theologically-reviewed' || status === 'community-reviewed') {
    return 'Published';
  }
  return 'Draft';
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

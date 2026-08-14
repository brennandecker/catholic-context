import { FEATURED_VIDEO, HUMANITAS_SPEECH, SITE, type SiteVideo } from './site';
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

export function videoJsonLd(
  video: SiteVideo,
  options: { id: string; description: string },
) {
  return {
    '@type': 'VideoObject',
    '@id': `${SITE.url}/#${options.id}`,
    name: video.title,
    description: options.description,
    thumbnailUrl: video.thumbnailUrl,
    embedUrl: video.embedUrl,
    contentUrl: video.watchUrl,
    publisher: {
      '@type': 'Organization',
      name: video.publisher,
    },
    isAccessibleForFree: true,
  };
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
      videoJsonLd(FEATURED_VIDEO, {
        id: 'magnifica-humanitas-video',
        description:
          'EWTN News recording of the official Vatican presentation of Magnifica Humanitas, the human-centered principles the Catholic Context Harness interprets for Catholic-grounded AI.',
      }),
      videoJsonLd(HUMANITAS_SPEECH, {
        id: 'magnifica-humanitas-speech',
        description:
          'EWTN News recording of Pope Leo XIV’s full address at the Magnifica Humanitas Vatican launch.',
      }),
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

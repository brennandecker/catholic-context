export const SITE = {
  name: 'Catholic Context',
  tagline: 'Open Catholic knowledge for humans and AI.',
  description:
    'Catholic Context is open infrastructure for Catholic knowledge, Catholic-grounded AI behavior, and measurable theological integrity.',
  url: 'https://catholiccontext.org',
  githubRepo: 'brennandecker/catholic-context',
  githubUrl: 'https://github.com/brennandecker/catholic-context',
  myCatholicGuideUrl: 'https://mycatholicguide.com/',
  ogImage: '/og.jpg',
} as const;

/** EWTN News recording of the official Vatican presentation of Magnifica Humanitas. */
export const FEATURED_VIDEO = {
  id: 'O244WhIpdLg',
  title: 'Magnifica Humanitas: Official Vatican Presentation Video',
  publisher: 'EWTN News',
  watchUrl: 'https://www.youtube.com/watch?v=O244WhIpdLg',
  embedUrl: 'https://www.youtube-nocookie.com/embed/O244WhIpdLg',
  embedPlayerUrl:
    'https://www.youtube-nocookie.com/embed/O244WhIpdLg?autoplay=1&rel=0&modestbranding=1&playsinline=1',
  embedCoverUrl:
    'https://www.youtube-nocookie.com/embed/O244WhIpdLg?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=O244WhIpdLg&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1',
  thumbnailUrl: 'https://i.ytimg.com/vi/O244WhIpdLg/hqdefault.jpg',
} as const;

/** EWTN News recording of Pope Leo XIV’s full address at the Magnifica Humanitas launch. */
export const HUMANITAS_SPEECH = {
  id: 'q_mUHi2mpIQ',
  title: 'Pope Leo XIV Full Speech at Magnifica Humanitas Vatican Launch',
  publisher: 'EWTN News',
  watchUrl: 'https://www.youtube.com/watch?v=q_mUHi2mpIQ',
  embedUrl: 'https://www.youtube-nocookie.com/embed/q_mUHi2mpIQ',
  thumbnailUrl: 'https://i.ytimg.com/vi/q_mUHi2mpIQ/hqdefault.jpg',
} as const;

export type SiteVideo = {
  id: string;
  title: string;
  publisher: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
};

export const NAV = [
  { href: '/knowledge', label: 'Explore' },
  { href: '/sources', label: 'Sources' },
  { href: '/harness', label: 'Harness' },
  { href: '/evals', label: 'Evals' },
  { href: '/governance', label: 'Governance' },
  { href: '/developers', label: 'Developers' },
] as const;

export const TOPIC_LINKS = [
  { href: '/knowledge/doctrine/mary-worship', label: 'Mary' },
  { href: '/knowledge/sacraments/eucharist/real-presence', label: 'Eucharist' },
  { href: '/knowledge/doctrine/pope-sinless', label: 'Papacy' },
  { href: '/knowledge/boundary/confession', label: 'Confession' },
  { href: '/knowledge/doctrine/salvation-non-catholics', label: 'Salvation' },
  { href: '/knowledge/source/citation-discipline', label: 'Citations' },
] as const;

export function githubFileUrl(relativePath: string): string {
  return `${SITE.githubUrl}/blob/main/${relativePath}`;
}

export function correctionIssueUrl(contextId?: string): string {
  const base = `${SITE.githubUrl}/issues/new?template=correction.yml`;
  if (!contextId) return base;
  return `${base}&context=${encodeURIComponent(contextId)}`;
}

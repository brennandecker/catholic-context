export const SITE = {
  name: 'Catholic Context',
  tagline: 'Open Catholic knowledge — for humans, for AI, with human agency intact.',
  description:
    'An open-source project for Catholic knowledge and Catholic-grounded AI, guided by human-centered principles that preserve meaningful agency.',
  url: 'https://catholiccontext.org',
  githubRepo: 'brennandecker/catholic-context',
  githubUrl: 'https://github.com/brennandecker/catholic-context',
  myCatholicGuideUrl: 'https://mycatholicguide.com/',
} as const;

/** Primary header links — keep short; secondary destinations live in the footer / mobile menu. */
export const NAV = [
  { href: '/knowledge', label: 'Explore' },
  { href: '/sources', label: 'Sources' },
  { href: '/harness', label: 'Harness' },
  { href: '/evals', label: 'Evals' },
  { href: '/open', label: 'Contribute' },
  { href: '/governance', label: 'Governance' },
] as const;

export const NAV_MORE = [
  { href: '/developers', label: 'Developers' },
  { href: '/about', label: 'About' },
  { href: '/review', label: 'Review' },
] as const;

export const TOPIC_LINKS = [
  { href: '/knowledge/sacraments/eucharist/real-presence', label: 'Eucharist' },
  { href: '/knowledge/doctrine/mary-theotokos', label: 'Mary' },
  { href: '/knowledge/sacraments/penance/reconciliation', label: 'Confession' },
  { href: '/knowledge/discipline/holy-days-of-obligation', label: 'Holy Days' },
  { href: '/knowledge/doctrine/purgatory', label: 'Purgatory' },
  { href: '/knowledge/doctrine/papacy-and-infallibility', label: 'Papacy' },
] as const;

export function githubFileUrl(relativePath: string): string {
  return `${SITE.githubUrl}/blob/main/${relativePath}`;
}

export function correctionIssueUrl(contextId?: string): string {
  const base = `${SITE.githubUrl}/issues/new?template=correction.yml`;
  if (!contextId) return base;
  return `${base}&context=${encodeURIComponent(contextId)}`;
}

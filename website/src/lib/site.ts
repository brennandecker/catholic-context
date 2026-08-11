export const SITE = {
  name: 'Catholic Context',
  tagline: 'Open Catholic knowledge for humans and AI.',
  description:
    'Catholic Context is open infrastructure for Catholic knowledge, Catholic-grounded AI behavior, and measurable theological integrity.',
  url: 'https://catholiccontext.org',
  githubRepo: 'brennandecker/catholic-context',
  githubUrl: 'https://github.com/brennandecker/catholic-context',
  myCatholicGuideUrl: 'https://mycatholicguide.com/',
} as const;

export const NAV = [
  { href: '/knowledge', label: 'Explore' },
  { href: '/sources', label: 'Sources' },
  { href: '/harness', label: 'Harness' },
  { href: '/evals', label: 'Evals' },
  { href: '/governance', label: 'Governance' },
  { href: '/developers', label: 'Developers' },
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

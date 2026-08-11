export type ReviewStatus = 'draft' | 'community-reviewed' | 'theologically-reviewed';

export type EntityType =
  | 'teaching'
  | 'concept'
  | 'sacrament'
  | 'person'
  | 'prayer'
  | 'devotion'
  | 'liturgy'
  | 'event'
  | 'institution'
  | 'practice'
  | 'document'
  | 'source'
  | 'other';

export type ClaimType =
  | 'dogma'
  | 'doctrine'
  | 'moral-teaching'
  | 'discipline'
  | 'theological-opinion'
  | 'devotional-practice'
  | 'historical-claim'
  | 'prudential-judgment';

export interface KnowledgeSource {
  source_type: string;
  reference: string;
  url?: string | null;
  note?: string | null;
}

export type SourceRepresentation =
  | 'direct-citation'
  | 'paraphrase'
  | 'summary'
  | 'synthesis'
  | 'entity-metadata';

export interface SourceFidelity {
  representation: SourceRepresentation;
  /** Confidence the wording matches cited sources (0-1). Not doctrinal certainty. */
  confidence: number;
  needs_theological_review: boolean;
  linkable_sources: boolean;
  assessed_by?: string | null;
  assessed_at?: string | null;
  rationale?: string | null;
  unresolved_issues?: string[] | null;
}

export interface KnowledgeObject {
  id: string;
  title: string;
  entity_type: EntityType;
  classification?: {
    claim_type?: ClaimType | null;
    certainty?: string | null;
    note?: string | null;
  } | null;
  summary: string;
  review: {
    status: ReviewStatus;
    reviewed_by?: string[] | null;
    reviewed_at?: string | null;
    review_commit?: string | null;
  };
  source_fidelity?: SourceFidelity | null;
  sources: KnowledgeSource[];
  relationships?: {
    broader?: string[];
    narrower?: string[];
    related?: string[];
  };
  notes?: string | null;
}

export interface KnowledgeEntry {
  object: KnowledgeObject;
  /** Path relative to repository root */
  repoPath: string;
  /** URL slug path without leading /knowledge/ */
  slug: string;
  /** Taxonomy crumbs derived from filesystem path */
  crumbs: string[];
}

export interface SearchDocument {
  id: string;
  title: string;
  summary: string;
  slug: string;
  entity_type: string;
  claim_type: string | null;
  review_status: ReviewStatus;
  sources: string[];
  related: string[];
}

export interface RegistrySource {
  id: string;
  name: string;
  type: string;
  publisher?: string;
  notes?: string;
}

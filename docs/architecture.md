# Architecture

Catholic Context is intended to be the open knowledge layer, not a single end-user application.

```text
Catholic sources
      ↓
Catholic Context repository
      ↓
Schema + structured context + provenance
      ↓
Validation / indexing / knowledge graph
      ↓
API / SDK / MCP / downloadable dataset
      ↓
Applications
```

## Separation of concerns

### Catholic Context

- structured context
- citations and provenance
- relationships and taxonomy
- review metadata
- contribution history
- open developer interfaces

### Applications such as My Catholic Guide

- user accounts
- personalized journeys
- conversational UX
- prayer/study experiences
- subscriptions
- analytics
- notifications
- application-specific presentation

Applications may present Catholic Context differently for different audiences while preserving the underlying source and review metadata.

## Repository as canonical record

During the initial stage, Git is the canonical versioned record for Catholic Context objects. Future databases, search indexes, vector stores, APIs, or graph stores should be reproducible from or traceable to canonical versioned context.

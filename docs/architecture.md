# Architecture

Catholic Context is the open parent project for Catholic knowledge, Catholic-grounded AI behavior, and theological evaluation. It is not a single end-user application and it is not tied to a single AI model provider.

```text
Catholic sources
      ↓
Knowledge layer
      ↓
Structured context + provenance + review metadata
      ↓
Catholic Harness ────── Catholic Evals
      ↓                      ↑
Agent / application runtime ─┘
      ↓
API / SDK / MCP / downloadable dataset / applications
```

## Three primary layers

### Knowledge — What does the Church teach?

- structured entities and teachings
- citations and provenance
- relationships and taxonomy
- theological classification
- review metadata
- version history

### Harness — How should an AI reason and behave?

- source-grounding requirements
- authority and uncertainty handling
- Catholic moral-reasoning scaffold
- citation behavior
- spiritual and pastoral boundaries
- escalation to appropriate human guidance
- model-agnostic runtime expectations

### Evals — Does the system behave faithfully?

- doctrinal accuracy
- moral reasoning
- source fidelity
- authority distinctions
- hallucination resistance
- pastoral and sacramental boundaries

## Canonical record

During the initial stage, Git is the canonical versioned record for Catholic Context knowledge, Harness specifications, Evals, and governance. Future databases, vector stores, graph stores, APIs, or indexes should be reproducible from or traceable to canonical versioned material.

## Separation from commercial applications

Applications such as My Catholic Guide may provide:

- user accounts
- personalized journeys
- long-term memory
- conversational UX
- prayer and study experiences
- subscriptions
- notifications
- analytics
- model routing and inference
- application-specific presentation

Those commercial capabilities are separate from the open Catholic Context foundation. Applications may present Catholic Context differently for different audiences while preserving source provenance and review metadata.

## Design constraint

Catholic Context should remain useful even if My Catholic Guide ceased to exist. Conversely, My Catholic Guide should be able to innovate commercially without privately redefining what Catholic Context represents as Catholic teaching.

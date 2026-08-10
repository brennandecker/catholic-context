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
Open interfaces / downloadable dataset / public specifications
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

During the initial stage, Git is the canonical versioned record for Catholic Context knowledge, Harness specifications, Evals, governance, public schemas, and website source.

Future databases, search indexes, vector stores, graph stores, APIs, or managed services should be reproducible from or traceable to canonical versioned material where they represent Catholic Context knowledge.

## Open foundation and managed services

Catholic Context intentionally separates the open foundation from optional commercial managed services.

```text
                       CATHOLIC CONTEXT
                         Free + Open
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          Knowledge        Harness         Evals
              │
              └──────────────┬──────────────┘
                             │
                     Open Interfaces
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
          SELF-HOSTED               MANAGED CLOUD
             Free                    Commercial
                                          │
                               ┌──────────┼──────────┐
                               ▼          ▼          ▼
                              API       Search       MCP
                                          │
                                     Applications
                                    ┌─────┴─────┐
                                    ▼           ▼
                           My Catholic Guide   Third Parties
                              Commercial
```

The public repository may contain API contracts, schemas, SDKs, open clients, self-hosting tools, and public MCP interfaces.

Commercial production infrastructure may separately provide API keys, billing, metering, hosted search, inference, authentication, operational guarantees, observability, customer management, and enterprise support.

See `docs/COMMERCIAL_MODEL.md` for the canonical boundary.

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

My Catholic Guide may consume a future Catholic Context Cloud service, but it must not become the private canonical source of Catholic Context theology.

## Community contribution and canonical authority

Public access to the repository does not grant direct canonical editing rights.

The community may:

- inspect
- fork
- reuse
- open issues
- propose corrections
- submit pull requests
- discuss changes

Approved maintainers control canonical merge access, and theological changes may require qualified theological review.

## Design architecture

CatholicContext.org is open-source website code within the Catholic Context foundation.

My Catholic Guide is the canonical visual family reference, while Catholic Context adapts that visual language to a more scholarly and infrastructural product.

For design precedence, see `docs/DESIGN_FIDELITY.md` and `docs/DESIGN_SYSTEM.md`.

## Design constraint

Catholic Context should remain useful even if Catholic Context Cloud or My Catholic Guide ceased to exist.

Conversely, My Catholic Guide and managed commercial services should be able to innovate without gaining the ability to privately redefine what Catholic Context represents as Catholic teaching.

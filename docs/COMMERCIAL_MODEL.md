# Catholic Context — Commercial Model

## Purpose

Catholic Context is intended to remain an open foundation for Catholic knowledge and Catholic-grounded AI while supporting sustainable commercial services and applications around that foundation.

The governing principle is:

> **Catholic teaching is not the product. Convenience, infrastructure, compute, hosting, and applications are the products.**

A person or organization should not need to pay Catholic Context merely to access the project's foundational representation of Catholic teaching.

## Open foundation

The following belong in the public Catholic Context project and are intended to remain openly inspectable and reusable subject to the project's published licenses and third-party rights:

- Knowledge
- Catholic Harness specifications
- Catholic Evals
- Schemas and data contracts
- Governance standards
- Public documentation
- CatholicContext.org website source
- Public API specifications
- Open client libraries and SDKs when created
- Self-hosting documentation and capabilities when created
- Open MCP implementation/specification when created, if the project chooses to ship one

The open repository is the canonical versioned foundation during the initial stage.

## Community contribution does not mean direct editing

The repository may be publicly readable and accept issues, pull requests, discussions, corrections, and proposals without granting public write access to canonical content.

Canonical changes should flow through controlled review and merge processes. Theological content may require theological review according to project governance.

Open source means the public can inspect, fork, reuse, and propose changes. It does not mean any contributor can directly change CatholicContext.org or the canonical Catholic Context dataset.

## Commercial services

Commercial offerings may provide convenience, managed infrastructure, compute, support, and differentiated product experiences around the open foundation.

### Catholic Context Cloud

A future managed service may include:

- hosted Catholic Context API
- managed search
- semantic/vector search
- managed MCP endpoints
- AI/model inference
- API keys and authentication
- usage metering
- rate limiting
- caching
- synchronization with canonical Context releases
- observability
- higher availability
- service-level agreements
- enterprise support
- private or dedicated deployments
- administrative and operational tooling

Customers pay for operating these services, not for ownership of Catholic teaching.

The implementation of billing, customer management, metering, secrets, operational infrastructure, and other proprietary managed-service capabilities does not need to live in the public Catholic Context repository.

## Self-hosted versus managed

Catholic Context should support a durable distinction:

```text
Catholic Context Open Foundation
            │
            ├───────────────┐
            ▼               ▼
       Self-hosted      Managed Cloud
          Free           Commercial
            │               │
     User operates      Catholic Context
     infrastructure      operates service
```

A developer who wants maximum control may use the open foundation and operate their own infrastructure.

A developer who values convenience may pay for Catholic Context Cloud rather than maintaining ingestion, indexing, synchronization, search, uptime, authentication, scaling, monitoring, or inference infrastructure themselves.

## API model

The public repository may contain:

- OpenAPI/API contracts
- request and response schemas
- integration examples
- public SDKs
- self-hosting interfaces

A commercial managed API may separately provide:

- production endpoints
- API keys
- usage quotas
- metering
- billing
- operational guarantees
- managed search/inference

The existence of a paid managed API must not make the underlying open Catholic Context knowledge inaccessible.

## My Catholic Guide

My Catholic Guide is a separate commercial end-user application built on Catholic Context.

It may provide proprietary or commercial capabilities such as:

- personalized formation journeys
- user accounts
- conversational experiences
- long-term user memory
- prayer and study experiences
- premium AI inference
- notifications
- application-specific analytics
- subscriptions
- consumer UX and product features

My Catholic Guide may use Catholic Context Cloud as a managed platform and reference implementation.

My Catholic Guide does not privately redefine what Catholic Context represents as Catholic teaching.

## Architectural boundary

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

## What should remain outside this repository

Unless there is a deliberate future decision to open-source them, the following should normally live in separate private commercial infrastructure:

- billing implementation
- payment processing configuration
- production API credentials and secrets
- customer records
- commercial account management
- proprietary usage metering
- internal operations tooling
- production deployment secrets
- commercial support systems
- private enterprise integrations
- proprietary model-routing infrastructure

Public interfaces to these services may still be documented openly.

## Pricing philosophy

Commercial pricing should correspond to services being delivered, such as:

- compute
- requests
- inference
- storage
- indexing
- search
- hosting
- availability
- support
- operational convenience

The project should avoid business models that create the impression that foundational Catholic teaching is being placed behind a proprietary paywall.

## Theological independence

Commercial success, customer importance, subscription status, API usage, donations, sponsorship, or other financial relationships must not determine:

- whether a proposition is represented as Catholic teaching
- theological classification
- review outcome
- source authority
- correction outcome
- reviewer conclusions

No customer should be able to purchase a theological conclusion or privileged canonical status.

## Funding the commons

Commercial activity may fund the open project.

A defined portion of sustainable revenue may support:

- qualified theological reviewers
- theological governance
- source verification
- corrections
- translations
- open-source engineering
- infrastructure
- documentation
- long-term stewardship

The project should report this relationship transparently as governance matures.

## Long-term commitment

Catholic Context should remain useful even if Catholic Context Cloud or My Catholic Guide ceased to exist.

Conversely, commercial products should be able to innovate rapidly without gaining the ability to privately redefine canonical Catholic Context knowledge.

This separation is a core architectural and governance principle, not merely a packaging decision.

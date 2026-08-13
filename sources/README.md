# Catholic Context sources

The source registry identifies the families of Catholic sources, editions, access hubs, and related infrastructure that knowledge objects may cite or align with.

Catholic Context does not own the underlying Church documents, translations, or third-party compilations. Registering a source records how the project should cite it, not permission to reproduce it.

## Contents

```text
sources/
├── README.md
├── source-registry.yaml
└── evaluations/
    ├── README.md
    ├── new-advent.md
    └── catholicos.md
```

- `source-registry.yaml` — machine-readable registry of source families and related infrastructure
- `evaluations/` — project-use evaluations of candidate sources

## Rules

1. Cite identifiable works, editions, and passages. Do not cite a website hub as if it were the Magisterium.
2. Record source type separately from theological claim classification. See `docs/authority-model.md`.
3. Follow `docs/SOURCE_RIGHTS.md`. A source being online, Catholic, or historically important does not make its text ingestible.
4. New source families should be evaluated before they become ordinary citation or ingestion targets.
5. Related identifier commons and ontologies may be crosswalked. They must not determine Catholic teaching.

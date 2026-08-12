# Research entity sources

## Goal

Attach **approved public source locators** to Catholic Context entity YAML under `context/`.

Catholic Context is upstream of My Catholic Guide. **Never** cite My Catholic Guide, Supabase, or product databases in `sources[]`.

## Approved locator families

Follow [`docs/ENTITY_SOURCE_LOCATORS.md`](../../../docs/ENTITY_SOURCE_LOCATORS.md):

- `bible.usccb.org` (scripture)
- `www.vatican.va` (magisterium, liturgy, councils, Holy See)
- `www.scborromeo.org/ccc/` or Vatican CCC (catechism)
- `www.newadvent.org` public-domain Fathers / Catholic Encyclopedia when appropriate (scholarship / church-father / doctor)

## Workflow

1. Open the YAML file. Read `title`, `entity_type`, `summary`.
2. Web-search for an official or approved-family page for that entity.
3. Verify the URL opens and matches the entity (no invented links).
4. Replace provisional `Approved source locator pending` with one or more real sources.
5. Set `source_fidelity.linkable_sources: true` when at least one `url` is present.
6. Raise `confidence` modestly (e.g. 0.65–0.8 for solid entity-metadata locators); keep `needs_theological_review: true`.
7. Do not paste long copyrighted biographies into `summary` / `notes`.

## Source object shape

```yaml
sources:
  - source_type: liturgy   # or scripture|catechism|magisterium|scholarship|saint|...
    reference: Short human citation
    url: https://...
    note: Optional one-line why this locator supports the entity.
```

## If no locator found

Leave the provisional pending source. Do not invent URLs. Do not cite product DBs.

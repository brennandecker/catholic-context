# Entity source locators

## Principle

Catholic Context is the open knowledge foundation. Product databases (including My Catholic Guide / Supabase) are **downstream consumers**, never citable sources for knowledge objects.

Do **not** put any of the following in `sources[]`:

- My Catholic Guide
- Catholic Guidance (Supabase)
- Internal CMS tables, import pipelines, or AI research notes as if they were Church sources

Import tooling may *read* product databases as a bootstrap seed. Provenance of that bootstrap belongs only in private ops notes if needed — not in public `sources`.

## Approved public locator families

Prefer resolvable URLs from these families when attaching sources to person / event / institution drafts:

| Family | `source_type` | Example hosts |
|---|---|---|
| Sacred Scripture | `scripture` | `bible.usccb.org` |
| Catechism of the Catholic Church | `catechism` | `www.vatican.va` (CCC), `www.scborromeo.org/ccc/` |
| Magisterial / Holy See | `magisterium` | `www.vatican.va` |
| Ecumenical councils | `ecumenical-council` | `www.vatican.va` |
| Canon law | `canon-law` | `www.vatican.va` |
| Liturgy / Martyrology | `liturgy` | `www.vatican.va` liturgical / saints materials |
| Church Fathers / Doctors | `church-father` / `doctor-of-the-church` | `www.newadvent.org` (public-domain Fathers/CE), `www.vatican.va` |
| Saints (reference works) | `saint` / `scholarship` | Vatican saints materials; public-domain Catholic Encyclopedia (`www.newadvent.org/cathen/`) when appropriate |
| Scholarship | `scholarship` | Peer/public reference with clear citation — not product blogs |

If no approved locator can be verified, leave a single provisional source:

```yaml
sources:
  - source_type: other
    reference: Approved source locator pending
    url: null
    note: Draft entity awaiting a resolvable Vatican, Scriptural, catechetical, liturgical, or public-domain scholarly locator.
```

Set `source_fidelity.linkable_sources: false` until at least one `url` resolves.

A small residual set of imported entities (mostly obscure local churches or sparsely documented saints) may still carry this provisional locator after research passes. That is correct: leave them pending rather than inventing URLs or citing product databases.

## Research bar for agents

1. Identify the entity precisely (name, dates, office, place).
2. Find **at least one** approved-family locator that a reader can open.
3. Prefer primary/Holy See locators over tertiary summaries.
4. Never invent URLs. If unsure, keep “pending.”
5. Do not cite My Catholic Guide or Supabase.
6. Keep summaries as entity-metadata; do not paste copyrighted narrative essays into the repo.

# Source and Authority Model

## Status

**Provisional. Requires theological review.**

Catholic Context needs to distinguish different kinds of sources without inventing a simplistic ranking that misrepresents Catholic theology.

The initial model therefore records **source type** separately from any future assessment of theological weight.

## Initial source types

- Sacred Scripture
- Ecumenical councils
- Magisterial documents
- Catechism of the Catholic Church
- Canon law
- Church Fathers
- Doctors of the Church
- Saints
- Liturgical sources
- Theological scholarship
- Other supporting sources

## Important distinction

A source being valuable, ancient, popular, or written by a saint does not automatically mean every proposition within it is itself definitive Catholic teaching.

Similarly, Catholic Context should distinguish among concepts such as:

- dogma
- doctrine
- moral teaching
- discipline
- theological opinion
- devotional practice
- historical claim

The exact taxonomy and any hierarchy-of-authority model should be established with qualified theological review before being treated as normative by downstream systems.

## Access hubs and related infrastructure

A website, identifier commons, ontology, or API may be useful without being a Catholic source type.

- An **access hub** (for example New Advent) may host Scripture, Fathers, the *Summa*, encyclopedia articles, magisterial documents, and news. Cite the underlying work and edition, not the hub.
- **Historical scholarship** (for example the 1907–1913 *Catholic Encyclopedia*) may inform persons, history, and older vocabulary. It does not determine current Church teaching.
- **Related infrastructure** (for example CatholicOS / CDCF identifier registries and ontologies) may supply optional external IDs or comparison models. It is not Magisterium and must not be imported as an authority ranking.

See `sources/source-registry.yaml` and `sources/evaluations/` for current project-use evaluations.

## Design objective

A downstream application or AI system should eventually be able to answer not only **what sources support this context?**, but also **what kind of claim is this, what kind of sources are being cited, and what review has the Catholic Context representation received?**

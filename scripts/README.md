# Scripts

## `import-mcg-entities.mjs`

Pulls **published** entity rows from the Catholic Guidance Supabase project (My Catholic Guide data plane) into draft Catholic Context YAML:

| Supabase table | Context folder | `entity_type` |
|---|---|---|
| `saints` | `context/persons/` | `person` |
| `popes` | `context/persons/` | `person` |
| `key_events` | `context/events/` | `event` |
| `churches` | `context/places/` | `institution` |

**Not imported:** `explore_topics`, `live_topics`, quizzes, readings, and other product/narrative tables. Those stay in My Catholic Guide.

Existing YAML files are left untouched (hand-authored seeds win).

```bash
# optional overrides; defaults to the published Catholic Guidance project
export PUBLIC_SUPABASE_URL=https://….supabase.co
export PUBLIC_SUPABASE_ANON_KEY=…

node scripts/import-mcg-entities.mjs
cd website && npm run build
```

Catholic Context Explore still reads **git YAML at build time**, not Supabase live. Supabase is the extract source; the repo remains canonical for the open knowledge layer.

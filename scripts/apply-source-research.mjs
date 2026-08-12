#!/usr/bin/env node
/**
 * Apply researched sources to entity YAML files.
 *
 * Input: JSON array or JSONL of:
 * {
 *   "path": "context/persons/st-agnes.yaml",
 *   "sources": [
 *     {
 *       "source_type": "scholarship",
 *       "reference": "Catholic Encyclopedia: Agnes of Rome",
 *       "url": "https://www.newadvent.org/cathen/...",
 *       "note": "optional"
 *     }
 *   ],
 *   "confidence": 0.75,          // optional 0-1; or "high"|"medium"|"low"
 *   "research_notes": "optional" // goes into source_fidelity.rationale
 * }
 *
 * Also accepts agent shorthand: title/license/notes → mapped to schema fields.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml, stringify } from "../website/node_modules/yaml/dist/index.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const APPROVED_HOSTS = [
  "www.vatican.va",
  "vatican.va",
  "bible.usccb.org",
  "www.usccb.org",
  "usccb.org",
  "www.newadvent.org",
  "newadvent.org",
  "www.catholicculture.org",
  "catholicculture.org",
  "www.papalencyclicals.net",
  "papalencyclicals.net",
  "www.documentacatholicaomnia.eu",
  "documentacatholicaomnia.eu",
  "www.scborromeo.org",
  "scborromeo.org",
];

const SOURCE_TYPES = new Set([
  "scripture",
  "ecumenical-council",
  "magisterium",
  "catechism",
  "canon-law",
  "church-father",
  "doctor-of-the-church",
  "saint",
  "liturgy",
  "scholarship",
  "other",
]);

function isApproved(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    return APPROVED_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

function inferSourceType(url, hint) {
  if (hint && SOURCE_TYPES.has(hint)) return hint;
  const u = (url || "").toLowerCase();
  if (u.includes("bible.usccb.org")) return "scripture";
  if (u.includes("vatican.va") && (u.includes("/ccc_") || u.includes("catechism"))) return "catechism";
  if (u.includes("scborromeo.org/ccc")) return "catechism";
  if (u.includes("vatican.va") && u.includes("council")) return "ecumenical-council";
  if (u.includes("vatican.va")) return "magisterium";
  if (u.includes("newadvent.org/fathers")) return "church-father";
  if (u.includes("newadvent.org/cathen")) return "scholarship";
  if (u.includes("papalencyclicals.net") || u.includes("catholicculture.org")) return "magisterium";
  return "scholarship";
}

function normalizeConfidence(value) {
  if (typeof value === "number" && value >= 0 && value <= 1) return value;
  if (value === "high") return 0.85;
  if (value === "medium") return 0.7;
  if (value === "low") return 0.55;
  return 0.7;
}

function normalizeSource(s) {
  const url = s.url || null;
  if (!url || !isApproved(url)) return null;
  const reference = s.reference || s.title;
  if (!reference) return null;
  return {
    source_type: inferSourceType(url, s.source_type),
    reference,
    url,
    note: s.note || s.notes || null,
  };
}

function loadItems(inputPath) {
  const raw = readFileSync(inputPath, "utf8").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) return JSON.parse(raw);
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: node scripts/apply-source-research.mjs <research.json|jsonl>");
    process.exit(1);
  }
  const items = loadItems(resolve(input));
  let updated = 0;
  let skipped = 0;

  for (const item of items) {
    const rel = item.path?.replace(/^\.\//, "");
    if (!rel) {
      skipped++;
      continue;
    }
    const abs = join(ROOT, rel);
    if (!existsSync(abs)) {
      console.warn("missing", rel);
      skipped++;
      continue;
    }
    const sources = (item.sources || []).map(normalizeSource).filter(Boolean);
    if (!sources.length) {
      skipped++;
      continue;
    }

    const doc = parseYaml(readFileSync(abs, "utf8"));
    doc.sources = sources;

    const conf = normalizeConfidence(item.confidence);
    doc.source_fidelity = {
      ...(doc.source_fidelity || {}),
      representation: doc.source_fidelity?.representation || "entity-metadata",
      confidence: conf,
      linkable_sources: true,
      needs_theological_review: true,
      assessed_by: "research-entity-sources",
      assessed_at: new Date().toISOString(),
      rationale:
        item.research_notes ||
        "Approved public locator attached via source research. Awaiting theological review.",
      unresolved_issues: ["Draft import pending human review"],
    };

    if (typeof doc.notes === "string" && /product databases|My Catholic Guide|Supabase/i.test(doc.notes)) {
      doc.notes =
        "Draft entity metadata. Requires theological review before promotion. Sources use approved public locators only.";
    }

    writeFileSync(abs, stringify(doc, { lineWidth: 100 }));
    updated++;
    console.log("updated", rel, `(${sources.length} sources)`);
  }

  console.log(JSON.stringify({ updated, skipped, total: items.length }, null, 2));
}

main();

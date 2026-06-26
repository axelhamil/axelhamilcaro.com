import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "axelhamilcaro.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

function resolveKey() {
  for (const file of readdirSync(publicDir)) {
    if (!file.endsWith(".txt")) continue;
    const name = file.slice(0, -4);
    if (!KEY_PATTERN.test(name)) continue;
    const content = readFileSync(join(publicDir, file), "utf8").trim();
    if (content === name) return name;
  }
  throw new Error("Clé IndexNow introuvable dans public/ (fichier {clé}.txt dont le contenu == le nom)");
}

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml inaccessible (HTTP ${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(ORIGIN));
}

async function submit(urls, key) {
  const body = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  return { status: res.status, text: await res.text() };
}

const args = process.argv.slice(2);
const wantAll = args.includes("--all");
const dryRun = args.includes("--dry-run");
const explicit = args.filter((a) => a.startsWith(ORIGIN));

const key = resolveKey();
const urls = [...new Set(wantAll ? await urlsFromSitemap() : explicit)];

if (urls.length === 0) {
  console.error("Aucune URL à soumettre. Usage: node scripts/indexnow.mjs [--all|--dry-run] <url> [url...]");
  process.exit(1);
}

console.log(`IndexNow → ${urls.length} URL(s) avec la clé ${key}`);
for (const u of urls) console.log(`  ${u}`);

if (dryRun) {
  console.log("(--dry-run : aucune soumission envoyée)");
  process.exit(0);
}

const { status, text } = await submit(urls, key);
console.log(`Réponse: HTTP ${status}${text ? ` — ${text}` : ""}`);

if (status !== 200 && status !== 202) process.exit(1);

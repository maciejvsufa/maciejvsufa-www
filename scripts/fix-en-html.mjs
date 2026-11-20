/**
 * Eksport statyczny ma jeden root layout z <html lang="pl"> i jednym JSON-LD.
 * Po `next build` poprawiamy tylko pliki HTML w out/en:
 * - atrybut lang na otwierającym <html> (przełącznik PL zostaje lang="pl"),
 * - jobTitle, wyłącznie ten polski ciąg.
 * Tekst w strumieniu RSC jest poprzedzony długością w bajtach (`:T<hex>,`).
 * Samo podmienienie słów rozjeżdża hydrację, więc długość też się zmienia.
 * Uruchamiane z `npm run build` (tak buduje GitHub Pages).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out/en");
const PL_JOB = "Content Creator, aktor, właściciel firmy LEV";
const EN_JOB = "Content Creator, actor, owner of LEV";
const JOB_DELTA = Buffer.byteLength(EN_JOB) - Buffer.byteLength(PL_JOB);
const FLIGHT = /<script>self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)<\/script>/g;

function decodeFlight(html) {
  const parts = [];
  for (const match of html.matchAll(FLIGHT)) {
    const decoded = JSON.parse(`"${match[1]}"`);
    parts.push({
      innerStart: match.index + match[0].indexOf(match[1]),
      innerEnd: match.index + match[0].indexOf(match[1]) + match[1].length,
      decoded,
    });
  }
  return parts;
}

function charShift(text, index) {
  const count = text.slice(0, index).split(PL_JOB).length - 1;
  return count * (EN_JOB.length - PL_JOB.length);
}

/** Podmienia jobTitle w strumieniu RSC i poprawia długość bajtów przy `:T<hex>,`. */
function rewriteFlight(html) {
  const parts = decodeFlight(html);
  if (!parts.length) return html.replaceAll(PL_JOB, EN_JOB);

  const original = parts.map((part) => part.decoded).join("");
  const fixes = [];
  let searchFrom = 0;
  while (searchFrom < original.length) {
    const idx = original.indexOf(":T", searchFrom);
    if (idx < 0) break;
    const hexMatch = /^:T([0-9a-fA-F]+),/.exec(original.slice(idx));
    if (!hexMatch) {
      searchFrom = idx + 2;
      continue;
    }
    const oldLen = Number.parseInt(hexMatch[1], 16);
    const dataCharStart = idx + hexMatch[0].length;
    const byteStart = Buffer.byteLength(original.slice(0, dataCharStart));
    const bytes = Buffer.from(original, "utf8");
    if (byteStart + oldLen > bytes.length) break;
    const text = bytes.subarray(byteStart, byteStart + oldLen).toString("utf8");
    const count = text.split(PL_JOB).length - 1;
    if (count) {
      const newLen = oldLen + count * JOB_DELTA;
      fixes.push({
        hexCharStart: idx + 2,
        hexCharEnd: idx + 2 + hexMatch[1].length,
        newHex: newLen.toString(16),
      });
    }
    searchFrom = dataCharStart;
  }

  let stream = original.replaceAll(PL_JOB, EN_JOB);
  for (const fix of fixes.sort((a, b) => b.hexCharStart - a.hexCharStart)) {
    const start = fix.hexCharStart + charShift(original, fix.hexCharStart);
    const end = fix.hexCharEnd + charShift(original, fix.hexCharEnd);
    stream = stream.slice(0, start) + fix.newHex + stream.slice(end);
  }

  const newChunks = [];
  let origPos = 0;
  let newPos = 0;
  for (const part of parts) {
    const jobCount = part.decoded.split(PL_JOB).length - 1;
    let hexDelta = 0;
    for (const fix of fixes) {
      if (fix.hexCharStart >= origPos && fix.hexCharStart < origPos + part.decoded.length) {
        hexDelta += fix.newHex.length - (fix.hexCharEnd - fix.hexCharStart);
      }
    }
    const newLen = part.decoded.length + jobCount * (EN_JOB.length - PL_JOB.length) + hexDelta;
    newChunks.push(stream.slice(newPos, newPos + newLen));
    origPos += part.decoded.length;
    newPos += newLen;
  }
  if (newPos !== stream.length) {
    throw new Error("Nie udało się złożyć strumienia RSC po zmianie jobTitle");
  }

  let cursor = 0;
  let out = "";
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    out += html.slice(cursor, part.innerStart);
    out += JSON.stringify(newChunks[i]).slice(1, -1);
    cursor = part.innerEnd;
  }
  out += html.slice(cursor);
  return out.replaceAll(PL_JOB, EN_JOB);
}

function assertFlight(html, rel) {
  const parts = decodeFlight(html);
  const stream = parts.map((part) => part.decoded).join("");
  if (stream.includes(PL_JOB)) throw new Error(`${rel}: polski jobTitle został w strumieniu RSC`);
  const bytes = Buffer.from(stream, "utf8");
  for (const match of stream.matchAll(/:T([0-9a-fA-F]+),/g)) {
    const len = Number.parseInt(match[1], 16);
    const byteStart = Buffer.byteLength(stream.slice(0, match.index + match[0].length));
    if (byteStart + len > bytes.length) throw new Error(`${rel}: chunk T wystaje poza strumień`);
    const next = bytes.subarray(byteStart + len, byteStart + len + 8).toString("utf8");
    if (!/^[0-9a-f]+:/.test(next)) {
      throw new Error(`${rel}: po chunku T nie zaczyna się kolejny wiersz (${JSON.stringify(next)})`);
    }
  }
}

function rewrite(html) {
  const withLang = html.replace(/<html\b[^>]*>/i, (tag) => tag.replace(/(\s)lang="pl"/, '$1lang="en"'));
  return rewriteFlight(withLang);
}

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const files = await htmlFiles(root);
if (files.length === 0) throw new Error(`Brak plików HTML w ${root}`);

for (const file of files) {
  const html = await readFile(file, "utf8");
  const next = rewrite(html);
  const rel = path.relative(root, file);
  if (!/<html\b[^>]*\slang="en"/.test(next)) throw new Error(`${rel}: brak <html lang="en">`);
  if (/<html\b[^>]*\slang="pl"/.test(next)) throw new Error(`${rel}: <html> nadal ma lang="pl"`);
  if (next.includes(PL_JOB)) throw new Error(`${rel}: został polski jobTitle`);
  if (!next.includes(EN_JOB)) throw new Error(`${rel}: brak angielskiego jobTitle`);
  assertFlight(next, rel);
  if (next !== html) await writeFile(file, next);
}

console.log(`fix-en-html: ${files.length} plików w out/en`);

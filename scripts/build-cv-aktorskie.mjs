#!/usr/bin/env node
/**
 * CV aktorskie (castingowe): HTML + PDF A4.
 * Uruchomienie: node scripts/build-cv-aktorskie.mjs
 * Wynik: public/cv/Maciej_Sufa_CV_aktorskie.pdf (+ .html)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "cv");
const PHOTO = process.env.CV_PHOTO ||
  "C:/Users/andro/Pictures/Canon Shooting/Warszawa Biznesowo/wybrane przerobione/Maciej_Sufa_portret3.JPG";

// Kadr: głowa i ramiona z portretu 1080x1620
const photo = await sharp(PHOTO)
  .extract({ left: 470, top: 170, width: 610, height: 762 })
  .resize({ width: 480 })
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();
const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Wiek sceniczny: od wieku w roku pierwszego występu (Pamiętnik, Teatr Kamienica, 2009; 2009 − 1988 = 21) do wieku w 2026 (2026 − 1988 = 38).
const params = [
  ["Wiek sceniczny", "21–38 lat"],
  ["Wzrost", "180 cm"],
  ["Oczy", "piwne"],
  ["Włosy", "brązowe"],
  ["Ubranie", "góra L/XL · spodnie L"],
  ["But", "43"],
  ["Mieszkam", "Łódź · dojazd do Warszawy"],
  ["Języki", "polski (ojczysty), angielski B2, rosyjski A1"],
];

const stage = [
  ["2025", "Ariadna na Naxos", "R. Strauss · Teatr Wielki – Opera Narodowa", "reż. Mariusz Treliński", "obsada aktorska"],
  ["2023", "Moc przeznaczenia", "G. Verdi · Teatr Wielki – Opera Narodowa, koprodukcja z Metropolitan Opera", "reż. Mariusz Treliński", "obsada aktorska"],
  ["2013–2015", "Kabaret „Filip z Konopi”", "Filip Borowski · trasa po Polsce", "", "aktor, wokal"],
  ["2011", "Stand-up (program autorski)", "scena „Sauny Marszałka”, Warszawa", "", "autor, wykonawca"],
  ["2009–2011", "Pamiętnik z powstania warszawskiego", "Teatr Kamienica, Warszawa", "reż. Jerzy Bielunas", "Powstaniec"],
  ["2010", "Szekspir w fortach", "", "reż. Andrzej Domalik", "Petruchio"],
];

// rok, tytuł, rodzaj/stacja, rola, wyróżnienie
const screen = [
  ["2016–2017", "Gliniarze", "serial, Polsat", "detektyw Robert Barcz", "rola główna"],
  ["2018", "Kobiety mafii", "film fabularny, reż. Patryk Vega", "barman", ""],
  ["2011", "Dotknięci", "film fabularny, reż. Magdalena Łazarkiewicz", "Czeczen", ""],
  ["2021", "Remiza zawsze w akcji", "serial", "Eryk Jabłoński", "stała obsada"],
  ["2021", "Jur. Historia prawdziwa", "film dokumentalny, reż. Grzegorz Juchiewicz", "prezenter", ""],
  ["2019–2020", "Barwy szczęścia", "serial, TVP2 · odc. 2173, 2174, 2209", "barman", ""],
  ["2018–2019", "Ojciec Mateusz", "serial, TVP1 · odc. 243, 280", "mąż Gosi", ""],
  ["2016", "Ukryta prawda", "serial, TVN · odc. 630 „Zły mąż”", "Patryk Szymanek", ""],
  ["2015", "Wesołowska i mediatorzy", "serial, TVN · odc. 21", "Wiktor Golis", ""],
  ["2015", "Pielęgniarki", "serial, Polsat · odc. 178", "Jarek Otręba", ""],
  ["2015", "Słoiki", "serial · odc. 29", "trener siatkówki Jarosław Gruszka", ""],
  ["2015", "Prokurator", "serial, TVP1 · odc. 9", "policjant", ""],
  ["2015", "Małolaty", "serial · odc. 1", "Wojtek", ""],
  ["2014", "Dobranoc", "ATM", "sutener", ""],
  ["2013", "Kocham.enter", "serial · odc. 20", "barman", ""],
  ["2012", "Ukryta prawda", "serial, TVN · „Trener”, „Z miłości”", "Krzysztof Kowalczyk", ""],
  ["2010–2012", "Malanowski i partnerzy", "serial, TVN · „Na końcu umrzesz”, „Zakochana do szaleństwa”", "Cezary Leśniewski, Norbert Pawluszkiewicz", ""],
  ["2011", "Anna Maria Wesołowska", "serial, TVN · „Lot w przepaść”", "Rafał Przybyłowicz", ""],
  ["2011", "Usta usta", "serial, TVN", "kelner", ""],
  ["2011", "Prosto w serce", "serial, TVN · odc. 51", "sprzedawca DVD", ""],
];

const education = [
  ["2008–2010", "Warszawska Szkoła Filmowa — aktorstwo"],
  ["2010", "Warsztaty z Luisem Gallim (Actors Studio, Nowy Jork)"],
  ["", "Roczne szkolenie kaskaderskie — Zbigniew Modej"],
  ["", "Szkolenie z obsługi broni krótkiej i kajdanek (szkolenie policyjne)"],
];

const skills = [
  "prawo jazdy kat. B", "motocykl", "śpiew, pisanie piosenek", "szermierka", "jazda konna",
  "taniec", "akrobatyka", "kaskaderka", "broń krótka", "praca z kamerą, montaż (DaVinci Resolve)",
];

const html = `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<title>Maciej Sufa — CV aktorskie</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, Arial, sans-serif; color: #1d1d1f; font-size: 9.6pt; line-height: 1.38; }
.page { width: 210mm; height: 297mm; overflow: hidden; padding: 13mm 14mm 12mm; position: relative; }
.top { display: grid; grid-template-columns: 46mm 1fr; gap: 8mm; align-items: start; }
.top img { width: 46mm; height: 57.5mm; object-fit: cover; border-radius: 2px; display: block; }
h1 { font-family: "Playfair Display", Georgia, serif; font-size: 30pt; margin: 0; letter-spacing: .3px; line-height: 1.05; }
.role { margin-top: 1.5mm; text-transform: uppercase; letter-spacing: 2.5px; font-size: 8.5pt; color: #8a6a3f; font-weight: 600; }
.params { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2mm 6mm; margin-top: 4.5mm; }
.params div { display: flex; gap: 2mm; border-bottom: .3pt solid #e3ddd3; padding-bottom: .8mm; }
.params b { font-weight: 600; min-width: 24mm; color: #6b6259; font-size: 8.3pt; text-transform: uppercase; letter-spacing: .4px; }
.contact { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 5mm; }
.box { border: .6pt solid #d8cfc2; padding: 2.6mm 3.2mm; border-radius: 2px; }
.box.agency { background: #f6f1ea; border-color: #c9b79c; }
.box h4 { margin: 0 0 1mm; font-size: 7.6pt; letter-spacing: 1.6px; text-transform: uppercase; color: #8a6a3f; }
.box p { margin: 0; }
h2 { font-size: 8.6pt; letter-spacing: 2.4px; text-transform: uppercase; margin: 6.5mm 0 1.8mm; padding-bottom: 1.2mm; border-bottom: 1pt solid #1d1d1f; }
table { width: 100%; border-collapse: collapse; }
td { padding: 1.25mm 0; border-bottom: .3pt solid #ebe6de; vertical-align: top; }
td.y { width: 19mm; color: #6b6259; font-variant-numeric: tabular-nums; font-size: 8.6pt; }
td.t b { font-weight: 600; }
td.t span { color: #6b6259; }
td.r { width: 50mm; text-align: right; }
.tag { display: inline-block; font-size: 7pt; text-transform: uppercase; letter-spacing: .8px; background: #1d1d1f; color: #fff; padding: .2mm 1.4mm; border-radius: 1px; margin-left: 1.5mm; vertical-align: 1px; }
.skills { display: flex; flex-wrap: wrap; gap: 1.3mm 1.6mm; }
.skills span { border: .4pt solid #d8cfc2; padding: .5mm 2mm; border-radius: 10px; font-size: 8.4pt; }
.links { margin-top: 2mm; font-size: 8.6pt; color: #6b6259; }
.links a { color: #1d1d1f; text-decoration: none; }
.foot { position: absolute; left: 14mm; right: 14mm; bottom: 8mm; font-size: 6.8pt; color: #8b847b; border-top: .3pt solid #e3ddd3; padding-top: 1.5mm; display: flex; justify-content: space-between; gap: 6mm; }
.page + .page { page-break-before: always; }
</style></head><body>
<section class="page">
  <div class="top">
    <img src="${photoUrl}" alt="Maciej Sufa, portret">
    <div>
      <h1>Maciej Sufa</h1>
      <div class="role">Aktor · film · telewizja · teatr</div>
      <div class="params">${params.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join("")}</div>
      <div class="contact">
        <div class="box agency"><h4>Agencja</h4><p><b>START STUDIO</b> — Agencja Aktorska<br>Katarzyna Kozłowska<br>tel.&nbsp;600&nbsp;996&nbsp;939<br>casting@startstudio.pl</p></div>
        <div class="box"><h4>Kontakt</h4><p>tel.&nbsp;+48&nbsp;504&nbsp;003&nbsp;019<br>sufamaciej@gmail.com<br>www.maciejvsufa.pl</p></div>
      </div>
    </div>
  </div>

  <h2>Teatr i opera</h2>
  <table>${stage.map(([y, t, d, dir, r]) => `<tr><td class="y">${esc(y)}</td><td class="t"><b>${esc(t)}</b>${d ? ` <span>— ${esc(d)}</span>` : ""}${dir ? `<br><span>${esc(dir)}</span>` : ""}</td><td class="r">${esc(r)}</td></tr>`).join("")}</table>

  <h2>Film i telewizja</h2>
  <table>${screen.slice(0, 6).map(row).join("")}</table>
  <div class="foot"><span>Maciej Sufa · CV aktorskie · listopad 2026</span><span>Agencja: START STUDIO · tel.&nbsp;600&nbsp;996&nbsp;939</span></div>
</section>
<section class="page">
  <h2 style="margin-top:0">Film i telewizja — ciąg dalszy</h2>
  <table>${screen.slice(6).map(row).join("")}</table>

  <h2>Wykształcenie i szkolenia</h2>
  <table>${education.map(([y, t]) => `<tr><td class="y">${esc(y)}</td><td class="t">${esc(t)}</td></tr>`).join("")}</table>

  <h2>Umiejętności</h2>
  <div class="skills">${skills.map((s) => `<span>${esc(s)}</span>`).join("")}</div>

  <h2>Profile</h2>
  <div class="links">Pełna filmografia: <a href="https://maciejvsufa.pl/aktorstwo/">maciejvsufa.pl/aktorstwo</a> · <a href="https://www.imdb.com/name/nm7911398/">IMDb</a> · <a href="https://filmpolski.pl/fp/index.php?osoba=11112647">FilmPolski</a> · <a href="https://www.filmweb.pl/person/Maciej+Sufa-2368674">Filmweb</a></div>

  <div class="foot"><span>Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w CV przez Producenta i Agencję START STUDIO na potrzeby procesu castingowego, zgodnie z RODO.</span><span>Maciej Sufa · CV aktorskie</span></div>
</section>
</body></html>`;

function row([y, t, d, r, tag]) {
  return `<tr><td class="y">${esc(y)}</td><td class="t"><b>${esc(t)}</b>${tag ? `<span class="tag">${esc(tag)}</span>` : ""}<br><span>${esc(d)}</span></td><td class="r">${esc(r)}</td></tr>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const htmlPath = path.join(OUT_DIR, "Maciej_Sufa_CV_aktorskie.html");
fs.writeFileSync(htmlPath, html);
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("file:///" + htmlPath.replace(/\\/g, "/"), { waitUntil: "networkidle0" });
const pdfPath = path.join(OUT_DIR, "Maciej_Sufa_CV_aktorskie.pdf");
await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("OK", pdfPath, Math.round(fs.statSync(pdfPath).size / 1024), "KB");

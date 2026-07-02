#!/usr/bin/env node
/**
 * Generuje CV: HTML podgląd + PDF + DOCX (PL + EN).
 * Uruchomienie: npm run build:cv
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  ImageRun,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CV_DIR = path.join(ROOT, "cv");
const OUT_DIR = path.join(ROOT, "public", "cv");

const content = JSON.parse(fs.readFileSync(path.join(CV_DIR, "content.json"), "utf8"));
const css = fs.readFileSync(path.join(CV_DIR, "cv.css"), "utf8");
const photoPath = path.join(OUT_DIR, "maciej-garnitur.png");
const photoBase64 = fs.readFileSync(photoPath).toString("base64");
const photoDataUrl = `data:image/png;base64,${photoBase64}`;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSkills(skills) {
  return skills
    .map(
      (g) => `
    <div class="skill-group">
      <h3>${esc(g.group)}</h3>
      <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`
    )
    .join("");
}

function renderJobs(jobs) {
  return jobs
    .map(
      (j) => `
    <div class="job">
      <div class="job-header">
        <p class="job-role">${esc(j.role)} · ${esc(j.company)}</p>
        <span class="job-period">${esc(j.period)}</span>
      </div>
      <p class="job-context">${esc(j.context)}</p>
      <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>`
    )
    .join("");
}

function renderProjects(projects) {
  return projects
    .map((p) => {
      const name = p.url
        ? `<a class="project-link" href="${esc(p.url)}">${esc(p.name)}</a>`
        : `<span class="project-name">${esc(p.name)}</span>`;
      return `
    <div class="project">
      ${name}<span class="project-desc"> — ${esc(p.desc)}</span>
    </div>`;
    })
    .join("");
}

function buildHtml(locale) {
  const d = content[locale];
  const { header, labels, education, certificate } = d;
  const footer = `${header.name} · ${header.website} · Łódź`;

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <title>${esc(header.name)} — CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
  <style>${css}</style>
</head>
<body>
  <div class="cv">
    <aside class="sidebar">
      <div class="photo-wrap">
        <img src="${photoDataUrl}" alt="${esc(header.name)}" />
      </div>
      <h1>${esc(header.name)}</h1>
      <p class="title">${esc(header.title)}</p>

      <div class="sidebar-body">
      <div class="contact-block">
        <span class="label">Tel.</span>
        <a href="tel:${esc(header.phone.replace(/\s/g, ""))}">${esc(header.phone)}</a>
        <span class="label">E-mail</span>
        <a href="mailto:${esc(header.email)}">${esc(header.email)}</a>
        <span class="label">WWW</span>
        <a href="${esc(header.websiteUrl)}">${esc(header.website)}</a>
        ${header.github ? `<span class="label">GitHub</span>
        <a href="${esc(header.githubUrl)}">${esc(header.github)}</a>` : ""}
        <span class="label">${esc(labels.born)}</span>
        ${esc(header.born)}
        <span class="label">${esc(labels.address || "Adres")}</span>
        ${esc(header.address)}
        <p class="remote-note">${esc(labels.remote)}</p>
        ${labels.cooperation ? `<p class="cooperation-note">${esc(labels.cooperation)}</p>` : ""}
      </div>

      <div class="section section--skills">
        <h2 class="section-title">${esc(labels.skills)}</h2>
        ${renderSkills(d.skills)}
      </div>
      </div>

      <div class="col-footer">${esc(footer)}</div>
    </aside>

    <main class="main">
      <div class="main-body">
      <div class="section">
        <h2 class="section-title">${esc(labels.profile)}</h2>
        <p class="summary">${esc(d.summary)}</p>
      </div>

      <div class="section">
        <h2 class="section-title">${esc(labels.experience)}</h2>
        ${renderJobs(d.experience)}
      </div>

      <div class="section">
        <h2 class="section-title">${esc(labels.projects)}</h2>
        ${renderProjects(d.projects)}
      </div>

      <div class="section">
        <h2 class="section-title">${esc(labels.education)} · ${esc(labels.certificate)}</h2>
        <p class="edu-line">${esc(education.line)}</p>
        <p class="cert-name main-cert">${esc(certificate.name)} (${esc(certificate.year)})</p>
        <p class="cert-issuer main-cert">${esc(certificate.issuer)} — ${esc(certificate.desc)}</p>
      </div>
      </div>

      <div class="col-footer">${esc(footer)}</div>
    </main>
  </div>
</body>
</html>`;
}

async function htmlToPdf(html, outPath) {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close();
  }
}

function bulletParagraph(text, size = 20) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: `• ${text}`, size })],
  });
}

function heading(text, level = HeadingLevel.HEADING_2) {
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, bold: true, size: 22, color: "5C5648" })],
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 20, ...opts })],
  });
}

async function buildDocx(locale, outPath) {
  const d = content[locale];
  const { header, labels, education, certificate } = d;
  const photoBuffer = fs.readFileSync(photoPath);

  const sidebarChildren = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          data: photoBuffer,
          transformation: { width: 130, height: 165 },
          type: "png",
        }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: header.name, bold: true, size: 32, color: "F3F1EC" })],
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: header.title, size: 18, color: "C9C0AD" })],
      spacing: { after: 200 },
    }),
    bodyText(`${header.phone}`, { color: "E8E2D4" }),
    bodyText(header.email, { color: "E8E2D4" }),
    bodyText(header.website, { color: "E8E2D4" }),
    ...(header.github ? [bodyText(header.github, { color: "E8E2D4" })] : []),
    bodyText(`${labels.born} ${header.born}`, { color: "B8B5AD", size: 18 }),
    bodyText(header.address, { color: "B8B5AD", size: 18 }),
    bodyText(labels.remote, { color: "B8B5AD", size: 18, italics: true }),
    ...(labels.cooperation ? [bodyText(labels.cooperation, { color: "C9C0AD", size: 17, italics: true })] : []),
    heading(labels.skills, HeadingLevel.HEADING_3),
    ...d.skills.flatMap((g) => [
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [new TextRun({ text: g.group, bold: true, size: 18, color: "E8E2D4" })],
      }),
      ...g.items.map((item) =>
        new Paragraph({
          spacing: { after: 20 },
          children: [new TextRun({ text: `· ${item}`, size: 17, color: "B8B5AD" })],
        })
      ),
    ]),
  ];

  const mainChildren = [
    heading(labels.profile),
    bodyText(d.summary),
    heading(labels.experience),
    ...d.experience.flatMap((job) => [
      new Paragraph({
        spacing: { before: 120, after: 40 },
        children: [
          new TextRun({ text: `${job.role} · ${job.company}`, bold: true, size: 22 }),
          new TextRun({ text: `\t${job.period}`, size: 18, color: "6B6558" }),
        ],
      }),
      bodyText(job.context, { italics: true, color: "6B6558", size: 18 }),
      ...job.bullets.map((b) => bulletParagraph(b)),
    ]),
    heading(labels.projects),
    ...d.projects.flatMap((p) => [
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: p.name, bold: true, size: 20 }),
          new TextRun({ text: ` — ${p.desc}`, size: 19 }),
        ],
      }),
    ]),
    heading(`${labels.education} · ${labels.certificate}`),
    bodyText(education.line, { size: 19 }),
    new Paragraph({
      spacing: { before: 80, after: 40 },
      children: [new TextRun({ text: `${certificate.name} (${certificate.year})`, bold: true, size: 20 })],
    }),
    bodyText(`${certificate.issuer} — ${certificate.desc}`, { color: "6B6558", size: 18 }),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        children: [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 28, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.TOP,
                    shading: { fill: "0F1A2E" },
                    children: sidebarChildren,
                  }),
                  new TableCell({
                    width: { size: 72, type: WidthType.PERCENTAGE },
                    verticalAlign: VerticalAlign.TOP,
                    shading: { fill: "FAF9F7" },
                    children: mainChildren,
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const outputs = [
    { locale: "pl", pdf: "Maciej_Sufa_CV.pdf", docx: "Maciej_Sufa_CV.docx", html: "Maciej_Sufa_CV.html" },
    { locale: "en", pdf: "Maciej_Sufa_CV_EN.pdf", docx: "Maciej_Sufa_CV_EN.docx", html: "Maciej_Sufa_CV_EN.html" },
  ];

  for (const o of outputs) {
    const html = buildHtml(o.locale);
    const htmlPath = path.join(OUT_DIR, o.html);
    const pdfPath = path.join(OUT_DIR, o.pdf);
    const docxPath = path.join(OUT_DIR, o.docx);

    fs.writeFileSync(htmlPath, html, "utf8");
    console.log(`✓ HTML  ${o.html}`);

    await htmlToPdf(html, pdfPath);
    console.log(`✓ PDF   ${o.pdf}`);

    await buildDocx(o.locale, docxPath);
    console.log(`✓ DOCX  ${o.docx}`);
  }

  console.log(`\nGotowe — pliki w ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

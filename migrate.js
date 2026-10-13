#!/usr/bin/env node
/*
 * migrate.js — one-way extraction of the CURRENT hand-written articles/*.html
 * into the templated source format under src/articles/<slug>.html.
 *
 * Source format produced per article:
 *   <script type="application/json" id="page-meta"> ...meta... </script>
 *   <article class="post"> ...body... </article>   (verbatim, just the <main> inner)
 *
 * Run:  node migrate.js            (all articles except index.html)
 *       node migrate.js <slug>     (single article, no .html extension)
 *
 * After migration, run build.js to regenerate articles/*.html.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'articles');
const SRC = path.join(ROOT, 'src', 'articles');

fs.mkdirSync(SRC, { recursive: true });

const arg = process.argv[2];
const files = arg
  ? [arg.replace(/\.html$/, '') + '.html']
  : fs.readdirSync(OUT).filter((f) => f.endsWith('.html') && f !== 'index.html');

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : '';
};

for (const f of files) {
  const html = fs.readFileSync(path.join(OUT, f), 'utf8');

  const title = pick(html, /<title>([\s\S]*?)<\/title>/);
  const description = pick(html, /<meta name="description" content="([\s\S]*?)"/);
  const canonical = pick(html, /<link rel="canonical" href="([\s\S]*?)"/);
  const ogTitle = pick(html, /<meta property="og:title" content="([\s\S]*?)"/);
  const ogDescription = pick(html, /<meta property="og:description" content="([\s\S]*?)"/);
  const ogImage = pick(html, /<meta property="og:image" content="[^"]*\/assets\/og\/([^"]+)"/);
  const ogImageAlt = pick(html, /<meta property="og:image:alt" content="([\s\S]*?)"/);

  // All JSON-LD blocks. Article drives the core fields; any other @type (e.g.
  // FAQPage) is preserved verbatim as extraLd so we don't lose structured data.
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1].trim()
  );

  let datePublished = '';
  let dateModified = '';
  let ldDescription = '';
  let ldHeadline = '';
  let authorName = 'Haitao Pan';
  let authorTitle = 'Game Developer & Studio Owner';
  const extraLds = [];

  for (const block of ldBlocks) {
    try {
      const o = JSON.parse(block);
      if (o['@type'] === 'Article') {
        datePublished = o.datePublished || '';
        dateModified = o.dateModified || '';
        ldDescription = o.description || '';
        ldHeadline = o.headline || '';
        if (o.author) {
          authorName = o.author.name || authorName;
          authorTitle = o.author.jobTitle || authorTitle;
        }
      } else {
        // Store raw JSON only (no <script> wrapper) so the meta block itself
        // never contains a </script> that would break parsing on read.
        extraLds.push(block);
      }
    } catch (_) {
      /* ignore unparseable */
    }
  }

  // Body = inner of <main class="wrap">, keep indentation, drop surrounding whitespace.
  const main = pick(html, /<main class="wrap">([\s\S]*?)<\/main>/);
  const body = main.replace(/^\n/, '').replace(/\s+$/, '');

  const meta = {
    title,
    description,
    canonical,
    ogTitle: ogTitle || title,
    ogDescription: ogDescription || description,
    ogImage,
    ogImageAlt,
    authorName,
    authorTitle,
    datePublished,
    dateModified,
    ldDescription: ldDescription || description,
    ldHeadline: ldHeadline || title,
    extraLd: extraLds,
  };

  const out =
    '<script type="application/json" id="page-meta">\n' +
    JSON.stringify(meta, null, 2) +
    '\n</script>\n' +
    body +
    '\n';

  fs.writeFileSync(path.join(SRC, f), out);
  console.log('migrated', f);
}

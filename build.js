#!/usr/bin/env node
/*
 * build.js — renders the templated article sources into articles/*.html AND
 * regenerates sitemap.xml from the same sources.
 *
 * Each source file (src/articles/<slug>.html) contains a <script id="page-meta">
 * JSON block followed by the article <body> markup. We substitute placeholders in
 * src/template-article.html and write the result to articles/<slug>.html.
 *
 * CSS_VERSION is the single source of truth for the cache-busting query string —
 * bump it here once whenever style.css changes.
 *
 * The sitemap is derived from every source's page-meta (slug + dateModified +
 * optional changefreq/priority) plus a fixed home entry, so adding/removing an
 * article or bumping dateModified keeps sitemap.xml in sync automatically.
 *
 * Run:  node build.js            (all sources + sitemap)
 *       node build.js <slug>     (single article + full sitemap)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src', 'articles');
const OUT = path.join(ROOT, 'articles');
const TEMPLATE = path.join(ROOT, 'src', 'template-article.html');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const SITE_BASE = 'https://phtbyte.com';

const CSS_VERSION = '20261010b';

if (!fs.existsSync(TEMPLATE)) {
  console.error('template not found:', TEMPLATE);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const tpl = fs.readFileSync(TEMPLATE, 'utf8');
const arg = process.argv[2];
const files = arg
  ? [arg.replace(/\.html$/, '') + '.html']
  : fs.readdirSync(SRC).filter((f) => f.endsWith('.html'));

let count = 0;
for (const f of files) {
  const srcPath = path.join(SRC, f);
  if (!fs.existsSync(srcPath)) {
    console.warn('no source for', f);
    continue;
  }
  const raw = fs.readFileSync(srcPath, 'utf8');

  const m = raw.match(/<script type="application\/json" id="page-meta">([\s\S]*?)<\/script>/);
  if (!m) {
    console.warn('skip (no #page-meta):', f);
    continue;
  }
  const meta = JSON.parse(m[1].trim());

  // Body = everything after the meta script block. Keep the author's indentation
  // (only drop the leading newline the meta block ends with + trailing whitespace),
  // so the rendered output stays byte-identical to the original.
  const after = raw.slice(raw.indexOf('</script>') + '</script>'.length);
  const body = after.replace(/^\n/, '').replace(/\s+$/, '');

  const map = {
    '{{TITLE}}': meta.title || '',
    '{{DESCRIPTION}}': meta.description || '',
    '{{LD_DESCRIPTION}}': meta.ldDescription || meta.description || '',
    '{{LD_HEADLINE}}': meta.ldHeadline || meta.title || '',
    '{{CANONICAL}}': meta.canonical || '',
    '{{OG_TITLE}}': meta.ogTitle || meta.title || '',
    '{{OG_DESCRIPTION}}': meta.ogDescription || meta.description || '',
    '{{OG_IMAGE}}': meta.ogImage || '',
    '{{OG_IMAGE_ALT}}': meta.ogImageAlt || '',
    '{{AUTHOR_NAME}}': meta.authorName || 'Haitao Pan',
    '{{AUTHOR_TITLE}}': meta.authorTitle || 'Game Developer & Studio Owner',
    '{{DATE_PUBLISHED}}': meta.datePublished || '',
    '{{DATE_MODIFIED}}': meta.dateModified || '',
    '{{CSS_VERSION}}': CSS_VERSION,
    '{{ARTICLE_BODY}}': body,
  };

  let out = tpl;
  for (const [k, v] of Object.entries(map)) {
    out = out.split(k).join(v);
  }
  // Extra structured data (e.g. FAQPage) is stored as raw JSON in meta.extraLd;
  // wrap it in <script> tags here. Drop the placeholder line if there's none.
  const extraArr = Array.isArray(meta.extraLd)
    ? meta.extraLd
    : meta.extraLd
      ? [meta.extraLd]
      : [];
  const extraHtml = extraArr
    .map((b) => '  <script type="application/ld+json">\n  ' + b + '\n  </script>')
    .join('\n');
  if (extraHtml) {
    out = out.replace('{{EXTRA_LD}}', extraHtml);
  } else {
    out = out.replace(/\{\{EXTRA_LD\}\}\n/, '');
  }

  const slug = f.replace(/\.html$/, '');
  fs.writeFileSync(path.join(OUT, slug + '.html'), out);
  count++;
  console.log('built', slug);
}
console.log('done —', count, 'article(s)');

/*
 * Regenerate sitemap.xml from every article source + a fixed home entry.
 * Always runs (whether building one article or all) so the sitemap never drifts.
 */
function generateSitemap() {
  const sources = fs.readdirSync(SRC).filter((f) => f.endsWith('.html'));
  const entries = [];
  let siteLastmod = '';

  for (const f of sources) {
    const raw = fs.readFileSync(path.join(SRC, f), 'utf8');
    const m = raw.match(/<script type="application\/json" id="page-meta">([\s\S]*?)<\/script>/);
    if (!m) continue;
    let meta;
    try {
      meta = JSON.parse(m[1].trim());
    } catch (_) {
      continue;
    }
    const slug = f.replace(/\.html$/, '');
    const lastmod = meta.dateModified || '';
    if (lastmod && lastmod > siteLastmod) siteLastmod = lastmod;
    entries.push({
      slug,
      lastmod,
      changefreq: meta.changefreq || 'monthly',
      priority: meta.priority || '0.8',
    });
  }

  // Deterministic order: home first, then articles by slug.
  entries.sort((a, b) => a.slug.localeCompare(b.slug));
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const urls = [];
  urls.push(
    '  <url>\n' +
      '    <loc>' + esc(SITE_BASE + '/') + '</loc>\n' +
      '    <lastmod>' + siteLastmod + '</lastmod>\n' +
      '    <changefreq>weekly</changefreq>\n' +
      '    <priority>1.0</priority>\n' +
      '  </url>'
  );
  for (const e of entries) {
    const lm = e.lastmod || siteLastmod;
    urls.push(
      '  <url>\n' +
        '    <loc>' + esc(SITE_BASE + '/articles/' + e.slug + '.html') + '</loc>\n' +
        '    <lastmod>' + lm + '</lastmod>\n' +
        '    <changefreq>' + e.changefreq + '</changefreq>\n' +
        '    <priority>' + e.priority + '</priority>\n' +
        '  </url>'
    );
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n';

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log('sitemap.xml —', entries.length + 1, 'url(s)');
}

generateSitemap();

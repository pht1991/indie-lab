// 生成 4 张 OG 社交图（1200x630 PNG），统一深色技术风品牌模板。
// 依赖：@resvg/resvg-js（已装在 managed node workspace）
const { Resvg } = require('C:/Users/shendushuke/.workbuddy/binaries/node/workspace/node_modules/@resvg/resvg-js');
const { writeFileSync, mkdirSync } = require('node:fs');

const OUT = 'D:/Projects/demos/front_end/indie-lab/assets/og';
const W = 1200, H = 630;

// 品牌配色
const BG_TOP = '#0e1117', BG_BOT = '#161b24';
const INK = '#f4f7fb', SUB = '#9aa6b8', ACCENT = '#38bdf8', ACCENT2 = '#fbbf24';

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function buildSVG({ chip, titleLines, subtitle }) {
  const titleSpans = titleLines.map((line, i) =>
    `<text x="80" y="${252 + i * 76}" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700" fill="${INK}">${esc(line)}</text>`
  ).join('\n');
  let grid = '';
  for (let x = 0; x <= W; x += 60) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#ffffff" stroke-opacity="0.03"/>`;
  for (let y = 0; y <= H; y += 60) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#ffffff" stroke-opacity="0.03"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BG_TOP}"/><stop offset="1" stop-color="${BG_BOT}"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${ACCENT}"/><stop offset="1" stop-color="${ACCENT2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.5">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.22"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g>${grid}</g>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="92" cy="96" r="9" fill="${ACCENT}"/>
  <text x="116" y="103" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="${ACCENT}">${esc(chip)}</text>
  ${titleSpans}
  <text x="80" y="${252 + titleLines.length * 76 + 26}" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="${SUB}">${esc(subtitle)}</text>
  <rect x="80" y="560" width="220" height="6" rx="3" fill="url(#bar)"/>
  <text x="80" y="600" font-family="Segoe UI, Arial, sans-serif" font-size="20" letter-spacing="2" fill="#5b6573">phtbyte.com</text>
  <g opacity="0.5" stroke="${ACCENT}" stroke-width="2" fill="none">
    <polygon points="980,70 1120,70 1120,210 980,210" stroke-opacity="0.5"/>
    <line x1="980" y1="140" x2="1120" y2="140" stroke-opacity="0.3"/>
    <line x1="1050" y1="70" x2="1050" y2="210" stroke-opacity="0.3"/>
  </g>
</svg>`;
}

const jobs = [
  { file: 'og-home.png', data: { chip: 'INDIE GAME LAB', titleLines: ['Indie Game Lab'], subtitle: 'Game Dev Case Studies & Design Breakdowns' } },
  { file: 'og-kubi.png', data: { chip: 'INDIE GAME LAB', titleLines: ['How I Built “Super', 'Miserable Adventurer”'], subtitle: 'A Cocos Creator WeChat Mini-Game Case Study' } },
  { file: 'og-engine.png', data: { chip: 'INDIE GAME LAB', titleLines: ['Cocos Creator vs Unity', 'vs Godot'], subtitle: 'Which Engine for a Solo Indie in 2026' } },
  { file: 'og-i18n.png', data: { chip: 'INDIE GAME LAB', titleLines: ['The Complete Guide to', 'i18n in a Cocos Web Game'], subtitle: 'Without a Rewrite — Localization Architecture' } },
  { file: 'og-loop.png', data: { chip: 'INDIE GAME LAB', titleLines: ['Designing a Satisfying', 'Idle Loop'], subtitle: 'Lessons from Shipping a Survival RPG' } },
];

mkdirSync(OUT, { recursive: true });
for (const j of jobs) {
  const svg = buildSVG(j.data);
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
  const png = r.render().asPng();
  writeFileSync(`${OUT}/${j.file}`, png);
  console.log('rendered', j.file, png.length, 'bytes');
}
console.log('ALL DONE');

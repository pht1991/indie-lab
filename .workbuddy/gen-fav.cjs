const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const inputs = [
  { svg: 'D:/Projects/demos/front_end/indie-lab/favicon.svg', out: 'D:/Projects/demos/front_end/indie-lab/apple-touch-icon.png' },
  { svg: 'D:/Projects/demos/front_end/sign-renderer/public/favicon.svg', out: 'D:/Projects/demos/front_end/sign-renderer/public/apple-touch-icon.png' },
  { svg: 'D:/Projects/demos/front_end/kubi-minigame/web-extra/favicon.svg', out: 'D:/Projects/demos/front_end/kubi-minigame/web-extra/apple-touch-icon.png' },
];
for (const { svg, out } of inputs) {
  const data = fs.readFileSync(svg);
  const resvg = new Resvg(data, { fitTo: { mode: 'width', value: 180 } });
  const png = resvg.render().asPng();
  fs.writeFileSync(out, png);
  console.log('wrote', out, png.length, 'bytes');
}

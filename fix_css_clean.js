const fs = require('fs');
const file = '/Users/user/02_Personal/node_x9_build/lekdee/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// Ensure hero allows images to stick out
css = css.replace(/\.hero\{(.*?)overflow:hidden;/g, '.hero{$1overflow:visible;');

// Make hv-char float and stay proportional
css = css.replace(/\.hv-char\{(.*?)\}/g, '.hv-char{position:absolute;right:2%;bottom:-2%;height:auto;width:45%;max-width:280px;object-fit:contain;z-index:3;animation:floatGentle 4s ease-in-out infinite alternate}');

// Make hv-numbers-img fully visible
css = css.replace(/\.hv-numbers-img\{(.*?)\}/g, '.hv-numbers-img{position:absolute;left:-5%;bottom:-5%;width:60%;max-width:350px;height:auto;object-fit:contain;z-index:4;filter:drop-shadow(0 15px 30px rgba(0,0,0,0.6));animation:floatNum 5s ease-in-out infinite alternate}');

// Fix page-banner so image fits nicely on the right
css = css.replace(/\.page-banner\{(.*?)\}/g, '.page-banner{position:relative;border:1px solid var(--line);border-radius:12px;overflow:hidden;display:flex;align-items:center;min-height:170px;margin-bottom:29px;background:#0d1812}');
css = css.replace(/\.pb-img\{(.*?)\}/g, '.pb-img{position:absolute;right:-5%;bottom:0;width:auto;height:125%;max-height:220px;object-fit:contain;z-index:2;animation:floatGentle 4s ease-in-out infinite alternate}');

// Add the gentle float animation if not exists
if (!css.includes('@keyframes floatGentle')) {
  css += '\n@keyframes floatGentle{from{transform:translateY(0)}to{transform:translateY(-10px)}}';
}

fs.writeFileSync(file, css);
console.log('Clean CSS applied!');

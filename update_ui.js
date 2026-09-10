const fs = require('fs');
const path = require('path');
const file = '/Users/user/02_Personal/node_x9_build/lekdee/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// 1. Update Base Font Size and Main Max-Width
css = css.replace(/font-size:16px/g, 'font-size:18px');
css = css.replace(/max-width:1530px/g, 'max-width:1300px'); // Narrower layout for better reading

// 2. Update Typography for Seniors (Bigger fonts)
css = css.replace(/\.hero h2\{font-weight:500;font-size:35px/g, '.hero h2{font-weight:500;font-size:42px');
css = css.replace(/\.hero p\{font-size:13px/g, '.hero p{font-size:16px');
css = css.replace(/\.quick-card strong\{font-weight:500;font-size:14px/g, '.quick-card strong{font-weight:500;font-size:17px');
css = css.replace(/\.quick-card p\{font-size:11px/g, '.quick-card p{font-size:13px');
css = css.replace(/\.section-title h2\{font-size:18px/g, '.section-title h2{font-size:22px');
css = css.replace(/\.section-title p\{font-size:12px/g, '.section-title p{font-size:14px');
css = css.replace(/\.story h3\{font-size:13px/g, '.story h3{font-size:15px');
css = css.replace(/\.note-promo h3,\.community-promo h3\{font-size:13px/g, '.note-promo h3,.community-promo h3{font-size:15px');
css = css.replace(/\.note-promo p,\.community-promo p\{font-size:10px/g, '.note-promo p,.community-promo p{font-size:13px');

// 3. Update Images (Hero & Quick Cards & Banners)
css = css.replace(/\.quick-img\{width:60px;height:60px/g, '.quick-img{width:85px;height:85px');
css = css.replace(/\.promo-img\{width:64px;height:64px/g, '.promo-img{width:90px;height:90px');
css = css.replace(/\.quick-card\{border:1px solid var\(--line\);border-radius:8px(.*?)padding:16px 18px/g, '.quick-card{border:1px solid var(--line);border-radius:12px$1padding:22px 24px');
css = css.replace(/\.hero\{position:relative(.*?)min-height:336px/g, '.hero{position:relative$1min-height:400px');
css = css.replace(/\.hv-char\{(.*?)height:105%/g, '.hv-char{$1height:115%');
css = css.replace(/\.hv-numbers-img\{(.*?)width:62%/g, '.hv-numbers-img{$1width:75%');
css = css.replace(/\.page-banner\{(.*?)min-height:140px/g, '.page-banner{$1min-height:170px');
css = css.replace(/\.pb-img\{(.*?)height:120%;max-height:180px/g, '.pb-img{$1height:145%;max-height:230px');

// 4. Update Gradients (Make them plumper/softer)
// Increase blurs for hv-glow
css = css.replace(/filter:blur\(60px\)/g, 'filter:blur(80px)');
css = css.replace(/\.hv-glow-purple\{width:280px;height:280px/g, '.hv-glow-purple{width:350px;height:350px');
css = css.replace(/\.hv-glow-teal\{width:240px;height:240px/g, '.hv-glow-teal{width:320px;height:320px');
css = css.replace(/\.hv-glow-green\{width:200px;height:200px/g, '.hv-glow-green{width:280px;height:280px');

// Make banner gradients softer/rounder
css = css.replace(/radial-gradient\(circle at 80% 50%, (.*?) 0%, transparent 60%\)/g, 'radial-gradient(ellipse at 85% 50%, $1 0%, transparent 75%)');

// Soften borders globally for elements
css = css.replace(/border-radius:9px/g, 'border-radius:14px'); // story-card, hot-panel, line-promo
css = css.replace(/border-radius:8px/g, 'border-radius:12px'); // default generic boxes

fs.writeFileSync(file, css);
console.log('CSS Updated!');

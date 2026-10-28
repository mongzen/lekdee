const fs = require('fs');
const file = '/Users/user/02_Personal/node_x9_build/lekdee/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// 1. Remove overflow:hidden to allow popping out
css = css.replace(/\.page-banner\{(.*?)overflow:hidden/g, '.page-banner{$1overflow:visible');
css = css.replace(/\.hero\{(.*?)overflow:hidden/g, '.hero{$1overflow:visible');
css = css.replace(/\.hero-visual\{(.*?)overflow:hidden/g, '.hero-visual{$1overflow:visible');
css = css.replace(/\.quick-card\{(.*?)overflow:hidden/g, '.quick-card{$1overflow:visible');

// 2. Add border-radius:inherit to pseudo-elements so backgrounds don't spill
css = css.replace(/\.page-banner:before\{(.*?)\}/g, '.page-banner:before{$1;border-radius:inherit}');
css = css.replace(/\.hero:before\{(.*?)\}/g, '.hero:before{$1;border-radius:inherit}');
css = css.replace(/\.theme-gold:after\{(.*?)\}/g, '.theme-gold:after{$1;border-radius:inherit}');
css = css.replace(/\.theme-purple:after\{(.*?)\}/g, '.theme-purple:after{$1;border-radius:inherit}');
css = css.replace(/\.theme-pink:after\{(.*?)\}/g, '.theme-pink:after{$1;border-radius:inherit}');
css = css.replace(/\.theme-teal:after\{(.*?)\}/g, '.theme-teal:after{$1;border-radius:inherit}');
css = css.replace(/\.theme-blue:after\{(.*?)\}/g, '.theme-blue:after{$1;border-radius:inherit}');

// 3. Make images bigger
css = css.replace(/\.pb-img\{(.*?)height:145%;max-height:230px;object-fit:contain;transform:translateY\(10px\) translateX\(-10px\)/g, '.pb-img{$1height:170%;max-height:300px;object-fit:contain;transform:translateY(0) translateX(5px)');
css = css.replace(/\.quick-img\{(.*?)width:85px;height:85px/g, '.quick-img{$1width:115px;height:115px;transform:translateY(-10px) translateX(10px)');
css = css.replace(/\.promo-img\{(.*?)width:90px;height:90px/g, '.promo-img{$1width:130px;height:130px;transform:translateY(-15px) translateX(10px)');
css = css.replace(/\.hv-char\{(.*?)height:115%/g, '.hv-char{$1height:130%;transform:translateY(15px)');

// 4. Remove mask-image from .hv-char so it's not faded/cropped at the edges
css = css.replace(/mask-image:linear-gradient(.*?)mask-composite:intersect;/g, '');
css = css.replace(/-webkit-mask-image:linear-gradient(.*?)-webkit-mask-composite:destination-in;/g, '');

fs.writeFileSync(file, css);
console.log('Images popping out applied!');

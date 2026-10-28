const fs = require('fs');
const file = '/Users/user/02_Personal/node_x9_build/lekdee/app/globals.css';
let css = fs.readFileSync(file, 'utf8');

// 1. Fix pb-img width so it fits well with banner (doesn't stretch endlessly)
css = css.replace(/\.pb-img\{(.*?)height:170%;max-height:300px(.*?)transform:translateY\(0\) translateX\(5px\)/g, '.pb-img{$1width:100%;max-width:220px;height:auto;transform:translateY(-10px) translateX(10px)');
// Ensure pb-visual behaves nicely
css = css.replace(/\.pb-visual\{(.*?)width:40%;height:100%/g, '.pb-visual{$1width:35%;height:100%');

// 2. Fix hv-numbers-img (prevent cropping)
css = css.replace(/\.hv-numbers-img\{(.*?)width:75%;height:auto/g, '.hv-numbers-img{$1width:60%;height:auto;bottom:0;left:0');

// 3. Make hv-char suitable for the ThreeImage div container
css = css.replace(/\.hv-char\{(.*?)height:130%;(.*?)width:auto;max-width:none;/g, '.hv-char{$1height:140%;width:45%;right:-5%;bottom:-5%;');

fs.writeFileSync(file, css);

const pageFile = '/Users/user/02_Personal/node_x9_build/lekdee/app/page.tsx';
let page = fs.readFileSync(pageFile, 'utf8');
if (!page.includes('ThreeImage')) {
  page = page.replace("import BottomPromo from '@/components/BottomPromo';", "import BottomPromo from '@/components/BottomPromo';\nimport ThreeImage from '@/components/ThreeImage';");
  page = page.replace(
    /{.*?eslint-disable-next-line @next\/next\/no-img-element.*?}\s*<img src="\/hero-char.webp" alt="" className="hv-char"\/>/g,
    '<ThreeImage src="/hero-char.webp" className="hv-char"/>'
  );
  fs.writeFileSync(pageFile, page);
}

console.log('Updated CSS and page.tsx for Three.js!');

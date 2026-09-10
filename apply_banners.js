const fs = require('fs');
const path = require('path');

const rootDir = '/Users/user/02_Personal/node_x9_build/lekdee';

// 1. Create PageBanner.tsx
const pbCode = `import React from 'react';

interface PageBannerProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  imgSrc: string;
  theme?: 'gold' | 'purple' | 'blue' | 'pink' | 'teal';
}

export default function PageBanner({ eyebrow, title, subtitle, imgSrc, theme = 'purple' }: PageBannerProps) {
  return (
    <div className={\`page-banner theme-\${theme}\`}>
      <div className="pb-content">
        <div className="pb-eyebrow">{eyebrow}</div>
        <h1 className="pb-title">{title}</h1>
        <p className="pb-subtitle">{subtitle}</p>
      </div>
      <div className="pb-visual" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt="" className="pb-img" />
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(rootDir, 'components/PageBanner.tsx'), pbCode);

// 2. Modify globals.css
const cssPath = path.join(rootDir, 'app/globals.css');
let css = fs.readFileSync(cssPath, 'utf8');
const newBaseCSS = `.page-banner{position:relative;border:1px solid var(--line);border-radius:12px;overflow:hidden;display:flex;align-items:center;min-height:140px;margin-bottom:29px;background:#0d1812}.page-banner:before{content:'';position:absolute;inset:0;background-image:radial-gradient(#ffffff11 1px,transparent 1px);background-size:16px 16px;opacity:0.5;pointer-events:none;z-index:0}.pb-content{padding:25px 30px;position:relative;z-index:2;flex:1;max-width:65%}.pb-eyebrow{font:10px 'Space Grotesk',sans-serif;letter-spacing:2px;color:#8ba18e;margin-bottom:8px;text-transform:uppercase}.pb-title{font-weight:600;font-size:clamp(22px, 3.5vw, 32px);line-height:1.2;margin:0;letter-spacing:-0.5px;color:#fff}.pb-title span{color:var(--mint);margin-left:6px}.pb-subtitle{font-size:12px;color:#a8b9a9;margin-top:6px;line-height:1.5}.pb-visual{position:absolute;right:0;bottom:0;width:40%;height:100%;display:flex;align-items:flex-end;justify-content:flex-end;z-index:2;pointer-events:none}.pb-img{width:auto;height:120%;max-height:180px;object-fit:contain;transform:translateY(10px) translateX(-10px);filter:drop-shadow(0 10px 20px rgba(0,0,0,0.5))}.theme-gold{background:linear-gradient(135deg, #1f1807 0%, #15180f 100%);border-color:#4a3500}.theme-gold:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 50%, #d4a01744 0%, transparent 60%)}.theme-purple{background:linear-gradient(135deg, #180a2b 0%, #0d121c 100%);border-color:#3d1c68}.theme-purple:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 50%, #7b35d844 0%, transparent 60%)}.theme-pink{background:linear-gradient(135deg, #2b0a1a 0%, #0d121c 100%);border-color:#681c3a}.theme-pink:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 50%, #d8357b44 0%, transparent 60%)}.theme-teal{background:linear-gradient(135deg, #071f1d 0%, #0d1812 100%);border-color:#004a40}.theme-teal:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 50%, #00c9aa44 0%, transparent 60%)}.theme-blue{background:linear-gradient(135deg, #07122b 0%, #0d141c 100%);border-color:#143468}.theme-blue:after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 50%, #1d4ed844 0%, transparent 60%)}`;

const lines = css.split('\n');
if (lines.length >= 2 && !lines[1].includes('.page-banner')) {
  lines[1] = lines[1] + newBaseCSS;
}
if (lines.length >= 6 && lines[5].includes('@media(max-width:760px)') && !lines[5].includes('.page-banner{min-height:120px')) {
  lines[5] = lines[5].replace('}', '}.page-banner{min-height:120px;flex-direction:column;align-items:flex-start}.pb-content{max-width:100%;padding:20px 25px 80px}.pb-visual{width:100%;height:100px;align-items:flex-end;justify-content:flex-end}.pb-img{height:140px;max-height:140px;transform:translateY(5px) translateX(-5px)}}');
}
fs.writeFileSync(cssPath, lines.join('\n'));

// 3. Update 5 pages
const pagesToUpdate = [
  { path: 'app/ritual/page.tsx', theme: 'gold', img: '/img-banner-shrine.webp' },
  { path: 'app/trends/page.tsx', theme: 'purple', img: '/img-banner-trends.webp' },
  { path: 'app/chat/page.tsx', theme: 'pink', img: '/img-banner-ai.webp' },
  { path: 'app/my-numbers/page.tsx', theme: 'pink', img: '/img-banner-notebook.webp' },
  { path: 'app/statistics/page.tsx', theme: 'blue', img: '/img-banner-stats.webp' }
];

pagesToUpdate.forEach(p => {
  const pPath = path.join(rootDir, p.path);
  let pContent = fs.readFileSync(pPath, 'utf8');
  
  // Add import if not exists
  if (!pContent.includes('PageBanner')) {
    const importStr = `import PageBanner from '@/components/PageBanner';\n`;
    let lastIndex = 0;
    
    // Find last import
    const importLines = pContent.split('\n').filter(l => l.startsWith('import '));
    if (importLines.length > 0) {
      const lastImport = importLines[importLines.length - 1];
      lastIndex = pContent.indexOf(lastImport) + lastImport.length + 1;
    } else if (pContent.startsWith("'use client';")) {
      lastIndex = pContent.indexOf("'use client';") + 14;
    }
    
    pContent = pContent.slice(0, lastIndex) + importStr + pContent.slice(lastIndex);
  }

  // Replace page-heading
  const headingRegex = /<div className="page-heading">[\s\S]*?<\/div><\/div>/;
  
  if (headingRegex.test(pContent)) {
    const match = pContent.match(headingRegex)[0];
    
    // Extract text
    const eyebrowMatch = match.match(/<div className="eyebrow">(.*?)<\/div>/);
    let h1Match = match.match(/<h1>(.*?)<span>(.*?)<\/span><\/h1>/);
    if(!h1Match) h1Match = match.match(/<h1>(.*?)<\/h1>/); // Fallback if no span
    const pMatch = match.match(/<p>(.*?)<\/p>/);
    
    if (eyebrowMatch && h1Match && pMatch) {
      const eyebrow = eyebrowMatch[1];
      const h1Text = h1Match[1].trim();
      const h1Span = h1Match[2] ? ` <span>${h1Match[2]}</span>` : '';
      const pText = pMatch[1];
      
      const bannerJSX = `<PageBanner\n   eyebrow="${eyebrow}"\n   title={<>${h1Text}${h1Span}</>}\n   subtitle="${pText}"\n   imgSrc="${p.img}"\n   theme="${p.theme}"\n  />`;
      
      pContent = pContent.replace(headingRegex, bannerJSX);
    }
  }
  
  fs.writeFileSync(pPath, pContent);
});

console.log('Update complete');

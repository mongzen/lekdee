const fs = require('fs');
const path = require('path');
const file = '/Users/user/02_Personal/node_x9_build/lekdee/app/globals.css';
let css = fs.readFileSync(file, 'utf8');
let lines = css.split('\n');

// Line 3: @media(min-width:1550px)
lines[2] = lines[2].replace('.hero{min-height:370px}', '.hero{min-height:440px}');
lines[2] = lines[2].replace('.hero h2{font-size:40px}', '.hero h2{font-size:52px}');
lines[2] = lines[2].replace('.hv-char{height:115%}', '.hv-char{height:125%}');
lines[2] = lines[2].replace('.story h3{font-size:15px}', '.story h3{font-size:17px}');
lines[2] = lines[2].replace('.quick-card p{font-size:12px}', '.quick-card p{font-size:14px}');

// Line 4: @media(max-width:1200px)
lines[3] = lines[3].replace('.quick-card strong{font-size:12px}', '.quick-card strong{font-size:15px}');
lines[3] = lines[3].replace('.quick-card p{font-size:10px}', '.quick-card p{font-size:12px}');
lines[3] = lines[3].replace('.quick-icon{width:34px;height:36px}', '.quick-icon{width:45px;height:45px}');
lines[3] = lines[3].replace('.story h3{font-size:12px}', '.story h3{font-size:14px}');

// Line 5: @media(max-width:1000px)
lines[4] = lines[4].replace('.hero h2{font-size:30px}', '.hero h2{font-size:35px}');
lines[4] = lines[4].replace('.page-heading h1{font-size:25px}', '.page-heading h1{font-size:30px}');
lines[4] = lines[4].replace('.quick-card strong{font-size:11px}', '.quick-card strong{font-size:14px}');
lines[4] = lines[4].replace('.quick-card p{font-size:9px}', '.quick-card p{font-size:11px}');
lines[4] = lines[4].replace('.hero small{font-size:9px}', '.hero small{font-size:12px}');

// Line 6: @media(max-width:760px)
lines[5] = lines[5].replace('.page-heading h1{font-size:27px}', '.page-heading h1{font-size:32px}');
lines[5] = lines[5].replace('.page-heading p{font-size:12px', '.page-heading p{font-size:14px');
lines[5] = lines[5].replace('.hero{min-height:385px}', '.hero{min-height:430px}');
lines[5] = lines[5].replace('.hero h2{font-size:30px', '.hero h2{font-size:36px');
lines[5] = lines[5].replace('.hero p{font-size:12px', '.hero p{font-size:14px');
lines[5] = lines[5].replace('.hero small{font-size:9px', '.hero small{font-size:11px');
lines[5] = lines[5].replace('.quick-card strong{font-size:14px}', '.quick-card strong{font-size:16px}');
lines[5] = lines[5].replace('.quick-card p{font-size:11px}', '.quick-card p{font-size:13px}');
lines[5] = lines[5].replace('.section-title h2{font-size:17px}', '.section-title h2{font-size:20px}');
lines[5] = lines[5].replace('.section-title p{font-size:11px}', '.section-title p{font-size:13px}');
lines[5] = lines[5].replace('.story h3{font-size:14px', '.story h3{font-size:16px');

// Enhance page-banner specific mobile sizes
lines[5] = lines[5].replace('.page-banner{min-height:120px', '.page-banner{min-height:150px');
lines[5] = lines[5].replace('.pb-img{height:140px;max-height:140px', '.pb-img{height:180px;max-height:180px');

fs.writeFileSync(file, lines.join('\n'));
console.log('MQ Updated!');

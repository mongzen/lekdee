const fs = require('fs');
const rootDir = '/Users/user/02_Personal/node_x9_build/lekdee';
const cssPath = rootDir + '/app/globals.css';
let lines = fs.readFileSync(cssPath, 'utf8').split('\n');

// Restore original line 6 (by replacing the broken part back to what it should be)
lines[5] = lines[5].replace(
  '@media(max-width:760px){.sidebar{display:none;top:65px;width:240px;box-shadow:20px 0 90px #000a}.page-banner{min-height:120px;flex-direction:column;align-items:flex-start}.pb-content{max-width:100%;padding:20px 25px 80px}.pb-visual{width:100%;height:100px;align-items:flex-end;justify-content:flex-end}.pb-img{height:140px;max-height:140px;transform:translateY(5px) translateX(-5px)}}.sidebar.opened',
  '@media(max-width:760px){.sidebar{display:none;top:65px;width:240px;box-shadow:20px 0 90px #000a}.sidebar.opened'
);

// Append the new rules safely at the end of the line, BEFORE the final closing brace of the media query
if (lines[5].endsWith('}')) {
  lines[5] = lines[5].slice(0, -1) + '.page-banner{min-height:120px;flex-direction:column;align-items:flex-start}.pb-content{max-width:100%;padding:20px 25px 80px}.pb-visual{width:100%;height:100px;align-items:flex-end;justify-content:flex-end}.pb-img{height:140px;max-height:140px;transform:translateY(5px) translateX(-5px)}}';
}

fs.writeFileSync(cssPath, lines.join('\n'));

const fs = require('fs');

const appPath = './src/App.jsx';
let appCode = fs.readFileSync(appPath, 'utf8');

// Replace the toggle logic
appCode = appCode.replace(
  /screens\.forEach\(\(s, i\) => \{\s*s\.classList\.toggle\('active', i === screenIdx\);\s*\}\);/m,
  `screens.forEach((s, i) => {
          if (i === screenIdx) {
            s.classList.add('active');
            s.style.opacity = '1';
            s.style.zIndex = '5';
          } else {
            s.classList.remove('active');
            s.style.opacity = '0';
            s.style.zIndex = '1';
          }
        });`
);

// Scale fix for mobile dynamically in JS
appCode = appCode.replace(
  /const scale = lerp\(0\.82, 1, easeOut\(tiltProgress\)\);/m,
  `// Dynamic mobile scaling
      let baseScale = 1;
      if (window.innerWidth <= 600) { baseScale = 0.75; }
      const scale = lerp(0.82 * baseScale, 1 * baseScale, easeOut(tiltProgress));`
);

fs.writeFileSync(appPath, appCode);

// Fix CSS overflow and media queries
const cssPath = './src/index.css';
let cssCode = fs.readFileSync(cssPath, 'utf8');

// remove overflow-x: hidden from body to ensure position sticky works everywhere
cssCode = cssCode.replace(/overflow-x:\s*hidden;/g, 'overflow-x: clip;');

// remove the media query that ruins internal pixel heights
cssCode = cssCode.replace(/.iphone \{ width: 240px; height: 490px; \}/g, '/* .iphone { transform: scale(0.75); } handled in JS */');

fs.writeFileSync(cssPath, cssCode);

console.log("Fixed toggle logic, mobile scaling, and scroll bounds.");

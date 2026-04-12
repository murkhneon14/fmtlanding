const fs = require('fs');

// 1. Fix App.jsx Badge
const appPath = './src/App.jsx';
let appCode = fs.readFileSync(appPath, 'utf8');

appCode = appCode.replace(
  /<div className="hero-eyebrow">\s*<div className="hero-eyebrow-dot"><\/div>\s*Now on Play Store\s*<\/div>/m,
  `<div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', animation: 'fadeUp 0.8s ease both' }}>
          <div className="hero-eyebrow" style={{ marginBottom: 0, animation: 'none' }}>
            <div className="hero-eyebrow-dot"></div>
            Live on Play Store
          </div>
          <div className="hero-eyebrow" style={{ marginBottom: 0, animation: 'none' }}>
            <img src="/app-store.svg" alt="App Store" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
            Launching Soon
          </div>
        </div>`
);
fs.writeFileSync(appPath, appCode);


// 2. Fix CSS color gradients
const cssPath = './src/index.css';
let cssCode = fs.readFileSync(cssPath, 'utf8');

// A. Remove white gradients from text
cssCode = cssCode.replace(/background:\s*linear-gradient\(180deg,\s*#fff.*?\);\s*-webkit-background-clip:\s*text;\s*-webkit-text-fill-color:\s*transparent;\s*background-clip:\s*text;/g, 'color: var(--text-primary);');

// B. Fix eyebrow badge visibility
cssCode = cssCode.replace(/background:\s*rgba\(255,255,255,0\.1\);\s*border:\s*1px solid rgba\(255,255,255,0\.15\);/g, 'background: var(--badge-bg); border: 1px solid var(--badge-border);');
cssCode = cssCode.replace(/color:\s*rgba\(255,255,255,0\.75\);/g, 'color: var(--badge-text);');
cssCode = cssCode.replace(/color:\s*rgba\(255,255,255,0\.85\);/g, 'color: var(--text-secondary);'); // founder quote

// C. Fix white text across cards
cssCode = cssCode.replace(/color:\s*white;/g, 'color: #fff;'); // change "white" to hex for easier targeting later, but actually let's ensure some dark mode defaults are overwritten.
// Let's specifically target feature title
cssCode = cssCode.replace(/\.feature-title \{[\s\S]*?color:\s*white;/g, match => match.replace('color: white;', 'color: var(--text-primary);'));
// founder quote em
cssCode = cssCode.replace(/\.founder-quote\s*em\s*\{[\s\S]*?color:\s*white;/g, match => match.replace('color: white;', 'color: var(--text-primary);'));

// Feature tile background needs to be lighter so black text shows?
// Actually if feature tile is #111, white text is good!
// The problem is .hero-title, .features-title, .founder-title, .contact-title which have no container background, they sit on body background (white).
// My regex replaced the linear-gradient for them to `color: var(--text-primary);`, so they will be perfectly visible now!

// Also, the glowing orb behind the hero title is white-ish, which invisible. Let's make it a nice blue glow.
cssCode = cssCode.replace(/background:\s*radial-gradient\(circle,\s*rgba\(0,113,227,0\.15\)\s*0%,\s*transparent\s*70%\);/g, 'background: radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 60%);');

fs.writeFileSync(cssPath, cssCode);
console.log("CSS gradients and text colours fixed!");

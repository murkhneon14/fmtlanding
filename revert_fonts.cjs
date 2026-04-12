const fs = require('fs');
const cssPath = './src/index.css';
let cssCode = fs.readFileSync(cssPath, 'utf8');

// Revert .hero-title
cssCode = cssCode.replace(
  /\.hero-title \{[\s\S]*?animation: fadeUp 0\.8s 0\.1s ease both;\s*\}/m,
  `.hero-title {
  font-size: clamp(48px, 8vw, 96px);
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
  margin-bottom: 20px;
  color: var(--text-primary);
  animation: fadeUp 0.8s 0.1s ease both;
}`
);

// Revert .hero-sub
cssCode = cssCode.replace(
  /\.hero-sub \{[\s\S]*?animation: fadeUp 0\.8s 0\.2s ease both;\s*\}/m,
  `.hero-sub {
  font-size: clamp(17px, 2.5vw, 21px);
  font-family: var(--font-body);
  color: #86868b;
  font-weight: 400;
  max-width: 560px;
  line-height: 1.5;
  margin: 0 auto 36px auto;
  animation: fadeUp 0.8s 0.2s ease both;
}`
);

fs.writeFileSync(cssPath, cssCode);
console.log("Reverted fonts perfectly.");

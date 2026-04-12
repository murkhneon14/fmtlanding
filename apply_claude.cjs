const fs = require('fs');

// --- 1. Modify index.css ---
const cssPath = './src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newCSS = `

/* ── CLAUDE SCROLL SECTIONS ── */
:root {
  --blue: #0071e3;
  --blue-hover: #0077ed;
}

#hero {
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 80px 24px 0;
  position: relative;
  overflow: hidden;
}

.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 980px;
  padding: 5px 14px;
  font-size: 12px; letter-spacing: 0.05em;
  color: rgba(255,255,255,0.75);
  margin-bottom: 24px;
  animation: fadeUp 0.8s ease both;
}

.hero-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #30d158;
  box-shadow: 0 0 8px #30d158;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hero-title {
  font-size: clamp(48px, 8vw, 96px);
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
  margin-bottom: 20px;
  background: linear-gradient(180deg, #fff 60%, rgba(255,255,255,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeUp 0.8s 0.1s ease both;
}

.hero-sub {
  font-size: clamp(17px, 2.5vw, 21px);
  font-family: var(--font-body);
  color: #86868b;
  font-weight: 400;
  max-width: 560px;
  line-height: 1.5;
  margin-bottom: 36px;
  animation: fadeUp 0.8s 0.2s ease both;
}

.hero-actions {
  display: flex; align-items: center; justify-content: center; gap: 20px;
  animation: fadeUp 0.8s 0.3s ease both;
  margin-bottom: 80px;
}

.btn-hero-main {
  background: var(--blue);
  color: white; border: none; border-radius: 980px;
  padding: 14px 32px;
  font-size: 17px; font-weight: 500;
  cursor: pointer; text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  display: inline-block;
  font-family: var(--font-heading);
}
.btn-hero-main:hover { background: var(--blue-hover); transform: scale(1.02); }

.btn-ghost {
  color: var(--blue);
  font-size: 17px; font-weight: 400;
  text-decoration: none;
  display: flex; align-items: center; gap: 4px;
  transition: gap 0.2s;
  font-family: var(--font-body);
}
.btn-ghost:hover { gap: 8px; }
.btn-ghost::after { content: '›'; font-size: 20px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── PHONE SCROLL SECTION ── */
#phone-scroll {
  position: relative;
  height: 400vh;
}

.phone-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.phone-scene {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.screen-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12vh;
  text-align: center;
  pointer-events: none;
  transition: opacity 0.4s;
}

.screen-label-title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(180deg, #fff 60%, rgba(255,255,255,0.45));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}

.screen-label-sub {
  font-size: 17px;
  font-family: var(--font-body);
  color: #86868b;
  margin-top: 8px;
}

.iphone {
  position: relative;
  width: 300px;
  height: 600px;
  transform-style: preserve-3d;
  transform-origin: center center;
  will-change: transform;
}

.iphone-shell {
  position: absolute; inset: 0;
  border-radius: 48px;
  background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #111 100%);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.5),
    0 2px 4px rgba(0,0,0,0.4),
    inset 0 1px 0 rgba(255,255,255,0.1),
    0 40px 120px rgba(0,0,0,0.8);
}

.iphone-btn-left {
  position: absolute; left: -3px; top: 120px;
  width: 3px; height: 36px; border-radius: 2px 0 0 2px;
  background: linear-gradient(to right, #222, #333);
}
.iphone-btn-left2 {
  position: absolute; left: -3px; top: 172px;
  width: 3px; height: 64px; border-radius: 2px 0 0 2px;
  background: linear-gradient(to right, #222, #333);
}
.iphone-btn-left3 {
  position: absolute; left: -3px; top: 248px;
  width: 3px; height: 64px; border-radius: 2px 0 0 2px;
  background: linear-gradient(to right, #222, #333);
}
.iphone-btn-right {
  position: absolute; right: -3px; top: 180px;
  width: 3px; height: 80px; border-radius: 0 2px 2px 0;
  background: linear-gradient(to left, #222, #333);
}

.iphone-screen {
  position: absolute;
  inset: 10px;
  border-radius: 40px;
  overflow: hidden;
  background: #000;
  font-family: var(--font-body);
}

.dynamic-island {
  position: absolute; top: 14px; left: 50%;
  transform: translateX(-50%);
  width: 126px; height: 34px;
  background: #000;
  border-radius: 20px;
  z-index: 10;
}

.app-screen {
  position: absolute; inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 40px;
  overflow: hidden;
}
.app-screen.active { opacity: 1; }

.screen-explore {
  background: #0a0a0a;
  padding: 60px 16px 20px;
  display: flex; flex-direction: column;
}

.se-header { margin-bottom: 16px; }
.se-title { font-size: 26px; font-weight: 700; font-family: var(--font-heading); }
.se-subtitle { font-size: 12px; color: #555; margin-top: 2px; }

.se-banner {
  background: linear-gradient(135deg, #ff7043, #ff8a65);
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 14px;
  font-size: 11px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
}
.se-banner-sub { font-size: 9px; font-weight: 400; margin-top: 2px; opacity: 0.85; }

.se-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
.se-tab { padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; }
.se-tab.active { background: #1a82ff; color: white; }
.se-tab.inactive { background: #1a1a1a; color: #666; }

.se-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.se-card {
  border-radius: 16px; padding: 16px 14px 14px;
  display: flex; flex-direction: column; justify-content: space-between;
  min-height: 110px;
}
.se-card-icon { font-size: 22px; margin-bottom: 8px; }
.se-card-label { font-size: 14px; font-weight: 600; color: white; }

.card-math { background: linear-gradient(135deg, #5b5bd6, #7c6ff7); }
.card-sci  { background: linear-gradient(135deg, #2da05a, #34c37a); }
.card-eng  { background: linear-gradient(135deg, #e8a100, #f5bc00); }
.card-hist { background: linear-gradient(135deg, #d4376e, #e8507e); }

.se-bottom-nav {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 72px;
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: space-around;
  padding: 0 8px 16px;
  border-top: 1px solid #1a1a1a;
}
.se-nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 9px; color: #555; }
.se-nav-item.active { color: #1a82ff; }
.se-nav-icon { font-size: 18px; }

.screen-search { background: #0a0a0a; padding: 60px 16px 80px; }
.ss-header { font-size: 22px; font-weight: 700; margin-bottom: 6px; font-family: var(--font-heading); }
.ss-sub { font-size: 11px; color: #555; margin-bottom: 14px; }
.ss-location {
  background: rgba(26,130,255,0.1); border: 1px solid rgba(26,130,255,0.2);
  border-radius: 10px; padding: 8px 10px; font-size: 10px; color: #1a82ff;
  margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}
.ss-radius { font-size: 11px; font-weight: 600; color: white; margin-bottom: 6px; }
.ss-slider { width: 100%; height: 3px; background: #222; border-radius: 2px; margin-bottom: 14px; position: relative; }
.ss-slider-fill { width: 30%; height: 100%; background: #1a82ff; border-radius: 2px; }
.ss-slider-thumb {
  position: absolute; left: 30%; top: 50%; transform: translate(-50%, -50%);
  width: 14px; height: 14px; border-radius: 50%; background: white; box-shadow: 0 1px 4px rgba(0,0,0,0.5);
}
.ss-filter-label { font-size: 11px; font-weight: 600; margin-bottom: 8px; }
.ss-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.ss-chip { padding: 5px 10px; border-radius: 8px; font-size: 10px; border: 1px solid #333; color: #888; }
.ss-chip.active { border-color: #5b5bd6; color: #7c6ff7; background: rgba(91,91,214,0.1); }

.screen-tutors { background: #0a0a0a; padding: 60px 16px 80px; }
.st-title { font-size: 18px; font-weight: 700; margin-bottom: 14px; }
.tutor-card { background: #161616; border: 1px solid #222; border-radius: 16px; padding: 14px; margin-bottom: 10px; display: flex; flex-direction: column; gap: 8px; }
.tutor-top { display: flex; align-items: center; gap: 10px; }
.tutor-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: white; flex-shrink: 0; }
.tutor-info { flex: 1; }
.tutor-name { font-size: 14px; font-weight: 600; }
.tutor-meta { font-size: 10px; color: #555; margin-top: 2px; }
.tutor-meta span { color: #888; }
.tutor-msg-btn { background: #1a82ff; color: white; border: none; border-radius: 10px; padding: 8px 0; font-size: 11px; font-weight: 600; width: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; }

.screen-profile { background: #0a0a0a; padding: 60px 16px 80px; }
.sp-title { font-size: 22px; font-weight: 700; margin-bottom: 16px; }
.sp-card { border-radius: 16px; padding: 16px; margin-bottom: 12px; }
.sp-profile-card { background: linear-gradient(135deg, #1a82ff, #00c6fb); display: flex; align-items: center; gap: 12px; }
.sp-avatar { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; }
.sp-name { font-size: 16px; font-weight: 700; }
.sp-phone { font-size: 11px; opacity: 0.8; margin-top: 2px; }
.sp-premium-card { background: linear-gradient(135deg, #2da05a, #34c37a); }
.sp-premium-badge { display: inline-flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.2); border-radius: 20px; padding: 3px 10px; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px; }
.sp-premium-title { font-size: 15px; font-weight: 700; }
.sp-premium-meta { font-size: 10px; opacity: 0.8; margin-top: 4px; }

.hero-glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.glow-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 70%); top: -100px; left: 50%; transform: translateX(-50%); }

/* ── FEATURES SECTION ── */
#features {
  background: var(--bg-color);
  padding: 120px 24px;
}

.features-eyebrow {
  text-align: center;
  font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 16px;
  font-family: var(--font-heading);
}

.features-title {
  text-align: center;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.07;
  margin-bottom: 12px;
  background: linear-gradient(180deg, #fff 60%, rgba(255,255,255,0.4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-heading);
}

.features-sub {
  text-align: center;
  font-size: 19px;
  color: #86868b;
  max-width: 560px;
  margin: 0 auto 80px;
  line-height: 1.5;
  font-family: var(--font-body);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2px;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
}

.feature-tile {
  background: #111;
  padding: 40px 36px;
  position: relative;
  overflow: hidden;
  transition: background 0.3s;
}
.feature-tile:hover { background: #161616; }
.feature-tile::before { content: ''; position: absolute; inset: 0; border: 1px solid rgba(255,255,255,0.06); pointer-events: none; }
.feature-icon { font-size: 36px; margin-bottom: 20px; display: block; }
.feature-title { font-size: 21px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 10px; color: white; font-family: var(--font-heading); }
.feature-desc { font-size: 15px; color: #86868b; line-height: 1.6; font-family: var(--font-body); }

/* ── FOUNDER ── */
#founder {
  background: var(--bg-color);
  padding: 120px 24px;
  text-align: center;
}

.founder-eyebrow { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--blue); margin-bottom: 24px; font-family: var(--font-heading); }
.founder-title { font-size: clamp(32px, 5vw, 56px); font-weight: 700; letter-spacing: -0.025em; margin-bottom: 48px; background: linear-gradient(180deg, #fff 60%, rgba(255,255,255,0.4)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: var(--font-heading); }

.founder-card {
  max-width: 680px; margin: 0 auto;
  background: #111;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 48px 40px;
  text-align: left;
  position: relative;
  overflow: hidden;
}
.founder-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,113,227,0.5), transparent); }
.founder-quote { font-size: clamp(17px, 2.5vw, 21px); line-height: 1.65; color: rgba(255,255,255,0.85); margin-bottom: 32px; font-weight: 300; font-family: var(--font-body); }
.founder-quote em { font-style: normal; color: white; font-weight: 500; font-family: var(--font-heading); }
.founder-sig { display: flex; align-items: center; gap: 14px; }
.founder-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #1a82ff, #00c6fb); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; }
.founder-name { font-size: 15px; font-weight: 600; font-family: var(--font-heading); }
.founder-role { font-size: 13px; color: #86868b; margin-top: 2px; font-family: var(--font-body); }

/* ── CONTACT ── */
#contact { background: var(--bg-color); padding: 120px 24px; text-align: center; border-top: 1px solid #1a1a1a; }
.contact-title { font-size: clamp(36px, 6vw, 64px); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 16px; background: linear-gradient(180deg, #fff 60%, rgba(255,255,255,0.4)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: var(--font-heading); }
.contact-sub { font-size: 19px; color: #86868b; max-width: 500px; margin: 0 auto 12px; line-height: 1.5; font-family: var(--font-body); }
.contact-sub2 { font-size: 15px; color: #555; max-width: 500px; margin: 0 auto 48px; font-family: var(--font-body); }
.contact-buttons { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.btn-whatsapp { background: #25d366; color: white; border: none; border-radius: 980px; padding: 14px 32px; font-size: 17px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: opacity 0.2s, transform 0.15s; font-family: var(--font-heading); }
.btn-whatsapp:hover { opacity: 0.9; transform: scale(1.02); }
.btn-outline-claude { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 980px; padding: 14px 32px; font-size: 17px; font-weight: 400; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: border-color 0.2s, transform 0.15s; font-family: var(--font-heading); }
.btn-outline-claude:hover { border-color: rgba(255,255,255,0.4); transform: scale(1.02); }

/* ── SCROLL ANIMATIONS ── */
.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── TICKER ── */
.ticker-wrap { overflow: hidden; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; padding: 16px 0; background: #000; }
.ticker { display: flex; gap: 48px; animation: ticker 20s linear infinite; width: max-content; }
.ticker-item { font-size: 13px; color: #555; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; display: flex; align-items: center; gap: 12px; font-family: var(--font-heading); }
.ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: #333; }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@media (max-width: 600px) {
  .iphone { width: 240px; height: 490px; }
  .founder-card { padding: 32px 24px; }
}
`;

if (!css.includes('CLAUDE SCROLL SECTIONS')) {
  fs.writeFileSync(cssPath, css + newCSS);
}

// --- 2. Modify App.jsx to completely rewrite Home component ---

const appPath = './src/App.jsx';
let appCode = fs.readFileSync(appPath, 'utf8');

const regex = /function Home\(\) \{[\s\S]*?\n\}\n/m;

const newHome = `function Home() {
  const iphoneRef = React.useRef(null);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const iphone = iphoneRef.current;
    const section = sectionRef.current;
    
    if (!iphone || !section) return;

    const screens = document.querySelectorAll('.app-screen');
    const labels = document.querySelectorAll('.screen-label');
    const TOTAL = screens.length;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;

      const raw = -rect.top / (sectionH - viewH);
      const p = clamp(raw, 0, 1);

      const tiltProgress = clamp(p / 0.25, 0, 1);
      const tiltDeg = lerp(58, 0, easeOut(tiltProgress));
      const scale = lerp(0.82, 1, easeOut(tiltProgress));
      const translateY = lerp(60, 0, easeOut(tiltProgress));

      const floatPhase = p > 0.25 ? (p - 0.25) / 0.75 : 0;
      const sway = Math.sin(floatPhase * Math.PI * 2) * 4;

      iphone.style.transform = \`perspective(1200px) rotateX(\${tiltDeg}deg) scale(\${scale}) translateY(\${translateY}px) translateX(\${sway}px)\`;

      if (p > 0.25) {
        const screenProgress = (p - 0.25) / 0.75;
        const screenIdx = Math.min(Math.floor(screenProgress * TOTAL), TOTAL - 1);

        screens.forEach((s, i) => {
          s.classList.toggle('active', i === screenIdx);
        });

        labels.forEach((l, i) => {
          const targetOpacity = i === screenIdx ? 1 : 0;
          l.style.opacity = targetOpacity;
          l.style.transform = i === screenIdx
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(12px)';
          l.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
      } else {
        labels.forEach(l => { 
          l.style.opacity = 0; 
        });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(r => observer.observe(r));

    document.querySelectorAll('.feature-tile.reveal').forEach((el, i) => {
      el.style.transitionDelay = \`\${i * 0.07}s\`;
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <section id="hero">
        <div className="hero-glow glow-1"></div>

        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot"></div>
          Now on Play Store
        </div>

        <h1 className="hero-title">Find Your<br/>Perfect Tutor.</h1>

        <p className="hero-sub">Connect with local tutors by subject and location — or list yourself and grow your students.</p>

        <div className="hero-actions">
          <a href="#" className="btn-hero-main">Download Free</a>
          <a href="#features" className="btn-ghost">Learn more</a>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item"><span>Mathematics</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Science</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>English</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Physics</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Chemistry</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>History</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Geography</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Accountancy</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Hindi</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Political Science</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Mathematics</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Science</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>English</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Physics</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Chemistry</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>History</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Geography</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Accountancy</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Hindi</span><div className="ticker-dot"></div></div>
          <div className="ticker-item"><span>Political Science</span><div className="ticker-dot"></div></div>
        </div>
      </div>

      <section id="phone-scroll" ref={sectionRef}>
        <div className="phone-sticky">
          <div className="phone-scene">
            <div className="screen-label" id="label-0">
              <div className="screen-label-title">Explore by subject.</div>
              <div className="screen-label-sub">Browse tutors across 10+ subjects.</div>
            </div>
            <div className="screen-label" id="label-1" style={{opacity:0}}>
              <div className="screen-label-title">Search near you.</div>
              <div className="screen-label-sub">Set your radius. Find tutors within kilometers.</div>
            </div>
            <div className="screen-label" id="label-2" style={{opacity:0}}>
              <div className="screen-label-title">Connect instantly.</div>
              <div className="screen-label-sub">Message tutors directly. No middleman.</div>
            </div>
            <div className="screen-label" id="label-3" style={{opacity:0}}>
              <div className="screen-label-title">Go Premium.</div>
              <div className="screen-label-sub">Unlock all features for just ₹49/month.</div>
            </div>

            <div className="iphone" id="iphone" ref={iphoneRef}>
              <div className="iphone-shell"></div>
              <div className="iphone-btn-left"></div>
              <div className="iphone-btn-left2"></div>
              <div className="iphone-btn-left3"></div>
              <div className="iphone-btn-right"></div>
              <div className="iphone-screen">
                <div className="dynamic-island"></div>

                <div className="app-screen screen-explore active" id="screen-0">
                  <div className="se-header">
                    <div className="se-title">Find My <span style={{ color: "var(--brand-blue)" }}>Tutor</span></div>
                    <div className="se-subtitle">Naharlagun, Arunachal Pradesh</div>
                  </div>
                  <div className="se-banner">
                    🏢 KITABI CORNER
                    <div className="se-banner-sub">Cyber &amp; Stationery · Lekhi Village</div>
                  </div>
                  <div className="se-tabs">
                    <div className="se-tab active">⭐ Popular</div>
                    <div className="se-tab inactive">🔍 Search</div>
                  </div>
                  <div className="se-grid">
                    <div className="se-card card-math">
                      <div className="se-card-icon">🧮</div>
                      <div className="se-card-label">Mathematics</div>
                    </div>
                    <div className="se-card card-hist">
                      <div className="se-card-icon">📜</div>
                      <div className="se-card-label">History</div>
                    </div>
                    <div className="se-card card-sci">
                      <div className="se-card-icon">🔬</div>
                      <div className="se-card-label">Science</div>
                    </div>
                    <div className="se-card card-eng">
                      <div className="se-card-icon">📖</div>
                      <div className="se-card-label">English</div>
                    </div>
                  </div>
                  <div className="se-bottom-nav">
                    <div className="se-nav-item"><div className="se-nav-icon">💬</div>Messages</div>
                    <div className="se-nav-item active"><div className="se-nav-icon">🧭</div>Explore</div>
                    <div className="se-nav-item"><div className="se-nav-icon">👤</div>Account</div>
                  </div>
                </div>

                <div className="app-screen screen-search" id="screen-1">
                  <div className="ss-header">Search Tutors</div>
                  <div className="ss-sub">Filter by location and subject</div>
                  <div className="ss-location">📍 Searching near: 27.1344, 93.7477</div>
                  <div className="ss-radius">Search Radius: 5.0 km</div>
                  <div className="ss-slider">
                    <div className="ss-slider-fill"></div>
                    <div className="ss-slider-thumb"></div>
                  </div>
                  <div className="ss-filter-label">Filter by Subject</div>
                  <div className="ss-chips">
                    <div className="ss-chip active">✓ Mathematics</div>
                    <div className="ss-chip">History</div>
                    <div className="ss-chip">Science</div>
                    <div className="ss-chip">English</div>
                    <div className="ss-chip">Physics</div>
                    <div className="ss-chip">Chemistry</div>
                    <div className="ss-chip">Hindi</div>
                    <div className="ss-chip">Geography</div>
                  </div>
                  <div className="se-bottom-nav">
                    <div className="se-nav-item"><div className="se-nav-icon">💬</div>Messages</div>
                    <div className="se-nav-item active"><div className="se-nav-icon">🧭</div>Explore</div>
                    <div className="se-nav-item"><div className="se-nav-icon">👤</div>Account</div>
                  </div>
                </div>

                <div className="app-screen screen-tutors" id="screen-2">
                  <div className="st-title">3 Teachers Found</div>
                  <div className="tutor-card">
                    <div className="tutor-top">
                      <div className="tutor-avatar" style={{background: 'linear-gradient(135deg,#1a82ff,#00c6fb)'}}>N</div>
                      <div className="tutor-info">
                        <div className="tutor-name">Nikhil</div>
                        <div className="tutor-meta">🎓 <span>NERIST</span> · 💼 <span>5 yrs exp</span></div>
                      </div>
                    </div>
                    <button className="tutor-msg-btn">💬 Message</button>
                  </div>
                  <div className="tutor-card">
                    <div className="tutor-top">
                      <div className="tutor-avatar" style={{background: 'linear-gradient(135deg,#2da05a,#34c37a)'}}>J</div>
                      <div className="tutor-info">
                        <div className="tutor-name">Joe</div>
                        <div className="tutor-meta">🎓 <span>NERIST</span> · 💼 <span>5 yrs exp</span></div>
                      </div>
                    </div>
                    <button className="tutor-msg-btn">💬 Message</button>
                  </div>
                  <div className="tutor-card">
                    <div className="tutor-top">
                      <div className="tutor-avatar" style={{background: 'linear-gradient(135deg,#d4376e,#e8507e)'}}>S</div>
                      <div className="tutor-info">
                        <div className="tutor-name">Shubro</div>
                        <div className="tutor-meta">🎓 <span>NERIST</span> · 💼 <span>6 yrs exp</span></div>
                      </div>
                    </div>
                    <button className="tutor-msg-btn">💬 Message</button>
                  </div>
                  <div className="se-bottom-nav">
                    <div className="se-nav-item"><div className="se-nav-icon">💬</div>Messages</div>
                    <div className="se-nav-item active"><div className="se-nav-icon">🧭</div>Explore</div>
                    <div className="se-nav-item"><div className="se-nav-icon">👤</div>Account</div>
                  </div>
                </div>

                <div className="app-screen screen-profile" id="screen-3">
                  <div className="sp-title">My Profile</div>
                  <div className="sp-card sp-profile-card">
                    <div className="sp-avatar">👤</div>
                    <div>
                      <div className="sp-name">Nikhil</div>
                      <div className="sp-phone">📞 +91 70045 XXXXX</div>
                    </div>
                  </div>
                  <div className="sp-card sp-premium-card">
                    <div className="sp-premium-badge">✨ PREMIUM ACTIVE</div>
                    <div className="sp-premium-title">You're a Premium Member! ✨</div>
                    <div className="sp-premium-meta">📅 Valid until: Lifetime<br/>ℹ️ Status: ACTIVE</div>
                  </div>
                  <div className="se-bottom-nav">
                    <div className="se-nav-item"><div className="se-nav-icon">💬</div>Messages</div>
                    <div className="se-nav-item"><div className="se-nav-icon">🧭</div>Explore</div>
                    <div className="se-nav-item active"><div className="se-nav-icon">👤</div>Account</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="features">
        <p className="features-eyebrow reveal">Built for students & teachers</p>
        <h2 className="features-title reveal">Everything you need.<br/>Nothing you don't.</h2>
        <p className="features-sub reveal">Find My Tutor brings students and tutors together in one simple, powerful app.</p>

        <div className="features-grid">
          <div className="feature-tile reveal">
            <span className="feature-icon">📍</span>
            <div className="feature-title">Find Near You</div>
            <div className="feature-desc">Set your search radius and discover verified tutors in your neighborhood. As close as 1km away.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">🔍</span>
            <div className="feature-title">Filter by Subject</div>
            <div className="feature-desc">Maths, Science, English, Physics and 10+ more. Find exactly the expertise you need.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">💬</span>
            <div className="feature-title">Message Instantly</div>
            <div className="feature-desc">Direct messaging between students and tutors. No third party. No commission. Just connect.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">🎓</span>
            <div className="feature-title">For Tutors Too</div>
            <div className="feature-desc">List your profile, set your subjects, and let students find you. Build your student base effortlessly.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">✨</span>
            <div className="feature-title">Premium — ₹49/mo</div>
            <div className="feature-desc">Unlock all features for the price of a chai. Available on Android via Razorpay and iOS via Apple Pay.</div>
          </div>
          <div className="feature-tile reveal">
            <span className="feature-icon">🏫</span>
            <div className="feature-title">Advertise Your Institute</div>
            <div className="feature-desc">Schools, coaching centres, and study hubs can reach students and parents directly through the app.</div>
          </div>
        </div>
      </section>

      <section id="founder">
        <p className="founder-eyebrow reveal">The story behind it</p>
        <h2 className="founder-title reveal">Built from a<br/>real problem.</h2>

        <div className="founder-card reveal">
          <p className="founder-quote" style={{ fontFamily: 'var(--font-body)' }}>
            I built Find My Tutor because I saw the problem firsthand — <em style={{ fontFamily: 'var(--font-heading)' }}>students in smaller cities struggling to find the right teacher</em>, and talented tutors with no way to reach the students who needed them. Every search meant WhatsApp groups, word of mouth, and dead ends.
            <br/><br/>
            So I built the bridge. A simple way for students to find tutors nearby by subject, and for teachers to be discovered by the students they're meant to teach.
            <br/><br/>
            Find My Tutor is built by someone who's been on <em style={{ fontFamily: 'var(--font-heading)' }}>both sides of that gap</em> — and refused to accept it had to stay that way.
          </p>
          <div className="founder-sig">
            <div className="founder-avatar">N</div>
            <div>
              <div className="founder-name">Nikhil</div>
              <div className="founder-role">Founder · NERIST, Arunachal Pradesh</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" style={{ borderBottom: 'none' }}>
        <h2 className="contact-title reveal">Get in touch.</h2>
        <p className="contact-sub reveal">Have feedback, suggestions, or just want to say hi?</p>
        <p className="contact-sub2 reveal">Join our WhatsApp community to connect directly and help shape the future of Find My Tutor. For anything else, reach me directly.</p>
        <div className="contact-buttons reveal">
          <a href="#" className="btn-whatsapp">💬 Join WhatsApp Community</a>
          <a href="mailto:mailfindmytutor@gmail.com" className="btn-outline-claude">✉️ Email Me</a>
        </div>
      </section>
    </main>
  );
}
`;

appCode = appCode.replace(regex, newHome);
fs.writeFileSync(appPath, appCode);
console.log('Successfully updated App.jsx and index.css');

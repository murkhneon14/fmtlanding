import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, MessageCircle, Mail } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable any smooth scrolling in the document globally before jumping
    document.documentElement.style.scrollBehavior = 'auto';

    // Force the jump without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    // Restore the styling back in the next tick
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 10);
  }, [pathname]);

  return null;
}

function Home() {
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
      // Dynamic mobile scaling
      let baseScale = 1;
      if (window.innerWidth <= 600) { baseScale = 0.75; }
      const scale = lerp(0.82 * baseScale, 1 * baseScale, easeOut(tiltProgress));
      const translateY = lerp(60, 0, easeOut(tiltProgress));

      const floatPhase = p > 0.25 ? (p - 0.25) / 0.75 : 0;
      const sway = Math.sin(floatPhase * Math.PI * 2) * 4;

      iphone.style.transform = `perspective(1200px) rotateX(${tiltDeg}deg) scale(${scale}) translateY(${translateY}px) translateX(${sway}px)`;

      if (p > 0.25) {
        const screenProgress = (p - 0.25) / 0.75;
        const screenIdx = Math.min(Math.floor(screenProgress * TOTAL), TOTAL - 1);

        screens.forEach((s, i) => {
          if (i === screenIdx) {
            s.classList.add('active');
            s.style.opacity = '1';
            s.style.zIndex = '5';
          } else {
            s.classList.remove('active');
            s.style.opacity = '0';
            s.style.zIndex = '1';
          }
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
      el.style.transitionDelay = `${i * 0.07}s`;
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <section id="hero">

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', animation: 'fadeUp 0.8s ease both' }}>
          <div className="hero-eyebrow" style={{ marginBottom: 0, animation: 'none' }}>
            <div className="hero-eyebrow-dot"></div>
            Live on Play Store
          </div>
          <div className="hero-eyebrow" style={{ marginBottom: 0, animation: 'none' }}>
            <img src="/app-store.svg" alt="App Store" style={{ width: '16px', height: '16px', borderRadius: '4px' }} />
            Launching Soon
          </div>
        </div>

        <h1 className="hero-title">Find Your<br />Perfect Tutor.</h1>

        <p className="hero-sub">Connect with local tutors by subject and location — or list yourself and grow your students.</p>

        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <button className="btn-blue" onClick={() => window.open('https://play.google.com/store/apps/details?id=com.findmytutor.app', '_blank', 'noopener,noreferrer')}>Download on play store</button>
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
            <div className="screen-label" id="label-1" style={{ opacity: 0 }}>
              <div className="screen-label-title">Search near you.</div>
              <div className="screen-label-sub">Set your radius. Find tutors within kilometers.</div>
            </div>
            <div className="screen-label" id="label-2" style={{ opacity: 0 }}>
              <div className="screen-label-title">Connect instantly.</div>
              <div className="screen-label-sub">Message tutors directly. No middleman.</div>
            </div>
            <div className="screen-label" id="label-3" style={{ opacity: 0 }}>
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
                    <div className="se-title"><span style={{ color: "var(--brand-blue)" }}>Find My Tutor</span></div>
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
                      <div className="tutor-avatar" style={{ background: 'linear-gradient(135deg,#1a82ff,#00c6fb)' }}>N</div>
                      <div className="tutor-info">
                        <div className="tutor-name">Nikhil</div>
                        <div className="tutor-meta">🎓 <span>NERIST</span> · 💼 <span>5 yrs exp</span></div>
                      </div>
                    </div>
                    <button className="tutor-msg-btn">💬 Message</button>
                  </div>
                  <div className="tutor-card">
                    <div className="tutor-top">
                      <div className="tutor-avatar" style={{ background: 'linear-gradient(135deg,#2da05a,#34c37a)' }}>J</div>
                      <div className="tutor-info">
                        <div className="tutor-name">Joe</div>
                        <div className="tutor-meta">🎓 <span>NERIST</span> · 💼 <span>5 yrs exp</span></div>
                      </div>
                    </div>
                    <button className="tutor-msg-btn">💬 Message</button>
                  </div>
                  <div className="tutor-card">
                    <div className="tutor-top">
                      <div className="tutor-avatar" style={{ background: 'linear-gradient(135deg,#d4376e,#e8507e)' }}>S</div>
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
                    <div className="sp-premium-meta">📅 Valid until: Lifetime<br />ℹ️ Status: ACTIVE</div>
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
        <h2 className="features-title reveal">Everything you need.<br />Nothing you don't.</h2>
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
    </main>
  );
}

function AboutPage() {
  return (
    <section className="about-section" style={{ minHeight: '80vh' }}>
      <div className="about-container">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="about-heading"
        >
          About
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="about-text"
        >
          Find My Tutor is a reliable learning platform designed to connect students and parents with qualified academic tutors and skill-based mentors. From academic subjects to specialized skills like music, baking, and more, learners can easily find and connect with the right educators based on their needs. Guided by our belief, "Discover the Mentor Within Your Reach," we make it easier for learners to access trusted guidance and begin their learning journey with confidence.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="about-heading"
          style={{ marginTop: '3.5rem' }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="about-text"
        >
          To provide reliable and accessible tutoring services while empowering educators to inspire, guide, and support student success.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="about-heading"
          style={{ marginTop: '3.5rem' }}
        >
          Our Vision
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="about-text"
        >
          To become a trusted educational network that connects learners and educators. strengthening communities through accessible and quality education.
        </motion.p>
      </div>
    </section>
  );
}

function FounderPage() {
  return (
    <section className="about-section" style={{ minHeight: '80vh' }}>
      <div className="about-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-title"
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', marginBottom: '3rem' }}
        >
          Founder story
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ width: '100%', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: '100%', maxWidth: '600px', aspectRatio: '4/5', background: '#e5e7eb', borderRadius: '24px', overflow: 'hidden' }}>
            <img
              src="/tana-john.jpeg"
              alt="Tana John"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; e.target.parentElement.innerHTML = '<span style="color: #9ca3af; font-family: var(--font-heading)">Please place tana-john.jpeg in the public folder</span>'; }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: '100%', textAlign: 'center', marginBottom: '3rem' }}
        >
          <h3 className="about-heading" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Tana John</h3>
          <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.2rem', fontWeight: '500' }}>CEO & MD</p>
          <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>NERIST Alumnus (Postgraduate)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ width: '100%' }}
        >
          <p className="about-text">
            I built Find My Tutor after seeing the struggle up close — students in smaller cities searching endlessly for the right guidance, and skilled tutors waiting to be discovered. Finding a teacher meant relying on Internet, Facebook, WhatsApp groups, referrals, and often running into dead ends.
          </p>
          <p className="about-text" style={{ marginTop: '1.5rem' }}>
            So I decided to change that.
          </p>
          <p className="about-text" style={{ marginTop: '1.5rem' }}>
            I created a simple platform where students can easily find tutors nearby based on their needs, and teachers can connect with the students who are looking for them.
          </p>
          <p className="about-text" style={{ marginTop: '1.5rem' }}>
            Find My Tutor is built by someone who understands both sides of the gap — and chose to turn that challenge into a solution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="about-section" style={{ minHeight: '85vh', alignItems: 'center' }}>
      <div className="about-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-title"
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', marginBottom: '3.5rem' }}
        >
          Get in touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ width: '100%', maxWidth: '900px', marginBottom: '4rem' }}
        >
          <p className="about-text" style={{ textAlign: 'center' }}>
            Have feedback, suggestions, or just want to say hi? Join our WhatsApp community to connect directly and help shape the future of Find My Tutor.
          </p>
          <p className="about-text" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            For anything else, you can reach me directly using the button below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className="btn-black" onClick={() => window.open('https://chat.whatsapp.com/Bei1HqH5pvHJqdl1R8Yba3', '_blank', 'noopener,noreferrer')} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MessageCircle size={18} /> Join WhatsApp Community
          </button>
          <button className="btn-outline" onClick={() => window.location.href = 'mailto:mailfindmytutor@gmail.com'} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={18} /> Email Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function TermsOfService() {
  return (
    <section className="about-section" style={{ minHeight: '80vh', paddingBottom: '6rem' }}>
      <div className="about-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Terms of Service</h2>
        <p className="about-text" style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '3rem' }}>Last updated: April 6th, 2026</p>

        <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>FIND MY TUTOR MOBILE APPLICATION – TERMS OF SERVICE</p>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>PLEASE READ THESE LICENCE TERMS CAREFULLY</p>
          <p style={{ marginBottom: '2.5rem' }}>BY USING THIS APP YOU AGREE TO THESE TERMS WHICH WILL BIND YOU. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THIS APP.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Who We Are and what this agreement does</h3>
          <p style={{ marginBottom: '1rem' }}>We are the developer of Find My Tutor (“Find My Tutor”, “we”, or “our”), operating from near The Family Store, Lekhi Village, Naharlagun, Arunachal Pradesh 791110, India. We license you to use:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Find My Tutor mobile application software, the data supplied with the software and any updates or supplements to it (App).</li>
            <li style={{ marginBottom: '0.5rem' }}>The related online OR electronic documentation (Documentation).</li>
            <li style={{ marginBottom: '0.5rem' }}>The Find My Tutor service you connect to via the App and the content we provide to you through it (Service).</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>to the extent expressly permitted in these terms.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Your privacy</h3>
          <p style={{ marginBottom: '1rem' }}>Under applicable data protection laws, we are required to provide you with certain information including who we are, how we process your personal data and for what purposes and your rights in relation to your personal data and how to exercise them. For any privacy-related queries, please contact us at mailfindmytutor@gmail.com. It is important that you read and understand how we handle your data before using the App.</p>
          <p style={{ marginBottom: '1.5rem' }}>Where specific services made available through the App are subject to additional or different privacy terms, those terms will be made available to you at the point you use those services.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Other terms that may apply to you</h3>
          <p style={{ marginBottom: '1rem' }}>The App may include features that allow you to access third-party websites or services. Find My Tutor does not control and is not responsible for those websites or any cookies, trackers, or data practices used by them.</p>
          <p style={{ marginBottom: '1rem' }}>If you choose to use optional paid features or services using the App, the terms governing those purchases will apply at the time of purchase. Certain features of the App may require a paid subscription or one-time purchase.</p>
          <p style={{ marginBottom: '1.5rem' }}>You are not required to purchase a subscription or any paid feature in order to continue using the core functionality of the App, unless clearly stated at the time.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Additional terms for specific Services</h3>
          <p style={{ marginBottom: '1rem' }}>Certain features of the App may rely on or integrate with third-party services. Where you access or use such services, your use may be subject to additional terms and privacy policies provided by the relevant third party. Find My Tutor does not control these third-party terms and is not responsible for the content, functionality, or data practices of third-party services.</p>
          <p style={{ marginBottom: '1rem' }}>This includes, where applicable:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Third-party payment or communication services accessed at your request.</li>
            <li style={{ marginBottom: '0.5rem' }}>App Store platforms and payment providers.</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>App Store terms also apply</h3>
          <p style={{ marginBottom: '1.5rem' }}>If you downloaded the App from Google Play Store or Apple App Store, your use of the App is also subject to the respective platform’s Terms and Conditions and any applicable rules and policies. The platform provider is not responsible for the App, its content, maintenance, support, or any claims relating to the App except to the extent required under applicable law or platform terms.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Operating system requirements</h3>
          <p style={{ marginBottom: '1.5rem' }}>The App requires a device running a supported version of Android or iOS, as specified in the respective app store listing. Certain features may require later versions of the operating system or specific hardware capabilities. You may need to update your device’s operating system to continue using the App.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Support for the App and how to tell us about problems</h3>
          <p style={{ marginBottom: '1rem' }}><strong>Support.</strong> We may provide support resources for the App from time to time, including through in-app resources. We do not guarantee continuous or immediate support and may update, suspend, or discontinue support at any time.</p>
          <p style={{ marginBottom: '1rem' }}><strong>Contacting us.</strong> If you experience problems with the App, discover a bug, or wish to contact us for any other reason, you can email us at mailfindmytutor@gmail.com. We aim to review messages within a reasonable time but do not guarantee response times.</p>
          <p style={{ marginBottom: '1.5rem' }}><strong>How we will communicate with you.</strong> If we need to contact you, we may do so by email or through in-app messages using the contact details you have provided to us.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>How you may use the App</h3>
          <p style={{ marginBottom: '1rem' }}>In return for your agreeing to comply with these terms you may:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>download, install, and use the App on devices that you own or control, in accordance with the rules and policies of the app store from which you downloaded the App;</li>
            <li style={{ marginBottom: '0.5rem' }}>view, use and display the App and the Service on such devices for your personal, non-commercial purposes only;</li>
            <li style={{ marginBottom: '0.5rem' }}>use any Documentation to support your permitted use of the App and the Service; and</li>
            <li style={{ marginBottom: '0.5rem' }}>receive and use any free supplementary software code or update of the App incorporating patches and corrections of errors as we may provide to you.</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Account Security</h3>
          <p style={{ marginBottom: '1.5rem' }}>If you create an account for the App, you are responsible for keeping your login details and any authentication credentials secure and confidential. You are also responsible for activity carried out through your account unless caused by our failure to take reasonable security measures.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Age Requirements</h3>
          <p style={{ marginBottom: '1rem' }}>You must be at least 18 years old to accept these Terms on your own behalf. If you are under 18, you may only use the App with the involvement and consent of your parent or legal guardian, who must accept these Terms on your behalf and is responsible for your use of the App.</p>
          <p style={{ marginBottom: '1.5rem' }}>The App is not intended for and must not be used by children under the age of 13.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>You may not transfer the App to someone else</h3>
          <p style={{ marginBottom: '1.5rem' }}>We grant you a personal, non-transferable licence to use the App and the Services in accordance with these Terms. You may not sell, rent, lease, sublicense, or otherwise transfer the App or your rights to use it to any other person. If you sell or dispose of any device on which the App is installed, you must remove the App from that device.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Changes to these terms</h3>
          <p style={{ marginBottom: '1.5rem' }}>We may update these Terms from time to time to reflect changes in the App or Services, changes in law or regulation, or to improve clarity and functionality. If a change materially affects your rights or obligations, we will give you reasonable advance notice, for example by notifying you in the App or by email. If you do not agree to the updated Terms, you must stop using the App.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Updates to the App and changes to the Service</h3>
          <p style={{ marginBottom: '1rem' }}>From time to time, we may automatically update the App and change, modify, suspend, or discontinue parts of the Service to improve performance, enhance functionality, address security issues, or comply with legal or regulatory requirements.</p>
          <p style={{ marginBottom: '1.5rem' }}>The App and Services are provided on an evolving basis. We do not represent, warrant, or guarantee that the App or Services will be available at all times, without interruption, or error free.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Licence restrictions</h3>
          <p style={{ marginBottom: '1rem' }}>You agree that you will:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>not rent, lease, sub-license, loan, provide, or otherwise make available the App or the Services in any form to any person without prior written consent from us;</li>
            <li style={{ marginBottom: '0.5rem' }}>not copy the App, Documentation or Services, except as part of the normal use of the App or where it is necessary for the purpose of back-up or operational security;</li>
            <li style={{ marginBottom: '0.5rem' }}>not translate, merge, adapt, vary, alter or modify, the whole or any part of the App, Documentation or Services;</li>
            <li style={{ marginBottom: '0.5rem' }}>not disassemble, de-compile, reverse engineer or create derivative works based on the whole or any part of the App or the Services;</li>
            <li style={{ marginBottom: '0.5rem' }}>not use the App or Services to develop, train, test, or improve a competing product or service;</li>
            <li style={{ marginBottom: '0.5rem' }}>not use automated tools, scripts, bots, or scraping techniques to access or interact with the App or Services without our prior written consent;</li>
            <li style={{ marginBottom: '0.5rem' }}>comply with all applicable technology control or export laws and regulations that apply to the technology used or supported by the App or any Service.</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Acceptable use restrictions</h3>
          <p style={{ marginBottom: '1rem' }}>You must:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>not use the App or any Service in any unlawful manner, for any unlawful purpose, or in any manner inconsistent with these terms;</li>
            <li style={{ marginBottom: '0.5rem' }}>not infringe our intellectual property rights or those of any third party in relation to your use of the App or any Service;</li>
            <li style={{ marginBottom: '0.5rem' }}>not transmit, submit, or generate any material that is defamatory, misleading, offensive, abusive, discriminatory, or otherwise objectionable;</li>
            <li style={{ marginBottom: '0.5rem' }}>not use the App or any Service in a way that could damage, disable, overburden, impair, or compromise our systems or security;</li>
            <li style={{ marginBottom: '0.5rem' }}>not collect, scrape, harvest, or extract any information or data from the App or any Service using automated means.</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Intellectual property rights</h3>
          <p style={{ marginBottom: '1.5rem' }}>All intellectual property rights in the App, the Documentation and the Services throughout the world belong to us (or our licensors) and the rights in the App and the Services are licensed (not sold) to you. You have no intellectual property rights in, or to, the App, the Documentation or the Services other than the right to use them in accordance with these terms.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>User-Generated Content</h3>
          <p style={{ marginBottom: '1rem' }}>The App allows you to create, upload, or submit content, including profile information, messages, and other materials (“User Content”).</p>
          <p style={{ marginBottom: '1rem' }}><strong>Ownership.</strong> You retain all intellectual property rights in your User Content. Nothing in these terms transfers ownership of your content to Find My Tutor.</p>
          <p style={{ marginBottom: '1rem' }}><strong>Licence to Find My Tutor.</strong> By using the App, you grant Find My Tutor a limited, non-exclusive, non-transferable, royalty-free licence to host, store, process, transmit, and display your User Content solely for the purpose of providing and operating the App and the Services.</p>
          <p style={{ marginBottom: '1.5rem' }}><strong>Responsibility for User Content.</strong> You are responsible for the content you submit through the App and for ensuring that you have the necessary rights to submit it. We may remove or disable access to User Content where we reasonably believe it may infringe the rights of a third party or breach these Terms.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Our responsibility for loss or damage suffered by you</h3>
          <p style={{ marginBottom: '1rem' }}>We are responsible to you for foreseeable loss and damage caused by us. We are not responsible for any loss or damage that is not foreseeable.</p>
          <p style={{ marginBottom: '1rem' }}>We do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or for fraud or fraudulent misrepresentation.</p>
          <p style={{ marginBottom: '1.5rem' }}>The App is provided for personal use. If you use the App for any commercial or resale purpose we will have no liability to you for any loss of profit, loss of business, or business interruption.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Our Maximum Liability to You</h3>
          <p style={{ marginBottom: '1.5rem' }}>Subject always to any liability which it is unlawful to limit or exclude, our total aggregate liability to you under or in connection with this agreement, the App and/or the Services shall in no circumstances exceed an amount equal to the higher of: INR 500 (five hundred Indian rupees); and the total sums (if any) you have paid to us for use of the App and the Services in the 12 month period immediately preceding the date of the event which caused the liability.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>We may end your rights to use the App and the Services</h3>
          <p style={{ marginBottom: '1.5rem' }}>We may suspend or end your right to use the App and the Services if you seriously breach these terms. If we end your rights to use the App and Services you must stop all activities authorised by these terms, including your use of the App and any Services.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>We may transfer this agreement to someone else</h3>
          <p style={{ marginBottom: '1.5rem' }}>We may transfer our rights and obligations under these terms to another organisation. If this happens, we will notify you and ensure that the transfer does not reduce your rights under these terms.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>If a court finds part of this contract illegal, the rest will continue in force</h3>
          <p style={{ marginBottom: '1.5rem' }}>Each provision of these terms operates separately. If any court or relevant authority decides that any provision is unlawful, the remaining provisions will continue in full force and effect.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Which laws apply to this agreement</h3>
          <p style={{ marginBottom: '1.5rem' }}>These terms are governed by the laws of India. Any disputes arising under or in connection with these terms shall be subject to the jurisdiction of the courts of Arunachal Pradesh, India.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Contact Us</h3>
          <p style={{ marginBottom: '0.5rem' }}>If you have questions or concerns, please contact us:</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> mailfindmytutor@gmail.com</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> Near The Family Store, Lekhi Village, Naharlagun, Arunachal Pradesh 791110, India</p>
          <p style={{ marginBottom: '1.5rem' }}>Please do not send routine enquiries to our registered office address.</p>
        </div>
      </div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <section className="about-section" style={{ minHeight: '80vh', paddingBottom: '6rem' }}>
      <div className="about-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Privacy Policy</h2>
        <p className="about-text" style={{ fontSize: '0.9rem', textAlign: 'center', marginBottom: '3rem' }}>Last updated: April 6th, 2026</p>

        <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>This Privacy Policy explains how Find My Tutor (“Find My Tutor”, “we”, “us”, or “our”) collects, uses, and protects personal data when you use the Find My Tutor mobile application and related services (the “App”). Find My Tutor is a tutoring marketplace that connects students with local tutors across India.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Who We Are</h3>
          <p style={{ marginBottom: '1rem' }}>Find My Tutor is operated by an individual developer based in India. Our registered address is near The Family Store, Lekhi Village, Naharlagun, Arunachal Pradesh 791110, India.</p>
          <p style={{ marginBottom: '1rem' }}>We act as the data controller, meaning we determine how and why your personal data is processed.</p>
          <p style={{ marginBottom: '1.5rem' }}><strong>Contact email:</strong> mailfindmytutor@gmail.com</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Data Collection & Use</h3>
          <p style={{ marginBottom: '1rem' }}>When you create or use an account, we may collect:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Name (first name and last name, where you choose to provide it)</li>
            <li style={{ marginBottom: '0.5rem' }}>Phone number (used for login and account verification)</li>
            <li style={{ marginBottom: '0.5rem' }}>Email address (if provided)</li>
            <li style={{ marginBottom: '0.5rem' }}>Institution or college name (e.g. NERIST)</li>
            <li style={{ marginBottom: '0.5rem' }}>Subjects taught or studied</li>
            <li style={{ marginBottom: '0.5rem' }}>Years of experience (for tutors)</li>
            <li style={{ marginBottom: '0.5rem' }}>Account authentication data</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>This data is used to:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Create and manage user accounts</li>
            <li style={{ marginBottom: '0.5rem' }}>Authenticate access to the App</li>
            <li style={{ marginBottom: '0.5rem' }}>Display tutor profiles to students searching for help</li>
            <li style={{ marginBottom: '0.5rem' }}>Enable students and tutors to connect and message each other</li>
            <li style={{ marginBottom: '0.5rem' }}>Personalise your profile and user experience</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>User Content and Messaging</h3>
          <p style={{ marginBottom: '1.5rem' }}>The App allows students and tutors to send messages to each other. Message content is stored to enable communication between users. We do not read or sell your messages. Messages may be retained for a reasonable period to support dispute resolution and app safety.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Location Data</h3>
          <p style={{ marginBottom: '1rem' }}>The App uses your device location (with your permission) to help students find tutors near them. Specifically:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Your approximate location coordinates are used to calculate distance between students and tutors.</li>
            <li style={{ marginBottom: '0.5rem' }}>Tutors’ locations are stored to enable location-based search.</li>
            <li style={{ marginBottom: '0.5rem' }}>We do not share your precise location with third parties for advertising purposes.</li>
            <li style={{ marginBottom: '0.5rem' }}>Location access can be revoked at any time through your device settings.</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Device and Technical Data</h3>
          <p style={{ marginBottom: '1rem' }}>We may automatically collect technical information to ensure the App functions reliably, including:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Device type and operating system</li>
            <li style={{ marginBottom: '0.5rem' }}>Application version</li>
            <li style={{ marginBottom: '0.5rem' }}>Network and connection information</li>
            <li style={{ marginBottom: '0.5rem' }}>Crash reports and error logs</li>
            <li style={{ marginBottom: '0.5rem' }}>App performance and reliability metrics</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Payments and Subscriptions</h3>
          <p style={{ marginBottom: '1rem' }}>Find My Tutor offers a premium subscription at ₹49 per month. Payment processing is handled as follows:</p>
          <p style={{ marginBottom: '1rem' }}><strong>On Android (Google Play Store):</strong> Payments are processed by Razorpay. When you make a payment through Razorpay, your payment details are handled directly by Razorpay in accordance with their privacy policy and PCI-DSS compliance standards. We do not receive or store your full payment card details. We receive only confirmation of payment status and subscription details necessary to unlock premium features.</p>
          <p style={{ marginBottom: '1rem' }}><strong>On iOS (Apple App Store):</strong> Payments are processed using Apple In-App Purchase. Your payment details are handled directly by Apple in accordance with Apple’s privacy policy and terms. We do not receive or store your full payment card details. We receive only confirmation of your subscription status from Apple.</p>
          <p style={{ marginBottom: '1rem' }}>Information we may receive from payment providers includes:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Transaction identifiers</li>
            <li style={{ marginBottom: '0.5rem' }}>Subscription status (active, expired, cancelled)</li>
            <li style={{ marginBottom: '0.5rem' }}>Purchase date and renewal information</li>
            <li style={{ marginBottom: '0.5rem' }}>Product identifiers</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>This information is used solely to verify your subscription and provide access to premium features.</p>
          <p style={{ marginBottom: '1.5rem' }}>Find My Tutor does not use payment data for advertising or share it with unrelated third parties.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Advertising</h3>
          <p style={{ marginBottom: '1.5rem' }}>Find My Tutor allows educational institutions, coaching centres, and study-related businesses to advertise within the App. If you choose to advertise through the App, we collect your business name and contact number for display purposes. We do not use student or tutor personal data for third-party behavioural advertising.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Third-Party Sharing</h3>
          <p style={{ marginBottom: '1rem' }}>We may share limited data with service providers that help us operate the App. These may include:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Supabase – for authentication, account management, and database services.</li>
            <li style={{ marginBottom: '0.5rem' }}>Razorpay – for payment processing on Android. Razorpay processes payments in accordance with RBI guidelines and PCI-DSS standards.</li>
            <li style={{ marginBottom: '0.5rem' }}>Apple – for in-app purchase processing on iOS.</li>
            <li style={{ marginBottom: '0.5rem' }}>Firebase or similar – for crash reporting and diagnostics (if used).</li>
            <li style={{ marginBottom: '0.5rem' }}>Infrastructure and hosting providers – that help us host, secure, and deliver the App.</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>These providers act as data processors and process data only as necessary to provide their services. We do not sell personal data to third parties.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Data Storage and Security</h3>
          <p style={{ marginBottom: '1rem' }}>Your data is stored on secure servers. We implement appropriate technical and organisational measures to protect personal data, including:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Access control systems</li>
            <li style={{ marginBottom: '0.5rem' }}>Encryption in transit (HTTPS)</li>
            <li style={{ marginBottom: '0.5rem' }}>Restricted internal access to data</li>
            <li style={{ marginBottom: '0.5rem' }}>Secure infrastructure hosting</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>No system is completely secure, but we take reasonable steps to protect your information. You are responsible for keeping your login credentials secure.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Data Retention</h3>
          <p style={{ marginBottom: '1rem' }}>We retain personal data only for as long as necessary:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Account data: Retained while your account is active and for a reasonable period after deletion for legal and dispute purposes.</li>
            <li style={{ marginBottom: '0.5rem' }}>Messages: Retained to support communication history between users, and may be deleted upon account deletion.</li>
            <li style={{ marginBottom: '0.5rem' }}>Payment records: Retained as required for financial and legal compliance.</li>
            <li style={{ marginBottom: '0.5rem' }}>Crash and diagnostic data: Up to 90 days.</li>
            <li style={{ marginBottom: '0.5rem' }}>Location data: Not stored beyond what is needed for search functionality.</li>
          </ul>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Your Rights</h3>
          <p style={{ marginBottom: '1rem' }}>As a user in India, you have the following rights regarding your personal data:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Access the personal data we hold about you</li>
            <li style={{ marginBottom: '0.5rem' }}>Request correction of inaccurate data</li>
            <li style={{ marginBottom: '0.5rem' }}>Request deletion of your personal data</li>
            <li style={{ marginBottom: '0.5rem' }}>Withdraw consent for optional data processing</li>
            <li style={{ marginBottom: '0.5rem' }}>Object to certain types of processing</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>To exercise these rights, contact us at: mailfindmytutor@gmail.com. We will respond within a reasonable time.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Children & Young Users</h3>
          <p style={{ marginBottom: '1rem' }}>The App may be used by students of all ages. We do not knowingly collect personal data from children under the age of 13 without appropriate parental consent. If you believe a child under 13 has provided us with personal data without consent, please contact us and we will take steps to delete that information.</p>
          <p style={{ marginBottom: '1.5rem' }}>Users under 18 should use the App with the awareness of their parent or guardian.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>WhatsApp Community</h3>
          <p style={{ marginBottom: '1.5rem' }}>We may operate a WhatsApp community for users of Find My Tutor. If you join our WhatsApp community, your phone number will be visible to community members. WhatsApp is a third-party service operated by Meta and subject to their own privacy policy. We do not control WhatsApp’s data practices.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Changes to This Policy</h3>
          <p style={{ marginBottom: '1.5rem' }}>We may update this Privacy Policy as the App evolves. If we make significant changes, we will notify you through the App or by email. Continued use of the App after changes are published constitutes acceptance of the updated policy.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Applicable Law</h3>
          <p style={{ marginBottom: '1.5rem' }}>This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000 and applicable rules thereunder, and the Digital Personal Data Protection Act, 2023 (once in force). Any disputes arising under this policy shall be subject to the jurisdiction of courts in Arunachal Pradesh, India.</p>

          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>Contact Us</h3>
          <p style={{ marginBottom: '0.5rem' }}>If you have questions about this Privacy Policy or how your data is handled, please contact:</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> mailfindmytutor@gmail.com</p>
          <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> Near The Family Store, Lekhi Village, Naharlagun, Arunachal Pradesh 791110, India</p>
          <p style={{ marginBottom: '1.5rem' }}>Please do not send routine enquiries to our registered office address.</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/" className="logo-container">
              <img src="/logo.jpg" alt="Logo" style={{ width: 26, height: 26, borderRadius: 6, objectFit: 'contain' }} />
              FindMyTutor
            </Link>
            <div className="nav-divider"></div>
            <div className="nav-links">
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/founder" className="nav-link">Founder</Link>
              <Link to="/contact" className="nav-link">Contact Us</Link>
            </div>
          </div>

          <div className="nav-right">
            <span className="early-access-text">iphone early access?</span>
            <button className="btn-blue" onClick={() => window.open('https://testflight.apple.com/join/gxEWKKVY', '_blank', 'noopener,noreferrer')}>Download Beta</button>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* Footer */}
      <footer>
        <div className="footer-left">
          Find My Tutor 2026
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <Link to="/terms-of-service" className="footer-link">terms of service</Link>
            <Link to="/privacy-policy" className="footer-link">privacy policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

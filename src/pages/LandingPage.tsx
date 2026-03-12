import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas animation with particles, QR shapes, connecting lines, pulse rings, and circle orbits
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    function resize() {
      if (!cvs) return;
      W = cvs.width = cvs.offsetWidth;
      H = cvs.height = cvs.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initNodes(); });

    class Particle {
      x: number; y: number; vx: number; vy: number; r: number; phase: number; speed: number;
      isQR: boolean; color: string; alpha: number; size: number;
      constructor() { this.reset(true); }
      reset(init: boolean) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : (Math.random() > .5 ? -10 : H + 10);
        this.vx = (Math.random() - .5) * .35;
        this.vy = (Math.random() - .5) * .35;
        this.r = Math.random() * 2 + 1;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * .02 + .01;
        this.isQR = Math.random() > .72;
        this.color = ['#38bdf8', '#818cf8', '#34d399', '#f59e0b'][Math.floor(Math.random() * 4)];
        this.alpha = Math.random() * .5 + .15;
        this.size = this.isQR ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.phase += this.speed;
        if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) this.reset(false);
      }
      draw() {
        if (!ctx) return;
        const pulse = Math.sin(this.phase) * .3 + .7;
        ctx.globalAlpha = this.alpha * pulse;
        if (this.isQR) {
          const s = this.size;
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x - s, this.y - s, s * 2, s * 2);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = .6;
          ctx.strokeRect(this.x - s * 2.4, this.y - s * 2.4, s * 4.8, s * 4.8);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    let particles: Particle[] = [];
    function initNodes() { particles = Array.from({ length: 70 }, () => new Particle()); }
    initNodes();

    interface PulseRing { x: number; y: number; r: number; maxR: number; color: string; life: number; }
    let pulseRings: PulseRing[] = [];
    function spawnRing() {
      pulseRings.push({
        x: Math.random() * W, y: Math.random() * H, r: 0, maxR: 60 + Math.random() * 80,
        color: ['#38bdf8', '#818cf8', '#34d399'][Math.floor(Math.random() * 3)], life: 0
      });
    }
    const ringInterval = setInterval(spawnRing, 900);

    // Circle orbits
    interface Orbit { cx: number; cy: number; radius: number; angle: number; speed: number; color: string; }
    const orbits: Orbit[] = [
      { cx: W * 0.2, cy: H * 0.3, radius: 80, angle: 0, speed: 0.008, color: '#38bdf8' },
      { cx: W * 0.7, cy: H * 0.6, radius: 100, angle: Math.PI, speed: 0.006, color: '#818cf8' },
      { cx: W * 0.5, cy: H * 0.8, radius: 60, angle: Math.PI / 2, speed: 0.01, color: '#34d399' }
    ];

    function drawLines() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * .12;
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = .7;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      
      // Pulse rings
      pulseRings = pulseRings.filter(p => p.r < p.maxR);
      pulseRings.forEach(p => {
        p.r += 1.4;
        ctx.globalAlpha = (1 - p.r / p.maxR) * .2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = p.color; ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      
      // Circle orbits
      orbits.forEach(orbit => {
        orbit.angle += orbit.speed;
        const x = orbit.cx + Math.cos(orbit.angle) * orbit.radius;
        const y = orbit.cy + Math.sin(orbit.angle) * orbit.radius;
        
        // Draw orbit path
        ctx.globalAlpha = 0.08;
        ctx.beginPath();
        ctx.arc(orbit.cx, orbit.cy, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color; ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw orbiting circle
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color;
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color; ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
      
      drawLines();
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      clearInterval(ringInterval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Live counter tick
  useEffect(() => {
    let pres = 82;
    const counterInterval = setInterval(() => {
      if (Math.random() > .55) {
        pres = Math.min(94, pres + 1);
        const presEl = document.getElementById('livePres');
        const rateEl = document.getElementById('liveRate');
        if (presEl) presEl.textContent = pres.toString();
        if (rateEl) rateEl.textContent = Math.round(pres / 94 * 100) + '%';
      }
    }, 2800);

    return () => clearInterval(counterInterval);
  }, []);

  // QR Grid animation
  useEffect(() => {
    const qrInterval = setInterval(() => {
      const cells = document.querySelectorAll('.qr-cell-on');
      if (cells.length > 0) {
        const c = cells[Math.floor(Math.random() * cells.length)] as HTMLElement;
        c.style.opacity = '.4';
        setTimeout(() => c.style.opacity = '1', 300);
      }
    }, 800);

    return () => clearInterval(qrInterval);
  }, []);

  // QR Timer countdown
  useEffect(() => {
    let qrTime = 28;
    const timerInterval = setInterval(() => {
      qrTime--;
      if (qrTime <= 0) {
        qrTime = 30;
        const qrEl = document.getElementById('qrTimer');
        if (qrEl) {
          qrEl.style.color = 'var(--c3)';
          setTimeout(() => qrEl.style.color = 'var(--c1)', 600);
        }
      }
      const qrEl = document.getElementById('qrTimer');
      if (qrEl) qrEl.textContent = qrTime + 's';
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Scan progress animation
  useEffect(() => {
    let sc = 3, scDir = 1;
    const scanInterval = setInterval(() => {
      sc += scDir * (Math.random() > 0.4 ? 1 : 0);
      if (sc >= 42) { sc = 42; scDir = -1; }
      if (sc <= 0) { sc = 0; scDir = 1; }
      const spEl = document.getElementById('scanProg');
      const scEl = document.getElementById('scanCount');
      if (spEl) spEl.style.width = (sc / 42 * 100) + '%';
      if (scEl) scEl.textContent = sc + ' / 42';
    }, 500);

    return () => clearInterval(scanInterval);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          const id = e.target.id;
          if (id === 'fs1' || id === 'fs2' || id === 'fs3') {
            const n = document.getElementById('sn' + id.replace('fs', ''));
            if (n) n.classList.add('active');
          }
        }
      });
    }, { threshold: .15 });

    document.querySelectorAll('.r,.r-l,.r-r,[id^="fs"]').forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  // Nav scroll
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.boxShadow = '0 8px 48px rgba(0,0,0,.5)';
        } else {
          nav.style.boxShadow = 'none';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--bg)", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        /* ─── TOKENS ─────────────────────────────── */
        :root{
          --bg:#060a12;
          --bg2:#0b1020;
          --s1:#111827;
          --s2:#1a2438;
          --s3:#1f2d42;
          --br:rgba(255,255,255,.06);
          --br2:rgba(56,189,248,.18);
          --txt:#e8edf5;
          --muted:#7a8aa8;
          --c1:#38bdf8;
          --c2:#818cf8;
          --c3:#34d399;
          --c4:#f59e0b;
          --c5:#f87171;
          --r:14px;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;overflow-x:hidden}
        body{background:var(--bg);color:var(--txt);font-family:'DM Sans',sans-serif;font-size:15px;overflow-x:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-.01em;line-height:1.5;word-wrap:break-word;overflow-wrap:break-word}
        a{text-decoration:none;color:inherit}
        img{display:block;max-width:100%}
        h1,h2,h3,h4,h5,h6{letter-spacing:-.02em;line-height:1.2;word-wrap:break-word}
        p,div,span{word-wrap:break-word;overflow-wrap:break-word}
        section,div{overflow:visible}

        /* ─── SCROLLBAR ─── */
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:var(--s3);border-radius:99px}

        /* ─── ANIMATIONS ─── */
        @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.7)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes heroFloat{0%,100%{transform:translateY(0) rotate(.5deg)}50%{transform:translateY(-14px) rotate(-.3deg)}}
        @keyframes fbFloat1{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fbFloat2{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes scanBeam{0%,100%{top:10%}50%{top:85%}}
        @keyframes barPulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes flowDown{0%{top:-60px}100%{top:100%}}

        /* ─── REVEAL ─── */
        .r{opacity:0;transform:translateY(30px);transition:opacity .65s ease,transform .65s ease}
        .r.in{opacity:1;transform:translateY(0)}
        .r-l{opacity:0;transform:translateX(-40px);transition:opacity .65s ease,transform .65s ease}
        .r-l.in{opacity:1;transform:translateX(0)}
        .r-r{opacity:0;transform:translateX(40px);transition:opacity .65s ease,transform .65s ease}
        .r-r.in{opacity:1;transform:translateX(0)}
        .step-node.active{box-shadow:0 0 0 8px rgba(56,189,248,.18),0 0 0 20px rgba(56,189,248,.07),0 8px 32px rgba(56,189,248,.4);transform:scale(1.1)}
        .flow-step.in-view .fv-card{box-shadow:0 16px 50px rgba(0,0,0,.4);border-color:rgba(56,189,248,.2)}
      `}</style>

      {/* NAV */}
      <nav id="nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: '66px', padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,10,18,.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--br)', transition: 'box-shadow .3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '17px', letterSpacing: '-.02em', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 4px 16px rgba(56,189,248,.35)' }}>🎓</div>
          CampusPulse
        </div>
        <div style={{ display: 'flex', gap: '36px' }}>
          <a href="#features" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)', transition: '.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Features</a>
          <a href="#how" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)', transition: '.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>How It Works</a>
          <a href="#preview" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)', transition: '.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Platform</a>
          <a href="#testimonials" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)', transition: '.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Reviews</a>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigate('/login')} style={{ padding: '8px 20px', border: '1px solid var(--br)', borderRadius: '8px', background: 'transparent', color: 'var(--txt)', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: '.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c1)'; e.currentTarget.style.color = 'var(--c1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.color = 'var(--txt)'; }}>Login</button>
          <button onClick={() => navigate('/login')} style={{ padding: '9px 22px', background: 'linear-gradient(135deg,var(--c1),var(--c2))', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: '.2s', boxShadow: '0 4px 20px rgba(56,189,248,.25)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(56,189,248,.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(56,189,248,.25)'; }}>Sign In →</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 5% 80px', position: 'relative', gap: '60px' }}>
        {/* Animated Canvas Background */}
        <canvas ref={canvasRef} id="cvs" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
        
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 70% 60% at 60% 50%,rgba(56,189,248,.07) 0%,transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%,rgba(129,140,248,.06) 0%,transparent 60%)', pointerEvents: 'none' }} />

        {/* Hero Left Content */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1, maxWidth: '560px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '5px 14px 5px 8px', background: 'rgba(56,189,248,.08)', border: '1px solid rgba(56,189,248,.22)', borderRadius: '99px', fontSize: '12px', fontWeight: 600, color: 'var(--c1)', marginBottom: '26px', letterSpacing: '.04em', animation: 'fadeUp .7s ease both' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(56,189,248,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--c1)', animation: 'blink 1.6s ease-in-out infinite' }} />
            </div>
            Smart Attendance · Live Platform
          </div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(40px,4.8vw,62px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-.03em', marginBottom: '22px', animation: 'fadeUp .7s .1s ease both' }}>
            Track Attendance.<br/><em style={{ fontStyle: 'normal', color: 'var(--c1)' }}>Engage Students.</em><br/>Build Insights.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '16.5px', lineHeight: 1.72, maxWidth: '460px', marginBottom: '36px', animation: 'fadeUp .7s .2s ease both' }}>
            CampusPulse helps institutions manage attendance, activities, and engagement through QR-based check-ins and real-time analytics dashboards.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px', animation: 'fadeUp .7s .3s ease both' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: '.25s', display: 'flex', alignItems: 'center', gap: '9px', background: 'linear-gradient(135deg,var(--c1),var(--c2))', border: 'none', color: '#fff', boxShadow: '0 8px 32px rgba(56,189,248,.28)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(56,189,248,.42)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(56,189,248,.28)'; }}>Get Started Free →</button>
            <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: '.25s', display: 'flex', alignItems: 'center', gap: '9px', background: 'transparent', border: '1.5px solid var(--br)', color: 'var(--txt)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c1)'; e.currentTarget.style.color = 'var(--c1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.color = 'var(--txt)'; }}>▶ View Demo</button>
          </div>
          <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap', animation: 'fadeUp .7s .4s ease both' }}>
            {['No setup required', 'Free for educators', 'Real-time sync'].map(t => (
              <div key={t} style={{ fontSize: '12.5px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--c3)', fontWeight: 800, fontSize: '13px' }}>✓</span>{t}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Right - Dashboard Card */}
        <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative' }}>
            {/* Floating Badge 1 */}
            <div style={{ position: 'absolute', top: '-20px', left: '-40px', background: 'rgba(11,16,32,.96)', border: '1px solid var(--br)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 12px 40px rgba(0,0,0,.5)', backdropFilter: 'blur(16px)', whiteSpace: 'nowrap', animation: 'fbFloat1 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--c3)' }} id="liveRate">87%</div>
              <div style={{ fontSize: '10.5px', color: 'var(--muted)', marginTop: '1px' }}>Attendance Rate</div>
              <div style={{ fontSize: '11px', color: 'var(--c3)', fontWeight: 600 }}>↑ +2.4% this week</div>
            </div>

            {/* Main Dashboard Card */}
            <div style={{ width: '420px', background: 'rgba(11,16,32,.92)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '18px', padding: '22px', boxShadow: '0 40px 100px rgba(0,0,0,.7),0 0 0 1px rgba(56,189,248,.06),inset 0 1px 0 rgba(255,255,255,.04)', backdropFilter: 'blur(24px)', animation: 'fadeUp .7s .35s ease both, heroFloat 6s 1s ease-in-out infinite' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '13.5px' }}>Live Attendance Dashboard</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: 'rgba(52,211,153,.1)', border: '1px solid rgba(52,211,153,.25)', borderRadius: '99px', fontSize: '11px', fontWeight: 700, color: 'var(--c3)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c3)', animation: 'blink 1.2s ease-in-out infinite' }} />
                  LIVE
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '18px' }}>
                <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--br)', borderRadius: '10px', padding: '11px', textAlign: 'center', transition: '.2s' }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, lineHeight: 1, color: 'var(--c1)' }}>94</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '3px' }}>Students</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--br)', borderRadius: '10px', padding: '11px', textAlign: 'center', transition: '.2s' }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, lineHeight: 1, color: 'var(--c3)' }} id="livePres">82</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '3px' }}>Present</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--br)', borderRadius: '10px', padding: '11px', textAlign: 'center', transition: '.2s' }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, lineHeight: 1, color: 'var(--c2)' }}>12</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '3px' }}>Activities</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {[
                  { name: 'Data Structures', pct: 91, color: 'var(--c1)', color2: 'var(--c2)' },
                  { name: 'Algorithms', pct: 85, color: 'var(--c2)', color2: '#a78bfa' },
                  { name: 'Database Sys.', pct: 88, color: 'var(--c3)', color2: 'var(--c1)' },
                  { name: 'Physics Lab', pct: 68, color: 'var(--c5)', color2: 'var(--c4)' }
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,.04)' : 'none', transition: '.2s' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, background: s.color }} />
                    <div style={{ fontSize: '12px', color: 'var(--muted)', width: '100px', flexShrink: 0 }}>{s.name}</div>
                    <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,.06)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '99px', width: `${s.pct}%`, background: `linear-gradient(90deg,${s.color},${s.color2})`, transition: 'width 1.5s cubic-bezier(.16,1,.3,1)' }} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, width: '34px', textAlign: 'right', flexShrink: 0, color: s.color }}>{s.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div style={{ position: 'absolute', bottom: '-10px', right: '-30px', background: 'rgba(11,16,32,.96)', border: '1px solid var(--br)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 12px 40px rgba(0,0,0,.5)', backdropFilter: 'blur(16px)', whiteSpace: 'nowrap', animation: 'fbFloat2 5.5s ease-in-out infinite .6s' }}>
              <div style={{ fontSize: '10.5px', color: 'var(--muted)', marginBottom: '4px' }}>Students Enrolled</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--txt)' }}>500+</div>
              <div style={{ fontSize: '11px', color: 'var(--c3)', fontWeight: 600 }}>↑ across 4 courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" style={{ padding: '70px 5%', position: 'relative', background: 'var(--bg2)', borderTop: '1px solid var(--br)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '16px' }}>✦ Platform Features</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '16px' }}>Everything you need to manage<br/>campus engagement</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, maxWidth: '500px', margin: '0 auto' }}>From QR-based attendance to real-time analytics — CampusPulse brings it all together in one platform.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px', marginTop: '40px' }}>
          {[
            { icon: '📱', title: 'QR-based Attendance', desc: 'Students scan a QR code to mark attendance instantly. No manual roll calls needed. Auto-refreshes every 30s for anti-proxy protection.' },
            { icon: '⚡', title: 'Activity Tracking', desc: 'Track student participation in workshops, seminars, and campus events effortlessly. Every action is logged and timestamped.' },
            { icon: '📊', title: 'Real-Time Analytics', desc: 'Teachers and administrators view attendance trends and engagement dashboards updated live as students scan in.' },
            { icon: '🖥️', title: 'Student Dashboard', desc: 'Students see their attendance %, activity history, and participation insights from their personal dashboard.' }
          ].map((f, i) => (
            <div key={i} style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: 'var(--r)', padding: '26px 22px', transition: '.3s', cursor: 'default', position: 'relative' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.3)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.35)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ width: '46px', height: '46px', background: 'linear-gradient(135deg,rgba(56,189,248,.15),rgba(129,140,248,.15))', border: '1px solid rgba(56,189,248,.15)', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '18px' }}>{f.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '15px', fontWeight: 700, marginBottom: '9px' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ padding: '50px 5%', background: 'linear-gradient(135deg,rgba(56,189,248,.04),rgba(129,140,248,.04))', borderTop: '1px solid var(--br)', borderBottom: '1px solid var(--br)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'center' }}>
          {[
            { num: '500+', label: 'Institutions using CampusPulse' },
            { num: '2.4M', label: 'Attendance records processed' },
            { num: '98%', label: 'Platform uptime reliability' },
            { num: '42s', label: 'Average session setup time' }
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(40px,4vw,56px)', fontWeight: 800, background: 'linear-gradient(135deg,var(--c1),var(--c2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS - FLOW STATE */}
      <section id="how" style={{ padding: '70px 5% 60px', position: 'relative', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="r" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '16px' }}>✦ How It Works</div>
          <h2 className="r" style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '16px' }}>Three simple steps to<br/>smarter attendance</h2>
          <p className="r" style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, maxWidth: '500px', margin: '0 auto' }}>From session creation to instant analytics — the entire flow takes under 60 seconds.</p>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0, marginTop: '50px' }}>
          {/* STEP 1 */}
          <div id="fs1" className="flow-step" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 0, alignItems: 'center', minHeight: '160px', position: 'relative' }}>
            <div className="r-l" style={{ gridColumn: 1, textAlign: 'right', paddingRight: '48px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', marginBottom: '8px' }}>Step 01</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '10px' }}>Create a Session</div>
              <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '340px', marginLeft: 'auto' }}>Teacher creates a session and generates a unique, auto-refreshing QR code in seconds. No software install — works from any browser.</div>
            </div>
            <div style={{ gridColumn: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}>
              <div style={{ flex: 1, width: '2px', background: 'linear-gradient(180deg,rgba(56,189,248,.0) 0%,rgba(56,189,248,.25) 30%,rgba(56,189,248,.25) 70%,rgba(56,189,248,.0) 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '100%', height: '60px', background: 'linear-gradient(180deg,transparent,rgba(56,189,248,.8),transparent)', animation: 'flowDown 2.4s ease-in-out infinite' }} />
              </div>
              <div id="sn1" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 0 0 8px rgba(56,189,248,.08),0 0 0 16px rgba(56,189,248,.04)', position: 'relative', zIndex: 2, flexShrink: 0, transition: '.3s' }}>📋</div>
              <div style={{ flex: 1, width: '2px', background: 'linear-gradient(180deg,rgba(56,189,248,.0) 0%,rgba(56,189,248,.25) 30%,rgba(56,189,248,.25) 70%,rgba(56,189,248,.0) 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '100%', height: '60px', background: 'linear-gradient(180deg,transparent,rgba(56,189,248,.8),transparent)', animation: 'flowDown 2.4s ease-in-out infinite' }} />
              </div>
            </div>
            <div className="r-r" style={{ gridColumn: 3, paddingLeft: '48px' }}>
              <div style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '14px', padding: '18px', transition: '.4s' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Generated QR Code</div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '3px', width: '80px' }}>
                    {[1,1,1,0,1,1,1,1,0,0,0,0,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,1,1,0,1,0,0,1,1,1,1,1,0,1,1,1].map((v, i) => (
                      <div key={i} className={v ? 'qr-cell-on' : 'qr-cell-off'} style={{ aspectRatio: '1', borderRadius: '2px', background: v ? 'var(--c1)' : 'rgba(255,255,255,.05)' }} />
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Session</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '15px', fontWeight: 700 }}>CS301 — Lecture</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Refreshes in <span id="qrTimer" style={{ color: 'var(--c1)', fontWeight: 700 }}>28s</span></div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--c3)', animation: 'blink 1.2s ease-in-out infinite' }} />
                      <div style={{ fontSize: '11px', color: 'var(--c3)', fontWeight: 600 }}>Session Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div id="fs2" className="flow-step" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 0, alignItems: 'center', minHeight: '160px', position: 'relative' }}>
            <div className="r-l" style={{ gridColumn: 1, paddingRight: '48px' }}>
              <div style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '14px', padding: '18px', transition: '.4s' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Student Scanning</div>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', height: '80px', background: 'var(--bg2)' }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,var(--c1),transparent)', boxShadow: '0 0 12px var(--c1)', animation: 'scanBeam 2s ease-in-out infinite' }} />
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '16px', height: '16px', borderTop: '2px solid var(--c1)', borderLeft: '2px solid var(--c1)' }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '16px', height: '16px', borderTop: '2px solid var(--c1)', borderRight: '2px solid var(--c1)' }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--c1)', fontWeight: 600, whiteSpace: 'nowrap' }}>Scanning... Hold steady</div>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '4px', background: 'var(--s2)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div id="scanProg" style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg,var(--c1),var(--c2))', borderRadius: '99px', transition: 'width .1s' }} />
                  </div>
                  <div id="scanCount" style={{ fontSize: '11px', color: 'var(--muted)' }}>3 / 42</div>
                </div>
              </div>
            </div>
            <div style={{ gridColumn: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}>
              <div style={{ flex: 1, width: '2px', background: 'linear-gradient(180deg,rgba(56,189,248,.0) 0%,rgba(56,189,248,.25) 30%,rgba(56,189,248,.25) 70%,rgba(56,189,248,.0) 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '100%', height: '60px', background: 'linear-gradient(180deg,transparent,rgba(56,189,248,.8),transparent)', animation: 'flowDown 2.4s ease-in-out infinite .6s' }} />
              </div>
              <div id="sn2" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 0 0 8px rgba(56,189,248,.08),0 0 0 16px rgba(56,189,248,.04)', position: 'relative', zIndex: 2, flexShrink: 0, transition: '.3s' }}>📷</div>
              <div style={{ flex: 1, width: '2px', background: 'linear-gradient(180deg,rgba(56,189,248,.0) 0%,rgba(56,189,248,.25) 30%,rgba(56,189,248,.25) 70%,rgba(56,189,248,.0) 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '100%', height: '60px', background: 'linear-gradient(180deg,transparent,rgba(56,189,248,.8),transparent)', animation: 'flowDown 2.4s ease-in-out infinite .6s' }} />
              </div>
            </div>
            <div className="r-r" style={{ gridColumn: 3, textAlign: 'left', paddingLeft: '48px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', marginBottom: '8px' }}>Step 02</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '10px' }}>Scan QR Code</div>
              <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '340px' }}>Students scan using their phone camera. No app install. Proxy attempts are detected and flagged automatically — location and device fingerprint verified.</div>
            </div>
          </div>

          {/* STEP 3 */}
          <div id="fs3" className="flow-step" style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 0, alignItems: 'center', minHeight: '160px', position: 'relative' }}>
            <div className="r-l" style={{ gridColumn: 1, textAlign: 'right', paddingRight: '48px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', marginBottom: '8px' }}>Step 03</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '10px' }}>Instant Analytics</div>
              <div style={{ fontSize: '14.5px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '340px', marginLeft: 'auto' }}>Attendance and activity data appear instantly in dashboards — no refresh needed. Export reports in one click. Set alerts for at-risk students automatically.</div>
            </div>
            <div style={{ gridColumn: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', height: '100%' }}>
              <div style={{ flex: 1, width: '2px', background: 'linear-gradient(180deg,rgba(56,189,248,.25) 0%,rgba(56,189,248,.0) 100%)' }} />
              <div id="sn3" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', boxShadow: '0 0 0 8px rgba(56,189,248,.08),0 0 0 16px rgba(56,189,248,.04)', position: 'relative', zIndex: 2, flexShrink: 0, transition: '.3s' }}>⚡</div>
              <div style={{ flex: 0.2 }} />
            </div>
            <div className="r-r" style={{ gridColumn: 3, paddingLeft: '48px' }}>
              <div style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '14px', padding: '18px', transition: '.4s' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Live Analytics</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '80px' }}>
                  {[45, 72, 55, 88, 65, 78, 91].map((h, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top,rgba(56,189,248,.4),rgba(129,140,248,.6))', position: 'relative', overflow: 'hidden', height: `${h}%` }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(56,189,248,.3),transparent)', animation: `barPulse 2s ease-in-out infinite ${i * 0.2}s` }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--c3)' }}>87%</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Overall</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--c1)' }}>82</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Present</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--c5)' }}>2</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)' }}>At Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATING DEEP-DIVE SECTIONS */}
      {/* SECTION A: Teacher Dashboard */}
      <section style={{ padding: '70px 5%', background: 'var(--bg2)', borderTop: '1px solid var(--br)', borderBottom: '1px solid var(--br)' }}>
        <div className="r" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
          <div className="r-l">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '14px' }}>👩‍🏫 Teacher Dashboard</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '14px' }}>Full control at your fingertips</h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, marginBottom: '28px' }}>Create sessions, monitor attendance in real time, flag anomalies, and export detailed reports — all from one clean interface.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📋', title: 'One-click session creation', desc: 'Generate and share QR codes instantly. Auto-expires after class ends.' },
                { icon: '🛡️', title: 'Anti-proxy detection', desc: 'Device fingerprint + location verification catches proxy attendance.' },
                { icon: '📤', title: 'Export reports', desc: 'Download PDF, CSV, or Excel reports in one click.' }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'rgba(255,255,255,.025)', border: '1px solid var(--br)', borderRadius: '10px', transition: '.25s', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.25)'; e.currentTarget.style.background = 'rgba(56,189,248,.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.background = 'rgba(255,255,255,.025)'; }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg,rgba(56,189,248,.15),rgba(129,140,248,.15))', border: '1px solid rgba(56,189,248,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, marginBottom: '3px' }}>{f.title}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="r-r" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-18px', right: '-24px', background: 'rgba(11,16,32,.96)', border: '1px solid var(--br)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 12px 40px rgba(0,0,0,.5)', backdropFilter: 'blur(12px)', animation: 'fbFloat1 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '20px', fontWeight: 800, color: 'var(--c3)' }}>94%</div>
              <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>Today's Attendance</div>
            </div>
            <div style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '16px', padding: '20px', boxShadow: '0 32px 80px rgba(0,0,0,.5)', transition: '.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.2)'; e.currentTarget.style.boxShadow = '0 40px 100px rgba(0,0,0,.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,.5)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 700, marginLeft: '6px', color: 'var(--muted)' }}>CS301 — Today's Session</div>
              </div>
              {[
                { name: 'Priya Sharma', pct: 91, color: 'var(--c1)' },
                { name: 'Arjun Mehta', pct: 85, color: 'var(--c2)' },
                { name: 'Sneha Patel', pct: 78, color: 'var(--c4)' },
                { name: 'Rohan Das', pct: 68, color: 'var(--c5)', flag: true },
                { name: 'Kavya Singh', pct: 88, color: 'var(--c3)' }
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--br)' : 'none' }}>
                  <div style={{ fontSize: '13px' }}>{s.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '90px', height: '5px', background: 'var(--s2)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '99px' }} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, width: '34px', textAlign: 'right', color: s.color }}>{s.pct}%{s.flag ? ' ⚠' : ''}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: '-14px', left: '-24px', background: 'rgba(11,16,32,.96)', border: '1px solid var(--br)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 12px 40px rgba(0,0,0,.5)', backdropFilter: 'blur(12px)', animation: 'fbFloat2 5.5s ease-in-out infinite .4s' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '20px', fontWeight: 800, color: 'var(--c5)' }}>1 Flag</div>
              <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>Proxy detected</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Student Dashboard */}
      <section style={{ padding: '70px 5%', background: 'var(--bg)' }}>
        <div className="r" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
          <div className="r-l" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-18px', right: '-20px', background: 'rgba(11,16,32,.96)', border: '1px solid var(--br)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 12px 40px rgba(0,0,0,.5)', backdropFilter: 'blur(12px)', animation: 'fbFloat1 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '20px', fontWeight: 800, color: 'var(--c4)' }}>🔥 12</div>
              <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>Day Streak</div>
            </div>
            <div style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '16px', padding: '20px', boxShadow: '0 32px 80px rgba(0,0,0,.5)', transition: '.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.2)'; e.currentTarget.style.boxShadow = '0 40px 100px rgba(0,0,0,.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,.5)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 700, marginLeft: '6px', color: 'var(--muted)' }}>My Attendance — March 2026</div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '38px', fontWeight: 800, color: 'var(--c1)', lineHeight: 1 }}>87%</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>↑ +2.4% from last month</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Data Structures', pct: 91, color: 'var(--c1)' },
                  { name: 'Database Sys.', pct: 88, color: 'var(--c3)' },
                  { name: 'Physics Lab', pct: 68, color: 'var(--c5)' }
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <div style={{ fontSize: '12px', color: 'var(--muted)', width: '110px' }}>{s.name}</div>
                    <div style={{ flex: 1, height: '5px', background: 'var(--s2)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '99px' }} />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: s.color, width: '32px', textAlign: 'right' }}>{s.pct}%</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '14px', padding: '10px 12px', background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.2)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--c5)', fontWeight: 600 }}>⚠ Physics Lab needs 4 more sessions to reach 75%</div>
              </div>
            </div>
          </div>
          <div className="r-r">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '14px' }}>🎓 Student Dashboard</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '14px' }}>Students take ownership of their learning</h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, marginBottom: '28px' }}>Real-time visibility into attendance, streaks, subject breakdowns, and personalized AI insights — students always know where they stand.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📈', title: 'Subject-wise breakdown', desc: 'See exactly which classes need attention before it\'s too late.' },
                { icon: '🔥', title: 'Attendance streaks', desc: 'Gamified streak tracking motivates consistent attendance.' },
                { icon: '🤖', title: 'AI-powered insights', desc: 'Smart nudges alert students before they drop below the threshold.' }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'rgba(255,255,255,.025)', border: '1px solid var(--br)', borderRadius: '10px', transition: '.25s', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.25)'; e.currentTarget.style.background = 'rgba(56,189,248,.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.background = 'rgba(255,255,255,.025)'; }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg,rgba(56,189,248,.15),rgba(129,140,248,.15))', border: '1px solid rgba(56,189,248,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, marginBottom: '3px' }}>{f.title}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Analytics & Reports */}
      <section style={{ padding: '70px 5%', background: 'var(--bg2)', borderTop: '1px solid var(--br)', borderBottom: '1px solid var(--br)' }}>
        <div className="r" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
          <div className="r-l">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '14px' }}>📊 Analytics & Reports</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '14px' }}>Data that drives<br/>real decisions</h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, marginBottom: '28px' }}>Administrators get a bird's-eye view of institutional engagement — by department, subject, or individual student — with custom date ranges and exportable reports.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🗓️', title: 'Custom date ranges', desc: 'Drill down to any week, month, or semester in seconds.' },
                { icon: '🏫', title: 'Department-level views', desc: 'Compare attendance across departments and flag underperforming areas.' },
                { icon: '📧', title: 'Automated alerts', desc: 'Email notifications when students drop below the attendance threshold.' }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'rgba(255,255,255,.025)', border: '1px solid var(--br)', borderRadius: '10px', transition: '.25s', cursor: 'default' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.25)'; e.currentTarget.style.background = 'rgba(56,189,248,.04)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.background = 'rgba(255,255,255,.025)'; }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg,rgba(56,189,248,.15),rgba(129,140,248,.15))', border: '1px solid rgba(56,189,248,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, marginBottom: '3px' }}>{f.title}</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="r-r" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-18px', right: '-24px', background: 'rgba(11,16,32,.96)', border: '1px solid var(--br)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 12px 40px rgba(0,0,0,.5)', backdropFilter: 'blur(12px)', animation: 'fbFloat1 5s ease-in-out infinite' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '20px', fontWeight: 800, color: 'var(--c2)' }}>#4</div>
              <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>Class Rank</div>
            </div>
            <div style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '16px', padding: '20px', boxShadow: '0 32px 80px rgba(0,0,0,.5)', transition: '.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.2)'; e.currentTarget.style.boxShadow = '0 40px 100px rgba(0,0,0,.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.boxShadow = '0 32px 80px rgba(0,0,0,.5)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 700, marginLeft: '6px', color: 'var(--muted)' }}>Monthly Trend — March 2026</div>
              </div>
              <svg width="100%" height="100" viewBox="0 0 360 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity=".5"/>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="55" x2="360" y2="55" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5 3" opacity=".4"/>
                <text x="6" y="52" fontSize="9" fill="#f59e0b" opacity=".6">75%</text>
                <path d="M0,70 C40,62 80,50 120,48 S200,36 240,32 S310,24 360,20 L360,100 L0,100 Z" fill="url(#tg)"/>
                <path d="M0,70 C40,62 80,50 120,48 S200,36 240,32 S310,24 360,20" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
                <path d="M0,78 C60,74 120,72 180,70 S280,68 360,66" fill="none" stroke="#7a8aa8" strokeWidth="1.5" opacity=".5"/>
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>
                <span>Mar 1</span><span>Mar 8</span><span>Mar 15</span><span>Mar 22</span><span>Mar 29</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11.5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '12px', height: '2.5px', background: 'var(--c1)', display: 'inline-block', borderRadius: '2px' }} />My Attendance</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><span style={{ width: '12px', height: '2.5px', background: 'var(--muted)', display: 'inline-block', borderRadius: '2px', opacity: .5 }} />Class Avg</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--c4)' }}><span style={{ width: '12px', height: '1.5px', background: 'var(--c4)', display: 'inline-block', borderTop: '1px dashed var(--c4)' }} />Target 75%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section id="preview" style={{ padding: '70px 5%', position: 'relative', background: 'var(--bg2)', borderTop: '1px solid var(--br)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '16px' }}>◈ Platform Preview</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '16px' }}>Designed for modern classrooms</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, maxWidth: '520px', margin: '0 auto' }}>Purpose-built views for teachers, students, and administrators — each with exactly what they need.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {[
            { title: 'Teacher Dashboard', items: ['Create attendance sessions', 'Generate QR codes', 'View student participation', 'Export reports'] },
            { title: 'Student Dashboard', items: ['View attendance %', 'Activity history', 'Upcoming events', 'Career advisory'] },
            { title: 'Analytics & Reports', items: ['Attendance trends', 'Participation heatmaps', 'Engagement scores', 'Custom date ranges'] }
          ].map((c, i) => (
            <div key={i} style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: 'var(--r)', transition: '.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.35)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,var(--s2),var(--s3))', position: 'relative', borderBottom: '1px solid var(--br)' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', display: 'grid', placeItems: 'center', fontSize: '24px' }}>📊</div>
              </div>
              <div style={{ padding: '22px' }}>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>{c.title}</h3>
                {c.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--muted)', marginBottom: '7px' }}>
                    <span style={{ color: 'var(--c1)', fontWeight: 800 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '70px 5%', position: 'relative', background: 'var(--bg)', borderTop: '1px solid var(--br)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '16px' }}>✦ Trusted by Educators</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(28px,3.2vw,44px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.025em', marginBottom: '16px' }}>What our users say</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.72, maxWidth: '520px', margin: '0 auto' }}>Thousands of teachers and institutions rely on CampusPulse every day.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {[
            { stars: 5, quote: 'CampusPulse cut our manual attendance work by 90%. The proxy detection alone has improved academic integrity tremendously.', name: 'Dr. Rajiv Krishna', role: 'Professor · BITS Hyderabad', av: 'RK' },
            { stars: 5, quote: 'The analytics dashboard gives me a complete picture of every student\'s engagement. I can intervene before anyone falls behind.', name: 'Prof. Anita Sharma', role: 'HOD Computer Science · VIT Vellore', av: 'AS' },
            { stars: 5, quote: 'Students love seeing their own attendance in real time. It\'s motivated them to show up more consistently this semester.', name: 'Dr. Mohan Rao', role: 'Dean of Academics · SRM University', av: 'MR' }
          ].map((t, i) => (
            <div key={i} style={{ background: 'var(--s1)', border: '1px solid var(--br)', borderRadius: '16px', padding: '26px', transition: '.3s', position: 'relative' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(56,189,248,.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ color: 'var(--c4)', fontSize: '13px', letterSpacing: '2px', marginBottom: '14px' }}>★★★★★</div>
              <div style={{ fontSize: '22px', color: 'rgba(56,189,248,.15)', marginBottom: '14px', fontFamily: 'serif' }}>&quot;</div>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--br)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, flexShrink: 0, background: 'linear-gradient(135deg,var(--c1),var(--c2))' }}>{t.av}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '1px' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5%', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse,rgba(56,189,248,.07) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '60%', left: '30%', width: '400px', height: '300px', background: 'radial-gradient(ellipse,rgba(129,140,248,.05) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--c1)', padding: '5px 13px', background: 'rgba(56,189,248,.07)', border: '1px solid rgba(56,189,248,.18)', borderRadius: '99px', marginBottom: '18px' }}>✦ Get Started Today</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(34px,4vw,56px)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: '18px', lineHeight: 1.1 }}>Ready to modernize<br/>your campus?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '16.5px', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>Join institutions already using CampusPulse to streamline attendance and boost student engagement.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '22px' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: '.25s', display: 'flex', alignItems: 'center', gap: '9px', background: 'linear-gradient(135deg,var(--c1),var(--c2))', border: 'none', color: '#fff', boxShadow: '0 8px 32px rgba(56,189,248,.28)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(56,189,248,.42)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(56,189,248,.28)'; }}>Start Managing Attendance →</button>
            <button onClick={() => navigate('/dashboard')} style={{ padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: '.25s', background: 'transparent', border: '1.5px solid var(--br)', color: 'var(--txt)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--c1)'; e.currentTarget.style.color = 'var(--c1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.color = 'var(--txt)'; }}>Request a Demo</button>
          </div>
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '13px', color: 'var(--muted)' }}>
            <span><span style={{ color: 'var(--c3)', fontWeight: 800 }}>✓ </span>Free for educators</span>
            <span><span style={{ color: 'var(--c3)', fontWeight: 800 }}>✓ </span>No credit card needed</span>
            <span><span style={{ color: 'var(--c3)', fontWeight: 800 }}>✓ </span>Setup in under 2 minutes</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--br)', padding: '64px 5% 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '56px', marginBottom: '44px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '17px', marginBottom: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'linear-gradient(135deg,var(--c1),var(--c2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 4px 16px rgba(56,189,248,.35)' }}>🎓</div>
              CampusPulse
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', maxWidth: '260px', margin: '12px 0 20px', lineHeight: 1.72 }}>Smart attendance and engagement platform built for modern educational institutions worldwide.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['𝕏', 'in', '▶', '●'].map((s, i) => (
                <div key={i} style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--s1)', border: '1px solid var(--br)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', transition: '.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--c1)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--br)'}>{s}</div>
              ))}
            </div>
          </div>
          {[
            { title: 'Product', links: ['Features', 'How It Works', 'Pricing', 'Changelog', 'Roadmap'] },
            { title: 'Resources', links: ['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Support Center'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'] }
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>{col.title}</h4>
              {col.links.map((link, idx) => (
                <a key={idx} href="#" style={{ display: 'block', fontSize: '13.5px', color: 'var(--muted)', marginBottom: '11px', transition: '.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--br)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', color: 'var(--muted)' }}>
          <span>© 2026 CampusPulse. All rights reserved. Built with ❤️ for education.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--muted)', transition: '.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Privacy</a>
            <a href="#" style={{ color: 'var(--muted)', transition: '.15s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

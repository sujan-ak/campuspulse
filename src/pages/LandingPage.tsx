import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "linear-gradient(135deg, #061428 0%, #0b2045 35%, #0a2e3a 70%, #071830 100%)", color: "#fff", overflowX: "hidden", position: "relative" }}>
      {/* Animated Blobs */}
      <div style={{ position: "fixed", top: "10%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(26,110,245,0.15) 0%, transparent 70%)", filter: "blur(60px)", animation: "blobFloat1 20s ease-in-out infinite", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(15,184,201,0.12) 0%, transparent 70%)", filter: "blur(50px)", animation: "blobFloat2 25s ease-in-out infinite reverse", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", filter: "blur(55px)", animation: "blobFloat1 18s ease-in-out infinite", zIndex: 0 }} />
      
      {/* Grid Overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", opacity: 0.4, zIndex: 0 }} />
      
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(255,255,255,.03)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.08)", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "9px", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26,110,245,.3)" }}>
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          CampusPulse
        </a>
        <ul style={{ display: "flex", gap: "32px", listStyle: "none" }} className="nav-links-desktop">
          <li><a href="#features" className="nav-link" style={{ textDecoration: "none", fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Features</a></li>
          <li><a href="#how" className="nav-link" style={{ textDecoration: "none", fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>How It Works</a></li>
          <li><a href="#preview" className="nav-link" style={{ textDecoration: "none", fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>Preview</a></li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", fontFamily: "'Sora', sans-serif", fontSize: ".875rem", fontWeight: 500, color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "color .2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#1a6ef5"} onMouseOut={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>Login</button>
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }}/>
          <button onClick={() => navigate("/login")} className="btn-hover" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 22px", borderRadius: "8px", fontFamily: "'Sora', sans-serif", fontSize: ".875rem", fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg, #1a6ef5, #2d8cf0)", color: "#fff", boxShadow: "0 4px 14px rgba(26,110,245,.35)", border: "none", transition: "all .22s" }}>Sign In</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "calc(100vh - 64px)", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "60px 7% 80px", gap: "60px", background: "linear-gradient(135deg, #061428 0%, #0b2045 40%, #0a2e3a 70%, #071830 100%)", position: "relative", overflow: "hidden" }} className="hero-section">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(26,110,245,0.15)", color: "#1a6ef5", border: "1px solid rgba(26,110,245,.3)", borderRadius: "100px", padding: "5px 14px", fontSize: ".75rem", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: "22px" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Smart Curriculum Activity & Attendance Platform
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, lineHeight: 1.15, color: "#fff", marginBottom: "20px" }}>
            Track Attendance.<br/>
            <span style={{ background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Engage Students.</span><br/>
            Build Insights.
          </h1>
          <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,0.7)", maxWidth: "400px", marginBottom: "32px", lineHeight: 1.75 }}>
            CampusPulse helps institutions manage attendance, activities, and engagement through QR-based check-ins and real-time analytics dashboards.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
            <button onClick={() => navigate("/login")} className="btn-hover" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 22px", borderRadius: "8px", fontFamily: "'Sora', sans-serif", fontSize: ".875rem", fontWeight: 600, cursor: "pointer", background: "linear-gradient(135deg, #1a6ef5, #2d8cf0)", color: "#fff", boxShadow: "0 4px 14px rgba(26,110,245,.35)", border: "none", transition: "all .22s" }}>
              Get Started
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => navigate("/dashboard")} className="btn-outline-hover" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 22px", borderRadius: "8px", fontFamily: "'Sora', sans-serif", fontSize: ".875rem", fontWeight: 600, cursor: "pointer", background: "transparent", color: "#1a6ef5", border: "1.5px solid #1a6ef5", transition: "all .22s" }}>View Demo</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
            {["No setup required", "Free for educators", "Real-time sync"].map(t => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: ".78rem", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                <svg width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "480px" }} className="hero-right">
          {/* Orbit rings */}
          <div className="orbit-ring-1" style={{ position: "absolute", zIndex: 1, borderRadius: "50%", border: "1.5px dashed rgba(26,110,245,.4)", pointerEvents: "none", width: "360px", height: "360px" }}>
            <div style={{ position: "absolute", width: "10px", height: "10px", borderRadius: "50%", background: "#1a6ef5", top: 0, left: "50%", transform: "translate(-50%,-50%)", boxShadow: "0 0 0 4px rgba(26,110,245,.3), 0 0 20px rgba(26,110,245,.6)" }}/>
          </div>
          <div className="orbit-ring-2" style={{ position: "absolute", zIndex: 1, borderRadius: "50%", border: "1.5px dashed rgba(15,184,201,.4)", pointerEvents: "none", width: "460px", height: "460px" }}>
            <div style={{ position: "absolute", width: "10px", height: "10px", borderRadius: "50%", background: "#0fb8c9", bottom: 0, left: "30%", transform: "translate(-50%,50%)", boxShadow: "0 0 0 4px rgba(15,184,201,.3), 0 0 20px rgba(15,184,201,.6)" }}/>
          </div>

          {/* Floating badges */}
          <div className="float-badge badge-1" style={{ position: "absolute", zIndex: 3, background: "rgba(255,255,255,.08)", backdropFilter: "blur(16px)", borderRadius: "12px", padding: "10px 14px", boxShadow: "0 8px 28px rgba(26,110,245,.3), 0 0 0 1px rgba(255,255,255,.15)", display: "flex", alignItems: "center", gap: "9px", fontSize: ".75rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", top: "6%", left: "-8%" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#1a6ef5" }}>
              <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <div>Attendance Rate</div>
              <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.6)", fontWeight: 400, marginTop: "1px" }}>94% this week ↑</div>
            </div>
          </div>

          <div className="float-badge badge-2" style={{ position: "absolute", zIndex: 3, background: "rgba(255,255,255,.08)", backdropFilter: "blur(16px)", borderRadius: "12px", padding: "10px 14px", boxShadow: "0 8px 28px rgba(26,110,245,.3), 0 0 0 1px rgba(255,255,255,.15)", display: "flex", alignItems: "center", gap: "9px", fontSize: ".75rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", top: "38%", right: "-10%" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#0fb8c9" }}>
              <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div>
              <div>Activities Tracked</div>
              <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.6)", fontWeight: 400, marginTop: "1px" }}>28 sessions active</div>
            </div>
          </div>

          <div className="float-badge badge-3" style={{ position: "absolute", zIndex: 3, background: "rgba(255,255,255,.08)", backdropFilter: "blur(16px)", borderRadius: "12px", padding: "10px 14px", boxShadow: "0 8px 28px rgba(26,110,245,.3), 0 0 0 1px rgba(255,255,255,.15)", display: "flex", alignItems: "center", gap: "9px", fontSize: ".75rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", bottom: "10%", left: "-6%" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#7c3aed" }}>
              <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div>Students Enrolled</div>
              <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.6)", fontWeight: 400, marginTop: "1px" }}>156 across 6 courses</div>
            </div>
          </div>

          {/* Central device */}
          <div className="device-float" style={{ position: "relative", zIndex: 2, width: "260px", background: "rgba(255,255,255,.08)", backdropFilter: "blur(20px)", borderRadius: "22px", boxShadow: "0 24px 60px rgba(26,110,245,.3), 0 0 0 1px rgba(255,255,255,.15)", overflow: "hidden" }}>
            <div style={{ background: "rgba(255,255,255,.05)", padding: "9px 14px", display: "flex", alignItems: "center", gap: "6px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f57" }}/>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#febc2e" }}/>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28c840" }}/>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "14px" }}>
                {[{v:"94%",l:"Attend."},{v:"28",l:"Activities"},{v:"156",l:"Students"}].map(s => (
                  <div key={s.l} style={{ background: "rgba(255,255,255,.05)", borderRadius: "8px", padding: "10px 6px", textAlign: "center", border: "1px solid rgba(255,255,255,.1)" }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.15rem", fontWeight: 800, color: "#1a6ef5" }}>{s.v}</div>
                    <div style={{ fontSize: ".58rem", color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".04em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
                {[{n:"Session 1",w:85},{n:"Session 2",w:72},{n:"Session 3",w:66},{n:"Session 4",w:60}].map(b => (
                  <div key={b.n} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: ".62rem", color: "rgba(255,255,255,.6)", fontWeight: 500, minWidth: "48px" }}>{b.n}</span>
                    <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,.1)", borderRadius: "100px", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: "100px", background: "linear-gradient(90deg,#1a6ef5,#0fb8c9)", width: `${b.w}%` }}/>
                    </div>
                    <span style={{ fontSize: ".6rem", color: "rgba(255,255,255,.5)", fontWeight: 600, minWidth: "26px", textAlign: "right" }}>{b.w}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 7%", background: "linear-gradient(180deg,#060d18 0%,#0b1524 50%,#060d18 100%)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 13px", borderRadius: "20px", background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.28)", fontSize: "11px", fontWeight: 700, color: "#3b82f6", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "16px" }}>✦ Platform Features</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "38px", fontWeight: 800, lineHeight: 1.15, marginBottom: "14px" }}>Everything you need to manage<br/>campus engagement</h2>
          <p style={{ fontSize: "15.5px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>From QR-based attendance to real-time analytics — CampusPulse brings it all together in one platform.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="5" height="5"/><rect x="16" y="3" width="5" height="5"/><rect x="3" y="16" width="5" height="5"/><path d="M21 21h-3v-3m0 3v-3h-3m6-3h-3m-3 0h-3v3m0 3h3"/></svg>,title:"QR-based Attendance",desc:"Students scan a QR code to mark attendance instantly. No manual roll calls needed. Refreshes every 30 seconds for anti-proxy protection."},
            {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,title:"Activity Tracking",desc:"Track student participation in workshops, seminars, and campus events effortlessly. Every action is logged and timestamped."},
            {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,title:"Real-Time Analytics",desc:"Teachers and administrators can view attendance trends and engagement dashboards updated live as students scan in."},
            {icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,title:"Student Dashboard",desc:"Students can view attendance percentage, activity history, and participation insights from their personal dashboard."}
          ].map(f => (
            <div key={f.title} className="feat-card-hover" style={{ background: "#141b26", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "28px 24px", transition: "all .3s", position: "relative", overflow: "hidden", cursor: "default" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#0ea5c8)", display: "grid", placeItems: "center", marginBottom: "20px", boxShadow: "0 0 18px rgba(37,99,235,.35)" }}>
                <div style={{ width: "20px", height: "20px" }}>{f.icon}</div>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Band */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0f1d38)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "60px 7%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
          {[
            {num:"500",plus:"+",lbl:"Institutions using CampusPulse"},
            {num:"2.4",plus:"M",lbl:"Attendance records processed"},
            {num:"98",plus:"%",lbl:"Platform uptime reliability"},
            {num:"42",plus:"s",lbl:"Average session setup time"}
          ].map((s,i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 20px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "42px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.num}<span style={{ color: "#3b82f6" }}>{s.plus}</span></div>
              <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "8px" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <section id="how" style={{ padding: "100px 7%", background: "#060d18", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 13px", borderRadius: "20px", background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.28)", fontSize: "11px", fontWeight: 700, color: "#3b82f6", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "16px" }}>⟡ How It Works</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "38px", fontWeight: 800, lineHeight: 1.15 }}>Three simple steps to<br/>smarter attendance</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "40px", position: "relative", maxWidth: "1100px", margin: "0 auto" }}>
          <div className="connecting-line" style={{ position: "absolute", top: "50px", left: "calc(16.66% + 36px)", right: "calc(16.66% + 36px)", height: "2px", background: "linear-gradient(90deg,transparent,rgba(37,99,235,.2),rgba(37,99,235,.2),transparent)", pointerEvents: "none", zIndex: 0 }}/>
          <div className="flow-line" style={{ position: "absolute", top: "50px", left: "calc(16.66% + 36px)", height: "2px", width: "0", background: "linear-gradient(90deg,#2563eb,#0ea5c8)", pointerEvents: "none", zIndex: 1, boxShadow: "0 0 10px rgba(37,99,235,.6)" }}/>
          {[
            {num:"Step 01",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,title:"Create a Session",desc:"Teacher creates a session and generates a unique, auto-refreshing QR code in seconds."},
            {num:"Step 02",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,title:"Scan QR Code",desc:"Students scan the QR code using their device camera. Proxy attempts are detected and flagged automatically."},
            {num:"Step 03",icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,title:"Instant Analytics",desc:"Attendance and activity data appear instantly in analytics dashboards — no refresh needed."}
          ].map((s, idx) => (
            <div key={s.num} className="step-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#3b82f6", marginBottom: "12px" }}>{s.num}</div>
              <div className={`step-icon step-icon-${idx + 1}`} style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#0ea5c8)", display: "grid", placeItems: "center", marginBottom: "24px", boxShadow: "0 0 28px rgba(37,99,235,.45)", position: "relative", zIndex: 2 }}>
                <div style={{ width: "28px", height: "28px" }}>{s.icon}</div>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "10px", wordWrap: "break-word", width: "100%" }}>{s.title}</h3>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.65, wordWrap: "break-word", width: "100%" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section id="preview" style={{ padding: "100px 7%", background: "linear-gradient(180deg,#060d18 0%,#0b1524 60%,#060d18 100%)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 13px", borderRadius: "20px", background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.28)", fontSize: "11px", fontWeight: 700, color: "#3b82f6", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "16px" }}>◈ Platform Preview</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "38px", fontWeight: 800, lineHeight: 1.15, marginBottom: "14px" }}>Designed for modern classrooms</h2>
          <p style={{ fontSize: "15.5px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>Purpose-built views for teachers, students, and administrators — each with exactly what they need.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {[
            {title:"Teacher Dashboard",items:["Create attendance sessions","Generate QR codes","View student participation","Export reports"]},
            {title:"Student Dashboard",items:["View attendance %","Activity history","Upcoming events","Career advisory"]},
            {title:"Analytics & Reports",items:["Attendance trends","Participation heatmaps","Engagement scores","Custom date ranges"]}
          ].map(c => (
            <div key={c.title} className="preview-card-hover" style={{ background: "#141b26", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", overflow: "hidden", transition: "all .3s" }}>
              <div style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1a2436,#1f2d40)", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", display: "grid", placeItems: "center" }}>
                  <svg width="24" height="24" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                </div>
              </div>
              <div style={{ padding: "22px" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>{c.title}</h3>
                {c.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#94a3b8", marginBottom: "7px" }}>
                    <svg width="14" height="14" fill="none" stroke="#3b82f6" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "100px 7%", background: "#060d18", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 13px", borderRadius: "20px", background: "rgba(37,99,235,.12)", border: "1px solid rgba(37,99,235,.28)", fontSize: "11px", fontWeight: 700, color: "#3b82f6", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "16px" }}>★ Trusted by educators</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "38px", fontWeight: 800, lineHeight: 1.15, marginBottom: "14px" }}>What our users say</h2>
          <p style={{ fontSize: "15.5px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>Thousands of teachers and institutions rely on CampusPulse every day.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {[
            {quote:"CampusPulse cut our manual attendance work by 90%. The proxy detection alone has improved session integrity dramatically.",name:"Dr. Rajni Krishna",role:"Professor, CS Dept · JNTU Hyderabad",av:"RK",color:"linear-gradient(135deg,#0ea5c8,#2563eb)"},
            {quote:"The analytics dashboard gives me a complete picture of every student's engagement. I can intervene before anyone falls behind.",name:"Prof. Anita Sharma",role:"HOD, Electronics · VIT Vellore",av:"AS",color:"linear-gradient(135deg,#a855f7,#ec4899)"},
            {quote:"Students love that they can see their own attendance in real time. It's motivated them to show up more consistently this semester.",name:"Dr. Mohan Rao",role:"Dean of Academics · SRM University",av:"MR",color:"linear-gradient(135deg,#22c55e,#0ea5c8)"}
          ].map(t => (
            <div key={t.name} className="test-card-hover" style={{ background: "#141b26", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "26px", transition: "all .3s" }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                {[...Array(5)].map((_,i) => <svg key={i} width="13" height="13" fill="#f59e0b" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
              </div>
              <div style={{ fontSize: "22px", color: "#3b82f6", marginBottom: "14px", fontFamily: "serif" }}>&quot;</div>
              <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.7, marginBottom: "20px" }}>{t.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "grid", placeItems: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "#fff", background: t.color }}>{t.av}</div>
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: "11.5px", color: "#64748b" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f1d38 50%,#0a1628 100%)", padding: "100px 7%", position: "relative", overflow: "hidden" }}>
        <div style={{ content: "", position: "absolute", top: "-160px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(circle,rgba(37,99,235,.16),transparent 65%)", pointerEvents: "none" }}/>
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "44px", fontWeight: 800, marginBottom: "16px", lineHeight: 1.15 }}>Ready to modernize<br/>your campus?</h2>
          <p style={{ fontSize: "16px", color: "#94a3b8", maxWidth: "460px", margin: "0 auto 36px", lineHeight: 1.7 }}>Join institutions already using CampusPulse to streamline attendance and boost student engagement.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
            <button onClick={() => navigate("/login")} className="cta-btn-hover" style={{ background: "#fff", color: "#060d18", border: "none", padding: "14px 32px", borderRadius: "10px", fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "7px", transition: "all .2s", boxShadow: "0 8px 28px rgba(255,255,255,.15)" }}>
              Start Managing Attendance
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button onClick={() => navigate("/dashboard")} style={{ background: "rgba(255,255,255,.07)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", padding: "13px 24px", borderRadius: "10px", fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 500, cursor: "pointer", transition: "all .2s" }}>Request a Demo</button>
          </div>
          <div style={{ fontSize: "12.5px", color: "#64748b" }}><span style={{ color: "#22c55e" }}>✓ Free for educators</span> &nbsp;·&nbsp; No credit card required &nbsp;·&nbsp; Setup in under 2 minutes</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0b1524", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "60px 7% 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg,#0ea5c8,#2563eb)", borderRadius: "8px", display: "grid", placeItems: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "13px", color: "#fff" }}>S</div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "16px" }}>CampusPulse</span>
            </div>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>Smart attendance and engagement platform built for modern educational institutions.</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["Twitter","LinkedIn","GitHub","YouTube"].map(s => (
                <div key={s} style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#0f1d2e", border: "1px solid rgba(255,255,255,0.07)", display: "grid", placeItems: "center", cursor: "pointer", transition: "all .2s" }} className="social-hover">
                  <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
                </div>
              ))}
            </div>
          </div>
          {[
            {title:"Product",links:["Features","How It Works","Pricing","Changelog","Roadmap"]},
            {title:"Resources",links:["Documentation","API Reference","Tutorials","Blog","Support Center"]},
            {title:"Company",links:["About Us","Careers","Contact","Privacy Policy","Terms of Service"]}
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "13px", fontWeight: 700, marginBottom: "16px", color: "#fff" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map(link => <li key={link}><a href="#" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13.5px", transition: "color .2s" }} className="footer-link-hover">{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: "12.5px", color: "#64748b" }}>© 2026 CampusPulse. All rights reserved. Built with ♥ for educators.</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {["SOC 2 Compliant","GDPR Ready","99.8% Uptime"].map(b => (
              <div key={b} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.07)", background: "#0f1d2e", fontSize: "11px", color: "#94a3b8" }}>
                <svg width="11" height="11" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                {b}
              </div>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        body, * { font-family: 'Sora', sans-serif !important; }
        .nav-link:hover { color: #1a6ef5 !important; transition: color .2s; }
        .btn-hover:hover { background: #1254c7 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,110,245,.42) !important; }
        .btn-outline-hover:hover { background: rgba(26,110,245,0.1) !important; }
        .feat-card-hover { transition: all .3s; animation: fadeInUp 0.6s ease forwards; opacity: 0; }
        .feat-card-hover:nth-child(1) { animation-delay: 0.1s; }
        .feat-card-hover:nth-child(2) { animation-delay: 0.2s; }
        .feat-card-hover:nth-child(3) { animation-delay: 0.3s; }
        .feat-card-hover:nth-child(4) { animation-delay: 0.4s; }
        .feat-card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.3); border-color: rgba(14,165,200,.3) !important; }
        .feat-card-hover::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#0ea5c8,#2563eb); transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .feat-card-hover:hover::before { transform: scaleX(1); }
        .preview-card-hover { transition: all .3s; }
        .preview-card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,.35); border-color: rgba(37,99,235,.35) !important; }
        .test-card-hover { transition: all .3s; }
        .test-card-hover:hover { border-color: rgba(37,99,235,.3) !important; transform: translateY(-3px); }
        .cta-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(255,255,255,.2) !important; }
        .social-hover:hover { border-color: rgba(37,99,235,.4) !important; background: rgba(37,99,235,.1) !important; }
        .footer-link-hover:hover { color: #3b82f6 !important; }
        
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,30px) scale(1.05)} 66%{transform:translate(20px,-20px) scale(0.95)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatBadge1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        @keyframes floatBadge2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes floatBadge3 { 0%,100%{transform:translateY(0) rotate(.5deg)} 50%{transform:translateY(-12px) rotate(-.5deg)} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes stepFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes stepPulse { 0%,100%{box-shadow:0 0 28px rgba(37,99,235,.45)} 50%{box-shadow:0 0 40px rgba(37,99,235,.65)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes flowProgress { 0%{width:0} 100%{width:calc(100% - 72px)} }
        
        .device-float { animation: floatY 5s ease-in-out infinite; }
        .badge-1 { animation: floatBadge1 6s ease-in-out infinite; }
        .badge-2 { animation: floatBadge2 7s ease-in-out infinite; }
        .badge-3 { animation: floatBadge3 5.5s ease-in-out infinite; }
        .orbit-ring-1 { animation: spinRing 18s linear infinite; }
        .orbit-ring-2 { animation: spinRing 28s linear infinite reverse; }
        .step-icon-1 { animation: stepFloat 4s ease-in-out infinite, stepPulse 4s ease-in-out infinite; }
        .step-icon-2 { animation: stepFloat 4s ease-in-out infinite 0.5s, stepPulse 4s ease-in-out infinite 0.5s; }
        .step-icon-3 { animation: stepFloat 4s ease-in-out infinite 1s, stepPulse 4s ease-in-out infinite 1s; }
        .step-card { transition: transform .3s ease; }
        .step-card:hover { transform: translateY(-6px); }
        .connecting-line { animation: lineGrow 1.5s ease forwards; transform-origin: center; }
        .flow-line { animation: flowProgress 4s ease-in-out infinite; }
        
        @media(max-width:768px) {
          .hero-section { grid-template-columns: 1fr !important; padding: 48px 5% 60px !important; }
          .hero-right { display: none !important; }
          .nav-links-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

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
      <section id="features" style={{ padding: "90px 7%", background: "transparent", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem,2.8vw,2.2rem)", fontWeight: 800, textAlign: "center", color: "#fff", marginBottom: "12px" }}>Everything you need to manage campus engagement</h2>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.65)", fontSize: ".9rem", maxWidth: "520px", margin: "0 auto 56px", lineHeight: 1.8 }}>From QR-based attendance to real-time analytics — CampusPulse brings it all together in one platform.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {[
            {icon:<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="17" y="17" width="4" height="4" rx=".5"/></svg>,title:"QR-based Attendance",desc:"Students scan a QR code to mark attendance instantly. No manual roll calls needed."},
            {icon:<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,title:"Activity Tracking",desc:"Track student participation in workshops, seminars, and campus events effortlessly."},
            {icon:<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,title:"Real-Time Analytics",desc:"Teachers and administrators can view attendance trends and engagement dashboards."},
            {icon:<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,title:"Student Dashboard",desc:"Students can view attendance percentage, activity history, and participation insights."}
          ].map(f => (
            <div key={f.title} className="feat-card-hover" style={{ background: "rgba(255,255,255,.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "28px 22px" }}>
              <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1a6ef5, #2d8cf0)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", boxShadow: "0 4px 16px rgba(26,110,245,.3)" }}>
                <div style={{ width: "22px", height: "22px", fill: "none", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>{f.icon}</div>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: ".95rem", color: "#fff", marginBottom: "8px" }}>{f.title}</div>
              <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ padding: "90px 7%", background: "transparent", position: "relative", zIndex: 1 }}>
        <p style={{ display: "block", textAlign: "center", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1a6ef5", marginBottom: "14px" }}>How It Works</p>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem,2.8vw,2.2rem)", fontWeight: 800, textAlign: "center", color: "#fff", marginBottom: "64px" }}>Three simple steps to smarter attendance</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px", position: "relative" }}>
          {[
            {icon:<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,tag:"Step 01",title:"Create a Session",desc:"Teacher creates a session and generates a unique QR code."},
            {icon:<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>,tag:"Step 02",title:"Scan QR Code",desc:"Students scan the QR code using their device camera."},
            {icon:<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,tag:"Step 03",title:"Instant Analytics",desc:"Attendance and activity data appear instantly in analytics dashboards."}
          ].map(s => (
            <div key={s.tag} style={{ textAlign: "center", padding: "0 20px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", background: "linear-gradient(135deg, #1a6ef5, #2d8cf0)", borderRadius: "18px", marginBottom: "18px", boxShadow: "0 8px 24px rgba(26,110,245,.3)" }}>
                <div style={{ width: "28px", height: "28px", fill: "none", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>{s.icon}</div>
              </div>
              <div style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#1a6ef5", marginBottom: "8px" }}>{s.tag}</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "8px" }}>{s.title}</div>
              <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "220px", margin: "0 auto" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section id="preview" style={{ padding: "90px 7%", background: "transparent", position: "relative", zIndex: 1 }}>
        <p style={{ display: "block", textAlign: "center", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#1a6ef5", marginBottom: "14px" }}>Platform Preview</p>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem,2.8vw,2.2rem)", fontWeight: 800, textAlign: "center", color: "#fff", marginBottom: "56px" }}>Designed for modern classrooms</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            {icon:<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,title:"Teacher Dashboard",items:["Create attendance sessions","Generate QR codes","View student participation","Export reports"]},
            {icon:<svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,title:"Student Dashboard",items:["View attendance %","Activity history","Upcoming events","Career advisory"]},
            {icon:<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><rect x="2" y="2" width="20" height="20" rx="2"/></svg>,title:"Analytics & Reports",items:["Attendance trends","Participation heatmaps","Engagement scores","Custom date ranges"]}
          ].map(c => (
            <div key={c.title} className="preview-card-hover" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.05)", backdropFilter: "blur(20px)" }}>
              <div style={{ height: "160px", background: "linear-gradient(135deg, #0f1f3d 0%, #162040 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ width: "52px", height: "52px", fill: "none", stroke: "rgba(255,255,255,.5)", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", position: "relative", zIndex: 1 }}>{c.icon}</div>
              </div>
              <div style={{ padding: "20px", background: "transparent" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: ".95rem", color: "#fff", marginBottom: "12px" }}>{c.title}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {c.items.map(item => (
                    <li key={item} style={{ fontSize: ".78rem", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="14" height="14" fill="none" stroke="#1a6ef5" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ margin: "0 7% 90px", background: "linear-gradient(135deg, #0f1f3d 0%, #0d2a5c 100%)", borderRadius: "24px", padding: "70px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem,2.8vw,2.2rem)", fontWeight: 800, color: "#fff", marginBottom: "14px", position: "relative", zIndex: 1 }}>Ready to modernize your campus?</h2>
        <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.65)", marginBottom: "34px", position: "relative", zIndex: 1 }}>Join institutions already using CampusPulse to streamline attendance and boost student engagement.</p>
        <button onClick={() => navigate("/login")} className="cta-btn-hover" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "#0f1f3d", padding: "14px 32px", borderRadius: "10px", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.15)", position: "relative", zIndex: 1, transition: "all .22s" }}>
          Start Managing Attendance
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Footer */}
      <footer style={{ background: "rgba(255,255,255,.03)", borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 7%", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "9px", fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(26,110,245,.3)" }}>
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          CampusPulse
        </a>
        <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,0.5)" }}>© 2026 CampusPulse</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .nav-link:hover { color: #1a6ef5 !important; transition: color .2s; }
        .btn-hover:hover { background: #1254c7 !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,110,245,.42) !important; }
        .btn-outline-hover:hover { background: rgba(26,110,245,0.1) !important; }
        .feat-card-hover { transition: all .25s; }
        .feat-card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 40px rgba(26,110,245,.3); border-color: rgba(26,110,245,.4) !important; }
        .preview-card-hover { transition: all .25s; }
        .preview-card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 40px rgba(26,110,245,.3); }
        .cta-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,.25) !important; }
        
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-30px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,30px) scale(1.05)} 66%{transform:translate(20px,-20px) scale(0.95)} }
        
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatBadge1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        @keyframes floatBadge2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes floatBadge3 { 0%,100%{transform:translateY(0) rotate(.5deg)} 50%{transform:translateY(-12px) rotate(-.5deg)} }
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        
        .device-float { animation: floatY 5s ease-in-out infinite; }
        .badge-1 { animation: floatBadge1 6s ease-in-out infinite; }
        .badge-2 { animation: floatBadge2 7s ease-in-out infinite; }
        .badge-3 { animation: floatBadge3 5.5s ease-in-out infinite; }
        .orbit-ring-1 { animation: spinRing 18s linear infinite; }
        .orbit-ring-2 { animation: spinRing 28s linear infinite reverse; }
        
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

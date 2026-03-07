import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(135deg, #061428 0%, #0b2045 40%, #0a2e3a 70%, #071830 100%)", zIndex: 0 }}>
        <div className="blob-1" style={{ position: "absolute", width: "520px", height: "520px", background: "radial-gradient(circle, #1a6ef5 0%, transparent 70%)", top: "-120px", left: "-100px", borderRadius: "50%", filter: "blur(80px)", opacity: .45 }} />
        <div className="blob-2" style={{ position: "absolute", width: "420px", height: "420px", background: "radial-gradient(circle, #0fb8c9 0%, transparent 70%)", bottom: "-80px", right: "-80px", borderRadius: "50%", filter: "blur(80px)", opacity: .45 }} />
        <div className="blob-3" style={{ position: "absolute", width: "300px", height: "300px", background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", top: "40%", left: "60%", borderRadius: "50%", filter: "blur(80px)", opacity: .25 }} />
      </div>

      {/* Grid overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 2, backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

      {/* Ambient badges */}
      <div className="amb-badge amb-tl" style={{ position: "fixed", zIndex: 3, background: "rgba(255,255,255,.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", top: "20%", left: "8%" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1a6ef5,#2d8cf0)" }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
        </div>
        <div>
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.85)", fontFamily: "'Sora',sans-serif" }}>Real-Time Sync</div>
          <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.45)", marginTop: "1px" }}>All data live updated</div>
        </div>
        <div className="live-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
      </div>

      <div className="amb-badge amb-tr" style={{ position: "fixed", zIndex: 3, background: "rgba(255,255,255,.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", top: "20%", right: "8%" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0fb8c9,#06d6a0)" }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
        </div>
        <div>
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.85)", fontFamily: "'Sora',sans-serif" }}>QR Attendance</div>
          <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.45)", marginTop: "1px" }}>Scan & mark instantly</div>
        </div>
      </div>

      <div className="amb-badge amb-bl" style={{ position: "fixed", zIndex: 3, background: "rgba(255,255,255,.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", bottom: "20%", left: "8%" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        </div>
        <div>
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.85)", fontFamily: "'Sora',sans-serif" }}>156 Students</div>
          <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.45)", marginTop: "1px" }}>Across 6 courses</div>
        </div>
      </div>

      <div className="amb-badge amb-br" style={{ position: "fixed", zIndex: 3, background: "rgba(255,255,255,.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", bottom: "20%", right: "8%" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
        </div>
        <div>
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.85)", fontFamily: "'Sora',sans-serif" }}>94% Attendance</div>
          <div style={{ fontSize: ".62rem", color: "rgba(255,255,255,.45)", marginTop: "1px" }}>This semester ↑</div>
        </div>
      </div>

      {/* Main card */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div className="glass-card" style={{ width: "100%", maxWidth: "440px", background: "rgba(255,255,255,.07)", backdropFilter: "blur(28px) saturate(180%)", border: "1px solid rgba(255,255,255,.16)", borderRadius: "28px", padding: "44px 40px 36px", boxShadow: "0 32px 80px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.07) inset, 0 1px 0 rgba(255,255,255,.2) inset", position: "relative" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "13px", background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(26,110,245,.5)" }}>
              <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
            </div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.45rem", color: "#fff", letterSpacing: "-.01em" }}>CampusPulse</span>
          </div>
          <p style={{ textAlign: "center", fontSize: ".82rem", color: "rgba(255,255,255,.5)", marginBottom: "28px", marginTop: "6px", lineHeight: 1.6 }}>Sign in to manage attendance & activities</p>


          <form onSubmit={handleLogin}>
            {/* Error message */}
            {error && (
              <div style={{ marginBottom: "18px", padding: "12px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", fontSize: ".8rem", color: "#fca5a5", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {error}
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: ".78rem", fontWeight: 600, color: "rgba(255,255,255,.7)", marginBottom: "8px", fontFamily: "'Sora',sans-serif", letterSpacing: ".01em" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", fill: "none", stroke: "rgba(255,255,255,.3)", strokeWidth: 2, pointerEvents: "none" }} viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`email@example.com`} required style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "12px", padding: "13px 14px 13px 42px", fontFamily: "'Inter', sans-serif", fontSize: ".875rem", color: "#fff", outline: "none", transition: "all .25s" }} onFocus={(e) => { e.target.style.background = "rgba(255,255,255,.08)"; e.target.style.borderColor = "rgba(26,110,245,.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(26,110,245,.15)"; }} onBlur={(e) => { e.target.style.background = "rgba(255,255,255,.06)"; e.target.style.borderColor = "rgba(255,255,255,.12)"; e.target.style.boxShadow = "none"; }} />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: ".78rem", fontWeight: 600, color: "rgba(255,255,255,.7)", marginBottom: "8px", fontFamily: "'Sora',sans-serif", letterSpacing: ".01em" }}>Password</label>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", fill: "none", stroke: "rgba(255,255,255,.3)", strokeWidth: 2, pointerEvents: "none" }} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "12px", padding: "13px 42px 13px 42px", fontFamily: "'Inter', sans-serif", fontSize: ".875rem", color: "#fff", outline: "none", transition: "all .25s" }} onFocus={(e) => { e.target.style.background = "rgba(255,255,255,.08)"; e.target.style.borderColor = "rgba(26,110,245,.6)"; e.target.style.boxShadow = "0 0 0 3px rgba(26,110,245,.15)"; }} onBlur={(e) => { e.target.style.background = "rgba(255,255,255,.06)"; e.target.style.borderColor = "rgba(255,255,255,.12)"; e.target.style.boxShadow = "none"; }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: "3px", color: "rgba(255,255,255,.3)" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}</svg>
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-10px", marginBottom: "22px" }}>
              <a href="#" style={{ fontSize: ".75rem", color: "rgba(26,110,245,.85)", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="signin-btn" style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #1a6ef5 0%, #2d8cf0 50%, #0fb8c9 100%)", backgroundSize: "200% 200%", border: "none", borderRadius: "13px", fontFamily: "'Sora',sans-serif", fontSize: ".95rem", fontWeight: 700, color: "#fff", cursor: "pointer", boxShadow: "0 6px 24px rgba(26,110,245,.45)", transition: "all .3s", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              {loading ? <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%" }} className="spinner" /> : <>Sign In <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,.12)" }} />
            <span style={{ fontSize: ".75rem", color: "rgba(255,255,255,.4)", fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,.12)" }} />
          </div>

          <button type="button" className="google-btn" style={{ width: "100%", padding: "13px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: "13px", fontFamily: "'Sora',sans-serif", fontSize: ".88rem", fontWeight: 600, color: "#fff", cursor: "pointer", transition: "all .25s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Continue with Google
          </button>

          <p style={{ textAlign: "center", fontSize: ".78rem", color: "rgba(255,255,255,.4)", marginTop: "20px" }}>Don't have an account? <a href="#" style={{ color: "rgba(26,171,245,.9)", textDecoration: "none", fontWeight: 600 }}>Contact Admin</a></p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px rgba(255,255,255,.06) !important;
          background-color: rgba(255,255,255,.06) !important;
        }
        input::placeholder {
          color: rgba(255,255,255,.3) !important;
        }
        @keyframes blobDrift { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.07)} 66%{transform:translate(-20px,40px) scale(.94)} 100%{transform:translate(30px,20px) scale(1.04)} }
        @keyframes ambFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ambFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes livePulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes cardEntrance { from{opacity:0;transform:translateY(28px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .blob-1 { animation: blobDrift 14s ease-in-out infinite alternate; }
        .blob-2 { animation: blobDrift 10s ease-in-out infinite alternate; animation-delay: -4s; }
        .blob-3 { animation: blobDrift 16s ease-in-out infinite alternate; animation-delay: -8s; }
        .amb-tl { animation: ambFloat1 7s ease-in-out infinite; }
        .amb-tr { animation: ambFloat2 9s ease-in-out infinite; }
        .amb-bl { animation: ambFloat1 8s ease-in-out infinite; animation-delay: -3s; }
        .amb-br { animation: ambFloat2 6s ease-in-out infinite; animation-delay: -2s; }
        .live-dot { animation: livePulse 1.6s ease-in-out infinite; }
        .signin-btn { animation: gradShift 4s ease-in-out infinite; }
        .signin-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(26,110,245,.55); }
        .google-btn:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.25); transform: translateY(-1px); }
        .glass-card { animation: cardEntrance .7s cubic-bezier(.22,1,.36,1) both; }
        .spinner { animation: spin .7s linear infinite; }
        @media(max-width:480px) { .amb-tl,.amb-tr,.amb-bl,.amb-br { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Login;

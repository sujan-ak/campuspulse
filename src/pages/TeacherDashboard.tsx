import { GlowCard } from "@/components/GlowCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useUserProfile(user?.id);
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; data: any }>({ show: false, x: 0, y: 0, data: null });
  const chartData = [
    { day: 'Mon', date: 'Mar 3', present: 38, absent: 4, total: 42 },
    { day: 'Tue', date: 'Mar 4', present: 35, absent: 7, total: 42 },
    { day: 'Wed', date: 'Mar 5', present: 40, absent: 2, total: 42 },
    { day: 'Thu', date: 'Mar 6', present: 36, absent: 6, total: 42 },
    { day: 'Fri', date: 'Mar 7', present: 33, absent: 9, total: 42 },
    { day: 'Sat', date: 'Mar 8', present: 28, absent: 5, total: 33 },
  ];

  const showTooltip = (e: React.MouseEvent, d: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ show: true, x: rect.left + rect.width / 2, y: rect.top - 10, data: d });
  };

  const hideTooltip = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
  };

  return (
    <div style={{ width: "100%", fontFamily: "'Sora', 'Inter', sans-serif", color: "#fff" }}>
      
      {/* Welcome */}
      <div style={{ marginBottom: "26px" }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.45rem", fontWeight: 800, margin: 0, marginBottom: "3px" }}>Good morning, <span style={{ color: "#0fb8c9" }}>{profile?.name || 'Professor'}</span> 👋</h1>
        <p style={{ fontSize: ".83rem", color: "rgba(255,255,255,.65)", margin: 0 }}>Here's your teaching overview for today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* STAT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "22px" }}>
        <GlowCard style={{ background: "linear-gradient(135deg, #0ea5c8 0%, #1d4ed8 100%)", border: "1px solid rgba(255,255,255,.25)", borderRadius: "16px", padding: "20px", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: "10px" }}>TOTAL STUDENTS</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>186</div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.65)" }}>Across 4 classes</div>
        </GlowCard>

        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px" }} glowColor="rgba(15, 184, 201, 0.3)">
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: "10px" }}>AVG. ATTENDANCE</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>89%</div>
          <div style={{ fontSize: ".72rem", color: "#86efac" }}>↑ 2% from last week</div>
        </GlowCard>

        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px" }} glowColor="rgba(34, 197, 94, 0.3)">
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: "10px" }}>ACTIVE SESSIONS</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>1</div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}><span className="live-dot" style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", marginRight: "5px" }}/>Live right now</div>
        </GlowCard>

        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px" }} glowColor="rgba(139, 92, 246, 0.3)">
          <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: "10px" }}>PARTICIPATION</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "2rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>76%</div>
          <div style={{ fontSize: ".72rem", color: "#86efac" }}>↑ 5% activities rate</div>
        </GlowCard>
      </div>

      {/* MIDDLE ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "14px", marginBottom: "22px" }}>
        
        {/* Weekly Attendance Chart */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
            <div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700 }}>Weekly Attendance</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.35)", marginTop: "2px" }}>Mar 3 – Mar 9, 2026 · All Classes</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "10.5px", fontWeight: 600, background: "rgba(14,165,200,0.12)", color: "#0ea5c8", border: "1px solid rgba(14,165,200,0.25)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
                  Avg 87%
                </div>
                <div style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "10.5px", fontWeight: 600, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.22)" }}>↑ 2% vs last week</div>
              </div>
              <div style={{ display: "flex", gap: "14px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "rgba(255,255,255,.5)", fontWeight: 500 }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0ea5c8", boxShadow: "0 0 6px rgba(14,165,200,0.6)" }}/>Present
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11.5px", color: "rgba(255,255,255,.5)", fontWeight: 500 }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 6px rgba(239,68,68,0.5)" }}/>Absent
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "space-between", paddingBottom: "24px", paddingTop: "2px", width: "32px", flexShrink: 0 }}>
              {[0, 10, 20, 30, 40, 45].map((v, i) => (
                <div key={i} style={{ fontSize: "10px", color: "rgba(255,255,255,.25)", textAlign: "right", fontWeight: 500, lineHeight: 1, paddingRight: "6px" }}>{v}</div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ position: "relative", height: "180px" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column-reverse", justifyContent: "space-between", pointerEvents: "none" }}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ width: "100%", height: "1px", background: i === 5 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)" }}/>
                  ))}
                </div>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "0 8px", gap: 0 }}>
                  {chartData.map((d, i) => {
                    const maxH = 180;
                    const maxVal = 45;
                    const pH = Math.round((d.present / maxVal) * maxH);
                    const aH = Math.round((d.absent / maxVal) * maxH);
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, position: "relative", flex: 1, cursor: "pointer" }} onMouseEnter={(e) => showTooltip(e, d)} onMouseLeave={hideTooltip}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", position: "relative" }}>
                          <div style={{ width: "18px", borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg, #1fd3f5 0%, #0ea5c8 60%, #0884a3 100%)", boxShadow: "0 -2px 12px rgba(14,165,200,0.35)", height: `${pH}px`, transition: "all 0.3s", animation: `growUp 0.55s cubic-bezier(0.34,1.3,0.64,1) both ${0.05 + i * 0.07}s` }}/>
                          <div style={{ width: "12px", borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg, #f87171 0%, #ef4444 60%, #c53030 100%)", boxShadow: "0 -2px 8px rgba(239,68,68,0.3)", height: `${aH}px`, transition: "all 0.3s", animation: `growUp 0.55s cubic-bezier(0.34,1.3,0.64,1) both ${0.05 + i * 0.07}s` }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginTop: 0 }}/>
              <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 8px 0" }}>
                {chartData.map((d, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center", fontSize: "11px", color: i === 4 ? "#0ea5c8" : "rgba(255,255,255,.35)", fontWeight: i === 4 ? 600 : 500, userSelect: "none" }}>{i === 4 ? d.day + " ●" : d.day}</div>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>

        {/* Today's Sessions */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px" }} glowColor="rgba(245, 158, 11, 0.3)">
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: "16px" }}>Today's Sessions</div>
          {[
            { name: "Data Structures", time: "10:00 AM", students: 42, status: "Active", color: "#22c55e" },
            { name: "Algorithms", time: "12:00 PM", students: 38, status: "Soon", color: "#f59e0b" },
            { name: "Database Systems", time: "2:30 PM", students: 0, status: "Upcoming", color: "rgba(255,255,255,.3)" },
            { name: "OS Lab", time: "4:00 PM", students: 30, status: "Upcoming", color: "rgba(255,255,255,.3)" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)", marginTop: "3px" }}>{s.time} · {s.students} students</div>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>{s.status}</span>
            </div>
          ))}
        </GlowCard>
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "14px" }}>
        
        {/* Top Students */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "20px 22px 0" }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: "16px" }}>Top Students</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                {["#", "Name", "Attendance", "Activities", "Status"].map(h => (
                  <th key={h} style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".07em", padding: "10px 22px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { rank: "01", name: "Priya Sharma", initials: "PS", att: 98, activities: 15, status: "Excellent", color: "linear-gradient(135deg,#f59e0b,#ef4444)" },
                { rank: "02", name: "Alex Johnson", initials: "AJ", att: 95, activities: 12, status: "Excellent", color: "linear-gradient(135deg,#3b82f6,#8b5cf6)" },
                { rank: "03", name: "Sam Wilson", initials: "SW", att: 93, activities: 10, status: "Excellent", color: "linear-gradient(135deg,#10b981,#0ea5c8)" },
                { rank: "04", name: "Maya Chen", initials: "MC", att: 91, activities: 14, status: "Excellent", color: "linear-gradient(135deg,#ec4899,#f97316)" },
                { rank: "05", name: "Riya Kapoor", initials: "RK", att: 88, activities: 9, status: "Good", color: "linear-gradient(135deg,#6366f1,#0ea5c8)" },
              ].map((s, i) => (
                <tr key={i} style={{ borderBottom: i < 4 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                  <td style={{ padding: "13px 22px", fontSize: "11px", fontWeight: 700, color: i < 3 ? ["#f59e0b", "#94a3b8", "#b45309"][i] : "rgba(255,255,255,.5)" }}>{s.rank}</td>
                  <td style={{ padding: "13px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: s.color, display: "grid", placeItems: "center", fontSize: "12px", fontWeight: 600 }}>{s.initials}</div>
                      {s.name}
                    </div>
                  </td>
                  <td style={{ padding: "13px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,.1)", borderRadius: "99px", width: "80px" }}>
                        <div style={{ height: "100%", borderRadius: "99px", background: s.att >= 90 ? "#22c55e" : "#f59e0b", width: `${s.att}%` }}/>
                      </div>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,.6)", minWidth: "32px", textAlign: "right" }}>{s.att}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 22px", fontWeight: 600, color: "#0fb8c9" }}>{s.activities}</td>
                  <td style={{ padding: "13px 22px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: s.status === "Excellent" ? "rgba(34,197,94,.12)" : "rgba(245,158,11,.12)", color: s.status === "Excellent" ? "#22c55e" : "#f59e0b", border: `1px solid ${s.status === "Excellent" ? "rgba(34,197,94,.25)" : "rgba(245,158,11,.25)"}` }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlowCard>

        {/* QR & AI Insight */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px", textAlign: "center" }}>
            <svg style={{ width: "90px", height: "90px", margin: "0 auto 12px" }} viewBox="0 0 90 90" fill="none">
              <rect width="90" height="90" rx="10" fill="rgba(255,255,255,.05)"/>
              <rect x="8" y="8" width="26" height="26" rx="3" fill="none" stroke="#0fb8c9" strokeWidth="2.5"/>
              <rect x="13" y="13" width="16" height="16" rx="1.5" fill="#0fb8c9"/>
              <rect x="56" y="8" width="26" height="26" rx="3" fill="none" stroke="#0fb8c9" strokeWidth="2.5"/>
              <rect x="61" y="13" width="16" height="16" rx="1.5" fill="#0fb8c9"/>
              <rect x="8" y="56" width="26" height="26" rx="3" fill="none" stroke="#0fb8c9" strokeWidth="2.5"/>
              <rect x="13" y="61" width="16" height="16" rx="1.5" fill="#0fb8c9"/>
              <rect x="42" y="42" width="7" height="7" rx="1" fill="#0fb8c9"/>
              <rect x="56" y="56" width="7" height="7" rx="1" fill="#0fb8c9"/>
              <rect x="67" y="78" width="7" height="7" rx="1" fill="#0fb8c9"/>
            </svg>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>Mark Attendance via QR</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,.6)", marginBottom: "18px" }}>Students scan to check in</div>
            <button onClick={() => navigate('/qr-attendance')} style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg, #0fb8c9, #1d4ed8)", color: "#fff", border: "none", borderRadius: "8px", fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: "0 0 14px rgba(15,184,201,.4)" }}>
              Generate Live QR Code
            </button>
          </GlowCard>

          <GlowCard style={{ background: "linear-gradient(135deg, rgba(168,85,247,.15) 0%, rgba(14,165,200,.1) 100%)", border: "1px solid rgba(168,85,247,.25)", borderRadius: "16px", padding: "16px" }} glowColor="rgba(168, 85, 247, 0.3)">
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#a855f7", marginBottom: "8px" }}>✦ AI INSIGHT</div>
            <div style={{ fontSize: "13px", lineHeight: 1.5 }}>Wednesday had the highest attendance this week at <strong>91%</strong>. Friday dipped to 68% — consider sending a reminder before next Friday's session.</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)", marginTop: "8px" }}>Based on this week's data · Updated just now</div>
          </GlowCard>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && tooltip.data && (
        <div style={{ position: "fixed", left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)", background: "#0f1e35", border: "1px solid rgba(14,165,200,0.35)", borderRadius: "10px", padding: "10px 14px", pointerEvents: "none", zIndex: 100, minWidth: "150px", boxShadow: "0 8px 28px rgba(0,0,0,0.5)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 700, color: "#e2e8f0", marginBottom: "8px", paddingBottom: "7px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{tooltip.data.day}  ·  {tooltip.data.date}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", fontSize: "12.5px", marginTop: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0ea5c8" }}/>
              Present
            </div>
            <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{tooltip.data.present} students</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", fontSize: "12.5px", marginTop: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#94a3b8" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }}/>
              Absent
            </div>
            <div style={{ fontWeight: 600, color: "#e2e8f0" }}>{tooltip.data.absent} students</div>
          </div>
          <div style={{ marginTop: "8px", paddingTop: "7px", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
            <span style={{ fontWeight: 600 }}>Attendance rate</span>
            <span style={{ fontWeight: 600, color: Math.round((tooltip.data.present / tooltip.data.total) * 100) >= 85 ? "#22c55e" : Math.round((tooltip.data.present / tooltip.data.total) * 100) >= 70 ? "#f59e0b" : "#ef4444" }}>{Math.round((tooltip.data.present / tooltip.data.total) * 100)}%</span>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        .live-dot { animation: livePulse 1.6s ease-in-out infinite; }
        @keyframes livePulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
        @keyframes growUp { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

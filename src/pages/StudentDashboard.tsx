import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlowCard } from "@/components/GlowCard";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentData } from "@/hooks/useStudentData";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { attendance, activities, loading, stats } = useStudentData(user?.id);
  const { profile } = useUserProfile(user?.id);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!loading) {
      const countUp = (setter: (v: number) => void, target: number, duration: number) => {
        let current = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          setter(Math.round(current));
          if (current >= target) clearInterval(timer);
        }, 16);
      };

      setTimeout(() => {
        countUp(setAttendanceCount, stats.attendanceRate, 1400);
        countUp(setActivitiesCount, stats.totalActivities, 1000);
        countUp(setPoints, stats.totalPoints, 1600);
      }, 300);

      setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach((b: any) => b.style.width = b.dataset.w + '%');
      }, 500);

      setTimeout(() => {
        document.querySelectorAll('.bar-fill').forEach((b: any) => b.style.height = b.dataset.h + '%');
      }, 700);
    }
  }, [loading, stats]);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const chartData = [
    {day:'Mon', att:90, act:60}, {day:'Tue', att:85, act:40}, {day:'Wed', att:95, act:75},
    {day:'Thu', att:70, act:50}, {day:'Fri', att:88, act:65}, {day:'Sat', att:50, act:80}, {day:'Sun', att:0, act:30}
  ];

  return (
    <div style={{ width: "100%", fontFamily: "'Inter', sans-serif", color: "#fff" }}>
      
      {/* Welcome */}
      <div style={{ marginBottom: "26px" }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.45rem", fontWeight: 800, margin: 0, marginBottom: "3px" }}>Welcome back, {profile?.name || 'Student'} 👋</h1>
        <p style={{ fontSize: ".83rem", color: "rgba(255,255,255,.65)", margin: 0 }}>Here's your campus overview for today — {today}</p>
      </div>

      {/* STAT CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <GlowCard className="stat-featured" style={{ background: "linear-gradient(135deg, #1a6ef5 0%, #2d8cf0 50%, #0fb8c9 100%)", backgroundSize: "200% 200%", border: "1px solid rgba(255,255,255,.25)", borderRadius: "16px", padding: "20px 18px", position: "relative", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em" }}>ATTENDANCE</span>
            <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.9rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>{attendanceCount}%</div>
          <div style={{ fontSize: ".72rem", display: "flex", alignItems: "center", gap: "5px", color: "#86efac" }}>
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
            +3% from last month
          </div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)", marginTop: "4px" }}>This semester</div>
        </GlowCard>

        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px 18px" }} glowColor="rgba(15, 184, 201, 0.3)">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em" }}>ACTIVITIES</span>
            <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(15,184,201,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" stroke="#67e8f9" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.9rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>{activitiesCount}</div>
          <div style={{ fontSize: ".72rem", display: "flex", alignItems: "center", gap: "5px", color: "#86efac" }}>
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
            2 this week
          </div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}>Participated</div>
        </GlowCard>

        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px 18px" }} glowColor="rgba(245, 158, 11, 0.3)">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em" }}>POINTS EARNED</span>
            <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(245,158,11,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" stroke="#fcd34d" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.9rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>{points}</div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.45)" }}>Co-curricular</div>
        </GlowCard>

        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "20px 18px" }} glowColor="rgba(139, 92, 246, 0.3)">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.65)", textTransform: "uppercase", letterSpacing: ".04em" }}>NEXT CLASS</span>
            <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: "rgba(139,92,246,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" fill="none" stroke="#c4b5fd" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.5rem", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>2:30 PM</div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)" }}>Data Structures</div>
          <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)" }}>Room 204 · In 45 min</div>
        </GlowCard>
      </div>

      {/* MID GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: "16px", marginBottom: "20px" }}>
        
        {/* QR + Career */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px", textAlign: "center" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "18px", background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 8px 28px rgba(26,110,245,.4)", position: "relative" }}>
              <div style={{ position: "absolute", inset: "-4px", borderRadius: "22px", border: "2px solid rgba(26,110,245,.4)" }} className="qr-pulse"/>
              <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="17" y="17" width="4" height="4" rx=".5"/></svg>
            </div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".95rem", fontWeight: 700, marginBottom: "4px" }}>Mark Attendance</div>
            <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.65)", marginBottom: "18px" }}>Scan QR code to check in to your session</div>
            <button onClick={() => navigate('/attendance')} style={{ width: "100%", padding: "12px", borderRadius: "11px", border: "none", cursor: "pointer", background: "linear-gradient(135deg, #1a6ef5, #0fb8c9)", fontFamily: "'Sora', sans-serif", fontSize: ".85rem", fontWeight: 700, color: "#fff", boxShadow: "0 4px 16px rgba(26,110,245,.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all .22s" }}>
              <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              Scan QR Code
            </button>
          </GlowCard>

          <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px" }} glowColor="rgba(15, 184, 201, 0.3)">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg,#0fb8c9,#06d6a0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".88rem", fontWeight: 700 }}>Career Advisory</div>
            </div>
            <div style={{ fontSize: ".73rem", color: "rgba(255,255,255,.65)", lineHeight: 1.6, marginBottom: "14px" }}>Based on your profile, explore recommended paths in AI & Machine Learning.</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.65)", fontWeight: 500 }}>Profile completeness</span>
              <span style={{ fontSize: ".72rem", color: "#0fb8c9", fontWeight: 700 }}>72%</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,.1)", borderRadius: "100px", overflow: "hidden" }}>
              <div className="progress-fill" data-w="72" style={{ height: "100%", borderRadius: "100px", background: "linear-gradient(90deg,#1a6ef5,#0fb8c9)", width: "0", transition: "width 1.4s cubic-bezier(.4,0,.2,1)" }}/>
            </div>
          </GlowCard>
        </div>

        {/* Recent Activities */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px" }} glowColor="rgba(139, 92, 246, 0.3)">
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Recent Activities
            <span style={{ fontSize: ".7rem", color: "#1a6ef5", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>View all →</span>
          </div>
          {[
            { name: "Data Science Bootcamp", date: "Mar 2, 2026", pts: 50, color: "#f59e0b" },
            { name: "Cultural Fest Volunteer", date: "Feb 28, 2026", pts: 30, color: "#22c55e" },
            { name: "Hackathon 2026", date: "Feb 20, 2026", pts: 80, color: "#8b5cf6" },
            { name: "AI Workshop — Session 3", date: "Feb 15, 2026", pts: 25, color: "#0fb8c9" },
            { name: "Tech Talk: Cloud Computing", date: "Feb 10, 2026", pts: 20, color: "#1a6ef5" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, background: a.color, boxShadow: `0 0 0 3px ${a.color}33` }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: ".82rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.35)", marginTop: "1px" }}>{a.date}</div>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".78rem", fontWeight: 700, color: "#0fb8c9", whiteSpace: "nowrap" }}>+{a.pts} pts</div>
            </div>
          ))}
        </GlowCard>

        {/* Upcoming Events */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px" }} glowColor="rgba(34, 197, 94, 0.3)">
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Upcoming Events
            <span style={{ fontSize: ".7rem", color: "#1a6ef5", fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>View all →</span>
          </div>
          {[
            { day: "8", mon: "Mar", name: "AI Workshop", sub: "10:00 AM · Lab 3", tag: "Workshop", bg: "rgba(26,110,245,.2)", color: "#60a5fa", border: "rgba(26,110,245,.3)" },
            { day: "12", mon: "Mar", name: "Sports Day", sub: "9:00 AM · Ground", tag: "Event", bg: "rgba(34,197,94,.15)", color: "#86efac", border: "rgba(34,197,94,.25)" },
            { day: "15", mon: "Mar", name: "Tech Seminar", sub: "2:00 PM · Hall A", tag: "Seminar", bg: "rgba(15,184,201,.15)", color: "#67e8f9", border: "rgba(15,184,201,.25)" },
            { day: "22", mon: "Mar", name: "Resume Bootcamp", sub: "11:00 AM · Room 101", tag: "Career", bg: "rgba(245,158,11,.15)", color: "#fcd34d", border: "rgba(245,158,11,.25)" },
          ].map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
              <div style={{ width: "40px", flexShrink: 0, textAlign: "center", background: "rgba(255,255,255,.06)", borderRadius: "8px", padding: "6px 4px", border: "1px solid rgba(255,255,255,.11)" }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".95rem", fontWeight: 800, lineHeight: 1 }}>{e.day}</div>
                <div style={{ fontSize: ".58rem", color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".05em" }}>{e.mon}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: ".82rem", fontWeight: 600 }}>{e.name}</div>
                <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.35)", marginTop: "1px" }}>{e.sub}</div>
              </div>
              <span style={{ fontSize: ".62rem", fontWeight: 700, padding: "3px 9px", borderRadius: "100px", whiteSpace: "nowrap", flexShrink: 0, background: e.bg, color: e.color, border: `1px solid ${e.border}` }}>{e.tag}</span>
            </div>
          ))}
        </GlowCard>
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px" }}>
        {/* Attendance Chart */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px" }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Weekly Attendance
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: ".68rem", color: "rgba(255,255,255,.35)", fontWeight: 400 }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#1a6ef5", display: "inline-block" }}/>Present
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: ".68rem", color: "rgba(255,255,255,.35)", fontWeight: 400 }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#0fb8c9", display: "inline-block" }}/>Activities
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "64px", marginTop: "4px" }}>
            {chartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div className="bar-fill" data-h={d.att} style={{ width: "100%", borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg,#1a6ef5,rgba(26,110,245,.4))", transition: "height 1.2s cubic-bezier(.4,0,.2,1)", height: "0" }}/>
                <div style={{ fontSize: ".58rem", color: "rgba(255,255,255,.35)" }}>{d.day}</div>
              </div>
            ))}
            {chartData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div className="bar-fill" data-h={d.act} style={{ width: "100%", borderRadius: "4px 4px 0 0", background: "linear-gradient(180deg,#0fb8c9,rgba(15,184,201,.4))", transition: "height 1.2s cubic-bezier(.4,0,.2,1)", height: "0" }}/>
                <div style={{ fontSize: ".58rem", color: "rgba(255,255,255,.35)" }}/>
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Session breakdown */}
        <GlowCard style={{ background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.11)", borderRadius: "16px", padding: "22px" }} glowColor="rgba(239, 68, 68, 0.3)">
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: ".9rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Session Breakdown
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "0" }}>
              <div className="live-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }}/>
              <span style={{ fontSize: ".72rem", color: "rgba(255,255,255,.65)", fontWeight: 500 }}>Live data</span>
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Session", "Date", "Status", "%"].map(h => (
                  <th key={h} style={{ fontSize: ".65rem", color: "rgba(255,255,255,.35)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", padding: "0 0 10px", textAlign: h === "%" ? "right" : "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Math 101", date: "Mar 7", status: "Present", pct: 92, color: "#22c55e" },
                { name: "Data Structures", date: "Mar 6", status: "Present", pct: 88, color: "#22c55e" },
                { name: "Physics Lab", date: "Mar 5", status: "Late", pct: 74, color: "#f59e0b" },
                { name: "English", date: "Mar 4", status: "Absent", pct: 60, color: "#ef4444" },
              ].map((s, i) => (
                <tr key={i}>
                  <td style={{ fontSize: ".78rem", color: "#fff", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,.05)", fontWeight: 500 }}>{s.name}</td>
                  <td style={{ fontSize: ".78rem", color: "rgba(255,255,255,.65)", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,.05)" }}>{s.date}</td>
                  <td style={{ fontSize: ".78rem", color: "rgba(255,255,255,.65)", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,.05)" }}>
                    <span style={{ fontSize: ".6rem", padding: "2px 7px", borderRadius: "100px", background: s.status === "Absent" ? "rgba(239,68,68,.15)" : s.status === "Late" ? "rgba(26,110,245,.2)" : "rgba(34,197,94,.15)", color: s.status === "Absent" ? "#fca5a5" : s.status === "Late" ? "#60a5fa" : "#86efac", border: `1px solid ${s.status === "Absent" ? "rgba(239,68,68,.25)" : s.status === "Late" ? "rgba(26,110,245,.3)" : "rgba(34,197,94,.25)"}` }}>{s.status}</span>
                  </td>
                  <td style={{ fontSize: ".78rem", color: "rgba(255,255,255,.65)", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,.05)", textAlign: "right" }}>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: ".8rem", color: s.color }}>{s.pct}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlowCard>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes qrPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.08);opacity:1} }
        @keyframes livePulse { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.5)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
        .stat-featured { animation: gradShift 5s ease infinite; }
        .qr-pulse { animation: qrPulse 2s ease-in-out infinite; }
        .live-dot { animation: livePulse 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
